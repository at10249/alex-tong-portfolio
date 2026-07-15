import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/systemPrompt";
import { checkRateLimit } from "@/lib/rateLimit";
import { isBalanceError, isDeepseekExhausted, markDeepseekExhausted } from "@/lib/deepseekCircuit";
import { isAllowedOrigin } from "@/lib/originCheck";

export const runtime = "nodejs";

const MAX_QUESTION_LENGTH = 800;
const DEEPSEEK_TIMEOUT_MS = 15_000;

function clientKey(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ error: "forbidden_origin" }, { status: 403 });
  }

  if (isDeepseekExhausted()) {
    return NextResponse.json({ error: "insufficient_balance" }, { status: 503 });
  }

  const key = clientKey(req);
  const { allowed, retryAfterSeconds } = await checkRateLimit(key);
  if (!allowed) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
    );
  }

  let question: unknown;
  try {
    const body = await req.json();
    question = body?.question;
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  if (typeof question !== "string" || !question.trim()) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }
  const trimmedQuestion = question.trim().slice(0, MAX_QUESTION_LENGTH);

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    console.error("[/api/chat] DEEPSEEK_API_KEY is not set");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEEPSEEK_TIMEOUT_MS);

  try {
    const r = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        max_tokens: 400,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: trimmedQuestion },
        ],
      }),
      signal: controller.signal,
    });

    if (!r.ok) {
      const body = await r.text().catch(() => "");
      if (isBalanceError(r.status)) {
        console.error(`[/api/chat] DeepSeek balance error (${r.status}):`, body);
        markDeepseekExhausted();
        return NextResponse.json({ error: "insufficient_balance" }, { status: 503 });
      }
      console.error(`[/api/chat] DeepSeek upstream error (${r.status}):`, body);
      return NextResponse.json({ error: "upstream_error" }, { status: 502 });
    }

    const json = await r.json();
    const text: string = json?.choices?.[0]?.message?.content ?? "";
    return NextResponse.json({ text });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      console.error(`[/api/chat] DeepSeek request timed out after ${DEEPSEEK_TIMEOUT_MS}ms`);
    } else {
      console.error("[/api/chat] Request to DeepSeek failed:", err);
    }
    return NextResponse.json({ error: "upstream_error" }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}

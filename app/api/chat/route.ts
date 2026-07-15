import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/systemPrompt";
import { checkRateLimit } from "@/lib/rateLimit";
import { isBalanceError, isDeepseekExhausted, markDeepseekExhausted } from "@/lib/deepseekCircuit";

export const runtime = "nodejs";

const MAX_QUESTION_LENGTH = 800;

function clientKey(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  if (isDeepseekExhausted()) {
    return NextResponse.json({ error: "insufficient_balance" }, { status: 503 });
  }

  const key = clientKey(req);
  const { allowed, retryAfterSeconds } = checkRateLimit(key);
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
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

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
    });

    if (!r.ok) {
      if (isBalanceError(r.status)) {
        markDeepseekExhausted();
        return NextResponse.json({ error: "insufficient_balance" }, { status: 503 });
      }
      return NextResponse.json({ error: "upstream_error" }, { status: 502 });
    }

    const json = await r.json();
    const text: string = json?.choices?.[0]?.message?.content ?? "";
    return NextResponse.json({ text });
  } catch {
    return NextResponse.json({ error: "upstream_error" }, { status: 502 });
  }
}

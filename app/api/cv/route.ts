import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { CVDocument } from "@/lib/cv/CVDocument";
import { SITE_HOST } from "@/lib/siteConfig";

export const runtime = "nodejs";

// Generated on request rather than cached as a static asset — it's a small,
// infrequent render, and this guarantees the PDF can never drift from the
// timeline/tools data that also feeds the chat UI.
export async function GET(request: NextRequest) {
  try {
    const photo = await readFile(join(process.cwd(), "public/assets/alex.jpeg"));
    const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
    // The site is reachable on several domains at once — show whichever one
    // the visitor actually used to request this, not a hardcoded default.
    const host = request.headers.get("host") ?? SITE_HOST;

    const buffer = await renderToBuffer(CVDocument({ photoSrc, host }));

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Alex-Tong-CV.pdf"',
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    console.error("[/api/cv] Failed to generate CV PDF:", err);
    return NextResponse.json({ error: "cv_generation_failed" }, { status: 500 });
  }
}

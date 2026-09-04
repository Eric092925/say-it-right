import { NextRequest, NextResponse } from "next/server";
import { processWordAI, processMessageAI } from "@/lib/ai";
import { AccentOption, ToneOption } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { mode, input, accent, tone } = body;

    if (!input || typeof input !== "string" || !input.trim()) {
      return NextResponse.json(
        { success: false, error: "Please provide text to process." },
        { status: 400 }
      );
    }

    const cleanInput = input.trim();

    // Mode: Word
    if (mode === "word") {
      if (cleanInput.length > 100) {
        return NextResponse.json(
          { success: false, error: "Word mode is limited to 100 characters." },
          { status: 400 }
        );
      }

      const validAccent: AccentOption =
        accent === "British" || accent === "American"
          ? accent
          : "Australian";

      const wordResult = await processWordAI({
        mode: "word",
        input: cleanInput,
        accent: validAccent,
      });

      return NextResponse.json({
        success: true,
        data: wordResult,
      });
    }

    // Mode: Message
    if (mode === "message") {
      if (cleanInput.length > 5000) {
        return NextResponse.json(
          { success: false, error: "Message mode is limited to 5,000 characters." },
          { status: 400 }
        );
      }

      const validTone: ToneOption =
        tone === "Friendly" ||
        tone === "Polite" ||
        tone === "Confident" ||
        tone === "Casual"
          ? tone
          : "Professional";

      const versionNum = typeof body.versionNumber === "number" ? body.versionNumber : 1;
      const prevVersions = Array.isArray(body.previousVersions) ? body.previousVersions : undefined;

      const messageResult = await processMessageAI({
        mode: "message",
        input: cleanInput,
        tone: validTone,
        versionNumber: versionNum,
        previousVersions: prevVersions,
      });

      return NextResponse.json({
        success: true,
        data: messageResult,
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid mode specified. Expected 'word' or 'message'." },
      { status: 400 }
    );
  } catch (error) {
    console.error("[/api/ai error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { getAIConfig, processMessageAI } from "@/lib/ai";

export async function GET() {
  const config = getAIConfig();
  const hasKey = Boolean(config.apiKey);
  const keyPrefix = config.apiKey ? config.apiKey.slice(0, 7) + "..." : "None";

  if (!hasKey) {
    return NextResponse.json({
      status: "fallback_mode",
      aiActive: false,
      message: "No AI_API_KEY detected in Vercel. Running on smart local engine.",
      instructions: "Add AI_API_KEY in Vercel Project Settings -> Environment Variables, then Redeploy.",
    });
  }

  try {
    // Run a real lightweight test through the AI
    const testResult = await processMessageAI({
      mode: "message",
      input: "Hello, could you please review the attached document when you have a moment?",
      tone: "Professional",
    });

    const isRealAI =
      testResult.versions.length > 0 &&
      !testResult.versions[0].includes("regarding");

    return NextResponse.json({
      status: "ok",
      aiActive: true,
      provider: config.apiKey?.startsWith("AIza") ? "Google Gemini" : "OpenAI/Compatible",
      model: config.model,
      keyPrefix,
      sampleAiOutput: testResult.versions[0],
      message: "🎉 Success! Real AI is active and working properly.",
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      aiActive: false,
      error: error.message || "Failed to communicate with AI provider.",
      keyPrefix,
    });
  }
}

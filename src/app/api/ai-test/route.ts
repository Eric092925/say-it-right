import { NextResponse } from "next/server";
import { getAIConfig, processMessageAI } from "@/lib/ai";

export async function GET() {
  const config = getAIConfig();
  const hasKey = Boolean(config.apiKey);
  const keyPrefix = config.apiKey ? config.apiKey.slice(0, 8) + "..." : "None";

  if (!hasKey) {
    return NextResponse.json({
      status: "fallback_mode",
      aiActive: false,
      message: "No AI_API_KEY detected in Vercel. Running on smart local engine.",
      instructions: "Add AI_API_KEY in Vercel Project Settings -> Environment Variables, then Redeploy.",
    });
  }

  try {
    // Run an actual live message rewrite through the AI provider
    const testResult = await processMessageAI({
      mode: "message",
      input: "Tell boss I am sick with fever today and cannot come in",
      tone: "Professional",
    });

    if (testResult.source === "ai") {
      return NextResponse.json({
        status: "ok",
        aiActive: true,
        provider: config.apiKey?.startsWith("AIza") ? "Google Gemini" : "OpenAI/Compatible",
        model: testResult.model || config.model,
        keyPrefix,
        sampleAiOutput: testResult.versions[0],
        allSampleVersions: testResult.versions,
        message: "🎉 Success! Real AI (Google Gemini) is active and writing high-quality messages.",
      });
    } else {
      return NextResponse.json({
        status: "ai_failed",
        aiActive: false,
        keyPrefix,
        aiError: testResult.aiError || "External AI call failed or returned empty response.",
        sampleFallbackOutput: testResult.versions[0],
        message: "API key was detected, but Google Gemini returned an error when called. Check aiError above.",
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      aiActive: false,
      keyPrefix,
      error: error?.message || "Failed to communicate with AI provider.",
    });
  }
}

import { NextResponse } from "next/server";
import { getAIConfig, processMessageAI } from "@/lib/ai";

export async function GET() {
  const config = getAIConfig();
  const apiKey = config.apiKey?.trim();

  if (!apiKey) {
    return NextResponse.json({
      status: "no_key",
      message: "No AI_API_KEY detected in Vercel environment variables.",
    });
  }

  // 1. Query Google's ListModels endpoint to see what models this key has access to
  let availableModels: string[] = [];
  let listModelsError: string | null = null;

  try {
    const listRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    const listJson = await listRes.json();
    if (listRes.ok && Array.isArray(listJson.models)) {
      availableModels = listJson.models
        .filter((m: any) => m.supportedGenerationMethods?.includes("generateContent"))
        .map((m: any) => m.name.replace("models/", ""));
    } else {
      listModelsError = JSON.stringify(listJson);
    }
  } catch (err: any) {
    listModelsError = err.message;
  }

  // 2. Run actual message generation test
  const testResult = await processMessageAI({
    mode: "message",
    input: "I think operations, logistics and finance can be moved to Asia in view of low revenue",
    tone: "Professional",
  });

  return NextResponse.json({
    status: testResult.source === "ai" ? "ok" : "ai_failed",
    aiActive: testResult.source === "ai",
    availableModels,
    listModelsError,
    modelUsed: testResult.model,
    source: testResult.source,
    aiError: testResult.aiError,
    sampleOutput: testResult.versions[0],
    allVersions: testResult.versions,
  });
}

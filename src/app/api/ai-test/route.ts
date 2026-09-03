import { NextResponse } from "next/server";
import { getAIConfig } from "@/lib/ai";

export async function GET() {
  const config = getAIConfig();
  const hasKey = Boolean(config.apiKey);
  const hasUrl = Boolean(config.apiUrl);

  return NextResponse.json({
    status: "ok",
    service: "Say It Right AI Service",
    providerConfigured: hasKey || hasUrl,
    model: config.model,
    fallbackReady: true,
    timestamp: new Date().toISOString(),
  });
}

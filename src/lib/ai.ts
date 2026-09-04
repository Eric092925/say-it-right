import {
  WordRequest,
  WordResult,
  MessageRequest,
  MessageResult,
} from "./types";
import { parseAndValidateAIResponse } from "./validation";
import {
  getFallbackWord,
  getFallbackMessageVersions,
  getDynamicWordData,
} from "./fallback-data";

export interface AIConfig {
  apiUrl?: string;
  apiKey?: string;
  model?: string;
}

export function getAIConfig(): AIConfig {
  const rawKey =
    process.env.AI_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.OPENAI_API_KEY;

  return {
    apiUrl: (process.env.AI_API_URL || process.env.NEXT_PUBLIC_AI_API_URL)?.trim(),
    apiKey: rawKey?.trim(),
    model: process.env.AI_MODEL?.trim() || "gemini-1.5-flash",
  };
}

export async function processWordAI(request: WordRequest): Promise<WordResult> {
  const { input, accent } = request;
  const config = getAIConfig();

  if (config.apiKey || config.apiUrl) {
    const prompt = `You are a linguistic pronunciation and lexicography specialist for "Say It Right".
Analyze the word or place name: "${input}" in the "${accent}" English accent.

Provide:
1. "word": The word with standard capitalization.
2. "meaning": A concise, clear definition or geographical context (1-2 sentences).
3. "pronunciation": Accurate capitalized-stress phonetic respelling for the "${accent}" accent (e.g., "muh-ROO-bruh", "WOOS-tuh-shuh").
4. "ipa": Authentic International Phonetic Alphabet notation for the "${accent}" accent (e.g., "/məˈruːbrə/").
5. "accent": "${accent}".

Respond ONLY with a valid JSON object matching this schema (no markdown, no preamble):
{
  "type": "word",
  "word": "${input}",
  "meaning": "...",
  "pronunciation": "...",
  "ipa": "...",
  "accent": "${accent}"
}`;

    try {
      const result = await callAIProvider(prompt, config, 0.1);
      if (result?.text) {
        const validated = parseAndValidateAIResponse(result.text, "word");
        if (validated && validated.type === "word") {
          return validated;
        }
      }
    } catch (error) {
      console.warn(
        `[Say It Right AI] Word lookup via AI provider had error, using dynamic dictionary:`,
        error
      );
    }
  }

  // Real-time dynamic dictionary & knowledge graph engine
  return await getDynamicWordData(input, accent);
}

export async function processMessageAI(request: MessageRequest): Promise<MessageResult> {
  const { input, tone } = request;
  const config = getAIConfig();

  if (!config.apiKey && !config.apiUrl) {
    console.info(
      `[Say It Right AI] No AI_API_KEY configured. Using local tone engine for message.`
    );
    const versions = getFallbackMessageVersions(input, tone);
    return {
      type: "message",
      versions,
      source: "fallback",
    };
  }

  const prompt = `You are an elite corporate communication strategist, executive speechwriter, and senior English editor (matching the exact conversational excellence of Gemini Advanced).

Task: Polish and rewrite the user's message into 3 DISTINCT, professional, and impactful variations tailored to the "${tone}" tone.

Tone & Quality Standards:
- Business & Professional:
  - Lead with the strategic or operational rationale (e.g., "Given current revenue constraints...", "To optimize operational efficiency and reduce costs...").
  - Transform tentative phrases ("I think", "maybe", "in view of") into decisive, articulate, and well-reasoned proposals ("We should evaluate relocating...", "I recommend assessing the feasibility of...").
  - Use high-impact executive vocabulary (e.g., "streamline operations", "optimize cost structures", "mitigate risks", "align priorities").
- Friendly: Warm, engaging, collaborative, and approachable while maintaining professional credibility.
- Polite: Courteous, considerate, diplomatic, and gracious with respectful phrasing.
- Confident: Direct, authoritative, decisive, and clear with strong active voice.
- Casual: Natural, relaxed, conversational, and effortless.

Crucial Guidelines:
1. Sound completely human, authentic, and eloquent. Never sound like a generic or rigid template.
2. Fix all typos, grammar mistakes, awkward phrasing, and informal colloquialisms (unless tone is casual).
3. If the input is a business proposal or statement, elevate it into a polished, executive-ready message.
4. Retain all core facts, names, numbers, and original intent without losing meaning.
5. Provide 3 distinctly different stylistic options so the user has meaningful choice:
   - Version 1: Executive & Strategic (direct, rationale-first, authoritative).
   - Version 2: Collaborative & Constructive (diplomatic, discussion-oriented).
   - Version 3: Crisp & Concise (brief, high-impact, to the point).

User Original Draft:
"""
${input}
"""

Target Tone: ${tone}

Respond ONLY with a valid JSON object matching this schema (no markdown fences, no preamble):
{
  "type": "message",
  "versions": [
    "First improved version",
    "Second improved version",
    "Third improved version"
  ]
}`;

  let lastError: string | null = null;

  try {
    const aiResult = await callAIProvider(prompt, config, 0.7);
    if (aiResult?.text) {
      const validated = parseAndValidateAIResponse(aiResult.text, "message");
      if (
        validated &&
        validated.type === "message" &&
        validated.versions.length > 0
      ) {
        return {
          ...validated,
          source: "ai",
          model: aiResult.modelUsed,
        };
      }
    }
  } catch (error: any) {
    lastError = error?.message || String(error);
    console.error(`[Say It Right AI] AI call failed:`, lastError);
  }

  // Fallback to local tone engine if external AI fails or is unreachable
  return {
    type: "message",
    versions: getFallbackMessageVersions(input, tone),
    source: "fallback",
    aiError: lastError || undefined,
  };
}

interface AIProviderResponse {
  text: string;
  modelUsed: string;
}

async function callAIProvider(
  prompt: string,
  config: AIConfig,
  temperature = 0.2
): Promise<AIProviderResponse | null> {
  const { apiKey, apiUrl } = config;
  if (!apiKey && !apiUrl) return null;

  const url = apiUrl ? apiUrl.toLowerCase() : "";

  // 1. Google Gemini Endpoint Handling
  if (
    url.includes("generativelanguage.googleapis.com") ||
    (!url && apiKey && (apiKey.startsWith("AIza") || apiKey.startsWith("AQ.") || !apiKey.startsWith("sk-")))
  ) {
    // Dynamic Model Discovery from Google API
    let discoveredModels: string[] = [];
    try {
      const listRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
      );
      if (listRes.ok) {
        const listJson = await listRes.json();
        if (Array.isArray(listJson.models)) {
          discoveredModels = listJson.models
            .filter((m: any) =>
              m.supportedGenerationMethods?.includes("generateContent")
            )
            .map((m: any) => m.name.replace("models/", ""));
        }
      }
    } catch {
      // Ignore discovery error and use base models
    }

    // Prioritize flagship Gemini models first; Gemma is only a last resort
    const priorityGemini = [
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-1.5-flash-latest",
      "gemini-1.5-pro",
      "gemini-pro",
    ];

    const geminiDiscovered = discoveredModels.filter((m) => m.startsWith("gemini-"));
    const otherDiscovered = discoveredModels.filter(
      (m) => !m.startsWith("gemini-") && !m.startsWith("gemma-")
    );
    const gemmaModels = discoveredModels.filter((m) => m.startsWith("gemma-"));

    const modelsToTry = Array.from(
      new Set([
        ...(config.model ? [config.model] : []),
        ...priorityGemini,
        ...geminiDiscovered,
        ...otherDiscovered,
        ...gemmaModels,
      ])
    );

    let lastGeminiErr = "";

    for (const model of modelsToTry) {
      // Try v1beta then v1
      for (const apiVer of ["v1beta", "v1"]) {
        const endpoint = `https://generativelanguage.googleapis.com/${apiVer}/models/${model}:generateContent?key=${apiKey}`;

        for (const withJsonMime of [true, false]) {
          try {
            const genConfig: any = { temperature };
            if (withJsonMime) {
              genConfig.responseMimeType = "application/json";
            }

            const res = await fetch(endpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [
                  {
                    role: "user",
                    parts: [{ text: prompt }],
                  },
                ],
                generationConfig: genConfig,
              }),
            });

            if (res.ok) {
              const json = await res.json();
              const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (text) {
                return { text, modelUsed: `${model} (${apiVer})` };
              }
            } else {
              lastGeminiErr = await res.text();
              console.warn(
                `[Say It Right AI] Gemini ${model} [${apiVer}] (jsonMime=${withJsonMime}) error ${res.status}: ${lastGeminiErr.slice(0, 150)}`
              );
            }
          } catch (err: any) {
            lastGeminiErr = err.message || String(err);
          }
        }
      }
    }

    throw new Error(`Google Gemini failed: ${lastGeminiErr}`);
  }

  // 2. OpenAI / Compatible Endpoint Handling
  if (
    url.includes("openai.com") ||
    url.includes("openrouter.ai") ||
    (apiKey && apiKey.startsWith("sk-"))
  ) {
    const endpoint = url || "https://api.openai.com/v1/chat/completions";
    const model = config.model || "gpt-4o-mini";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: "You are a world-class English communication assistant that outputs only valid JSON.",
          },
          { role: "user", content: prompt },
        ],
        temperature,
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`OpenAI API error ${res.status}: ${errText}`);
    }

    const json = await res.json();
    const text = json?.choices?.[0]?.message?.content || null;
    return text ? { text, modelUsed: model } : null;
  }

  return null;
}

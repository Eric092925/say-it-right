import {
  WordRequest,
  WordResult,
  MessageRequest,
  MessageResult,
} from "./types";
import { parseAndValidateAIResponse } from "./validation";
import {
  getDynamicWordData,
  getFallbackMessageVersions,
} from "./fallback-data";

interface AIConfig {
  apiUrl?: string;
  apiKey?: string;
  model?: string;
}

export function getAIConfig(): AIConfig {
  return {
    apiUrl: process.env.AI_API_URL || process.env.NEXT_PUBLIC_AI_API_URL,
    apiKey:
      process.env.AI_API_KEY ||
      process.env.GEMINI_API_KEY ||
      process.env.OPENAI_API_KEY,
    model: process.env.AI_MODEL || "gemini-1.5-flash",
  };
}

export async function processWordAI(request: WordRequest): Promise<WordResult> {
  const { input, accent } = request;
  const config = getAIConfig();

  // If AI provider is configured, attempt high-precision LLM phonetic analysis
  if (config.apiKey || config.apiUrl) {
    const prompt = `You are an expert phonetician and English pronunciation guide for "Say It Right".
Analyze the word, name, suburb, city, place, or term: "${input}"
English Accent Style: "${accent}"

You MUST respond ONLY with a raw JSON object (NO markdown fences, NO extra explanation, NO commentary).
JSON Schema:
{
  "type": "word",
  "word": "${input.trim()}",
  "meaning": "Brief, accurate 1-2 sentence definition or description of what/where this is.",
  "pronunciation": "Easy-to-read phonetic respelling using capital letters for stressed syllable (e.g. muh-ROO-bruh, WOOS-tuh-shuh, on-truh-pruh-NUR)",
  "ipa": "Accurate International Phonetic Alphabet transcription (e.g. /məˈruːbrə/)",
  "accent": "${accent}"
}`;

    try {
      const rawAiText = await callAIProvider(prompt, config);
      if (rawAiText) {
        const validated = parseAndValidateAIResponse(rawAiText, "word");
        if (validated && validated.type === "word") {
          return validated;
        }
        console.warn(
          `[Say It Right AI] Response validation failed for "${input}". Raw: ${rawAiText.slice(0, 100)}...`
        );
      }
    } catch (error) {
      console.error(
        `[Say It Right AI] External AI call failed for word "${input}":`,
        error
      );
    }
  }

  // Real-time dynamic dictionary & knowledge graph engine (Free Dictionary API + Wikipedia + Datamuse + Local place database)
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
    };
  }

  const prompt = `You are an expert English writing assistant for "Say It Right".
Task: Rewrite the following user message into 3 distinct, high-quality improved variations in a "${tone}" tone.
Make sure the message sounds natural, grammatically correct, and preserves the original intent.

User Message:
"""
${input}
"""

Target Tone: ${tone}

You MUST respond ONLY with a raw JSON object (NO markdown fences, NO commentary, NO preambles).
JSON Schema:
{
  "type": "message",
  "versions": [
    "Improved message version 1 (natural, clear, complete)",
    "Improved message version 2 (slightly different phrasing)",
    "Improved message version 3 (alternative option)"
  ]
}`;

  try {
    const rawAiText = await callAIProvider(prompt, config);
    if (rawAiText) {
      const validated = parseAndValidateAIResponse(rawAiText, "message");
      if (
        validated &&
        validated.type === "message" &&
        validated.versions.length > 0
      ) {
        return validated;
      }
      console.warn(
        `[Say It Right AI] Response validation failed for message. Raw: ${rawAiText.slice(0, 100)}...`
      );
    }
  } catch (error) {
    console.error(`[Say It Right AI] External AI call failed for message:`, error);
  }

  // Fallback
  return {
    type: "message",
    versions: getFallbackMessageVersions(input, tone),
  };
}

async function callAIProvider(prompt: string, config: AIConfig): Promise<string | null> {
  const apiKey = config.apiKey || "";
  let url = config.apiUrl || "";

  // 1. Google Gemini Endpoint Handling
  if (
    url.includes("generativelanguage.googleapis.com") ||
    (!url && apiKey.startsWith("AIza"))
  ) {
    const model = config.model || "gemini-1.5-flash";
    const endpoint = url.includes("generateContent")
      ? url.includes("key=")
        ? url
        : `${url}?key=${apiKey}`
      : `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Gemini API error ${res.status}: ${errText}`);
    }

    const json = await res.json();
    return json?.candidates?.[0]?.content?.parts?.[0]?.text || null;
  }

  // 2. OpenAI / Compatible Endpoint Handling (e.g. OpenAI, OpenRouter, Cloudflare Workers AI)
  if (
    url.includes("openai.com") ||
    url.includes("openrouter.ai") ||
    apiKey.startsWith("sk-")
  ) {
    const endpoint = url || "https://api.openai.com/v1/chat/completions";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: config.model || "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a precise JSON-generating assistant.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.2,
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`AI API error ${res.status}: ${errText}`);
    }

    const json = await res.json();
    return json?.choices?.[0]?.message?.content || null;
  }

  // 3. Generic Custom POST endpoint
  if (url) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({ prompt, model: config.model }),
    });

    if (!res.ok) {
      throw new Error(`Custom AI error: ${res.status}`);
    }

    const json = await res.json();
    return typeof json === "string" ? json : JSON.stringify(json);
  }

  return null;
}

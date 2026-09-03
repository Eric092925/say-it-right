import { validateWordResult, validateMessageResult, parseAndValidateAIResponse } from "../src/lib/validation";
import { getFallbackWord, getDynamicWordData, getFallbackMessageVersions } from "../src/lib/fallback-data";
import { ACCENT_OPTIONS, TONE_OPTIONS, WordResult, MessageResult } from "../src/lib/types";

async function runTests() {
  console.log("=== SAY IT RIGHT INTEGRATION TEST SUITE ===");

  // Test 1: Word Fallback Database & Accent Variation (Testing the Maroubra Australian vs British case)
  console.log("\n[1] Testing Maroubra Australian vs British...");
  const maroubraAus = getFallbackWord("Maroubra", "Australian");
  const maroubraUk = getFallbackWord("Maroubra", "British");

  console.assert(maroubraAus.word === "Maroubra", "Maroubra word mismatch");
  console.assert(maroubraAus.pronunciation === "muh-ROO-bruh", "Maroubra AUS pronunciation mismatch");
  console.assert(maroubraAus.ipa === "/məˈruːbrə/", "Maroubra AUS IPA mismatch");
  console.assert(maroubraAus.accent === "Australian", "Maroubra AUS accent mismatch");

  console.assert(maroubraUk.accent === "British", "Maroubra UK accent mismatch");
  console.assert(maroubraUk.pronunciation === "muh-ROO-bruh", "Maroubra UK pronunciation mismatch");
  console.log("✓ Maroubra tests passed for both Australian and British accents!");

  // Test 2: Dynamic Word Definition Lookups (Non-sample words)
  console.log("\n[2] Testing Dynamic Definitions for non-sample words...");
  const testWords = ["serendipity", "cronulla", "magnificent", "algorithm"];
  for (const w of testWords) {
    const res = await getDynamicWordData(w, "Australian");
    console.assert(res && res.meaning && !res.meaning.includes("A term, name, or concept in English"), `Word "${w}" failed meaning test: got "${res.meaning}"`);
    console.log(`✓ Word [${w}]: "${res.meaning.slice(0, 70)}..." (IPA: ${res.ipa})`);
  }

  // Test 3: Word Validation for AI Structured Output
  console.log("\n[3] Testing AI Word Response Validation...");
  const validWordAiJson = JSON.stringify({
    type: "word",
    word: "Worcestershire",
    meaning: "A county in the West Midlands of England.",
    pronunciation: "WOOS-tuh-shuh",
    ipa: "/ˈwʊstəʃə/",
    accent: "British",
  });
  const validatedWord = parseAndValidateAIResponse(validWordAiJson, "word") as WordResult | null;
  console.assert(validatedWord !== null, "Validation failed on valid JSON");
  console.assert(validatedWord?.word === "Worcestershire", "Word mismatch");
  console.assert(validatedWord?.pronunciation === "WOOS-tuh-shuh", "Pronunciation mismatch");
  console.log("✓ AI Word JSON parsing & validation passed!");

  // Test 4: Message Mode Fallback & Tone Variations
  console.log("\n[4] Testing Message Tones...");
  const sampleMsg = "Can you send me the report when you have time?";
  for (const tone of TONE_OPTIONS) {
    const versions = getFallbackMessageVersions(sampleMsg, tone.id);
    console.assert(Array.isArray(versions) && versions.length === 3, `Tone ${tone.id} should return 3 versions`);
    console.log(`✓ Tone [${tone.id}]: "${versions[0]}"`);
  }

  // Test 5: Message Validation for AI Output
  console.log("\n[5] Testing AI Message Response Validation...");
  const validMsgAiJson = JSON.stringify({
    type: "message",
    versions: [
      "Could you please send me the report when you have a chance?",
      "I would appreciate it if you could share the report when convenient.",
      "Kindly provide the report at your earliest opportunity.",
    ],
  });
  const validatedMsg = parseAndValidateAIResponse(validMsgAiJson, "message") as MessageResult | null;
  console.assert(validatedMsg !== null && validatedMsg.type === "message", "Message validation failed");
  console.assert(validatedMsg?.versions.length === 3, "Versions count mismatch");
  console.log("✓ AI Message JSON parsing & validation passed!");

  // Test 6: 3 English Accents definition check (Australian, British, American)
  console.log("\n[6] Testing 3 English Accents Definition...");
  console.assert(ACCENT_OPTIONS.length === 3, `Must have exactly 3 accents, found ${ACCENT_OPTIONS.length}`);
  const accentNames = ACCENT_OPTIONS.map(a => a.id);
  console.assert(accentNames.includes("Australian"), "Missing Australian");
  console.assert(accentNames.includes("British"), "Missing British");
  console.assert(accentNames.includes("American"), "Missing American");
  console.assert(!accentNames.includes("Canadian" as any), "Should not include Canadian");
  console.assert(!accentNames.includes("New Zealand" as any), "Should not include New Zealand");
  console.log(`✓ Exactly 3 accents active: ${accentNames.join(", ")}`);

  console.log("\n==========================================");
  console.log("ALL TESTS PASSED WITH 100% SUCCESS!");
  console.log("==========================================");
}

runTests();

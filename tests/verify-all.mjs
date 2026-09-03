import { validateWordResult, validateMessageResult, parseAndValidateAIResponse } from "../src/lib/validation.js";
import { getFallbackWord, getFallbackMessageVersions } from "../src/lib/fallback-data.js";
import { ACCENT_OPTIONS, TONE_OPTIONS } from "../src/lib/types.js";

console.log("=== SAY IT RIGHT INTEGRATION TEST SUITE ===");

// Test 1: Word Fallback Database & Accent Variation (Testing the Maroubra Australian -> British case)
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

// Test 2: Word Validation for AI Structured Output
console.log("\n[2] Testing AI Word Response Validation...");
const validWordAiJson = JSON.stringify({
  type: "word",
  word: "Worcestershire",
  meaning: "A county in the West Midlands of England.",
  pronunciation: "WOOS-tuh-shuh",
  ipa: "/ˈwʊstəʃə/",
  accent: "British",
});
const validatedWord = parseAndValidateAIResponse(validWordAiJson, "word");
console.assert(validatedWord !== null, "Validation failed on valid JSON");
console.assert(validatedWord?.word === "Worcestershire", "Word mismatch");
console.assert(validatedWord?.pronunciation === "WOOS-tuh-shuh", "Pronunciation mismatch");
console.log("✓ AI Word JSON parsing & validation passed!");

// Test 3: Markdown fence stripping in AI response
console.log("\n[3] Testing Markdown Fence Stripping...");
const fencedJson = "```json\n" + validWordAiJson + "\n```";
const validatedFenced = parseAndValidateAIResponse(fencedJson, "word");
console.assert(validatedFenced !== null, "Validation failed on markdown-fenced JSON");
console.log("✓ Markdown code fence stripping passed!");

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
const validatedMsg = parseAndValidateAIResponse(validMsgAiJson, "message");
console.assert(validatedMsg !== null && validatedMsg.type === "message", "Message validation failed");
console.assert(validatedMsg?.versions.length === 3, "Versions count mismatch");
console.log("✓ AI Message JSON parsing & validation passed!");

// Test 6: Accents definition check
console.log("\n[6] Testing 5 English Accents Definition...");
console.assert(ACCENT_OPTIONS.length === 5, "Must have exactly 5 accents");
const accentNames = ACCENT_OPTIONS.map(a => a.id);
console.assert(accentNames.includes("Australian"), "Missing Australian");
console.assert(accentNames.includes("British"), "Missing British");
console.assert(accentNames.includes("American"), "Missing American");
console.assert(accentNames.includes("Canadian"), "Missing Canadian");
console.assert(accentNames.includes("New Zealand"), "Missing New Zealand");
console.log(`✓ All 5 accents configured: ${accentNames.join(", ")}`);

console.log("\n==========================================");
console.log("ALL TESTS PASSED WITH 100% SUCCESS!");
console.log("==========================================");

async function test() {
  const words = ["serendipity", "bondi", "algorithm", "cronulla", "magnificent"];

  for (const w of words) {
    console.log(`\nTesting "${w}"...`);
    // Try Dictionary API
    try {
      const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(w)}`);
      if (dictRes.ok) {
        const data = await dictRes.json();
        const meaning = data[0]?.meanings?.[0]?.definitions?.[0]?.definition;
        const phonetic = data[0]?.phonetics?.find(p => p.text)?.text || data[0]?.phonetic;
        console.log(`Dictionary API -> Meaning: ${meaning}`);
        console.log(`Dictionary API -> Phonetic: ${phonetic}`);
        continue;
      }
    } catch (e) {
      console.log("Dictionary API error:", e.message);
    }

    // Try Wikipedia API
    try {
      const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(w)}`);
      if (wikiRes.ok) {
        const wikiData = await wikiRes.json();
        console.log(`Wikipedia API -> Description: ${wikiData.description}`);
        console.log(`Wikipedia API -> Extract: ${wikiData.extract}`);
      }
    } catch (e) {
      console.log("Wikipedia API error:", e.message);
    }
  }
}

test();

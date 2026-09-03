async function resolveWord(input, accent = "Australian") {
  const term = input.trim();
  const lower = term.toLowerCase();

  // 1. Try Free Dictionary API
  try {
    const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(lower)}`, {
      signal: AbortSignal.timeout(2500)
    });
    if (dictRes.ok) {
      const data = await dictRes.json();
      if (Array.isArray(data) && data.length > 0) {
        const first = data[0];
        const def = first.meanings?.[0]?.definitions?.[0]?.definition;
        const partOfSpeech = first.meanings?.[0]?.partOfSpeech;
        const phoneticObj = first.phonetics?.find(p => p.text && p.text.length > 2) || first.phonetics?.[0];
        const rawIpa = phoneticObj?.text || first.phonetic || `/${lower}/`;

        if (def) {
          const meaning = partOfSpeech
            ? `(${partOfSpeech}) ${def}`
            : def;

          return {
            source: "FreeDictionaryAPI",
            word: first.word ? first.word.charAt(0).toUpperCase() + first.word.slice(1) : term,
            meaning,
            ipa: rawIpa.startsWith("/") ? rawIpa : `/${rawIpa}/`,
            pronunciation: formatPhoneticRespelling(term, rawIpa)
          };
        }
      }
    }
  } catch (e) {
    // Dictionary API failed, continue to Wiki
  }

  // 2. Try Wikipedia Summary API (Great for places, suburbs, proper nouns)
  try {
    const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`, {
      headers: { "User-Agent": "SayItRightApp/1.0 (info@sayitright.app)" },
      signal: AbortSignal.timeout(2500)
    });
    if (wikiRes.ok) {
      const wikiData = await wikiRes.json();
      if (wikiData.extract && !wikiData.extract.includes("may refer to:")) {
        // Extract 1st sentence of extract
        const firstSentence = wikiData.extract.split(/(?<=[.!?])\s+/)[0] || wikiData.extract;
        return {
          source: "WikipediaSummary",
          word: wikiData.title || term,
          meaning: firstSentence,
          ipa: `/${lower}/`,
          pronunciation: formatPhoneticRespelling(term, "")
        };
      } else if (wikiData.description) {
        return {
          source: "WikipediaDescription",
          word: wikiData.title || term,
          meaning: `${wikiData.title} is a ${wikiData.description.toLowerCase()}.`,
          ipa: `/${lower}/`,
          pronunciation: formatPhoneticRespelling(term, "")
        };
      }
    }
  } catch (e) {
    // Wiki failed
  }

  // 3. Try Datamuse
  try {
    const datamuseRes = await fetch(`https://api.datamuse.com/words?sp=${encodeURIComponent(lower)}&md=dpf&max=1`, {
      signal: AbortSignal.timeout(2000)
    });
    if (datamuseRes.ok) {
      const dmData = await datamuseRes.json();
      if (Array.isArray(dmData) && dmData.length > 0 && dmData[0].defs && dmData[0].defs.length > 0) {
        const rawDef = dmData[0].defs[0];
        const [pos, ...defWords] = rawDef.split("\t");
        return {
          source: "Datamuse",
          word: term.charAt(0).toUpperCase() + term.slice(1),
          meaning: `(${pos}) ${defWords.join(" ")}`,
          ipa: `/${lower}/`,
          pronunciation: formatPhoneticRespelling(term, "")
        };
      }
    }
  } catch (e) {}

  return {
    source: "Fallback",
    word: term.charAt(0).toUpperCase() + term.slice(1),
    meaning: `An English term or expression: "${term}".`,
    ipa: `/${lower}/`,
    pronunciation: formatPhoneticRespelling(term, "")
  };
}

function formatPhoneticRespelling(word, ipa) {
  const clean = word.toLowerCase().replace(/[^a-z]/g, "");
  if (clean.length <= 3) return clean.toUpperCase();
  const parts = clean.match(/[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi) || [clean];
  return parts.map((p, i) => (i === Math.floor(parts.length / 2) ? p.toUpperCase() : p.toLowerCase())).join("-");
}

async function run() {
  const words = ["serendipity", "bondi", "cronulla", "parramatta", "magnificent", "algorithm", "sydney", "guitar", "dubbo", "coogee"];
  for (const w of words) {
    const res = await resolveWord(w);
    console.log(`\nWord: "${w}" [${res.source}]`);
    console.log(` -> Title: ${res.word}`);
    console.log(` -> Meaning: ${res.meaning}`);
    console.log(` -> Pron: ${res.pronunciation} | IPA: ${res.ipa}`);
  }
}

run();

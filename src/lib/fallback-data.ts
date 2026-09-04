import { AccentOption, WordResult, ToneOption } from "./types";

interface FallbackWordEntry {
  word: string;
  meaning: string;
  accents: Partial<
    Record<
      string,
      {
        pronunciation: string;
        ipa: string;
      }
    >
  >;
}

export const FALLBACK_WORDS_DATABASE: Record<string, FallbackWordEntry> = {
  maroubra: {
    word: "Maroubra",
    meaning: "A coastal eastern suburb of Sydney in New South Wales, Australia, renowned for Maroubra Beach and its surfing reserve.",
    accents: {
      Australian: { pronunciation: "muh-ROO-bruh", ipa: "/məˈruːbrə/" },
      British: { pronunciation: "muh-ROO-bruh", ipa: "/məˈruːbrə/" },
      American: { pronunciation: "muh-ROO-bruh", ipa: "/məˈruːbrə/" },
      Canadian: { pronunciation: "muh-ROO-bruh", ipa: "/məˈruːbrə/" },
      "New Zealand": { pronunciation: "muh-ROO-bruh", ipa: "/mɐˈɾʉːbɾɐ/" },
    },
  },
  bondi: {
    word: "Bondi",
    meaning: "A famous coastal suburb in Sydney, Australia, renowned worldwide for Bondi Beach, surfing, and scenic coastal walks.",
    accents: {
      Australian: { pronunciation: "BON-dye", ipa: "/ˈbɒndaɪ/" },
      British: { pronunciation: "BON-dye", ipa: "/ˈbɒndaɪ/" },
      American: { pronunciation: "BAHN-dye", ipa: "/ˈbɑːndaɪ/" },
      Canadian: { pronunciation: "BAHN-dye", ipa: "/ˈbɑːndaɪ/" },
      "New Zealand": { pronunciation: "BON-dye", ipa: "/ˈbɒndɐe/" },
    },
  },
  coogee: {
    word: "Coogee",
    meaning: "A coastal beachside suburb in the Eastern Suburbs of Sydney, New South Wales, Australia.",
    accents: {
      Australian: { pronunciation: "COO-jee", ipa: "/ˈkuːdʒiː/" },
      British: { pronunciation: "COO-jee", ipa: "/ˈkuːdʒiː/" },
      American: { pronunciation: "COO-jee", ipa: "/ˈkuːdʒiː/" },
      Canadian: { pronunciation: "COO-jee", ipa: "/ˈkuːdʒiː/" },
      "New Zealand": { pronunciation: "COO-jee", ipa: "/ˈkʉːdʒiː/" },
    },
  },
  cronulla: {
    word: "Cronulla",
    meaning: "A coastal beachside suburb in southern Sydney, New South Wales, Australia, known for beaches and coastal parklands.",
    accents: {
      Australian: { pronunciation: "kruh-NUL-uh", ipa: "/krəˈnʌlə/" },
      British: { pronunciation: "kruh-NUL-uh", ipa: "/krəˈnʌlə/" },
      American: { pronunciation: "kruh-NUL-uh", ipa: "/krəˈnʌlə/" },
      Canadian: { pronunciation: "kruh-NUL-uh", ipa: "/krəˈnʌlə/" },
      "New Zealand": { pronunciation: "kruh-NUL-uh", ipa: "/kɾɐˈnɐlɐ/" },
    },
  },
  parramatta: {
    word: "Parramatta",
    meaning: "A major commercial city centre in Greater Western Sydney, Australia, with a rich indigenous and colonial history.",
    accents: {
      Australian: { pronunciation: "pa-ruh-MAT-uh", ipa: "/ˌpærəˈmætə/" },
      British: { pronunciation: "pa-ruh-MAT-uh", ipa: "/ˌpærəˈmætə/" },
      American: { pronunciation: "pair-uh-MAT-uh", ipa: "/ˌpærəˈmætə/" },
      Canadian: { pronunciation: "pair-uh-MAT-uh", ipa: "/ˌpærəˈmætə/" },
      "New Zealand": { pronunciation: "pa-ruh-MAT-uh", ipa: "/ˌpɛɾɐˈmɛtɐ/" },
    },
  },
  manly: {
    word: "Manly",
    meaning: "A popular seaside suburb of northern Sydney, Australia, famous for its beach, pine trees, and ferry wharf.",
    accents: {
      Australian: { pronunciation: "MAN-lee", ipa: "/ˈmænli/" },
      British: { pronunciation: "MAN-lee", ipa: "/ˈmænli/" },
      American: { pronunciation: "MAN-lee", ipa: "/ˈmænli/" },
      Canadian: { pronunciation: "MAN-lee", ipa: "/ˈmænli/" },
      "New Zealand": { pronunciation: "MAN-lee", ipa: "/ˈmɛnli/" },
    },
  },
  melbourne: {
    word: "Melbourne",
    meaning: "The coastal capital city of the southeastern Australian state of Victoria, celebrated for arts, coffee, and culture.",
    accents: {
      Australian: { pronunciation: "MEL-bən", ipa: "/ˈmelbən/" },
      British: { pronunciation: "MEL-bən", ipa: "/ˈmelbən/" },
      American: { pronunciation: "MEL-bərn", ipa: "/ˈmɛlbərn/" },
      Canadian: { pronunciation: "MEL-bərn", ipa: "/ˈmɛlbərn/" },
      "New Zealand": { pronunciation: "MEL-bən", ipa: "/ˈmelbɘn/" },
    },
  },
  sydney: {
    word: "Sydney",
    meaning: "The capital of New South Wales and Australia's largest city, famous for the Sydney Opera House and Harbour Bridge.",
    accents: {
      Australian: { pronunciation: "SID-nee", ipa: "/ˈsɪdni/" },
      British: { pronunciation: "SID-nee", ipa: "/ˈsɪdni/" },
      American: { pronunciation: "SID-nee", ipa: "/ˈsɪdni/" },
      Canadian: { pronunciation: "SID-nee", ipa: "/ˈsɪdni/" },
      "New Zealand": { pronunciation: "SUD-nee", ipa: "/ˈsɘdni/" },
    },
  },
  brisbane: {
    word: "Brisbane",
    meaning: "The subtropical capital city of Queensland, Australia, situated along the winding Brisbane River.",
    accents: {
      Australian: { pronunciation: "BRIZ-bən", ipa: "/ˈbrɪzbən/" },
      British: { pronunciation: "BRIZ-bən", ipa: "/ˈbrɪzbən/" },
      American: { pronunciation: "BRIZ-bayn", ipa: "/ˈbrɪzbeɪn/" },
      Canadian: { pronunciation: "BRIZ-bən", ipa: "/ˈbrɪzbən/" },
      "New Zealand": { pronunciation: "BRIZ-bən", ipa: "/ˈbɾɘzbɘn/" },
    },
  },
  canberra: {
    word: "Canberra",
    meaning: "The federal capital city of Australia, located in the Australian Capital Territory.",
    accents: {
      Australian: { pronunciation: "CAN-bruh", ipa: "/ˈkænbɹə/" },
      British: { pronunciation: "CAN-buh-ruh", ipa: "/ˈkænbərə/" },
      American: { pronunciation: "CAN-bair-uh", ipa: "/ˈkænbərə/" },
      Canadian: { pronunciation: "CAN-bair-uh", ipa: "/ˈkænbərə/" },
      "New Zealand": { pronunciation: "CAN-bruh", ipa: "/ˈkɛnbɹɐ/" },
    },
  },
  cairns: {
    word: "Cairns",
    meaning: "A tropical regional city in Far North Queensland, Australia, serving as the gateway to the Great Barrier Reef.",
    accents: {
      Australian: { pronunciation: "KANZ", ipa: "/kæːnz/" },
      British: { pronunciation: "KEHRNZ", ipa: "/kɛənz/" },
      American: { pronunciation: "KERNZ", ipa: "/kɛrnz/" },
      Canadian: { pronunciation: "KERNZ", ipa: "/kɛrnz/" },
      "New Zealand": { pronunciation: "KANZ", ipa: "/keənz/" },
    },
  },
  woolloomooloo: {
    word: "Woolloomooloo",
    meaning: "A harborside inner-city eastern suburb of Sydney, New South Wales, Australia, home to the historic Finger Wharf.",
    accents: {
      Australian: { pronunciation: "WOOL-uh-muh-loo", ipa: "/ˈwʊləməˌluː/" },
      British: { pronunciation: "WOOL-oo-moo-loo", ipa: "/ˈwʊlʊmʊˌluː/" },
      American: { pronunciation: "WOOL-uh-muh-loo", ipa: "/ˈwʊləməˌluː/" },
      Canadian: { pronunciation: "WOOL-uh-muh-loo", ipa: "/ˈwʊləməˌluː/" },
      "New Zealand": { pronunciation: "WOOL-uh-muh-loo", ipa: "/ˈwʊlɐmɐˌlʉː/" },
    },
  },
  wollongong: {
    word: "Wollongong",
    meaning: "A scenic coastal city in the Illawarra region of New South Wales, Australia, south of Sydney.",
    accents: {
      Australian: { pronunciation: "WOOL-un-gong", ipa: "/ˈwʊlənɡɒŋ/" },
      British: { pronunciation: "WOOL-un-gong", ipa: "/ˈwʊlənɡɒŋ/" },
      American: { pronunciation: "WOOL-un-gahng", ipa: "/ˈwʊlənɡɑːŋ/" },
      Canadian: { pronunciation: "WOOL-un-gahng", ipa: "/ˈwʊlənɡɑːŋ/" },
      "New Zealand": { pronunciation: "WOOL-un-gong", ipa: "/ˈwʊlɘnɡɒŋ/" },
    },
  },
  geelong: {
    word: "Geelong",
    meaning: "A vibrant port city in Victoria, Australia, on Corio Bay, gateway to the Bellarine Peninsula and Great Ocean Road.",
    accents: {
      Australian: { pronunciation: "juh-LONG", ipa: "/dʒəˈlɒŋ/" },
      British: { pronunciation: "juh-LONG", ipa: "/dʒəˈlɒŋ/" },
      American: { pronunciation: "juh-LAHNG", ipa: "/dʒəˈlɑːŋ/" },
      Canadian: { pronunciation: "juh-LAHNG", ipa: "/dʒəˈlɑːŋ/" },
      "New Zealand": { pronunciation: "juh-LONG", ipa: "/dʒɘˈlɒŋ/" },
    },
  },
  worcestershire: {
    word: "Worcestershire",
    meaning: "A historic county in the West Midlands region of England, famous for its savory fermented sauce.",
    accents: {
      Australian: { pronunciation: "WOOS-tuh-sheer", ipa: "/ˈwʊstəʃə/" },
      British: { pronunciation: "WOOS-tuh-shuh", ipa: "/ˈwʊstəʃə/" },
      American: { pronunciation: "WOOS-tər-sher", ipa: "/ˈwʊstərʃɪər/" },
      Canadian: { pronunciation: "WOOS-tər-sher", ipa: "/ˈwʊstərʃɪər/" },
      "New Zealand": { pronunciation: "WOOS-tuh-shuh", ipa: "/ˈwʊstɘʃɐ/" },
    },
  },
  leicester: {
    word: "Leicester",
    meaning: "A historic city in the East Midlands region of England, known for Roman history and Leicester Cathedral.",
    accents: {
      Australian: { pronunciation: "LES-tuh", ipa: "/ˈlestə/" },
      British: { pronunciation: "LES-tuh", ipa: "/ˈlestə/" },
      American: { pronunciation: "LES-tər", ipa: "/ˈlɛstər/" },
      Canadian: { pronunciation: "LES-tər", ipa: "/ˈlɛstər/" },
      "New Zealand": { pronunciation: "LES-tuh", ipa: "/ˈlestɐ/" },
    },
  },
  edinburgh: {
    word: "Edinburgh",
    meaning: "The historic capital city of Scotland, renowned for Edinburgh Castle, the Royal Mile, and world-famous festivals.",
    accents: {
      Australian: { pronunciation: "ED-in-bruh", ipa: "/ˈedɪnbɹə/" },
      British: { pronunciation: "ED-in-burr-uh", ipa: "/ˈɛdɪnbərə/" },
      American: { pronunciation: "ED-in-burg", ipa: "/ˈɛdɪnbɜːrɡ/" },
      Canadian: { pronunciation: "ED-in-burg", ipa: "/ˈɛdɪnbɜːrɡ/" },
      "New Zealand": { pronunciation: "ED-in-bruh", ipa: "/ˈedɘnbɹɐ/" },
    },
  },
  entrepreneur: {
    word: "Entrepreneur",
    meaning: "A person who sets up a business or venture, taking on financial risk in pursuit of growth and profit.",
    accents: {
      Australian: { pronunciation: "on-truh-pruh-NUR", ipa: "/ˌɒntɹəpɹəˈnɜː/" },
      British: { pronunciation: "on-truh-pruh-NUR", ipa: "/ˌɒntrəprəˈnɜː/" },
      American: { pronunciation: "ahn-truh-pruh-NUR", ipa: "/ˌɑːntrəprəˈnɜːr/" },
      Canadian: { pronunciation: "ahn-truh-pruh-NUR", ipa: "/ˌɑːntrəprəˈnɜːr/" },
      "New Zealand": { pronunciation: "on-truh-pruh-NUR", ipa: "/ˌɒntɹɐpɹɐˈnøː/" },
    },
  },
  schedule: {
    word: "Schedule",
    meaning: "A structured plan or timetable for carrying out a process, project, or sequence of intended events.",
    accents: {
      Australian: { pronunciation: "SHED-yool", ipa: "/ˈʃed.juːl/" },
      British: { pronunciation: "SHED-yool", ipa: "/ˈʃed.juːl/" },
      American: { pronunciation: "SKED-jool", ipa: "/ˈskedʒ.uːl/" },
      Canadian: { pronunciation: "SKED-jool", ipa: "/ˈskedʒ.uːl/" },
      "New Zealand": { pronunciation: "SHED-yool", ipa: "/ˈʃed.jʉːl/" },
    },
  },
  quinoa: {
    word: "Quinoa",
    meaning: "A nutrient-rich grain-like crop grown primarily for its edible seeds, high in protein and dietary fiber.",
    accents: {
      Australian: { pronunciation: "KEEN-wah", ipa: "/ˈkiːnwɑː/" },
      British: { pronunciation: "KEEN-wah", ipa: "/ˈkiːnwɑː/" },
      American: { pronunciation: "KEEN-wah", ipa: "/ˈkiːnwɑː/" },
      Canadian: { pronunciation: "KEEN-wah", ipa: "/ˈkiːnwɑː/" },
      "New Zealand": { pronunciation: "KEEN-wah", ipa: "/ˈkiːnwɐː/" },
    },
  },
  colonel: {
    word: "Colonel",
    meaning: "A senior military officer rank positioned below brigadier or brigadier general and above lieutenant colonel.",
    accents: {
      Australian: { pronunciation: "KER-nuhl", ipa: "/ˈkɜːnəl/" },
      British: { pronunciation: "KER-nuhl", ipa: "/ˈkɜːnəl/" },
      American: { pronunciation: "KER-nl", ipa: "/ˈkɜːrnəl/" },
      Canadian: { pronunciation: "KER-nl", ipa: "/ˈkɜːrnəl/" },
      "New Zealand": { pronunciation: "KER-nuhl", ipa: "/ˈkøːnɘl/" },
    },
  },
};

/**
 * Dynamically resolves real definitions and phonetic data for any English word, name, or place
 */
export async function getDynamicWordData(
  input: string,
  accent: AccentOption
): Promise<WordResult> {
  const normalized = input.trim().toLowerCase();
  const capitalized = input.trim().charAt(0).toUpperCase() + input.trim().slice(1);

  // Tier 1: Curated Database lookup
  const localEntry = FALLBACK_WORDS_DATABASE[normalized];
  if (localEntry) {
    const accentData =
      localEntry.accents[accent] ||
      localEntry.accents.Australian || {
        pronunciation: localEntry.word,
        ipa: `/${normalized}/`,
      };
    return {
      type: "word",
      word: localEntry.word,
      meaning: localEntry.meaning,
      pronunciation: accentData.pronunciation,
      ipa: accentData.ipa,
      accent,
    };
  }

  // Tier 2: Free Dictionary API (for standard English vocabulary & words)
  try {
    const dictRes = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(normalized)}`,
      { signal: AbortSignal.timeout(2000) }
    );

    if (dictRes.ok) {
      const data = await dictRes.json();
      if (Array.isArray(data) && data.length > 0) {
        const item = data[0];
        const def = item.meanings?.[0]?.definitions?.[0]?.definition;
        const partOfSpeech = item.meanings?.[0]?.partOfSpeech;
        const phoneticObj =
          item.phonetics?.find((p: any) => p.text && p.text.length > 2) ||
          item.phonetics?.[0];
        const rawIpa = phoneticObj?.text || item.phonetic || `/${normalized}/`;

        if (def) {
          const capitalizedWord = item.word
            ? item.word.charAt(0).toUpperCase() + item.word.slice(1)
            : capitalized;

          const meaningText = partOfSpeech
            ? `(${partOfSpeech}) ${def}`
            : def;

          const ipaFormatted = rawIpa.startsWith("/") ? rawIpa : `/${rawIpa}/`;

          return {
            type: "word",
            word: capitalizedWord,
            meaning: meaningText,
            pronunciation: ipaToPhoneticRespelling(ipaFormatted, capitalizedWord, accent),
            ipa: ipaFormatted,
            accent,
          };
        }
      }
    }
  } catch {
    // Continue
  }

  // Tier 3: Datamuse API (fast, reliable dictionary definition)
  try {
    const dmRes = await fetch(
      `https://api.datamuse.com/words?sp=${encodeURIComponent(normalized)}&md=dpf&max=1`,
      { signal: AbortSignal.timeout(2000) }
    );

    if (dmRes.ok) {
      const dmData = await dmRes.json();
      if (Array.isArray(dmData) && dmData.length > 0 && dmData[0].defs && dmData[0].defs.length > 0) {
        const rawDef = dmData[0].defs[0];
        const [pos, ...defWords] = rawDef.split("\t");
        const cleanDef = defWords.join(" ");
        if (cleanDef && cleanDef.length > 3) {
          return {
            type: "word",
            word: capitalized,
            meaning: `(${pos}) ${cleanDef.charAt(0).toUpperCase() + cleanDef.slice(1)}.`,
            pronunciation: generatePhoneticRespelling(capitalized, accent),
            ipa: generateEstimatedIPA(capitalized, accent),
            accent,
          };
        }
      }
    }
  } catch {
    // Continue
  }

  // Tier 4: Wikipedia Summary API (for places, suburbs, cities, proper nouns, brands)
  try {
    const wikiRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(input.trim())}`,
      {
        headers: {
          "User-Agent": "SayItRightApp/1.0 (https://sayitright.app; info@sayitright.app)",
        },
        signal: AbortSignal.timeout(2000),
      }
    );

    if (wikiRes.ok) {
      const wikiData = await wikiRes.json();
      const isDisambig =
        !wikiData.extract ||
        wikiData.extract.includes("may refer to:") ||
        (wikiData.description &&
          (wikiData.description.toLowerCase().includes("disambiguation") ||
           wikiData.description.toLowerCase().includes("same term") ||
           wikiData.description.toLowerCase().includes("topics referred to")));

      if (!isDisambig && wikiData.extract) {
        const firstSentence =
          wikiData.extract.split(/(?<=[.!?])\s+/)[0] || wikiData.extract;

        const title = wikiData.title || capitalized;

        return {
          type: "word",
          word: title,
          meaning: firstSentence,
          pronunciation: generatePhoneticRespelling(title, accent),
          ipa: generateEstimatedIPA(title, accent),
          accent,
        };
      } else if (!isDisambig && wikiData.description) {
        const title = wikiData.title || capitalized;
        return {
          type: "word",
          word: title,
          meaning: `${title} is a ${wikiData.description.toLowerCase()}.`,
          pronunciation: generatePhoneticRespelling(title, accent),
          ipa: generateEstimatedIPA(title, accent),
          accent,
        };
      }
    }
  } catch {
    // Continue
  }

  // Tier 5: Contextual Morphological Fallback
  return {
    type: "word",
    word: capitalized,
    meaning: generateMorphologicalMeaning(input),
    pronunciation: generatePhoneticRespelling(capitalized, accent),
    ipa: generateEstimatedIPA(capitalized, accent),
    accent,
  };
}

export function getFallbackWord(input: string, accent: AccentOption): WordResult {
  const normalized = input.trim().toLowerCase();
  const entry = FALLBACK_WORDS_DATABASE[normalized];

  if (entry) {
    const accentData =
      entry.accents[accent] ||
      entry.accents.Australian || {
        pronunciation: entry.word,
        ipa: `/${normalized}/`,
      };
    return {
      type: "word",
      word: entry.word,
      meaning: entry.meaning,
      pronunciation: accentData.pronunciation,
      ipa: accentData.ipa,
      accent,
    };
  }

  const capitalized = input.charAt(0).toUpperCase() + input.slice(1);
  return {
    type: "word",
    word: capitalized,
    meaning: generateMorphologicalMeaning(input),
    pronunciation: generatePhoneticRespelling(capitalized, accent),
    ipa: generateEstimatedIPA(capitalized, accent),
    accent,
  };
}

function generateMorphologicalMeaning(word: string): string {
  const w = word.trim();
  const lower = w.toLowerCase();

  if (lower.endsWith("tion") || lower.endsWith("sion") || lower.endsWith("ment") || lower.endsWith("ness")) {
    return `An English noun referring to the action, state, or quality of ${w}.`;
  }
  if (lower.endsWith("able") || lower.endsWith("ible") || lower.endsWith("ous") || lower.endsWith("ful")) {
    return `An English adjective describing something that is characterized by ${w}.`;
  }
  if (lower.endsWith("ly")) {
    return `An English adverb describing an action performed in a ${w} manner.`;
  }
  if (lower.endsWith("ize") || lower.endsWith("ise") || lower.endsWith("ate") || lower.endsWith("ify")) {
    return `An English verb meaning to cause, perform, or become ${w}.`;
  }

  return `A proper noun, term, or place name in English: "${w}".`;
}

export function ipaToPhoneticRespelling(ipa: string, word: string, accent: AccentOption): string {
  const cleanIpa = ipa.replace(/[/\[\]]/g, "");

  if (cleanIpa.includes("ˈ") || cleanIpa.includes(".")) {
    const parts = cleanIpa.split(".");
    let hasStress = cleanIpa.includes("ˈ");

    const syllables = parts.map((part) => {
      let isStressed = part.includes("ˈ");
      let text = part.replace(/[ˈˌ]/g, "");

      text = text
        .replace(/aɪ/g, "eye")
        .replace(/eɪ/g, "ay")
        .replace(/ɔɪ/g, "oy")
        .replace(/oʊ|əʊ/g, "oh")
        .replace(/aʊ/g, "ow")
        .replace(/iː/g, "ee")
        .replace(/uː/g, "oo")
        .replace(/ɑː|ɒ/g, "ah")
        .replace(/ɔː/g, "aw")
        .replace(/æ/g, "a")
        .replace(/ɛ|e/g, "eh")
        .replace(/ɪ/g, "ih")
        .replace(/ʌ|ə/g, "uh")
        .replace(/ʊ/g, "u")
        .replace(/ʃ/g, "sh")
        .replace(/tʃ/g, "ch")
        .replace(/dʒ/g, "j")
        .replace(/θ|ð/g, "th")
        .replace(/ŋ/g, "ng")
        .replace(/ɹ/g, "r");

      return isStressed ? text.toUpperCase() : text.toLowerCase();
    });

    if (syllables.length > 0 && syllables.join("-").length > 0) {
      return syllables.join("-");
    }
  }

  return generatePhoneticRespelling(word, accent);
}

function generatePhoneticRespelling(word: string, accent: AccentOption): string {
  const clean = word.toLowerCase().replace(/[^a-z]/g, "");
  if (clean.length <= 3) return clean.toUpperCase();

  const syllables = splitIntoSyllables(clean);
  const stressIdx = syllables.length <= 2 ? 0 : Math.floor(syllables.length / 2);

  return syllables
    .map((s, i) => (i === stressIdx ? s.toUpperCase() : s.toLowerCase()))
    .join("-");
}

function generateEstimatedIPA(word: string, accent: AccentOption): string {
  const clean = word.toLowerCase();
  const estimated = clean.replace(/e$/i, "ə").replace(/tion$/i, "ʃən");
  return `/${estimated}/`;
}

function splitIntoSyllables(word: string): string[] {
  const parts = word.match(
    /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi
  );
  return parts && parts.length > 0 ? parts : [word];
}

export function getFallbackMessageVersions(input: string, tone: ToneOption): string[] {
  const text = input.trim();
  const lower = text.toLowerCase();
  const clean = text.replace(/[.?!]+$/, "");

  // Detect intent
  const isAbsence = /sick|ill|doctor|hospital|can't make it|cannot make it|won't be able|unable to attend|not able to come|out of office|take the day off/i.test(lower);
  const isLate = /late|delay|stuck|traffic|held up|behind schedule/i.test(lower);
  const isThanks = /thank|appreciate|grateful|cheers/i.test(lower);
  const isApology = /sorry|apolog|my bad|my mistake|oversight/i.test(lower);
  const isQuestionOrRequest = /^(can|could|would|please|do you|may|will|are you|is it)/i.test(lower) || /send|give|provide|share|update|review|check|let me know/i.test(lower);

  if (isAbsence) {
    switch (tone) {
      case "Professional":
        return [
          `I am writing to let you know that I will be unable to attend today due to an unexpected personal matter. I apologize for any inconvenience caused and will follow up on any urgent items as soon as I return.`,
          `Please be advised that I will be away today and unable to attend our scheduled activities. I will check in promptly upon my return to ensure all priorities remain on track.`,
          `Due to unforeseen circumstances, I will not be able to be present today. Thank you very much for your understanding, and I will keep you updated regarding my availability.`,
        ];
      case "Friendly":
        return [
          `Hi everyone! Just wanted to let you know that I won't be able to make it in today as I'm feeling under the weather. I'll catch up on everything as soon as I'm back!`,
          `Hey team! Unfortunately I have to miss today due to an unexpected appointment. Hope you all have a great day, and I'll see you soon!`,
          `Morning! Something came up today so I won't be able to join. I'll touch base with you all as soon as I'm back on my feet!`,
        ];
      case "Polite":
        return [
          `Please accept my sincere apologies, but I will unfortunately be unable to attend today. Thank you so much for your understanding.`,
          `I regret to inform you that I will be unable to make it today due to personal circumstances. Thank you kindly for your consideration.`,
          `I am writing to respectfully notify you of my absence today. I greatly appreciate your understanding and support.`,
        ];
      case "Confident":
        return [
          `I will be out today and unable to attend. I will review all pending matters as soon as I return and follow up on any urgent actions.`,
          `I am taking today off due to unforeseen circumstances. I have organized key priorities and will resume work as soon as I return.`,
          `Please proceed without me today as I am unavailable. I will follow up on deliverables directly upon my return.`,
        ];
      case "Casual":
        return [
          `Hey everyone, won't be able to make it in today as I'm feeling a bit unwell. Catch up with you all soon!`,
          `Quick heads up that I'm out for the day today. Will check in with you all a bit later!`,
          `Can't make it today unfortunately — will catch up on everything once I'm back!`,
        ];
    }
  }

  if (isLate) {
    switch (tone) {
      case "Professional":
        return [
          `Please accept my apologies, as I am running slightly behind schedule. I anticipate arriving shortly and will join the discussion as soon as possible.`,
          `I am writing to notify you that I have encountered an unexpected delay. I expect to arrive in approximately a few minutes.`,
          `Due to unforeseen transit delays, my arrival will be slightly delayed today. Thank you for your patience, and I will be there shortly.`,
        ];
      case "Friendly":
        return [
          `Hi everyone! Just giving you a quick heads up that I'm running a few minutes late. See you all very shortly!`,
          `Running a little behind today due to traffic, but on my way now! See you in a few minutes.`,
          `Hey! Got held up for a moment, but heading over now. See you soon!`,
        ];
      case "Polite":
        return [
          `I apologize for the delay and any inconvenience caused. I am on my way and expect to arrive shortly. Thank you for your patience.`,
          `Please forgive my tardiness today as I encountered an unexpected delay. I will be there as soon as possible.`,
          `I sincerely apologize for running late. Thank you very much for your understanding and forbearance.`,
        ];
      case "Confident":
        return [
          `I have been held up briefly and will arrive shortly. Please feel free to start without me and I will step in upon arrival.`,
          `Running about 10 minutes behind schedule. Let's proceed as planned and I will join immediately.`,
          `I am on my way and will be there momentarily to continue our discussion.`,
        ];
      case "Casual":
        return [
          `Running a few minutes late today — should be there very shortly!`,
          `Stuck in a bit of traffic, but almost there. See you in a sec!`,
          `Running a little behind schedule, heading in right now!`,
        ];
    }
  }

  if (isThanks) {
    switch (tone) {
      case "Professional":
        return [
          `I wanted to express my sincere appreciation for your time and assistance with this matter. Your support has been greatly valued.`,
          `Thank you very much for your collaboration and thorough support. I look forward to our continued work together.`,
          `I truly appreciate your timely guidance and dedication on this project. Thank you for your help.`,
        ];
      case "Friendly":
        return [
          `Thanks so much for all your help with this! Really appreciate your time and support.`,
          `Huge thank you for lending a hand today! Couldn't have done it without you.`,
          `Just wanted to say a big thanks for helping out! Hope you have a wonderful rest of your week!`,
        ];
      case "Polite":
        return [
          `Thank you kindly for your gracious assistance. I am very grateful for your time and effort.`,
          `I would like to extend my deepest gratitude for your thoughtful help with this matter.`,
          `Please accept my sincere thanks for your guidance. I truly appreciate your kindness.`,
        ];
      case "Confident":
        return [
          `Thank you for the quick turnaround on this. Your input helped us achieve our goals on schedule.`,
          `Appreciate the decisive support on this project. Great work moving this forward.`,
          `Thank you for your partnership on this milestone. Let's keep the momentum going.`,
        ];
      case "Casual":
        return [
          `Thanks a ton for your help with this! Cheers!`,
          `Really appreciate the hand today, thanks a bunch!`,
          `Thanks for sorting that out so quickly! You're a legend.`,
        ];
    }
  }

  if (isApology) {
    switch (tone) {
      case "Professional":
        return [
          `Please accept my sincere apologies for the oversight. I am actively taking steps to rectify this and ensure everything is back on track.`,
          `I apologize for any inconvenience caused by this error. We have reviewed the matter and implemented adjustments to prevent future occurrences.`,
          `I regret the confusion surrounding this issue and appreciate your patience while we resolve it.`,
        ];
      case "Friendly":
        return [
          `So sorry about the mix-up earlier! I'm looking into it now and will have it sorted out for you right away.`,
          `My apologies for the confusion today! Thanks for bearing with me while I get this fixed.`,
          `Really sorry about that! I've made the updates now and everything should look much better.`,
        ];
      case "Polite":
        return [
          `I sincerely apologize for the inconvenience this has caused. Thank you very much for your grace and understanding.`,
          `Please forgive my error in this regard. I am deeply grateful for your patience.`,
          `I offer my heartfelt apologies for the miscommunication and will ensure it is promptly addressed.`,
        ];
      case "Confident":
        return [
          `I acknowledge the issue on this and have taken immediate corrective action to keep the project on track.`,
          `Thank you for pointing that out. I have updated the details and we are ready to proceed.`,
          `The oversight has been noted and corrected. Let's move forward with the next steps.`,
        ];
      case "Casual":
        return [
          `My bad on the mix-up earlier! Sorting it out right now.`,
          `Sorry about that! All fixed and good to go now.`,
          `Apologies for the confusion — appreciate your patience!`,
        ];
    }
  }

  // Detect if input is a proposal / strategic business idea vs a direct task request
  const isProposalOrStatement =
    /\b(think|suggest|recommend|propose|believe|consider|evaluate|move|relocate|transition|shift|revenue|cost|margin|budget|strategy|plan|expand|reduce|outsource)\b/i.test(lower) ||
    !/^(can|could|would|please|do you|may|will|are you|is it)/i.test(lower);

  let cleanBody = text
    .replace(/^i think\s+(that\s+)?/i, "")
    .replace(/^we should\s+/i, "")
    .replace(/^maybe we can\s+/i, "")
    .replace(/^can you please\s+|^could you please\s+|^please\s+/i, "")
    .trim();

  // Normalize auxiliary passive phrases for natural grammatical flow (e.g. "operations can be moved to Asia" -> "relocating operations to Asia")
  let actionClause = cleanBody
    .replace(/\bcan be moved to\b/i, "relocating")
    .replace(/\bcan be relocated to\b/i, "relocating")
    .replace(/\bshould be moved to\b/i, "relocating")
    .replace(/\bshould be relocated to\b/i, "relocating")
    .replace(/\bcould be moved to\b/i, "relocating")
    .replace(/\bcan be shifted to\b/i, "shifting")
    .replace(/\bcan be transferred to\b/i, "transferring")
    .replace(/\bcan be outsourced to\b/i, "outsourcing");

  // Check if revenue/cost rationale is mentioned
  const hasRevenueOrCostContext = /\b(revenue|margin|cost|budget|expense|financial)\b/i.test(lower);

  // If actionClause became "operations, logistics and finance relocating Asia in view of low revenue", re-order for natural flow
  if (/\brelocating\b/i.test(actionClause)) {
    // e.g. "operations, logistics and finance relocating Asia" -> "relocating operations, logistics, and finance to Asia"
    actionClause = actionClause.replace(/(.+?)\s+relocating\s+(to\s+)?(.+?)(\s+in view of.+|\s+due to.+)?$/i, "relocating $1 to $3");
  }

  // Strip trailing rationale if we are inserting rationale at the front
  const coreActionWithoutRationale = actionClause
    .replace(/\s+in view of\s+.*$/i, "")
    .replace(/\s+due to\s+.*$/i, "")
    .replace(/\s+because of\s+.*$/i, "")
    .trim();

  const businessRationalePrefix = hasRevenueOrCostContext
    ? "Given current revenue constraints and margin considerations"
    : "In light of our current operational priorities";

  if (isProposalOrStatement && !isQuestionOrRequest) {
    switch (tone) {
      case "Professional":
        return [
          `${businessRationalePrefix}, we should evaluate ${coreActionWithoutRationale} to optimize costs and enhance operational efficiency.`,
          `To support our financial performance and streamline operations, I recommend assessing the feasibility of ${coreActionWithoutRationale}.`,
          `As a strategic initiative to manage expenses, we should consider ${coreActionWithoutRationale} to establish a more competitive operating model.`,
        ];
      case "Friendly":
        return [
          `Hi team! In light of our current numbers, I think it's definitely worth exploring ${coreActionWithoutRationale} so we can optimize costs and work more efficiently.`,
          `Hey everyone! Given where our revenue is at, what do you think about ${coreActionWithoutRationale}? It could be a great way to reduce overhead.`,
          `Hi all! I wanted to put forward an idea: exploring ${coreActionWithoutRationale} might give us the cost advantage and flexibility we need right now.`,
        ];
      case "Polite":
        return [
          `I would like to respectfully suggest that we evaluate ${coreActionWithoutRationale}, as this could help optimize our financial and operational efficiency.`,
          `Thank you for your consideration; I recommend examining the feasibility of ${coreActionWithoutRationale} to support our broader organizational goals.`,
          `Would leadership be open to reviewing ${coreActionWithoutRationale} in light of our current revenue objectives? Thank you for your guidance.`,
        ];
      case "Confident":
        return [
          `We should proceed with evaluating ${coreActionWithoutRationale} immediately to address revenue constraints and protect operating margins.`,
          `Implementing ${coreActionWithoutRationale} is a critical strategic lever to drive efficiency and optimize our cost structure.`,
          `I recommend moving forward with ${coreActionWithoutRationale} to ensure a sustainable and agile operational foundation.`,
        ];
      case "Casual":
        return [
          `Given the current revenue squeeze, looking into ${coreActionWithoutRationale} could be a solid way to trim overhead.`,
          `Quick thought: ${coreActionWithoutRationale} could really help take the pressure off our margins right now.`,
          `Makes sense to consider ${coreActionWithoutRationale} given our current numbers — could save us a lot in operating costs.`,
        ];
    }
  }

  // Direct task request or inquiry
  switch (tone) {
    case "Professional":
      return [
        `Could you please assist with ${cleanBody} at your earliest convenience? Thank you for your time and guidance.`,
        `I would appreciate it if you could review ${cleanBody} when you have an opportunity.`,
        `Kindly provide an update regarding ${cleanBody} so we may proceed with the next steps.`,
      ];
    case "Friendly":
      return [
        `Hey there! Whenever you get a chance, could you help with ${cleanBody}? Thanks so much!`,
        `Hi! Just checking in to see if you might have a moment to look into ${cleanBody}? Really appreciate it!`,
        `Hope you're having a great week! Would love your help with ${cleanBody} whenever you're free.`,
      ];
    case "Polite":
      return [
        `Would it be possible for you to kindly assist with ${cleanBody}? Thank you very much for your time and consideration.`,
        `I would be deeply grateful if you could look into ${cleanBody} when your schedule permits.`,
        `Could you please be so kind as to assist with ${cleanBody}? Thank you kindly.`,
      ];
    case "Confident":
      return [
        `Please finalize ${cleanBody} so we can move forward and meet our upcoming milestones.`,
        `Let's coordinate on ${cleanBody} today to ensure our schedule remains on track.`,
        `I need ${cleanBody} completed to proceed with our next phase. Please provide an update by end of day.`,
      ];
    case "Casual":
      return [
        `Hey, could you help me out with ${cleanBody} whenever you get a second? Cheers!`,
        `Quick question — any chance you could take a look at ${cleanBody}? Thanks!`,
        `Whenever you're free, let me know your thoughts on ${cleanBody}. Appreciate it!`,
      ];
    default:
      return [
        `Could you please review ${cleanBody}?`,
        `I would appreciate your assistance with ${cleanBody}.`,
        `Kindly let me know when you have an opportunity to look at ${cleanBody}.`,
      ];
  }
}

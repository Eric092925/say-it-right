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
  const clean = input.trim().replace(/[.?!]+$/, "");

  switch (tone) {
    case "Professional":
      return [
        `Could you please provide an update regarding ${clean.toLowerCase().replace(/^can you |^could you |^please /, "")}?`,
        `I would appreciate it if you could assist with ${clean.toLowerCase().replace(/^can you |^could you |^please /, "")} at your earliest convenience.`,
        `Kindly let me know when you have an opportunity to review ${clean.toLowerCase().replace(/^can you |^could you |^please /, "")}.`,
      ];
    case "Friendly":
      return [
        `Hey there! Hope you're doing well. Whenever you get a chance, could you check on ${clean.toLowerCase().replace(/^can you |^could you |^please /, "")}? Thanks!`,
        `Hi! Just checking in — would you mind taking a look at ${clean.toLowerCase().replace(/^can you |^could you |^please /, "")} when you have a moment?`,
        `Hope you're having a great day! Could you help me out with ${clean.toLowerCase().replace(/^can you |^could you |^please /, "")}? Appreciate it!`,
      ];
    case "Polite":
      return [
        `Would it be possible for you to kindly assist with ${clean.toLowerCase().replace(/^can you |^could you |^please /, "")}? Thank you so much for your time.`,
        `I would be very grateful if you could look into ${clean.toLowerCase().replace(/^can you |^could you |^please /, "")} when you have a moment.`,
        `Could you please be so kind as to help with ${clean.toLowerCase().replace(/^can you |^could you |^please /, "")}?`,
      ];
    case "Confident":
      return [
        `Please send over ${clean.toLowerCase().replace(/^can you |^could you |^please /, "")} so we can move forward with the next steps.`,
        `Let's finalize ${clean.toLowerCase().replace(/^can you |^could you |^please /, "")} today to keep everything on schedule.`,
        `I need ${clean.toLowerCase().replace(/^can you |^could you |^please /, "")} to proceed. Please provide an update by end of day.`,
      ];
    case "Casual":
      return [
        `Hey, could you send me ${clean.toLowerCase().replace(/^can you |^could you |^please /, "")} when you get a sec? Cheers!`,
        `Quick question — any chance you could share ${clean.toLowerCase().replace(/^can you |^could you |^please /, "")}?`,
        `Whenever you're free, toss ${clean.toLowerCase().replace(/^can you |^could you |^please /, "")} my way. Thanks!`,
      ];
    default:
      return [
        `Could you please assist with ${clean}?`,
        `I would appreciate your assistance regarding ${clean}.`,
        `Kindly update me on ${clean} when convenient.`,
      ];
  }
}

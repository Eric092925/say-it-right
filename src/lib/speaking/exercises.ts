import {
  SpeakingDifficulty,
  SpeakingTopic,
  ExerciseType,
  SpeakingExercise,
} from "./types";

export const EXERCISE_BANK: SpeakingExercise[] = [
  // ==========================================
  // BEGINNER EXERCISES (Word counts: 8 - 45 words)
  // ==========================================
  // 1. Beginner Sentences
  {
    id: "beg-sen-1",
    type: "sentence",
    level: "Beginner",
    topic: "Food",
    title: "Ordering Coffee",
    context: "At a morning cafe",
    targetText: "Could I please have a flat white with oat milk to take away?",
    wordCount: 13,
  },
  {
    id: "beg-sen-2",
    type: "sentence",
    level: "Beginner",
    topic: "Travel",
    title: "Asking for Directions",
    context: "At a railway station",
    targetText: "Excuse me, which platform does the train to Central leave from?",
    wordCount: 11,
  },
  {
    id: "beg-sen-3",
    type: "sentence",
    level: "Beginner",
    topic: "Shopping",
    title: "Fitting Room Inquiry",
    context: "At a clothing store",
    targetText: "Do you have this jacket in a medium size, please?",
    wordCount: 10,
  },
  {
    id: "beg-sen-4",
    type: "sentence",
    level: "Beginner",
    topic: "Daily Life",
    title: "Greeting a Colleague",
    context: "Arriving at the office",
    targetText: "Good morning! How was your weekend? Did you do anything fun?",
    wordCount: 11,
  },

  // 2. Beginner Conversations
  {
    id: "beg-conv-1",
    type: "conversation",
    level: "Beginner",
    topic: "Food",
    title: "Booking a Dinner Table",
    context: "Calling a local restaurant",
    turns: [
      {
        speaker: "Staff",
        text: "Good afternoon, Waterfront Bistro. How can I help you today?",
        isUser: false,
      },
      {
        speaker: "User",
        text: "Hi there! I'd like to book a table for two people tonight at seven.",
        isUser: true,
      },
    ],
    targetText: "Hi there! I'd like to book a table for two people tonight at seven.",
    wordCount: 14,
  },
  {
    id: "beg-conv-2",
    type: "conversation",
    level: "Beginner",
    topic: "Shopping",
    title: "Checking the Price",
    context: "At the department store register",
    turns: [
      {
        speaker: "Cashier",
        text: "Hello! Did you find everything you were looking for today?",
        isUser: false,
      },
      {
        speaker: "User",
        text: "Yes, thank you. Could you please let me know how much this is?",
        isUser: true,
      },
    ],
    targetText: "Yes, thank you. Could you please let me know how much this is?",
    wordCount: 12,
  },
  {
    id: "beg-conv-3",
    type: "conversation",
    level: "Beginner",
    topic: "Travel",
    title: "Hotel Check-In",
    context: "At hotel reception",
    turns: [
      {
        speaker: "Receptionist",
        text: "Welcome to the Grand Hotel. Are you checking in today?",
        isUser: false,
      },
      {
        speaker: "User",
        text: "Yes, I have a reservation under the name David Miller.",
        isUser: true,
      },
    ],
    targetText: "Yes, I have a reservation under the name David Miller.",
    wordCount: 10,
  },
  {
    id: "beg-conv-4",
    type: "conversation",
    level: "Beginner",
    topic: "Work",
    title: "Asking for Help",
    context: "At the workplace desk",
    turns: [
      {
        speaker: "Colleague",
        text: "Hey, do you have a quick second to look at this spreadsheet?",
        isUser: false,
      },
      {
        speaker: "User",
        text: "Sure, I can help you with that right after I finish this email.",
        isUser: true,
      },
    ],
    targetText: "Sure, I can help you with that right after I finish this email.",
    wordCount: 13,
  },

  // 3. Beginner Passages (30 - 45 words)
  {
    id: "beg-pas-1",
    type: "passage",
    level: "Beginner",
    topic: "Daily Life",
    title: "A Sunny Morning Walk",
    context: "Describing morning routine",
    fullPassage:
      "Every Saturday morning, I take a brisk walk along the coastal pathway. The ocean breeze is fresh and invigorating. I usually stop by the corner bakery to pick up warm croissants before heading back home to read.",
    targetText:
      "Every Saturday morning, I take a brisk walk along the coastal pathway. The ocean breeze is fresh and invigorating. I usually stop by the corner bakery to pick up warm croissants before heading back home to read.",
    wordCount: 36,
  },
  {
    id: "beg-pas-2",
    type: "passage",
    level: "Beginner",
    topic: "Travel",
    title: "Exploring Sydney Harbour",
    context: "Short sightseeing summary",
    fullPassage:
      "Sydney Harbour is famous for its sparkling blue water and iconic landmarks. Visitors love boarding the ferry from Circular Quay to Manly Beach. On a clear day, the views of the Opera House and Harbour Bridge are breathtaking.",
    targetText:
      "Sydney Harbour is famous for its sparkling blue water and iconic landmarks. Visitors love boarding the ferry from Circular Quay to Manly Beach. On a clear day, the views of the Opera House and Harbour Bridge are breathtaking.",
    wordCount: 38,
  },
  {
    id: "beg-pas-3",
    type: "passage",
    level: "Beginner",
    topic: "Food",
    title: "Cooking at Home",
    context: "Weekend dinner preparation",
    fullPassage:
      "Cooking fresh meals at home is one of my favourite ways to unwind. Tonight I am making homemade pasta with ripe tomatoes, garlic, and fresh basil. It smells delicious and takes less than thirty minutes to prepare.",
    targetText:
      "Cooking fresh meals at home is one of my favourite ways to unwind. Tonight I am making homemade pasta with ripe tomatoes, garlic, and fresh basil. It smells delicious and takes less than thirty minutes to prepare.",
    wordCount: 37,
  },
  {
    id: "beg-pas-4",
    type: "passage",
    level: "Beginner",
    topic: "Daily Life",
    title: "Weekend Plans",
    context: "Casual sharing with friends",
    fullPassage:
      "This weekend, my family and I are planning a quiet picnic in the park. We will pack some sandwiches, fresh fruit, and cold drinks. If the weather stays warm and sunny, we might stay until sunset.",
    targetText:
      "This weekend, my family and I are planning a quiet picnic in the park. We will pack some sandwiches, fresh fruit, and cold drinks. If the weather stays warm and sunny, we might stay until sunset.",
    wordCount: 37,
  },

  // ==========================================
  // INTERMEDIATE EXERCISES (Word counts: 15 - 75 words)
  // ==========================================
  // 1. Intermediate Sentences
  {
    id: "int-sen-1",
    type: "sentence",
    level: "Intermediate",
    topic: "Work",
    title: "Proposing a Project Schedule",
    context: "During a weekly team check-in",
    targetText:
      "If we finalize the design mockups by Wednesday, we will remain comfortably on track for our beta launch next month.",
    wordCount: 20,
  },
  {
    id: "int-sen-2",
    type: "sentence",
    level: "Intermediate",
    topic: "Business",
    title: "Highlighting Performance Metrics",
    context: "Quarterly review summary",
    targetText:
      "Customer engagement has increased by fifteen percent since we simplified the onboarding workflow and improved page loading times.",
    wordCount: 18,
  },
  {
    id: "int-sen-3",
    type: "sentence",
    level: "Intermediate",
    topic: "Travel",
    title: "Inquiring About Flight Changes",
    context: "At an airline service desk",
    targetText:
      "Would it be possible to switch to an earlier flight this afternoon without incurring an additional cancellation penalty?",
    wordCount: 18,
  },
  {
    id: "int-sen-4",
    type: "sentence",
    level: "Intermediate",
    topic: "Social Conversation",
    title: "Sharing a Recommendation",
    context: "Chatting about books and films",
    targetText:
      "I recently watched a fascinating documentary on sustainable architecture that completely changed my perspective on urban planning.",
    wordCount: 17,
  },

  // 2. Intermediate Conversations
  {
    id: "int-conv-1",
    type: "conversation",
    level: "Intermediate",
    topic: "Interview",
    title: "Handling Strengths & Experience",
    context: "Job interview scenario",
    turns: [
      {
        speaker: "Interviewer",
        text: "Could you tell me how you prioritize competing tasks when deadlines overlap?",
        isUser: false,
      },
      {
        speaker: "User",
        text: "I start by assessing business impact and urgency, communicate transparently with stakeholders, and delegate when appropriate.",
        isUser: true,
      },
    ],
    targetText:
      "I start by assessing business impact and urgency, communicate transparently with stakeholders, and delegate when appropriate.",
    wordCount: 16,
  },
  {
    id: "int-conv-2",
    type: "conversation",
    level: "Intermediate",
    topic: "Work",
    title: "Addressing a Project Delay",
    context: "Meeting with a project manager",
    turns: [
      {
        speaker: "Manager",
        text: "Are we still on schedule to deliver the client presentation by Friday afternoon?",
        isUser: false,
      },
      {
        speaker: "User",
        text: "We encountered a slight delay with data verification, but I expect to have the draft ready for your review by Thursday morning.",
        isUser: true,
      },
    ],
    targetText:
      "We encountered a slight delay with data verification, but I expect to have the draft ready for your review by Thursday morning.",
    wordCount: 22,
  },
  {
    id: "int-conv-3",
    type: "conversation",
    level: "Intermediate",
    topic: "Business",
    title: "Discussing Vendor Pricing",
    context: "Negotiating service renewal",
    turns: [
      {
        speaker: "Vendor",
        text: "Our annual enterprise subscription will increase by eight percent starting next quarter.",
        isUser: false,
      },
      {
        speaker: "User",
        text: "Given our multi-year partnership and planned user expansion, could you offer a volume discount to keep our costs aligned with our current budget?",
        isUser: true,
      },
    ],
    targetText:
      "Given our multi-year partnership and planned user expansion, could you offer a volume discount to keep our costs aligned with our current budget?",
    wordCount: 22,
  },
  {
    id: "int-conv-4",
    type: "conversation",
    level: "Intermediate",
    topic: "Social Conversation",
    title: "Arranging a Dinner Meetup",
    context: "Planning with friends",
    turns: [
      {
        speaker: "Friend",
        text: "Are you free to catch up for dinner sometime this Thursday or Friday?",
        isUser: false,
      },
      {
        speaker: "User",
        text: "Friday works much better for me. There is a fantastic new Italian trattoria near the station that I have been wanting to try.",
        isUser: true,
      },
    ],
    targetText:
      "Friday works much better for me. There is a fantastic new Italian trattoria near the station that I have been wanting to try.",
    wordCount: 22,
  },

  // 3. Intermediate Passages (55 - 75 words)
  {
    id: "int-pas-1",
    type: "passage",
    level: "Intermediate",
    topic: "Work",
    title: "Remote Work & Collaboration",
    context: "Reflecting on modern workplace culture",
    fullPassage:
      "The rapid shift toward hybrid work environments has transformed how global teams collaborate. While asynchronous messaging allows team members to work across diverse time zones with greater flexibility, regular video check-ins remain essential for building camaraderie. Maintaining clear documentation and shared objectives ensures everyone stays synchronized without feeling overwhelmed by unnecessary meetings.",
    targetText:
      "The rapid shift toward hybrid work environments has transformed how global teams collaborate. While asynchronous messaging allows team members to work across diverse time zones with greater flexibility, regular video check-ins remain essential for building camaraderie. Maintaining clear documentation and shared objectives ensures everyone stays synchronized without feeling overwhelmed by unnecessary meetings.",
    wordCount: 55,
  },
  {
    id: "int-pas-2",
    type: "passage",
    level: "Intermediate",
    topic: "Travel",
    title: "The Allure of Melbourne's Laneways",
    context: "Cultural travel guide extract",
    fullPassage:
      "Melbourne is celebrated across the world for its vibrant maze of hidden laneways and heritage arcades. Wandering through these narrow streets reveals world-class street art, bustling boutique espresso bars, and intimate jazz venues. Locals and tourists alike gather here to savour specialty coffee, sample handmade pastries, and soak up the creative energy that defines the city's unique cultural identity.",
    targetText:
      "Melbourne is celebrated across the world for its vibrant maze of hidden laneways and heritage arcades. Wandering through these narrow streets reveals world-class street art, bustling boutique espresso bars, and intimate jazz venues. Locals and tourists alike gather here to savour specialty coffee, sample handmade pastries, and soak up the creative energy that defines the city's unique cultural identity.",
    wordCount: 58,
  },
  {
    id: "int-pas-3",
    type: "passage",
    level: "Intermediate",
    topic: "Daily Life",
    title: "Mindfulness and Digital Balance",
    context: "Wellbeing discussion",
    fullPassage:
      "Establishing healthy boundaries with digital technology is increasingly critical for personal wellbeing. Taking thirty minutes each evening to disconnect from screens, step outside, or read an engaging book helps calm the mind and improves sleep quality. Small mindful habits like these create mental space and help us maintain focus throughout demanding workdays.",
    targetText:
      "Establishing healthy boundaries with digital technology is increasingly critical for personal wellbeing. Taking thirty minutes each evening to disconnect from screens, step outside, or read an engaging book helps calm the mind and improves sleep quality. Small mindful habits like these create mental space and help us maintain focus throughout demanding workdays.",
    wordCount: 54,
  },
  {
    id: "int-pas-4",
    type: "passage",
    level: "Intermediate",
    topic: "Business",
    title: "Sustainable Business Practices",
    context: "Corporate sustainability article",
    fullPassage:
      "Forward-thinking organizations are increasingly embedding environmental sustainability into their long-term corporate strategies. By eliminating single-use plastics and optimizing energy consumption in regional facilities, companies not only reduce their ecological footprint but also attract environmentally conscious consumers and top-tier talent who prioritize corporate responsibility.",
    targetText:
      "Forward-thinking organizations are increasingly embedding environmental sustainability into their long-term corporate strategies. By eliminating single-use plastics and optimizing energy consumption in regional facilities, companies not only reduce their ecological footprint but also attract environmentally conscious consumers and top-tier talent who prioritize corporate responsibility.",
    wordCount: 46,
  },

  // ==========================================
  // ADVANCED EXERCISES (Word counts: 25 - 110 words)
  // ==========================================
  // 1. Advanced Sentences
  {
    id: "adv-sen-1",
    type: "sentence",
    level: "Advanced",
    topic: "Business",
    title: "Strategic Relocation Proposal",
    context: "Executive board briefing",
    targetText:
      "Given current revenue constraints and margin pressures, we should evaluate relocating selected operational and financial functions to Asia to optimize expenditure and enhance operational resilience.",
    wordCount: 26,
  },
  {
    id: "adv-sen-2",
    type: "sentence",
    level: "Advanced",
    topic: "Business",
    title: "Mitigating Market Volatility",
    context: "Financial risk assessment",
    targetText:
      "To insulate our balance sheet against macroeconomic headwinds, we must diversify our liquidity reserves and renegotiate credit covenants with institutional lenders before the end of the fiscal quarter.",
    wordCount: 27,
  },
  {
    id: "adv-sen-3",
    type: "sentence",
    level: "Advanced",
    topic: "Interview",
    title: "Articulating Leadership Philosophy",
    context: "Executive interview",
    targetText:
      "Effective leadership requires fostering psychological safety, empowering autonomous decision-making, and aligning disparate cross-functional initiatives with overarching organizational objectives.",
    wordCount: 16,
  },
  {
    id: "adv-sen-4",
    type: "sentence",
    level: "Advanced",
    topic: "Work",
    title: "Addressing Technical Debt",
    context: "Architecture committee meeting",
    targetText:
      "While deferring technical refactoring may expedite immediate product delivery, accumulating architectural debt inevitably degrades maintainability and escalates long-term operational overhead.",
    wordCount: 20,
  },

  // 2. Advanced Conversations
  {
    id: "adv-conv-1",
    type: "conversation",
    level: "Advanced",
    topic: "Business",
    title: "Executive Budget Allocation",
    context: "Annual strategic planning session",
    turns: [
      {
        speaker: "Chief Financial Officer",
        text: "The proposed marketing expansion represents a considerable capital outlay given our projected earnings forecast.",
        isUser: false,
      },
      {
        speaker: "User",
        text: "I appreciate those fiscal considerations; however, tying budget releases to measurable customer acquisition milestones will mitigate downside exposure while capturing vital market share.",
        isUser: true,
      },
    ],
    targetText:
      "I appreciate those fiscal considerations; however, tying budget releases to measurable customer acquisition milestones will mitigate downside exposure while capturing vital market share.",
    wordCount: 23,
  },
  {
    id: "adv-conv-2",
    type: "conversation",
    level: "Advanced",
    topic: "Interview",
    title: "Navigating Organizational Crisis",
    context: "Senior executive interview scenario",
    turns: [
      {
        speaker: "Interviewer",
        text: "Tell me about a time you led an enterprise through severe supply chain disruption or unexpected regulatory changes.",
        isUser: false,
      },
      {
        speaker: "User",
        text: "When regulatory policy shifted abruptly, I established a crisis governance team, audited contractual obligations, and secured alternative logistics partners within seventy-two hours.",
        isUser: true,
      },
    ],
    targetText:
      "When regulatory policy shifted abruptly, I established a crisis governance team, audited contractual obligations, and secured alternative logistics partners within seventy-two hours.",
    wordCount: 22,
  },
  {
    id: "adv-conv-3",
    type: "conversation",
    level: "Advanced",
    topic: "Work",
    title: "Resolving Stakeholder Impasse",
    context: "Cross-functional product alignment",
    turns: [
      {
        speaker: "Lead Architect",
        text: "The security team refuses to approve our third-party API integration without additional penetration auditing.",
        isUser: false,
      },
      {
        speaker: "User",
        text: "Let's schedule a brief synchronization with their compliance director this afternoon so we can agree on an expedited audit protocol without compromising our rollout schedule.",
        isUser: true,
      },
    ],
    targetText:
      "Let's schedule a brief synchronization with their compliance director this afternoon so we can agree on an expedited audit protocol without compromising our rollout schedule.",
    wordCount: 24,
  },
  {
    id: "adv-conv-4",
    type: "conversation",
    level: "Advanced",
    topic: "Business",
    title: "Client Contract Renewal",
    context: "High-value partnership discussion",
    turns: [
      {
        speaker: "Key Client",
        text: "We are considering consolidating our software vendors to streamline operations and reduce overhead.",
        isUser: false,
      },
      {
        speaker: "User",
        text: "We fully respect your efficiency mandate and are prepared to restructure our agreement into a unified multi-service tier that delivers substantial savings while expanding your technical capabilities.",
        isUser: true,
      },
    ],
    targetText:
      "We fully respect your efficiency mandate and are prepared to restructure our agreement into a unified multi-service tier that delivers substantial savings while expanding your technical capabilities.",
    wordCount: 26,
  },

  // 3. Advanced Passages (85 - 110 words)
  {
    id: "adv-pas-1",
    type: "passage",
    level: "Advanced",
    topic: "Business",
    title: "The Paradigm Shift of Artificial Intelligence",
    context: "Executive leadership keynote",
    fullPassage:
      "The ubiquitous integration of artificial intelligence across corporate enterprise represents a profound paradigm shift in how modern organizations generate value. Rather than merely automating routine operational workflows, contemporary machine learning architectures empower decision-makers with predictive telemetry and deep contextual reasoning. However, unlocking this transformative potential demands rigorous algorithmic governance, ethical stewardship of proprietary data, and a steadfast commitment to upskilling human capital alongside automated systems.",
    targetText:
      "The ubiquitous integration of artificial intelligence across corporate enterprise represents a profound paradigm shift in how modern organizations generate value. Rather than merely automating routine operational workflows, contemporary machine learning architectures empower decision-makers with predictive telemetry and deep contextual reasoning. However, unlocking this transformative potential demands rigorous algorithmic governance, ethical stewardship of proprietary data, and a steadfast commitment to upskilling human capital alongside automated systems.",
    wordCount: 68,
  },
  {
    id: "adv-pas-2",
    type: "passage",
    level: "Advanced",
    topic: "Work",
    title: "Organizational Resilience in Volatile Markets",
    context: "Management philosophy article",
    fullPassage:
      "Cultivating true enterprise resilience requires far more than maintaining financial contingencies or robust disaster recovery protocols. Resilient organizations foster an adaptive operational ethos characterized by rapid decentralized execution and open institutional critique. When unpredictable market dislocations occur, leadership must balance empathetic communication with decisive strategic recalibration. By viewing disruption not as an existential vulnerability but as an inflection point for innovation, forward-looking companies consistently turn adversity into enduring competitive advantage.",
    targetText:
      "Cultivating true enterprise resilience requires far more than maintaining financial contingencies or robust disaster recovery protocols. Resilient organizations foster an adaptive operational ethos characterized by rapid decentralized execution and open institutional critique. When unpredictable market dislocations occur, leadership must balance empathetic communication with decisive strategic recalibration. By viewing disruption not as an existential vulnerability but as an inflection point for innovation, forward-looking companies consistently turn adversity into enduring competitive advantage.",
    wordCount: 71,
  },
  {
    id: "adv-pas-3",
    type: "passage",
    level: "Advanced",
    topic: "Daily Life",
    title: "The Dynamics of Cross-Cultural Communication",
    context: "Linguistic and cultural essay",
    fullPassage:
      "Effective cross-cultural communication hinges on recognizing that linguistic fluency alone does not guarantee diplomatic harmony. Nuances in high-context and low-context cultures fundamentally shape how individuals interpret indirect feedback, non-verbal gestures, and conversational pauses. Cultivating heightened intercultural competence enables global professionals to decipher subtle relational subtexts and avoid unintentional friction. Ultimately, approaching dialogue with intellectual humility and active listening builds genuine empathy across geographical and cultural divides.",
    targetText:
      "Effective cross-cultural communication hinges on recognizing that linguistic fluency alone does not guarantee diplomatic harmony. Nuances in high-context and low-context cultures fundamentally shape how individuals interpret indirect feedback, non-verbal gestures, and conversational pauses. Cultivating heightened intercultural competence enables global professionals to decipher subtle relational subtexts and avoid unintentional friction. Ultimately, approaching dialogue with intellectual humility and active listening builds genuine empathy across geographical and cultural divides.",
    wordCount: 69,
  },
  {
    id: "adv-pas-4",
    type: "passage",
    level: "Advanced",
    topic: "Business",
    title: "Strategic Talent Acquisition & Retention",
    context: "Human resources strategic briefing",
    fullPassage:
      "In an increasingly competitive knowledge economy, talent acquisition strategies must transcend traditional compensation models. High-performing professionals gravitate toward organizations that articulate a coherent mission and demonstrate tangible investments in continuous professional development. When institutions prioritize autonomous mastery and transparent pathways for career progression, they dramatically reduce voluntary turnover and cultivate an innovative culture capable of weathering macroeconomic uncertainty.",
    targetText:
      "In an increasingly competitive knowledge economy, talent acquisition strategies must transcend traditional compensation models. High-performing professionals gravitate toward organizations that articulate a coherent mission and demonstrate tangible investments in continuous professional development. When institutions prioritize autonomous mastery and transparent pathways for career progression, they dramatically reduce voluntary turnover and cultivate an innovative culture capable of weathering macroeconomic uncertainty.",
    wordCount: 63,
  },
];

/**
 * Filter exercises for Practice Mode by level, topic, and count.
 */
export function getPracticeExercises(
  level: SpeakingDifficulty,
  topic: SpeakingTopic,
  count: number
): SpeakingExercise[] {
  let filtered = EXERCISE_BANK.filter((e) => e.level === level);

  if (topic !== "All Topics") {
    const topicMatches = filtered.filter((e) => e.topic === topic);
    if (topicMatches.length > 0) {
      filtered = topicMatches;
    }
  }

  // Shuffle for variety
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Generate exactly 10 questions for a structured Speaking Test (Blueprint Section 14).
 * Enforces a balanced distribution of Sentences, Conversations, and Passages.
 */
export function getTestExercises(level: SpeakingDifficulty): SpeakingExercise[] {
  const levelBank = EXERCISE_BANK.filter((e) => e.level === level);

  const sentences = levelBank.filter((e) => e.type === "sentence");
  const conversations = levelBank.filter((e) => e.type === "conversation");
  const passages = levelBank.filter((e) => e.type === "passage");

  // Ideal distribution for 10 questions: 4 sentences, 3 conversations, 3 passages
  const selectedSentences = [...sentences]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
  const selectedConversations = [...conversations]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  const selectedPassages = [...passages]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  // Combine and interleave to ensure exercises are not clustered by type
  const combined: SpeakingExercise[] = [];
  const maxLen = Math.max(
    selectedSentences.length,
    selectedConversations.length,
    selectedPassages.length
  );

  for (let i = 0; i < maxLen; i++) {
    if (selectedSentences[i]) combined.push(selectedSentences[i]);
    if (selectedConversations[i]) combined.push(selectedConversations[i]);
    if (selectedPassages[i]) combined.push(selectedPassages[i]);
  }

  // Ensure exactly 10 items
  if (combined.length < 10) {
    const remaining = levelBank.filter((e) => !combined.includes(e));
    combined.push(...remaining.slice(0, 10 - combined.length));
  }

  return combined.slice(0, 10);
}

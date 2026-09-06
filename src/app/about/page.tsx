import Link from "next/link";
import {
  Mic,
  MessageSquareText,
  Headphones,
  Globe2,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Award,
} from "lucide-react";

export const metadata = {
  title: "About — Say It Right",
  description:
    "Learn about the mission, pronunciation engine, message tone rewriter, and interactive speaking assessment behind Say It Right.",
};

export default function AboutPage() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-10 animate-fade-in">
      {/* Header */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About the Platform</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          About Say It Right
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
          An AI communication assistant engineered to help you pronounce difficult words, polish written messages, and practise speaking English with confidence.
        </p>
      </div>

      {/* Core Mission Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-lifted space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          Our Mission
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          English pronunciation and professional communication can be daunting — especially when navigating regional place names, colloquial nuances, high-stakes workplace correspondence, and conversational fluency.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          <strong>Say It Right</strong> provides instant clarity with zero friction: <strong>no accounts, no logins, and no subscriptions</strong>. Whether you need to verify how to pronounce an Australian suburb, transform an informal draft into an executive proposal, or practice connected speech with real-time scoring, Say It Right gives you immediate, high-quality results.
        </p>
      </section>

      {/* The Three Pillars Grid */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          The Three Pillars of Say It Right
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Word Mode */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-lifted space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                1. Word Mode
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Pronounce tricky global words, place names, and regional slang with confidence. Access capitalized-stress phonetic respellings, authentic International Phonetic Alphabet (IPA) notation, and instant audio playback in Australian, British, and American English.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Phonetics & Accent Audio
            </div>
          </div>

          {/* Pillar 2: Message Mode */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-lifted space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold">
                <MessageSquareText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                2. Message Mode
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Transform rough or tentative drafts into articulate, executive-ready communication. Tailor messages across five distinct tones (Professional, Friendly, Polite, Confident, Casual), generate on-demand variations, and listen to how they sound aloud.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-violet-600 dark:text-violet-400">
              5 Precision Tone Angles
            </div>
          </div>

          {/* Pillar 3: Speaking Mode */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-lifted space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                3. Speaking Mode
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Practice English speaking through interactive exercises and structured assessments. Listen to reference audio in female or male voices, record your speech directly in the browser, and receive objective Pronunciation Accuracy and Fluency scoring.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Practice & 10-Question Test
            </div>
          </div>
        </div>
      </div>

      {/* Speaking Mode Breakdown: Practice vs Test */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-lifted space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-500" />
          Interactive Speaking Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-500" />
              Practice Mode
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              Designed for stress-free learning. Select difficulty (Beginner, Intermediate, Advanced), topic, and exercise count (1, 5, or 10). Practise Sentences, Conversations, and Passages with unlimited listening, unlimited retries, and score progression tracking.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-500" />
              10-Question Assessment
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              A structured speaking test containing a balanced mix of Sentences, Conversations, and Passages. Stricter conditions: maximum 2 listens per question, 1 recording attempt, with immediate feedback hidden until the comprehensive final scorecard.
            </p>
          </div>
        </div>
      </section>

      {/* Supported Accents & Dual-Gender Voices */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-lifted space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Globe2 className="w-5 h-5 text-indigo-500" />
          Supported Regional Accents & Voices
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Every mode supports the three major global English variants, with dual-gender (<strong>Female</strong> and <strong>Male</strong>) reference speech:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
            <div className="text-base font-bold text-slate-900 dark:text-white">
              🇦🇺 Australian English
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              <code>en-AU</code> • 👩 Female & 👨 Male
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
            <div className="text-base font-bold text-slate-900 dark:text-white">
              🇬🇧 British English
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              <code>en-GB</code> • 👩 Female & 👨 Male
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
            <div className="text-base font-bold text-slate-900 dark:text-white">
              🇺🇸 American English
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              <code>en-US</code> • 👩 Female & 👨 Male
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Technology Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-lifted space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          Privacy & Ephemeral Audio
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          Your privacy is built directly into our technical architecture. When you record your voice during speaking practice or tests, the audio is analysed in-memory and <strong>immediately discarded</strong>. We do not permanently store voice recordings, maintain audio libraries, or build user voice profiles.
        </p>
      </section>
    </div>
  );
}

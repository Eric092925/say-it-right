import Link from "next/link";
import { Mic, MessageSquareText, Globe2, Sparkles, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "About — Say It Right",
  description: "Learn about the mission, pronunciation engine, and tone rewriter behind Say It Right.",
};

export default function AboutPage() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-10 animate-fade-in">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          About Say It Right
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 mt-2">
          An AI communication assistant for speaking and writing better English.
        </p>
      </div>

      {/* Core Philosophy Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-lifted space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          Our Mission
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          English pronunciation and nuance can be challenging — especially for place names, regional accents, difficult vocabulary, and professional communication.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          <strong>Say It Right</strong> gives you immediate clarity without clunky menus or steep learning curves. Type what you want to say, and instantly receive accurate phonetic guides, accent audio, or rewritten messages tailored to your target tone.
        </p>
      </section>

      {/* Two Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1: Speak It */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-lifted space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Mic className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            1. Speak It Right
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Pronounce tricky words, names, suburbs, and places with confidence. Get easy phonetic respelling, international IPA notation, and real-time audio playback in Australian, British, and American accents.
          </p>
        </div>

        {/* Pillar 2: Write It */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-lifted space-y-3">
          <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold">
            <MessageSquareText className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            2. Write It Better
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Transform everyday messages into polished, contextual communication. Choose between Professional, Friendly, Polite, Confident, or Casual tones, cycle between variations, and listen to how they sound out loud.
          </p>
        </div>
      </div>

      {/* Supported Accents */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-lifted space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Globe2 className="w-5 h-5 text-indigo-500" />
          Supported English Accents
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 text-sm font-semibold">
            🇦🇺 Australian English
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 text-sm font-semibold">
            🇬🇧 British English
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 text-sm font-semibold">
            🇺🇸 American English
          </div>
        </div>
      </section>
    </div>
  );
}

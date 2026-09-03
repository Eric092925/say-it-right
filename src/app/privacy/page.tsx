import Link from "next/link";
import { ShieldCheck, ArrowLeft, Lock, EyeOff, Server } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — Say It Right",
  description: "Learn how Say It Right respects your privacy and handles data securely.",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Last updated: September 2026
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-lifted space-y-8 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
            <Lock className="w-5 h-5 text-indigo-500" />
            <h3>1. Overview & Commitment</h3>
          </div>
          <p>
            At <strong>Say It Right</strong>, we believe in minimal data footprint and maximum privacy. You do not need to create an account or provide personal identification to use our core pronunciation or rewrite features.
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
            <Server className="w-5 h-5 text-indigo-500" />
            <h3>2. Text & Message Processing</h3>
          </div>
          <p>
            When you enter words or messages to be pronounced or rewritten:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your input is sent securely over HTTPS to our server-side API.</li>
            <li>Requests are processed in real-time by AI models to generate phonetic respellings or message variations.</li>
            <li>We do not store your private draft messages in persistent databases or sell your data to third parties.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
            <EyeOff className="w-5 h-5 text-indigo-500" />
            <h3>3. Audio & Speech Synthesis</h3>
          </div>
          <p>
            Audio playback utilizes the standard Web Speech Synthesis API provided natively by your web browser (Chrome, Safari, Edge, Firefox, iOS, Android). Your speech audio is generated directly on your device and is not recorded by our servers.
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
            <h3>4. Security & API Protection</h3>
          </div>
          <p>
            All third-party AI provider credentials and keys remain strictly enclosed within secure server-side environments and are never exposed to the client-side browser bundle.
          </p>
        </section>
      </div>
    </div>
  );
}

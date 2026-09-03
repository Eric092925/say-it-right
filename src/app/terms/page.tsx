import Link from "next/link";
import { FileText, ArrowLeft, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Terms of Service — Say It Right",
  description: "Terms and conditions for using the Say It Right service.",
};

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Last updated: September 2026
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-lifted space-y-8 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
            <FileText className="w-5 h-5 text-indigo-500" />
            <h3>1. Acceptance of Terms</h3>
          </div>
          <p>
            By accessing or using <strong>Say It Right</strong>, you agree to comply with and be bound by these Terms of Service. If you disagree with any part of the terms, you may discontinue use of the application.
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
            <CheckCircle className="w-5 h-5 text-indigo-500" />
            <h3>2. Acceptable Use</h3>
          </div>
          <p>
            Say It Right is intended to assist with English pronunciation, phonetic education, and message refinement. You agree not to use the service for:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Generating or distributing unlawful, harassing, defamatory, or abusive content.</li>
            <li>Attempting to reverse engineer, disrupt, or overload the application or AI infrastructure.</li>
            <li>Automated scraping or abusive rate-limit evasion.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="text-slate-900 dark:text-white font-bold text-base">
            3. Disclaimer of Warranties
          </h3>
          <p>
            Pronunciation guides, phonetic respellings, and message rewriting suggestions are generated algorithmically and powered by artificial intelligence. While we strive for extreme accuracy across dialects and regional accents, suggestions are provided &quot;as is&quot; without guarantees of perfection for every linguistic context.
          </p>
        </section>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 mt-auto py-8 text-sm text-slate-500 dark:text-slate-400">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs">
          © {new Date().getFullYear()} <span className="font-semibold text-slate-700 dark:text-slate-300">Say It Right</span>. Speak it right. Write it better.
        </p>

        <div className="flex items-center gap-6 text-xs font-medium">
          <Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            About
          </Link>
          <Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Say It Right — Speak it right. Write it better.",
  description:
    "AI-powered English pronunciation and writing assistant. Learn how to pronounce difficult words and place names in multiple accents, and polish your messages with precision tones.",
  keywords: [
    "pronunciation",
    "Say It Right",
    "accent",
    "Australian English",
    "British English",
    "American English",
    "phonetic",
    "message rewrite",
    "tone rewriter",
    "speech synthesis",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        <Header />
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

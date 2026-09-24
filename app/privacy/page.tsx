import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy (Draft) — Niteen",
  description: "Privacy practices draft for Niteen personal landing page.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#141311] text-[#E8E4DA] py-12 px-6 sm:px-12 flex justify-center selection:bg-[#56685B] selection:text-white">
      <main className="w-full max-w-2xl bg-[#1A1816]/90 border border-[#2F2C26] rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6">
        {/* Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9E998E] hover:text-white transition-colors"
        >
          &larr; Back to Profile
        </Link>

        {/* Header */}
        <div className="border-b border-[#2F2C26] pb-5">
          <div className="inline-block px-2.5 py-1 rounded bg-[#332A1D] border border-[#54422A] text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            Draft for Review
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF7F0]">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#8E897D] mt-1 font-mono">
            Last modified: September 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-4 text-sm text-[#C2BCB0] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[#FAF7F0]">
              1. Overview
            </h2>
            <p>
              This website serves as a personal brand and identity landing page for Niteen (@mR_oMeNxD). No personal visitor data, analytics, or behavioral cookies are tracked or stored on our servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[#FAF7F0]">
              2. Local Browser Storage
            </h2>
            <p>
              Any custom display preferences (such as uploaded background images, custom cursor assets, and analog TV display settings) are stored strictly locally on your device via browser IndexedDB and localStorage. These files and settings never leave your browser.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[#FAF7F0]">
              3. External Links
            </h2>
            <p>
              This landing page contains outbound links to third-party services (such as Telegram, Instagram, GitHub, and X). We do not control and are not responsible for the privacy practices of external platforms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[#FAF7F0]">
              4. Contact
            </h2>
            <p>
              For inquiries regarding this privacy draft, contact via the verified social handles listed on the homepage.
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-[#2F2C26] flex justify-between items-center text-xs text-[#7F7A6F]">
          <span>Niteen &bull; @mR_oMeNxD</span>
          <Link href="/" className="hover:text-white underline underline-offset-4">
            Return Home
          </Link>
        </div>
      </main>
    </div>
  );
}

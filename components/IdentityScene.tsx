"use client";

import React, { memo } from "react";
import Link from "next/link";
import { ProfileConfig } from "@/lib/profile";
import { BackgroundMedia } from "./BackgroundMedia";
import { TVGridOverlay } from "./TVGridOverlay";
import { ProfileImage } from "./ProfileImage";
import { SocialLinks } from "./SocialLinks";

interface IdentitySceneProps {
  profile: ProfileConfig;
}

export const IdentityScene = memo(function IdentityScene({
  profile,
}: IdentitySceneProps) {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center overflow-x-hidden bg-[#12110F] text-[#F3EFE6] selection:bg-[#56685B] selection:text-white">
      {/* 1. BACKGROUND MEDIA LAYER */}
      <BackgroundMedia />

      {/* 2. SEPARATE TV GRID & SCANLINE OVERLAY LAYER */}
      <TVGridOverlay />

      {/* Top spacing / structural balance bar */}
      <div className="relative z-10 w-full pt-8 sm:pt-12 pointer-events-none" />

      {/* 3. OPTICALLY CENTERED FOREGROUND IDENTITY CLUSTER */}
      <main className="relative z-20 w-full max-w-lg mx-auto px-6 py-6 flex flex-col items-center justify-center text-center my-auto">
        {/* Profile Avatar Portrait */}
        <div className="animate-enter-profile flex items-center justify-center w-full">
          <ProfileImage
            src={profile.profileImage}
            name={profile.name}
            accent={profile.accent}
          />
        </div>

        {/* Identity Typography & Socials */}
        <div className="mt-6 sm:mt-7 flex flex-col items-center justify-center text-center w-full max-w-md mx-auto animate-enter-content">
          {/* Name */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-[#FAF7F0] leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] text-center w-full">
            {profile.name}
          </h1>

          {/* Bio / Description */}
          <p className="mt-3.5 max-w-sm text-sm sm:text-[15px] font-normal text-[#B5AFA3] leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] text-center mx-auto">
            {profile.bio}
          </p>

          {/* Refined Social Link Capsules */}
          <div className="mt-7 sm:mt-8 w-full flex justify-center items-center">
            <SocialLinks socials={profile.socials} accent={profile.accent} />
          </div>
        </div>
      </main>

      {/* 4. MINIMAL BALANCED FOOTER (No Copyright, Centered Legal Links) */}
      <footer className="relative z-20 w-full max-w-lg mx-auto px-6 pb-6 sm:pb-8 flex items-center justify-center text-center select-none animate-fade-in">
        <nav
          className="flex items-center justify-center gap-3 text-[11px] sm:text-xs text-[#8C867B] font-medium tracking-wide"
          aria-label="Legal navigation"
        >
          <Link
            href="/privacy"
            className="hover:text-[#D4CFC4] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D8D4C8] py-1 px-1.5 rounded"
          >
            Privacy Policy
          </Link>
          <span className="text-[#4A453C] select-none" aria-hidden="true">
            &middot;
          </span>
          <Link
            href="/terms"
            className="hover:text-[#D4CFC4] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D8D4C8] py-1 px-1.5 rounded"
          >
            Terms of Service
          </Link>
        </nav>
      </footer>
    </div>
  );
});



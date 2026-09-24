"use client";

import React, { memo } from "react";
import Image from "next/image";
import { useCustomCursor } from "@/hooks/useCustomCursor";

interface CustomCursorProps {
  enabled: boolean;
  src: string;
  size?: number;
}

export const CustomCursor = memo(function CustomCursor({
  enabled = true,
  src = "/assets/cursor.svg",
  size = 28,
}: CustomCursorProps) {
  const { cursorRef, isActive, isHovered, isVisible } = useCustomCursor(enabled);

  if (!isActive) return null;

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      aria-hidden="true"
    >
      <div
        className={`relative w-full h-full flex items-center justify-center transition-all duration-300 ease-out ${
          isHovered ? "scale-125 brightness-110" : "scale-100"
        }`}
      >
        {src ? (
          <div className="relative w-full h-full">
            <Image
              src={src}
              alt=""
              width={size}
              height={size}
              unoptimized
              className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
            />
          </div>
        ) : (
          <div className="w-3.5 h-3.5 rounded-full border border-white/80 bg-white/30 backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
        )}
      </div>
    </div>
  );
});

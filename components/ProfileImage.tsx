"use client";

import React, { useState, memo } from "react";
import Image from "next/image";

interface ProfileImageProps {
  src: string;
  name: string;
  accent?: string;
  className?: string;
}

export const ProfileImage = memo(function ProfileImage({
  src,
  name,
  accent = "#56685B",
  className = "",
}: ProfileImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Subtle outer ambient glow */}
      <div
        className="absolute -inset-2 rounded-full opacity-35 blur-xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accent} 0%, transparent 70%)`,
        }}
      />

      {/* Outer refined border ring */}
      <div
        className="relative w-28 h-28 min-w-[112px] min-h-[112px] sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full p-1.5 bg-[#1C1A17]/85 backdrop-blur-md border border-[#3E3B34]/80 transition-all duration-300 ease-out hover:scale-[1.025] hover:brightness-105 select-none"
        style={
          {
            boxShadow: `0 16px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)`,
            WebkitUserDrag: "none",
            userSelect: "none",
          } as React.CSSProperties
        }
        onDragStart={(e) => e.preventDefault()}
      >
        <div
          className="relative w-full h-full rounded-full overflow-hidden bg-[#141311] select-none"
          style={{ WebkitUserDrag: "none", userSelect: "none" } as React.CSSProperties}
          onDragStart={(e) => e.preventDefault()}
        >
          {!hasError ? (
            <Image
              src={src}
              alt={`${name}'s portrait`}
              fill
              priority
              draggable={false}
              sizes="(max-width: 640px) 120px, (max-width: 768px) 144px, 176px"
              className="object-cover pointer-events-none select-none"
              style={{ WebkitUserDrag: "none", userSelect: "none" } as React.CSSProperties}
              onDragStart={(e) => e.preventDefault()}
              onError={() => setHasError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#252320] text-[#E8E4DA] font-semibold text-3xl tracking-wider select-none">
              {name.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        {/* Static Clean Green Online Status Dot */}
        <div
          className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#141311] p-[2.5px] flex items-center justify-center shadow-md pointer-events-none"
          title="Online"
        >
          <span className="w-full h-full rounded-full bg-[#22C55E]" />
        </div>
      </div>
    </div>
  );
});

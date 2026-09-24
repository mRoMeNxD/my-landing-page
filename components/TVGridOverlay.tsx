"use client";

import React, { memo } from "react";

interface TVGridOverlayProps {
  className?: string;
}

export const TVGridOverlay = memo(function TVGridOverlay({
  className = "",
}: TVGridOverlayProps) {
  return (
    <div
      className={`fixed inset-0 pointer-events-none select-none z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* 1. Fine Horizontal Scanlines */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.45))",
          backgroundSize: "100% 4px",
        }}
      />

      {/* 2. Vertical Aperture Grille Display Lines */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.35) 1px, transparent 1px)",
          backgroundSize: "3px 100%",
        }}
      />

      {/* 3. Subtle Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(10, 8, 7, 0.6) 100%)",
        }}
      />
    </div>
  );
});


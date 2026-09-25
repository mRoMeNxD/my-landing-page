"use client";

import React, { memo, useState, useEffect } from "react";
import Grainient from "./Grainient";

interface Palette {
  color1: string;
  color2: string;
  color3: string;
}

const PALETTES: Palette[] = [
  { color1: "#FF9FFC", color2: "#5227FF", color3: "#B497CF" },
  { color1: "#FF2A54", color2: "#8A0027", color3: "#FF7597" },
  { color1: "#FF5E36", color2: "#9E1B00", color3: "#FFA07A" },
  { color1: "#00E6A5", color2: "#005C43", color3: "#73FFD6" },
  { color1: "#0088FF", color2: "#002B99", color3: "#66C2FF" },
  { color1: "#E024FF", color2: "#590080", color3: "#F299FF" },
  { color1: "#FF9F1C", color2: "#994D00", color3: "#FFC573" },
  { color1: "#D90429", color2: "#540012", color3: "#EF233C" },
  { color1: "#00F0FF", color2: "#0038FF", color3: "#7000FF" },
  { color1: "#FF4365", color2: "#8B0032", color3: "#FF9F1C" },
  { color1: "#9D4EDD", color2: "#240046", color3: "#E0AAFF" },
  { color1: "#10B981", color2: "#064E3B", color3: "#6EE7B7" },
  { color1: "#F59E0B", color2: "#78350F", color3: "#EF4444" },
  { color1: "#F43F5E", color2: "#881337", color3: "#FB7185" },
  { color1: "#06B6D4", color2: "#164E63", color3: "#3B82F6" },
  { color1: "#C084FC", color2: "#581C87", color3: "#F472B6" },
  { color1: "#F97316", color2: "#7C2D12", color3: "#F43F5E" },
  { color1: "#6366F1", color2: "#1E1B4B", color3: "#A855F7" },
  { color1: "#E11D48", color2: "#4C0519", color3: "#FDA4AF" },
  { color1: "#34D399", color2: "#065F46", color3: "#A7F3D0" },
];

export const BackgroundMedia = memo(function BackgroundMedia() {
  const [palette, setPalette] = useState<Palette>(PALETTES[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * PALETTES.length);
    setPalette(PALETTES[randomIndex]);
  }, []);

  return (
    <div
      style={{ width: "100vw", height: "100vh", position: "absolute", inset: 0 }}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      <Grainient
        color1={palette.color1}
        color2={palette.color2}
        color3={palette.color3}
        timeSpeed={0.5}
        colorBalance={0.16}
        warpStrength={1}
        warpFrequency={5}
        warpSpeed={2}
        warpAmplitude={50}
        blendAngle={0}
        blendSoftness={0}
        rotationAmount={500}
        noiseScale={2}
        grainAmount={0.1}
        grainScale={2}
        grainAnimated={false}
        contrast={1.5}
        gamma={1}
        saturation={1}
        centerX={0}
        centerY={0}
        zoom={0.9}
      />
    </div>
  );
});






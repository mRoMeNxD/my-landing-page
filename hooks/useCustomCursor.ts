"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useCustomCursor(enabled: boolean = true) {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if touch device or coarse pointer
    const checkTouch = () => {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(isCoarse || hasTouch);
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);

    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  useEffect(() => {
    if (!enabled || isTouchDevice || reducedMotion) return;

    let rafId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest("a, button, input, select, textarea, [role='button'], label, [data-interactive='true']")
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const loop = () => {
      // Smooth linear interpolation (lerp)
      const ease = 0.22;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [enabled, isTouchDevice, reducedMotion, isVisible]);

  return {
    cursorRef,
    isTouchDevice,
    isHovered,
    isVisible,
    isActive: enabled && !isTouchDevice && !reducedMotion,
  };
}

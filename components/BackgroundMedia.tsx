"use client";

import React, { memo, useEffect, useRef } from "react";

export const BackgroundMedia = memo(function BackgroundMedia() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (video) {
      video.play().catch(() => {});
    }
    if (audio) {
      if (video) {
        audio.currentTime = video.currentTime;
      }
      audio.play().catch(() => {});
    }

    const handleUserGesture = () => {
      const v = videoRef.current;
      const a = audioRef.current;
      if (a && a.paused && v && !v.paused) {
        a.currentTime = v.currentTime;
        a.play().catch(() => {});
      }
    };

    window.addEventListener("click", handleUserGesture, { once: true });
    window.addEventListener("touchstart", handleUserGesture, { once: true });
    window.addEventListener("keydown", handleUserGesture, { once: true });

    return () => {
      window.removeEventListener("click", handleUserGesture);
      window.removeEventListener("touchstart", handleUserGesture);
      window.removeEventListener("keydown", handleUserGesture);
    };
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (video && audio && !video.paused) {
      const diff = Math.abs(audio.currentTime - video.currentTime);
      if (diff > 0.15) {
        audio.currentTime = video.currentTime;
      }
    }
  };

  const handleVideoPlay = () => {
    if (audioRef.current) {
      if (videoRef.current) {
        audioRef.current.currentTime = videoRef.current.currentTime;
      }
      audioRef.current.play().catch(() => {});
    }
  };

  const handleVideoPause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none w-screen h-screen bg-[#12110F]"
      aria-hidden="true"
    >
      {/* Fullscreen Video + Synchronized External Audio */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          src="/assets/video-file-1-yuta.mp4"
          autoPlay
          loop
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
          className="w-full h-full object-cover"
        />
        <audio
          ref={audioRef}
          src="/assets/audio-file-1-yuta.webm"
          loop
          preload="auto"
        />
      </div>

      {/* Atmospheric tonal depth grade overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(16, 15, 13, 0.25) 0%, rgba(16, 15, 13, 0.35) 50%, rgba(10, 9, 8, 0.65) 100%)",
        }}
      />
    </div>
  );
});



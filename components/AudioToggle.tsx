"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

// ─── TODO: Replace with your actual audio file path in /public/ ───
// Example: place your .mp3 file at /public/audio/background.mp3
//          and update AUDIO_SRC below.
const AUDIO_SRC = "/audio/lumiere.mp3";

export default function AudioToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay blocked by browser – user must interact first
      });
      setIsPlaying(true);
    }
  };

  if (!mounted) return null;

  return (
    <button
      id="audio-toggle-btn"
      className="audio-btn animate-pulse-rose"
      onClick={toggle}
      title={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
      aria-label={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
    >
      {isPlaying ? <Volume2 size={22} /> : <VolumeX size={22} />}
    </button>
  );
}

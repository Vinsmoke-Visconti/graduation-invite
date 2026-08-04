"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Sparkles, Music } from "lucide-react";

// Đường dẫn file nhạc của bạn
const AUDIO_SRC = "/audio/lumiere.mp3";

export default function AudioToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(true);
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

  // Xử lý khi bấm "Mở Thư Mời"
  const handleOpenInvitation = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Trình duyệt chặn autoplay:", err));
    }
    setShowModal(false); // Đóng màn hình chào
  };

  // Bật / Tắt nhạc thủ công
  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => { });
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* ── 1. Màn hình chào (Welcome Popup) ── */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 transition-all duration-500">
          <div className="text-center space-y-6 max-w-sm w-full bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-pink-100 transform transition-all animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto text-pink-500 animate-bounce">
              <Sparkles size={32} />
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-widest text-pink-500">
                Graduation Invitation
              </p>
              <h2 className="text-2xl font-serif text-gray-800">
                Lễ Tốt Nghiệp Hoàng Thị Mỹ Kim
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed">
                Trân trọng kính mời bạn đến tham dự và chia sẻ khoảnh khắc đặc biệt này!
              </p>
            </div>

            <button
              onClick={handleOpenInvitation}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-medium rounded-full shadow-lg hover:shadow-pink-200 transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Music size={18} />
              <span>Mở Thư Mời & Phát Nhạc</span>
            </button>
          </div>
        </div>
      )}

      {/* ── 2. Nút Bật/Tắt Nhạc Cố Định ── */}
      <button
        id="audio-toggle-btn"
        className="audio-btn animate-pulse-rose"
        onClick={toggle}
        title={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
        aria-label={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
      >
        {isPlaying ? <Volume2 size={22} /> : <VolumeX size={22} />}
      </button>
    </>
  );
}
"use client";

import React, { useState, useRef } from "react";
import { Sparkles, Music, VolumeX, Volume2 } from "lucide-react";

interface WelcomeModalProps {
    audioSrc: string; // Đường dẫn file mp3 trong thư mục public (vd: "/audio/background.mp3")
    recipientName?: string;
}

export default function WelcomeModal({ audioSrc, recipientName = "Mỹ Kim" }: WelcomeModalProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Hàm kích hoạt mở thư và phát nhạc
    const handleOpenInvitation = () => {
        if (audioRef.current) {
            audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch((err) => console.log("Lỗi phát nhạc:", err));
        }
        setIsOpen(false); // Ẩn màn hình chào
    };

    // Nút bật/tắt nhạc cố định ở góc màn hình sau khi đã vào web
    const toggleMusic = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <>
            {/* Thẻ audio ẩn */}
            <audio ref={audioRef} src={audioSrc} loop preload="auto" />

            {/* 1. Màn hình Chào (Overlay) che toàn màn hình ban đầu */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-pink-50/95 backdrop-blur-md transition-all duration-500 p-4">
                    <div className="text-center space-y-6 max-w-sm w-full bg-white p-8 rounded-3xl shadow-xl border border-pink-100">
                        <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto text-pink-500 animate-bounce">
                            <Sparkles size={32} />
                        </div>

                        <div className="space-y-2">
                            <p className="text-xs font-medium uppercase tracking-widest text-pink-400">
                                Graduation Invitation
                            </p>
                            <h2 className="text-2xl font-serif text-gray-800">
                                Lễ Tốt Nghiệp {recipientName}
                            </h2>
                            <p className="text-xs text-gray-500">
                                Trân trọng kính mời bạn đến tham dự và chia sẻ khoảnh khắc đặc biệt này!
                            </p>
                        </div>

                        <button
                            onClick={handleOpenInvitation}
                            className="w-full py-3.5 px-6 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-medium rounded-full shadow-lg hover:shadow-pink-200 transition-all transform active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Music size={18} />
                            <span>Mở Thư Mời & Phát Nhạc</span>
                        </button>
                    </div>
                </div>
            )}

            {/* 2. Nút Bật/Tắt nhạc thu nhỏ ở góc màn hình sau khi đã mở thư */}
            {!isOpen && (
                <button
                    onClick={toggleMusic}
                    className="fixed bottom-5 right-5 z-40 p-3 bg-white/80 backdrop-blur-md border border-pink-200 rounded-full shadow-md text-pink-600 hover:bg-pink-50 transition-all flex items-center justify-center"
                    title={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
                >
                    {isPlaying ? (
                        <Volume2 className="w-5 h-5 animate-pulse text-pink-500" />
                    ) : (
                        <VolumeX className="w-5 h-5 text-gray-400" />
                    )}
                </button>
            )}
        </>
    );
}
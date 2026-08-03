"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// ─── Personal Graduation Gallery Photos ───
const PHOTOS = [
  {
    src: "/images/img_02.jpg",
    alt: "Hoàng Mỹ Kim - Ảnh Kỷ Niệm 1",
    caption: "Khoảnh khắc đáng nhớ",
  },
  {
    src: "/images/img_03.jpg",
    alt: "Hoàng Mỹ Kim - Ảnh Kỷ Niệm 2",
    caption: "Ngày cầm tấm bằng tốt nghiệp",
  },
  {
    src: "/images/img_04.jpg",
    alt: "Hoàng Mỹ Kim - Ảnh Kỷ Niệm 3",
    caption: "Thanh xuân rực rỡ",
  },
  {
    src: "/images/img_05.jpg",
    alt: "Hoàng Mỹ Kim - Ảnh Kỷ Niệm 4",
    caption: "Nụ cười ngày chung đôi",
  },
  {
    src: "/images/img_06.jpg",
    alt: "Hoàng Mỹ Kim - Ảnh Kỷ Niệm 5",
    caption: "Kỷ niệm tuổi học trò & đại học",
  },
  {
    src: "/images/img_07.jpg",
    alt: "Hoàng Mỹ Kim - Ảnh Kỷ Niệm 6",
    caption: "Giảng đường thân thương",
  },
  {
    src: "/images/img_08.jpg",
    alt: "Hoàng Mỹ Kim - Ảnh Kỷ Niệm 7",
    caption: "Hành trình 4 năm nâng bước",
  },
  {
    src: "/images/img_09.jpg",
    alt: "Hoàng Mỹ Kim - Ảnh Kỷ Niệm 8",
    caption: "Cột mốc mới mở ra",
  },
  {
    src: "/images/img_12.jpg",
    alt: "Hoàng Mỹ Kim - Ảnh Kỷ Niệm 9",
    caption: "Những người bạn tuyệt vời",
  },
  {
    src: "/images/img_14.jpg",
    alt: "Hoàng Mỹ Kim - Ảnh Kỷ Niệm 10",
    caption: "Tự hào bước tiếp tương lai",
  },
];

export default function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % PHOTOS.length : 0
    );
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + PHOTOS.length) % PHOTOS.length : 0
    );
  }, []);

  return (
    <section
      id="gallery"
      className="py-20 gradient-section"
    >
      <div className="section-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-2 mb-12"
        >
          <p className="section-subtitle">Album</p>
          <h2 className="section-title text-center">Kỷ Niệm Đáng Nhớ</h2>
          <div className="divider-rose w-48 mt-2"><span>📸</span></div>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="columns-2 sm:columns-3 gap-3 space-y-3">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="break-inside-avoid rounded-2xl overflow-hidden relative group cursor-pointer"
              style={{
                boxShadow: "var(--shadow-soft)",
                border: "2px solid rgba(183,110,121,0.12)",
              }}
              onClick={() => openLightbox(i)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={400}
                height={i % 2 === 0 ? 500 : 350}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 33vw"
              />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(180deg, rgba(183,110,121,0.15), rgba(143,74,85,0.55))",
                }}
              >
                <ZoomIn size={28} color="white" />
                <p
                  className="font-body text-xs text-center px-2"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <p
          className="text-center mt-6 font-body text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          Bấm vào ảnh để xem toàn màn hình ✨
        </p>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-[90vw] max-h-[88vh] flex flex-col items-center gap-3"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 16px 64px rgba(0,0,0,0.5)" }}>
                <Image
                  src={PHOTOS[lightboxIndex].src}
                  alt={PHOTOS[lightboxIndex].alt}
                  width={800}
                  height={600}
                  className="max-h-[75vh] w-auto object-contain"
                  style={{ maxWidth: "90vw" }}
                />
              </div>

              {/* Caption */}
              <p className="font-body text-sm" style={{ color: "rgba(255,230,230,0.9)" }}>
                {PHOTOS[lightboxIndex].caption}
              </p>

              {/* Navigation */}
              <div className="flex gap-4">
                <button
                  onClick={goPrev}
                  className="btn-rose btn-rose-primary py-2 px-4"
                  aria-label="Ảnh trước"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={goNext}
                  className="btn-rose btn-rose-primary py-2 px-4"
                  aria-label="Ảnh tiếp theo"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Close button */}
              <button
                id="lightbox-close-btn"
                className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center"
                style={{ color: "var(--rose-gold-dark)", boxShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
                onClick={closeLightbox}
                aria-label="Đóng"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

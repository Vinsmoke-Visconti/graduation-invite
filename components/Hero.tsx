"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Countdown from "./Countdown";

// ─── TODO: Replace HERO_IMAGE_URL with your personal graduation photo ───
// Current: Unsplash placeholder (woman in graduation cap & gown)
const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1627556704302-624286467c65?w=800&q=85";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Background Image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE_URL}
          alt="Hoàng Thị Mỹ Kim – Lễ Tốt Nghiệp 2026"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
          style={{ filter: "brightness(0.82) saturate(1.1)" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* ── Decorative floating petals ── */}
      {["🌸", "✨", "🌺", "💐"].map((emoji, i) => (
        <span
          key={i}
          className="animate-float pointer-events-none select-none absolute text-2xl opacity-60"
          style={{
            top: `${15 + i * 18}%`,
            left: `${5 + i * 22}%`,
            animationDelay: `${i * 0.9}s`,
          }}
        >
          {emoji}
        </span>
      ))}

      {/* ── Main Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 gap-6">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-sm font-semibold tracking-[0.25em] uppercase"
          style={{ color: "var(--mauve)" }}
        >
          ✦ Thư Mời Tốt Nghiệp ✦
        </motion.p>

        {/* Script name */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-script"
          style={{
            fontSize: "clamp(2.8rem, 10vw, 5.5rem)",
            color: "var(--rose-gold-dark)",
            textShadow: "0 2px 20px rgba(183,110,121,0.25)",
            lineHeight: 1.1,
          }}
        >
          Hoàng Thị Mỹ Kim
        </motion.h2>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="divider-rose w-full max-w-xs"
        >
          <span className="text-lg">🎓</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="font-heading"
          style={{
            fontSize: "clamp(1.4rem, 5vw, 2.4rem)",
            color: "var(--charcoal)",
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          Lễ Tốt Nghiệp Đại Học
        </motion.h1>

        {/* Date subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0 }}
          className="font-body"
          style={{
            fontSize: "1.05rem",
            color: "var(--text-muted)",
            fontWeight: 500,
          }}
        >
          10:00 – 12:00 ✦ Ngày 09 tháng 08 năm 2026
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-2 w-full"
        >
          <Countdown />
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-4 flex flex-col items-center gap-1"
          style={{ color: "var(--mauve)" }}
        >
          <span className="font-body text-xs tracking-widest uppercase">
            Cuộn để khám phá
          </span>
          <div
            className="w-5 h-8 border-2 rounded-full flex justify-center pt-1.5"
            style={{ borderColor: "var(--rose-gold-light)" }}
          >
            <div
              className="w-1 h-1.5 rounded-full animate-bounce"
              style={{ background: "var(--rose-gold)" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

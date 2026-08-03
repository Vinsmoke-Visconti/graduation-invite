"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="py-12 text-center"
      style={{
        background: "linear-gradient(180deg, var(--cream) 0%, var(--petal) 100%)",
        borderTop: "1px solid rgba(183,110,121,0.15)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-4 px-6"
      >
        {/* Decorative */}
        <div className="flex gap-3 text-2xl opacity-70">
          <span>🌸</span>
          <span>🎓</span>
          <span>🌸</span>
        </div>

        {/* Script name */}
        <p
          className="font-script"
          style={{
            fontSize: "2.2rem",
            color: "var(--rose-gold-dark)",
          }}
        >
          Hoàng Mỹ Kim
        </p>

        {/* Divider */}
        <div className="divider-rose w-40">
          <span style={{ fontSize: "0.8rem" }}>✦</span>
        </div>

        {/* Main tagline */}
        <p
          className="font-heading italic"
          style={{
            fontSize: "clamp(1rem, 3vw, 1.4rem)",
            color: "var(--charcoal)",
            fontWeight: 400,
          }}
        >
          &ldquo;Thank you for being part of my journey! ✨&rdquo;
        </p>

        {/* Event date */}
        <p
          className="font-body text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          Lễ Tốt Nghiệp · 09 / 08 / 2026 · ĐH Văn Lang CS3
        </p>

        {/* Copyright */}
        <div
          className="flex items-center gap-1.5 font-body text-xs mt-2"
          style={{ color: "var(--mauve)" }}
        >
          <span>Made with</span>
          <Heart size={12} fill="currentColor" />
          <span>for Kim&apos;s graduation</span>
        </div>
      </motion.div>
    </footer>
  );
}

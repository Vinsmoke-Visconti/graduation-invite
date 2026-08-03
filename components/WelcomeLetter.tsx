"use client";

import { motion } from "framer-motion";

// ─── TODO: Customize the welcome letter text below ───
const LETTER_TEXT = `Kính gửi bạn thân mến,

Thời gian trôi qua thật nhanh — từ những ngày đầu bỡ ngỡ bước vào giảng đường cho đến hôm nay, cột mốc đáng nhớ nhất trong hành trình học vấn của Kim đã đến thật gần.

Cảm ơn bạn đã luôn là một phần thanh xuân rực rỡ của Kim. Những kỷ niệm cùng nhau, những lúc vui buồn sẻ chia — tất cả đều là những viên gạch quý giá tạo nên hành trình đẹp đẽ này.

Trân trọng mời bạn đến tham dự và chia sẻ khoảnh khắc cột mốc đáng nhớ này cùng Kim nhé!

Với tất cả tình yêu thương,`;

const SIGNATURE = "Hoàng Thị Mỹ Kim 💗";

export default function WelcomeLetter() {
  return (
    <section
      id="welcome"
      className="py-20 gradient-section"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* Section label */}
          <div className="flex flex-col items-center gap-2 mb-10">
            <p className="section-subtitle">Thư Ngỏ</p>
            <h2 className="section-title text-center">
              Lời Mời Từ Kim
            </h2>
            <div className="divider-rose w-48 mt-2">
              <span>✦</span>
            </div>
          </div>

          {/* Letter card */}
          <div
            className="card-glass relative p-7 sm:p-10"
            style={{
              background:
                "linear-gradient(145deg, rgba(253,248,245,0.95) 0%, rgba(252,232,232,0.60) 100%)",
            }}
          >
            {/* Decorative top line */}
            <div
              className="absolute top-0 left-8 right-8 h-px"
              style={{ background: "linear-gradient(90deg, transparent, var(--blush-deep), transparent)" }}
            />

            {/* Envelope icon */}
            <div className="flex justify-center mb-6">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                style={{ background: "var(--petal)", border: "2px solid var(--blush-deep)" }}
              >
                💌
              </div>
            </div>

            {/* Letter body */}
            <div className="font-body text-base leading-relaxed whitespace-pre-line"
              style={{ color: "var(--charcoal)" }}>
              {LETTER_TEXT}
            </div>

            {/* Signature */}
            <div className="mt-8 flex flex-col items-end">
              <div
                className="h-px w-32 mb-4"
                style={{ background: "linear-gradient(90deg, transparent, var(--rose-gold-light))" }}
              />
              <p
                className="font-script"
                style={{ fontSize: "1.8rem", color: "var(--rose-gold-dark)" }}
              >
                {SIGNATURE}
              </p>
            </div>

            {/* Decorative bottom line */}
            <div
              className="absolute bottom-0 left-8 right-8 h-px"
              style={{ background: "linear-gradient(90deg, transparent, var(--blush-deep), transparent)" }}
            />
          </div>

          {/* Decorative flowers */}
          <div className="flex justify-center mt-8 gap-4 text-2xl opacity-60">
            <span>🌸</span>
            <span>🌷</span>
            <span>🌸</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

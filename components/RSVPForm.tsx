"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import confetti from "canvas-confetti";

type AttendanceType = "yes" | "no" | "";

interface FormData {
  name: string;
  attendance: AttendanceType;
  guest_count: number;
  message: string;
}

const INITIAL_FORM: FormData = {
  name: "",
  attendance: "",
  guest_count: 0,
  message: "",
};

function fireConfetti() {
  const colors = ["#f9d4d4", "#b76e79", "#d4919a", "#fdeaea", "#c27b85"];

  // Left burst
  confetti({
    particleCount: 80,
    spread: 60,
    origin: { x: 0.2, y: 0.7 },
    colors,
    scalar: 1.1,
  });

  // Right burst
  confetti({
    particleCount: 80,
    spread: 60,
    origin: { x: 0.8, y: 0.7 },
    colors,
    scalar: 1.1,
  });

  // Center cascade
  setTimeout(() => {
    confetti({
      particleCount: 120,
      startVelocity: 35,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors,
    });
  }, 200);
}

export default function RSVPForm() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Vui lòng nhập họ và tên của bạn 😊");
      return;
    }
    if (!form.attendance) {
      toast.error("Vui lòng cho Kim biết bạn có thể đến không nhé!");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("rsvps").insert([
        {
          name: form.name.trim(),
          attendance: form.attendance,
          guest_count: form.attendance === "yes" ? form.guest_count : 0,
          message: form.message.trim() || null,
        },
      ]);

      if (error) throw error;

      // Gửi email thông báo tự động
      try {
        await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            attendance: form.attendance,
            guest_count: form.attendance === "yes" ? form.guest_count : 0,
            message: form.message.trim() || null,
          }),
        });
      } catch (emailErr) {
        console.error("Lỗi khi kích hoạt gửi email:", emailErr);
      }

      // Success!
      setSubmitted(true);
      fireConfetti();
      toast.success("Xác nhận thành công! Kim rất mong gặp bạn 🎉");
    } catch (err) {
      console.error("RSVP error:", err);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau nhé!");
    } finally {
      setLoading(false);
    }
  };

  // ── Success state ──
  if (submitted) {
    return (
      <section id="rsvp" className="py-20" style={{ background: "var(--cream)" }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="card-petal p-10 flex flex-col items-center text-center gap-4"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: "var(--petal)" }}
            >
              <CheckCircle size={44} style={{ color: "var(--rose-gold)" }} />
            </div>
            <h3
              className="font-heading font-semibold"
              style={{ fontSize: "1.8rem", color: "var(--rose-gold-dark)" }}
            >
              Cảm ơn bạn rất nhiều! 💗
            </h3>
            <p className="font-body" style={{ color: "var(--text-muted)" }}>
              Kim đã nhận được xác nhận của bạn.
              Hẹn gặp nhau vào ngày vui nhé! 🎓
            </p>
            <button
              className="btn-rose btn-rose-outline mt-2"
              onClick={() => {
                setForm(INITIAL_FORM);
                setSubmitted(false);
              }}
            >
              Gửi thêm một xác nhận
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  // ── Form state ──
  return (
    <section id="rsvp" className="py-20" style={{ background: "var(--cream)" }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Heading */}
          <div className="flex flex-col items-center gap-2 mb-10">
            <p className="section-subtitle">Xác Nhận</p>
            <h2 className="section-title text-center">Bạn Có Tham Dự Không?</h2>
            <div className="divider-rose w-48 mt-2"><span>💌</span></div>
          </div>

          {/* Form card */}
          <form onSubmit={handleSubmit} className="card-glass p-7 sm:p-10 flex flex-col gap-6">

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="rsvp-name"
                className="font-body text-sm font-semibold"
                style={{ color: "var(--charcoal)" }}
              >
                Họ và Tên <span style={{ color: "var(--rose-gold)" }}>*</span>
              </label>
              <input
                id="rsvp-name"
                type="text"
                placeholder="Nhập tên của bạn..."
                className="input-rose"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            {/* Attendance */}
            <div className="flex flex-col gap-2">
              <p
                className="font-body text-sm font-semibold"
                style={{ color: "var(--charcoal)" }}
              >
                Bạn có thể tham dự không? <span style={{ color: "var(--rose-gold)" }}>*</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                {[
                  { value: "yes", label: "🎉 Có, Kim nhé!", desc: "Mình sẽ đến!" },
                  { value: "no", label: "😢 Rất tiếc không thể đến", desc: "Xin lỗi Kim..." },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex-1 flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-250"
                    style={{
                      border: `1.5px solid ${form.attendance === opt.value ? "var(--rose-gold)" : "rgba(183,110,121,0.25)"}`,
                      background: form.attendance === opt.value ? "var(--petal)" : "rgba(255,255,255,0.65)",
                    }}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value={opt.value}
                      className="hidden"
                      checked={form.attendance === opt.value}
                      onChange={() => setForm({ ...form, attendance: opt.value as AttendanceType })}
                    />
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{
                        borderColor: "var(--rose-gold)",
                        background: form.attendance === opt.value ? "var(--rose-gold)" : "transparent",
                      }}
                    >
                      {form.attendance === opt.value && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-body font-semibold text-sm" style={{ color: "var(--charcoal)" }}>
                        {opt.label}
                      </p>
                      <p className="font-body text-xs" style={{ color: "var(--text-muted)" }}>
                        {opt.desc}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Guest count – only shown when attending */}
            {form.attendance === "yes" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col gap-1.5"
              >
                <label
                  htmlFor="guest-count"
                  className="font-body text-sm font-semibold"
                  style={{ color: "var(--charcoal)" }}
                >
                  Số người đi cùng (không kể bạn)
                </label>
                <select
                  id="guest-count"
                  className="input-rose"
                  value={form.guest_count}
                  onChange={(e) => setForm({ ...form, guest_count: Number(e.target.value) })}
                >
                  <option value={0}>Chỉ mình mình thôi</option>
                  <option value={1}>+ 1 người</option>
                  <option value={2}>+ 2 người</option>
                  <option value={3}>+ 3 người</option>
                </select>
              </motion.div>
            )}

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="rsvp-message"
                className="font-body text-sm font-semibold"
                style={{ color: "var(--charcoal)" }}
              >
                Lời nhắn cho Kim 💕
                <span className="font-normal ml-1" style={{ color: "var(--text-muted)" }}>(không bắt buộc)</span>
              </label>
              <textarea
                id="rsvp-message"
                placeholder="Gửi lời chúc mừng hoặc nhắn nhủ điều gì đó thật ý nghĩa nhé..."
                className="input-rose resize-none"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            {/* Submit */}
            <button
              id="rsvp-submit-btn"
              type="submit"
              disabled={loading}
              className="btn-rose btn-rose-primary justify-center w-full sm:w-auto sm:self-center sm:px-12 mt-2"
            >
              {loading ? (
                <>
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"
                  />
                  Đang gửi...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Gửi Xác Nhận 🎉
                </>
              )}
            </button>

            <p
              className="text-center font-body text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              Kim sẽ nhận được thông báo khi bạn gửi xác nhận ✨
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Heart, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSec < 60) return "vừa xong";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} phút trước`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} giờ trước`;
  return `${Math.floor(diffSec / 86400)} ngày trước`;
}

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // ── Fetch entries ──
  const fetchEntries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("guestbook")
      .select("id, name, message, created_at")
      .order("created_at", { ascending: false })
      .limit(20);

    if (!error && data) setEntries(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();

    // Real-time subscription: listen for new guestbook entries
    const channel = supabase
      .channel("guestbook-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "guestbook" },
        (payload) => {
          setEntries((prev) => [payload.new as GuestbookEntry, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ── Submit new entry ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Bạn chưa nhập tên nhé 🌸");
      return;
    }
    if (!message.trim()) {
      toast.error("Hãy để lại lời chúc cho Kim nhé 💕");
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.from("guestbook").insert([
        {
          name: name.trim(),
          message: message.trim(),
        },
      ]);

      if (error) throw error;

      toast.success("Lời chúc của bạn đã được gửi đến Kim! 💗");
      setName("");
      setMessage("");
      // Realtime subscription will add the entry automatically
    } catch (err) {
      console.error("Guestbook error:", err);
      toast.error("Có lỗi xảy ra, thử lại sau nhé!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="guestbook"
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
          <p className="section-subtitle">Sổ Lưu Bút</p>
          <h2 className="section-title text-center">Để Lại Lời Chúc Cho Kim</h2>
          <div className="divider-rose w-48 mt-2"><span>📝</span></div>
        </motion.div>

        {/* New entry form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="card-glass p-6 sm:p-8 mb-10"
        >
          <h3
            className="font-heading font-semibold mb-4"
            style={{ fontSize: "1.2rem", color: "var(--rose-gold-dark)" }}
          >
            Gửi lời chúc mừng 🌷
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              id="guestbook-name"
              type="text"
              placeholder="Tên của bạn..."
              className="input-rose"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              id="guestbook-message"
              placeholder="Viết lời chúc mừng, kỷ niệm hoặc điều bạn muốn nói với Kim nhé..."
              className="input-rose resize-none"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex items-center justify-between gap-3">
              <p className="font-body text-xs" style={{ color: "var(--text-muted)" }}>
                Lời chúc sẽ hiển thị ngay lập tức ✨
              </p>
              <button
                id="guestbook-submit-btn"
                type="submit"
                disabled={submitting}
                className="btn-rose btn-rose-primary"
              >
                {submitting ? (
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <Send size={15} />
                )}
                Gửi lời chúc
              </button>
            </div>
          </form>
        </motion.div>

        {/* Entries list */}
        <div className="flex items-center justify-between mb-5">
          <p className="font-heading font-medium" style={{ color: "var(--rose-gold-dark)", fontSize: "1.1rem" }}>
            {entries.length > 0
              ? `${entries.length} lời chúc mừng 💌`
              : "Chưa có lời chúc nào..."}
          </p>
          <button
            onClick={fetchEntries}
            className="flex items-center gap-1.5 font-body text-sm"
            style={{ color: "var(--mauve)" }}
            aria-label="Làm mới"
          >
            <RefreshCw size={14} />
            Làm mới
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div
              className="w-10 h-10 rounded-full border-3 border-t-transparent animate-spin"
              style={{ borderColor: "var(--blush-deep)", borderTopColor: "transparent" }}
            />
          </div>
        ) : entries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-4xl mb-3">🌸</div>
            <p className="font-body text-sm" style={{ color: "var(--text-muted)" }}>
              Hãy là người đầu tiên để lại lời chúc cho Kim nhé!
            </p>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="guestbook-entry"
                >
                  {/* Quote mark is via CSS ::before */}
                  <div className="flex items-start justify-between gap-2 mb-2 mt-2">
                    <h4
                      className="font-heading font-semibold"
                      style={{ fontSize: "1rem", color: "var(--rose-gold-dark)" }}
                    >
                      {entry.name}
                    </h4>
                    <span
                      className="font-body text-xs flex-shrink-0"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {timeAgo(entry.created_at)}
                    </span>
                  </div>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "var(--charcoal)" }}>
                    {entry.message}
                  </p>
                  <div className="flex justify-end mt-2">
                    <Heart size={12} style={{ color: "var(--blush-deep)" }} fill="currentColor" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}

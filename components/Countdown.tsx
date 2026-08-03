"use client";

import { useEffect, useState } from "react";

// ─── Event date: 10:00 AM, 09 August 2026 (Vietnam time UTC+7) ───
const EVENT_DATE = new Date("2026-08-09T10:00:00+07:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = EVENT_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const LABELS = ["Ngày", "Giờ", "Phút", "Giây"];

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const values = [
    timeLeft.days,
    timeLeft.hours,
    timeLeft.minutes,
    timeLeft.seconds,
  ];

  if (!mounted) return null;

  const isEventOver = EVENT_DATE.getTime() - Date.now() <= 0;

  return (
    <div className="flex flex-col items-center gap-3">
      {isEventOver ? (
        <p
          className="font-heading text-2xl"
          style={{ color: "var(--rose-gold)" }}
        >
          ✨ Hôm nay là ngày trọng đại! ✨
        </p>
      ) : (
        <>
          <p
            className="font-body text-sm font-medium tracking-widest uppercase"
            style={{ color: "var(--mauve)", letterSpacing: "0.15em" }}
          >
            Đếm ngược đến lễ tốt nghiệp
          </p>

          <div className="flex items-center gap-2">
            {values.map((val, i) => (
              <div key={LABELS[i]} className="flex items-start gap-2">
                <div className="countdown-box flex flex-col items-center">
                  <span
                    className="font-heading font-semibold"
                    style={{
                      fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
                      color: "var(--rose-gold-dark)",
                      lineHeight: 1.1,
                    }}
                  >
                    {pad(val)}
                  </span>
                  <span
                    className="font-body text-xs mt-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {LABELS[i]}
                  </span>
                </div>
                {i < 3 && (
                  <span
                    className="font-heading font-bold mt-1"
                    style={{
                      fontSize: "1.6rem",
                      color: "var(--rose-gold)",
                      lineHeight: 1,
                    }}
                  >
                    :
                  </span>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

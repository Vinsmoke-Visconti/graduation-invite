"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Shirt, Navigation, CalendarPlus } from "lucide-react";

// ─── Google Maps link for Văn Lang University Campus 3 ───
// TODO: Replace with exact Google Maps share link if needed
const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Đại+học+Văn+Lang+Cơ+sở+3+69+Đặng+Thùy+Trâm+Bình+Thạnh+TP+HCM";

// ─── Google Calendar link ───
// Event: 09/08/2026 10:00-12:00 Vietnam Time (UTC+7 = 03:00-05:00 UTC)
const GOOGLE_CALENDAR_URL =
  "https://www.google.com/calendar/render?action=TEMPLATE" +
  "&text=Lễ+Tốt+Nghiệp+-+Hoàng+Thị+Mỹ+Kim" +
  "&dates=20260809T030000Z/20260809T050000Z" +
  "&details=Lễ+Tốt+Nghiệp+Đại+Học+của+Hoàng+Thị+Mỹ+Kim+tại+ĐH+Văn+Lang+CS3" +
  "&location=69/68+Đặng+Thùy+Trâm,+P.13,+Q.Bình+Thạnh,+TP.HCM" +
  "&sf=true&output=xml";

const EVENT_DETAILS = [
  {
    icon: <Clock size={26} strokeWidth={1.5} />,
    label: "Thời Gian",
    title: "10:00 - 12:00",
    subtitle: "Ngày 09 tháng 08 năm 2026",
    detail: "Chủ Nhật",
    color: "var(--rose-gold)",
  },
  {
    icon: <MapPin size={26} strokeWidth={1.5} />,
    label: "Địa Điểm",
    title: "ĐH Văn Lang - CS3",
    subtitle: "69/68 Đặng Thùy Trâm, P.13",
    detail: "Hội trường trịnh công sơn",
    color: "var(--mauve)",
  },
  {
    icon: <Shirt size={26} strokeWidth={1.5} />,
    label: "Trang Phục",
    title: "Dress Code",
    subtitle: "Tự do trong khuôn khổ",
    detail: "Trang phục lịch sự, nhẹ nhàng",
    color: "var(--blush-deep)",
  },
];

import { Variants } from "framer-motion";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.18 },
  }),
};

export default function EventDetails() {
  return (
    <section
      id="event-details"
      className="py-20"
      style={{ background: "var(--cream)" }}
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
          <p className="section-subtitle">Thông Tin Sự Kiện</p>
          <h2 className="section-title text-center">Thời Gian & Địa Điểm</h2>
          <div className="divider-rose w-48 mt-2"><span>✦</span></div>
        </motion.div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {EVENT_DETAILS.map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="card-petal p-6 flex flex-col items-center text-center gap-3 cursor-default"
            >
              {/* Icon circle */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-1"
                style={{
                  background: "rgba(255,255,255,0.75)",
                  border: `2px solid ${item.color}`,
                  color: item.color,
                }}
              >
                {item.icon}
              </div>

              <p
                className="font-body text-xs font-semibold tracking-[0.15em] uppercase"
                style={{ color: "var(--text-muted)" }}
              >
                {item.label}
              </p>
              <h3
                className="font-heading font-semibold leading-tight"
                style={{ fontSize: "1.2rem", color: "var(--charcoal)" }}
              >
                {item.title}
              </h3>
              <p
                className="font-body text-sm"
                style={{ color: "var(--rose-gold-dark)" }}
              >
                {item.subtitle}
              </p>
              <p
                className="font-body text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            id="google-maps-btn"
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-rose btn-rose-primary"
          >
            <Navigation size={16} />
            Mở chỉ đường Google Maps
          </a>
          <a
            id="google-calendar-btn"
            href={GOOGLE_CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-rose btn-rose-outline"
          >
            <CalendarPlus size={16} />
            Thêm vào Google Calendar
          </a>
        </motion.div>
      </div>
    </section>
  );
}

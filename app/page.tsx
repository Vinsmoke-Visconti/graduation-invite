import Hero from "@/components/Hero";
import WelcomeLetter from "@/components/WelcomeLetter";
import EventDetails from "@/components/EventDetails";
import PhotoGallery from "@/components/PhotoGallery";
import RSVPForm from "@/components/RSVPForm";
import Guestbook from "@/components/Guestbook";
import Footer from "@/components/Footer";
import AudioToggle from "@/components/AudioToggle";
import WelcomeModal from "@/components/WelcomeModal";

/**
 * Graduation E-Invitation – Hoàng Thị Mỹ Kim
 * Single Page App (Next.js App Router)
 *
 * Section order:
 *  0. WelcomeModal – Màn hình chào & Kích hoạt phát nhạc
 *  1. Hero         – Background, title, countdown
 *  2. Welcome      – Handwritten letter card
 *  3. EventDetails – Time, location, dress code cards + CTAs
 *  4. Gallery      – Masonry photo grid with lightbox
 *  5. RSVP         – Confirmation form → Supabase
 *  6. Guestbook    – Live wish board → Supabase
 *  7. Footer
 *  [Fixed] AudioToggle – Music on/off button
 */
export default function Page() {
  return (
    <main className="relative min-h-screen">
      {/* ── 0. Màn hình chào & Tự động phát nhạc khi người dùng bấm mở ── */}
      <WelcomeModal
        audioSrc="/audio/background.mp3"
        recipientName="Hoàng Mỹ Kim"
      />

      {/* ── 1. Hero ── */}
      <Hero />

      {/* ── 2. Welcome Letter ── */}
      <WelcomeLetter />

      {/* ── 3. Event Details ── */}
      <EventDetails />

      {/* ── 4. Photo Gallery ── */}
      <PhotoGallery />

      {/* ── 5. RSVP Form ── */}
      <RSVPForm />

      {/* ── 6. Guestbook ── */}
      <Guestbook />

      {/* ── 7. Footer ── */}
      <Footer />

      {/* ── Fixed: Audio Toggle Button ── */}
      {/* Lưu ý: Nếu trong WelcomeModal đã có sẵn nút Bật/Tắt nhạc thu nhỏ ở góc màn hình, 
          bạn có thể ẩn/xóa dòng <AudioToggle /> dưới đây để tránh trùng lặp 2 nút nhạc. */}
      {/* <AudioToggle /> */}
    </main>
  );
}
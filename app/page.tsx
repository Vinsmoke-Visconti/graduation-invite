import Hero from "@/components/Hero";
import WelcomeLetter from "@/components/WelcomeLetter";
import EventDetails from "@/components/EventDetails";
import PhotoGallery from "@/components/PhotoGallery";
import RSVPForm from "@/components/RSVPForm";
import Guestbook from "@/components/Guestbook";
import Footer from "@/components/Footer";
import AudioToggle from "@/components/AudioToggle";

/**
 * Graduation E-Invitation – Hoàng Thị Mỹ Kim
 * Single Page App (Next.js App Router)
 *
 * Section order:
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
    <main>
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
      <AudioToggle />
    </main>
  );
}

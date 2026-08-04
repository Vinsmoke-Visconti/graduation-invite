import Hero from "@/components/Hero";
import WelcomeLetter from "@/components/WelcomeLetter";
import EventDetails from "@/components/EventDetails";
import PhotoGallery from "@/components/PhotoGallery";
import RSVPForm from "@/components/RSVPForm";
import Guestbook from "@/components/Guestbook";
import Footer from "@/components/Footer";
import AudioToggle from "@/components/AudioToggle";

/**
 * Graduation E-Invitation – HoàngMỹ Kim
 * Single Page App (Next.js App Router)
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

      {/* ── Fixed: Audio Toggle Button + Welcome Overlay ── */}
      <AudioToggle />
    </main>
  );
}
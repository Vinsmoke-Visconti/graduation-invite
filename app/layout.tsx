import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Thư Mời Tốt Nghiệp – Hoàng Mỹ Kim | ĐH Văn Lang 2026",
  description:
    "Trân trọng kính mời bạn đến tham dự Lễ Tốt Nghiệp của Hoàng Mỹ Kim tại Trường Đại học Văn Lang, Cơ sở 3 – 10:00 sáng ngày 09 tháng 08 năm 2026.",
  openGraph: {
    title: "Thư Mời Tốt Nghiệp – Hoàng Mỹ Kim",
    description:
      "Bạn được mời tham dự Lễ Tốt Nghiệp Đại Học của Hoàng Mỹ Kim.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        {/* Google Fonts – Cormorant Garamond (heading), Great Vibes (script), Nunito (body) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Great+Vibes&family=Nunito:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        {/* Toast notifications for RSVP/Guestbook feedback */}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              fontFamily: "var(--font-body)",
              borderRadius: "1rem",
              background: "#fdf8f5",
              color: "#3d2c2c",
              border: "1px solid rgba(183,110,121,0.25)",
              boxShadow: "0 8px 32px rgba(183,110,121,0.18)",
            },
            success: {
              iconTheme: { primary: "#b76e79", secondary: "#fdf8f5" },
            },
          }}
        />
      </body>
    </html>
  );
}

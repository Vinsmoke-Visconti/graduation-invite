import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Thư Mời Tốt Nghiệp – Hoàng Thị Mỹ Kim | ĐH Văn Lang 2026",
  description:
    "Trân trọng kính mời bạn đến tham dự Lễ Tốt Nghiệp của Hoàng Thị Mỹ Kim tại Trường Đại học Văn Lang, Cơ sở 3 – 10:00 sáng ngày 09 tháng 08 năm 2026.",
  openGraph: {
    title: "Thư Mời Tốt Nghiệp – Hoàng Thị Mỹ Kim",
    description:
      "Bạn được mời tham dự Lễ Tốt Nghiệp Đại Học của Hoàng Thị Mỹ Kim.",
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
        {/* Google Fonts are loaded via globals.css @import */}
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

import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans-editorial",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#141311",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://guns.lol/mR_oMeNxD"),
  title: "Niteen — @mR_oMeNxD",
  description: "Personal brand and digital identity for Niteen (@mR_oMeNxD). Digital creator · developer.",
  openGraph: {
    title: "Niteen — @mR_oMeNxD",
    description: "Personal brand and digital identity for Niteen (@mR_oMeNxD).",
    url: "https://guns.lol/mR_oMeNxD",
    siteName: "Niteen",
    images: [
      {
        url: "/assets/profile.webp",
        width: 800,
        height: 800,
        alt: "Niteen portrait",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Niteen — @mR_oMeNxD",
    description: "Personal brand and digital creator identity.",
    creator: "@mR_oMeNxD",
    images: ["/assets/profile.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#141311] text-[#F3EFE6] font-sans selection:bg-[#56685B] selection:text-white">
        {children}
      </body>
    </html>
  );
}

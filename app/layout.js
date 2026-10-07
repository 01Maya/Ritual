import { Bricolage_Grotesque, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

const description =
  "Our radical idea: supplements should work. From university-led clinical studies to patented capsule design, every formula is built for efficacy.";

export const metadata = {
  title: "Ritual — Supplements that show their work",
  description,
  openGraph: { title: "Ritual — Supplements that show their work", description, type: "website" },
  twitter: { card: "summary_large_image", title: "Ritual", description },
};

export const viewport = { themeColor: "#3346FF", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

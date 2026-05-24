import type { Metadata } from "next";
import { Outfit, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import AdBanner from "@/components/molecules/AdBanner";
import Script from "next/script";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "DIVERSIFIED Y&P",
  description:
    "Discover curated premium products from top brands across electronics, fashion, and lifestyle. Smart shopping starts here.",
  keywords:
    "ecommerce, shopping, premium products, electronics, fashion, lifestyle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${playfair.variable}`}
    >
      <body>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="202fb15d-ba34-4193-bad0-f359836eb59b"
          strategy="afterInteractive"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6814953421558759"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <AdBanner slotId="header_top" />
        {children}

        <AdBanner slotId="mobile_anchor" className="mobile-anchor-container" />
        <AdBanner slotId="tablet_anchor" className="tablet-anchor-container" />
      </body>
    </html>
  );
}

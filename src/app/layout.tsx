import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Instagram Video Downloader - Download Reels, Posts & Videos",
  description: "Free Instagram video downloader. Download Instagram reels, posts, and videos in high quality. Fast, simple, and no registration required.",
  keywords: "instagram downloader, instagram video downloader, instagram reels downloader, download instagram videos, save instagram videos, instagram post downloader",
  openGraph: {
    title: "Instagram Video Downloader - Download Reels, Posts & Videos",
    description: "Free Instagram video downloader. Download Instagram reels, posts, and videos in high quality. Fast, simple, and no registration required.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Video Downloader - Download Reels, Posts & Videos",
    description: "Free Instagram video downloader. Download Instagram reels, posts, and videos in high quality. Fast, simple, and no registration required.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=YOUR-CLIENT-ID"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          id="ad-initialization"
          strategy="afterInteractive"
        >
          {`
            try {
              (adsbygoogle = window.adsbygoogle || []);
              adsbygoogle.push({
                google_ad_client: "YOUR-CLIENT-ID",
                enable_page_level_ads: true
              });
            } catch (e) {
              console.error('Ad initialization error:', e);
            }
          `}
        </Script>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

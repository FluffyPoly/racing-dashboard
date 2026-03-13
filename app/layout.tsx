import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Horse Racing Intelligence | Expert UK & Ireland Racing Tips & AI Predictions",
  description: "Get the professional edge with Horse Racing Intelligence. Data-driven UK and Ireland horse racing tips, AI predictions, market calibration, and daily analysis for Cheltenham, Aintree, and Royal Ascot.",
  keywords: ["horse racing tips", "UK horse racing predictions", "Irish racing tips", "Cheltenham Festival tips", "AI horse racing analytics", "Lucky 15 tips", "NAP of the day", "data-driven racing predictions", "expert horse racing analysis"],
  openGraph: {
    title: "Horse Racing Intelligence | Expert UK & Ireland Racing Tips",
    description: "Institutional-grade automated racing models. Predicted, Calibrated, and Verified. 34% win strike rate • 67% top-2 accuracy • Real-time performance tracking.",
    url: "https://racing-dashboard-murex.vercel.app/",
    siteName: "Horse Racing Intelligence",
    images: [
      {
        url: "https://racing-dashboard-murex.vercel.app/api/og",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Horse Racing Intelligence | Expert UK & Ireland Racing Tips",
    description: "Verified AI predictions • 34% win strike rate • 67% top-2 accuracy • Real-time analysis.",
    images: ["https://racing-dashboard-murex.vercel.app/api/og"],
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#fcfcfc] text-gray-900`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Set NEXT_PUBLIC_ADSENSE_CLIENT (e.g. "ca-pub-1234567890123456") in your
// deployment's environment variables once you have an AdSense publisher ID.
// This is the snippet Google's crawler looks for when it reviews your site
// for approval, and later serves your ads. Leave it unset locally — no
// script is injected until the env var is present, so dev builds stay clean.
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Calcora – EMI, GST, Salary, SIP, Age & Loan Calculator",
  description:
    "Free India calculators for EMI, GST, salary, SIP, age, percentage and loans. Get instant calculations with easy-to-understand results.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Calcora – EMI, GST, Salary, SIP, Age & Loan Calculator",
    description:
      "Free India calculators for EMI, GST, salary, SIP, age, percentage and loans. Get instant calculations with easy-to-understand results.",
    url: SITE_URL,
    siteName: "India Calculator",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calcora – EMI, GST, Salary, SIP, Age & Loan Calculator",
    description:
      "Free India calculators for EMI, GST, salary, SIP, age, percentage and loans. Get instant calculations with easy-to-understand results.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${sora.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        {children}
        {ADSENSE_CLIENT && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}

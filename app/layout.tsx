import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

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

const SITE_URL = "https://www.indiacalculator.example.com";

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
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}

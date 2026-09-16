import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

const CALC_LINKS = [
  { href: "/#emi-calculator", label: "EMI Calculator" },
  { href: "/#gst-calculator", label: "GST Calculator" },
  { href: "/#salary-calculator", label: "Salary Calculator" },
  { href: "/#sip-calculator", label: "SIP Calculator" },
  { href: "/#age-calculator", label: "Age Calculator" },
  { href: "/#percentage-calculator", label: "Percentage Calculator" },
  { href: "/#loan-calculator", label: "Loan Calculator" },
];

const COMPANY_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/terms", label: "Terms & Conditions" },
];

export default function Footer() {
  return (
    <footer className="bg-navy py-14 text-white/70">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="font-display text-lg font-bold text-white">
              🧮 {SITE_NAME}
            </div>
            <p className="mt-3 max-w-xs text-sm">
              Smart calculators for everyday Indian finances — fast, free
              and built for mobile.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Calculators</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CALC_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="focus-ring rounded hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="focus-ring rounded hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

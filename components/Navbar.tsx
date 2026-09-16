"use client";

import { useEffect, useState } from "react";
import { Menu, X, Calculator } from "lucide-react";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#calculators", label: "Calculators" },
  { href: "#emi-calculator", label: "EMI" },
  { href: "#gst-calculator", label: "GST" },
  { href: "#salary-calculator", label: "Salary" },
  { href: "#sip-calculator", label: "SIP" },
  { href: "#age-calculator", label: "Age" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-navy/95 backdrop-blur shadow-soft" : "bg-navy"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <a
          href="#home"
          className="focus-ring flex items-center gap-3 font-display text-xl font-bold text-white sm:text-2xl"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple to-pink text-white sm:h-12 sm:w-12">
            <Calculator size={22} className="sm:hidden" />
            <Calculator size={26} className="hidden sm:block" />
          </span>
          Calcora
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="focus-ring rounded-lg px-4 py-2.5 text-base font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="focus-ring rounded-lg p-2.5 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-white/10 bg-navy px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="focus-ring rounded-lg px-4 py-3 text-base font-medium text-white/85 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
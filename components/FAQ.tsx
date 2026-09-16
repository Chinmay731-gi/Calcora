"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "What is an EMI?",
    a: "An EMI, or Equated Monthly Installment, is the fixed amount you pay each month toward a loan. It includes both a principal component and an interest component, and it stays the same throughout the loan tenure on a standard fixed-rate loan.",
  },
  {
    q: "How is EMI calculated?",
    a: "EMI is calculated using the reducing-balance formula EMI = P × r × (1+r)^n / ((1+r)^n − 1), where P is the loan amount, r is the monthly interest rate, and n is the number of monthly installments.",
  },
  {
    q: "How is GST calculated in India?",
    a: "To add GST, multiply the base amount by the GST rate and add it to the base amount. To remove GST from an amount that already includes it, divide the inclusive amount by (1 + GST rate/100) to find the base amount.",
  },
  {
    q: "What is the difference between CTC and take-home salary?",
    a: "CTC (Cost to Company) is the total amount a company spends on an employee in a year, including allowances and employer contributions. Take-home salary is what actually reaches your bank account after deductions like provident fund, professional tax and other statutory or company-specific deductions.",
  },
  {
    q: "How does an SIP calculator work?",
    a: "An SIP calculator projects the future value of regular monthly investments using a compound-growth formula, based on your monthly contribution, expected annual return and investment duration.",
  },
  {
    q: "Can I use the age calculator for leap-year birthdays?",
    a: "Yes. The age calculator correctly accounts for leap years when computing years, months and days, including birthdays that fall on 29 February.",
  },
  {
    q: "How do I calculate percentage increase?",
    a: "Percentage increase is calculated as ((new value − old value) / old value) × 100. The percentage calculator on this page does this instantly when you enter both values.",
  },
  {
    q: "Are calculator results accurate?",
    a: "The calculations use standard, widely-used financial formulas and are accurate for the inputs you provide. However, real-world outcomes can vary based on factors like processing fees, prepayments, changing interest rates or company-specific salary rules.",
  },
  {
    q: "Are SIP returns guaranteed?",
    a: "No. SIP returns shown here are estimates based on the expected annual return you enter. Actual mutual fund returns depend on market performance and are never guaranteed.",
  },
  {
    q: "Is this website free?",
    a: "Yes, all calculators on India Calculator are free to use and do not require any login for basic calculations.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 bg-offwhite py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
          Frequently asked questions
        </h2>

        <div className="mt-10 divide-y divide-navy/10 rounded-3xl border border-navy/10 bg-white">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  >
                    <span className="font-medium text-navy">{item.q}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-navy/50 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  hidden={!isOpen}
                  className="px-5 pb-5 text-sm leading-relaxed text-navy/65 sm:px-6"
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ structured data for the visible content above */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          }),
        }}
      />
    </section>
  );
}

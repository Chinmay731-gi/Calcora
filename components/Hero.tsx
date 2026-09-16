"use client";

import { ArrowRight, Compass, TrendingUp, Wallet } from "lucide-react";
import { formatINR } from "@/lib/calculations";

const STATS = [
  { value: "7+", label: "Useful calculators" },
  { value: "Instant", label: "Results" },
  { value: "Mobile", label: "Friendly design" },
  { value: "₹0", label: "Cost to use" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-navy pb-20 pt-16 sm:pb-28 sm:pt-20"
    >
      {/* Animated gradient blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-purple/40 blur-3xl animate-blob" />
        <div className="absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-pink/30 blur-3xl animate-blob [animation-delay:4s]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-cyan/30 blur-3xl animate-blob [animation-delay:8s]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            India&rsquo;s smart calculator hub, built for everyday money moments 🇮🇳
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/70">
            Work out your EMI, GST, salary, SIP, age, percentages and loans in
            seconds — no spreadsheets, no sign-up, just clear numbers you can
            trust.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#emi-calculator"
              className="focus-ring inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple to-pink px-6 py-3.5 font-semibold text-white shadow-soft transition hover:brightness-110"
            >
              Start calculating
              <ArrowRight size={18} />
            </a>
            <a
              href="#calculators"
              className="focus-ring inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              <Compass size={18} />
              Explore calculators
            </a>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {stat.value}
                </dd>
                <div className="mt-1 text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </dl>
        </div>

        {/* Illustration: a live-looking EMI preview card */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute inset-0 -rotate-3 rounded-[2rem] bg-gradient-to-br from-orange to-yellow opacity-80 blur-0" />
          <div className="relative rounded-[2rem] border border-white/10 bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-purple/10 px-3 py-1 text-xs font-semibold text-purple">
                EMI Calculator
              </span>
              <Wallet size={20} className="text-purple" />
            </div>

            <div className="mt-6 space-y-4">
              <PreviewRow label="Loan amount" value={formatINR(2500000)} />
              <PreviewRow label="Interest rate" value="8.5% / year" />
              <PreviewRow label="Tenure" value="20 years" />
            </div>

            <div className="mt-6 rounded-2xl bg-navy p-5 text-white">
              <div className="text-xs uppercase tracking-normal text-white/60">
                Monthly EMI
              </div>
              <div className="mt-1 font-display text-3xl font-bold">
                {formatINR(21696)}
              </div>
              <div className="mt-3 flex items-center gap-1 text-sm text-green">
                <TrendingUp size={16} />
                Estimated in real time
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-navy/5 pb-3 text-sm">
      <span className="text-navy/60">{label}</span>
      <span className="font-semibold text-navy">{value}</span>
    </div>
  );
}

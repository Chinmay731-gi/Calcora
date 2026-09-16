import { Zap, Sparkles, Smartphone, Gift } from "lucide-react";

const REASONS = [
  {
    title: "Fast",
    description: "Instant calculations without complicated forms.",
    icon: Zap,
    color: "text-orange",
    bg: "bg-orange/10",
  },
  {
    title: "Simple",
    description: "Designed for everyday users, not spreadsheets.",
    icon: Sparkles,
    color: "text-purple",
    bg: "bg-purple/10",
  },
  {
    title: "Mobile friendly",
    description: "Works smoothly on phones, tablets and desktops.",
    icon: Smartphone,
    color: "text-cyan",
    bg: "bg-cyan/10",
  },
  {
    title: "Free",
    description: "No login required for basic calculations.",
    icon: Gift,
    color: "text-green",
    bg: "bg-green/10",
  },
];

export default function WhyUse() {
  return (
    <section className="bg-offwhite py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="max-w-xl font-display text-3xl font-extrabold text-navy sm:text-4xl">
          Why people keep coming back to India Calculator
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason) => (
            <div key={reason.title} className="rounded-3xl bg-white p-6 shadow-card">
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${reason.bg} ${reason.color}`}>
                <reason.icon size={20} />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-navy">{reason.title}</h3>
              <p className="mt-1.5 text-sm text-navy/60">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import {
  Landmark,
  Receipt,
  Wallet,
  LineChart,
  CalendarDays,
  Percent,
  HandCoins,
  ArrowUpRight,
} from "lucide-react";

const CALCULATORS = [
  {
    name: "EMI Calculator",
    description: "Calculate monthly loan payments and total interest.",
    href: "#emi-calculator",
    icon: Landmark,
    accent: "from-purple to-[#8B6BFF]",
    text: "text-purple",
  },
  {
    name: "GST Calculator",
    description: "Add or remove GST from any amount.",
    href: "#gst-calculator",
    icon: Receipt,
    accent: "from-orange to-yellow",
    text: "text-orange",
  },
  {
    name: "Salary Calculator",
    description: "Estimate monthly and annual salary breakdown.",
    href: "#salary-calculator",
    icon: Wallet,
    accent: "from-green to-cyan",
    text: "text-green",
  },
  {
    name: "SIP Calculator",
    description: "Estimate future wealth from monthly investments.",
    href: "#sip-calculator",
    icon: LineChart,
    accent: "from-cyan to-purple",
    text: "text-cyan",
  },
  {
    name: "Age Calculator",
    description: "Calculate exact age from date of birth.",
    href: "#age-calculator",
    icon: CalendarDays,
    accent: "from-pink to-orange",
    text: "text-pink",
  },
  {
    name: "Percentage Calculator",
    description: "Quickly calculate percentages and percentage changes.",
    href: "#percentage-calculator",
    icon: Percent,
    accent: "from-yellow to-orange",
    text: "text-[#B45309]",
  },
  {
    name: "Loan Calculator",
    description: "Estimate repayment, interest and total loan cost.",
    href: "#loan-calculator",
    icon: HandCoins,
    accent: "from-purple to-pink",
    text: "text-purple",
  },
];

export default function CalculatorGrid() {
  return (
    <section id="calculators" className="bg-offwhite py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
            Pick a calculator, get your answer
          </h2>
          <p className="mt-3 text-navy/60">
            Seven focused tools for the calculations Indian households and
            professionals reach for most.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CALCULATORS.map((calc) => (
            <a
              key={calc.name}
              href={calc.href}
              className="focus-ring group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${calc.accent} text-white`}
              >
                <calc.icon size={22} />
              </div>
              <div className="mt-5">
                <h3 className="font-display text-lg font-bold text-navy">
                  {calc.name}
                </h3>
                <p className="mt-2 text-sm text-navy/60">{calc.description}</p>
              </div>
              <div
                className={`mt-6 inline-flex items-center gap-1 text-sm font-semibold ${calc.text}`}
              >
                Calculate now
                <ArrowUpRight
                  size={16}
                  className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

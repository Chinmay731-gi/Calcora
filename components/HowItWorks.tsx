const STEPS = [
  {
    number: "01",
    title: "Enter values",
    description: "Enter your financial or personal details into the relevant calculator.",
  },
  {
    number: "02",
    title: "Calculate",
    description: "Our calculator processes the numbers instantly, right in your browser.",
  },
  {
    number: "03",
    title: "Understand",
    description: "Review the result, charts and breakdown to decide your next step.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
          How it works
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative">
              <div className="font-display text-5xl font-extrabold text-navy/10">
                {step.number}
              </div>
              <h3 className="mt-2 font-display text-xl font-bold text-navy">{step.title}</h3>
              <p className="mt-2 text-sm text-navy/60">{step.description}</p>
              {i < STEPS.length - 1 && (
                <div className="mt-6 hidden h-px w-full bg-gradient-to-r from-navy/10 to-transparent sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

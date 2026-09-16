"use client";

import { useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { calculateEMI, formatINR } from "@/lib/calculations";
import Field from "./Field";
import CalculatorActions from "./CalculatorActions";

const COLORS = { principal: "#6C4CF1", interest: "#FF7A18" };

export default function EmiCalculator() {
  const [amount, setAmount] = useState("2500000");
  const [rate, setRate] = useState("8.5");
  const [tenure, setTenure] = useState("20");
  const [unit, setUnit] = useState<"years" | "months">("years");

  const principal = parseFloat(amount);
  const annualRate = parseFloat(rate);
  const tenureValue = parseFloat(tenure);

  const errors = {
    amount: amount !== "" && (isNaN(principal) || principal < 0) ? "Enter a valid loan amount." : "",
    rate: rate !== "" && (isNaN(annualRate) || annualRate < 0) ? "Enter a valid interest rate." : "",
    tenure: tenure !== "" && (isNaN(tenureValue) || tenureValue <= 0) ? "Enter a valid tenure." : "",
  };

  const hasErrors = Object.values(errors).some(Boolean);
  const isReady =
    amount !== "" && rate !== "" && tenure !== "" && !hasErrors && principal > 0 && tenureValue > 0;

  const tenureMonths = unit === "years" ? tenureValue * 12 : tenureValue;
  const result = useMemo(
    () => (isReady ? calculateEMI(principal, annualRate, tenureMonths) : null),
    [isReady, principal, annualRate, tenureMonths]
  );

  const chartData = result
    ? [
        { name: "Principal", value: result.principal, color: COLORS.principal },
        { name: "Interest", value: result.totalInterest, color: COLORS.interest },
      ]
    : [];

  function handleReset() {
    setAmount("2500000");
    setRate("8.5");
    setTenure("20");
    setUnit("years");
  }

  function getShareText() {
    if (!result) return "EMI Calculator — India Calculator";
    return `EMI Calculator (India Calculator)
Loan amount: ${formatINR(principal)}
Interest rate: ${annualRate}% / year
Tenure: ${tenureValue} ${unit}

Monthly EMI: ${formatINR(result.emi)}
Total interest: ${formatINR(result.totalInterest)}
Total payment: ${formatINR(result.totalPayment)}`;
  }

  return (
    <CalcCard
      id="emi-calculator"
      eyebrow="EMI Calculator"
      title="What will your monthly EMI be?"
      description="Enter your loan details to see the exact monthly installment, split between principal and interest."
      accent="from-purple to-[#8B6BFF]"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <Field id="emi-amount" label="Loan amount" prefix="₹" value={amount} onChange={setAmount} error={errors.amount} />
          <Field id="emi-rate" label="Interest rate (per year)" suffix="%" value={rate} onChange={setRate} step="0.01" error={errors.rate} />
          <div className="grid grid-cols-[1fr_auto] gap-3">
            <Field id="emi-tenure" label="Loan tenure" value={tenure} onChange={setTenure} error={errors.tenure} />
            <div>
              <span className="mb-1.5 block text-sm font-medium text-navy/80">Unit</span>
              <div className="flex overflow-hidden rounded-xl border border-navy/15">
                {(["years", "months"] as const).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUnit(u)}
                    className={`focus-ring px-3.5 py-2.5 text-sm font-medium capitalize transition ${
                      unit === u ? "bg-purple text-white" : "bg-white text-navy/60 hover:bg-navy/5"
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <CalculatorActions getShareText={getShareText} onReset={handleReset} />
        </div>

        <div className="rounded-2xl bg-offwhite p-6">
          {result && isReady ? (
            <>
              <div className="text-sm font-medium text-navy/60">Monthly EMI</div>
              <div className="font-display text-4xl font-extrabold text-navy">
                {formatINR(result.emi, 2)}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <Stat label="Principal amount" value={formatINR(result.principal)} />
                <Stat label="Total interest" value={formatINR(result.totalInterest)} />
                <Stat label="Total payable" value={formatINR(result.totalPayment)} className="col-span-2" emphasis />
              </div>

              <div className="mt-4 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={3}>
                      {chartData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => formatINR(v)} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-2 flex justify-center gap-5 text-xs text-navy/60">
                  <Legend color={COLORS.principal} label="Principal" />
                  <Legend color={COLORS.interest} label="Interest" />
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-navy/50">Enter valid loan details to see your EMI breakdown.</p>
          )}
        </div>
      </div>
    </CalcCard>
  );
}

export function Stat({
  label,
  value,
  className = "",
  emphasis = false,
}: {
  label: string;
  value: string;
  className?: string;
  emphasis?: boolean;
}) {
  return (
    <div className={`rounded-xl bg-white p-3.5 ${className}`}>
      <div className="text-xs text-navy/50">{label}</div>
      <div className={`mt-0.5 font-semibold text-navy ${emphasis ? "text-lg" : ""}`}>{value}</div>
    </div>
  );
}

export function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

export function CalcCard({
  id,
  eyebrow,
  title,
  description,
  accent,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${accent}`} />
        <p className="mt-4 text-sm font-semibold text-navy/50">{eyebrow}</p>
        <h2 className="mt-1 font-display text-3xl font-extrabold text-navy sm:text-4xl">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-navy/60">{description}</p>

        <div className="mt-10 rounded-3xl border border-navy/5 bg-white p-6 shadow-card sm:p-8">
          {children}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import { calculateEMI, buildAmortizationSchedule, formatINR } from "@/lib/calculations";
import Field from "./Field";
import CalculatorActions from "./CalculatorActions";
import { CalcCard, Stat } from "./EmiCalculator";

export default function LoanCalculator() {
  const [amount, setAmount] = useState("500000");
  const [rate, setRate] = useState("11");
  const [tenureMonths, setTenureMonths] = useState("36");
  const [showSchedule, setShowSchedule] = useState(false);

  const principal = parseFloat(amount);
  const annualRate = parseFloat(rate);
  const months = parseFloat(tenureMonths);

  const errors = {
    amount: amount !== "" && (isNaN(principal) || principal <= 0) ? "Enter a valid loan amount." : "",
    tenure: tenureMonths !== "" && (isNaN(months) || months <= 0) ? "Enter a valid tenure in months." : "",
  };
  const isReady =
    amount !== "" && rate !== "" && tenureMonths !== "" && !errors.amount && !errors.tenure && principal > 0 && months > 0;

  const result = useMemo(
    () => (isReady ? calculateEMI(principal, annualRate, months) : null),
    [isReady, principal, annualRate, months]
  );

  const schedule = useMemo(
    () => (isReady ? buildAmortizationSchedule(principal, annualRate, months) : []),
    [isReady, principal, annualRate, months]
  );

  function handleReset() {
    setAmount("500000");
    setRate("11");
    setTenureMonths("36");
    setShowSchedule(false);
  }

  function getShareText() {
    if (!result) return "Loan Calculator — India Calculator";
    return `Loan Calculator (India Calculator)
Loan amount: ${formatINR(principal)}
Interest rate: ${annualRate}% / year
Tenure: ${months} months

Monthly EMI: ${formatINR(result.emi)}
Total interest: ${formatINR(result.totalInterest)}
Total repayment: ${formatINR(result.totalPayment)}`;
  }

  return (
    <CalcCard
      id="loan-calculator"
      eyebrow="Loan Calculator"
      title="Understand the full cost of a loan"
      description="Get your EMI, total interest and a month-by-month repayment schedule."
      accent="from-purple to-pink"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <Field id="loan-amount" label="Loan amount" prefix="₹" value={amount} onChange={setAmount} error={errors.amount} />
          <Field id="loan-rate" label="Interest rate (per year)" suffix="%" value={rate} onChange={setRate} step="0.01" />
          <Field id="loan-tenure" label="Tenure" suffix="months" value={tenureMonths} onChange={setTenureMonths} error={errors.tenure} />
          <CalculatorActions getShareText={getShareText} onReset={handleReset} />
        </div>

        <div className="rounded-2xl bg-offwhite p-6">
          {result && isReady ? (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Stat label="Monthly EMI" value={formatINR(result.emi)} className="col-span-2" emphasis />
              <Stat label="Total interest" value={formatINR(result.totalInterest)} />
              <Stat label="Total repayment" value={formatINR(result.totalPayment)} />
            </div>
          ) : (
            <p className="text-sm text-navy/50">Enter valid loan details to see the repayment summary.</p>
          )}
        </div>
      </div>

      {isReady && schedule.length > 0 && (
        <div className="mt-8">
          <button
            type="button"
            onClick={() => setShowSchedule((v) => !v)}
            className="focus-ring inline-flex items-center gap-2 rounded-xl border border-navy/15 px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-navy/5"
          >
            {showSchedule ? "Hide" : "Show"} full amortization schedule
          </button>

          {showSchedule && (
            <div className="scroll-shadow mt-4 max-h-96 overflow-auto rounded-2xl border border-navy/10">
              <table className="w-full min-w-[560px] border-collapse text-sm">
                <thead className="sticky top-0 bg-navy text-white">
                  <tr>
                    <th className="px-4 py-2.5 text-left font-semibold">Month</th>
                    <th className="px-4 py-2.5 text-left font-semibold">EMI</th>
                    <th className="px-4 py-2.5 text-left font-semibold">Principal</th>
                    <th className="px-4 py-2.5 text-left font-semibold">Interest</th>
                    <th className="px-4 py-2.5 text-left font-semibold">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row) => (
                    <tr key={row.month} className="odd:bg-white even:bg-offwhite">
                      <td className="px-4 py-2 text-navy/70">{row.month}</td>
                      <td className="px-4 py-2 text-navy">{formatINR(row.emi)}</td>
                      <td className="px-4 py-2 text-navy">{formatINR(row.principalPaid)}</td>
                      <td className="px-4 py-2 text-navy">{formatINR(row.interestPaid)}</td>
                      <td className="px-4 py-2 text-navy">{formatINR(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </CalcCard>
  );
}

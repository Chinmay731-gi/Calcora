"use client";

import { useMemo, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { calculateSIP, formatINR } from "@/lib/calculations";
import Field from "./Field";
import CalculatorActions from "./CalculatorActions";
import { CalcCard, Stat } from "./EmiCalculator";

export default function SipCalculator() {
  const [monthly, setMonthly] = useState("10000");
  const [returnRate, setReturnRate] = useState("12");
  const [years, setYears] = useState("15");

  const monthlyValue = parseFloat(monthly);
  const rateValue = parseFloat(returnRate);
  const yearsValue = parseFloat(years);

  const errors = {
    monthly: monthly !== "" && (isNaN(monthlyValue) || monthlyValue < 0) ? "Enter a valid amount." : "",
    years: years !== "" && (isNaN(yearsValue) || yearsValue <= 0) ? "Enter a valid duration." : "",
  };
  const isReady =
    monthly !== "" && returnRate !== "" && years !== "" && !errors.monthly && !errors.years && monthlyValue > 0 && yearsValue > 0;

  const result = useMemo(
    () => (isReady ? calculateSIP(monthlyValue, rateValue, yearsValue) : null),
    [isReady, monthlyValue, rateValue, yearsValue]
  );

  const chartData = useMemo(() => {
    if (!isReady) return [];
    const points = [];
    const stepYears = Math.max(1, Math.round(yearsValue / 10));
    for (let y = stepYears; y <= yearsValue; y += stepYears) {
      const r = calculateSIP(monthlyValue, rateValue, y);
      points.push({ year: `Y${y}`, value: Math.round(r.futureValue) });
    }
    if (points.length === 0 || points[points.length - 1].year !== `Y${yearsValue}`) {
      const r = calculateSIP(monthlyValue, rateValue, yearsValue);
      points.push({ year: `Y${yearsValue}`, value: Math.round(r.futureValue) });
    }
    return points;
  }, [isReady, monthlyValue, rateValue, yearsValue]);

  function handleReset() {
    setMonthly("10000");
    setReturnRate("12");
    setYears("15");
  }

  function getShareText() {
    if (!result) return "SIP Calculator — India Calculator";
    return `SIP Calculator (India Calculator)
Monthly investment: ${formatINR(monthlyValue)}
Expected annual return: ${rateValue}%
Duration: ${yearsValue} years

Total invested: ${formatINR(result.totalInvested)}
Estimated returns: ${formatINR(result.estimatedReturns)}
Future value: ${formatINR(result.futureValue)}`;
  }

  return (
    <CalcCard
      id="sip-calculator"
      eyebrow="SIP Calculator"
      title="Project your SIP's future value"
      description="See how a monthly investment could grow over time at a given expected rate of return."
      accent="from-cyan to-purple"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <Field id="sip-monthly" label="Monthly investment" prefix="₹" value={monthly} onChange={setMonthly} error={errors.monthly} />
          <Field id="sip-rate" label="Expected annual return" suffix="%" value={returnRate} onChange={setReturnRate} step="0.1" />
          <Field id="sip-years" label="Investment duration" suffix="years" value={years} onChange={setYears} error={errors.years} />
          <CalculatorActions getShareText={getShareText} onReset={handleReset} accentClass="text-cyan" />
        </div>

        <div className="rounded-2xl bg-offwhite p-6">
          {result ? (
            <>
              <div className="text-sm font-medium text-navy/60">Future value</div>
              <div className="font-display text-3xl font-extrabold text-navy">
                {formatINR(result.futureValue)}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <Stat label="Total invested" value={formatINR(result.totalInvested)} />
                <Stat label="Estimated returns" value={formatINR(result.estimatedReturns)} />
              </div>

              <div className="mt-5 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="sipGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#101828aa" }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip formatter={(v: number) => formatINR(v)} />
                    <Area type="monotone" dataKey="value" stroke="#06B6D4" strokeWidth={2} fill="url(#sipGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <p className="mt-4 text-xs text-navy/45">
                Returns shown are estimates and are not guaranteed.
              </p>
            </>
          ) : (
            <p className="text-sm text-navy/50">Enter valid SIP details to project the future value.</p>
          )}
        </div>
      </div>
    </CalcCard>
  );
}

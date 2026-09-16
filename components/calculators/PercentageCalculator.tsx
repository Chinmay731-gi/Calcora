"use client";

import { useMemo, useState } from "react";
import {
  percentOf,
  whatPercentage,
  percentageIncrease,
  percentageDecrease,
  percentageDifference,
  formatIndianNumber,
} from "@/lib/calculations";
import Field from "./Field";
import { CalcCard } from "./EmiCalculator";

type Mode = "of" | "isWhatPercent" | "increase" | "decrease" | "difference";

const MODES: { id: Mode; label: string }[] = [
  { id: "of", label: "What is X% of Y?" },
  { id: "isWhatPercent", label: "X is what % of Y?" },
  { id: "increase", label: "Percentage increase" },
  { id: "decrease", label: "Percentage decrease" },
  { id: "difference", label: "Percentage difference" },
];

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>("of");
  const [x, setX] = useState("20");
  const [y, setY] = useState("500");

  const xValue = parseFloat(x);
  const yValue = parseFloat(y);
  const valid = x !== "" && y !== "" && !isNaN(xValue) && !isNaN(yValue);

  const { result, sentence } = useMemo(() => {
    if (!valid) return { result: null as number | null, sentence: "" };
    switch (mode) {
      case "of":
        return {
          result: percentOf(xValue, yValue),
          sentence: `${x}% of ${y} is`,
        };
      case "isWhatPercent":
        return {
          result: whatPercentage(xValue, yValue),
          sentence: `${x} is this % of ${y}:`,
        };
      case "increase":
        return {
          result: percentageIncrease(xValue, yValue),
          sentence: `Increase from ${x} to ${y} is`,
        };
      case "decrease":
        return {
          result: percentageDecrease(xValue, yValue),
          sentence: `Decrease from ${x} to ${y} is`,
        };
      case "difference":
        return {
          result: percentageDifference(xValue, yValue),
          sentence: `Difference between ${x} and ${y} is`,
        };
    }
  }, [mode, valid, xValue, yValue, x, y]);

  const labels = LABELS[mode];

  return (
    <CalcCard
      id="percentage-calculator"
      eyebrow="Percentage Calculator"
      title="Five percentage tools in one place"
      description="Switch between modes to solve the percentage question you actually have."
      accent="from-yellow to-orange"
    >
      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={`focus-ring rounded-full border px-4 py-2 text-sm font-medium transition ${
              mode === m.id
                ? "border-transparent bg-navy text-white"
                : "border-navy/15 text-navy/60 hover:bg-navy/5"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-4">
          <Field id="pct-x" label={labels.x} value={x} onChange={setX} />
          <Field id="pct-y" label={labels.y} value={y} onChange={setY} />
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-offwhite p-6">
          {result !== null && isFinite(result) ? (
            <>
              <div className="text-sm text-navy/60">{sentence}</div>
              <div className="mt-1 font-display text-4xl font-extrabold text-navy">
                {mode === "of" ? formatIndianNumber(result, 2) : `${formatIndianNumber(result, 2)}%`}
              </div>
            </>
          ) : (
            <p className="text-sm text-navy/50">Enter both values to see the result.</p>
          )}
        </div>
      </div>
    </CalcCard>
  );
}

const LABELS: Record<Mode, { x: string; y: string }> = {
  of: { x: "X (percentage)", y: "Y (value)" },
  isWhatPercent: { x: "X (value)", y: "Y (total)" },
  increase: { x: "From value", y: "To value" },
  decrease: { x: "From value", y: "To value" },
  difference: { x: "Value A", y: "Value B" },
};

"use client";

import { useMemo, useState } from "react";
import { addGST, removeGST, formatINR } from "@/lib/calculations";
import Field from "./Field";
import CalculatorActions from "./CalculatorActions";
import { CalcCard, Stat } from "./EmiCalculator";

const PRESETS = [5, 12, 18, 28];

export default function GstCalculator() {
  const [amount, setAmount] = useState("10000");
  const [gstPercent, setGstPercent] = useState("18");
  const [mode, setMode] = useState<"add" | "remove">("add");

  const amountValue = parseFloat(amount);
  const gstValue = parseFloat(gstPercent);

  const error =
    amount !== "" && (isNaN(amountValue) || amountValue < 0) ? "Enter a valid amount." : "";
  const isReady = amount !== "" && gstPercent !== "" && !error && amountValue >= 0 && gstValue >= 0;

  const result = useMemo(() => {
    if (!isReady) return null;
    return mode === "add" ? addGST(amountValue, gstValue) : removeGST(amountValue, gstValue);
  }, [isReady, mode, amountValue, gstValue]);

  function handleReset() {
    setAmount("10000");
    setGstPercent("18");
    setMode("add");
  }

  function getShareText() {
    if (!result) return "GST Calculator — India Calculator";
    return `GST Calculator (India Calculator)
Mode: ${mode === "add" ? "Add GST" : "Remove GST"}
Amount entered: ${formatINR(amountValue)}
GST rate: ${gstValue}%

Base amount: ${formatINR(result.baseAmount)}
GST amount: ${formatINR(result.gstAmount)}
Final amount: ${formatINR(result.finalAmount)}`;
  }

  return (
    <CalcCard
      id="gst-calculator"
      eyebrow="GST Calculator"
      title="Add or remove GST in one step"
      description="Switch modes depending on whether your amount excludes or already includes GST."
      accent="from-orange to-yellow"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="flex overflow-hidden rounded-xl border border-navy/15">
            {(["add", "remove"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`focus-ring flex-1 px-3.5 py-2.5 text-sm font-semibold transition ${
                  mode === m ? "bg-orange text-white" : "bg-white text-navy/60 hover:bg-navy/5"
                }`}
              >
                {m === "add" ? "Add GST" : "Remove GST"}
              </button>
            ))}
          </div>

          <Field
            id="gst-amount"
            label={mode === "add" ? "Base amount" : "GST-inclusive amount"}
            prefix="₹"
            value={amount}
            onChange={setAmount}
            error={error}
          />

          <div>
            <span className="mb-1.5 block text-sm font-medium text-navy/80">GST rate</span>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setGstPercent(String(p))}
                  className={`focus-ring rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                    gstPercent === String(p)
                      ? "border-orange bg-orange/10 text-orange"
                      : "border-navy/15 text-navy/60 hover:bg-navy/5"
                  }`}
                >
                  {p}%
                </button>
              ))}
            </div>
            <div className="mt-2">
              <Field id="gst-rate" label="Custom rate" suffix="%" value={gstPercent} onChange={setGstPercent} step="0.1" />
            </div>
          </div>

          <CalculatorActions getShareText={getShareText} onReset={handleReset} accentClass="text-orange" />
        </div>

        <div className="rounded-2xl bg-offwhite p-6">
          {result ? (
            <>
              <span className="inline-flex rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
                {mode === "add" ? "GST added" : "GST removed"}
              </span>
              <div className="mt-4 grid gap-4">
                <Stat
                  label={mode === "add" ? "Base amount" : "Net amount (excl. GST)"}
                  value={formatINR(result.baseAmount)}
                />
                <Stat label={mode === "add" ? "GST amount" : "GST component"} value={formatINR(result.gstAmount)} />
                <Stat
                  label={mode === "add" ? "Final amount" : "Original inclusive amount"}
                  value={formatINR(result.finalAmount)}
                  emphasis
                />
              </div>
            </>
          ) : (
            <p className="text-sm text-navy/50">Enter a valid amount to see the GST breakdown.</p>
          )}
        </div>
      </div>
    </CalcCard>
  );
}

"use client";

import { useMemo, useState } from "react";
import { calculateSalary, formatINR } from "@/lib/calculations";
import Field from "./Field";
import CalculatorActions from "./CalculatorActions";
import { CalcCard, Stat } from "./EmiCalculator";

const initial = {
  annualCTC: "1200000",
  basicSalary: "480000",
  hra: "240000",
  specialAllowance: "300000",
  otherAllowances: "60000",
  employeePF: "3600",
  professionalTax: "200",
  otherDeductions: "0",
};

type Fields = typeof initial;

export default function SalaryCalculator() {
  const [values, setValues] = useState<Fields>(initial);

  function update(key: keyof Fields, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  const numericKey = Object.values(values).join("|");

  const result = useMemo(() => {
    const numeric = Object.fromEntries(
      Object.entries(values).map(([k, v]) => [k, v === "" ? NaN : parseFloat(v)])
    ) as unknown as Record<keyof Fields, number>;

    const allValid = Object.values(numeric).every((n) => !isNaN(n) && n >= 0);
    if (!allValid) return null;
    return calculateSalary(numeric);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numericKey]);

  function handleReset() {
    setValues(initial);
  }

  function getShareText() {
    if (!result) return "Salary Calculator — India Calculator";
    return `Salary Calculator (India Calculator)
Monthly gross: ${formatINR(result.monthlyGross)}
Monthly deductions: ${formatINR(result.monthlyDeductions)}
Estimated monthly take-home: ${formatINR(result.monthlyTakeHome)}

Annual gross: ${formatINR(result.annualGross)}
Annual deductions: ${formatINR(result.annualDeductions)}
Estimated annual take-home: ${formatINR(result.annualTakeHome)}`;
  }

  return (
    <CalcCard
      id="salary-calculator"
      eyebrow="Salary Calculator"
      title="See your estimated take-home pay"
      description="Break your CTC into allowances and deductions to estimate what actually lands in your account."
      accent="from-green to-cyan"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="ctc" label="Annual CTC" prefix="₹" value={values.annualCTC} onChange={(v) => update("annualCTC", v)} />
          <Field id="basic" label="Basic salary (annual)" prefix="₹" value={values.basicSalary} onChange={(v) => update("basicSalary", v)} />
          <Field id="hra" label="HRA (annual)" prefix="₹" value={values.hra} onChange={(v) => update("hra", v)} />
          <Field id="special" label="Special allowance (annual)" prefix="₹" value={values.specialAllowance} onChange={(v) => update("specialAllowance", v)} />
          <Field id="other-allow" label="Other allowances (annual)" prefix="₹" value={values.otherAllowances} onChange={(v) => update("otherAllowances", v)} />
          <Field id="pf" label="Employee PF (monthly)" prefix="₹" value={values.employeePF} onChange={(v) => update("employeePF", v)} />
          <Field id="pt" label="Professional tax (monthly)" prefix="₹" value={values.professionalTax} onChange={(v) => update("professionalTax", v)} />
          <Field id="other-ded" label="Other deductions (monthly)" prefix="₹" value={values.otherDeductions} onChange={(v) => update("otherDeductions", v)} />

          <div className="sm:col-span-2">
            <CalculatorActions getShareText={getShareText} onReset={handleReset} accentClass="text-green" />
          </div>
        </div>

        <div className="rounded-2xl bg-offwhite p-6">
          {result ? (
            <>
              <div className="text-sm font-medium text-navy/60">Estimated monthly take-home</div>
              <div className="font-display text-3xl font-extrabold text-navy">
                {formatINR(result.monthlyTakeHome)}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <Stat label="Monthly gross" value={formatINR(result.monthlyGross)} />
                <Stat label="Monthly deductions" value={formatINR(result.monthlyDeductions)} />
                <Stat label="Annual gross" value={formatINR(result.annualGross)} />
                <Stat label="Annual deductions" value={formatINR(result.annualDeductions)} />
                <Stat label="Annual take-home" value={formatINR(result.annualTakeHome)} className="col-span-2" emphasis />
              </div>
            </>
          ) : (
            <p className="text-sm text-navy/50">Enter valid, non-negative values in every field.</p>
          )}

          <p className="mt-6 text-xs leading-relaxed text-navy/45">
            These figures are estimates only. Your actual take-home salary
            depends on your employer&rsquo;s specific salary structure, the tax
            regime you choose, applicable exemptions and statutory rules. This
            is not tax advice — please check with your employer or a tax
            professional for exact figures.
          </p>
        </div>
      </div>
    </CalcCard>
  );
}

"use client";

import { useMemo, useState } from "react";
import { calculateAge } from "@/lib/calculations";
import CalculatorActions from "./CalculatorActions";
import { CalcCard, Stat } from "./EmiCalculator";

export default function AgeCalculator() {
  const [dob, setDob] = useState("1998-05-14");
  const todayStr = new Date().toISOString().split("T")[0];

  const error = useMemo(() => {
    if (!dob) return "";
    const d = new Date(dob);
    if (isNaN(d.getTime())) return "Enter a valid date.";
    if (d > new Date()) return "Date of birth cannot be in the future.";
    return "";
  }, [dob]);

  const result = useMemo(() => {
    if (!dob || error) return null;
    return calculateAge(new Date(dob));
  }, [dob, error]);

  function handleReset() {
    setDob("1998-05-14");
  }

  function getShareText() {
    if (!result) return "Age Calculator — India Calculator";
    return `Age Calculator (India Calculator)
Date of birth: ${dob}
You are ${result.years} years, ${result.months} months and ${result.days} days old.
Total months: ${result.totalMonths}
Total days: ${result.totalDays}
Days until next birthday: ${result.daysUntilNextBirthday}`;
  }

  return (
    <CalcCard
      id="age-calculator"
      eyebrow="Age Calculator"
      title="Find your exact age, down to the day"
      description="Pick a date of birth to see a precise breakdown, including your next birthday countdown."
      accent="from-pink to-orange"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <label htmlFor="dob" className="mb-1.5 block text-sm font-medium text-navy/80">
              Date of birth
            </label>
            <input
              id="dob"
              type="date"
              value={dob}
              max={todayStr}
              onChange={(e) => setDob(e.target.value)}
              aria-invalid={!!error}
              aria-describedby={error ? "dob-error" : undefined}
              className={`focus-ring w-full rounded-xl border bg-white px-3.5 py-2.5 text-navy ${
                error ? "border-pink" : "border-navy/15"
              }`}
            />
            {error && (
              <p id="dob-error" className="mt-1.5 text-xs font-medium text-pink">
                {error}
              </p>
            )}
          </div>
          <CalculatorActions getShareText={getShareText} onReset={handleReset} accentClass="text-pink" />
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-pink/10 to-orange/10 p-6">
          {result ? (
            <>
              <p className="font-display text-xl font-bold text-navy">
                You are {result.years} years, {result.months} months and{" "}
                {result.days} days old.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <Stat label="Total months" value={result.totalMonths.toLocaleString("en-IN")} />
                <Stat label="Total days" value={result.totalDays.toLocaleString("en-IN")} />
                <Stat
                  label="Next birthday"
                  value={result.nextBirthday.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  className="col-span-2"
                />
                <Stat
                  label="Days until next birthday"
                  value={String(result.daysUntilNextBirthday)}
                  className="col-span-2"
                  emphasis
                />
              </div>
            </>
          ) : (
            <p className="text-sm text-navy/50">Choose a valid date of birth to see your age.</p>
          )}
        </div>
      </div>
    </CalcCard>
  );
}

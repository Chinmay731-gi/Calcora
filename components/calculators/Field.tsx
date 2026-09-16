"use client";

export default function Field({
  id,
  label,
  value,
  onChange,
  suffix,
  prefix,
  min = 0,
  max,
  step = "any",
  error,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
  prefix?: string;
  min?: number;
  max?: number;
  step?: string | number;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy/80">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/50">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`focus-ring w-full rounded-xl border bg-white py-2.5 text-navy transition ${
            prefix ? "pl-9" : "pl-3.5"
          } ${suffix ? "pr-12" : "pr-3.5"} ${
            error ? "border-pink" : "border-navy/15"
          }`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-navy/50">
            {suffix}
          </span>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-pink">
          {error}
        </p>
      )}
    </div>
  );
}

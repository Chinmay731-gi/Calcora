export default function AdPlaceholder({ label, dark = false }: { label?: string; dark?: boolean }) {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div
        className={`flex min-h-[100px] w-full items-center justify-center rounded-2xl border border-dashed text-xs font-medium tracking-normal sm:min-h-[120px] ${
          dark
            ? "border-white/15 bg-white/[0.04] text-white/40"
            : "border-navy/15 bg-navy/[0.03] text-navy/40"
        }`}
        role="complementary"
        aria-label="Advertisement placeholder"
      >
        Advertisement{label ? ` — ${label}` : ""}
      </div>
    </div>
  );
}

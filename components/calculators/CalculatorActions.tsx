"use client";

import { useState } from "react";
import { Copy, Check, Share2, RotateCcw, Printer } from "lucide-react";

export default function CalculatorActions({
  getShareText,
  onReset,
  accentClass = "text-purple",
}: {
  getShareText: () => string;
  onReset: () => void;
  accentClass?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(getShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable; silently ignore.
    }
  }

  async function handleShare() {
    const text = getShareText();
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ text, title: "India Calculator result" });
        return;
      } catch {
        // User cancelled or share failed; fall through to copy fallback.
      }
    }
    handleCopy();
  }

  return (
    <div className="no-print flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleCopy}
        className="focus-ring inline-flex items-center gap-1.5 rounded-xl border border-navy/10 bg-white px-3.5 py-2 text-sm font-medium text-navy transition hover:bg-navy/5"
      >
        {copied ? <Check size={16} className={accentClass} /> : <Copy size={16} />}
        {copied ? "Copied" : "Copy result"}
      </button>
      <button
        type="button"
        onClick={handleShare}
        className="focus-ring inline-flex items-center gap-1.5 rounded-xl border border-navy/10 bg-white px-3.5 py-2 text-sm font-medium text-navy transition hover:bg-navy/5"
      >
        <Share2 size={16} />
        Share
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        className="focus-ring inline-flex items-center gap-1.5 rounded-xl border border-navy/10 bg-white px-3.5 py-2 text-sm font-medium text-navy transition hover:bg-navy/5"
      >
        <Printer size={16} />
        Print
      </button>
      <button
        type="button"
        onClick={onReset}
        className="focus-ring ml-auto inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium text-navy/60 transition hover:bg-navy/5"
      >
        <RotateCcw size={16} />
        Reset
      </button>
    </div>
  );
}

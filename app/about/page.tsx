import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `About – ${SITE_NAME}`,
  description: `Why we built ${SITE_NAME} — free, fast, mobile-friendly calculators for everyday Indian finances.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <LegalPage title={`About ${SITE_NAME}`}>
      <p>
        {SITE_NAME} is a free set of calculators built for everyday Indian
        finances — EMI, GST, salary (in-hand/CTC), SIP returns, age, quick
        percentage math, and general loan repayment — all on a single, fast
        page.
      </p>

      <h2>Why we built this</h2>
      <p>
        Most calculator sites are cluttered, slow, or hide the answer behind
        pop-ups. We wanted something that loads instantly, works well on a
        phone on a slow connection, and shows a clear, step-by-step result
        without asking for sign-up or personal information.
      </p>

      <h2>How the calculators work</h2>
      <p>
        Every calculation runs entirely in your browser using standard,
        publicly documented formulas (for example, the reducing-balance EMI
        formula, or SEBI-standard SIP compounding). Nothing you type — loan
        amount, salary, birth date — is sent to a server or stored anywhere;
        it disappears the moment you close or refresh the tab.
      </p>

      <h2>Who&apos;s behind it</h2>
      <p>
        {SITE_NAME} is an independent, self-funded project, not affiliated
        with any bank, tax authority, or financial institution. See our{" "}
        <a href="/disclaimer">Disclaimer</a> for how to use the results
        responsibly.
      </p>
    </LegalPage>
  );
}

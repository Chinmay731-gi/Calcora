import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: `Disclaimer – ${SITE_NAME}`,
  description: `${SITE_NAME}'s calculators are for informational purposes only and are not a substitute for professional financial advice.`,
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="17 September 2026">
      <p>
        The EMI, GST, Salary, SIP, Age, Percentage and Loan calculators on
        {" "}{SITE_NAME} are provided for general informational and
        educational purposes only. They are not a substitute for advice from
        a qualified financial advisor, chartered accountant, or tax
        professional.
      </p>

      <h2>Accuracy of results</h2>
      <p>
        While we take reasonable care to keep the calculation methods
        accurate and up to date, results are estimates based on the inputs
        you provide and standard formulas. Actual figures from your bank,
        employer, or the tax authorities (for EMI, salary, or GST amounts,
        for example) may differ due to rounding, fees, changing interest
        rates, or regulatory updates not reflected here.
      </p>

      <h2>No financial advice</h2>
      <p>
        Nothing on this site should be interpreted as investment, tax, or
        legal advice, or as a recommendation to buy, sell, or hold any
        financial product. Always verify important calculations with your
        bank, employer, or a licensed professional before making financial
        decisions.
      </p>

      <h2>Third-party content</h2>
      <p>
        Any external links or ads on this site are provided for convenience.
        We do not endorse and are not responsible for the accuracy of
        third-party content.
      </p>

      <h2>Contact us</h2>
      <p>
        If you notice an error in a calculator, let us know at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}

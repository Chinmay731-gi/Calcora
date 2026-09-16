import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: `Terms & Conditions – ${SITE_NAME}`,
  description: `The terms that govern your use of ${SITE_NAME}'s free calculators and content.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="17 September 2026">
      <p>
        By using {SITE_NAME} (&quot;the site&quot;), you agree to the following terms.
        If you do not agree, please do not use the site.
      </p>

      <h2>Use of the site</h2>
      <p>
        {SITE_NAME} provides free calculators and related educational content
        for personal, non-commercial use. You may not reproduce, resell, or
        redistribute the calculators or their underlying code without
        permission, and you may not use the site in any way that could
        damage, disable, or impair it.
      </p>

      <h2>No professional advice</h2>
      <p>
        The calculators and content on this site are provided for general
        informational purposes only and do not constitute financial, tax, or
        legal advice. See our{" "}
        <a href="/disclaimer">Disclaimer</a> for details.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The site design, branding, and original written content are owned by
        {" "}{SITE_NAME} unless otherwise noted. Calculation formulas are based
        on publicly available, standard financial and mathematical methods.
      </p>

      <h2>Third-party links and ads</h2>
      <p>
        This site may display ads served by Google AdSense and may link to
        third-party websites. We are not responsible for the content,
        accuracy, or practices of third-party sites.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        The site is provided &quot;as is&quot; without warranties of any kind. To the
        fullest extent permitted by law, {SITE_NAME} is not liable for any
        loss or damage arising from your use of the calculators or reliance
        on their results.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may revise these terms from time to time. Continued use of the
        site after changes are posted means you accept the updated terms.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about these terms? Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}

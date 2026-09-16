import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: `Privacy Policy – ${SITE_NAME}`,
  description: `How ${SITE_NAME} collects, uses and protects your data, including information about cookies and third-party advertising.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="17 September 2026">
      <p>
        This Privacy Policy explains how {SITE_NAME} (&quot;we&quot;, &quot;us&quot;) handles
        information when you use this website. {SITE_NAME} is a set of free,
        client-side calculators — the numbers you type into a calculator
        (loan amount, salary, age, etc.) are processed entirely in your
        browser and are never sent to, or stored on, our servers.
      </p>

      <h2>Information we collect automatically</h2>
      <p>
        Like most websites, we and our third-party partners automatically
        collect some technical information when you visit, such as your
        approximate location (city/country), device and browser type, pages
        viewed, and referring URL. This is collected through cookies and
        similar technologies described below.
      </p>

      <h2>Cookies and advertising</h2>
      <p>
        We use Google AdSense to show ads on this site. Google and its
        partners may use cookies (including the DoubleClick cookie) to serve
        ads based on your prior visits to this site or other websites. You
        can opt out of personalized advertising by visiting{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google Ads Settings
        </a>
        , or generally at{" "}
        <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer">
          www.aboutads.info/choices
        </a>
        . Third-party vendors, including Google, use cookies to serve ads
        based on someone&apos;s prior visits to this and other websites.
      </p>

      <h2>Analytics</h2>
      <p>
        We may use analytics tools (such as Google Analytics) to understand
        how visitors use the site in aggregate. This data is anonymized and
        used only to improve the calculators and content.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        This site is not directed at children under 13, and we do not
        knowingly collect personal information from children.
      </p>

      <h2>Your choices</h2>
      <p>
        You can disable cookies in your browser settings at any time. Doing
        so may affect how ads and some site features behave, but the
        calculators themselves will continue to work.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be
        posted on this page with an updated revision date.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about this policy? Email us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}

import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contact – ${SITE_NAME}`,
  description: `Get in touch with the ${SITE_NAME} team — report a bug, suggest a calculator, or ask a question.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <LegalPage title="Contact Us">
      <p>
        Found a bug in a calculator, have a suggestion for a new one, or just
        want to say hi? We&apos;d like to hear from you.
      </p>
      <p>
        Email us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we&apos;ll
        get back to you as soon as we can.
      </p>
      <p>
        For calculation errors, please mention which calculator you used and
        the inputs you entered — that makes it much faster for us to
        reproduce and fix.
      </p>
    </LegalPage>
  );
}

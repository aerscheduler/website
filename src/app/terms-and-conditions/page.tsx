import { readFileSync } from "fs";
import path from "path";
import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "AerScheduler terms and conditions for use of the website, web app, and native iOS application.",
  alternates: { canonical: "/terms-and-conditions" },
  robots: { index: true, follow: true },
};

const html = readFileSync(
  path.join(process.cwd(), "src/content/terms-and-conditions.html"),
  "utf8"
);

export default function TermsAndConditionsPage() {
  return (
    <LegalDocument
      title="Terms and Conditions"
      updated="September 29, 2023"
      html={html}
    />
  );
}

import { readFileSync } from "fs";
import path from "path";
import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the AerScheduler privacy policy. How we collect, use, and protect personal information for our flight school management software and apps.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const html = readFileSync(
  path.join(process.cwd(), "src/content/privacy.html"),
  "utf8"
);

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      updated="August 15, 2026"
      html={html}
    />
  );
}

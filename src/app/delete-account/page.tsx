import { readFileSync } from "fs";
import path from "path";
import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";

export const metadata: Metadata = {
  title: "Delete your account",
  description:
    "How to delete your AerScheduler account, in the app or by email, and what happens to your information afterwards.",
  alternates: { canonical: "/delete-account" },
  robots: { index: true, follow: true },
};

const html = readFileSync(
  path.join(process.cwd(), "src/content/delete-account.html"),
  "utf8"
);

export default function DeleteAccountPage() {
  return (
    <LegalDocument
      title="Delete your account"
      updated="August 19, 2026"
      html={html}
    />
  );
}

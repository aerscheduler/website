import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { MigrationBanner } from "@/components/migration-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import "./globals.css";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} · Flight School Management Software`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
  metadataBase: new URL("https://aerscheduler.com"),
  openGraph: {
    title: SITE_NAME,
    description: SITE_TAGLINE,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrument.variable} font-sans antialiased`}>
        <MigrationBanner />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

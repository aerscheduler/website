import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { ConsentBanner } from "@/components/consent-banner";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  organizationJsonLd,
  siteNavigationJsonLd,
  softwareApplicationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Flight School Management Software`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "flight school management software",
    "aircraft scheduling software",
    "flight school scheduling",
    "FBO software",
    "pilot training management",
    "aircraft dispatch",
    "flight school billing",
    "MyFBO alternative",
    "Flight Schedule Pro alternative",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Flight School Management Software`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - flight school management software`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Flight School Management Software`,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Reveals start hidden in the stylesheet, so the server HTML and the
            first client paint already agree: no class to add, nothing for
            React to flag as a hydration mismatch, and no flash of content that
            appears and then hides.

            The only case that needs rescuing is scripting being off, where the
            observer never runs and the page would stay blank. `<noscript>` is
            parsed only in exactly that case. */}
        <noscript>
          <style>{`
            [data-reveal], [data-reveal-group] > * {
              opacity: 1 !important;
              transform: none !important;
            }
            .animate-float { animation-play-state: running !important; }
          `}</style>
        </noscript>
      </head>
      {/*
        `suppressHydrationWarning` here is about browser extensions, not about
        our own markup.

        Extensions write their own attributes onto <body> before React hydrates:
        ColorZilla adds `cz-shortcut-listen`, Grammarly adds `data-gr-ext-*`, and
        several password managers do the same. React then compares the server
        HTML against a DOM that a third party has already edited and reports a
        mismatch nobody can fix, because the offending attribute is not in this
        repo at all.

        It is deliberately narrow: the flag covers only THIS element's own
        attributes and text, and not one level deeper. A genuine hydration bug
        anywhere inside the page still reports normally, which is the whole
        reason it is on <body> and not on a wrapper further in.
      */}
      <body
        className={`${instrument.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={softwareApplicationJsonLd()} />
        <JsonLd data={siteNavigationJsonLd()} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}

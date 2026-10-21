import type { Metadata } from "next";

import localFont from "next/font/local";

import { JsonLd } from "./components/seo/JsonLd";

import { ThemeProvider } from "./components/theme/theme-provider";

import { Navigation } from "./components/home";

import { CustomCursor } from "./components/cursor/CustomCursor";

import { PageLoader } from "./components/loading/PageLoader";

import "./globals.css";

const sfProDisplay = localFont({
  src: [
    {
      path: "./fonts/SFPRODISPLAYREGULAR.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SFPRODISPLAYMEDIUM.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/SFPRODISPLAYBOLD.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/SFPRODISPLAYTHINITALIC.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "./fonts/SFPRODISPLAYULTRALIGHTITALIC.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "./fonts/SFPRODISPLAYLIGHTITALIC.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/SFPRODISPLAYSEMIBOLDITALIC.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/SFPRODISPLAYHEAVYITALIC.woff2",
      weight: "800",
      style: "italic",
    },
    {
      path: "./fonts/SFPRODISPLAYBLACKITALIC.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-sf-pro-display",
  display: "swap",
});

const signatrue = localFont({
  src: "./fonts/Signatrue.woff2",
  variable: "--font-signatrue",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://ton-domaine.com");

const defaultSeoTitle = "Gonar.ui — UX/UI, Web & Brand Designer";
const defaultSeoDescription =
  "UX/UI, web and brand design focused on creating clear, meaningful and memorable digital experiences.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultSeoTitle,
    template: "%s | Gonar.ui",
  },
  description: defaultSeoDescription,
  keywords: [
    "Gonar.ui",
    "UX/UI Designer",
    "Web Designer",
    "Brand Designer",
    "Brand Identity",
    "Digital Product Design",
    "Portfolio Designer",
  ],
  authors: [{ name: "Gonar.ui" }],
  creator: "Gonar.ui",
  publisher: "Gonar.ui",
  applicationName: "Gonar.ui Portfolio",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Gonar.ui",
    title: defaultSeoTitle,
    description: defaultSeoDescription,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gonar.ui — UX/UI, Web & Brand Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSeoTitle,
    description: defaultSeoDescription,
    images: ["/images/og-image.jpg"],
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
  category: "design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sfProDisplay.variable} ${signatrue.variable}`}
      >
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": `${siteUrl}/#person`,
                name: "Gonar.ui",
                url: siteUrl,
                jobTitle: "UX/UI, Web & Brand Designer",
                description:
                  defaultSeoDescription,
              },
              {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                name: "Gonar.ui",
                url: siteUrl,
                description:
                  defaultSeoDescription,
                author: {
                  "@id": `${siteUrl}/#person`,
                },
              },
            ],
          }}
        />

        <ThemeProvider>
          <PageLoader />
          <Navigation />
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
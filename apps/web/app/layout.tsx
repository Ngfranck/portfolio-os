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

const siteUrl = "https://ton-domaine.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Gonar.ui — Web & Brand Designer",
    template: "%s — Gonar.ui",
  },

  description:
    "Portfolio de Gonar.ui, Web & Brand Designer spécialisé en UI/UX design, identité visuelle et expériences digitales.",

  keywords: [
    "Gonar.ui",
    "Franck Designer",
    "Web Designer",
    "Brand Designer",
    "UI Designer",
    "UX Designer",
    "UI/UX Designer",
    "Brand Identity",
    "Digital Product Design",
    "Portfolio Designer",
  ],

  authors: [
    {
      name: "Gonar.ui",
    },
  ],

  creator: "Gonar.ui",

  publisher: "Gonar.ui",

  applicationName: "Gonar.ui Portfolio",

  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
    },
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Gonar.ui",
    title: "Gonar.ui — Web & Brand Designer",
    description:
      "Portfolio de Gonar.ui, Web & Brand Designer spécialisé en UI/UX design, identité visuelle et expériences digitales.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gonar.ui — Web & Brand Designer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Gonar.ui — Web & Brand Designer",
    description:
      "Portfolio de Gonar.ui, Web & Brand Designer spécialisé en UI/UX design, identité visuelle et expériences digitales.",
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
    <html lang="fr" suppressHydrationWarning>
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
                jobTitle: "Web & Brand Designer",
                description:
                  "Web & Brand Designer spécialisé en UI/UX design, identité visuelle et expériences digitales.",
              },
              {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                name: "Gonar.ui",
                url: siteUrl,
                description:
                  "Portfolio de Gonar.ui, Web & Brand Designer spécialisé en UI/UX design, identité visuelle et expériences digitales.",
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
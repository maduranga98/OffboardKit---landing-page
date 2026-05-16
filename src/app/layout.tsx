import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = "https://offboardkit-landing-page.web.app";
const siteName = "HRExitFlow";
const siteDescription =
  "HRExitFlow turns every departure into a structured handoff. Capture what's in their head, revoke every access point, and stay connected — all before the last day.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HRExitFlow — Exit with intention.",
    template: "%s | HRExitFlow",
  },
  description: siteDescription,
  keywords: [
    "employee offboarding",
    "offboarding software",
    "knowledge transfer",
    "access revocation",
    "exit interview",
    "HR software",
    "employee departure",
    "offboarding checklist",
    "alumni network",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "HRExitFlow — Exit with intention.",
    description: siteDescription,
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "HRExitFlow logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HRExitFlow — Exit with intention.",
    description: siteDescription,
    images: ["/logo.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
  },
  category: "Business Software",
};

export const viewport: Viewport = {
  themeColor: "#0a1628",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free tier available — 3 exits included",
  },
  publisher: {
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.png`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${dmSans.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="bg-navy text-warm-white min-h-screen">{children}</body>
    </html>
  );
}

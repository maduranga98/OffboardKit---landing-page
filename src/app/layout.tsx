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
const siteName = "OffboardSet";
const siteDescription =
  "OffboardSet turns every departure into a structured handoff. Capture what's in their head, revoke every access point, and stay connected — all before the last day.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OffboardSet — Exit with intention.",
    template: "%s | OffboardSet",
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
    title: "OffboardSet — Exit with intention.",
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1424,
        height: 751,
        alt: "OffboardSet — Exit with intention.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OffboardSet — Exit with intention.",
    description: siteDescription,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512" },
    ],
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
      url: `${siteUrl}/logo.svg`,
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

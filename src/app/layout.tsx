import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  // Only the weights the UI uses: 400 body, 500 buttons/labels, 600 strong text.
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = "https://offboardset.com";
const siteName = "OffboardSet";
const siteDescription =
  "Employee offboarding software for HR teams: checklists, access revocation, knowledge transfer, and exit interviews. Flat pricing, no per-seat fees.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Employee Offboarding Software for HR Teams | OffboardSet",
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
  themeColor: "#F5F0E8",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${dmSans.variable} antialiased`}
    >
      <body suppressHydrationWarning className="bg-paper text-ink min-h-screen">{children}</body>
    </html>
  );
}

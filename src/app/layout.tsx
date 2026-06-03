import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider"; // Import this
import { SoundProvider } from "../components/sound-provider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://julianramirez.site";
const siteName = "Julian Gabriel Ramirez";
const siteDescription =
  "Portfolio of Julian Gabriel Ramirez, a Computer Science student and developer focused on data science, web apps, and research.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Portfolio`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Julian Gabriel Ramirez",
    "portfolio",
    "developer",
    "data science",
    "Next.js",
    "React",
    "TypeScript",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  applicationName: siteName,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: siteName,
      url: siteUrl,
      jobTitle: "Developer",
      sameAs: ["https://github.com/marstio"],
    },
    {
      "@type": "WebSite",
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      publisher: {
        "@type": "Organization",
        name: siteName,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap children in ThemeProvider */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SoundProvider>{children}</SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist_Mono, Manrope, Sora } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { absoluteUrl, getSiteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Visrax | Object Detection and Monitoring Systems",
    template: "%s"
  },
  description: siteConfig.description,
  applicationName: "Visrax",
  authors: [{ name: "Visrax" }],
  creator: "Visrax",
  publisher: "Visrax",
  alternates: { canonical: absoluteUrl("/") },
  icons: {
    icon: "/brand/icon.png",
    apple: "/brand/icon.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable} ${geistMono.variable}`}>
      <body>
        <SmoothScroll />
        <Header />
        <div id="main-content">{children}</div>
        <Footer />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Visrax",
            url: getSiteUrl(),
            logo: absoluteUrl("/brand/icon.png"),
            description: siteConfig.description
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Visrax",
            url: getSiteUrl(),
            description: siteConfig.description
          }}
        />
      </body>
    </html>
  );
}

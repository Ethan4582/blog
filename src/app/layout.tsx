import type { Metadata } from "next";
import { Inter, Libre_Baskerville, Roboto_Slab } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/src/components/LenisProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
  display: "swap",
});

import Navbar from "@/src/components/navbar/Navbar";

export const metadata: Metadata = {
  title: "T7Labs – Free Landing Page Templates & UI Components",
  description:
    "Explore free, modern landing page templates and beautifully crafted UI components by T7Labs. Build faster with high-quality design assets.",

  icons: {
    icon: "/assets/bluelogo.png",
    shortcut: "/assets/bluelogo.png",
    apple: "/assets/bluelogo.png",
  },

  openGraph: {
    title: "T7Labs – Free Landing Page Templates & UI Components",
    description:
      "Discover free landing page templates and modern UI components by T7Labs. Perfect for developers and designers.",
    images: ["/assets/bluelogo.png"],
    type: "website",
  },

  keywords: [
    "landing page templates",
    "free landing page templates",
    "UI components",
    "React components",
    "Next.js templates",
    "web design resources",
    "frontend components",
    "T7Labs",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${libreBaskerville.variable} ${robotoSlab.variable}`}>
      <body className="antialiased font-sans bg-background text-foreground relative min-h-screen">
        {/* Layered premium background integration */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--accent)_0%,transparent_50%)] opacity-[0.3] dark:opacity-0 pointer-events-none z-[-1]" />
        <div className="fixed inset-0 bg-[radial-gradient(var(--primary)_1px,transparent_1px)] opacity-[0.05] dark:opacity-[0.15] [background-size:32px_32px] pointer-events-none z-[-1]" />
        <LenisProvider>
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}

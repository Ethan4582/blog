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
  metadataBase: new URL("http://localhost:3000"),
  title: "Tae7labs Blog",
  description: "Explore beautifully crafted components and patterns by Tae7labs.",
  icons: {
    icon: "/assets/darklogo.png",
    shortcut: "/assets/darklogo.png",
    apple: "/assets/darklogo.png",
  },
  openGraph: {
    title: "Tae7labs ",
    description: "Explore beautifully crafted components and patterns by Tae7labs.",
    images: ["/assets/darklogo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${libreBaskerville.variable} ${robotoSlab.variable}`}>
      <body className="antialiased font-sans">
        <LenisProvider>
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}

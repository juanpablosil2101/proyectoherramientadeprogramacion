import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Obsidian Coffee — Premium Specialty Coffee",
  description:
    "Single-origin specialty coffee sourced from the world's finest growing regions. Roasted to order. Served with obsession.",
  openGraph: {
    title: "Obsidian Coffee",
    description: "Premium specialty coffee. Crafted with obsession.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      {/* suppressHydrationWarning prevents false errors from browser extensions
          that inject attributes into <body> (e.g. cz-shortcut-listen) */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

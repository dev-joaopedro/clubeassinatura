import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";

import { SubscriptionProvider } from "@/context/subscription-context";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://clube.marinscafes.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Clube Marins Cafés | Café especial todos os meses",
  description:
    "Descubra o Clube Marins Cafés e receba cafés especiais selecionados todos os meses na sua casa.",
  openGraph: {
    title: "Clube Marins Cafés | Café especial todos os meses",
    description:
      "Descubra o Clube Marins Cafés e receba cafés especiais selecionados todos os meses na sua casa.",
    url: siteUrl,
    siteName: "Clube Marins Cafés",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clube Marins Cafés | Café especial todos os meses",
    description:
      "Descubra o Clube Marins Cafés e receba cafés especiais selecionados todos os meses na sua casa.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans">
        <SubscriptionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SubscriptionProvider>
      </body>
    </html>
  );
}

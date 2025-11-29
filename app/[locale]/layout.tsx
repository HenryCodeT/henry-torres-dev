import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import LlamitaChatI18n from "../components/LlamitaChatI18n";
import AnimatedBackground from "../components/AnimatedBackground";
import CustomCursor from "../components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Henry Torres - Full Stack Developer | Peru",
  description: "Portfolio of Henry Torres, a full-stack developer with 4 years of experience crafting modern web applications. Specializing in React, Next.js, and cloud architecture.",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "Peru", "Web Development"],
  authors: [{ name: "Henry Torres" }],
  openGraph: {
    title: "Henry Torres - Full Stack Developer",
    description: "Portfolio showcasing modern web development projects and expertise",
    type: "website",
    locale: "en_US",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <CustomCursor />
          <AnimatedBackground />
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <LlamitaChatI18n />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

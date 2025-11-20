import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import LlamitaChat from "./components/LlamitaChat";
import AnimatedBackground from "./components/AnimatedBackground";
import CustomCursor from "./components/CustomCursor";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomCursor />
        <AnimatedBackground />
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <LlamitaChat />
      </body>
    </html>
  );
}

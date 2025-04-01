import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import { RoadmapProvider } from "./lib/auth/RoadmapContext";

const geistSans = Geist({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Mentor",
  description: "AI-Powered Career Guidance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.className} ${geistMono.className}`}>
      <body className="bg-black text-white antialiased">
        <Providers>
          <RoadmapProvider>

          {children}
          </RoadmapProvider>
        </Providers>
      </body>
    </html>
  );
}

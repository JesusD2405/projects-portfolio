import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Components
import { Provider } from "@/components/chakra-ui/provider";
import Navbar from "@/components/core/navbar/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jesús D. Pérez | Software Developer",
  description:
    "Full-Stack Software Developer Portfolio | Node.Js | Django | React | Vue.js — Ubuntu 24.04 LTS Inspired",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://assets.ubuntu.com/v1/f38b9c7e-COF%20apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://assets.ubuntu.com/v1/be7e4cc6-COF-favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://assets.ubuntu.com/v1/16c27f81-COF%20favicon-16x16.png"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}

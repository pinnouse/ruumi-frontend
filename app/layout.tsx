import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ruumi || Watch shows with friends",
  description: "Stream shows together with your friends in sync.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="p-8">
          {/* <img src="/logo.svg" alt="logo" /> */}
          <Link href="/" className="font-bold px-6">
            Ruumi
          </Link>
          <Link href="/browse">Browse</Link>
        </nav>
        <div className="container relative mx-auto px-4">{children}</div>
      </body>
    </html>
  );
}

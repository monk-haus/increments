import type { Metadata } from "next";
import { Roboto_Mono, Cormorant_Garamond, Inconsolata } from "next/font/google";
import "./globals.css";
import ClientWrapper from "./components/ClientWrapper";

const roboto_mono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Jason Okoh",
  description: "A creative agency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto_mono.variable} ${cormorant.variable}`}>
      <body className="antialiased min-h-screen flex flex-col relative bg-[#F5F5F0]">
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
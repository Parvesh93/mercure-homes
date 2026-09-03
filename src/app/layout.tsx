import type { Metadata } from "next";
import { Lato } from "next/font/google";

import "./globals.css";

import SmoothScroll from "../components/animations/SmoothScroll";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import CustomCursor from "../components/animations/CustomCursor";

import Preloader3D from "../components/animations/Preloader3D";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: {
    default: "Mercure Homes",
    template: "%s | Mercure Homes",
  },
  description:
    "Luxury personalised interiors, bespoke furniture and architectural craftsmanship by Mercure Homes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.variable}>
  <SmoothScroll>
    <Preloader3D />

    <CustomCursor />

    <Header />

    {children}

    <Footer />
  </SmoothScroll>
</body>
    </html>
  );
}
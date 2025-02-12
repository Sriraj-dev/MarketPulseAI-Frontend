import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/features/navbar";
import { Jaini_Purva } from 'next/font/google';
const jainiPurva = Jaini_Purva({ weight: '400', subsets: ['latin'] });
import MobileSidebar from "@/components/layout/MobileSidebar";

export const metadata: Metadata = {
  title: "MarketPulseAI",
  description: "AI Assisted Market Insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jainiPurva.className}>
        <div className=" h-52 bg-gradient-to-b from-[#cdefdc] to-[#FFFFFF]">
          <MobileSidebar />
          <Navbar />
          {children}
        </div>

      </body>

    </html>
  );
}

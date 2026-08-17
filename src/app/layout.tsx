import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Outfit } from "next/font/google";
import "./globals.css";
import { prisma } from "@/lib/prisma";
import { TrackingScripts } from "@/components/TrackingScripts";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#D97706",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "সুন্দরবনের ১০০% খাঁটি কাঁচা মধু | Sundarban Raw Mangrove Honey",
  description: "সুন্দরবনের গহীন অরণ্য থেকে সরাসরি সংগৃহীত ১০০% খাঁটি, আনপ্রসেসড ও প্রাকৃতিক কাঁচা মধু। কোনো প্রকার চিনি বা কেমিক্যাল নেই। সারা দেশে ক্যাশ অন ডেলিভারি ও মানি ব্যাক গ্যারান্টি।",
  keywords: "সুন্দরবনের মধু, খাঁটি মধু, কাঁচা মধু, Sundarban Honey, Raw Honey, Khalisa Honey, Goran Honey, Organic Honey Bangladesh",
  openGraph: {
    title: "সুন্দরবনের ১০০% খাঁটি কাঁচা মধু | সরাসরি বন থেকে সংগৃহীত",
    description: "১০০% প্রাকৃতিকভাবে সংগৃহীত খলিসা ও গরান ফুলের খাঁটি সুন্দরবনের মধু। ঘরে বসে ক্যাশ অন ডেলিভারিতে অর্ডার করুন।",
    type: "website",
    locale: "bn_BD",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let marketingSettings = null;
  try {
    marketingSettings = await prisma.marketingSettings.findUnique({
      where: { id: "default" },
    });
  } catch {
    // If DB is not ready during build
  }

  return (
    <html
      lang="bn"
      className={`${hindSiliguri.variable} ${outfit.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#FAFAF9] text-[#1C1917] font-sans selection:bg-[#FDE68A] selection:text-[#92400E]">
        <TrackingScripts settings={marketingSettings} />
        {children}
      </body>
    </html>
  );
}

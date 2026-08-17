"use client";

import React, { useState } from "react";
import { UrgencyBar } from "@/components/UrgencyBar";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { HarvestStorySection } from "@/components/HarvestStorySection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { PricingPackages } from "@/components/PricingPackages";
import { PurityCertSection } from "@/components/PurityCertSection";
import { CustomerReviews } from "@/components/CustomerReviews";
import { FaqSection } from "@/components/FaqSection";
import { CheckoutForm } from "@/components/CheckoutForm";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { SocialProofToast } from "@/components/SocialProofToast";

interface LandingPageClientProps {
  packages: any[];
  settings: {
    videoUrl: string;
    helplineNumber: string;
    supportEmail: string;
    stockCounter: string;
    deliveryChargeInsideDhaka: number;
    deliveryChargeOutsideDhaka: number;
    announcementText: string;
  };
  reviews?: any[];
}

export const LandingPageClient: React.FC<LandingPageClientProps> = ({
  packages,
  settings,
  reviews,
}) => {
  const defaultPackageId = packages.length > 0 ? (packages[1]?.id || packages[0]?.id) : "1kg";
  const [selectedPackageId, setSelectedPackageId] = useState<string>(defaultPackageId);

  // Smooth scroll handler to checkout form
  const handleScrollToCheckout = (pkgId?: string) => {
    if (pkgId) {
      setSelectedPackageId(pkgId);
    }
    const checkoutEl = document.getElementById("checkout");
    if (checkoutEl) {
      checkoutEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Smooth scroll handler to video showcase section
  const handleScrollToVideo = () => {
    const videoEl = document.getElementById("video-story");
    if (videoEl) {
      videoEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FAFAF9] text-[#1C1917] relative selection:bg-[#FEF3C7] selection:text-[#92400E]">
      {/* Top Scarcity / Urgency Bar */}
      <UrgencyBar
        announcementText={settings.announcementText}
        stockCounter={settings.stockCounter}
      />

      {/* Sticky Main Navigation */}
      <Navbar
        onOrderClick={() => handleScrollToCheckout()}
        helplineNumber={settings.helplineNumber}
      />

      {/* 1. Hero Section */}
      <HeroSection
        onOrderClick={() => handleScrollToCheckout()}
        onVideoClick={handleScrollToVideo}
      />

      {/* 2. Video & Ethical Harvest Showcase Section with dynamic URL */}
      <HarvestStorySection
        onOrderClick={() => handleScrollToCheckout()}
        videoUrl={settings.videoUrl}
      />

      {/* 3. Why Sundarban Honey? Benefits & Comparison Matrix */}
      <BenefitsSection onOrderClick={() => handleScrollToCheckout()} />

      {/* 4. Dynamic Pricing & Package Selection */}
      <PricingPackages
        packages={packages}
        selectedPackage={selectedPackageId}
        onSelectPackage={(id) => handleScrollToCheckout(id)}
      />

      {/* 5. Purity Guarantee & Risk-Free Shopping */}
      <PurityCertSection onOrderClick={() => handleScrollToCheckout()} />

      {/* 6. Dynamic Customer Social Proof & Testimonials from Database */}
      <CustomerReviews reviews={reviews} />

      {/* 7. Frequently Asked Questions Accordion */}
      <FaqSection />

      {/* 8. Single-Page Checkout Form connected to Server Action */}
      <CheckoutForm
        packages={packages}
        deliveryChargeInside={settings.deliveryChargeInsideDhaka}
        deliveryChargeOutside={settings.deliveryChargeOutsideDhaka}
        selectedPackageId={selectedPackageId}
        onSelectPackage={(id) => setSelectedPackageId(id)}
      />

      {/* Footer */}
      <Footer
        helplineNumber={settings.helplineNumber}
        supportEmail={settings.supportEmail}
      />

      {/* Mobile Sticky Floating Bottom CTA */}
      <StickyMobileBar
        packages={packages}
        selectedPackageId={selectedPackageId}
        onOrderClick={() => handleScrollToCheckout()}
      />

      {/* Real-time Simulated Order Toasts */}
      <SocialProofToast />
    </main>
  );
};

'use client';

import dynamic from "next/dynamic";
// Lazy loaded components
const Hero = dynamic(() => import("@/components/pages/Hero"));
const Service = dynamic(() => import("@/components/pages/Service"));
const CoreFeatures = dynamic(() => import("@/components/pages/CoreFeatures"));
const PaymentTrustSection = dynamic(() => import("@/components/pages/PaymentTrustSection"));
const TestimonialsSection = dynamic(() => import("@/components/pages/TestimonialsSection"), {
  ssr: false,
});
const FAQSection = dynamic(() => import("@/components/pages/FAQSection"), {
  ssr: false,
});
const FinalCTASection = dynamic(() => import("@/components/pages/FinalCTASection"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/pages/Footer"), {
  ssr: false,
});

import HowItWorks from "@/components/pages/HowItWorks";

export default function Home() {

  return (
    <>
      <Hero />
      <Service />
      <CoreFeatures />
      <HowItWorks />
      <TestimonialsSection />
      <PaymentTrustSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </>
  );
}

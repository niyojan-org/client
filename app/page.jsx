'use client';

import dynamic from "next/dynamic";


const Hero = dynamic(() => import("@/components/pages/Hero"));
const WhyChooseOrgatic = dynamic(() => import("@/components/pages/WhyChooseOrgatic"));
const CoreFeatures = dynamic(() => import("@/components/pages/CoreFeatures"));
const HowItWorks = dynamic(() => import("@/components/pages/HowItWorks"))
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


export default function Home() {

  return (
    <>
      <Hero />
      <WhyChooseOrgatic />
      <CoreFeatures />
      <HowItWorks />
      {/* <TestimonialsSection /> */}
      <PaymentTrustSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </>
  );
}

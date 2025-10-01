'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
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

export default function Home() {
  // const router = useRouter();
  // const { isAuthenticated, fetchUser } = useUserStore();

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     router.replace("/events");
  //   }
  // }, [isAuthenticated, router]);

  // if (isAuthenticated) return null;

  return (
    <>
      <Hero />
      <Service />
      <CoreFeatures />
      <PaymentTrustSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </>
  );
}

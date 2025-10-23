"use client";

import { useEffect, use } from "react";
import useSWR from "swr";
import { motion } from "framer-motion";

import fetcher from "@/lib/fetcher";
import HeroSection from "../components/HeroSection";
import RegistrationWidget from "../components/RegistrationWidget";
import OrganizationCard from "../components/OrganizationCard";
import EventDescription from "../components/EventDescription";
import EventBenefits from "../components/EventBenefits";
import SessionsTimeline from "../components/SessionsTimeline";
import { TicketCards } from "../components";
import SpeakersSection from "../components/SpeakersSection";
import CallToAction from "../components/CallToAction";
import Footer from "@/components/pages/Footer";
import Error404 from "@/app/not-found";
import { SpinnerCustom } from "@/components/ui/spinner";


export default function EventSlugPage({ params }) {
  const { slug } = use(params); // Next.js 15.3 param unwrapping

  // SWR: fetch event with 60s refresh
  const { data, error } = useSWR(
    slug ? `/event/${slug}` : null,
    fetcher,
    {
      refreshInterval: 15000,
      revalidateOnFocus: true,
    }
  );

  const singleEvent = data?.event;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // --- Loading skeleton
  if (!data && !error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4 ">
        {/* <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-64 w-full rounded-lg" /> */}
        {/* <div className="flex items-center space-x-2">
          <Loader2 className="animate-spin h-6 w-6 text-blue-500" />
          <span className="text-gray-500 text-lg">Loading event...</span>
        </div> */}
        {/* <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-2/3" /> */}
        <SpinnerCustom />
      </div>
    );
  }

  // --- Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600 text-lg">
          {error.message || "Failed to load event"}
        </p>
      </div>
    );
  }

  // --- Event not found
  if (!singleEvent) {
    return <Error404 />;
  }

  return (
    <div className="min-h-dvh w-full">
      <HeroSection event={singleEvent} />

      <motion.div
        className="pt-5 space-y-4 pb-8 w-full max-w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div className="w-full" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <RegistrationWidget event={singleEvent} />
        </motion.div>

        <motion.div className="w-full" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <OrganizationCard event={singleEvent} />
        </motion.div>

        <motion.div className="w-full" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <EventDescription event={singleEvent} />
        </motion.div>

        <motion.div className="w-full" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <EventBenefits event={singleEvent} />
        </motion.div>

        <motion.div className="w-full" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
          <SessionsTimeline event={singleEvent} />
        </motion.div>

        <motion.div className="w-full" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <TicketCards event={singleEvent} />
        </motion.div>

        <motion.div className="w-full" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
          <SpeakersSection event={singleEvent} />
        </motion.div>

        <motion.div className="w-full" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.9 }}>
          <CallToAction event={singleEvent} registrationActive={true} />
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
}

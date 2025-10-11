"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import useEventStore from "@/store/eventStore";
import EventDetails from "../components/EventDetails";
import { useLoaderStore } from "@/store/loaderStore";
import { CallToAction, EventBenefits, EventDescription, HeroSection, OrganizationCard, RegistrationWidget, SessionsTimeline, SimilarEvents, SpeakersSection, TicketCards } from "../components";
import Footer from "@/components/pages/Footer";

export default function EventSlugPage(props) {
  const { showLoader, hideLoader } = useLoaderStore();

  const { slug } = use(props.params);

  const {
    singleEvent,
    loadingSingleEvent,
    errorSingleEvent,
    fetchEventBySlug,
    clearSingleEvent,
  } = useEventStore();

  useEffect(() => {
    if (!slug) return;
    fetchEvent();
    return () => clearSingleEvent();
  }, [slug]);

  const fetchEvent = async () => {
    try {
      showLoader();
      await fetchEventBySlug(slug);
    } catch (error) {
    } finally {
      hideLoader();
    }
  };

  // if (loadingSingleEvent) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <p>mujhe yah apar loader want</p>
  //     </div>
  //   );
  // }

  if (errorSingleEvent) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600">{errorSingleEvent}</p>
      </div>
    );
  }

  if (!singleEvent) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No event found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <HeroSection event={singleEvent} />

      <motion.div 
        className="px-2 sm:px-10 lg:px-20 pt-5 space-y-4 pb-8 w-full max-w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Registration Widget */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <RegistrationWidget event={singleEvent} />
        </motion.div>

        {/* Organization Card */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <OrganizationCard event={singleEvent} />
        </motion.div>

        {/* Event Description */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <EventDescription event={singleEvent} />
        </motion.div>

        {/* Event Benefits */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <EventBenefits event={singleEvent} />
        </motion.div>

        {/* Sessions Timeline */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <SessionsTimeline event={singleEvent} />
        </motion.div>

        {/* Ticket Cards */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <TicketCards event={singleEvent} />
        </motion.div>

        {/* Speakers Section */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <SpeakersSection event={singleEvent} />
        </motion.div>

        {/* Similar Events */}
        {/* <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <SimilarEvents similarEvents={similarEvents} />
        </motion.div> */}

        {/* Call to Action */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <CallToAction event={singleEvent} registrationActive={true} />
        </motion.div>
        
        {/* footer */}

      </motion.div>
        <Footer />
    </div>
  );
}

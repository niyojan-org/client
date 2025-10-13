"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OrganizerFAQ from "../OrganizerFAQ";
import { AttendesFAQ } from "../AttendesFAQ";

const FAQSection = () => {
  const [activeTab, setActiveTab] = useState("organizer");

  const fadeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-white via-indigo-50/20 to-white">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-900 mb-10 font-sans">
          FAQs for Hosts & Attendees
        </h2>

        {/* Tabs */}
        <div className="flex justify-center gap-4 flex-wrap mb-10">
          {["organizer", "attendee"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 ${
                activeTab === tab
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-indigo-800 border-indigo-200 hover:bg-indigo-50"
              }`}
              aria-pressed={activeTab === tab}
              aria-label={`View ${tab} FAQs`}
            >
              {tab === "organizer" ? "Organizers" : "Attendees"}
            </button>
          ))}
        </div>

        {/* FAQ Panels with Animation */}
        <div className="mt-6 relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeTab === "organizer" ? (
              <motion.div
                key="organizer"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeVariants}
              >
                <OrganizerFAQ />
              </motion.div>
            ) : (
              <motion.div
                key="attendee"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeVariants}
              >
                <AttendesFAQ />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

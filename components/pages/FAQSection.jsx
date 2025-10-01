'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import OrganizerFAQ from '../OrganizerFAQ';
import { AttendesFAQ } from '../AttendesFAQ';

const FAQSection = () => {
  const [activeTab, setActiveTab] = useState("organizer");

  const fadeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };

  return (
    <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-10 font-poppins">
          Rasa FAQs for Hosts & Attendees
        </h2>

        {/* Tabs */}
        <div className="flex justify-center gap-4 flex-wrap mb-10">
          {["organizer", "attendee"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm border focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                activeTab === tab
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
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

"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OrganizerFAQ from "../OrganizerFAQ";
import { AttendesFAQ } from "../AttendesFAQ";
import { Button } from "../ui/button";

const FAQSection = () => {
  const [activeTab, setActiveTab] = useState("organizer");

  const fadeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <section className="py-4 sm:px-8 bg-gradient-to-b from-background via-primary/5 to-card transition-colors duration-700">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 font-sans text-primary dark:text-primary">
          FAQs for Hosts & Attendees
        </h2>

        {/* Tabs */}
        <div className="flex justify-center gap-3 flex-wrap mb-10">
          {["organizer", "attendee"].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-semibold shadow-sm border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary/20 hover:bg-primary/90"
                    : "bg-card text-foreground border border-border hover:bg-muted hover:text-primary"
                }`}
                aria-pressed={isActive}
                aria-label={`View ${tab} FAQs`}
              >
                {tab === "organizer" ? "Organizers" : "Attendees"}
              </Button>
            );
          })}
        </div>

        {/* FAQ Panels */}
        <div className="mt-4 relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeTab === "organizer" ? (
              <motion.div
                key="organizer"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeVariants}
                className="rounded-xl p-4 bg-card/80 backdrop-blur-sm shadow-lg border border-border/50 transition-colors duration-500"
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
                className="rounded-xl p-4 bg-card/80 backdrop-blur-sm shadow-lg border border-border/50 transition-colors duration-500"
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

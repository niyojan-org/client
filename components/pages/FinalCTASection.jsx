'use client';
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FinalCTA = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      className="relative bg-gradient-to-r from-indigo-800 via-indigo-900 to-blue-900 py-16 text-white overflow-hidden"
      aria-label="Final Call to Action"
    >
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 opacity-20" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 opacity-20" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="space-y-6"
        >
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-extrabold font-poppins tracking-tight">
            Ready to Host or Join Amazing Events?
          </h2>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-gray-200 font-poppins max-w-2xl mx-auto leading-relaxed">
            Thousands of students are already creating unforgettable experiences. Jump in and be part of it!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold font-poppins"
            >
              <Link href="/auth">Start Hosting</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-indigo-900 px-8 py-3 rounded-full font-semibold font-poppins"
            >
              <Link href="/explore">Discover Events</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CallToAction",
            name: "Orgatic Event Management CTA",
            description: "Join Orgatic to host or attend events seamlessly.",
            target: [
              {
                "@type": "EntryPoint",
                urlTemplate: "https://orgatic.events/auth",
                actionName: "Start Hosting",
              },
              {
                "@type": "EntryPoint",
                urlTemplate: "https://orgatic.events/explore",
                actionName: "Discover Events",
              },
            ],
          }),
        }}
      />
    </section>
  );
};

export default FinalCTA;

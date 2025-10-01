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
      className="relative bg-[#1E3A8A] py-12 sm:py-16 text-white overflow-hidden"
      aria-label="Final Call to Action"
    >
      {/* Mandala Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#F97316] opacity-20" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-[#F97316] opacity-20" />

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
            Ready for the Orgatic Experience?
          </h2>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-gray-200 font-poppins max-w-2xl mx-auto leading-relaxed">
            Join 1,000+ LPU students hosting and attending events with Orgatic’s seamless platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[#F97316] hover:bg-[#e86a15] text-white px-8 py-3 rounded-full font-semibold font-poppins"
            >
              <Link href="/auth">Start Hosting</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#1E3A8A] px-8 py-3 rounded-full font-semibold font-poppins"
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

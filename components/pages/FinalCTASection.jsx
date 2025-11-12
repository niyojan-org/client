'use client';
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {useRouter} from "next/navigation";

const FinalCTA = () => {
  const router = useRouter();
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      className="
        relative 
        py-12 
        text-center 
        overflow-hidden 
        transition-colors duration-700
        bg-gradient-to-br from-primary/90 via-primary/60 to-primary/90 
        dark:from-background dark:via-primary/20 dark:to-background
      "
      aria-label="Final Call to Action"
    >
      {/* Decorative subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent dark:from-primary/5 dark:to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-2 sm:px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="space-y-8"
        >
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight text-primary-foreground dark:text-primary">
            Ready to Host or Join Amazing Events?
          </h2>

          {/* Subtext */}
          <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed text-primary-foreground/90 dark:text-muted-foreground">
            Thousands of students are already creating unforgettable experiences. Jump in and be part of it!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
            <Button
              onClick={() => router.push('/auth')}
              size="lg"
              className="
                px-8 py-3 rounded-full font-semibold shadow-md 
                bg-primary text-primary-foreground 
                hover:bg-primary/90 
                transition-all duration-300
              "
            >
              Start Hosting
            </Button>

            <Button
              asChild
              size="lg"
              variant="primary"
              className="
                px-8 py-3 rounded-full font-semibold transition-all duration-300
                border border-primary-foreground/40 
                text-primary-foreground 
                hover:bg-primary-foreground hover:text-primary
                dark:border-primary/40 dark:text-primary dark:hover:bg-primary dark:hover:text-primary-foreground
              "
            >
              <Link href="/events">Discover Events</Link>
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

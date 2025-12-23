"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const v = useMemo(() => {
    if (shouldReduceMotion) {
      return {
        fadeUp: {
          initial: { opacity: 1, y: 0 },
          animate: { opacity: 1, y: 0 },
        },
      };
    }
    return {
      fadeUp: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
      },
    };
  }, [shouldReduceMotion]);

  return (
    <section
      aria-label="Hero section - Event Management Platform"
      className="relative overflow-hidden bg-[color:var(--background)] text-[color:var(--foreground)] transition-colors duration-300"
    >
      {/* Background animation */}
      <svg
        aria-hidden="true"
        className="absolute -top-16 left-[10%] w-[360px] h-[360px] md:w-[520px] md:h-[520px] opacity-20 pointer-events-none"
        viewBox="0 0 600 600"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="50%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--secondary)" />
          </linearGradient>
          <filter id="blur1" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="40" />
          </filter>
        </defs>
        <g filter="url(#blur1)">
          <circle cx="300" cy="300" r="220" fill="url(#g1)">
            <animate attributeName="cx" dur="10s" repeatCount="indefinite" values="300;320;280;300" />
            <animate attributeName="cy" dur="12s" repeatCount="indefinite" values="300;285;315;300" />
          </circle>
        </g>
      </svg>

      {/*  Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-28 md:py-32 lg:py-36 text-center">
        <motion.h1
          {...v.fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl"
          style={{ lineHeight: 1.06, letterSpacing: "0.02em", fontFamily: "var(--font-source-sans-3)" }}
        >
          Create Experiences That{" "}
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent shape-moments">
            Inspire
          </span>{" "}
          and Connect People.
        </motion.h1>


        <motion.p
          {...v.fadeUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.18, duration: 0.6 }}
          className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto text-[color:var(--muted-foreground)]"
        >
          <strong className="text-[color:var(--primary)] italic">All-in-one event management platform</strong>{" "}
          built to help you plan, promote, and deliver unforgettable experiences — from concept to celebration.
        </motion.p>

        {/*  CTA Buttons */}
        <motion.div
          {...v.fadeUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.36, duration: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <Button
            asChild
            className="px-7 py-3 rounded-xl shadow-lg font-semibold bg-gradient-to-r from-primary via-accent to-secondary text-card hover:scale-105 transition-transform duration-300"
          >
            <motion.span
              whileHover={!shouldReduceMotion ? { scale: 1.04 } : {}}
              whileFocus={!shouldReduceMotion ? { scale: 1.03 } : {}}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href="/features" aria-label="Start Hosting Events">
                Services
              </Link>
            </motion.span>
          </Button>

          <Button
            asChild
            variant="outline"
            className="px-7 py-3 rounded-xl font-semibold border-primary text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300"
          >
            <motion.span
              whileHover={!shouldReduceMotion ? { scale: 1.04 } : {}}
              whileFocus={!shouldReduceMotion ? { scale: 1.03 } : {}}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href="/events" aria-label="Discover Live Events">
                Explore Events
              </Link>
            </motion.span>
          </Button>
        </motion.div>

        <motion.div
          {...v.fadeUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 text-sm text-[color:var(--muted-foreground)]"
        >
          Trusted by <strong>1,000+</strong> organizers & attendees.
        </motion.div>
      </div>

      {/* Localw Styles */}
      <style jsx>{`
        .shape-moments {
          position: relative;
          background-size: 180% auto;
          transition: background-position 1.2s linear;
        }
        .shape-moments:hover {
          background-position: -20% center;
          animation: shine-text 1.4s linear infinite;
        }
        @keyframes shine-text {
          0% {
            background-position: 120% center;
          }
          100% {
            background-position: -20% center;
          }
        }
        a:focus,
        button:focus {
          outline: none;
          box-shadow: none;
        }
      `}</style>
    </section>
  );
}

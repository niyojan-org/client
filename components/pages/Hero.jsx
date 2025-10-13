'use client';

import React, { useMemo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button"; // shadcn/ui button

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
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
      },
    };
  }, [shouldReduceMotion]);

  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden bg-[color:var(--background)] text-[color:var(--foreground)]"
      style={{ WebkitFontSmoothing: "antialiased" }}
    >
      {/* Background blobs */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 left-[10%] w-[360px] h-[360px] md:w-[520px] md:h-[520px] opacity-20"
        viewBox="0 0 600 600"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#6366f1" />
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

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-6%] right-[8%] w-[220px] h-[220px] md:w-[360px] md:h-[360px] opacity-18"
        viewBox="0 0 600 600"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="g2" x1="0" x2="1">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          <filter id="blur2" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="28" />
          </filter>
        </defs>
        <g filter="url(#blur2)">
          <circle cx="300" cy="300" r="180" fill="url(#g2)">
            <animate attributeName="cx" dur="14s" repeatCount="indefinite" values="300;285;310;300" />
            <animate attributeName="cy" dur="11s" repeatCount="indefinite" values="300;315;285;300" />
          </circle>
        </g>
      </svg>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-32 lg:py-36 text-center">
        <motion.h1
          {...v.fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl"
          style={{ lineHeight: 1.06, letterSpacing: "0.02em", fontFamily: "var(--font-source-sans-3)" }}
        >
          Build Events.{" "}
          <span
            className="shape-moments bg-clip-text text-transparent bg-gradient-to-r from-[#7c3aed] via-[#ec4899] to-[#6366f1]"
          >
            Shape Moments.
          </span>{" "}
          Inspire Audiences.
        </motion.h1>

        <motion.p
          {...v.fadeUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.18, duration: 0.6 }}
          className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto text-[color:var(--muted-foreground)]"
        >
          <strong className="text-[color:var(--primary)] italic">Design, discover, and connect</strong>{" "}
          through a seamless platform — built to help you create, manage, and elevate events from concept to experience.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          {...v.fadeUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.36, duration: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <Button asChild className="px-7 py-3 rounded-xl shadow-lg font-semibold">
            <motion.span
              whileHover={!shouldReduceMotion ? { scale: 1.04 } : {}}
              whileFocus={!shouldReduceMotion ? { scale: 1.03 } : {}}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href="/auth" aria-label="Host Events">
                Host Events
              </Link>
            </motion.span>
          </Button>

          <Button
            asChild
            variant="outline"
            className="px-7 py-3 rounded-xl font-semibold text-[color:var(--primary)]"
          >
            <motion.span
              whileHover={!shouldReduceMotion ? { scale: 1.04 } : {}}
              whileFocus={!shouldReduceMotion ? { scale: 1.03 } : {}}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href="/events" aria-label="Explore Events">
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
          className="mt-8 text-sm text-[color:var(--muted-foreground)]"
        >
          Trusted by <strong>10,000+</strong> event pros worldwide 🎉
        </motion.div>
      </div>

      {/* ✨ Local styles with hover shine effect */}
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
          0% { background-position: 120% center; }
          100% { background-position: -20% center; }
        }

        a:focus,
        button:focus {
          outline: none;
          box-shadow: none; /* 🔥 removed the default ring */
        }

        @media (max-width: 420px) {
          .max-w-6xl { padding-left: 18px; padding-right: 18px; }
        }
      `}</style>
    </section>
  );
}

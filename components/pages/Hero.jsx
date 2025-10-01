"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative bg-gradient-to-br from-[#fdfdfd] via-[#f3f4f6] to-[#e2e8f0] text-navy overflow-hidden">
      {/* Abstract subtle blurred circles for depth */}
      <div
        aria-hidden="true"
        className="absolute top-[-10%] left-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 opacity-20 blur-3xl animate-blobSlow"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-gradient-to-br from-indigo-400 to-blue-400 opacity-25 blur-2xl animate-blobSlow delay-2000"
      />

      <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center pt-[11.5rem] pb-32 min-h-[80vh] relative z-10">
        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-wide leading-tight font-spaceGrotesk mb-6"
          style={{ letterSpacing: "0.02em", lineHeight: 1.1 }}
        >
          Build Events.{" "}
          <span
            className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 bg-clip-text text-transparent cursor-pointer"
            tabIndex={0}
            aria-label="Shape Moments"
            onFocus={(e) => e.currentTarget.classList.add("shine")}
            onBlur={(e) => e.currentTarget.classList.remove("shine")}
          >
            Shape Moments.
          </span>{" "}
          Inspire Audiences.
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="text-lg sm:text-xl text-gray-700 max-w-3xl font-spaceGrotesk mb-12 leading-relaxed tracking-wide"
          style={{ letterSpacing: "0.015em" }}
        >
          <span className="font-bold text-indigo-600 italic tracking-widest">
            Design, discover, and connect
          </span>{" "}
          through a seamless platform — built to help you create, manage, and elevate events from concept to experience.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-5 w-full sm:justify-center"
        >
          <Link href="/auth" passHref>
            <motion.button
              whileHover={{ scale: 1.06, boxShadow: "0 8px 20px rgba(99, 102, 241, 0.4)" }}
              whileFocus={{ scale: 1.06, boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.6)" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg focus:outline-none"
              aria-label="Host Events"
              type="button"
            >
              Host Events
            </motion.button>
          </Link>

          <Link href="/features" passHref>
            <motion.button
              whileHover={{ scale: 1.06, boxShadow: "0 6px 18px rgba(59, 130, 246, 0.4)" }}
              whileFocus={{ scale: 1.06, boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.6)" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="px-8 py-3 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-shadow font-semibold shadow-md focus:outline-none"
              aria-label="Explore Events"
              type="button"
            >
              Explore Events
            </motion.button>
          </Link>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-12 text-sm text-gray-500"
        >
          <p>
            Trusted by <strong>10,000+</strong> event pros worldwide 🎉
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        /* subtle shine effect on gradient text */
        .shine {
          animation: shine-text 1.5s ease-in-out forwards;
          background-size: 200% auto;
        }
        @keyframes shine-text {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }

        /* blob animations for background circles */
        @keyframes blobSlow {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(15px, -10px) scale(1.05);
          }
          66% {
            transform: translate(-10px, 15px) scale(0.95);
          }
        }
        .animate-blobSlow {
          animation: blobSlow 8s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}

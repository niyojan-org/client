"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IconTicket } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function CallToAction({ event, registrationActive }) {
  return (
    <motion.section
      className="text-center py-16 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <motion.article
        className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-3xl p-8 sm:p-12 border border-primary/20 shadow-lg max-w-3xl mx-auto"
        whileHover={{ scale: 1.02 }}
      >
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-primary">
          Ready to Join?
        </h2>

        {/* Description */}
        <p className="text-muted-foreground text-base sm:text-lg mb-6">
          Don’t miss out on this incredible opportunity. Register now and be part of an amazing experience!
        </p>

        {/* Action Button */}
        {registrationActive ? (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <Button
              size="lg"
              className="flex items-center justify-center px-8 py-3 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
              asChild
            >
              <Link
                href={`/events/${event.slug}/registration`}
                aria-label={`Register for ${event.name}`}
              >
                <IconTicket className="w-5 h-5 mr-2" />
                Register Now
              </Link>
            </Button>
          </motion.div>
        ) : (
          <Button
            size="lg"
            disabled
            className="px-8 py-3 text-lg font-semibold cursor-not-allowed bg-gray-200 text-gray-500"
          >
            Registration Closed
          </Button>
        )}
      </motion.article>
    </motion.section>
  );
}

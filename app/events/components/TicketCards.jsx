"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Ticket from "./Ticket";

const cardHoverVariants = {
  hover: {
    scale: 1.04,
    y: -5,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function TicketCards({ event }) {
  if (!event?.tickets?.length) return null;

  return (
    <motion.section
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {/* Section Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">
          Ticket Options
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Choose your ticket type
        </p>
      </div>

      {/* Ticket Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
        {event.tickets.map((ticket, index) => (
          <motion.div
            key={ticket._id || index}
            variants={cardHoverVariants}
            // whileHover="hover"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1,}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-xl"
          >
            <Link href={`/register/${ticket._id}`} className="block no-underline ">
              <Ticket
                ticketName={ticket.type || "General"}
                price={`₹${ticket.price?.toLocaleString() || 0}`}
                ticketNumber={ticket.ticketNumber || 0}
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Ticket from "./TicketCard";

const cardHoverVariants = {
  hover: { scale: 1.03, y: -4, transition: { duration: 0.25 } },
};

export default function TicketCards({ event }) {
  if (!event?.tickets?.length) return null;

  const ticketCount = event.tickets.length;

  // Dynamic grid classes based on ticket count
  const gridCols =
    ticketCount === 1
      ? "grid-cols-1 justify-center"
      : ticketCount === 2
      ? "sm:grid-cols-2 justify-center"
      : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <motion.section
      className="w-full py-12 sm:py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight">
          Ticket Options
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
          Choose the ticket that best fits your needs
        </p>
      </div>

      {/* Ticket Grid */}
      <div
        className={`grid ${gridCols} gap-8 place-items-center`}
      >
        {event.tickets.map((ticket, index) => (
          <motion.div
            key={ticket._id || index}
            variants={cardHoverVariants}
            whileHover="hover"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-full flex justify-center"
          >
            <Link
              href={`/register/${ticket._id}`}
              className="block no-underline w-full max-w-[22rem]"
            >
              <Ticket
                ticketName={ticket.type || "General"}
                price={`₹${ticket.price?.toLocaleString() || 0}`}
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

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

  // Dynamic grid
  const gridCols =
    ticketCount === 1
      ? "grid-cols-1"
      : ticketCount === 2
      ? "sm:grid-cols-2"
      : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <motion.section
      className="w-full py-10 "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="border-t-4 border-t-primary py-3 text-center max-w-6xl mx-auto space-y-5 px-4 bg-card w-full rounded-2xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight">
          Ticket Options
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
          Choose the ticket that best fits your needs
        </p>

      {/* Grid */}
      <div
        className={`grid ${gridCols} gap-6 sm:gap-8 px-4 sm:px-6 md:px-10 place-items-center`}
      >
        {event.tickets.map((ticket, index) => (
          <motion.div
            key={ticket._id || index}
            variants={cardHoverVariants}
            whileHover="hover"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="w-full flex justify-center"
          >
            <Link
              href={`/events/${event.slug}/registration?ticketId=${ticket._id}`}
              className="block w-full max-w-sm sm:max-w-md md:max-w-[22rem]"
            >
              <Ticket
                ticketName={ticket.type || "General"}
                price={`₹${ticket.price?.toLocaleString() || 0}`}
              />
            </Link>
          </motion.div>
        ))}
      </div>
      </div>
    </motion.section>
  );
}

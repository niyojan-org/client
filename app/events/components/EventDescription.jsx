"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconStar, IconUsers, IconClock } from "@tabler/icons-react";
import { format } from "date-fns";

export default function EventDescription({ event }) {
  // if (!event) return null;

  // 🔹 AI-style quick summary generator (kept but commented in render)
  // const generateEventSummary = () => {
  //   const parts = [];
  //   if (event.organization?.name) {
  //     parts.push(
  //       `${event.title} by ${event.organization.name}${
  //         event.organization.verified ? " ✓" : ""
  //       }`
  //     );
  //   } else {
  //     parts.push(event.title);
  //   }

  //   if (event.sessions?.length > 0) {
  //     const count = event.sessions.length;
  //     const firstDate = format(
  //       new Date(event.sessions[0].startTime),
  //       "MMM dd, yyyy"
  //     );
  //     parts.push(`${count} session${count > 1 ? "s" : ""} starting on ${firstDate}`);
  //   }

  //   if (event.tickets?.length > 0) {
  //     const prices = event.tickets.map((t) => t.price).filter((p) => p > 0);
  //     if (prices.length > 0) {
  //       const min = Math.min(...prices);
  //       const max = Math.max(...prices);
  //       parts.push(`Tickets from ₹${min}${min !== max ? ` – ₹${max}` : ""}`);
  //     } else {
  //       parts.push("Free entry");
  //     }
  //   }
  //   return parts.join(" • ");
  // };

  // const aiSummary = generateEventSummary();
  const wordCount = event.description ? event.description.split(/\s+/).length : 0;
  const readMinutes = wordCount > 0 ? Math.ceil(wordCount / 200) : 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      <Card className="border-t-4 border-t-primary backdrop-blur-md mb-1 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden bg-card mt-10 ">
        {/* 🔹 Header */}
        <CardHeader className="text-center px-4 sm:px-8 ">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">
            About This Event
          </CardTitle>
        </CardHeader>

        <CardContent className="px-4 sm:px-8 md:px-12 lg:px-16 pb-10">
         

          {/* 🔹 Full Description */}
          {event.description?.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="mx-auto max-w-5xl"
            >
              {/* Section heading */}
              <div className="flex items-center gap-3 mb-5">
                <IconUsers className="h-5 w-5 text-primary" />
                <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                  Event Details
                </h3>
                <div className="flex-1 h-px bg-primary/20" />
              </div>

              {/* Description box */}
              <div className="bg-muted/10 rounded-lg px-6 py-6 sm:px-8 sm:py-8 border border-muted/30 shadow-sm">
                <CardDescription className="text-base sm:text-lg leading-relaxed sm:leading-loose text-foreground/80 whitespace-pre-line text-justify">
                  {event.description}
                </CardDescription>

                {/* Reading meta */}
                <div className="mt-6 pt-4 border-t border-muted/20 flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <IconClock className="h-4 w-4" />
                    ~{readMinutes} min read
                  </span>
                  <span>{wordCount} words</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* 🔹 Tags */}
          {event.tags?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="mx-auto max-w-5xl mt-8"
            >
              <h4 className="text-sm sm:text-base font-medium text-muted-foreground mb-3">
                Event Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs sm:text-sm px-3 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.section>
  );
}

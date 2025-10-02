"use client";

import { motion } from "framer-motion";
import { parseISO, format, isValid } from "date-fns";
import { IconMapPin, IconClock } from "@tabler/icons-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* 🔹 Safe date formatting */
function safeFormat(dateString) {
  if (!dateString) return null;
  const d = typeof dateString === "string" ? parseISO(dateString) : dateString;
  if (!isValid(d)) return null;
  return format(d, "MMM d yyyy • hh:mmaaa");
}

/* 🔹 Format session range elegantly */
function formatSessionRange(startString, endString) {
  const start = parseISO(startString);
  const end = parseISO(endString);
  if (!isValid(start) || !isValid(end)) return "";

  const sameDay = format(start, "yyyyMMdd") === format(end, "yyyyMMdd");

  return sameDay
    ? `${format(start, "MMM d yyyy")} • ${format(start, "hh:mmaaa")} – ${format(
        end,
        "hh:mmaaa"
      )} (${format(start, "EEE")})`
    : `${safeFormat(startString)} → ${safeFormat(endString)} (${format(
        end,
        "EEE"
      )})`;
}

export default function SessionsTimeline({ event }) {
  if (!event?.sessions?.length) return null;

  const sortedSessions = [...event.sessions].sort(
    (a, b) => new Date(a.startTime) - new Date(b.startTime)
  );

  return (
    <motion.section
      className="w-full mt-14"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* 🔹 Section Header */}
      <Card className="shadow-none border-none bg-transparent  text-center mb-1">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
            Sessions Timeline
          </CardTitle>
          <CardDescription className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-muted-foreground mt-2">
            Step-by-step schedule for each session of the event.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* 🔹 Timeline Container */}
      <div className="relative">
        {/* Vertical line for timeline */}
        <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-primary/30" />

        <div className="space-y-10">
          {sortedSessions.map((session, index) => (
            <motion.div
              key={session._id || index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-12 sm:pl-16"
            >
              {/* 🔹 Timeline Dot */}
              <div className="absolute left-2 sm:left-4 top-6 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary border-2 border-background shadow-md" />

              {/* 🔹 Session Card */}
              <Card className="rounded-xl hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-5 sm:p-7">
                  {/* Title + Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold text-primary">
                      {session.title || "Untitled Session"}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className="text-xs sm:text-sm md:text-base whitespace-nowrap"
                    >
                      Session {index + 1}
                    </Badge>
                  </div>

                  {/* Description */}
                  {session.description && (
                    <CardDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                      {session.description}
                    </CardDescription>
                  )}

                  {/* Time & Venue */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <div className="flex items-center gap-2 text-primary/90 text-sm sm:text-base">
                      <IconClock className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span>{formatSessionRange(session.startTime, session.endTime)}</span>
                    </div>

                    {session.venue?.name && (
                      <div className="flex items-center gap-2 text-primary/90 text-sm sm:text-base">
                        <IconMapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        <span>
                          {session.venue.name}
                          {session.venue.city ? `, ${session.venue.city}` : ""}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

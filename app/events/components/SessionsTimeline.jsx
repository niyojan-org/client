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

// Safe date formatting
function safeFormat(dateString) {
  if (!dateString) return null;
  const d = typeof dateString === "string" ? parseISO(dateString) : dateString;
  if (!isValid(d)) return null;
  return format(d, "MMM d yyyy hh:mmaaa").toLowerCase();
}

// Format session range
function formatSessionRange(startString, endString) {
  const start = parseISO(startString);
  const end = parseISO(endString);
  if (!isValid(start) || !isValid(end)) return "";

  if (format(start, "yyyyMMdd") === format(end, "yyyyMMdd")) {
    return `${format(start, "MMM d yyyy")} ${format(start, "hh:mmaaa").toLowerCase()} - ${format(
      end,
      "hh:mmaaa"
    ).toLowerCase()} (${format(start, "EEE")})`;
  }
  return `${safeFormat(startString)} - ${safeFormat(endString)} (${format(end, "EEE")})`;
}

export default function SessionsTimeline({ event }) {
  if (!event?.sessions?.length) return null;

  const sortedSessions = [...event.sessions].sort(
    (a, b) => new Date(a.startTime) - new Date(b.startTime)
  );

  return (
    <motion.section
      className="w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Section Header */}
      <Card className="border-0 shadow-none mb-12 text-center">
        <CardHeader>
          <CardTitle className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">
            Sessions Timeline
          </CardTitle>
          <CardDescription className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Detailed schedule of all sessions and activities planned for this event
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Timeline */}
      <CardContent className="relative pl-8 space-y-8 border-l-2 border-primary/30">
        {sortedSessions.map((session, index) => (
          <motion.div
            key={session._id || index}
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Timeline Dot */}
            <Card className="absolute -left-11 top-6 w-5 h-5 rounded-full bg-primary border-1.5 border-background shadow-md p-0" />

            {/* Session Card */}
            <Card className="hover:shadow-lg transition-shadow duration-300 rounded-xl">
              <CardContent className="p-6 sm:p-8">
                <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 p-0">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-primary truncate">
                    {session.title || "Untitled Session"}
                  </CardTitle>
                  <Badge variant="outline" className="w-fit text-sm sm:text-base">
                    Session {index + 1}
                  </Badge>
                </CardHeader>

                {session.description && (
                  <CardDescription className="text-muted-foreground mb-4 leading-relaxed text-sm sm:text-base">
                    {session.description}
                  </CardDescription>
                )}

                {/* Time & Venue */}
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-0">
                  <CardContent className="flex items-center gap-2 text-primary/90 p-0">
                    <IconClock className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{formatSessionRange(session.startTime, session.endTime)}</span>
                  </CardContent>

                  {session.venue && session.venue.name && (
                    <CardContent className="flex items-center gap-2 text-primary/90 p-0">
                      <IconMapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>
                        {session.venue.name}
                        {session.venue.city ? `, ${session.venue.city}` : ""}
                      </span>
                    </CardContent>
                  )}
                </CardContent>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </CardContent>
    </motion.section>
  );
}

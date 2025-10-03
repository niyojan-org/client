"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
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

/* ---------- helpers ---------- */
function safeParse(dateOrString) {
  if (!dateOrString) return null;
  const d = typeof dateOrString === "string" ? parseISO(dateOrString) : dateOrString;
  return isValid(d) ? d : null;
}

function formatSessionRange(startStr, endStr) {
  const start = safeParse(startStr);
  const end = safeParse(endStr);

  if (!start && !end) return "Time to be announced";
  if (start && !end) return format(start, "MMM d yyyy • hh:mma");
  if (!start && end) return format(end, "MMM d yyyy • hh:mma");

  const sameDay = format(start, "yyyyMMdd") === format(end, "yyyyMMdd");
  return sameDay
    ? `${format(start, "MMM d yyyy")} • ${format(start, "hh:mma")} – ${format(end, "hh:mma")}`
    : `${format(start, "MMM d yyyy • hh:mma")} → ${format(end, "MMM d yyyy • hh:mma")}`;
}

/* ---------- component ---------- */
export default function SessionsTimeline({ event }) {
  const prefersReducedMotion = useReducedMotion();

  if (!event?.sessions || event.sessions.length === 0) return null;

  const sessions = useMemo(() => {
    return [...event.sessions]
      .map((s, i) => ({
        id: s._id ?? `session-${i}`,
        title: s.title ?? "Untitled Session",
        description: s.description ?? "",
        startTime: s.startTime,
        endTime: s.endTime,
        venue: s.venue ?? {},
      }))
      .sort((a, b) => {
        const da = safeParse(a.startTime) ?? new Date(0);
        const db = safeParse(b.startTime) ?? new Date(0);
        return da.getTime() - db.getTime();
      });
  }, [event.sessions]);

  return (
    <motion.section
      className="w-full mt-10"
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 25 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Sessions timeline"
    >
      {/* ---- Header ---- */}
      <Card className="border-t-4 border-t-primary text-center backdrop-blur-md mb-6 shadow-xl hover:shadow-2xl transition-all duration-300 ">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
            Sessions Timeline
          </CardTitle>
          <CardDescription className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-muted-foreground mt-2">
            Full schedule of sessions with times and venues.
          </CardDescription>
        </CardHeader>

        {/* ---- Timeline ---- */}
        <div className="relative px-4 pb-6 sm:px-6">
          {/* Vertical line visible only on sm+ */}
          <div className="hidden sm:block absolute left-8 top-6 bottom-6 w-px bg-primary/50" aria-hidden />

          <div className="space-y-8 sm:space-y-10">
            {sessions.map((session, idx) => (
              <motion.article
                key={session.id}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="relative sm:pl-14"
                tabIndex={0}
                aria-labelledby={`session-title-${session.id}`}
              >
                {/* timeline dot */}
                <div
                  className="hidden sm:block absolute left-[0.5px] top-6 w-4 h-4 rounded-full bg-primary border-2 border-background shadow-md"
                  aria-hidden
                />

                {/* card */}
                <Card className="rounded-xl hover:shadow-lg transition-shadow duration-300 focus-within:ring-2 focus-within:ring-primary/40">
                  <CardContent className="p-5 sm:p-6">
                    {/* header row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <CardTitle
                        id={`session-title-${session.id}`}
                        className="text-lg sm:text-xl md:text-2xl font-semibold text-primary"
                      >
                        {session.title}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className="text-xs sm:text-sm md:text-base whitespace-nowrap"
                      >
                        Session {idx + 1}
                      </Badge>
                    </div>

                    {/* description */}
                    {session.description ? (
                      <CardDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 text-start">
                        {session.description}
                      </CardDescription>
                    ) : (
                      <CardDescription className="text-sm italic text-muted-foreground mb-4">
                        No description provided.
                      </CardDescription>
                    )}

                    {/* time + venue */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-primary/90 text-sm sm:text-base">
                        <IconClock className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" aria-hidden />
                        <span>{formatSessionRange(session.startTime, session.endTime)}</span>
                      </div>
                      {session.venue?.name && (
                        <div className="flex items-center gap-2 text-primary/90 text-sm sm:text-base">
                          <IconMapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" aria-hidden />
                          <span>
                            {session.venue.name}
                            {session.venue.city ? `, ${session.venue.city}` : ""}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div>
        </div>
      </Card>
    </motion.section>
  );
}

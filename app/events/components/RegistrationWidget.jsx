"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  parseISO,
  differenceInSeconds,
  isAfter,
  isBefore,
} from "date-fns";

import {
  IconCalendar,
  IconUsers,
  IconMapPin,
  IconTicket,
  IconClock,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { formatFullTimeline } from "@/lib/timelineFormate";

// --------------------------------------
// Main Component
// --------------------------------------
export default function RegistrationWidget({ event }) {
  const [timeLeft, setTimeLeft] = useState(null);

  // --- Registration Logic ---
  const regStart = event.registrationStart ? parseISO(event.registrationStart) : null;
  const regEnd   = event.registrationEnd   ? parseISO(event.registrationEnd)   : null;
  const regIsOpen = Boolean(event.isRegistrationOpen);

  const now = new Date();
  const registrationActive =
    regIsOpen && regStart && regEnd && isAfter(now, regStart) && isBefore(now, regEnd);

  // --- Capacity & Sold Tickets ---
  const { totalCapacity, totalSold, spotsRemaining } = useMemo(() => {
    const capacity = event.tickets?.reduce((sum, t) => sum + (t.capacity || 0), 0) || 0;
    const sold     = event.tickets?.reduce((sum, t) => sum + (t.sold || 0), 0) || 0;
    return {
      totalCapacity: capacity,
      totalSold: sold,
      spotsRemaining: Math.max(capacity - sold, 0),
    };
  }, [event.tickets]);

  // --- Availability Message ---
  const availability = useMemo(() => {
    if (spotsRemaining <= 0) return { text: "Sold Out", variant: "destructive", urgent: true };
    const pct = (spotsRemaining / totalCapacity) * 100;
    if (pct <= 10)  return { text: `Only ${spotsRemaining} left!`, variant: "destructive", urgent: true };
    if (pct <= 25)  return { text: "Almost sold out", variant: "destructive", urgent: true };
    if (pct <= 50)  return { text: "Filling fast", variant: "default", urgent: true };
    if (pct <= 75)  return { text: "Good availability", variant: "secondary", urgent: false };
    return { text: "Available", variant: "secondary", urgent: false };
  }, [spotsRemaining, totalCapacity]);

  // --- Countdown Timer ---
  useEffect(() => {
    if (!regEnd) return;
    const update = () => {
      const diff = differenceInSeconds(regEnd, new Date());
      if (diff <= 0) setTimeLeft(null);
      else {
        setTimeLeft({
          days: Math.floor(diff / 86400),
          hours: Math.floor((diff % 86400) / 3600),
          minutes: Math.floor((diff % 3600) / 60),
          seconds: diff % 60,
        });
      }
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [regEnd]);

  // --------------------------------------
  // Render
  // --------------------------------------
  return (
    <Card
      role="complementary"
      aria-label="Event registration section"
      className="p-0 border-t-4 border-t-primary shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <CardContent className="p-4 sm:p-6 space-y-6">
        {/* Event Info */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Event Date */}
          <InfoCard
            icon={<IconCalendar className="w-5 h-5 text-primary" />}
            title="Event Date"
            value={
              event.sessions?.length
                ? formatFullTimeline(event.sessions)
                : "Date TBD"
            }
            gradient="from-background to-primary/5"
          />
          {/* Location */}
          <InfoCard
            icon={<IconMapPin className="w-5 h-5 text-primary" />}
            title="Location"
            value={event.sessions?.[0]?.venue?.name || "Venue TBD"}
            gradient="from-background to-secondary/5"
          />
        </motion.div>

        {/* Countdown */}
        {timeLeft && registrationActive && (
          <CountdownCard
            timeLeft={timeLeft}
            availability={availability}
            spotsRemaining={spotsRemaining}
            totalCapacity={totalCapacity}
            totalSold={totalSold}
          />
        )}

        {/* Registration Button / Alert */}
        <motion.div
          className="pt-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {registrationActive ? (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                className="
                  w-full font-semibold text-base py-4
                  bg-gradient-to-r from-primary to-primary/90
                  hover:from-primary/90 hover:to-primary
                  text-primary-foreground shadow-lg hover:shadow-xl
                  border border-primary/20 transition-all
                "
                asChild
              >
                <Link href={`/events/${event.slug}/registration`} aria-label="Register now">
                  <motion.div className="flex items-center gap-2" whileHover={{ x: 2 }}>
                    <IconTicket className="w-5 h-5" />
                    Register Now
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
          ) : (
            <Alert
              variant="destructive"
              className="border-destructive/30 bg-gradient-to-r from-destructive/5 to-destructive/10"
            >
              <IconTicket className="h-4 w-4" aria-hidden />
              <AlertTitle className="font-semibold ml-2">Registration Unavailable</AlertTitle>
              <AlertDescription className="mt-1 text-sm">
                {!regIsOpen
                  ? "Registration is closed for this event."
                  : spotsRemaining <= 0
                  ? "Event is fully booked."
                  : "Registration period has ended."}
              </AlertDescription>
            </Alert>
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
}

// --------------------------------------
// Reusable Sub-components
// --------------------------------------

function InfoCard({ icon, title, value, gradient }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 280 }}>
      <Card
        className={`p-0 transition-all duration-300 hover:shadow-md border-border/60 bg-gradient-to-br ${gradient}`}
      >
        <CardContent className="flex items-center gap-3 p-4">
          <div
            className="
              p-2 rounded-lg border
              border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5
            "
          >
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground font-medium">{title}</p>
            <p className="font-semibold text-sm text-foreground truncate">{value}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function CountdownCard({ timeLeft, availability, spotsRemaining, totalCapacity, totalSold }) {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-gradient-to-br from-card via-card to-muted/20 border-border/60 shadow-lg">
        <CardContent className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3 justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-3 h-3 bg-destructive rounded-full shadow-lg"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <IconClock className="w-4 h-4 text-destructive" aria-hidden />
              <span className="text-sm font-semibold text-foreground">
                Registration closes in
              </span>
            </div>

            <Card
              className={`${
                availability.variant === "destructive"
                  ? "border-destructive/30 bg-gradient-to-r from-destructive/5 to-destructive/10"
                  : "border-green-500/30 bg-gradient-to-r from-green-500/5 to-green-500/10"
              } shadow-sm`}
            >
              <CardContent className="flex items-center gap-3 py-1 px-3">
                <motion.div
                  className={`w-3 h-3 rounded-full ${
                    availability.urgent ? "bg-destructive" : "bg-green-500"
                  }`}
                  animate={
                    availability.urgent
                      ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }
                      : {}
                  }
                  transition={{ duration: 1.8, repeat: availability.urgent ? Infinity : 0 }}
                />
                <span className="text-sm font-semibold">{availability.text}</span>
                {(spotsRemaining <= 0 || (spotsRemaining / totalCapacity) * 100 <= 25) && (
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <IconUsers className="w-4 h-4" />
                    {totalSold}/{totalCapacity}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Timer */}
          <div className="flex items-center justify-center gap-2 font-mono">
            {[
              { value: timeLeft.days, label: "DAYS" },
              { value: timeLeft.hours, label: "HRS" },
              { value: timeLeft.minutes, label: "MIN" },
              { value: timeLeft.seconds, label: "SEC" },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center">
                <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.05 }}>
                  <Card className="bg-gradient-to-b from-muted/80 to-muted border-border/60 shadow-sm">
                    <CardContent className="px-3 py-2 min-w-[3rem] text-center">
                      <motion.span
                        className={`text-xl font-bold ${item.label === "SEC" ? "text-primary" : "text-foreground"}`}
                        key={item.value}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 280 }}
                      >
                        {String(item.value).padStart(2, "0")}
                      </motion.span>
                    </CardContent>
                  </Card>
                  <span className="text-xs text-muted-foreground mt-1 font-medium tracking-wider">
                    {item.label}
                  </span>
                </motion.div>
                {i < 3 && (
                  <motion.span
                    className="text-muted-foreground text-xl mx-1"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    :
                  </motion.span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

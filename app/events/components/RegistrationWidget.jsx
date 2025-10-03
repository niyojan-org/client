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

/* ------------------------------------------------------------------ */
/*                           Main Component                           */
/* ------------------------------------------------------------------ */
export default function RegistrationWidget({ event }) {
  const [timeLeft, setTimeLeft] = useState(null);

  // Registration Logic
  const regStart = event.registrationStart ? parseISO(event.registrationStart) : null;
  const regEnd   = event.registrationEnd   ? parseISO(event.registrationEnd)   : null;
  const regIsOpen = Boolean(event.isRegistrationOpen);

  const now = new Date();
  const registrationActive =
    regIsOpen && regStart && regEnd && isAfter(now, regStart) && isBefore(now, regEnd);

  // Capacity & Sold Tickets
  const { totalCapacity, totalSold, spotsRemaining } = useMemo(() => {
    const capacity = event.tickets?.reduce((sum, t) => sum + (t.capacity || 0), 0) || 0;
    const sold     = event.tickets?.reduce((sum, t) => sum + (t.sold || 0), 0) || 0;
    return {
      totalCapacity: capacity,
      totalSold: sold,
      spotsRemaining: Math.max(capacity - sold, 0),
    };
  }, [event.tickets]);

  // Availability Message
  const availability = useMemo(() => {
    if (spotsRemaining <= 0) return { text: "Sold Out", variant: "destructive", urgent: true };
    const pct = (spotsRemaining / totalCapacity) * 100;
    if (pct <= 10)  return { text: `Only ${spotsRemaining} left!`, variant: "destructive", urgent: true };
    if (pct <= 25)  return { text: "Almost sold out", variant: "destructive", urgent: true };
    if (pct <= 50)  return { text: "Filling fast", variant: "default", urgent: true };
    if (pct <= 75)  return { text: "Good availability", variant: "secondary", urgent: false };
    return { text: "Available", variant: "secondary", urgent: false };
  }, [spotsRemaining, totalCapacity]);

  // Countdown Timer
  const regEndDate = useMemo(
    () => (event.registrationEnd ? parseISO(event.registrationEnd) : null),
    [event.registrationEnd]
  );

  useEffect(() => {
    if (!regEndDate) return;
    const update = () => {
      const diff = differenceInSeconds(regEndDate, new Date());
      setTimeLeft(
        diff <= 0
          ? null
          : {
              days: Math.floor(diff / 86400),
              hours: Math.floor((diff % 86400) / 3600),
              minutes: Math.floor((diff % 3600) / 60),
              seconds: diff % 60,
            }
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [regEndDate]);

  /* -----------------------------  Render  ------------------------------ */
  return (
    <Card
      role="complementary"
      aria-label="Event registration section"
      className="
        rounded-2xl
        bg-white/60 dark:bg-slate-800/40
        backdrop-blur-md
        border border-white/20 dark:border-white/10
        shadow-xl hover:shadow-2xl
        transition-all duration-300 py-0
      "
    >
      <CardContent className="p-5 sm:p-6 space-y-5">
        {/* Event Info */}
        <motion.div
          className="grid grid-cols-1  md:grid-cols-2 gap-10"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.4 }}
        >
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
          <InfoCard
            icon={<IconMapPin className="w-5 h-5 text-primary" />}
            title="Location"
            value={event.sessions?.[0]?.venue?.name || "Venue TBD"}
            gradient="from-background to-secondary/5"
          />
          {/* <InfoCard
            icon={<IconUsers className="w-5 h-5 text-primary" />}
            title="Capacity"
            value={`${totalSold}/${totalCapacity} seats filled`}
            gradient="from-background to-accent/5"
          /> */}
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
                  w-full rounded-full px-6 py-4
                  bg-primary hover:bg-primary/90
                  text-white font-semibold text-base
                  shadow-lg hover:shadow-xl transition-all
                "
                asChild
              >
                <Link href={`/events/${event.slug}/registration`} aria-label="Register now">
                  <motion.div className="flex items-center justify-center gap-2" whileHover={{ x: 2 }}>
                    <IconTicket className="w-5 h-5" />
                    Grab Your Spot
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
          ) : (
            <Alert
              variant="destructive"
              className="rounded-xl border-destructive/30 bg-gradient-to-r from-destructive/10 to-destructive/5"
            >
              <IconTicket className="h-4 w-4 shrink-0" aria-hidden />
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

/* ------------------------------------------------------------------ */
/*                       Reusable Sub-components                      */
/* ------------------------------------------------------------------ */

function InfoCard({ icon, title, value, gradient }) {
  return (
    <motion.div whileHover={{ scale: 1.04 }} transition={{ type: "spring", stiffness: 280 }}>
      <Card
        className={`rounded-xl border-border/40 bg-gradient-to-br ${gradient} hover:shadow-md transition-all duration-300`}
      >
        <CardContent className="flex items-center gap-3 p-4">
          <div
            className="
              p-2 rounded-lg border
              border-primary/20 bg-primary/10
            "
          >
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground font-medium tracking-wide">{title}</p>
            <p className="font-semibold text-sm sm:text-base text-foreground truncate">{value}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function CountdownCard({ timeLeft, availability, spotsRemaining, totalCapacity, totalSold }) {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="rounded-xl bg-gradient-to-br from-card via-card to-muted/20 border-border/60 shadow-lg">
        <CardContent className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3 justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-3 h-3 bg-destructive rounded-full shadow-lg"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <IconClock className="w-4 h-4 text-destructive" aria-hidden />
              <span className="text-sm font-semibold text-foreground tracking-wide">
                Registration closes in
              </span>
            </div>

            <Card
              className={`rounded-lg ${
                availability.variant === "destructive"
                  ? "border-destructive/30 bg-gradient-to-r from-destructive/5 to-destructive/10"
                  : "border-success/30 bg-gradient-to-r from-success/5 to-success/10"
              } shadow-sm`}
            >
              <CardContent className="flex items-center gap-3 py-1 px-3">
                <motion.div
                  className={`w-3 h-3 rounded-full ${
                    availability.urgent ? "bg-destructive" : "bg-success"
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
                  <Card className="rounded-full bg-white/20 dark:bg-slate-900/30 backdrop-blur border border-white/10 shadow-sm">
                    <CardContent className="px-3 py-2 min-w-[3rem] text-center">
                      <motion.span
                        className={`text-xl font-bold ${
                          item.label === "SEC" ? "text-primary" : "text-foreground"
                        }`}
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

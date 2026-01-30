"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { parseISO, differenceInSeconds, isAfter, isBefore } from "date-fns";
import { IconCalendar, IconUsers, IconMapPin, IconTicket, IconClock } from "@tabler/icons-react";

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

  const regStart = event.registrationStart ? parseISO(event.registrationStart) : null;
  const regEnd = event.registrationEnd ? parseISO(event.registrationEnd) : null;
  const regIsOpen = Boolean(event.isRegistrationOpen);

  const now = new Date();
  const registrationActive =
    regIsOpen && regStart && regEnd && isAfter(now, regStart) && isBefore(now, regEnd);

  const { totalCapacity, totalSold, spotsRemaining } = useMemo(() => {
    const capacity = event.tickets?.reduce((sum, t) => sum + (t.capacity || 0), 0) || 0;
    const sold = event.tickets?.reduce((sum, t) => sum + (t.sold || 0), 0) || 0;
    return {
      totalCapacity: capacity,
      totalSold: sold,
      spotsRemaining: Math.max(capacity - sold, 0),
    };
  }, [event.tickets]);

  const availability = useMemo(() => {
    if (spotsRemaining <= 0) return { text: "Sold Out", variant: "destructive", urgent: true };
    const pct = (spotsRemaining / totalCapacity) * 100;
    if (pct <= 10)
      return {
        text: `Only ${spotsRemaining} left!`,
        variant: "destructive",
        urgent: true,
      };
    if (pct <= 25) return { text: "Almost sold out", variant: "destructive", urgent: true };
    if (pct <= 50) return { text: "Filling fast", variant: "default", urgent: true };
    if (pct <= 75) return { text: "Good availability", variant: "secondary", urgent: false };
    return { text: "Available", variant: "secondary", urgent: false };
  }, [spotsRemaining, totalCapacity]);

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

  /* ------------------------------------------------------------------ */
  /*                               Render                               */
  /* ------------------------------------------------------------------ */
  return (
    <Card
      role="complementary"
      aria-label="Event registration section"
      className="
        rounded-xl sm:rounded-2xl
        bg-linear-to-br from-background/80 to-card/80
        backdrop-blur-md border border-border/40
        shadow-lg hover:shadow-xl
        transition-all duration-300 p-0 px-0 sm:px-0 py-0 pb-4
      "
    >
      <CardContent className="sm:p-4 space-y-3 sm:space-y-3 w-full  p-0">
        {/* Event Info */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 w-full"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <InfoCard
            icon={<IconCalendar className="w-5 h-5 text-primary" />}
            title="Event Date"
            value={event.sessions?.length ? formatFullTimeline(event.sessions) : "Date TBD"}
          />
          <InfoCard
            icon={<IconMapPin className="w-5 h-5 text-primary" />}
            title="Location"
            value={event.sessions?.[0]?.venue?.name || "Venue TBD"}
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

        {/* Button / Alert */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center sm:justify-end mt-4 w-full "
        >
          {registrationActive ? (
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full px-4">
              <Button className={"w-full"} >
                <Link href={`/events/${event.slug}/registration`}>
                  <IconTicket className="w-5 h-5" />
                  Grab Your Spot
                </Link>
              </Button>
            </motion.div>
          ) : (
            <Alert
              variant="destructive"
              className="rounded-xl border-destructive/40
                 bg-linear-to-r from-destructive/10 to-destructive/5
                 flex items-start gap-3"
            >
              <IconTicket className="h-5 w-5 shrink-0 mt-0.5" aria-hidden />
              <div>
                <AlertTitle className="font-semibold">Registration Unavailable</AlertTitle>
                <AlertDescription className="text-sm">
                  {!regIsOpen
                    ? "Registration is closed for this event."
                    : spotsRemaining <= 0
                    ? "Event is fully booked."
                    : "Registration period has ended."}
                </AlertDescription>
              </div>
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

function InfoCard({ icon, title, value }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="rounded-xl border border-border/40 bg-card hover:bg-accent/5 transition-all py-0">
        <CardContent className="flex items-center gap-3 p-4 sm:p-3">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">{icon}</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              {title}
            </p>
            <p className="font-semibold text-sm sm:text-base truncate">{value}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function CountdownCard({ timeLeft, availability, spotsRemaining, totalCapacity, totalSold }) {
  const formatTime = (value) => String(value).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.5 }}
    >
      <Card className="rounded-xl">
        <CardContent className=" sm:p-5 space-y-2">
          {/* Header */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2.5 h-2.5 bg-destructive rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <IconClock className="w-4 h-4 text-destructive" aria-hidden />
              <span className="text-sm font-semibold text-foreground">Registration closes in</span>
            </div>

            <div
              className={`
                flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold shadow-sm
                ${
                  availability.variant === "destructive"
                    ? "bg-destructive/10 text-destructive"
                    : "bg-success/10 text-success"
                }
              `}
            >
              {availability.text}
              {(spotsRemaining <= 0 || (spotsRemaining / totalCapacity) * 100 <= 25) && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <IconUsers className="w-4 h-4" />
                  {totalSold}/{totalCapacity}
                </span>
              )}
            </div>
          </div>

          <Separator className="bg-border/40" />

          {/* Compact Digital Timer */}
          <div className="flex justify-center">
            <motion.div
              key={`${timeLeft.days}-${timeLeft.hours}-${timeLeft.minutes}-${timeLeft.seconds}`}
              // initial={{ opacity: 0, y: 5 }}
              // animate={{ opacity: 1, y: 0 }}
              // transition={{ duration: 0.3 }}
              className="
                font-source-sans-3 text-lg sm:text-2xl font-bold 
                text-center tracking-widest
                bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent
              "
            >
              {timeLeft.days}d{" : "}
              {formatTime(timeLeft.hours)}h{" : "}
              {formatTime(timeLeft.minutes)}m{" : "}
              {formatTime(timeLeft.seconds)}s
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

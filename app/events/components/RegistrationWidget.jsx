"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    parseISO,
    differenceInSeconds,
    isAfter,
    isBefore
} from "date-fns";
import {
    IconCalendar,
    IconUsers,
    IconMapPin,
    IconTicket,
    IconClock
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { formatFullTimeline } from "@/lib/timelineFormate";

export default function RegistrationWidget({ event }) {
    const [timeLeft, setTimeLeft] = useState(null);
    // Registration logic
    const regStart = event.registrationStart ? parseISO(event.registrationStart) : null;
    const regEnd = event.registrationEnd ? parseISO(event.registrationEnd) : null;
    const regIsOpen = event.isRegistrationOpen;

    const now = new Date();
    const registrationActive =
        regIsOpen &&
        regStart &&
        regEnd &&
        isAfter(now, regStart) &&
        isBefore(now, regEnd);

    // Calculate total capacity and sold tickets
    const totalCapacity = event.tickets?.reduce((sum, ticket) => sum + ticket.capacity, 0) || 0;
    const totalSold = event.tickets?.reduce((sum, ticket) => sum + ticket.sold, 0) || 0;
    const spotsRemaining = totalCapacity - totalSold;

    // Smart availability messaging based on percentage
    const getAvailabilityMessage = () => {
        if (spotsRemaining <= 0) return { text: "Sold Out", variant: "destructive", urgent: true };

        const percentageRemaining = (spotsRemaining / totalCapacity) * 100;

        if (percentageRemaining <= 10) return { text: `Only ${spotsRemaining} left!`, variant: "destructive", urgent: true };
        if (percentageRemaining <= 25) return { text: "Almost sold out", variant: "destructive", urgent: true };
        if (percentageRemaining <= 50) return { text: "Filling fast", variant: "default", urgent: true };
        if (percentageRemaining <= 75) return { text: "Good availability", variant: "secondary", urgent: false };
        return { text: "Available", variant: "secondary", urgent: false };
    };

    const availability = getAvailabilityMessage();

    useEffect(() => {
        if (!regEnd) return;
        const iv = setInterval(() => {
            const diff = differenceInSeconds(regEnd, new Date());
            if (diff <= 0) {
                clearInterval(iv);
                setTimeLeft(null);
            } else {
                setTimeLeft({
                    days: Math.floor(diff / 86400),
                    hours: Math.floor((diff % 86400) / 3600),
                    minutes: Math.floor((diff % 3600) / 60),
                    seconds: diff % 60,
                });
            }
        }, 1000);
        return () => clearInterval(iv);
    }, [regEnd]);

    return (

        <Card className="p-0 border-t-4 border-t-primary shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
                <div className="space-y-4">
                    {/* Event Info - Enhanced */}
                    <div className="flex-1 space-y-4">
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Card className="p-0 transition-all duration-300 hover:shadow-md border-border/60 bg-gradient-to-br from-background to-primary/5">
                                    <CardContent className="flex items-center gap-3 p-3">
                                        <motion.div
                                            className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg border border-primary/20"
                                            whileHover={{ rotate: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <IconCalendar className="w-4 h-4 text-primary" />
                                        </motion.div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-muted-foreground font-medium">Event Date</p>
                                            <p className="font-semibold text-sm truncate text-foreground">
                                                {event.sessions?.length
                                                    ? formatFullTimeline(event.sessions)
                                                    : "Date TBD"
                                                }
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Card className="p-0 transition-all duration-300 hover:shadow-md border-border/60 bg-gradient-to-br from-background to-secondary/5">
                                    <CardContent className="flex items-center gap-3 p-3">
                                        <motion.div
                                            className="p-2 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg border border-secondary/20"
                                            whileHover={{ rotate: -5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <IconMapPin className="w-4 h-4 text-primary" />
                                        </motion.div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-muted-foreground font-medium">Location</p>
                                            <p className="font-semibold text-sm truncate text-foreground">
                                                {event.sessions?.[0]?.venue?.name || "Venue TBD"}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </motion.div>

                        {/* Smart Availability Status - Enhanced */}

                        {/* Digital Clock Countdown Timer - Enhanced */}
                        {timeLeft && registrationActive && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.4 }}
                            >
                                <Card className="bg-gradient-to-br from-card via-card to-muted/20 border-border/60 p-0 shadow-lg">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <motion.div
                                                className="w-3 h-3 bg-destructive rounded-full shadow-lg "
                                                animate={{
                                                    scale: [1, 1.3, 1],
                                                    opacity: [1, 0.6, 1]
                                                }}
                                                transition={{
                                                    duration: 1.5,
                                                    repeat: Infinity
                                                }}
                                            />
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center gap-2">
                                                    <IconClock className="w-4 h-4 text-destructive" />
                                                    <p className="text-sm font-semibold text-foreground">Registration closes in</p>
                                                </div>

                                                <Card className={`${availability.variant === 'destructive'
                                                    ? 'border-destructive/30 bg-gradient-to-r from-destructive/5 to-destructive/10'
                                                    : 'border-green-500/30 bg-gradient-to-r from-green-500/5 to-green-500/10'
                                                    } p-0 shadow-sm`}>
                                                    <CardContent className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <motion.div
                                                                className={`w-3 h-3 rounded-full ${availability.urgent
                                                                    ? 'bg-destructive shadow-lg'
                                                                    : 'bg-green-500'
                                                                    }`}
                                                                animate={availability.urgent ? {
                                                                    scale: [1, 1.2, 1],
                                                                    opacity: [1, 0.7, 1]
                                                                } : {}}
                                                                transition={{
                                                                    duration: 2,
                                                                    repeat: availability.urgent ? Infinity : 0
                                                                }}
                                                            />
                                                            <span className="text-sm font-semibold text-foreground">
                                                                {availability.text}
                                                            </span>
                                                        </div>
                                                        {(spotsRemaining <= 0 || (spotsRemaining / totalCapacity) * 100 <= 25) && (
                                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                                <IconUsers className="w-4 h-4" />
                                                                <span className="text-xs font-medium">
                                                                    {totalSold}/{totalCapacity}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            </div>

                                        </div>
                                        <Separator className="mb-4 bg-gradient-to-r from-transparent via-border to-transparent" />
                                        <div className="flex items-center justify-center gap-2 font-mono">
                                            {[
                                                { value: timeLeft.days, label: 'DAYS' },
                                                { value: timeLeft.hours, label: 'HRS' },
                                                { value: timeLeft.minutes, label: 'MIN' },
                                                { value: timeLeft.seconds, label: 'SEC' }
                                            ].map((item, index) => (
                                                <div key={item.label} className="flex items-center">
                                                    <motion.div
                                                        className="flex flex-col items-center"
                                                        whileHover={{ scale: 1.05 }}
                                                        transition={{ type: "spring", stiffness: 300 }}
                                                    >
                                                        <Card className="bg-gradient-to-b from-muted/80 to-muted border-border/60 p-0 shadow-sm">
                                                            <CardContent className="px-3 py-2 min-w-[3rem] text-center">
                                                                <motion.span
                                                                    className={`text-xl font-bold ${item.label === 'SEC' ? 'text-primary' : 'text-foreground'
                                                                        }`}
                                                                    key={item.value}
                                                                    initial={{ scale: 0.8 }}
                                                                    animate={{ scale: 1 }}
                                                                    transition={{ type: "spring", stiffness: 300 }}
                                                                >
                                                                    {item.value.toString().padStart(2, '0')}
                                                                </motion.span>
                                                            </CardContent>
                                                        </Card>
                                                        <span className="text-xs text-muted-foreground mt-1 font-medium tracking-wider">
                                                            {item.label}
                                                        </span>
                                                    </motion.div>
                                                    {index < 3 && (
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
                        )}
                    </div>

                    {/* Registration Button - Enhanced */}
                    <motion.div
                        className="pt-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                    >
                        {registrationActive ? (
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Button
                                    size="lg"
                                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-base py-4 border border-primary/20"
                                    asChild
                                >
                                    <Link href={`/events/${event.slug}/registration`}>
                                        <motion.div
                                            className="flex items-center gap-2"
                                            whileHover={{ x: 2 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <IconTicket className="w-5 h-5" />
                                            Register Now
                                        </motion.div>
                                    </Link>
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1, duration: 0.3 }}
                            >
                                <Alert variant="destructive" className="border-destructive/30 bg-gradient-to-r from-destructive/5 to-destructive/10">
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        <IconTicket className="h-4 w-4" />
                                    </motion.div>
                                    <AlertTitle className="font-semibold">Registration Unavailable</AlertTitle>
                                    <AlertDescription className="mt-1">
                                        {!regIsOpen
                                            ? "Registration is closed for this event"
                                            : spotsRemaining <= 0
                                                ? "Event is fully booked"
                                                : "Registration period has ended"
                                        }
                                    </AlertDescription>
                                </Alert>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </CardContent>
        </Card>
    );
}

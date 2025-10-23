"use client";
import Link from "next/link";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  IconCalendar,
  IconBuilding,
  IconMapPin,
  IconStarFilled,
  IconDeviceDesktopAnalytics,
  IconCategory2,
  IconTopologyStar,
  IconRosetteDiscountCheck,
  IconCurrencyRupee,
  IconConfetti,
} from "@tabler/icons-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function EventCard({ event }) {
  const session = event.sessions?.[0] || {};
  const startTime = session.startTime || event.startTime || null;
  const registrationEnd = event.registrationEnd || null;
  const venue = session.venue || event.venue || {};
  const org = event.organization || {};

  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    if (!registrationEnd) return;

    const updateTimer = () => {
      const end = new Date(registrationEnd).getTime();
      const now = Date.now();
      const diff = end - now;

      if (diff <= 0) {
        setIsClosed(true);
        setTime({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }

      setTime({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [registrationEnd]);

  const isPaid = event.tickets?.some((t) => t.price > 0) || false;
  const isFeatured = event.featured || false;
  const isVerified = org?.verified || false;

  return (
    <Card className="p-2 gap-0">
      {/* IMAGE */}

      <CardHeader className={"px-0 relative"}>
        <Image
          src={event.bannerImage || event.banner_image || "https://res.cloudinary.com/ddk9qhmit/image/upload/v1761137533/orgatickBanner_vdyzdk.png"}
          alt={event.title || event.name || "Event"}
          width={800}
          height={400}
          className="w-full h-50 rounded-xl object-cover group-hover:brightness-90 transition duration-300"
        />
        {isFeatured && (
          <Badge
            className="absolute top-4 left-4 flex items-center gap-1"
            variant="destructive"
          >
            <IconStarFilled size={14} /> Featured
          </Badge>
        )}

        {isVerified && (
          <Badge
            className="absolute top-4 right-4 flex items-center gap-1 "
            variant={"success"}
          >
            <IconRosetteDiscountCheck /> Verified
          </Badge>
        )}
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="flex flex-col justify-between flex-1">
        {/* TIMER OR REGISTRATION ENDED */}

        {registrationEnd && (
          <div className="flex justify-center items-center my-auto">
            {!isClosed ? (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground font-bold text-center">
                  Registration ends in:
                </p>
                <div className="flex justify-evenly text-center text-primary font-mono font-bold">
                  {["Days", "Hours", "Min", "Sec"].map((label, idx, arr) => {
                    const val = Object.values(time)[idx];
                    return (
                      <React.Fragment key={label}>
                        <div className="flex flex-col rounded-xl">
                          <span className="text-xl">
                            {String(val).padStart(2, "0")}
                          </span>
                          <span className="text-xs">{label}</span>
                        </div>
                        {idx < arr.length - 1 && (
                          <span className="mx-2 text-xl">:</span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="text-center text text-destructive font-semibold tracking-widest">
                REGISTRATION ENDED
              </p>
            )}
          </div>
        )}

        {/* META INFO */}
        <div className="flex flex-col space-y-1.5 text-sm text-muted-foreground mt-2">
          {/* TITLE */}
          <h3 className="text-xl font-bold text-foreground leading-tight tracking-wider">
            {(event.title || event.name || "")
              .split(" ")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ")}
          </h3>

          {/* ORGANIZATION */}
          {org?.name && (
            <div className="flex items-center gap-2">
              <IconBuilding size={16} className="text-primary" />
              <span>
                <span className="font-semibold text-foreground">
                  Organization:
                </span>{" "}
                {org.name}
              </span>
            </div>
          )}

          {/* DATE */}
          {startTime && (
            <div className="flex items-center gap-2">
              <IconCalendar size={16} className="text-primary" />
              <span>
                <span className="font-semibold text-foreground">
                  Date & Time:
                </span>{" "}
                {format(new Date(startTime), "MMM d, yyyy • h:mm a")}
              </span>
            </div>
          )}

          {/* VENUE */}
          {venue?.address && (
            <div className="flex space-x-2">
              <IconMapPin size={16} className="text-primary" />
              <div className="text-clip line-clamp-1 w-full">
                <span className="font-semibold text-foreground">Place:</span>{" "}
                <span className="">
                  {venue.name}, {venue.address}
                </span>
              </div>
            </div>
          )}

          {/* MODE */}
          {event.mode && (
            <div className="flex items-center gap-2">
              <IconDeviceDesktopAnalytics size={16} className="text-primary" />
              <span>
                <span className="font-semibold text-foreground">Mode:</span>{" "}
                {event.mode}
              </span>
            </div>
          )}

          {/* CATEGORY */}
          {event.category && (
            <div className="flex items-center gap-2">
              <IconCategory2 size={16} className="text-primary" />
              <span>
                <span className="font-semibold text-foreground">Category:</span>{" "}
                {event.category}
              </span>
            </div>
          )}

          {/* TYPE */}
          {event.type && (
            <div className="flex items-center gap-2">
              <IconTopologyStar size={16} className="text-primary" />
              <span>
                <span className="font-semibold text-foreground">Type:</span>{" "}
                {event.type}
              </span>
            </div>
          )}

          {/* FREE / PAID */}
          <div className="flex items-center wrap gap-2">
            {event.tickets.map((t) => (
              <Badge key={t._id} variant={t.price > 0 ? "default" : "success"} asChild>
                <Link href={`/events/${event.slug || event._id}/registration?ticketId=${t._id}`}>
                  {t.price > 0 ? <IconCurrencyRupee size={14} className="inline" /> : <IconConfetti size={14} className="inline" />}
                  {t.price > 0 ? t.price : "Free"} - {t.type || "General"}
                </Link>
              </Badge>
            ))}
          </div>
        </div>

        {/* VIEW DETAILS */}
        <Button asChild className="mt-5 mb-4 text-primary-foreground cursor-pointer">
          <Link href={`/events/${event.slug || event.id}`}>View Event Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState, useEffect } from "react";
import { IconSparkles } from "@tabler/icons-react";

import EventsList from "./components/EventList";
import useEventStore from "@/store/eventStore";
import SearchBar from "./components/SearchBar";
import { EventCardSkeleton } from "./components/EventCardSkeleton";
import {
  Status,
  StatusIndicator,
  StatusLabel,
} from "@/components/ui/shadcn-io/status";

export default function EventsPage() {
  const {
    fetchAllEvents,
    fetchFeaturedEvents,
    fetchEventCategories,
    allEvents,
    eventCategories,
    availableModes,
    error,
    loading,
  } = useEventStore();

  useEffect(() => {
    const loadAll = async () => {
      try {
        await Promise.all([
          fetchFeaturedEvents(),
          fetchAllEvents(),
          fetchEventCategories(),
        ]);
      } catch {
        console.error("Failed to load data");
      }
    };
    loadAll();
  }, []);

  // 🧠 Sort events: Featured → Open → Ended
  const sortedEvents = [...allEvents].sort((a, b) => {
    // Helper: assign a priority based on status/type
    const getPriority = (event) => {
      if (event.featured) return 1; // Highest priority
      if (event.status === "open" || event.registrationOpen) return 2;
      if (event.status === "ended" || event.isEnded) return 3;
      return 4;
    };

    return getPriority(a) - getPriority(b);
  });

  return (
    <div className="flex min-h-screentransition-colors duration-300">

      <main className="flex-1 overflow-auto pt-[72px] px-4 sm:px-6 lg:px-8">
        {/* Compact Header */}
        <header className="mb-2 mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8">
            {/* Title Section */}
            <div className="">
              <div className="flex items-center gap-3">
                <div className="h-12 w-1.5 bg-gradient-to-b from-primary via-accent to-primary/50 rounded-full shadow-sm" />
                <div className="flex gap-4 items-center md:flex-row flex-col">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
                    Discover Events
                  </h1>
                  <div className="flex h-6 items-center px-2 rounded-full bg-primary/5 text-primary border border-primary/10 text-sm font-medium">
                    <IconSparkles className="w-4 h-4 mr-2" />
                    Discover Amazing Events
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base max-w-full leading-relaxed mt-1">
                Find amazing events happening around you and connect with your
                community
              </p>

              <Status
                variant="outline"
                status="online"
                className="flex items-center gap-2 mt-3 rounded-full border border-primary/10 bg-primary/5 px-3 text-sm"
              >
                <div className="flex items-center gap-1">
                  <StatusIndicator />
                  <StatusLabel className="font-medium text-primary">
                    Live
                  </StatusLabel>
                </div>
                <span className="text-muted-foreground">
                  • Updated just now
                </span>
              </Status>
            </div>

            {/* Search Section */}
            <div className="w-full lg:max-w-md lg:min-w-96">
              <SearchBar
                eventCategories={eventCategories}
                availableModes={availableModes}
              />
            </div>
          </div>
        </header>

        {/* Events Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, idx) => (
              <EventCardSkeleton key={idx} />
            ))}
          </div>
        ) : (
          <EventsList events={sortedEvents} />
        )}
      </main>
    </div>
  );
}

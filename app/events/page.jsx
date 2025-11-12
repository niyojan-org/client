"use client";

import { IconSparkles, IconCalendarOff } from "@tabler/icons-react";
import EventsList from "./components/EventList";
import SearchBar from "./components/SearchBar";
import { EventCardSkeleton } from "./components/EventCardSkeleton";
import {
  Status,
  StatusIndicator,
  StatusLabel,
} from "@/components/ui/shadcn-io/status";
import useEvents from "@/hooks/useEvents";
import { Card } from "@/components/ui/card";

export default function EventsPage() {
  const { allEvents, categories, loading, error } = useEvents();

  return (
    <div className="flex transition-colors duration-300">
      <main className="flex-1 overflow-auto mt-[20px] mb-20">
        {/* Header */}
        <header className="mb-6 mx-auto" aria-label="Events page header">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8">
            {/* Left section */}
            <div>
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
                community.
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

            {/* Right section (Search) */}
            {!loading && allEvents.length > 0 && (
              <div className="w-full lg:max-w-md lg:min-w-96 transition-all duration-300">
                <SearchBar eventCategories={categories} />
              </div>
            )}
          </div>
        </header>

        {/* Events Content */}
        <section aria-label="Events content">
          {loading ? (
            // Loading skeletons
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, idx) => (
                <EventCardSkeleton key={idx} />
              ))}
            </div>
          ) : error ? (
            // Error state
            <Card className="p-6 text-center border border-destructive/30 bg-destructive/10 text-destructive font-medium">
              Failed to load events. Please try again later.
            </Card>
          ) : allEvents.length === 0 ? (
            // Empty state
            <Card className="flex flex-col items-center justify-center text-center py-16 px-4 mt-8 bg-muted/50 border border-border/50 rounded-lg">
              <div className="flex flex-col items-center space-y-3">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary">
                  <IconCalendarOff size={28} stroke={1.5} />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                  No Events Yet
                </h2>
                <p className="text-muted-foreground max-w-sm text-sm sm:text-base">
                  Stay tuned for upcoming university events! Check back soon for
                  new opportunities to connect and participate.
                </p>
              </div>
            </Card>
          ) : (
            // Events list
            <EventsList events={allEvents} />
          )}
        </section>
      </main>
    </div>
  );
}

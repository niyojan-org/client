"use client";

import { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { IconSearch, IconFilter, IconX } from "@tabler/icons-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import EventFilters from "./EventFilters";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import useEventStore from "@/store/eventStore";

const defaultFilters = {
  categories: [],
  modes: [],
  type: "",
  sortBy: "",
  sortOrder: "desc",
};

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

export default function SearchBar({
  eventCategories = [],
  availableModes = [],
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const { fetchAllEvents } = useEventStore();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Debounced search
  const searchEvents = useCallback(
    debounce(async (query, activeFilters = filters) => {
      setLoading(true);

      try {
        const params = {};

        // Only add non-empty parameters
        if (query?.trim()) {
          params.search = query.trim();
        }

        if (activeFilters.categories?.length > 0) {
          params.category = activeFilters.categories.join(',');
        }

        if (activeFilters.modes?.length > 0) {
          params.mode = activeFilters.modes.join(',');
        }

        if (activeFilters.type) {
          params.type = activeFilters.type;
        }

        if (activeFilters.sortBy) {
          params.sortBy = activeFilters.sortBy;
          params.sortOrder = activeFilters.sortOrder || 'desc';
        }

        console.log('SearchBar: Making API call with params:', params);
        await fetchAllEvents({ params });
      } catch (error) {
        console.error('SearchBar: Search failed:', error);
      } finally {
        setLoading(false);
      }
    }, 300),
    [fetchAllEvents]
  );

  useEffect(() => {
    console.log('SearchBar: Filters or search query changed:', { searchQuery, filters });
    console.log('SearchBar: Active filters count:', getActiveFiltersCount());
    searchEvents(searchQuery, filters);
    return () => searchEvents.cancel();
  }, [searchQuery, filters, searchEvents]);

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilters(defaultFilters);
    // Immediately trigger search with cleared filters
    searchEvents("", defaultFilters);
  };

  const handleQuickFilter = (filterType, filterValue) => {
    const newFilters = { ...filters };

    if (filterType === 'search') {
      setSearchQuery(filterValue);
    } else if (filterType === 'type') {
      newFilters.type = newFilters.type === filterValue ? "" : filterValue;
      setFilters(newFilters);
    } else if (filterType === 'mode') {
      if (newFilters.modes.includes(filterValue)) {
        newFilters.modes = newFilters.modes.filter(m => m !== filterValue);
      } else {
        newFilters.modes = [...newFilters.modes, filterValue];
      }
      setFilters(newFilters);
    }
  };

  const getActiveFiltersCount = () => {
    return filters.categories.length + filters.modes.length + (filters.type ? 1 : 0) + (filters.sortBy ? 1 : 0);
  };

  // Quick filter options
  const quickFilters = [
    {
      label: "Free",
      type: "type",
      value: "free",
      icon: "🆓",
      active: filters.type === "free"
    },
    {
      label: "Online",
      type: "mode",
      value: "online",
      icon: "💻",
      active: filters.modes.includes("online")
    },
    {
      label: "Today",
      type: "search",
      value: "today",
      icon: "📅",
      active: searchQuery.toLowerCase().includes("today")
    },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Main Search Bar - Using shadcn Card */}

      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <IconSearch
            size={18}
            className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${searchFocused ? 'text-primary' : 'text-muted-foreground'
              }`}
          />
          <Input
            type="text"
            placeholder="Search events, organizers, locations..."
            className="pl-10 pr-10 border-0 border-b bg-background focus:border-b-2 focus:border-b-primary focus-visible:ring-0 rounded-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            aria-label="Search events"
          />

          {/* Clear Button */}
          {(searchQuery || getActiveFiltersCount() > 0) && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              onClick={handleClearSearch}
              aria-label="Clear search and filters"
            >
              <IconX size={16} />
            </Button>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="absolute right-12 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Filter Button */}
        {isDesktop ? (
          <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2 relative">
                <IconFilter size={16} />
                <span className="hidden sm:inline">Filters</span>
                {getActiveFiltersCount() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-[450px]" align="end">
              <EventFilters
                filters={filters}
                setFilters={setFilters}
                eventCategories={eventCategories}
                modes={availableModes}
              />
            </PopoverContent>
          </Popover>
        ) : (
          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2 relative">
                <IconFilter size={16} />
                <span>Filters</span>
                {getActiveFiltersCount() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[400px] px-4">
              <SheetHeader className="mb-4">
                <SheetTitle>Filter Events</SheetTitle>
              </SheetHeader>
              <EventFilters
                filters={filters}
                setFilters={setFilters}
                eventCategories={eventCategories}
                modes={availableModes}
              />
            </SheetContent>
          </Sheet>
        )}
      </div>
    </div>
  );
}

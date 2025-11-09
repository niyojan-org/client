"use client";

import useSWR, { useSWRConfig } from "swr";
import fetcher from "@/lib/fetcher";

export default function useEvents() {
  const { mutate } = useSWRConfig();

  // --- Fetch all events with client-side refresh every 1 minutes
  const { data: allData, error: allError, isLoading: loadingAll } = useSWR(
    "/event",
    fetcher
  );
  const allEvents = Array.isArray(allData?.data?.events) ? allData.data.events : [];

  // --- Fetch featured events (no refresh interval)
  const { data: featuredData, error: featuredError, isLoading: loadingFeatured } = useSWR(
    "/event/featured",
    fetcher
  );
  const featuredEvents = Array.isArray(featuredData?.data?.events) ? featuredData.data.events : [];

  // --- Fetch categories (no refresh interval)
  const { data: categoriesData, error: categoriesError, isLoading: loadingCategories } = useSWR(
    "/event/categories",
    fetcher
  );
  const categories = Array.isArray(categoriesData?.data?.categories) ? categoriesData.data.categories : [];

  // --- Merge featured info
  const mergedEvents = allEvents.map(event => ({
    ...event,
    featured: featuredEvents.some(f => f.id === event.id),
  }));

  // --- Combine loading & error
  const loading = loadingAll || loadingFeatured || loadingCategories;
  const error = allError || featuredError || categoriesError;

  // --- Optional: Sort events
  const sortedEvents = [...mergedEvents].sort((a, b) => {
    const getPriority = (event) => {
      if (event.featured) return 1;
      if (event.status === "open" || event.registrationOpen) return 2;
      if (event.status === "ended" || event.isEnded) return 3;
      return 4;
    };
    return getPriority(a) - getPriority(b);
  });

  // --- Optional: mutate events (refresh)
  const refreshEvents = async () => {
    await Promise.all([
      mutate("/event"),
      mutate("/event/featured"),
      mutate("/event/categories"),
    ]);
  };

  return {
    allEvents: sortedEvents,
    featuredEvents,
    categories,
    loading,
    error,
    refreshEvents,
  };
}

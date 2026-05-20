'use client';

import useSWR, { useSWRConfig } from 'swr';
import fetcher from '@/lib/fetcher';

export default function useEvents() {
  const { mutate } = useSWRConfig();
  const { data: allData, error: allError, isLoading: loadingAll } = useSWR('/events/public', fetcher);
  const allEvents = Array.isArray(allData?.data) ? allData.data : [];

  // --- Combine loading & error
  const loading = loadingAll;
  const error = allError;

  // --- Optional: mutate events (refresh)
  const refreshEvents = async () => {
    await Promise.all([mutate('/events/public')]);
  };

  return {
    allEvents,
    loading,
    error,
    refreshEvents,
  };
}

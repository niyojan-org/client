'use client';

import { useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

import HeroSection from '../components/HeroSection';
import RegistrationWidget from '../components/RegistrationWidget';
import OrganizationCard from '../components/OrganizationCard';
import EventDescription from '../components/EventDescription';
import EventBenefits from '../components/EventBenefits';
import SessionsTimeline from '../components/SessionsTimeline';
import { TicketCards } from '../components';
import SpeakersSection from '../components/SpeakersSection';
import CallToAction from '../components/CallToAction';
import Footer from '@/components/pages/Footer';
import Error404 from '@/app/not-found';
import { motion } from 'framer-motion';

export default function EventPageClient({ initialEvent }) {
  const slug = initialEvent.slug;
  const { data, error } = useSWR(`/events/public/${slug}`, fetcher, {
    fallbackData: { event: initialEvent }, // SSR → SWR hydration
    refreshInterval: 15000,
  });
  const event = data?.event || initialEvent;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  if (error) {
    console.log('Error loading event:', error);
    return <Error404 />;
  }

  if (!event) {
    console.log('Event not found for slug:', slug);
    return <Error404 />;
  }
  return (
    <div className="min-h-dvh w-full">
      <HeroSection event={event} />
      <motion.div
        className="pt-5 space-y-4 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <RegistrationWidget event={event} />
        <OrganizationCard event={event} />
        <EventDescription event={event} />
        <EventBenefits event={event} />
        <SessionsTimeline event={event} />
        <TicketCards event={event} />
        <SpeakersSection event={event} />
        <CallToAction event={event} registrationActive={true} />
      </motion.div>

      <Footer />
    </div>
  );
}

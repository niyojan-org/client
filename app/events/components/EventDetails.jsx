"use client";

import { useState, useEffect } from "react";
import {
  parseISO,
  isValid,
  differenceInSeconds,
  isAfter,
  isBefore,
} from "date-fns";

// Import all the smaller components
import HeroSection from "./HeroSection";
import RegistrationWidget from "./RegistrationWidget";
import OrganizationCard from "./OrganizationCard";
import EventDescription from "./EventDescription";
import EventBenefits from "./EventBenefits";
import SessionsTimeline from "./SessionsTimeline";
// import TicketCards from "./TicketCards";
import SpeakersSection from "./SpeakersSection";
import SimilarEvents from "./SimilarEvents";
import CallToAction from "./CallToAction";
import Footer from "@/components/pages/Footer";

export default function EventDetails({ event, similarEvents = [] }) {
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

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection event={event} />

      {/* Main Content */}
      <main className="pb-12 pt-5 space-y-6 px-4">
        {/* Registration Widget */}
        
      </main>

      <Footer />
    </div>
  );
}

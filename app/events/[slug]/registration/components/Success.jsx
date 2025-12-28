"use client";

import { useEffect, useState } from "react";
import SuccessHeader from "./success/SuccessHeader";
import RegistrationDetails from "./success/RegistrationDetails";
import NextSteps from "./success/NextSteps";
import ActionButtons from "./success/ActionButtons";
import ConfettiEffect from "./success/ConfettiEffect";

// Dummy data for testing - remove when integrating with actual data
const DUMMY_DATA = {
  // Single Participant - Paid Event
  singlePaid: {
    registrationId: "ORG-2025-001234",
    eventName: "Tech Conference 2025",
    eventDate: "15 December 2025, 10:00 AM",
    eventLocation: "Convention Center, Mumbai",
    ticketType: "VIP Pass",
    ticketPrice: 1500,
    isPaid: true,
    isGroup: false,
    participantCount: 1,
    totalAmount: 1500,
    participants: [
      { name: "Abhishek Kumar", email: "abhishek.kumar@example.com", phone: "+91 98765 43210" },
    ],
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ORG-2025-001234",
    eventSlug: "tech-conference-2025",
  },

  // Single Participant - Free Event
  singleFree: {
    registrationId: "ORG-2025-005678",
    eventName: "Community Meetup 2025",
    eventDate: "20 December 2025, 6:00 PM",
    eventLocation: "Community Hall, Bangalore",
    ticketType: "General Entry",
    ticketPrice: 0,
    isPaid: false,
    isGroup: false,
    participantCount: 1,
    totalAmount: 0,
    participants: [
      { name: "Neha Sharma", email: "neha.sharma@example.com", phone: "+91 87654 32109" },
    ],
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ORG-2025-005678",
    eventSlug: "community-meetup",
  },

  // Group Registration - Paid Event
  groupPaid: {
    registrationId: "ORG-2025-009012",
    eventName: "Music Festival 2025",
    eventDate: "25 December 2025, 5:00 PM",
    eventLocation: "Open Air Stadium, Delhi",
    ticketType: "Group Pass - Early Bird",
    ticketPrice: 800,
    isPaid: true,
    isGroup: true,
    participantCount: 4,
    totalAmount: 3200,
    participants: [
      { name: "Rahul Sharma", email: "rahul.sharma@example.com", phone: "+919876543210" },
      { name: "Priya Patel", email: "priya.patel@example.com", phone: "+918765432109" },
      { name: "Amit Kumar", email: "amit.kumar@example.com", phone: "+917654321098" },
      { name: "Sneha Reddy", email: "sneha.reddy@example.com", phone: "+916543210987" },
    ],
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ORG-2025-009012",
    eventSlug: "music-festival",
  },

  // Group Registration - Free Event
  groupFree: {
    registrationId: "ORG-2025-003456",
    eventName: "Open Source Workshop",
    eventDate: "18 December 2025, 2:00 PM",
    eventLocation: "Tech Hub, Pune",
    ticketType: "Team Registration",
    ticketPrice: 0,
    isPaid: false,
    isGroup: true,
    participantCount: 3,
    totalAmount: 0,
    participants: [
      { name: "Vikram Singh", email: "vikram.singh@example.com", phone: "+919876543210" },
      { name: "Ananya Iyer", email: "ananya.iyer@example.com", phone: "+918765432109" },
      { name: "Karan Mehta", email: "karan.mehta@example.com", phone: "+917654321098" },
    ],
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ORG-2025-003456",
    eventSlug: "open-source-workshop",
  },
};

export default function RegistrationSuccess({ data }) {
  const [isVisible, setIsVisible] = useState(false);

  const {
    registrationId = "",
    message = "",
    eventName = "",
    eventDate = "",
    eventLocation = "",
    ticketType = "",
    ticketPrice = 0,
    isPaid = false,
    isGroup = false,
    participants = [],
    participantCount = 1,
    totalAmount = 0,
    qrCode = "",
    eventSlug = "",
  } = data || {};

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full max-w-xl">
        <div
          className={`space-y-3 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* <SuccessIcon /> */}
          <SuccessHeader isPaid={isPaid} message={message} />
          <RegistrationDetails
            registrationId={registrationId}
            message={message}
            eventName={eventName}
            eventDate={eventDate}
            eventLocation={eventLocation}
            ticketType={ticketType}
            ticketPrice={ticketPrice}
            isPaid={isPaid}
            isGroup={isGroup}
            participants={participants}
            participantCount={participantCount}
            totalAmount={totalAmount}
            qrCode={qrCode}
          />
          <NextSteps isPaid={isPaid} isGroup={isGroup} />
          <ActionButtons eventSlug={eventSlug} />
        </div>
      </div>

      <ConfettiEffect />
    </div>
  );
}

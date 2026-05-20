"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SuccessHeader from "./success/SuccessHeader";
import RegistrationDetails from "./success/RegistrationDetails";
import NextSteps from "./success/NextSteps";
import ActionButtons from "./success/ActionButtons";
import ConfettiEffect from "./success/ConfettiEffect";

export default function RegistrationSuccess({ data, redirect, afterDelay = 2500 }) {
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState(Math.ceil(afterDelay / 1000));
  const router = useRouter();

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

  // Countdown timer for redirect
  useEffect(() => {
    if (redirect && countdown > 0) {
      const countdownTimer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdownTimer);
    }
  }, [redirect, countdown]);

  // Auto redirect if redirect URL is provided
  useEffect(() => {
    if (redirect) {
      const timer = setTimeout(() => {
        router.replace(redirect);
      }, afterDelay);

      return () => clearTimeout(timer);
    }
  }, [redirect, afterDelay, router]);

  return (
    <div className="min-h-dvh w-full flex items-center justify-center pt-6">
      <div className="w-full max-w-4xl">
        <div
          className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <SuccessHeader isPaid={isPaid} message={message} isGroup={isGroup} />
          
          {redirect && countdown > 0 && (
            <div className="mt-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-sm text-muted-foreground">
                Redirecting in <span className="font-bold text-primary">{countdown}</span> second{countdown !== 1 ? 's' : ''}...
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
            {/* Main Content - Takes 2 columns on desktop */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
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
            </div>

            {/* Sidebar - Right column on desktop */}
            <div className="space-y-4 md:space-y-6">
              <ActionButtons eventSlug={eventSlug} />
            </div>
          </div>
        </div>
      </div>

      <ConfettiEffect />
    </div>
  );
}

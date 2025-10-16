import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const OrganizerFAQ = () => {
  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {[
          {
            q: "Can I create free events?",
            a: (
              <>
                Yes! You can host free events. Attendees won’t be charged, and you can skip payment setup.
                <p className="text-sm text-muted-foreground mt-2">
                  *Note: Minimal platform fees may still apply.
                </p>
              </>
            ),
          },
          {
            q: "How do I get paid for ticket sales?",
            a: "Payments go directly to your linked bank account or Razorpay. You can receive them instantly or after the event.",
          },
          {
            q: "Can I change event details after publishing?",
            a: "Absolutely! You can update the event title, description, time, or location anytime. Attendees get automatic updates.",
          },
          {
            q: "What if I need to cancel an event?",
            a: "You can cancel events from your dashboard. Attendees will be notified and refunded automatically if they’ve paid.",
          },
          {
            q: "Can I invite team members to help manage events?",
            a: "Yes! Add team members and assign roles. They can help manage registrations, tickets, and event details.",
          },
          {
            q: "Are my attendees’ details safe?",
            a: "Yes! All attendee information is stored securely and payments are handled via Razorpay.",
          },
        ].map((faq, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="rounded-md border border-border/40 bg-card shadow-sm px-5"
          >
            <AccordionTrigger className="text-base sm:text-lg font-semibold text-foreground">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm sm:text-base px-2 pt-1 pb-4 leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default OrganizerFAQ;

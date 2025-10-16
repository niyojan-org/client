import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const AttendesFAQ = () => {
  const faqs = [
    {
      q: "How do I register for an event?",
      a: "Click “Register” or “Get Tickets.” After payment (if any), you’ll get a confirmation email with your ticket and event details.",
    },
    {
      q: "Can I cancel or get a refund?",
      a: "Refunds depend on the organizer. If allowed, you can cancel your ticket from your account and get the refund automatically.",
    },
    {
      q: "Do I need to print my ticket?",
      a: "No! Just show the ticket on your phone via email or the event dashboard during check-in.",
    },
    {
      q: "What if an event is canceled?",
      a: "You’ll be notified by email. Paid tickets will be refunded automatically to your original payment method.",
    },
    {
      q: "Can I register multiple people at once?",
      a: "Yes! Add multiple tickets to your cart and register friends or groups if the event allows group bookings.",
    },
  ];

  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="rounded-md border border-border/40 bg-card shadow-sm px-5 transition-colors duration-300"
          >
            <AccordionTrigger className="text-base sm:text-lg font-semibold text-foreground hover:text-primary transition-colors duration-200">
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

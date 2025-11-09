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
      q: "How do I find events I’m interested in?",
      a: "You can browse events by category, date, or location on our platform. Each event page shows the schedule, ticket options, and organizer details so you can make an informed choice.",
    },
    {
      q: "What is the registration process like?",
      a: "Select your preferred ticket type, fill in your details, and complete payment if required. Once registered, you’ll receive confirmation with your ticket and all event information.",
    },
    {
      q: "What if I entered my information incorrectly during registration?",
      a: "Once you submit your registration, the information cannot be changed from your side. If you entered something incorrectly, contact the event organizer directly — their contact details are available on the event page. They can help correct the information if needed.",
    },

    {
  q: "How will I receive my ticket?",
  a: "After successful registration, tickets are sent instantly via email and WhatsApp. If for some reason you do not receive your ticket, you can create an account on our platform. Once logged in, your tickets will be available in your profile under the 'My Tickets' section. No printing is necessary; QR scanning at the event is all you need.",
}
,
    {
      q: "What happens if event gets canceled?",
      a: "If the event is canceled, you’ll get a notification and a refund if applicable. Refunds are processed automatically through the original payment method within 5-7 business days.",
    },
    {
      q: "Is my personal and payment information safe?",
      a: "Absolutely! All data is encrypted and securely processed through trusted payment gateways. We never share your information with third parties without your consent.",
    },
  ];

  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={`faq-item-${i}`}
            value={`faq-item-${i}`}
            className="rounded-md border border-border/40 bg-card shadow-sm px-5 transition-colors duration-300"
          >
            <AccordionTrigger className="text-base sm:text-lg font-semibold text-foreground hover:text-primary transition-colors duration-200 cursor-pointer">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm sm:text-base px-2 pt-1 pb-4 leading-relaxed text-left">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

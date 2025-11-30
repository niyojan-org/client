import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const OrganizerFAQ = () => {
  const faqs = [
  {
    q: "Can I host both free and paid events?",
    a: "Yes. You can host both free and paid events. Paid event ticketing is processed securely through Razorpay. A small platform service fee applies to all events to support verification, ticketing, messaging, and platform maintenance."
  },
  {
    q: "How do I receive payments from ticket sales?",
    a: "All payments collected from attendees are processed through Razorpay. After fees and charges are deducted, settlements are transferred to your verified bank account according to Razorpay's standard settlement timeline."
  },
  {
    q: "Can I edit event details after publishing?",
    a: "Yes. You can edit event details such as description, venue, schedule, and ticket count from your organizer dashboard. However, changes affecting pricing or ticket validity may be restricted once registrations have begun."
  },
  {
    q: "How are refunds handled if an event is cancelled?",
    a: "If an event is officially cancelled, Orgatick will automatically initiate full refunds to attendees through Razorpay. Organizers cannot issue refunds individually, and no refunds are allowed once tickets are sold unless the event is cancelled."
  },
  {
    q: "Can I add team members to help manage my event?",
    a: "Yes. You can invite additional members to your organizer panel and assign roles such as ticket scanning, analytics monitoring, volunteer management, or event updates."
  },
  {
    q: "Will attendees see my name or the platform name on their bank statements?",
    a: "Payments are processed via Razorpay. Attendees may see the registered legal proprietor name “Abhishek Kumar Mandal” on their bank record or SMS payment confirmation."
  },
  {
    q: "Is my data secure?",
    a: "Yes. All payment and event data is encrypted and processed through industry-standard security systems. Orgatick does not store card or banking information. We comply with Razorpay PCI-DSS requirements."
  }
];


  return (
    <div className="w-full">
      <Accordion type="true" collapsible className="w-full space-y-4">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={`faq-item-${i}`}
            value={`faq-item-${i}`}
            className="rounded-md border border-border/40 bg-card shadow-sm px-5"
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

export default OrganizerFAQ;

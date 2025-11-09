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
      a: (
        <>
          Yes! You can host both free and paid events on our platform. <br />
          For free events, we charge only a minimal service fee to cover operational costs such as hosting, messaging, and support. <br />
          For paid events, you can set your own ticket prices, and payments are processed securely through Razorpay.
        </>
      ),
    },
    {
      q: "How do I receive payments from ticket sales?",
      a: "All ticket payments are processed through Razorpay. Once your organization account is verified, you can link your bank account and receive payments directly — either instantly or after the event, depending on your payout settings.",
    },
    {
      q: "Can I edit event details after publishing?",
      a: "Yes, We provide you with a dedicated organizer admin panel where you can manage all your events in one place. From there, you can easily update event information, monitor registrations, track ticket sales, and make adjustments in real time",
    },
    {
      q: "How are refunds handled if I cancel an event?",
      a: "You can cancel your event anytime from the organizer dashboard. If you’ve set up a refund policy, the system will automatically notify registered participants and process refunds through Razorpay. If the event is marked as “non-refundable,” no automatic refunds will be issued.",
    },
    {
      q: "Can I add team members to help manage events?",
      a: "Yes! You can invite team members, such as volunteers or co-organizers, to your admin panel. You can assign specific roles for tasks like managing registrations, scanning tickets, or tracking analytics — all under your organization account.",
    },
    {
      q: "Is My data secure?",
      a: "Yes — all data and payment information is securely encrypted and handled via Razorpay’s PCI-DSS-compliant systems. We never share user data with third parties or use it for marketing without consent.",
    },
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

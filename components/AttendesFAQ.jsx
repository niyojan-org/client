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
    q: "How will I receive my ticket?",
    a: "Tickets are sent digitally via email and/or WhatsApp immediately after payment. No physical delivery is required. You only need the QR code for entry."
  },
  {
    q: "I haven’t received my ticket — what should I do?",
    a: "Check your spam folder and ensure the email/phone provided is correct. If it still hasn’t arrived after 10 minutes, contact support event organizer."
  },
  {
    q: "Can I cancel or transfer my ticket after booking?",
    a: "Tickets are non-refundable and non-transferable once purchased. Refunds are only issued if the event is officially canceled."
  },
  {
    q: "What happens if the event is canceled?",
    a: "If an event is canceled, you’ll be notified and a full refund will be automatically processed through Razorpay within 5–10 business days."
  },
  {
    q: "Why does my bank or SMS show a different name after payment?",
    a: "Payments are processed through Razorpay. Statements may show the legal business name of our payment account: 'Abhishek Kumar Mandal'."
  },
  {
    q: "Are my personal and payment details secure?",
    a: "Yes. All payments are encrypted and processed securely through Razorpay. We do not store any sensitive payment information."
  },
  {
    q: "Do I need an account to buy tickets?",
    a: "No account is required to purchase tickets. However, creating one helps you track tickets, access past history, and receive updates faster."
  }
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

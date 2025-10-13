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
      <Accordion
        type="single"
        collapsible
        className="w-full space-y-4"
      >
        {/* FAQ 1 */}
        <AccordionItem value="item-1" className="rounded-md border px-5 border-gray-200 shadow-sm bg-white">
          <AccordionTrigger className="text-lg font-medium">
            Can I create free events?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 px-2 pt-1 pb-4 leading-relaxed">
            Yes! You can host free events. Attendees won’t be charged, and you can skip payment setup.
            <p className="text-sm text-gray-500 mt-2">
              *Note: Minimal platform fees may still apply.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 2 */}
        <AccordionItem value="item-2" className="rounded-md border px-5 border-gray-200 shadow-sm bg-white">
          <AccordionTrigger className="text-lg font-medium">
            How do I get paid for ticket sales?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 px-2 pt-1 pb-4 leading-relaxed">
            Payments go directly to your linked bank account or Razorpay. You can receive them instantly or on a schedule after the event.
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 3 */}
        <AccordionItem value="item-3" className="rounded-md border px-5 border-gray-200 shadow-sm bg-white">
          <AccordionTrigger className="text-lg font-medium">
            Can I change event details after publishing?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 px-2 pt-1 pb-4 leading-relaxed">
            Absolutely! You can update the event title, description, time, or location anytime. Attendees will get automatic updates.
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 4 */}
        <AccordionItem value="item-4" className="rounded-md border px-5 border-gray-200 shadow-sm bg-white">
          <AccordionTrigger className="text-lg font-medium">
            What if I need to cancel an event?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 px-2 pt-1 pb-4 leading-relaxed">
            You can cancel events from your dashboard. Attendees will be notified and refunded automatically if they’ve paid.
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 5 */}
        <AccordionItem value="item-5" className="rounded-md border px-5 border-gray-200 shadow-sm bg-white">
          <AccordionTrigger className="text-lg font-medium">
            Can I invite team members to help manage events?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 px-2 pt-1 pb-4 leading-relaxed">
            Yes! Add team members from your dashboard and assign roles. They can help manage registrations, tickets, and event details.
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 6 */}
        <AccordionItem value="item-6" className="rounded-md border px-5 border-gray-200 shadow-sm bg-white">
          <AccordionTrigger className="text-lg font-medium">
            Are my attendees’ details safe?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 px-2 pt-1 pb-4 leading-relaxed">
            Yes! All attendee information is stored securely and complies with privacy standards. Payments are handled via Razorpay.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default OrganizerFAQ;

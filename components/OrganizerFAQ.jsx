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
        // defaultValue="item-1"
      >
        {/* FAQ 1 */}
        <AccordionItem value="item-1" className="rounded-md border px-5 border-gray-200 shadow-sm bg-white">
          <AccordionTrigger className="text-lg font-medium">
            Can I host free events?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 px-2 pt-1 pb-4 leading-relaxed">
            Yes! You can create both free and paid events. For free events, attendees won’t be charged and you won’t need to set up a payment method.
            <p className="text-sm text-gray-500 mt-2">
              *Note: Platform may still charge minimal handling fees.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 2 */}
        <AccordionItem value="item-2" className="rounded-md border px-5 border-gray-200 shadow-sm bg-white">
          <AccordionTrigger className="text-lg font-medium">
            How do I receive payments?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 px-2 pt-1 pb-4 leading-relaxed">
            Payments from ticket sales are automatically transferred to your linked bank account or payment processor (like Razorpay) after the event or on a scheduled basis.
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 3 */}
        <AccordionItem value="item-3" className="rounded-md border px-5 border-gray-200 shadow-sm bg-white">
          <AccordionTrigger className="text-lg font-medium">
            Can I edit event details after publishing?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 px-2 pt-1 pb-4 leading-relaxed">
            Yes, you can update your event’s description, time, and location anytime. Attendees will be notified.
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 4 */}
        <AccordionItem value="item-4" className="rounded-md border px-5 border-gray-200 shadow-sm bg-white">
          <AccordionTrigger className="text-lg font-medium">
            Can I cancel an event?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 px-2 pt-1 pb-4 leading-relaxed">
            Yes, events can be canceled from your dashboard. Attendees will be notified and refunded if applicable.
          </AccordionContent>
        </AccordionItem>

        {/* Optional fun one */}
        <AccordionItem value="item-5" className="rounded-md border px-5 border-gray-200 shadow-sm bg-white">
          <AccordionTrigger className="text-lg font-medium">
            How are you?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 px-2 pt-1 pb-4 leading-relaxed">
            I’m good — thanks for asking! 😄
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default OrganizerFAQ;

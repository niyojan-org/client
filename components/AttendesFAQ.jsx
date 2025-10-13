import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const AttendesFAQ = () => {
  return (
    <div className="w-full">
      <Accordion
        type="single"
        collapsible
        className="w-full space-y-4"
      >
        {/* FAQ 1 */}
        <AccordionItem value="item-1" className="rounded-md border border-gray-200 shadow-sm bg-white px-5">
          <AccordionTrigger className="text-base sm:text-lg font-semibold text-gray-800">
            How do I register for an event?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 text-sm sm:text-base px-2 pt-1 pb-4 leading-relaxed">
            Click “Register” or “Get Tickets.” After payment (if any), you’ll get a confirmation email with your ticket and event details.
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 2 */}
        <AccordionItem value="item-2" className="rounded-md border border-gray-200 shadow-sm bg-white px-5">
          <AccordionTrigger className="text-base sm:text-lg font-semibold text-gray-800">
            Can I cancel or get a refund?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 text-sm sm:text-base px-2 pt-1 pb-4 leading-relaxed">
            Refunds depend on the organizer. If allowed, you can cancel your ticket from your account and get the refund automatically.
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 3 */}
        <AccordionItem value="item-3" className="rounded-md border border-gray-200 shadow-sm bg-white px-5">
          <AccordionTrigger className="text-base sm:text-lg font-semibold text-gray-800">
            Do I need to print my ticket?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 text-sm sm:text-base px-2 pt-1 pb-4 leading-relaxed">
            No! Show the ticket on your phone via email or the Rasa dashboard during check-in.
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 4 */}
        <AccordionItem value="item-4" className="rounded-md border border-gray-200 shadow-sm bg-white px-5">
          <AccordionTrigger className="text-base sm:text-lg font-semibold text-gray-800">
            What if an event is canceled?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 text-sm sm:text-base px-2 pt-1 pb-4 leading-relaxed">
            You’ll be notified by email. Paid tickets will be refunded automatically to your original payment method.
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 5 */}
        <AccordionItem value="item-5" className="rounded-md border border-gray-200 shadow-sm bg-white px-5">
          <AccordionTrigger className="text-base sm:text-lg font-semibold text-gray-800">
            Can I register multiple people at once?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 text-sm sm:text-base px-2 pt-1 pb-4 leading-relaxed">
            Yes! Add multiple tickets to your cart and register friends or groups if the event allows group bookings.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

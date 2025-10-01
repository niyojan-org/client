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
        // defaultValue="item-1"
      >
        {/* FAQ 1 */}
        <AccordionItem value="item-1" className="rounded-md border border-gray-200 shadow-sm bg-white px-5">
          <AccordionTrigger className="text-base sm:text-lg font-semibold text-gray-800">
            How do I register for an event?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 text-sm sm:text-base px-2 pt-1 pb-4 leading-relaxed">
            Click the “Register” or “Get Tickets” button on the event page. After payment (if any), you’ll receive a confirmation email with your ticket and event details.
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 2 */}
        <AccordionItem value="item-2" className="rounded-md border border-gray-200 shadow-sm bg-white px-5">
          <AccordionTrigger className="text-base sm:text-lg font-semibold text-gray-800">
            Can I cancel or get a refund?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 text-sm sm:text-base px-2 pt-1 pb-4 leading-relaxed">
            Refund policies are set by event organizers. If refunds are allowed, you’ll find the "Cancel Ticket" option under your account’s ticket section.
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 3 */}
        <AccordionItem value="item-3" className="rounded-md border border-gray-200 shadow-sm bg-white px-5">
          <AccordionTrigger className="text-base sm:text-lg font-semibold text-gray-800">
            Do I need to print my ticket?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 text-sm sm:text-base px-2 pt-1 pb-4 leading-relaxed">
            No need to print! You can simply show the ticket on your phone via email or your Rasa dashboard during check-in.
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 4 */}
        <AccordionItem value="item-4" className="rounded-md border border-gray-200 shadow-sm bg-white px-5">
          <AccordionTrigger className="text-base sm:text-lg font-semibold text-gray-800">
            What happens if an event is canceled?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 text-sm sm:text-base px-2 pt-1 pb-4 leading-relaxed">
            You’ll be notified via email. If you’ve paid, your refund will be processed automatically to your original payment method.
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 5 */}
        <AccordionItem value="item-5" className="rounded-md border border-gray-200 shadow-sm bg-white px-5">
          <AccordionTrigger className="text-base sm:text-lg font-semibold text-gray-800">
            Can I register multiple people at once?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 text-sm sm:text-base px-2 pt-1 pb-4 leading-relaxed">
            Yes! You can add multiple tickets to your cart and register friends or groups in one go, if the event allows group bookings.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

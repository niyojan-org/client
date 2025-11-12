"use client";

import { motion } from "framer-motion";

export default function RefundPolicy() {
  return (
    <motion.main
      role="main"
      aria-label="Refund Policy"
      className="max-w-4xl mx-auto px-6 py-24 space-y-10 leading-relaxed bg-background text-foreground transition-colors duration-700"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <h1 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">
        Refund Policy
      </h1>
      <p className="text-sm text-muted-foreground">Effective Date: June 15, 2025</p>

      <p>
        At <strong>Orgatic</strong>, we value fairness and transparency in all refund processes. 
        This Refund Policy outlines how refunds are managed for events hosted on our platform. 
        By using Orgatic, you agree to comply with this policy.
      </p>

      {/* Policy Sections */}
      {[
        {
          title: "1. Event Cancellations",
          text: "If an event is canceled by the organizer, all registered attendees will receive a full refund, including any service fees, within 5–10 business days. Refunds are processed automatically through Razorpay."
        },
        {
          title: "2. Organizer-Specific Refund Rules",
          text: "Event organizers may define their own refund policies, such as full refund up to 48 hours before the event, partial refunds, or non-refundable tickets. Please review the event’s refund policy before booking."
        },
        {
          title: "3. Ticket Cancellations by Attendees",
          text: "Attendees can request cancellations via their dashboard. Refund eligibility depends on the organizer’s policy. Orgatic processes refunds only after organizer approval."
        },
        {
          title: "4. Non-Refundable Platform Fees",
          text: "Platform service fees are typically non-refundable. In cases of event cancellation or significant modification, Orgatic may refund the fee at its discretion."
        },
        {
          title: "5. How to Request a Refund",
          list: [
            "Contact the event organizer directly through the event page.",
            <>
              If unresolved within 72 hours, email{" "}
              <a
                href='mailto:support@orgatic.events'
                className='text-accent underline'
              >
                support@orgatic.events
              </a>{" "}
              with your booking and event details.
            </>
          ]
        },
        {
          title: "6. Refund Processing Timeline",
          text: "Approved refunds are processed within 5–10 business days via Razorpay. Additional time may be required depending on your payment provider or bank."
        },
        {
          title: "7. Disputes & Escalations",
          text: "If you encounter issues related to refunds, contact Orgatic support. We act as a neutral mediator between attendees and organizers to help reach a fair resolution."
        }
      ].map((section, index) => (
        <section key={index} className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary/75">{section.title}</h2>
          {section.text && <p className="text-foreground">{section.text}</p>}
          {section.list && (
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {section.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <p className="text-sm text-muted-foreground">
        For assistance or refund-related queries, please email{" "}
        <a
          href="mailto:support@orgatic.events"
          className="text-accent underline"
        >
          support@orgatic.events
        </a>.
      </p>
    </motion.main>
  );
}

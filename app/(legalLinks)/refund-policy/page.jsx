"use client";

import { motion } from "framer-motion";

export default function RefundPolicy() {
  return (
    <motion.main
      role="main"
      aria-label="Refund Policy"
      className="max-w-4xl mx-auto px-6 py-24 text-gray-900 space-y-10 leading-relaxed"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold text-indigo-700 tracking-tight">
        Refund Policy
      </h1>
      <p className="text-sm text-gray-500">Effective Date: June 15, 2025</p>

      <p className="text-gray-700">
        At <strong>Orgatic</strong>, we prioritize transparency and fairness in refunds. This Refund Policy explains how refunds are handled for events hosted on our platform. By using Orgatic, you agree to this policy.
      </p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-700">1. Event Cancellations</h2>
        <p className="text-gray-700">
          If an event is canceled by the organizer, all registered attendees will receive a full refund, including any service fees, within 5–10 business days. Refunds are processed automatically via Razorpay.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-700">2. Organizer-Specific Refund Rules</h2>
        <p className="text-gray-700">
          Individual event organizers may set their own refund policies. Examples include full refund up to 48 hours before the event, partial refund, or non-refundable. Check each event page for specific details before booking.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-700">3. Ticket Cancellations by Attendees</h2>
        <p className="text-gray-700">
          Attendees may request ticket cancellations via their dashboard. Refunds depend on the organizer’s policy. Orgatic only processes refunds if the organizer approves them.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-700">4. Non-Refundable Platform Fees</h2>
        <p className="text-gray-700">
          Platform service fees are generally non-refundable. If an event is canceled or significantly modified, we may refund the fee at our discretion.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-700">5. How to Request a Refund</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Contact the event organizer through the event page.</li>
          <li>
            If unresolved within 72 hours, contact Orgatic support at{' '}
            <a href="mailto:support@orgatic.events" className="text-orange-600 underline">
              support@orgatic.events
            </a> with your event and booking details.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-700">6. Refund Processing Timeline</h2>
        <p className="text-gray-700">
          Approved refunds are processed within 5–10 business days through Razorpay. Additional time may be required depending on your bank.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-700">7. Disputes & Escalations</h2>
        <p className="text-gray-700">
          If you face any disputes regarding refunds, contact our support team. Orgatic will mediate between attendees and organizers to resolve issues fairly.
        </p>
      </section>

      <p className="text-sm text-gray-500">
        For further support, please email{' '}
        <a href="mailto:support@orgatic.events" className="text-orange-600 underline">
          support@orgatic.events
        </a>.
      </p>
    </motion.main>
  );
}

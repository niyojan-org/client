"use client";

import { motion } from "framer-motion";

export default function RefundPolicy() {
  return (
    <motion.main
      role="main"
      aria-label="Refund Policy"
      className="max-w-3xl mx-auto px-6 py-24 text-gray-800 space-y-8 leading-relaxed"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold text-indigo-700">Refund Policy</h1>
      <p className="text-sm text-gray-500">Effective Date: June 15, 2025</p>

      <p>
        At <strong>Orgatic</strong>, we prioritize clarity and fairness in our refund practices. This Refund Policy outlines the conditions under which refunds may be requested and processed. By using our platform, you agree to abide by this policy.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">1. Event Cancellations</h2>
      <p>
        If an event is canceled by the organizer, a full refund (including any service fee) will be issued to all registered attendees within 5–10 business days. Refunds will be processed automatically via Razorpay.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">2. Organizer-Specific Refund Rules</h2>
      <p>
        Each event organizer on Orgatic may define their own refund policy (e.g., full refund up to 48 hours before the event, partial refund, or non-refundable). Please refer to the event's individual page for specific refund terms before making a booking.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">3. Ticket Cancellations by Attendees</h2>
      <p>
        Attendees can request to cancel their ticket from the event dashboard. Refunds for cancellations are subject to the event organizer's refund policy. Orgatic does not process refunds unless the organizer explicitly approves them.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">4. Non-Refundable Platform Fees</h2>
      <p>
        Our platform service fee is typically non-refundable. However, if an event is canceled or significantly modified by the organizer, the fee may be refunded at our discretion.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">5. How to Request a Refund</h2>
      <p>If you wish to request a refund:</p>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>Contact the event organizer via the contact section on the event page.</li>
        <li>
          If unresolved within 72 hours, contact Orgatic support at{' '}
          <a href="mailto:support@orgatic.events" className="text-orange-600 underline">
            support@orgatic.events
          </a> with event and booking details.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-indigo-700">6. Refund Processing Timeline</h2>
      <p>
        Approved refunds are processed within 5–10 working days via our secure payment partner, Razorpay. Depending on your bank, it may take additional time for the funds to appear in your account.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">7. Disputes & Escalations</h2>
      <p>
        In case of any refund disputes, users can reach out to our support team. We will mediate between the attendee and organizer and aim to resolve issues fairly.
      </p>

      <p className="text-sm text-gray-500">
        For additional support, please email{' '}
        <a href="mailto:support@orgatic.events" className="text-orange-600 underline">
          support@orgatic.events
        </a>.
      </p>
    </motion.main>
  );
}

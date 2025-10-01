"use client";

import { motion } from "framer-motion";

export default function TermsAndConditions() {
  return (
    <motion.main
      role="main"
      aria-label="Terms and Conditions"
      className="max-w-3xl mx-auto px-6 py-24 text-gray-800 space-y-8 leading-relaxed"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold text-indigo-700">Terms &amp; Conditions</h1>
      <p className="text-sm text-gray-500">Last Updated: June 15, 2025</p>

      <p>
        By using <strong>Orgatic Events</strong> (our Event Management System), you agree to the following terms:
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">1. Eligibility</h2>
      <p>You must be at least 18 years old to host events on our platform.</p>

      <h2 className="text-2xl font-semibold text-indigo-700">2. Account Responsibility</h2>
      <p>You are responsible for maintaining the confidentiality of your account credentials.</p>

      <h2 className="text-2xl font-semibold text-indigo-700">3. Event Guidelines</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>No hosting of illegal, fraudulent, or misleading events.</li>
        <li>Ensure all event information is accurate, complete, and up-to-date.</li>
        <li>Organizers are solely responsible for event execution and fulfillment.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-indigo-700">4. Payments &amp; Fees</h2>
      <p>
        We process all payments securely via Razorpay. A platform service fee may apply per transaction, which is non-refundable unless otherwise stated in our Refund Policy.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">5. Cancellations &amp; Refunds</h2>
      <p>
        Event cancellations and refunds are primarily handled by organizers. Attendees must refer to the organizer's refund policy before booking. In the case of disputes, Orgatic may mediate but holds no financial liability unless the event is canceled outright.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">6. Termination of Account</h2>
      <p>
        We reserve the right to suspend or terminate any user account that violates these terms, misuses the platform, or engages in harmful activities.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">7. Intellectual Property</h2>
      <p>
        All content, branding, and code associated with Orgatic Events are protected by copyright laws. You may not copy, modify, or distribute any part without prior written consent.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">8. Limitation of Liability</h2>
      <p>
        Orgatic is not liable for any damages, losses, or disruptions resulting from the use of our platform, including event-related issues.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">9. Governing Law</h2>
      <p>
        These terms are governed by the laws of India, with exclusive jurisdiction in the state of Punjab.
      </p>

      <p className="text-sm text-gray-500">
        For concerns, disputes, or feedback, please contact{' '}
        <a href="mailto:support@orgatic.events" className="text-orange-600 underline">
          support@orgatic.events
        </a>.
      </p>
    </motion.main>
  );
}

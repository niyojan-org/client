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
      <p className="text-sm text-gray-500">Last Updated: October 12, 2025</p>

      <p>
        By using <strong>Orgatic Events</strong> (the "Platform"), you agree to comply with and be bound by these Terms &amp; Conditions. Please read them carefully.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">1. Eligibility</h2>
      <p>
        You must be at least 18 years old or have the legal capacity to enter into a binding agreement to host or register for events on our Platform.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">2. Account Responsibility</h2>
      <p>
        You are responsible for maintaining the confidentiality of your login credentials and any activity under your account. Notify us immediately of any unauthorized use.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">3. Event Guidelines</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>No hosting of illegal, fraudulent, misleading, or harmful events.</li>
        <li>Ensure all event details (title, date, venue, pricing) are accurate and complete.</li>
        <li>Organizers are solely responsible for event execution, attendee safety, and fulfillment of services or tickets.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-indigo-700">4. Payments &amp; Fees</h2>
      <p>
        All payments are processed securely via Razorpay. A service fee may apply for transactions. This fee is non-refundable unless otherwise stated in our Refund Policy. Orgatic does not store your financial information.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">5. Cancellations &amp; Refunds</h2>
      <p>
        Event cancellations and refunds are primarily managed by event organizers. Attendees should review each event's refund policy before booking. Orgatic may facilitate communication but is not financially liable unless an event is cancelled by the organizer.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">6. Termination of Account</h2>
      <p>
        We reserve the right to suspend or terminate accounts that violate these terms, misuse the Platform, or engage in harmful or illegal activities. Termination does not relieve you of outstanding obligations.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">7. Intellectual Property</h2>
      <p>
        All content, branding, designs, and code associated with Orgatic are protected by copyright, trademark, and other intellectual property laws. You may not copy, distribute, modify, or use our intellectual property without prior written permission.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">8. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, Orgatic is not responsible for any direct, indirect, incidental, or consequential damages arising from use of the Platform, including but not limited to event cancellations, technical issues, or payment disputes.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">9. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless Orgatic, its affiliates, employees, and partners from any claims, liabilities, damages, or expenses arising from your use of the Platform or violation of these Terms.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">10. Privacy</h2>
      <p>
        Our Privacy Policy governs the collection, use, and storage of your personal information. By using the Platform, you consent to the terms outlined in our Privacy Policy.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">11. Governing Law</h2>
      <p>
        These terms are governed by the laws of India, with exclusive jurisdiction in the state of Punjab.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">12. Modifications</h2>
      <p>
        Orgatic reserves the right to modify these Terms &amp; Conditions at any time. Updated terms will be effective immediately upon posting on the Platform. Continued use constitutes acceptance of the updated terms.
      </p>

      <p className="text-sm text-gray-500">
        For questions, concerns, or disputes, contact us at{' '}
        <a href="mailto:support@orgatic.events" className="text-orange-600 underline">
          support@orgatic.events
        </a>.
      </p>
    </motion.main>
  );
}

'use client';

import { motion } from "framer-motion";

export default function TermsAndConditions() {
  return (
    <motion.main
      role="main"
      aria-label="Terms and Conditions"
      className="max-w-4xl mx-auto px-6 py-24 space-y-8 leading-relaxed bg-background text-foreground transition-colors duration-700"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <h1 className="text-4xl font-bold text-primary">Terms & Conditions</h1>
      <p className="text-sm text-muted-foreground">Last Updated: October 12, 2025</p>

      <p>
        By using <strong>Orgatic Events</strong> (the "Platform"), you agree to comply with and be bound by these Terms & Conditions. Please read them carefully.
      </p>

      {[
        {
          title: "1. Eligibility",
          text: "You must be at least 18 years old or have the legal capacity to enter into a binding agreement to host or register for events on our Platform."
        },
        {
          title: "2. Account Responsibility",
          text: "You are responsible for maintaining the confidentiality of your login credentials and any activity under your account. Notify us immediately of any unauthorized use."
        },
        {
          title: "3. Event Guidelines",
          items: [
            "No hosting of illegal, fraudulent, misleading, or harmful events.",
            "Ensure all event details (title, date, venue, pricing) are accurate and complete.",
            "Organizers are solely responsible for event execution, attendee safety, and fulfillment of services or tickets."
          ]
        },
        {
          title: "4. Payments & Fees",
          text: "All payments are processed securely via Razorpay. A service fee may apply for transactions. This fee is non-refundable unless otherwise stated in our Refund Policy. Orgatic does not store your financial information."
        },
        {
          title: "5. Cancellations & Refunds",
          text: "Event cancellations and refunds are primarily managed by event organizers. Attendees should review each event's refund policy before booking. Orgatic may facilitate communication but is not financially liable unless an event is cancelled by the organizer."
        },
        {
          title: "6. Termination of Account",
          text: "We reserve the right to suspend or terminate accounts that violate these terms, misuse the Platform, or engage in harmful or illegal activities. Termination does not relieve you of outstanding obligations."
        },
        {
          title: "7. Intellectual Property",
          text: "All content, branding, designs, and code associated with Orgatic are protected by copyright, trademark, and other intellectual property laws. You may not copy, distribute, modify, or use our intellectual property without prior written permission."
        },
        {
          title: "8. Limitation of Liability",
          text: "To the maximum extent permitted by law, Orgatic is not responsible for any direct, indirect, incidental, or consequential damages arising from use of the Platform, including but not limited to event cancellations, technical issues, or payment disputes."
        },
        {
          title: "9. Indemnification",
          text: "You agree to indemnify and hold harmless Orgatic, its affiliates, employees, and partners from any claims, liabilities, damages, or expenses arising from your use of the Platform or violation of these Terms."
        },
        {
          title: "10. Privacy",
          text: "Our Privacy Policy governs the collection, use, and storage of your personal information. By using the Platform, you consent to the terms outlined in our Privacy Policy."
        },
        {
          title: "11. Governing Law",
          text: "These terms are governed by the laws of India, with exclusive jurisdiction in the state of Punjab."
        },
        {
          title: "12. Modifications",
          text: "Orgatic reserves the right to modify these Terms & Conditions at any time. Updated terms will be effective immediately upon posting on the Platform. Continued use constitutes acceptance of the updated terms."
        }
      ].map((section, index) => (
        <section className="space-y-3" key={index}>
          <h2 className="text-2xl font-semibold text-primary/75">{section.title}</h2>
          {section.text && <p className="text-foreground">{section.text}</p>}
          {section.items && (
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {section.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <p className="text-sm text-muted-foreground">
        For questions, concerns, or disputes, contact us at{' '}
        <a href="mailto:support@orgatic.events" className="text-accent underline">
          support@orgatic.events
        </a>.
      </p>
    </motion.main>
  );
}

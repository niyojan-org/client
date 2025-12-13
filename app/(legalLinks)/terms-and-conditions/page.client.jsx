"use client";

import { motion } from "framer-motion";


export default function TermsAndConditionsClient() {
  return (
    <motion.main
      role="main"
      aria-label="Terms and Conditions"
      className="max-w-4xl mx-auto px-6 py-8 space-y-8 leading-relaxed bg-background text-foreground transition-colors duration-700"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <h1 className="text-4xl font-bold text-primary">Terms & Conditions</h1>
      <p className="text-sm text-muted-foreground">Effective Date: 01 Nov 2025</p>

      <p>
        These Terms & Conditions (“Terms”) govern your access to and use of 
        <strong> orgatick</strong>, available at <strong>orgatick.in</strong> 
        (“Platform”). By accessing, browsing, registering, or using the Platform 
        in any manner, whether as an attendee, organizer, or visitor, you confirm 
        that you have read, understood, and agreed to comply with these Terms. 
        If you do not agree to these Terms, you must discontinue use of the Platform 
        immediately.
      </p>

      <p>
        orgatick is a digital event platform that enables verified organizers to 
        create and publish events and allows participants to register and purchase 
        digital tickets. orgatick does not host or run events and is not responsible 
        for event execution, safety, schedule changes, or content accuracy. All event 
        details, including pricing, venue, eligibility, and rules, are determined by 
        individual organizers.
      </p>

      <p>
        To use the Platform, you must be at least 18 years old or have legal consent. 
        If you choose to create an account, you are responsible for maintaining the 
        confidentiality of your login credentials and for all activity associated with 
        your account. You must inform us immediately if you believe your account has 
        been accessed without authorization.
      </p>

      <p>
        Organizers using the Platform agree that all events must comply with applicable 
        laws, institutional rules, and safety standards. Illegal, harmful, fraudulent, 
        or misleading activities are strictly prohibited. Organizers are solely 
        responsible for delivering the announced event experience and ensuring the 
        authenticity of the information they provide.
      </p>

      <p>
        All paid registrations and ticket purchases are processed securely through 
        Razorpay. orgatick does not store card numbers, UPI IDs, or banking details. 
        A platform service fee may apply and is non-refundable. Users acknowledge that 
        bank statements or SMS confirmations may display the name 
        <strong> “Abhishek Kumar Mandal”</strong> as the legal account holder for payment 
        settlements.
      </p>

      <p>
        All ticket purchases made through orgatick are final and non-refundable. Once issued,
        tickets cannot be cancelled or transferred by attendees. Refunds will only be issued
        if the organizer officially cancels the event. In such cases, the refund amount will
        be processed after deducting applicable service charges. Refunds processed through 
        Razorpay may take approximately 5–10 business days to reflect. </p>
      <p>
        Upon successful payment, tickets are delivered digitally by email and/or 
        WhatsApp. No physical tickets are printed or shipped. Organizers receive 
        settlements based on Razorpay’s payout timeline after deduction of applicable 
        platform fees and payment gateway charges. orgatick is not responsible for 
        delays caused by banks, payment processors, or compliance reviews.
      </p>

      <p>
        We reserve the right to suspend or terminate access to the Platform at our 
        discretion if users violate these Terms, engage in fraud, misuse Platform 
        features, or negatively impact the experience or safety of other users. 
        Termination does not remove obligations incurred before the suspension date.
      </p>

      <p>
        All content on the Platform, including branding, text, software, design, 
        logos, and digital assets, is protected under applicable intellectual property 
        laws. Users may not copy, reproduce, modify, resell, or distribute Platform 
        content without prior written permission.
      </p>

      <p>
        orgatick provides access to the Platform on an “as-is” and “as-available” basis. 
        To the maximum extent permitted by law, orgatick is not liable for event issues, 
        cancellations. Our total liability, if applicable, will not exceed the total
        amount paid by the affected user for the transaction in question.
      </p>

      <p>
        Use of the Platform is subject to our <strong>Privacy Policy</strong>, which 
        explains how personal information is collected, processed, and stored.
      </p>

      <p>
        These Terms are governed by the laws of India. Any disputes arising from the use 
        of the Platform will fall under the exclusive jurisdiction of courts located in 
        Punjab, India.
      </p>

      <p>
        orgatick may update or revise these Terms periodically. Any changes will be 
        posted on this page, and continued use of the Platform will constitute acceptance 
        of the updated Terms.
      </p>

      <p className="text-sm text-muted-foreground">
        For questions, concerns, or dispute assistance, contact us at{" "}
        <a href="mailto:support@orgatick.in" className="text-accent underline">
          support@orgatick.in
        </a>.
      </p>
    </motion.main>
  );
}

"use client";

import { motion } from "framer-motion";

export default function PrivacyClient() {
  return (
    <motion.main
      className="max-w-4xl mx-auto px-6 py-8 space-y-10 leading-relaxed bg-background text-foreground transition-colors duration-700"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      aria-label="Privacy Policy"
    >
      {/* Header */}
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary">
        Privacy Policy
      </h1>
      <p className="text-muted-foreground text-sm">Effective Date: 01 Nov 2025</p>

      <p>
        This Privacy Policy describes how <strong>orgatick</strong> 
        (“we,” “our,” or “us”) collects, uses, stores, and protects your 
        personal information when you access or use our platform at 
        <strong> orgatick.in</strong>. By creating an account, registering 
        for an event, browsing the platform, or making a payment, 
        you acknowledge and agree to the practices outlined in this policy. 
        If you do not agree with any part of this policy, you must discontinue 
        use of the platform immediately.
      </p>

      <p>
        When you interact with orgatick, we may collect certain information 
        to support registration, ticketing, payments, and platform usage. 
        This includes basic personal details such as your name, phone number, 
        and email address, as well as optional information you voluntarily 
        provide when participating in an event. We also collect technical data 
        such as IP addresses, device identifiers, browser type, and usage logs 
        to ensure security and improve platform performance. If you register 
        for or host events, we store details related to events you create, 
        attend, or interact with. For payment processing, we use multiple payments gateway and 
        do not store sensitive financial information such as card numbers, UPI IDs, 
        or banking details.
      </p>

      <p>
        The information we collect is used to operate and improve the platform, 
        process event registrations and payments, communicate important event updates, 
        verify identity when necessary, prevent fraud, and maintain compliance with 
        applicable laws. We may also use your details to provide reminders, 
        confirmations, or support responses. Limited usage data may be processed 
        for analytics to help us improve user experience, performance, and security.
      </p>

      <p>
        We use cookies and similar technologies to support essential functions 
        such as login persistence, session tracking, and personalization. 
        You may disable cookies through your browser settings; however, doing so 
        may affect platform performance or restrict access to certain features.
      </p>

      <p>
        We do not sell or trade your personal information. However, we may share 
        necessary data with trusted partners who assist with payment processing, 
        notifications, ticket delivery, analytics, or operational support. 
        These service providers are bound by confidentiality and are permitted 
        to use your information only as required to perform their assigned functions 
        on behalf of orgatick.
      </p>

      <p>
        We retain personal information only for as long as it is reasonably necessary 
        for operational, legal, or security purposes. All sensitive data transmitted 
        to or from the platform is encrypted and stored securely. We use internal 
        access controls to prevent unauthorized access, misuse, or modification 
        of stored data.
      </p>

      <p>
        You may request access to personal information associated with your account, 
        request corrections if details are inaccurate, or request deletion where 
        applicable under law. Certain information may be retained where required 
        for compliance, fraud prevention, or financial reconciliation.
      </p>

      <p>
        orgatick is not intended for individuals under the age of 13. 
        We do not knowingly collect data from children. If such data is submitted 
        unintentionally, it will be deleted upon verification.
      </p>

      <p>
        The platform may include links to third-party websites or systems. 
        We do not control or take responsibility for the privacy policies, 
        security practices, or content of external services. We encourage users 
        to review third-party terms before interacting with external systems.
      </p>

      <p>
        If you are accessing orgatick from outside India, you acknowledge that your 
        information may be transferred to and processed in India or other regions 
        where our service providers operate.
      </p>

      <p>
        We may update this Privacy Policy periodically to reflect product changes, 
        legal requirements, or system enhancements. Any material updates will be 
        posted on this page. Continued use of the platform after such updates 
        constitutes acceptance of the revised policy.
      </p>

      <p>
        For privacy concerns, data-related inquiries, or deletion requests, 
        you may contact us at:{" "}
        <a href="mailto:support@orgatick.in" className="text-accent underline">
          support@orgatick.in
        </a>.
      </p>
    </motion.main>
  );
}

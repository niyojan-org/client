'use client';

import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <motion.main
      className="max-w-4xl mx-auto px-6 py-24 space-y-10 leading-relaxed bg-background text-foreground transition-colors duration-700"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      aria-label="Privacy Policy"
    >
      {/* Header */}
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary">
        Privacy Policy
      </h1>
      <p className="text-muted-foreground text-sm">Effective Date: June 15, 2025</p>

      <p className="text-foreground">
        At <strong>Orgatic</strong>, operated by Niyojan (“we”, “us”, or “our”), your privacy is a top priority. 
        This policy explains how we collect, use, and protect your information while you use our platform, including our website and services.
      </p>

      {/* Sections */}
      {[
        {
          title: "1. Information We Collect",
          items: [
            "Personal Info: Name, email, phone number",
            "Event Info: Events you create, attend, or interact with",
            "Billing Info: Payment details via Razorpay (we never store card info)",
            "Usage Data: IP address, browser type, pages visited, timestamps",
            "Cookies & Tracking: To improve your experience and analyze trends"
          ]
        },
        {
          title: "2. How We Use Your Data",
          items: [
            "Account registration & management",
            "Processing event registrations and payments",
            "Providing support and notifications",
            "Enhancing platform features, security, and usability",
            "Compliance with legal obligations and fraud prevention"
          ]
        },
        {
          title: "3. Cookies & Tracking",
          text: "We use cookies and similar tech to improve site functionality and understand user behavior. You can manage or disable cookies in your browser settings."
        },
        {
          title: "4. Sharing & Disclosure",
          text: "We do not sell personal information. Data may be shared only with trusted partners, such as:",
          items: [
            "Payment processors (Razorpay)",
            "Analytics and improvement tools",
            "Service providers under confidentiality agreements"
          ]
        },
        {
          title: "5. Data Retention & Security",
          text: "We retain your data only as long as necessary. All sensitive data is encrypted in transit and stored securely. Access is limited and monitored to prevent unauthorized use."
        },
        {
          title: "6. Your Rights",
          items: [
            "Access your data",
            "Correct inaccuracies",
            "Request deletion (as permitted by law)",
            "Withdraw consent if applicable",
            "Opt-out of marketing emails"
          ]
        },
        {
          title: "7. Children’s Privacy",
          text: "Our platform is not intended for children under 13. We do not knowingly collect data from children, and any such data is deleted immediately."
        },
        {
          title: "8. Third-Party Links",
          text: "We may link to external sites. Orgatic is not responsible for their privacy practices. Users should review each site’s privacy policies."
        },
        {
          title: "9. International Users",
          text: "By accessing from outside India, your information may be transferred and processed in India or other countries where our infrastructure operates."
        },
        {
          title: "10. Updates & Contact",
          text: "We may update this policy occasionally. Major changes will be communicated on our platform or via email.",
          contact: "support@orgatic.events"
        }
      ].map((section, index) => (
        <section className="space-y-4" key={index}>
          <h2 className="text-2xl font-semibold text-primary/75 ">{section.title}</h2>
          {section.text && <p className="text-foreground">{section.text}</p>}
          {section.items && (
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {section.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
          {section.contact && (
            <p className="text-foreground">
              Questions? Contact us at{' '}
              <a href={`mailto:${section.contact}`} className="text-accent underline">
                {section.contact}
              </a>.
            </p>
          )}
        </section>
      ))}
    </motion.main>
  );
}

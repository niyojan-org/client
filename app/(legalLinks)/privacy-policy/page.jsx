"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <motion.main
      className="max-w-4xl mx-auto px-6 py-24 text-gray-900 space-y-10 leading-relaxed"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      aria-label="Privacy Policy"
    >
      <h1 className="text-4xl sm:text-5xl font-bold text-indigo-700 tracking-tight">
        Privacy Policy
      </h1>
      <p className="text-sm text-gray-500">Effective Date: June 15, 2025</p>

      <p className="text-gray-700">
        At <strong>Orgatic</strong>, operated by Niyojan (“we”, “us”, or “our”), your privacy is a top priority. This policy explains how we collect, use, and protect your information while you use our platform, including our website and services.
      </p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-700">1. Information We Collect</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Personal Info:</strong> Name, email, phone number</li>
          <li><strong>Event Info:</strong> Events you create, attend, or interact with</li>
          <li><strong>Billing Info:</strong> Payment details via Razorpay (we never store card info)</li>
          <li><strong>Usage Data:</strong> IP address, browser type, pages visited, timestamps</li>
          <li><strong>Cookies & Tracking:</strong> To improve your experience and analyze trends</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-700">2. How We Use Your Data</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Account registration & management</li>
          <li>Processing event registrations and payments</li>
          <li>Providing support and notifications</li>
          <li>Enhancing platform features, security, and usability</li>
          <li>Compliance with legal obligations and fraud prevention</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-700">3. Cookies & Tracking</h2>
        <p className="text-gray-700">
          We use cookies and similar tech to improve site functionality and understand user behavior. You can manage or disable cookies in your browser settings.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-700">4. Sharing & Disclosure</h2>
        <p className="text-gray-700">
          We do <strong>not</strong> sell personal information. Data may be shared only with trusted partners, such as:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Payment processors (Razorpay)</li>
          <li>Analytics and improvement tools</li>
          <li>Service providers under confidentiality agreements</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-700">5. Data Retention & Security</h2>
        <p className="text-gray-700">
          We retain your data only as long as necessary. All sensitive data is encrypted in transit and stored securely. Access is limited and monitored to prevent unauthorized use.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-700">6. Your Rights</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Access your data</li>
          <li>Correct inaccuracies</li>
          <li>Request deletion (as permitted by law)</li>
          <li>Withdraw consent if applicable</li>
          <li>Opt-out of marketing emails</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-700">7. Children’s Privacy</h2>
        <p className="text-gray-700">
          Our platform is not intended for children under 13. We do not knowingly collect data from children, and any such data is deleted immediately.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-700">8. Third-Party Links</h2>
        <p className="text-gray-700">
          We may link to external sites. Orgatic is not responsible for their privacy practices. Users should review each site’s privacy policies.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-700">9. International Users</h2>
        <p className="text-gray-700">
          By accessing from outside India, your information may be transferred and processed in India or other countries where our infrastructure operates.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-700">10. Updates & Contact</h2>
        <p className="text-gray-700">
          We may update this policy occasionally. Major changes will be communicated on our platform or via email.
        </p>
        <p className="text-gray-700">
          Questions? Contact us at{' '}
          <a href="mailto:support@orgatic.events" className="text-orange-600 underline">
            support@orgatic.events
          </a>
          .
        </p>
      </section>
    </motion.main>
  );
}

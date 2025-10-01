"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <motion.main
      className="max-w-3xl mx-auto px-6 py-24 text-gray-800 space-y-8 leading-relaxed"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      aria-label="Privacy Policy"
    >
      <h1 className="text-4xl font-bold text-indigo-700">Privacy Policy</h1>
      <p className="text-sm text-gray-500">Effective Date: June 15, 2025</p>

      <p>
        At <strong>Orgatic</strong>, operated by Niyojan ("we", "us", or "our"), your privacy is one of our highest priorities. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, including our website and services.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">1. Information We Collect</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>Personal Identifiers: Name, email address, phone number</li>
        <li>Event Data: Events you create, attend, or interact with</li>
        <li>Billing Information: Payment details via Razorpay (we do <strong>not</strong> store card details)</li>
        <li>Usage Information: IP address, browser type, pages visited, date/time of visits</li>
        <li>Cookies and Tracking Technologies</li>
      </ul>

      <h2 className="text-2xl font-semibold text-indigo-700">2. How We Use Your Data</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>To register users and manage accounts</li>
        <li>To process event registrations and payments</li>
        <li>To provide customer support and notify users about updates</li>
        <li>To improve platform functionality, security, and experience</li>
        <li>To comply with legal obligations and prevent fraud</li>
      </ul>

      <h2 className="text-2xl font-semibold text-indigo-700">3. Cookies & Tracking</h2>
      <p className="text-gray-700">
        We use cookies and similar tracking technologies to analyze trends, administer the website, and understand user behavior. You can control or disable cookies through your browser settings.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">4. Sharing of Data</h2>
      <p className="text-gray-700">
        We do <strong>not</strong> sell your personal data. We may share data with trusted third parties such as:
      </p>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>Payment processors like Razorpay</li>
        <li>Analytics tools for platform improvement</li>
        <li>Service providers under strict confidentiality agreements</li>
      </ul>

      <h2 className="text-2xl font-semibold text-indigo-700">5. Data Retention</h2>
      <p className="text-gray-700">
        We retain your personal data only as long as necessary for the purposes outlined in this policy or to comply with legal requirements.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">6. Security</h2>
      <p className="text-gray-700">
        Your data is encrypted in transit using HTTPS and stored securely using best-in-class security practices, including limited access control and continuous monitoring. In case of any data breach, we will notify affected users promptly in accordance with applicable laws.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">7. Your Rights</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>Access your data</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion (subject to legal exceptions)</li>
        <li>Withdraw consent at any time (if applicable)</li>
        <li>Opt-out of marketing communications</li>
      </ul>

      <h2 className="text-2xl font-semibold text-indigo-700">8. Children’s Privacy</h2>
      <p className="text-gray-700">
        Our platform is not intended for children under 13. We do not knowingly collect personal data from children. If we discover such data, we will delete it immediately.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">9. Third-Party Links</h2>
      <p className="text-gray-700">
        Our website may contain links to third-party websites. We are not responsible for their privacy practices. We encourage users to review the privacy policies of external sites.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">10. International Users</h2>
      <p className="text-gray-700">
        If you access our services from outside India, your information may be transferred, stored, and processed in India or other countries where our infrastructure is located.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">11. Consent</h2>
      <p className="text-gray-700">
        By using our platform, you consent to the collection and use of your data as outlined in this Privacy Policy.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">12. Updates to This Policy</h2>
      <p className="text-gray-700">
        We may update this Privacy Policy periodically. Significant changes will be communicated via email or prominent notices on our platform.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700">13. Contact Information</h2>
      <p className="text-gray-700">
        For any questions or concerns regarding this policy, please contact us at{' '}
        <a href="mailto:support@orgatic.events" className="text-orange-600 underline">
          support@orgatic.events
        </a>.
      </p>
    </motion.main>
  );
}

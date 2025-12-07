"use client";

import { motion } from "framer-motion";

export default function RefundPolicy() {
  return (
    <motion.main
      role="main"
      aria-label="Refund Policy"
      className="max-w-4xl mx-auto px-6 py-8 space-y-10 leading-relaxed bg-background text-foreground transition-colors duration-700"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <h1 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">
        Refund Policy
      </h1>
      <p className="text-sm text-muted-foreground">Effective Date: 01 Nov 2025</p>

      <p>
        This Refund Policy explains how refunds are handled for transactions made 
        through <strong>orgatick</strong> at <strong>orgatick.in</strong>. By purchasing 
        a ticket or registering for any event listed on the Platform, you acknowledge 
        and agree to the terms described below. orgatick operates solely as a digital 
        platform enabling organizers to publish events and attendees to register. 
        orgatick does not host or run events and is not responsible for event execution, 
        changes, delays, or experience outcomes.
      </p>

      <p>
        All ticket purchases made through orgatick are considered final. Since tickets 
        are issued immediately after payment, refunds for voluntary cancellations are 
        not allowed under any circumstances. This includes, but is not limited to, 
        changes in personal plans, duplicate bookings, incorrect registration details, 
        inability to attend, scheduling conflicts, or misunderstandings about the event. 
        By completing payment, attendees confirm their intent to participate and accept 
        that no refunds will be issued for personal or discretionary reasons.
      </p>

      <p>
        In rare cases where an event is officially cancelled by the event organizer or 
        host institution, orgatick will automatically initiate a full refund to 
        attendees. This refund includes ticket value and any applicable processing or 
        platform charges. Attendees do not need to take any action to request such a 
        refund. If an event is rescheduled or postponed, the originally issued ticket 
        will remain valid for the new date. Refunds will only be issued if the event is 
        cancelled permanently and not moved to a future date.
      </p>

      <p>
        Tickets purchased on orgatick are delivered digitally via email and/or WhatsApp 
        immediately after successful payment processing. No physical tickets are shipped. 
        If a ticket is not received within a reasonable timeframe (typically within 10–15 
        minutes), attendees are required to contact the organizer or orgatick support as 
        soon as possible so the issue can be resolved. Failure to report non-delivery in a 
        timely manner may affect eligibility for escalation or dispute handling.
      </p>

      <p>
        When refunds are applicable, they will be processed through Razorpay and returned 
        to the original payment method used at checkout. Refunds typically take between 
        5–10 business days to appear depending on the attendee’s bank, card provider, or 
        UPI wallet. Additional processing time may apply for certain payment methods or 
        during banking delays, regulatory reviews, or holidays. orgatick cannot expedite 
        banking timelines outside its control.
      </p>

      <p>
        If an attendee believes there has been a payment-related error, technical 
        processing issue, or duplicate charge, they may contact orgatick support for 
        review. orgatick may mediate such cases when necessary; however, chargebacks or 
        unauthorized payment disputes raised directly with financial institutions without 
        first attempting resolution through support may result in account restrictions or 
        inability to participate in future events.
      </p>

      <p>
        This Refund Policy may be updated periodically to reflect changes in Platform 
        functionality, compliance requirements, or business operations. Continued use of 
        the Platform after such updates indicates acknowledgment and acceptance of the 
        revised terms.
      </p>

      <p>
        This Policy is governed by the laws of India. Any legal proceedings related to 
        refunds or payment disputes will fall under the jurisdiction of courts located 
        in Punjab, India.
      </p>

      <p className="text-sm text-muted-foreground">
        For refund inquiries or support assistance, contact us at{" "}
        <a href="mailto:support@orgatick.in" className="text-accent underline">
          support@orgatick.in
        </a>.
      </p>
    </motion.main>
  );
}

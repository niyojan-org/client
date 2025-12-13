"use client";
import { motion } from "framer-motion";

export default function DeliveryClient() {
  return (
    <motion.main
      role="main"
      aria-label="Digital Ticket Delivery Policy"
      className="max-w-4xl mx-auto px-6 py-8 space-y-10 leading-relaxed bg-background text-foreground transition-colors duration-700"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <h1 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">
        Digital Ticket Delivery Policy
      </h1>
      <p className="text-sm text-muted-foreground">Effective Date: 01 Nov 2025</p>

      <p>
        This Digital Ticket Delivery Policy outlines how tickets, confirmations, 
        and event access details are provided when a booking is completed through 
        <strong> orgatick</strong> at <strong>orgatick.in</strong>. By purchasing 
        a ticket or registering for an event, you agree to the terms described 
        within this Policy. orgatick operates as a digital platform and does not 
        issue or dispatch any physical tickets or printed passes.
      </p>

      <p>
        All event tickets distributed through the Platform are delivered 
        electronically. Once a payment is successfully completed, the attendee 
        will receive a digital confirmation and ticket, typically including a 
        unique QR code or registration ID. Delivery may occur through email, 
        WhatsApp, or SMS depending on available communication methods and the 
        details provided by the attendee during checkout. In addition to these 
        channels, attendees may be able to access their ticket during verification 
        at the event using the same email or phone number used while registering.
      </p>

      <p>
        In most cases, digital tickets are delivered instantly after the payment 
        is confirmed. However, slight delays may occur due to network congestion, 
        server load, or messaging channel limitations. If a ticket is not received 
        within approximately 10–15 minutes, attendees are advised to check their 
        spam or promotional folders and verify that the email address or phone 
        number entered during checkout was accurate.
      </p>

      <p>
        Because digital ticket delivery relies on the information submitted by the 
        attendee at the time of purchase, orgatick is not responsible for delivery 
        failures caused by incorrect or incomplete contact details. If incorrect 
        information was submitted, the attendee should contact the event organizer 
        or orgatick support so efforts can be made to assist where feasible.
      </p>

      <p>
        To gain entry to an event, attendees must present their valid digital ticket 
        or QR code at the registration desk or scanning point. Screenshots are usually 
        accepted unless an organizer specifies otherwise. Identity verification may be 
        required for certain events, and attendees are responsible for ensuring the 
        accuracy of their provided information.
      </p>

      <p>
        Receipt of a digital ticket does not guarantee eligibility for a refund. 
        Refunds are only issued if an event is officially cancelled and not 
        rescheduled. Attendees are encouraged to review orgatick’s Refund Policy 
        for full details.
      </p>

      <p>
        If a technical malfunction, server disruption, or verified platform error 
        prevents the successful delivery of a ticket despite confirmed payment, 
        orgatick will promptly resend or regenerate the ticket without additional 
        cost once the issue has been verified.
      </p>

      <p>
        orgatick may update this Delivery Policy from time to time to reflect 
        operational improvements or compliance requirements. Continued use of 
        the Platform after such updates signifies agreement with the revised terms.
      </p>

      <p className="text-sm text-muted-foreground">
        For questions or assistance related to ticket delivery or event access, 
        please contact us at{" "}
        <a className="text-accent underline" href="mailto:support@orgatick.in">
          support@orgatick.in
        </a>.
      </p>
    </motion.main>
  );
}

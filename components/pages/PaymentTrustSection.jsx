"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Head from "next/head";

export default function PaymentAssurance() {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <>
      <section
        className="relative bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 py-20 sm:py-28 overflow-hidden"
        aria-labelledby="payment-assurance-title"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="dot-pattern"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="4" cy="4" r="1.5" fill="#7c3aed" />
                <circle cx="20" cy="20" r="1.5" fill="#ec4899" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-pattern)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Section */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2
                id="payment-assurance-title"
                className="text-3xl sm:text-4xl font-extrabold text-indigo-900 font-sans tracking-tight"
              >
                Secure Payments with Razorpay
              </h2>

              <p className="text-lg text-indigo-700 font-medium leading-relaxed max-w-xl">
                Host and attend events with confidence. Razorpay ensures fast, secure, and reliable transactions — UPI, cards, netbanking, instant refunds, and automated payouts included.
              </p>

              <div className="flex items-center gap-4 mt-4">
                <Image
                  src="/images/razorpay.svg"
                  alt="Razorpay"
                  width={80}
                  height={40}
                  className="object-contain"
                  priority
                />
                <p className="text-sm text-indigo-500 font-medium">
                  Trusted by 10M+ users across India
                </p>
              </div>
            </motion.div>

            {/* Illustration */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-md h-[300px] sm:h-[350px] lg:h-[400px]">
                <Image
                  src="/images/online-payment.svg"
                  alt="Secure Payment Illustration"
                  fill
                  className="object-contain rounded-lg"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl opacity-40" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Structured Data for SEO */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PaymentService",
              name: "Orgatic Payment Processing",
              description:
                "Secure payments for events via Razorpay, supporting UPI, cards, and netbanking.",
              provider: {
                "@type": "Organization",
                name: "Orgatic",
              },
              paymentMethod: ["CreditCard", "UPIPayment", "NetBanking"],
            }),
          }}
        />
      </Head>
    </>
  );
}

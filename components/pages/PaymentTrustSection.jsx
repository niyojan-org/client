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
        className="relative py-12 sm:py-20 overflow-hidden bg-gradient-to-r from-background via-primary/5 to-card transition-colors duration-500"
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
                <circle cx="4" cy="4" r="1.5" className="fill-primary" />
                <circle cx="20" cy="20" r="1.5" className="fill-accent" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-pattern)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
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
                className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight text-primary dark:text-primary"
              >
                Secure Payments with Razorpay
              </h2>

              <p className="text-lg leading-relaxed max-w-xl">
                Host and attend events with confidence. Razorpay ensures fast, secure, and
                reliable transactions — UPI, cards, netbanking, instant refunds, and automated
                payouts included.
              </p>

              <div className="flex items-center gap-4 mt-4 w-auto">
                <Image
                  src="/images/razorpay.svg"
                  alt="Razorpay"
                  width={80}
                  height={40}
                  className="object-contain w-auto dark:bg-white rounded"
                  priority
                />
                <p className="text-sm text-muted-foreground font-medium">
                  Trusted by <span className="text-primary  font-semibold">10M+</span> users across India
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
                  className="object-contain rounded-lg drop-shadow-md"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl opacity-40" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEO Structured Data */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PaymentService",
              name: "orgatick Payment Processing",
              description:
                "Secure payments for events via payment gateway, supporting UPI, cards, and netbanking.",
              provider: {
                "@type": "Organization",
                name: "orgatick",
              },
              paymentMethod: ["CreditCard", "UPIPayment", "NetBanking", "All major payment services"],
            }),
          }}
        />
      </Head>
    </>
  );
}

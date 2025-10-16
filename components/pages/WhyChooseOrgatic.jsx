"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Rocket, BarChart3 } from "lucide-react";
import Head from "next/head";

export default function WhyChooseOrgatic() {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Collaborate Seamlessly",
      desc: "Organizers, clubs, and sponsors manage everything together — from planning to promotion.",
    },
    {
      icon: <Rocket className="w-8 h-8 text-primary" />,
      title: "Join & Experience More",
      desc: "Discover student-led events, fests, and workshops that match your interests and goals.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      title: "Grow Your Network",
      desc: "Connect, showcase achievements, and expand your presence across the student community.",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <>
      <section
        className="relative bg-background py-20 sm:py-28 transition-colors duration-300 border-t border-border"
        aria-labelledby="why-choose-orgatic"
      >
        {/* Decorative Blobs */}
        <div className="absolute -top-16 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl opacity-30" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Section Heading */}
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            id="why-choose-orgatic"
            className="text-4xl sm:text-5xl font-extrabold mb-6 text-foreground"
          >
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Why Choose Orgatic?
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto text-lg text-muted-foreground mb-16"
          >
            Built for everyone who makes campus events happen — whether you’re
            <span className="text-primary font-semibold"> organizing </span>
            or <span className="text-secondary font-semibold"> participating</span>.
            We help you connect, manage, and grow — together.
          </motion.p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            {features.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-card text-card-foreground rounded-2xl p-8 shadow-sm border border-border hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-full bg-primary/10">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
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
              "@type": "Organization",
              name: "Orgatic EMS",
              description:
                "Orgatic helps both organizers and participants connect, manage, and grow through college events, fests, and collaborations.",
              url: "https://rasaems.com",
            }),
          }}
        />
      </Head>
    </>
  );
}

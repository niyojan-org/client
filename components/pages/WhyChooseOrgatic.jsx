"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Rocket, BarChart3 } from "lucide-react";
import Script from "next/script";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function WhyChooseorgatick() {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Collaborate Seamlessly",
      desc: "Organizers, clubs, and sponsors work together — from planning to promotion, all in one place.",
    },
    {
      icon: <Rocket className="w-8 h-8 text-primary" />,
      title: "Join & Experience More",
      desc: "Discover college events, fests, and workshops that match your passions and goals.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      title: "Grow Your Network",
      desc: "Connect with peers, showcase your achievements, and expand your event presence across campuses.",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
    }),
  };

  return (
    <>
      <section
        className="relative bg-background py-16 sm:py-20 transition-colors duration-300 border-t border-border"
        aria-labelledby="why-choose-orgatick"
      >
        {/* Decorative Blobs */}
        <div className="absolute -top-16 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl opacity-30" />

        <div className="relative z-10 max-w-6xl mx-auto #TODO text-center">
          {/* Section Heading */}
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            id="why-choose-orgatick"
            className="text-4xl sm:text-5xl font-extrabold mb-6 text-foreground"
          >
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Why Choose orgatick?
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
            className="max-w-3xl mx-auto text-lg text-muted-foreground mb-16"
          >
            Built for everyone who makes campus events happen — whether you’re
            <span className="text-primary font-semibold"> organizing </span>
            or
            <span className="text-secondary font-semibold"> participating</span>.
            orgatick helps you connect, manage, and grow — together.
          </motion.p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {features.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                className="flex"
              >
                <Card className=" bg-transparent border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="flex flex-row items-center space-x-6 text-center">
                    <div className="p-3 rounded-full bg-primary/10">
                      {item.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {item.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <CardDescription className="text-muted-foreground leading-relaxed text-center text-base">
                      {item.desc}
                    </CardDescription>
                  </CardContent>
                  
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Structured Data using next/script (safe + SSR compatible) */}
      <Script
        id="orgatick-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "orgatick EMS",
            description:
              "orgatick helps organizers and participants connect, manage, and grow through college events, fests, and collaborations.",
            url: "https://rasaems.com",
            logo: "https://rasaems.com/logo.png",
            sameAs: [
              "https://twitter.com/orgatickems",
              "https://linkedin.com/company/orgatickems",
            ],
          }),
        }}
      />
    </>
  );
}

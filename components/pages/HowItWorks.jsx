"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  Settings2,
  Rocket,
  Users2,
  CalendarDays,
  Star,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function HowItWorks() {
  const sections = [
    {
      id: "organizers",
      title: "For Organizers",
      subtitle:
        "Plan, manage, and scale your events effortlessly — from concept to celebration.",
      color: "from-primary/10 via-primary/5 to-transparent",
      steps: [
        {
          title: "Create Your Organization",
          description:
            "Set up your club, college, or community profile in minutes. Customize branding and event categories effortlessly.",
          icon: ClipboardCheck,
        },
        {
          title: "Host & Manage Events",
          description:
            "Add schedules, ticket types, and team roles starting at just ₹299. Manage registrations and updates from one powerful dashboard.",
          icon: Settings2,
        },
        {
          title: "Launch & Grow",
          description:
            "Go live instantly, track engagement and payments, and grow your reach with data-driven insights.",
          icon: Rocket,
        },
      ],
    },
    {
      id: "participants",
      title: "For Participants",
      subtitle:
        "Discover, join, and enjoy campus events designed to inspire and connect you.",
      color: "from-secondary/10 via-accent/5 to-transparent",
      steps: [
        {
          title: "Explore Events",
          description:
            "Browse curated fests, workshops, and hackathons tailored to your interests and skills.",
          icon: CalendarDays,
        },
        {
          title: "Join & Connect",
          description:
            "Register instantly, secure tickets, and engage with peers through shared experiences.",
          icon: Users2,
        },
        {
          title: "Experience & Earn",
          description:
            "Attend, share feedback, and collect rewards that highlight your achievements.",
          icon: Star,
        },
      ],
    },
  ];

  return (
    <section
      className="relative py-12 sm:py-16 border-t border-border bg-gradient-to-b from-background via-card/80 to-background"
      aria-labelledby="how-it-works-title"
    >
      {/* ✨ Background Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/10 dark:bg-secondary/20 rounded-full blur-3xl opacity-20 -z-10" />

      {/* 🔹 Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.h2
          id="how-it-works-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground"
        >
          How orgatick Works for Everyone
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          orgatick unites{" "}
          <span className="text-primary font-semibold">organizers</span> and{" "}
          <span className="text-secondary font-semibold">participants</span>{" "}
          — making campus events simple, social, and unforgettable.
        </motion.p>
      </div>

      {/* 🔹 Organizer + Participant Sections */}
      <div className="flex flex-col gap-8 max-w-7xl mx-auto">
        {sections.map((group, gIndex) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: gIndex * 0.15 }}
            className={`rounded-3xl p-8 sm:p-8 border border-border shadow-sm bg-gradient-to-b ${group.color}`}
          >
            {/* Subheading */}
            <div className="text-center mb-5">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                {group.title}
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                {group.subtitle}
              </p>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {group.steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: gIndex * 0.2 + index * 0.1,
                    }}
                  >
                    <Card className=" bg-card border border-border hover:border-primary/20 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-2 h-full">
                      <CardHeader className="flex flex-row items-center gap-3">
                        <div className="p-3 rounded-full bg-gradient-to-tr from-primary/10 via-accent/10 to-secondary/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-base sm:text-lg font-semibold text-foreground leading-tight">
                          {step.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base text-muted-foreground leading-relaxed">
                          {step.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
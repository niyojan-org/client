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

export default function HowItWorks() {
  const sections = [
    {
      id: "organizers",
      title: "For Organizers",
      subtitle:
        "Plan, manage, and grow your student events with confidence — from idea to celebration.",
      color: "from-primary/10 via-primary/5 to-transparent",
      steps: [
        {
          title: "Create Your Organization",
          description:
            "Set up your club, college, or society profile in minutes. Customize your event categories and branding.",
          icon: ClipboardCheck,
        },
        {
          title: "Host & Manage Events",
          description:
            "Add schedules, tickets, and team roles. Manage registrations and updates effortlessly in real time.",
          icon: Settings2,
        },
        {
          title: "Launch & Grow",
          description:
            "Go live instantly. Track engagement, analytics, and payments. Expand your community with ease.",
          icon: Rocket,
        },
      ],
    },
    {
      id: "participants",
      title: "For Participants",
      subtitle:
        "Discover, join, and experience incredible student events — all in one place.",
      color: "from-secondary/10 via-accent/5 to-transparent",
      steps: [
        {
          title: "Explore Exciting Events",
          description:
            "Browse fests, workshops, hackathons, and meetups curated for students like you.",
          icon: CalendarDays,
        },
        {
          title: "Join & Connect",
          description:
            "Grab your tickets instantly, connect with other attendees, and stay updated on upcoming events.",
          icon: Users2,
        },
        {
          title: "Enjoy & Earn Rewards",
          description:
            "Attend, share feedback, and earn participation rewards that boost your student profile.",
          icon: Star,
        },
      ],
    },
  ];

  return (
    <section
      className="relative py-24 sm:py-28 px-6 sm:px-10 lg:px-16 border-t border-border bg-gradient-to-b from-background via-card/50 to-background"
      aria-labelledby="how-it-works-title"
    >
      {/* Subtle blobs for light/dark mode depth */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/10 dark:bg-secondary/20 rounded-full blur-3xl opacity-20 -z-10" />

      {/* Main Heading */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <motion.h2
          id="how-it-works-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary"
        >
          How Orgatic Works for Everyone
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          Orgatic bridges the gap between <span className="text-primary font-semibold">organizers</span> and{" "}
          <span className="text-secondary font-semibold">participants</span> —
          making campus events simple, inclusive, and exciting.
        </motion.p>
      </div>

      {/* Organizer + Participant Sections */}
      <div className="flex flex-col gap-24 max-w-6xl mx-auto">
        {sections.map((group, gIndex) => (
          <div
            key={group.id}
            className={`rounded-3xl p-10 border border-border shadow-sm bg-gradient-to-b ${group.color}`}
          >
            {/* Subheading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h3 className="text-3xl font-bold text-foreground mb-3">
                {group.title}
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                {group.subtitle}
              </p>
            </motion.div>

            {/* Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {group.steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: gIndex * 0.2 + index * 0.1,
                    }}
                    className="flex flex-col items-center text-center p-8 rounded-2xl bg-card border border-border hover:shadow-md hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="w-16 h-16 mb-5 flex items-center justify-center rounded-full bg-gradient-to-tr from-primary/10 via-accent/10 to-secondary/10">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

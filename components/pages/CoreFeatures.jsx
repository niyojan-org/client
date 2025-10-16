'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Ticket,
  BarChart,
  Bell,
  Users,
  Settings,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export default function CoreFeatures() {
  const features = [
    {
      title: 'Effortless Event Creation',
      description:
        'Plan and publish events or fests in minutes — no technical knowledge required. Focus on experience, not setup.',
      icon: Calendar,
    },
    {
      title: 'Secure Ticketing & Payments',
      description:
        'Integrated Razorpay for smooth, instant, and verified payments — ensuring complete trust and transparency.',
      icon: Ticket,
    },
    {
      title: 'Smart Analytics Dashboard',
      description:
        'Track attendance, sales, and engagement visually. Make confident, data-driven event decisions.',
      icon: BarChart,
    },
    {
      title: 'Automated Notifications',
      description:
        'Stay connected with attendees via real-time email and push alerts, completely automated.',
      icon: Bell,
    },
    {
      title: 'Team Collaboration',
      description:
        'Invite teammates, assign roles, and manage permissions — all from one secure dashboard.',
      icon: Users,
    },
    {
      title: 'Customizable Organization Panel',
      description:
        'Tailor your event portal — adjust themes, preferences, and layouts to match your brand.',
      icon: Settings,
    },
    {
      title: 'Data Security & Trust',
      description:
        'We use enterprise-grade encryption to protect user and payment data — always safe, always private.',
      icon: ShieldCheck,
    },
    {
      title: 'Built for Students',
      description:
        'Crafted for the creativity, collaboration, and scale of campus events — flexible and future-ready.',
      icon: Sparkles,
    },
  ];

  return (
    <section
      className="relative py-24 sm:py-12 px-6 sm:px-10 lg:px-16 bg-gradient-to-b from-background via-primary/5 to-card border-t border-border"
      aria-labelledby="core-features-title"
    >
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl opacity-20 -z-10" />

      {/* Section Heading */}
      <motion.h2
        id="core-features-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-5xl font-extrabold text-center text-primary mb-6 tracking-tight"
      >
        <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Everything You Need
        </span>{' '}
        to Host Smarter Events
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-3xl mx-auto text-center text-muted-foreground mb-16 text-lg leading-relaxed"
      >
        From registrations to analytics — manage, monitor, and scale your events confidently with one intuitive platform.
      </motion.p>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-300 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-3 rounded-xl bg-gradient-to-tr from-primary/10 via-accent/10 to-secondary/10 w-fit mb-5">
                <Icon className="w-8 h-8 text-primary" />
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

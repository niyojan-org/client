"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Ticket,
  BarChart,
  Bell,
  Users,
  Settings,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function CoreFeatures() {
  const features = [
    {
      title: "Effortless Event Creation",
      description: "Plan and launch events or college fests within minutes — no tech skills required.",
      icon: Calendar,
    },
    {
      title: "Secure Ticketing & Payments",
      description: "Sell passes with Razorpay integration for instant, safe, and transparent transactions.",
      icon: Ticket,
    },
    {
      title: "Smart Analytics Dashboard",
      description: "Visualize attendance, engagement, and revenue in real-time for better decisions.",
      icon: BarChart,
    },
    {
      title: "Automated Notifications",
      description: "Keep your audience updated with real-time email and app alerts — effortlessly.",
      icon: Bell,
    },
    {
      title: "Team Collaboration",
      description: "Add admins, assign roles, and manage your event team with complete control.",
      icon: Users,
    },
    {
      title: "Customizable Organization Panel",
      description: "Tailor your organization’s portal — themes, settings, and permissions, all your way.",
      icon: Settings,
    },
    {
      title: "Data Security & Trust",
      description: "Your data and transactions are encrypted and handled with enterprise-grade protection.",
      icon: ShieldCheck,
    },
    {
      title: "Designed for Students",
      description: "Built for the energy, creativity, and challenges of campus life — and beyond.",
      icon: Sparkles,
    },
  ];

  return (
    <section
      className="bg-gradient-to-b from-[#f9fafb] to-[#eef2ff] py-20 px-6 sm:px-10 lg:px-16"
      aria-label="Core Features"
    >
      {/* Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl font-extrabold text-center text-indigo-900 mb-6"
      >
        <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Everything You Need
        </span>{" "}
        to Host Smarter Events
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center text-gray-600 mb-16 text-lg"
      >
        From registrations to analytics, our tools help you plan, manage, and grow your events — all in one platform.
      </motion.p>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -6 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="p-3 rounded-full bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 w-fit mb-5">
                <Icon className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

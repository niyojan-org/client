"use client";
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Ticket, BarChart, Bell } from "lucide-react";

export default function CoreFeatures() {
  const features = [
    {
      title: "Easy Creation",
      description: "Set up college fests or events in minutes with intuitive tools.",
      icon: Calendar,
    },
    {
      title: "Secure Ticketing",
      description: "Sell tickets with Razorpay-powered secure payments and instant delivery.",
      icon: Ticket,
    },
    {
      title: "Real-Time Analytics",
      description: "Track fest revenue and attendance live with actionable insights.",
      icon: BarChart,
    },
    {
      title: "Notifications",
      description: "Keep attendees updated with automated email reminders.",
      icon: Bell,
    },
  ];

  return (
    <section
      className="bg-gradient-to-b from-[#f9fafb] to-[#e5e7eb] py-20 px-6 sm:px-10 lg:px-16"
      aria-label="Core Features"
    >
      {/* Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl font-extrabold text-center text-indigo-900 mb-16"
      >
        <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Amazing Tools
        </span>{" "}
        for Event Creators
      </motion.h2>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-200 cursor-pointer transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              {/* Icon */}
              <div className="p-3 rounded-full bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 w-fit mb-4">
                <Icon className="w-8 h-8 text-indigo-600" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-indigo-900 mb-2">{feature.title}</h3>

              {/* Description */}
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

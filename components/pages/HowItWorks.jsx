"use client";
import React from "react";
import { motion } from "framer-motion";
import { ClipboardCheck, Settings2, Rocket } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Create Your Organization",
      description:
        "Sign up, set your college or community name, and customize your organization dashboard in minutes.",
      icon: ClipboardCheck,
    },
    {
      id: 2,
      title: "Host & Manage Events",
      description:
        "Plan fests, workshops, or meetups — add tickets, set schedules, and invite your team to collaborate.",
      icon: Settings2,
    },
    {
      id: 3,
      title: "Launch & Grow",
      description:
        "Go live with your event, track registrations and payments, and grow your reach with real-time insights.",
      icon: Rocket,
    },
  ];

  return (
    <section
      className="bg-white py-20 px-6 sm:px-10 lg:px-16 border-t border-gray-200"
      aria-label="How It Works"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl font-extrabold text-center text-indigo-900 mb-6"
      >
        <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          How It Works
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center text-gray-600 mb-16 text-lg"
      >
        Getting started is easy — whether you’re planning your first college fest or managing
        a full-scale student organization, our platform grows with you.
      </motion.p>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.id}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-b from-white to-indigo-50 shadow-sm hover:shadow-md border border-gray-200 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 mb-5 flex items-center justify-center rounded-full bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100">
                <Icon className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-indigo-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Connection Line */}
      <div className="hidden md:flex justify-center mt-10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "66%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="h-[2px] bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full"
        />
      </div>
    </section>
  );
}

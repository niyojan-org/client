'use client';

import React from "react";
import { motion } from "framer-motion";
import {
  IconCalendarCancel,
  IconUserExclamation,
  IconCurrencyDollarOff,
} from "@tabler/icons-react";

export default function WhyWeExist() {
  const problems = [
    {
      icon: <IconCalendarCancel size={42} className="text-indigo-600" />,
      title: "Event Chaos Everywhere",
      desc: "Spreadsheets, forms, and endless WhatsApp messages — managing even one event feels like a full-time job.",
    },
    {
      icon: <IconUserExclamation size={42} className="text-indigo-600" />,
      title: "Zero Collaboration",
      desc: "Clubs, volunteers, and faculty all use different tools. Miscommunication kills excitement and productivity.",
    },
    {
      icon: <IconCurrencyDollarOff size={42} className="text-indigo-600" />,
      title: "Unclear Payments & Tracking",
      desc: "From ticket sales to approvals, handling payments and updates securely shouldn't be this hard.",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      className="bg-white py-20 sm:py-24"
      aria-labelledby="why-we-exist"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-10"
        >
          Why We Exist
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-lg text-gray-600 mb-16"
        >
          Because hosting college events should be exciting — not exhausting.
          We built a platform that replaces chaos with clarity, helping students
          and organizations bring their ideas to life.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {problems.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gray-50 hover:bg-gray-100 transition-all duration-300 rounded-2xl p-8 shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-indigo-100">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

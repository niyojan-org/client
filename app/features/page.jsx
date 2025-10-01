'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Shield,
  Ticket,
  LayoutDashboard,
  UserCheck,
  Globe,
  Palette,
  Lock,
  GraduationCap,
  Megaphone,
  Smartphone,
  LifeBuoy,
  Bell,
  BarChart,
  Users,
  Plug,
  MessageCircle,
  Accessibility,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Features() {
  const features = [
    {
      icon: Globe,
      title: 'Event Discovery',
      description: 'Easily browse online & offline events with smart filters and location-aware results.',
    },
    {
      icon: Ticket,
      title: 'Easy Ticketing',
      description: 'Secure payments. Instant ticket delivery (PDF + QR). Refund policy included.',
    },
    {
      icon: Shield,
      title: 'Verified Organizers',
      description: 'Only trusted organizations can host. Every organizer is manually verified.',
    },
    {
      icon: LayoutDashboard,
      title: 'Organizer Dashboard',
      description: 'Track ticket sales, revenue, attendees in real-time with smart charts.',
    },
    {
      icon: UserCheck,
      title: 'Admin Panel',
      description: 'Create, manage, and promote events all from one place — no code needed.',
    },
    {
      icon: CheckCircle,
      title: 'Unique Event Pages',
      description: 'Each event gets its own beautiful page — share anywhere.',
    },
    {
      icon: Palette,
      title: 'Modern Design',
      description: 'Built with a mobile-first, clean UI using Next.js, Tailwind, and Framer Motion.',
    },
    {
      icon: Lock,
      title: 'Secure Auth',
      description: 'User verification, rate limiting, and encrypted data to protect your account.',
    },
    {
      icon: GraduationCap,
      title: 'Student-Friendly',
      description: 'Built by students, for students — zero fluff, all value.',
    },
    {
      icon: Megaphone,
      title: 'Marketing Tools',
      description: 'Email campaigns, social media integrations, and promotion made easy.',
    },
    {
      icon: Smartphone,
      title: 'Personalized Recommendations',
      description: 'Discover events tailored to your interests and location.',
    },
    {
      icon: LifeBuoy,
      title: '24/7 Support',
      description: 'Our team is here to help organizers and attendees anytime.',
    },
    // Added features:
    {
      icon: Bell,
      title: 'Real-time Notifications',
      description: 'Instant alerts for event updates, reminders, and cancellations.',
    },
    {
      icon: BarChart,
      title: 'Advanced Analytics',
      description: 'In-depth reports on attendance, revenue, and user engagement.',
    },
    {
      icon: Users,
      title: 'Capacity & Waitlists',
      description: 'Automatic waitlist management for fully booked events.',
    },
    {
      icon: Plug,
      title: 'Integrations & APIs',
      description: 'Connect with calendars, CRM, social media, and other tools.',
    },
    {
      icon: MessageCircle,
      title: 'Community & Feedback',
      description: 'Gather feedback and foster connections after events.',
    },
    {
      icon: Accessibility,
      title: 'Accessibility',
      description: 'Built to be inclusive and usable by everyone.',
    },
  ];

  return (
    <div className="pt-24 bg-gradient-to-b from-white to-slate-100 min-h-screen px-4 sm:px-12 md:px-20 lg:px-32">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Everything You Need to Run Events 🎉
        </h1>
        <p className="text-lg text-slate-600">
          Whether you're an organizer or an attendee — Orgatic gives you all the tools to create, manage, and experience events seamlessly.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              className="group"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card className="hover:shadow-xl hover:scale-[1.03] transition duration-300 border border-slate-200">
                <CardContent className="p-6 flex flex-col items-start gap-4">
                  <Icon className="w-10 h-10 text-indigo-600 group-hover:scale-110 transition-transform duration-200" />
                  <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                  {/* Optional Learn More */}
                  {/* <Button variant="link" size="sm" className="p-0 text-indigo-600 hover:underline">
                    Learn More
                  </Button> */}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-20 bg-indigo-600 text-white rounded-2xl p-10 text-center shadow-xl">
        <h2 className="text-3xl font-bold mb-4">Start Hosting or Attending Events Effortlessly</h2>
        <p className="mb-6 text-slate-100">Join thousands of students and organizers simplifying event management on Orgatic.</p>
        <Button
          variant="default"
          className="hover:scale-105 transition transform shadow-lg"
          onClick={() => window.location.href = '/events'}
        >
          Explore Events
        </Button>
      </div>
    </div>
  );
}

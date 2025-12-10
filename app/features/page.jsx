'use client';

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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { metadata } from '../layout';

export default function Features() {
  const features = [
    { icon: Globe, title: 'Event Discovery', description: 'Easily browse online & offline events with smart filters and location-aware results.' },
    { icon: Ticket, title: 'Easy Ticketing', description: 'Secure payments. Instant ticket delivery (PDF + QR). Refund policy included.' },
    { icon: Shield, title: 'Verified Organizers', description: 'Only trusted organizations can host. Every organizer is manually verified.' },
    { icon: LayoutDashboard, title: 'Organizer Dashboard', description: 'Track ticket sales, revenue, and attendees in real time with smart charts.' },
    { icon: UserCheck, title: 'Admin Panel', description: 'Create, manage, and promote events — no code needed.' },
    { icon: CheckCircle, title: 'Unique Event Pages', description: 'Each event gets its own beautiful shareable page.' },
    { icon: Palette, title: 'Modern Design', description: 'Built with Next.js, Tailwind, and Framer Motion — clean and mobile-first.' },
    { icon: Lock, title: 'Secure Auth', description: 'Verification, rate limiting, and encrypted data keep you safe.' },
    { icon: Megaphone, title: 'Marketing Tools', description: 'Email campaigns, social media integrations, and promotion tools.' },
    { icon: Smartphone, title: 'Personalized Recommendations', description: 'Discover events tailored to your interests and location.' },
    { icon: LifeBuoy, title: '24/7 Support', description: 'We’re always here to help — organizers and attendees alike.' },
    { icon: Bell, title: 'Real-time Notifications', description: 'Instant alerts for event updates and reminders.' },
    { icon: BarChart, title: 'Advanced Analytics', description: 'In-depth reports on attendance, revenue, and engagement.' },
    { icon: Users, title: 'Capacity & Waitlists', description: 'Automatic waitlist management for full events.' },
    { icon: Plug, title: 'Integrations & APIs', description: 'Connect with calendars, CRMs, and social media.' },
    { icon: MessageCircle, title: 'Community & Feedback', description: 'Gather feedback and build your event community.' },
    { icon: Accessibility, title: 'Accessibility', description: 'Designed to be inclusive and usable by everyone.' },
  ];

  return (
    <section className="min-h-dvh sm:px-12 md:px-20 lg:px-32 transition-colors duration-700 pb-10 scroll-smooth">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Everything You Need to Run Events
        </h1>
        <p className="text-lg text-muted-foreground">
          Whether you're an organizer or attendee — orgatick gives you all the tools to create, manage, and experience events seamlessly.
        </p>
      </div>

      {/* Features Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card className="bg-card border border-border gap-3 sm:gap-4 shadow-sm hover:shadow-xl hover:scale-[1.03] transition-transform duration-300">
                <CardHeader className="flex items-center gap-3">
                  <Icon className="w-10 h-10 text-primary" />
                  <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* CTA Section */}
      <div className="sm:mt-24 text-center mt-6">
        <div className="rounded-2xl sm:p-10 inline-block max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">
            Start Hosting or Attending Events Effortlessly
          </h2>
          <p className="mb-6 opacity-90">
            Join thousands simplifying event management with orgatick.
          </p>
          <Link href="/events">
            <Button size="lg" className="hover:scale-105 transition-transform">
              Explore Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

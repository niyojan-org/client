'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Orgatic simplified our event fest! Easy setup and ticketing.",
      name: "Abhiraj",
      role: "Organizer",
      avatar: "https://avatar.iran.liara.run/public/boy",
    },
    {
      quote: "Tickets arrived instantly! Loved the seamless experience.",
      name: "Priya",
      role: "Attendee",
      avatar: "https://avatar.iran.liara.run/public/girl",
    },
    {
      quote: "Analytics saved our event! This is a game-changer.",
      name: "Sanjay",
      role: "Organizer",
      avatar: "https://avatar.iran.liara.run/public/boy",
    },
    {
      quote: "Orgatic simplified our LPU fest! Easy setup and ticketing.",
      name: "Kumar Ayush",
      role: "Organizer",
      avatar: "https://avatar.iran.liara.run/public/boy",
    },
    {
      quote: "Tickets arrived instantly! Loved the seamless experience.",
      name: "Saumya",
      role: "Attendee",
      avatar: "https://avatar.iran.liara.run/public/girl",
    },
    {
      quote: "Analytics saved our event! This is a game-changer.",
      name: "Sanjana",
      role: "Organizer",
      avatar: "https://avatar.iran.liara.run/public/girl",
    },
  ];

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation direction (horizontal for desktop, vertical for mobile)
  const animationVariant = isMobile
    ? {
        animate: {
          x: ['0%', '50%'],
          transition: { repeat: Infinity, duration: 60, ease: 'linear' },
        },
      }
    : {
        animate: {
          x: ['0%', '-50%'],
          transition: { repeat: Infinity, duration: 40, ease: 'linear' },
        },
      };

  return (
    <section
      className="relative py-24 sm:py-28 overflow-hidden bg-gradient-to-b from-background via-primary/5 to-card"
      aria-label="Testimonials"
    >
      {/* Decorative Blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse" />
      <div className="absolute bottom-[-3rem] right-[-3rem] w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-ping" />

      <div className="relative z-10 max-w-7xl mx-auto  sm:px-0 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-4xl font-extrabold text-primary font-sans"
        >
          Loved by Organizer & Attendees
        </motion.h2>

        <p className="text-muted-foreground mt-3 text-base font-medium max-w-xl mx-auto">
          Real voices. Real stories. See why people trust Orgatic.
        </p>

        {/* Moving Testimonials */}
        <div
          className={`relative overflow-hidden ${
            isMobile ? 'h-[700px]' : 'h-[320px]'
          } mt-16`}
        >
          <motion.div
            className={`flex ${
              isMobile ? 'flex-col' : 'flex-row'
            } gap-8 w-max`}
            variants={animationVariant}
            animate="animate"
          >
            {[...testimonials, ...testimonials].map((t, index) => (
              <Card
                key={`${t.name}-${index}`}
                className="bg-card border border-border shadow-md hover:shadow-lg transition-all duration-300 rounded-xl w-[280px] flex-shrink-0"
              >
                <CardContent className="px-4 flex flex-col gap-3">
                  {/* Avatar & Info */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12">
                      <Image
                        src={t.avatar}
                        alt={`Avatar of ${t.name}`}
                        sizes='20'
                        fill
                        // loading='lazy'
                        className="rounded-full object-cover border border-primary/20"
                      />
                    </div>
                    <div>
                      <p className="text-primary font-semibold">{t.name}</p>
                      <p className="text-sm text-muted-foreground">{t.role}</p>
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-foreground/80 italic leading-snug">
                    “{t.quote}”
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>

      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Review',
            itemReviewed: {
              '@type': 'Product',
              name: 'Orgatic Event Management System',
            },
            review: testimonials.map((t) => ({
              '@type': 'Review',
              author: { '@type': 'Person', name: t.name },
              reviewBody: t.quote,
              reviewRating: { '@type': 'Rating', ratingValue: 5 },
            })),
          }),
        }}
      />
    </section>
  );
}

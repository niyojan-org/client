'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Rasa simplified our LPU fest! Easy setup and ticketing.",
      name: "Alok",
      role: "Student Organizer",
      avatar: "https://images.unsplash.com/photo-1614282213165-04cdafedee6c",
    },
    {
      quote: "Tickets arrived instantly! Loved the seamless experience.",
      name: "Priya",
      role: "Attendee",
      avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
    },
    {
      quote: "Analytics saved our event! This is a game-changer.",
      name: "Abhishek",
      role: "Student Organizer",
      avatar: "https://images.unsplash.com/photo-1629115108446-6819f42c0f42",
    },
  ];

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const animationVariant = isMobile
    ? {
        animate: {
          y: ["0%", "-50%"],
          transition: { repeat: Infinity, duration: 50, ease: "linear" },
        },
      }
    : {
        animate: {
          x: ["0%", "-50%"],
          transition: { repeat: Infinity, duration: 60, ease: "linear" },
        },
      };

  return (
    <section className="relative bg-white py-28 overflow-hidden" aria-label="Testimonials">
      {/* Background Blobs */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#DBEAFE] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse z-0" />
      <div className="absolute bottom-[-3rem] right-[-3rem] w-72 h-72 bg-[#FDE68A] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-ping z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-extrabold text-indigo-900 font-poppins"
        >
          Loved by Hosts & Attendees
        </motion.h2>
        <p className="text-gray-600 mt-3 text-base font-medium max-w-xl mx-auto">
          Real voices. Real stories. See why people trust Rasa.
        </p>

        <div className={`relative overflow-hidden ${isMobile ? "h-[700px]" : "h-[350px]"} mt-16`}>
          <motion.div
            className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-8 w-max`}
            variants={animationVariant}
            animate="animate"
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <Card
                key={`${testimonial.name}-${index}`}
                className="bg-[#f0f9ff] border-none shadow-xl hover:shadow-2xl transition-all rounded-2xl w-[300px] flex-shrink-0"
              >
                <CardContent className="p-6 flex flex-col gap-4">
                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14">
                      <Image
                        src={testimonial.avatar}
                        alt={`Avatar of ${testimonial.name}`}
                        fill
                        className="rounded-full object-cover border-4 border-white shadow-md"
                      />
                      <div className="absolute inset-0 rounded-full animate-ping bg-[#F97316]/10 z-[-1]" />
                    </div>
                    <div>
                      <p className="text-indigo-900 font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-700 italic leading-relaxed mt-2">
                    “{testimonial.quote}”
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            itemReviewed: {
              "@type": "Product",
              name: "Rasa Event Management System",
            },
            review: testimonials.map((t) => ({
              "@type": "Review",
              author: { "@type": "Person", name: t.name },
              reviewBody: t.quote,
              reviewRating: { "@type": "Rating", ratingValue: 5 },
            })),
          }),
        }}
      />
    </section>
  );
}

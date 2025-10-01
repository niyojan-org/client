"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import landingPageContent from "@/constants/LandingPageContent";

export default function WhoIsItFor() {
  const { title, images } = landingPageContent.imageCarousel;

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    hover: {
      scale: 1.05,
      y: -6,
      boxShadow: "0 20px 30px rgba(0,0,0,0.15)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section
      className="bg-[#F9FAFB] py-16 sm:py-20"
      aria-label="Who It's For"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold text-[#1E3A8A] text-center mb-12 font-poppins"
        >
          {title}
        </motion.h2>

        {/* Card Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {images.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              tabIndex={0}
              role="button"
              aria-label={item.text}
              className="relative rounded-xl cursor-pointer outline-none focus:ring-4 focus:ring-indigo-400"
            >
              <Card className="overflow-hidden rounded-xl border-none bg-white transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative h-[280px] w-full group">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover rounded-xl"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-300 rounded-xl flex items-center justify-center px-6">
                      <p className="text-white text-xl sm:text-2xl font-semibold text-center leading-snug">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { IconStar, IconTag, IconMapPin, IconCheck, IconArrowLeft } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function HeroSection({ event }) {
  const router = useRouter();

  // render
  return (
    <motion.section
      role="banner"
      aria-label={`${event.title} hero section`}
      className="
        relative w-full
        aspect-video
        overflow-hidden flex items-end rounded-xl
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Banner Image */}
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src={
            event.bannerImage ||
            "https://res.cloudinary.com/ddk9qhmit/image/upload/v1761138208/orgatickBanner_vdyzdk.png"
          }
          alt={event.title || "Event banner"}
          priority
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="absolute top-4 left-4 md:left-20 z-20 bg-black/40 text-white backdrop-blur-md"
          aria-label="Go back to previous page"
        >
          <IconArrowLeft className="w-4 h-4" /> Back
        </Button>

        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/70" />
      </motion.div>

      {/* Content */}
      <div
        className="
          relative z-10 w-full max-w-7xl
          px-4 sm:px-6 md:px-10 lg:px-20
          pb-4 sm:pb-8 md:pb-10
          flex flex-col gap-3 sm:gap-4 space-y-0
        "
      >
        {/* Badges */}
        <motion.div
          className="flex flex-wrap gap-2 mb-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {event.featured && (
            <motion.div variants={itemVariants}>
              <Badge
                variant="destructive"
                className="flex items-center gap-1 px-3 py-1 text-xs sm:text-sm font-semibold shadow-md"
              >
                <IconStar className="w-3.5 h-3.5" /> Featured
              </Badge>
            </motion.div>
          )}
          {event.category && (
            <motion.div variants={itemVariants}>
              <Badge
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1 text-xs sm:text-sm font-semibold shadow-sm"
              >
                <IconTag className="w-3.5 h-3.5" /> {event.category}
              </Badge>
            </motion.div>
          )}
          {event.mode && (
            <motion.div variants={itemVariants}>
              <Badge
                variant="outline"
                className="
                  flex items-center gap-1 px-3 py-1 text-xs sm:text-sm font-semibold
                  border-white/40 text-white bg-white/10 backdrop-blur-sm shadow-sm
                "
              >
                <IconMapPin className="w-3.5 h-3.5" /> {event.mode}
              </Badge>
            </motion.div>
          )}
        </motion.div>

        {/* Title */}
        <motion.h1
          className="
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
            font-bold leading-tight text-white max-w-4xl drop-shadow-lg
          "
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {event.title}
        </motion.h1>

        {/* Organization Info */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center gap-2 text-white/90 text-sm sm:text-base"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          {event.organization && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="font-medium">{event.organization.name}</span>
              {event.organization.verified && (
                <IconCheck className="w-4 h-4 text-success" aria-label="Verified organization" />
              )}
            </div>
          )}
          {event.organization?.category && (
            <Badge
              variant="outline"
              className="border-white/40 text-white bg-white/10 backdrop-blur-sm text-xs sm:text-sm w-fit"
            >
              {event.organization.category}
            </Badge>
          )}
        </motion.div>

        {/* Tags */}
        {event.tags?.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-2 pt-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {event.tags.slice(0, 4).map((tag) => (
              <motion.div key={tag} variants={itemVariants}>
                <Badge
                  variant="secondary"
                  className="
                    bg-white/15 text-white border-none
                    hover:bg-white/25 transition-colors
                    text-xs sm:text-sm px-2 py-1 rounded-md backdrop-blur-sm
                  "
                >
                  #{tag}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}

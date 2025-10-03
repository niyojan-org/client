"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  IconWorld,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandFacebook,
} from "@tabler/icons-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* 🔹 Card hover animation */
const cardHover = {
  hover: { scale: 1.03, y: -4, transition: { duration: 0.25, ease: "easeOut" } },
};

export default function SpeakersSection({ event }) {
  const speakers = event?.guestSpeakers || [];
  if (!speakers.length) return null;

  return (
    <motion.section
      className="w-full py-12 sm:py-16 space-y-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* 🔹 Header */}
      <header className="text-center mx-auto space-y-3 px-4 bg-card max-w-6xl rounded-2xl py-5">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight">
          Guest Speakers
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
          Learn from industry leaders bringing their experience and insights.
        </p>

      {/* 🔹 Grid */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-6 md:px-10">
        {speakers.map((sp, i) => (
          <motion.li
            key={sp._id || i}
            variants={cardHover}
            whileHover="hover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="w-full flex justify-center"
          >
            <Card className="w-full max-w-sm overflow-hidden border rounded-xl shadow-sm hover:shadow-md transition-shadow bg-card text-card-foreground py-0 mt-5">
              {/* 🔹 Speaker Image */}
              {sp.photoUrl && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-64 object-cover"
                >
                  <Image
                    src={sp.photoUrl}
                    alt={sp.name}
                    fill
                    className="object-cover"
                    priority={i < 3}
                  />
                </motion.div>
              )}

              {/* 🔹 Info */}
              <CardHeader className="text-center space-y-2 px-4 pt-2">
                <CardTitle className="text-xl sm:text-2xl font-semibold text-primary">
                  {sp.name}
                </CardTitle>
                {sp.title && (
                  <Badge variant="secondary" className="font-medium">
                    {sp.title}
                  </Badge>
                )}
              </CardHeader>

              {sp.bio && (
                <CardContent className="px-5 pb-2">
                  <CardDescription className="text-sm sm:text-base text-muted-foreground text-start">
                    {sp.bio}
                  </CardDescription>
                  <span className="block pt-5">
                  <hr />
                  </span>

              
                </CardContent>
              )}

              {/* 🔹 Social Links */}
              <div className="flex justify-center gap-3 pb-5">
                {sp.socialLinks?.website && (
                  <SocialIcon href={sp.socialLinks.website} label="Website">
                    <IconWorld size={18} />
                  </SocialIcon>
                )}
                {sp.socialLinks?.linkedin && (
                  <SocialIcon href={sp.socialLinks.linkedin} label="LinkedIn">
                    <IconBrandLinkedin size={18} />
                  </SocialIcon>
                )}
                {sp.socialLinks?.twitter && (
                  <SocialIcon href={sp.socialLinks.twitter} label="Twitter">
                    <IconBrandTwitter size={18} />
                  </SocialIcon>
                )}
                {sp.socialLinks?.instagram && (
                  <SocialIcon href={sp.socialLinks.instagram} label="Instagram">
                    <IconBrandInstagram size={18} />
                  </SocialIcon>
                )}
                {sp.socialLinks?.facebook && (
                  <SocialIcon href={sp.socialLinks.facebook} label="Facebook">
                    <IconBrandFacebook size={18} />
                  </SocialIcon>
                )}
              </div>
            </Card>
          </motion.li>
        ))}
      </ul>
</header>
    </motion.section>
  );
}

/* 🔹 Social Icon Button */
function SocialIcon({ href, label, children }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        {children}
      </Button>
    </motion.a>
  );
}

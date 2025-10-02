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
import { Card, CardContent, CardDescription } from "@/components/ui/card";

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
      {/* Header */}
      <header className="text-center max-w-3xl mx-auto space-y-3 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight">
          Speakers
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
          Learn from industry leaders bringing their experience and insights.
        </p>
      </header>

      {/* Responsive Grid */}
      <ul className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {speakers.map((sp, i) => (
          <motion.li
            key={sp._id || i}
            variants={cardHover}
            whileHover="hover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="w-full max-w-xs"
          >
            <Card className="rounded-xl overflow-hidden shadow-lg border border-border bg-card text-card-foreground flex flex-col items-center py-0">
              {/* Image */}
              {sp.photoUrl && (
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="w-full h-64 relative">
                  <Image
                    src={sp.photoUrl}
                    alt={sp.name}
                    fill
                    className="object-cover rounded-t-xl"
                  />
                </motion.div>
              )}

              {/* Name & Bio */}
              <CardContent className="px-4 py-4 text-center flex flex-col items-center">
                <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-2 ">{sp.name}</h3>
                {sp.bio && (
                  <CardDescription className="text-sm sm:text-base text-muted-foreground text-left mb-4">
                    {sp.bio}
                  </CardDescription>
                )}
              

                {/* Social Icons */}
                <div className="flex flex-wrap justify-center gap-3">
                  {sp.socialLinks?.website && <SocialIcon href={sp.socialLinks.website}><IconWorld size={20} /></SocialIcon>}
                  {sp.socialLinks?.linkedin && <SocialIcon href={sp.socialLinks.linkedin}><IconBrandLinkedin size={20} /></SocialIcon>}
                  {sp.socialLinks?.twitter && <SocialIcon href={sp.socialLinks.twitter}><IconBrandTwitter size={20} /></SocialIcon>}
                  {sp.socialLinks?.instagram && <SocialIcon href={sp.socialLinks.instagram}><IconBrandInstagram size={20} /></SocialIcon>}
                  {sp.socialLinks?.facebook && <SocialIcon href={sp.socialLinks.facebook}><IconBrandFacebook size={20} /></SocialIcon>}
                </div>
              </CardContent>
            </Card>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}

/* Social Icon */
function SocialIcon({ href, children }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}

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

const cardHoverVariants = {
  hover: { scale: 1.03, y: -5, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function SpeakersSection({ event }) {
  if (!event.guestSpeakers?.length) return null;

  const speakerCount = event.guestSpeakers.length;

  // Grid classes based on number of speakers
  const getGridClasses = () => {
    if (speakerCount === 1) return "grid grid-cols-1 justify-items-center";
    if (speakerCount === 2) return "grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-6 sm:gap-8";
    return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10";
  };

  return (
    <motion.section
      className="w-full space-y-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Section Header */}
      <header className="text-center max-w-3xl mx-auto space-y-2">
        <h2 className="text-4xl sm:text-5xl font-bold text-primary">Featured Speakers</h2>
        <p className="text-muted-foreground text-lg">
          Learn from industry experts and thought leaders who will share their insights and experiences.
        </p>
      </header>

      {/* Speakers Grid */}
      <ul className={`${getGridClasses()} list-none p-0 m-0`}>
        {event.guestSpeakers.map((speaker, index) => (
          <motion.li
            key={speaker._id || index}
            variants={cardHoverVariants}
            whileHover="hover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-full max-w-sm"
          >
            <Card className="overflow-hidden rounded-xl shadow-md border-0 py-0">
              <figure className="relative h-64 w-full overflow-hidden">
                {speaker.photoUrl && (
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                    <Image
                      src={speaker.photoUrl}
                      alt={speaker.name}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
                <figcaption className="absolute bottom-3 left-4 text-white text-2xl font-semibold z-10">
                  {speaker.name}
                </figcaption>
                <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </figure>

              <CardContent className="px-4 sm:px-6">
                <CardDescription className="text-base text-muted-foreground mb-3">{speaker.bio}</CardDescription>
                <hr className="border-t border-gray-300 mb-3" />
                <ul className="flex justify-between gap-3 flex-wrap p-0 m-0 list-none mb-6">
                  {speaker.socialLinks?.website && <SocialIcon href={speaker.socialLinks.website}><IconWorld /></SocialIcon>}
                  {speaker.socialLinks?.linkedin && <SocialIcon href={speaker.socialLinks.linkedin}><IconBrandLinkedin /></SocialIcon>}
                  {speaker.socialLinks?.twitter && <SocialIcon href={speaker.socialLinks.twitter}><IconBrandTwitter /></SocialIcon>}
                  {speaker.socialLinks?.instagram && <SocialIcon href={speaker.socialLinks.instagram}><IconBrandInstagram /></SocialIcon>}
                  {speaker.socialLinks?.facebook && <SocialIcon href={speaker.socialLinks.facebook}><IconBrandFacebook /></SocialIcon>}
                </ul>
              </CardContent>
            </Card>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}

// Reusable Social Icon
function SocialIcon({ href, children }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}

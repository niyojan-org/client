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

/* Animation */
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

export default function SpeakersSection({ event }) {
  const speakers = event?.guestSpeakers || [];
  if (!speakers.length) return null;

  // Dynamic grid classes based on number of speakers
  const getGridClasses = () => {
    if (speakers.length === 1) return "flex justify-center";
    if (speakers.length === 2)
      return "grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center max-w-3xl mx-auto";
    return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8";
  };

  return (
    <motion.section
      initial="hidden"
      animate="show"
      className="w-full bg-card py-12 sm:py-3 rounded-2xl"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary">
            Guest Speakers
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-2">
            Learn from industry leaders sharing insights and experience.
          </p>
        </header>

        {/* Cards Grid */}
        <ul className={getGridClasses()}>
          {speakers.map((sp, i) => (
            <motion.li
              key={sp._id || i}
              variants={fadeIn}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="flex justify-center"
            >
              <Card className="relative w-full max-w-sm overflow-hidden border-t-4 border-t-primary bg-card text-card-foreground shadow-sm hover:shadow-md transition-all rounded-2xl">
                {/* Speaker Photo - Centered */}
                {sp.photoUrl && (
                  <div className="flex justify-center">
                    <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-background shadow-md">
                      <Image
                        src={sp.photoUrl}
                        alt={sp.name}
                        fill
                        className="object-cover"
                        priority={i < 3}
                      />
                    </div>
                  </div>
                )}

                {/* Card Info */}
                <CardHeader className="text-center">
                  <CardTitle className="text-lg sm:text-xl font-semibold">
                    {sp.name}
                  </CardTitle>
                  {sp.title && (
                    <Badge
                      variant="secondary"
                      className="font-medium text-xs px-2 py-0.5"
                    >
                      {sp.title}
                    </Badge>
                  )}
                </CardHeader>

                {/* Social Links */}
                <div className="flex justify-center gap-1 pb-2">
                  {sp.socialLinks?.website && (
                    <SocialIcon href={sp.socialLinks.website} label="Website">
                      <IconWorld size={16} />
                    </SocialIcon>
                  )}
                  {sp.socialLinks?.linkedin && (
                    <SocialIcon href={sp.socialLinks.linkedin} label="LinkedIn">
                      <IconBrandLinkedin size={16} />
                    </SocialIcon>
                  )}
                  {sp.socialLinks?.twitter && (
                    <SocialIcon href={sp.socialLinks.twitter} label="Twitter">
                      <IconBrandTwitter size={16} />
                    </SocialIcon>
                  )}
                  {sp.socialLinks?.instagram && (
                    <SocialIcon
                      href={sp.socialLinks.instagram}
                      label="Instagram"
                    >
                      <IconBrandInstagram size={16} />
                    </SocialIcon>
                  )}
                  {sp.socialLinks?.facebook && (
                    <SocialIcon href={sp.socialLinks.facebook} label="Facebook">
                      <IconBrandFacebook size={16} />
                    </SocialIcon>
                  )}
                </div>

                {/* Bio */}
                {sp.bio && (
                  <CardContent className=" pb-2">
                    <CardDescription className="text-sm text-muted-foreground text-center sm:text-left leading-relaxed ">
                      {sp.bio}
                    </CardDescription>
                  </CardContent>
                )}
              </Card>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}

/* Social Icon Button */
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

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IconStar, IconUsers } from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const cardHoverVariants = {
  hover: {
    scale: 1.05,
    y: -10,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function SimilarEvents({ similarEvents }) {
  if (!similarEvents?.length) return null;

  return (
    <motion.section
      className="w-full py-12 sm:py-16 space-y-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      {/* Section Header */}
      <header className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-primary">You Might Also Like</h2>
        <p className="text-muted-foreground text-lg">
          Discover more exciting events that might interest you
        </p>
      </header>

      {/* Events Grid */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0">
        {similarEvents.slice(0, 6).map((event, index) => (
          <motion.li
            key={event.slug}
            variants={cardHoverVariants}
            whileHover="hover"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-full"
          >
            <Link href={`/events/${event.slug}`} className="block no-underline focus:outline-none">
              <Card className="h-full border-2 border-transparent hover:border-primary/20 transition-all duration-300 overflow-hidden cursor-pointer">
                <figure className="relative w-full h-48 overflow-hidden">
                  {event.bannerImage ? (
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }} className="w-full h-full relative">
                      <Image
                        src={event.bannerImage}
                        alt={event.title}
                        fill
                        className="object-cover w-full h-full"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={index < 3} // preload first few images
                      />
                    </motion.div>
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                  {event.featured && (
                    <Badge
                      className="absolute top-3 left-3 flex items-center gap-1"
                      variant="destructive"
                    >
                      <IconStar className="w-3 h-3" />
                      Featured
                    </Badge>
                  )}
                </figure>

                <CardContent className="p-4 space-y-3">
                  <h3 className="text-lg font-semibold line-clamp-2 text-primary">{event.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{event.description}</p>
                  <footer className="flex items-center justify-between">
                    <Badge variant="secondary">{event.category}</Badge>
                    {event.organization?.name && (
                      <span className="flex items-center gap-1 text-muted-foreground text-xs">
                        <IconUsers className="w-3 h-3" />
                        {event.organization.name}
                      </span>
                    )}
                  </footer>
                </CardContent>
              </Card>
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}

"use client";

import { motion } from "framer-motion";
import { IconStar, IconTag, IconMapPin, IconCheck } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

export default function HeroSection({ event }) {
    return (
        <motion.section
            className="relative w-full min-h-[40vh] md:min-h-80 lg:min-h-96 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.7 }}
            >
                <Image
                    src={event.bannerImage || "/fallback.jpg"}
                    alt={event.title}
                    priority
                    quality={90}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={event.bannerImage || "/fallback.jpg"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
            </motion.div>

            {/* Hero Content - More Compact */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 md:px-18 space-y-4">
                {/* Compact Badges Row */}
                <motion.div
                    className="flex flex-wrap gap-2 mb-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {event.featured && (
                        <motion.div variants={itemVariants}>
                            <Badge
                                variant="destructive"
                                className="flex items-center gap-1 px-3 py-1 text-xs md:text-sm font-semibold"
                            >
                                <IconStar className="w-3 h-3" />
                                Featured
                            </Badge>
                        </motion.div>
                    )}
                    <motion.div variants={itemVariants}>
                        <Badge
                            variant="secondary"
                            className="flex items-center gap-1 px-3 py-1 text-xs md:text-sm font-semibold"
                        >
                            <IconTag className="w-3 h-3" />
                            {event.category}
                        </Badge>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Badge
                            variant="outline"
                            className="flex items-center gap-1 px-3 py-1 text-xs md:text-sm font-semibold border-white/40 text-white bg-white/10 backdrop-blur-sm"
                        >
                            <IconMapPin className="w-3 h-3" />
                            {event.mode}
                        </Badge>
                    </motion.div>
                </motion.div>

                <motion.h1
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white max-w-4xl mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    {event.title}
                </motion.h1>

                <motion.div
                    className="flex flex-col sm:flex-row sm:items-center gap-3 text-white/90 mb-4"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        <span className="font-medium text-sm md:text-base">{event.organization?.name}</span>
                        {event.organization?.verified && (
                            <IconCheck className="w-4 h-4 text-blue-400" />
                        )}
                    </div>
                    <Badge variant="outline" className="border-white/40 text-white bg-white/10 backdrop-blur-sm text-xs md:text-sm w-fit">
                        {event.organization?.category}
                    </Badge>
                </motion.div>

                <motion.div
                    className="flex flex-wrap gap-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {event.tags?.slice(0, 4).map((tag) => (
                        <motion.div key={tag} variants={itemVariants}>
                            <Badge
                                variant="secondary"
                                className="bg-white/15 text-white border-none hover:bg-white/25 transition-colors text-xs md:text-sm px-2 py-1 backdrop-blur-sm"
                            >
                                #{tag}
                            </Badge>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}

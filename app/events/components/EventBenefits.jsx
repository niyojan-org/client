"use client";

import { motion } from "framer-motion";
import {
  IconTrophy,
  IconUsers,
  IconTarget,
  IconAward,
  IconBolt,
  IconStar,
  IconChevronDown,
} from "@tabler/icons-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

/* 🔹 Hover animation for cards */
const cardHoverVariants = {
  hover: {
    scale: 1.02,
    y: -3,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

/* 🔹 Icon mapping */
const benefitIcons = {
  "Real Tournament Experience": IconTrophy,
  Network: IconUsers,
  Learn: IconTarget,
  Experience: IconAward,
  Skills: IconBolt,
  default: IconStar,
};

function getBenefitIcon(title) {
  return benefitIcons[title] || benefitIcons.default;
}

/* 🔹 Text truncation helper */
function truncateText(text, maxLength) {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
}

export default function EventBenefits({ event }) {
  if (!event?.benefits?.length) return null;

  return (
    <motion.section
      className="w-full mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="shadow-xl rounded-2xl border-none bg-transparent overflow-hidden">
        {/* 🔹 Section Header */}
        <CardHeader className="text-center pb-8 px-4 sm:px-8">
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
            Event Benefits
          </CardTitle>
          <CardDescription className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-muted-foreground mt-2">
            Discover the value you’ll gain by joining this event
          </CardDescription>
        </CardHeader>

        {/* 🔹 Benefits Grid */}
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 px-4 sm:px-6 md:px-10 pb-10">
          {event.benefits.map((benefit, index) => {
            const IconComponent = getBenefitIcon(benefit.title);
            const [expanded, setExpanded] = useState(false);
            const longDesc = benefit.description?.length > 150;

            return (
              <motion.div
                key={benefit._id || index}
                variants={cardHoverVariants}
                whileHover="hover"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-l-4 border-primary shadow-sm hover:shadow-md rounded-xl bg-card transition-all duration-300 flex flex-col">
                  {/* 🔹 Icon + Title */}
                  <CardHeader className="flex items-center gap-3">
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </span>
                    <CardTitle className="text-base sm:text-lg md:text-xl font-semibold leading-snug break-words">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>

                  {/* 🔹 Description with “Show more” */}
                  <CardContent className="px-5 pb-6 pt-0 flex flex-col flex-grow">
                    <CardDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed text-justify">
                      {expanded
                        ? benefit.description
                        : truncateText(benefit.description, 80)}
                    </CardDescription>

                    {longDesc && (
                      <button
                        onClick={() => setExpanded(!expanded)}
                        className="mt-3 text-primary text-xs sm:text-sm font-medium flex items-center gap-1 hover:underline self-start"
                      >
                        {expanded ? "Show less" : "Show more"}
                        <IconChevronDown
                          className={`w-4 h-4 transition-transform ${
                            expanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>
    </motion.section>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  IconTrophy,
  IconUsers,
  IconTarget,
  IconAward,
  IconBolt,
  IconStar,
} from "@tabler/icons-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Animation config
const cardHoverVariants = {
  hover: {
    scale: 1.02,
    y: -2,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

// Icon mapping
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

// Truncate text helper
function truncateText(text, maxLength) {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
}

export default function EventBenefits({ event }) {
  if (!event?.benefits?.length) return null;

  return (
    <motion.section
      className="w-full "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="shadow-lg rounded-2xl">
        {/* Section Header */}
        <CardHeader className="text-center pb-10">
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
            Event Benefits
          </CardTitle>
          <CardDescription className="text-base sm:text-lg max-w-2xl mx-auto text-muted-foreground">
            Discover what you’ll gain from participating in this event
          </CardDescription>
        </CardHeader>

        {/* Benefits Grid */}
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {event.benefits.map((benefit, index) => {
            const IconComponent = getBenefitIcon(benefit.title);

            return (
              <motion.div
                key={benefit._id || index}
                variants={cardHoverVariants}
                whileHover="hover"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className=" border-0 h-full border-l-4 border-primary shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
                  {/* Icon + Title */}
                  <CardHeader className="flex items-center">
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </span>
                    <CardTitle className="text-lg sm:text-xl font-semibold leading-snug truncate">
                      {truncateText(benefit.title, 40)}
                    </CardTitle>
                  </CardHeader>

                  {/* Description */}
                  <CardContent className="pt-0 px-5 pb-5">
                    <CardDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {truncateText(benefit.description, 150)}
                    </CardDescription>
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

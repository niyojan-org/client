"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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

/* ---------- animations ---------- */
const cardHoverVariants = {
  hover: { scale: 1.02, y: -3, transition: { duration: 0.25, ease: "easeOut" } },
};

/* ---------- icon mapping ---------- */
/** @type {Record<string, any>} */
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

function truncate(text = "", max = 80) {
  return text.length > max ? text.slice(0, max) + "…" : text;
}

/* ---------- component ---------- */
export default function EventBenefits({ event }) {
  const prefersReducedMotion = useReducedMotion();

  if (!event?.benefits || event.benefits.length === 0) return null;

  /* track expanded state per card */
  const [expandedCards, setExpandedCards] = useState({});

  const toggleExpand = (idx) =>
    setExpandedCards((prev) => ({ ...prev, [idx]: !prev[idx] }));

  return (
    <motion.section
      className="w-full mt-12"
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Event benefits"
    >
      <Card className="border-t-4 border-t-primary rounded-2xl overflow-hidden backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300">
        {/* ---- Header ---- */}
        <CardHeader className="text-center pb-8 px-4 sm:px-8">
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
            Event Benefits
          </CardTitle>
          <CardDescription className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-muted-foreground mt-2">
            Discover the value you’ll gain by joining this event
          </CardDescription>
        </CardHeader>

        {/* ---- Benefits grid ---- */}
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 px-4 sm:px-6 md:px-10 pb-10">
          {event.benefits.map((benefit, idx) => {
            const IconComp = getBenefitIcon(benefit.title);
            const isExpanded = expandedCards[idx] || false;
            const longDesc = (benefit.description?.length ?? 0) > 80;

            return (
              <motion.article
                key={benefit._id || idx}
                variants={cardHoverVariants}
                whileHover={prefersReducedMotion ? undefined : "hover"}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="focus-within:ring-2 focus-within:ring-primary/40 rounded-xl"
              >
                <Card className="h-full border-l-4 border-primary shadow-sm hover:shadow-md bg-card rounded-xl flex flex-col">
                  {/* icon + title */}
                  <CardHeader className="flex items-center gap-3">
                    <span
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10"
                      aria-hidden
                    >
                      <IconComp className="w-5 h-5 text-primary" />
                    </span>
                    <CardTitle className="text-base sm:text-lg md:text-xl font-semibold leading-snug break-words">
                      {benefit.title || "Untitled Benefit"}
                    </CardTitle>
                  </CardHeader>

                  {/* description */}
                  <CardContent className="px-5 pb-6 pt-0 flex flex-col flex-grow">
                    <CardDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed text-justify">
                      {isExpanded
                        ? benefit.description || "No description provided."
                        : truncate(benefit.description || "No description provided.", 80)}
                    </CardDescription>

                    {/* show more/less */}
                    {longDesc && (
                      <button
                        type="button"
                        onClick={() => toggleExpand(idx)}
                        className="mt-3 text-primary text-xs sm:text-sm font-medium flex items-center gap-1 hover:underline focus:outline-none focus:ring-1 focus:ring-primary/40 rounded"
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? "Show less" : "Show more"}
                        <IconChevronDown
                          className={`w-4 h-4 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </CardContent>
                </Card>
              </motion.article>
            );
          })}
        </CardContent>
      </Card>
    </motion.section>
  );
}

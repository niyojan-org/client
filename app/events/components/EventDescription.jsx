"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IconCalendarEvent,
  IconClock,
  IconTicket,
  IconUsers,
  IconMapPin,
  IconStar,
  IconGift,
  IconMicrophone,
  IconCurrencyRupee,
  IconCalendarStats,
  IconInfoCircle
} from "@tabler/icons-react";
import { format } from "date-fns";

export default function EventDescription({ event }) {
  if (!event) return null;

  // Generate AI-style summary paragraph
  const generateEventSummary = () => {
    const parts = [];
    
    // Event intro with organization
    if (event.organization?.name) {
      parts.push(`${event.title} by ${event.organization.name}${event.organization.verified ? ' ✓' : ''}`);
    } else {
      parts.push(event.title);
    }
    
    // Sessions and dates
    if (event.sessions?.length > 0) {
      const sessionCount = event.sessions.length;
      const firstSession = new Date(event.sessions[0].startTime);
      const duration = format(firstSession, "MMM dd, yyyy");
      parts.push(`${sessionCount} session${sessionCount > 1 ? 's' : ''} on ${duration}`);
    }
    
    // Tickets and pricing
    if (event.tickets?.length > 0) {
      const totalCapacity = event.tickets.reduce((sum, ticket) => sum + (ticket.capacity || 0), 0);
      const prices = event.tickets.map(t => t.price).filter(p => p > 0);
      
      if (prices.length > 0) {
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const priceText = minPrice === maxPrice ? `₹${minPrice}` : `₹${minPrice}-${maxPrice}`;
        parts.push(`tickets from ${priceText}`);
      } else {
        parts.push('free entry');
      }
      
      // if (totalCapacity > 0) {
      //   parts.push(`${totalCapacity} spots available`);
      // }
    }
    
    return parts.join(' • ');
  };

  const aiSummary = generateEventSummary();

  return (
    <motion.section
      className="w-full"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Combined Event Information */}
      <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-card">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5  py-4 text-center">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-primary tracking-tight">
            About This Event
          </CardTitle>
        </CardHeader>

        <CardContent className="py-6 sm:py-8 px-4 sm:px-6">
          {/* Quick Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-6"
          >
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
              <div className="flex items-center gap-2 mb-3">
                <IconStar className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Quick Overview</h3>
              </div>
              <p className="text-card-foreground text-sm sm:text-base leading-relaxed">
                {aiSummary}
              </p>
            </div>
          </motion.div>

          {/* Original Description */}
          {event.description?.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              {/* Section Header */}
              <div className="flex items-center gap-2 mb-4">
                <IconUsers className="h-4 w-4 text-primary" />
                <h3 className="text-base font-semibold text-foreground">Event Details</h3>
                <div className="flex-1 h-px bg-primary/20"></div>
              </div>

              {/* Description */}
              <div className="bg-muted/20 rounded-lg p-4 sm:p-6 border border-muted/30">
                <CardDescription className="text-card-foreground text-sm sm:text-base leading-relaxed text-justify">
                  {event.description}
                </CardDescription>
                
                {/* Reading indicator */}
                <div className="mt-4 pt-3 border-t border-muted/20 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <IconClock className="h-3 w-3" />
                    ~{Math.ceil(event.description.split(' ').length / 200)} min read
                  </span>
                  <span>{event.description.split(' ').length} words</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tags Section */}
          {event.tags?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="max-w-3xl mx-auto mt-6"
            >
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Event Tags</h4>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <Badge 
                    key={tag}
                    variant="secondary" 
                    className="text-xs px-2 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.section>
  );
}

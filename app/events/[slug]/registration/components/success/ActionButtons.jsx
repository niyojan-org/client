"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Ticket, Calendar, Home, ArrowRight, Eye, Share2, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ActionButtons({ eventSlug = "" }) {
  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1000">
      {/* Primary Actions */}
      <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-accent/5 shadow-md">
        <CardContent className="p-4 md:p-6">
          <p className="text-xs font-semibold text-muted-foreground mb-3">Recommended Actions</p>
          <div className="space-y-2.5">
            <Button
              asChild
              className="w-full rounded-lg h-10 md:h-11 text-sm md:text-base group justify-between"
            >
              <Link href="/profile/tickets">
                <span className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 md:w-5 md:h-5" />
                  View My Tickets
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            {eventSlug ? (
              <Button
                asChild
                variant="outline"
                className="w-full rounded-lg h-10 md:h-11 text-sm md:text-base justify-between"
              >
                <Link href={`/events/${eventSlug}`}>
                  <span className="flex items-center gap-2">
                    <Eye className="w-4 h-4 md:w-5 md:h-5" />
                    View Event
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                variant="outline"
                className="w-full rounded-lg h-10 md:h-11 text-sm md:text-base justify-between"
              >
                <Link href="/events">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                    Browse Events
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Secondary Actions */}
      <Card className="border-border/50">
        <CardContent className="p-4 md:p-6">
          <p className="text-xs font-semibold text-muted-foreground mb-3">Share & Support</p>
          <div className="grid grid-cols-2 gap-2.5">
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg h-9 md:h-10 text-xs md:text-sm"
            >
              <Share2 className="w-4 h-4 mr-1.5" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg h-9 md:h-10 text-xs md:text-sm"
              asChild
            >
              <Link href="/contact">
                <MessageCircle className="w-4 h-4 mr-1.5" />
                Help
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Back to Home */}
      <div className="pt-2">
        <Button
          asChild
          variant="ghost"
          className="w-full text-muted-foreground hover:text-foreground text-sm md:text-base h-9 md:h-10 rounded-lg"
        >
          <Link href="/">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}

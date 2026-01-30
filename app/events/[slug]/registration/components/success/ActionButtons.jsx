"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconTicket, IconCalendar, IconHome, IconArrowRight, IconEye } from "@tabler/icons-react";

export default function ActionButtons({ eventSlug = "" }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1000">
        <Button 
          
          className="rounded-full w-full group h-9"
        >
          <Link href="/profile/tickets">
            <IconTicket className="w-4 h-4" />
            View My Tickets
            <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
        
        {eventSlug ? (
          <Button 
            
            variant="outline"
            className="rounded-full w-full h-9"
          >
            <Link href={`/events/${eventSlug}`}>
              <IconEye className="w-4 h-4" />
              View Event
            </Link>
          </Button>
        ) : (
          <Button 
            
            variant="outline"
            className="rounded-full w-full h-9"
          >
            <Link href="/events">
              <IconCalendar className="w-4 h-4" />
              Browse Events
            </Link>
          </Button>
        )}
      </div>

      <div className="text-center mt-4 animate-in fade-in duration-700 delay-1000">
        <Button 
          
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
        >
          <Link href="/">
            <IconHome className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </>
  );
}

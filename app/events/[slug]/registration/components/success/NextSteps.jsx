"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, ChevronDown, Clock, MapPin, AlertCircle, Download, Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function NextSteps({ isPaid = false, isGroup = false }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
      {/* Quick Tips */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 shadow-md">
        <CardHeader>
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 rounded-full p-2">
                <Info className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base md:text-lg">What's Next?</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Important steps to complete your registration
                </CardDescription>
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent className="pt-0 space-y-4">
            <div className="grid gap-3 md:gap-4">
              {/* Step 1: Confirmation Email */}
              <div className="flex gap-3 p-3 rounded-lg bg-white/50 dark:bg-black/20 border border-primary/10">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/20 text-primary font-bold text-sm">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm md:text-base text-foreground">Check Your Email</h4>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    We've sent a confirmation email with {isPaid ? "your tickets" : "registration details"}. Check your spam folder if you don't see it.
                  </p>
                </div>
              </div>

              {/* Step 2: Download Tickets */}
              <div className="flex gap-3 p-3 rounded-lg bg-white/50 dark:bg-black/20 border border-primary/10">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-success/20 text-success font-bold text-sm">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm md:text-base text-foreground">Download Your {isGroup ? "Tickets" : "Ticket"}</h4>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    Download {isGroup ? "tickets" : "your ticket"} from your profile. You can share them digitally or print them.
                  </p>
                </div>
              </div>

              {/* Step 3: Add to Calendar */}
              <div className="flex gap-3 p-3 rounded-lg bg-white/50 dark:bg-black/20 border border-primary/10">
                <div className="flex-shrink-0">
                  <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm md:text-base text-foreground">Save Event Date</h4>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    Add the event to your calendar so you don't miss it. Arrive 15 minutes early on event day.
                  </p>
                </div>
              </div>

              {/* Step 4: Bring ID */}
              <div className="flex gap-3 p-3 rounded-lg bg-white/50 dark:bg-black/20 border border-primary/10">
                <div className="flex-shrink-0">
                  <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm md:text-base text-foreground">Prepare for Entry</h4>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    Keep your ticket and a valid ID ready. Follow venue guidelines for entry.
                  </p>
                </div>
              </div>

              {/* Step 5: Share (for groups) */}
              {isGroup && (
                <div className="flex gap-3 p-3 rounded-lg bg-white/50 dark:bg-black/20 border border-primary/10">
                  <div className="flex-shrink-0">
                    <Share2 className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm md:text-base text-foreground">Share with Participants</h4>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">
                      Send tickets to all group members so everyone has them ready.
                    </p>
                  </div>
                </div>
              )}

              {/* Payment Note */}
              {isPaid && (
                <div className="flex gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/30">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-amber-700 dark:text-amber-300">Keep Your Order ID</h4>
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                      Save your Order ID for payment-related queries and support.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-accent/40 to-accent/20 rounded-lg p-4 border border-border/50">
        <p className="text-xs font-semibold text-muted-foreground mb-3">Quick Actions</p>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            className="text-xs md:text-sm h-8 md:h-9 rounded-full"
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            Download Ticket
          </Button>
          {isGroup && (
            <Button
              size="sm"
              variant="outline"
              className="text-xs md:text-sm h-8 md:h-9 rounded-full"
            >
              <Share2 className="w-3.5 h-3.5 mr-1" />
              Share
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

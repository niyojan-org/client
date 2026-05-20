"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconBrandWhatsapp, IconMail, IconCopy } from "@tabler/icons-react";
import { CheckCircle2, Ticket, Calendar, MapPin, Users, IndianRupee, Badge, Crown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function RegistrationDetails({
  registrationId,
  eventName,
  eventDate,
  eventLocation,
  ticketType,
  ticketPrice = 0,
  isPaid = false,
  isGroup = false,
  participants = [],
  participantCount = 1,
  totalAmount = 0,
  qrCode = "",
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(registrationId);
    setCopied(true);
    toast.success("Registration ID copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
      {/* Registration ID Card */}
      {registrationId && (
        <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              {isPaid ? "Order ID" : "Registration ID"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <p className="text-lg md:text-2xl font-mono font-bold text-primary break-all">{registrationId}</p>
              <button
                onClick={copyToClipboard}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors shrink-0"
                title="Copy ID"
              >
                <IconCopy className={`w-5 h-5 ${copied ? "text-success" : "text-primary"}`} />
              </button>
            </div>
            <p className="text-xs text-muted-foreground">Save this ID for reference and support inquiries</p>
          </CardContent>
        </Card>
      )}

      {/* Event Details Card */}
      <Card className="border-border/50 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-base md:text-lg">Event Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 md:space-y-4">
          {/* Event Name */}
          {eventName && (
            <div className="flex gap-3">
              <Ticket className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground font-medium">Event</p>
                <p className="font-semibold text-sm md:text-base text-foreground truncate">{eventName}</p>
              </div>
            </div>
          )}

          {/* Date & Time */}
          {eventDate && (
            <div className="flex gap-3">
              <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground font-medium">Date & Time</p>
                <p className="font-semibold text-sm md:text-base text-foreground">{eventDate}</p>
              </div>
            </div>
          )}

          {/* Location */}
          {eventLocation && (
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground font-medium">Location</p>
                <p className="font-semibold text-sm md:text-base text-foreground truncate">{eventLocation}</p>
              </div>
            </div>
          )}

          {/* Ticket Type */}
          {ticketType && (
            <div className="flex gap-3">
              <Badge className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground font-medium">Ticket Type</p>
                <p className="font-semibold text-sm md:text-base text-foreground">{ticketType}</p>
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-border my-2" />

          {/* Participant Count for Groups */}
          {isGroup && (
            <div className="flex gap-3 p-2 md:p-3 bg-accent/30 rounded-lg border border-primary/10">
              <Users className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground font-medium">Total Participants</p>
                <p className="font-bold text-lg md:text-xl text-success">{participantCount} {participantCount === 1 ? "Person" : "People"}</p>
              </div>
            </div>
          )}

          {/* Amount Paid */}
          {isPaid ? (
            <div className="flex gap-3 p-2 md:p-3 bg-success/10 rounded-lg border border-success/20">
              <IndianRupee className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground font-medium">Amount Paid</p>
                <p className="font-bold text-lg md:text-xl text-success">
                  ₹{isGroup ? totalAmount : ticketPrice}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex gap-3 p-2 md:p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800/30">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-emerald-700 dark:text-emerald-300">FREE EVENT</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">No payment required</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Participants Card */}
      {participants?.length > 0 && (
        <Card className="border-border/50 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              {isGroup ? `Registered Participants (${participants.length})` : "Your Details"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`grid gap-3 ${isGroup ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-1" : ""}`}>
              {participants.map((participant, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-accent/50 to-accent/20 rounded-lg p-3 md:p-4 border-l-4 border-primary transition-all hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm md:text-base text-foreground">{participant?.name || "N/A"}</p>
                        {participant?.isLeader && (
                          <Crown className="w-4 h-4 text-amber-500 shrink-0" />
                        )}
                      </div>

                      {/* Email */}
                      {participant?.email && (
                        <p className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm mt-1.5">
                          <IconMail size={16} className="shrink-0" />
                          <a
                            href={`mailto:${participant.email}`}
                            className="hover:text-primary transition-colors truncate"
                          >
                            {participant.email}
                          </a>
                        </p>
                      )}

                      {/* Phone */}
                      {participant?.phone && (
                        <p className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm mt-1">
                          <IconBrandWhatsapp size={16} className="shrink-0" />
                          <a
                            href={`https://wa.me/${participant.phone.replace(/\D/g, "")}`}
                            className="hover:text-primary transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {participant.phone}
                          </a>
                        </p>
                      )}
                    </div>

                    {/* Leader Badge */}
                    {participant?.isLeader && (
                      <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-full font-semibold whitespace-nowrap">
                        Leader
                      </span>
                    )}
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                    <p className="text-xs font-medium text-success">Confirmed</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* QR Code Section (if available) */}
      {qrCode && (
        <Card className="border-border/50 shadow-md">
          <CardHeader>
            <CardTitle className="text-base md:text-lg">Event Ticket QR Code</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <img src={qrCode} alt="Ticket QR Code" className="w-40 h-40 md:w-48 md:h-48 rounded-lg border-2 border-primary/20" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

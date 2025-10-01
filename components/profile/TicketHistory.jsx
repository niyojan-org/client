"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Ticket, 
  Calendar, 
  MapPin, 
  ExternalLink,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

export function TicketHistory({ className }) {
  // Mock data - replace with actual ticket data from your API
  const tickets = [
    
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case "attended":
        return {
          variant: "default",
          icon: CheckCircle,
          label: "Attended",
          color: "text-green-600",
        };
      case "upcoming":
        return {
          variant: "secondary",
          icon: Clock,
          label: "Upcoming",
          color: "text-blue-600",
        };
      case "cancelled":
        return {
          variant: "destructive",
          icon: XCircle,
          label: "Cancelled",
          color: "text-destructive",
        };
      default:
        return {
          variant: "outline",
          icon: AlertCircle,
          label: "Unknown",
          color: "text-muted-foreground",
        };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (tickets.length === 0) {
    return (
      <Card className={cn("h-full ", className)}>
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            Ticket History
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Ticket className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            No tickets found
          </h3>
          <p className="text-sm text-muted-foreground text-center">
            Your ticket history will appear here once you book events.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="border-b pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="h-4 w-4" />
            <span className="text-lg">Ticket History</span>
          </div>
          <Badge variant="outline" className="text-xs">{tickets.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1">
        <ScrollArea className="h-full">
          <div className="space-y-0">
            {tickets.map((ticket, index) => {
              const statusConfig = getStatusConfig(ticket.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div key={ticket.id}>
                  <div className="p-3 hover:bg-muted/50 transition-colors">
                    <div className="space-y-2">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <h4 className="font-medium text-sm line-clamp-1">
                            {ticket.eventName}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            ID: {ticket.id}
                          </p>
                        </div>
                        <Badge variant={statusConfig.variant} className="gap-1 text-xs ml-2">
                          <StatusIcon className="h-2 w-2" />
                          {statusConfig.label}
                        </Badge>
                      </div>

                      {/* Event Details */}
                      <div className="grid grid-cols-1 gap-1 text-xs">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(ticket.eventDate)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span className="line-clamp-1">{ticket.venue}</span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs px-1 py-0">
                            {ticket.ticketType}
                          </Badge>
                          <span className="text-xs font-medium">
                            ${ticket.price}
                          </span>
                        </div>
                        
                        <Button size="sm" variant="ghost" className="gap-1 h-6 px-2 text-xs">
                          View
                          <ExternalLink className="h-2 w-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {index < tickets.length - 1 && <Separator />}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
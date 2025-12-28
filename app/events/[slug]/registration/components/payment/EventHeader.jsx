import React from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const EventHeader = ({ event }) => {
  return (
    <Card className="border-2 mb-3 sm:mb-4 p-2">
      <CardHeader className="px-0">
        <div className="flex items-center gap-3">
          <Image
            src={event.bannerImage || '/banner/default-event-banner.png'}
            alt="Event Banner"
            width={160}
            height={90}
            className="w-24 sm:h-24 sm:w-40 rounded-md object-cover"
          />
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg sm:text-xl lg:text-2xl truncate">{event.title}</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Complete your registration
            </CardDescription>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            Registration
          </Badge>
        </div>
      </CardHeader>
    </Card>
  );
};

export default EventHeader;

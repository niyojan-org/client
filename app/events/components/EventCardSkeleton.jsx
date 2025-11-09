"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function EventCardSkeleton() {
    return (
        <Card className="p-2 gap-0">
            {/* IMAGE */}
            <CardHeader className="px-0 relative">
                <Skeleton className="w-full h-52 rounded-xl" />

                {/* Badges */}
                <div className="absolute top-4 left-4">
                    <Skeleton className="h-6 w-20 rounded-md" />
                </div>
                <div className="absolute top-4 right-4">
                    <Skeleton className="h-6 w-20 rounded-md" />
                </div>
            </CardHeader>

            <CardContent className="flex flex-col justify-between flex-1 space-y-3">
                {/* TIMER */}
                <div className="flex justify-center items-center">
                    <Skeleton className="h-6 w-40" />
                </div>

                {/* TITLE */}
                <Skeleton className="h-6 w-3/4 rounded-md" />

                {/* META FIELDS */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-2/4" />
                    <Skeleton className="h-4 w-1/3" />
                </div>

                {/* TICKETS */}
                <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-16 rounded-md" />
                    <Skeleton className="h-6 w-20 rounded-md" />
                    <Skeleton className="h-6 w-12 rounded-md" />
                </div>

                {/* BUTTON */}
                <Skeleton className="h-10 w-full rounded-md mt-4" />
            </CardContent>
        </Card>
    );
}

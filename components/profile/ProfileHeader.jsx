"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, Mail, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { AccountSettings } from "./AccountSettings";

export function ProfileHeader({ user, className, onLogout }) {
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className={cn("w-full p-2 md:p-4", className)}>
      <CardContent className=" flex flex-col sm:flex-row gap-4 items-center sm:justify-between md:items-center">
        <div className="flex flex-col items-center sm:items-start sm:flex-row sm:space-y-0 sm:space-x-6">
          {/* Avatar Section */}
          <div className="relative pb-2">
            <Avatar className="h-20 w-20 rounded-3xl border-3 border-primary shadow-[0_20px_20px_rgba(0,0,0,0.25)]">
              <AvatarImage src={user?.avatar} alt={user?.name} className="rounded-xl" />
              <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold rounded-xl">
                {getInitials(user?.name)}
              </AvatarFallback>
            </Avatar>

            {/* Verification Status Indicator */}
            <div className="absolute bottom-1 -right-1">
              {user?.isVerified ? (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-background shadow-md border-2 border-green-500">
                  <CheckCircle className="h-4 w-4 text-sucess" />
                </div>
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-background shadow-md border-2 border-destructive">
                  <XCircle className="h-4 w-4 text-destructive" />
                </div>
              )}
            </div>
          </div>

          {/* User Info Section */}
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <div className="space-y-1">
              <h1 className="text-xl font-bold text-foreground">
                {user?.name || "User Name"}
              </h1>
              <div className="flex items-center justify-center gap-2 text-muted-foreground sm:justify-start">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{user?.email || "email@example.com"}</span>
              </div>
            </div>

            {/* Verification Status & User ID in one row */}
            <div className="flex items-center justify-center gap-4 sm:justify-start">
              <Badge
                variant={user?.isVerified ? "default" : "destructive"}
                className="gap-1 text-xs"
              >
                {user?.isVerified ? (
                  <>
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </>
                ) : (
                  <>
                    <XCircle className="h-3 w-3" />
                    Unverified
                  </>
                )}
              </Badge>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <User className="h-3 w-3" />
                <span>ID: {user?.id?.slice(-8) || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <AccountSettings user={user} onLogout={onLogout} />
        </div>
      </CardContent>
    </Card>
  );
}

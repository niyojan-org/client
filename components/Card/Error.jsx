"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  IconExclamationCircle,
  IconLock,
  IconCalendarOff,
  IconRefresh,
  IconHome,
  IconArrowLeft,
  IconWifi,
  IconShieldX,
  IconServerOff,
  IconCalendarCheck,
  IconTicketOff
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const ErrorCard = ({
  error,
  onRetry,
  onGoHome,
  onGoBack,
  onBrowseEvents,
  className,
  showActions = true,
  size = "md" // sm, md, lg
}) => {
  // Helper function to get error icon and message
  const getErrorDisplay = (error) => {
    if (typeof error === 'string') {
      return {
        icon: IconExclamationCircle,
        title: "Error",
        message: error,
        details: null,
        color: "destructive"
      };
    }

    const errorCode = error?.error?.code || error?.code || error?.status;
    const errorMessage = error?.message || error?.error?.details || error?.error?.message || "Something went wrong";

    switch (errorCode) {
      case "REGISTRATION_CLOSED":
        return {
          icon: IconLock,
          title: "Registration Closed",
          message: "Registration is currently closed for this event",
          details: "The registration period has ended. Please contact the organizer for more information.",
          color: "warning"
        };

      case "PARTICIPANT_EXISTS":
        return {
          icon: IconExclamationCircle,
          title: "Participant Exists",
          message: error?.message || "Your registration with this email already exists for this event",
          details: error?.error?.details || "If you believe this is an error, please contact support.",
          color: "warning"
        };

      case "PARTICIPANT_CONFIRMED":
        return {
          icon: IconCalendarCheck,
          title: "Already Registered",
          message: error?.message || "You are already registered for this event",
          details: error?.error?.details.message || "If you have not received your ticket, please try logging in to our platform with the same email.",
          color: "warning"
        };

      case "PARTICIPANT_PENDING":
        return {
          icon: IconCalendarCheck,
          title: "Registration Pending",
          message: error?.message || "Your registration is pending",
          details: error?.error?.details.message || "Please complete the payment to confirm your registration.",
          color: "warning"
        };

      case "PARTICIPANT_CANCELLED":
        return {
          icon: IconCalendarOff,
          title: "Registration Cancelled",
          message: error?.message || "Your registration has been cancelled",
          details: error?.error?.details.message || "If this is a mistake, please contact the event organizer for assistance via our platform.",
          color: "destructive"
        };

      case "TICKET_SOLD_OUT":
        return {
          icon: IconTicketOff,
          title: "Ticket Sold Out",
          message: error?.message || "The selected ticket is sold out",
          details: error?.error?.details || "Please select a different ticket or check back later.",
          color: "destructive"
        };

      case "EVENT_NOT_FOUND":
        return {
          icon: IconCalendarOff,
          title: "Event Not Found",
          message: "The event you're looking for doesn't exist",
          details: "Please check the event URL or browse our available events.",
          color: "destructive"
        };

      case "NETWORK_ERROR":
      case "ERR_NETWORK":
        return {
          icon: IconWifi,
          title: "Network Error",
          message: "Unable to connect to the server",
          details: "Please check your internet connection and try again.",
          color: "warning"
        };

      case "UNAUTHORIZED":
      case 401:
        return {
          icon: IconShieldX,
          title: "Unauthorized",
          message: "You don't have permission to access this resource",
          details: "Please log in or contact support if you believe this is an error.",
          color: "warning"
        };

      case "SERVER_ERROR":
      case 500:
        return {
          icon: IconServerOff,
          title: "Server Error",
          message: "Something went wrong on our end",
          details: "Our team has been notified. Please try again in a few minutes.",
          color: "destructive"
        };

      case 404:
        return {
          icon: IconCalendarOff,
          title: "Not Found",
          message: "The requested resource was not found",
          details: "Please check the URL or go back to the previous page.",
          color: "warning"
        };

      default:
        return {
          icon: IconExclamationCircle,
          title: "Something Went Wrong",
          message: errorMessage,
          details: "Please try refreshing the page or contact support if the issue persists.",
          color: "destructive"
        };
    }
  };

  const errorDisplay = getErrorDisplay(error);
  const ErrorIcon = errorDisplay.icon;

  const sizeClasses = {
    sm: {
      container: "max-w-sm",
      icon: "w-12 h-12",
      iconContainer: "w-12 h-12",
      title: "text-lg",
      message: "text-sm",
      details: "text-xs"
    },
    md: {
      container: "max-w-md",
      icon: "w-8 h-8",
      iconContainer: "w-16 h-16",
      title: "text-xl",
      message: "text-base",
      details: "text-sm"
    },
    lg: {
      container: "max-w-lg",
      icon: "w-10 h-10",
      iconContainer: "w-20 h-20",
      title: "text-2xl",
      message: "text-lg",
      details: "text-base"
    }
  };

  const colorClasses = {
    destructive: {
      bg: "bg-destructive/10",
      border: "border-destructive/20",
      icon: "text-destructive",
      title: "text-destructive"
    },
    warning: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      icon: "text-yellow-600",
      title: "text-yellow-700"
    }
  };

  const currentSize = sizeClasses[size];
  const currentColor = colorClasses[errorDisplay.color];

  return (
    <div className={cn("w-full flex items-center justify-center min-h-[60vh]", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full"
      >
        <Card className={cn(
          "w-full shadow-lg border border-border rounded-xl gap-2",
          "bg-card text-card-foreground overflow-hidden",
          currentSize.container,
          "mx-auto"
        )}>
          <CardHeader className="text-center ">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
              className={cn(
                "mx-auto rounded-full flex items-center justify-center mb-4",
                currentSize.iconContainer,
                currentColor.bg,
                currentColor.border,
                "border"
              )}
            >
              <ErrorIcon className={cn(currentSize.icon, currentColor.icon)} />
            </motion.div>
            <CardTitle className={cn(currentSize.title, "font-bold", currentColor.title)}>
              {errorDisplay.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <p className={cn("text-foreground font-medium", currentSize.message)}>
                {errorDisplay.message}
              </p>

              {errorDisplay.details && (
                <p className={cn("text-muted-foreground mt-2", currentSize.details)}>
                  {errorDisplay.details}
                </p>
              )}
            </motion.div>

            {showActions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 pt-4 justify-center"
              >
                {onRetry && (
                  <Button
                    onClick={onRetry}
                    className={cn(
                      "flex items-center gap-2 rounded-full",
                      "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                  >
                    <IconRefresh size={16} />
                    Try Again
                  </Button>
                )}

                {onGoBack && (
                  <Button
                    variant="outline"
                    onClick={onGoBack}
                    className="flex items-center gap-2 rounded-full"
                  >
                    <IconArrowLeft size={16} />
                    Go Back
                  </Button>
                )}

                {onBrowseEvents && (
                  <Button
                    variant="outline"
                    onClick={onBrowseEvents}
                    className="flex items-center gap-2 rounded-full"
                  >
                    <IconCalendarOff size={16} />
                    Browse Events
                  </Button>
                )}

                {onGoHome && (
                  <Button
                    variant="ghost"
                    onClick={onGoHome}
                    className="flex items-center gap-2 rounded-full"
                  >
                    <IconHome size={16} />
                    Home
                  </Button>
                )}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ErrorCard;

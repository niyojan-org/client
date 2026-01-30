"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { IconCircleCheck, IconClock, IconShield } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

function PaymentVerificationLoading({ className }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90; // Stop at 90% until actual verification completes
        return prev + 10;
      });
    }, 300);

    return () => clearInterval(timer);
  }, []);

  const verificationSteps = [
    {
      icon: IconShield,
      text: "Securing your transaction",
      completed: progress >= 30,
    },
    {
      icon: IconClock,
      text: "Processing payment",
      completed: progress >= 60,
    },
    {
      icon: IconCircleCheck,
      text: "Verifying with payment gateway",
      completed: progress >= 90,
    },
  ];

  return (
    <div className={cn("h-full w-full flex items-center justify-center p-4", className)}>
      <Card className="max-w-md w-full border-2">
        <CardContent className="pt-6">
          {/* Main Icon with Animation */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping duration-700" />
              <div className="relative bg-primary/10 p-4 rounded-full">
                <IconShield className="w-12 h-12 text-primary" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-center mb-2">
            Verifying Your Payment
          </h2>
          <p className="text-center text-muted-foreground mb-6">
            Please wait while we confirm your transaction
          </p>

          {/* Progress Bar */}
          <div className="mb-6">
            <Progress value={progress} className="h-2" />
          </div>

          {/* Verification Steps */}
          <div className="space-y-4">
            {verificationSteps.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-3 transition-all duration-300",
                  step.completed ? "opacity-100" : "opacity-40"
                )}
              >
                <div
                  className={cn(
                    "rounded-full p-1.5 transition-colors",
                    step.completed
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <step.icon className="w-4 h-4" />
                </div>
                <span
                  className={cn(
                    "text-sm transition-colors",
                    step.completed
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {step.text}
                </span>
                {step.completed && (
                  <IconCircleCheck className="w-4 h-4 text-green-500 ml-auto" />
                )}
              </div>
            ))}
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-xs text-center text-muted-foreground">
              🔒 Your payment information is encrypted and secure
            </p>
          </div>

          {/* Warning Message */}
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Please do not close this window or refresh the page
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentVerificationLoading;

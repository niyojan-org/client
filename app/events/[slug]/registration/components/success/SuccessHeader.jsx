"use client";

import { IconConfetti, IconCheck } from "@tabler/icons-react";

export default function SuccessHeader({ isPaid = false, message = "", isGroup = false }) {
  return (
    <div className="text-center space-y-3 md:space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-success/20 rounded-full blur-2xl animate-pulse" />
          <div className="relative bg-gradient-to-br from-success/10 to-success/5 border-2 border-success/30 rounded-full p-4 md:p-5">
            <div className="bg-success rounded-full p-3 md:p-4 shadow-lg">
              <IconCheck className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Heading */}
      <div>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground flex items-center justify-center gap-2 flex-wrap">
          {isPaid ? (
            <>
              Payment Successful
              <IconConfetti className="w-6 h-6 md:w-8 md:h-8 text-primary animate-bounce" />
            </>
          ) : (
            <>
              {isGroup ? "Group Registered" : "Registration Confirmed"}
              <IconConfetti className="w-6 h-6 md:w-8 md:h-8 text-primary animate-bounce" />
            </>
          )}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mt-2 md:mt-3">
          {message || (isPaid 
            ? "Your payment has been processed successfully." 
            : isGroup 
            ? "All participants have been registered for the event." 
            : "Thank you for registering for the event.")}
        </p>
      </div>
    </div>
  );
}

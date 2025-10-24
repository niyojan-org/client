import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircledIcon } from "@radix-ui/react-icons";

export default function SuccessMessage({
  participant,
  confirmationMsg,
  onGoToEvents,
  onGoHome,
}) {
  return (
    <div className="flex items-center justify-center bg-card rounded-2xl p-8 border border-border shadow-md text-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center shadow-md border border-success/20">
          <CheckCircledIcon className="text-success w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-success">
          Registration Successful!
        </h2>
        <p className="text-foreground">
          Thank you <strong>{participant.name}</strong> for registering.
        </p>
        <p className="text-muted-foreground max-w-md">
          A confirmation email has been sent to <strong>{participant.email}</strong>. If you do not receive it within a few minutes, then try logging into our platform with same email.
        </p>

        {confirmationMsg && (
          <div className="mt-2 w-full p-4 bg-success/10 border border-success/30 rounded-lg">
            <p className="text-success">{confirmationMsg}</p>
          </div>
        )}
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          <Button
            onClick={onGoToEvents}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 rounded-full"
          >
            Go to Events
          </Button>
          <Button
            onClick={onGoHome}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 rounded-full"
          >
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}

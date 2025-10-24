import React from "react";
import { Button } from "@/components/ui/button";

export default function PendingPaymentDialog({
  participant,
  pendingPayment,
  eventTitle,
  submitting,
  onPayNow,
  onStartOver,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 animate-fadeIn">
      <div className="bg-card text-card-foreground rounded-xl shadow-xl p-6 w-full max-w-lg space-y-4 border border-border">
        <h2 className="text-xl font-bold text-primary text-center">
          Pending Registration
        </h2>
        <p className="text-center text-muted-foreground">
          You have a pending payment of ₹{(pendingPayment.amount / 100).toFixed(2)} for
          <b> {eventTitle}</b>.
        </p>

        <div className="flex gap-4 justify-center pt-4">
          <Button
            onClick={onPayNow}
            disabled={submitting}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 rounded-full"
          >
            {submitting ? "Processing..." : "Pay Now"}
          </Button>

          <Button variant="outline" onClick={onStartOver}>
            Start Over
          </Button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Button } from "@/components/ui/button";

export default function FailureMessage({ confirmationMsg, onTryAgain }) {
    return (
        <div className="flex items-center justify-center bg-muted rounded-xl p-6">
            <div className="bg-card border border-border rounded-xl shadow-md p-8 space-y-4 text-center">
                <h2 className="text-2xl font-bold text-destructive">Payment Failed</h2>
                <p className="text-muted-foreground">
                    {confirmationMsg || "Your payment was not completed."}
                </p>
                <Button
                    onClick={onTryAgain}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 rounded-full"
                >
                    Try Again
                </Button>
            </div>
        </div>
    );
}

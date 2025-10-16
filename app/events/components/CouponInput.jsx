"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { SpinnerCustom } from "@/components/ui/spinner";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, TicketPercent, XCircle } from "lucide-react";

export default function CouponInput({
  onApply,
  onClear,
  verifying,
  appliedCode,
  couponData,
  discountAmount,
  finalPrice,
  ticketPrice,
}) {
  const [code, setCode] = useState("");

  //  Confetti animation when coupon successfully applied
  useEffect(() => {
    if (appliedCode && discountAmount > 0) {
      const end = Date.now() + 1.5 * 1000;
      const colors = ["#6366F1", "#F59E0B", "#10B981", "#3B82F6", "#EC4899"];
      const frame = () => {
        if (Date.now() > end) return;
        confetti({
          particleCount: 6,
          startVelocity: 30,
          spread: 70,
          ticks: 50,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
          colors,
        });
        requestAnimationFrame(frame);
      };
      frame();
      return () => cancelAnimationFrame(frame);
    }
  }, [appliedCode, discountAmount]);

  const handleApply = () => {
    if (!code.trim()) {
      toast.error("Please enter a coupon code.");
      return;
    }
    onApply?.(code.trim());
  };

  const handleClear = () => {
    setCode("");
    onClear?.();
    toast.info("Coupon removed.");
  };

  return (
    <div className="w-full max-w-md flex flex-col gap-3 transition-colors duration-700">
      {/* Label */}
      <Label
        htmlFor="coupon-input"
        className="font-semibold text-foreground flex items-center gap-2 text-sm sm:text-base"
      >
        <TicketPercent className="w-4 h-4 text-primary" />
        Apply Coupon
      </Label>

      {/* Input & Button */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          id="coupon-input"
          placeholder="Enter your coupon code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={verifying || appliedCode}
          className="
            flex-1 rounded-xl border-border bg-background 
            focus-visible:ring-2 focus-visible:ring-primary 
            text-sm sm:text-base
            py-2
          "
        />

        {appliedCode ? (
          <Button
            type="button"
            variant="destructive"
            onClick={handleClear}
            className="rounded-full w-full sm:w-auto flex items-center gap-2"
          >
            <XCircle className="w-4 h-4" />
            Remove
          </Button>
        ) : (
          <Button
            type="button"
            variant="secondary"
            onClick={handleApply}
            disabled={verifying}
            className="rounded-full w-full sm:w-auto flex items-center gap-2"
          >
            {verifying ? (
              <SpinnerCustom className="h-4 w-4" />
            ) : (
              <>
                <TicketPercent className="w-4 h-4" />
                Apply
              </>
            )}
          </Button>
        )}
      </div>

      {/* Coupon applied message */}
      <AnimatePresence mode="wait">
        {appliedCode && couponData && (
          <motion.div
            key="applied"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="
              flex items-start gap-3 mt-3 
              p-4 rounded-xl border border-success/30 shadow-sm
              bg-green-50 dark:bg-green-900/20
            "
          >
            <CheckCircle2 className="w-6 h-6 text-success dark:text-success-400 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-success-700 dark:text-success-300">
                Coupon “{appliedCode}” applied successfully!
              </p>

              {discountAmount > 0 && (
                <>
                  <p className="text-sm text-foreground">
                    Discount: ₹{discountAmount}{" "}
                    {couponData.discountType === "percent" &&
                      `(${couponData.discountValue}%)`}
                  </p>
                  <p className="text-sm text-success-700 dark:text-success-400 font-medium">
                    Final Price: ₹{finalPrice}{" "}
                    <span className="text-muted-foreground line-through text-xs">
                      ₹{ticketPrice}
                    </span>
                  </p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info text */}
      {!appliedCode && (
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <TicketPercent className="w-3 h-3 text-primary" />
          Enter a coupon to unlock special student discounts.
        </p>
      )}
    </div>
  );
}

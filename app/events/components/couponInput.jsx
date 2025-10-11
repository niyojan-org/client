"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { SpinnerCustom } from "@/components/ui/spinner";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

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

  // 🎉 Confetti when coupon successfully applied
  useEffect(() => {
    if (appliedCode && discountAmount > 0) {
      const end = Date.now() + 1.5 * 1000;
      const colors = ["#7C3AED", "#F59E0B", "#10B981", "#3B82F6", "#F472B6"];
      const frame = () => {
        if (Date.now() > end) return;
        confetti({
          particleCount: 5,
          startVelocity: 35,
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
      toast.error("Please enter a valid coupon code");
      return;
    }
    onApply?.(code.trim());
  };

  const handleClear = () => {
    setCode("");
    onClear?.();
    toast.info("Coupon removed");
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <Label htmlFor="coupon-input" className="font-medium">
        Coupon Code
      </Label>

      <div className="flex gap-2">
        <Input
          id="coupon-input"
          placeholder="Enter coupon code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={verifying || appliedCode}
          className="rounded-full flex-1 border-muted-foreground/50 focus-visible:ring-primary"
        />

        {appliedCode ? (
          <Button
            type="button"
            variant="destructive"
            onClick={handleClear}
            className="rounded-full"
          >
            Remove
          </Button>
        ) : (
          <Button
            type="button"
            variant="secondary"
            onClick={handleApply}
            disabled={verifying}
            className="rounded-full"
          >
            {verifying ? <SpinnerCustom className="h-4 w-4" /> : "Apply"}
          </Button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {appliedCode && couponData && (
          <motion.div
            key="applied"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-3 mt-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-400/30 rounded-xl shadow-sm"
          >
            <div className="mt-1">
              <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="font-semibold text-green-700 dark:text-green-300">
                Coupon “{appliedCode}” applied!
              </p>
              {discountAmount > 0 && (
                <>
                  <p className="text-sm">
                    Discount: ₹{discountAmount}{" "}
                    {couponData.discountType === "percent" &&
                      `(${couponData.discountValue}%)`}
                  </p>
                  <p className="text-green-700 dark:text-green-400 font-medium text-sm">
                    Final Price: ₹{finalPrice} (was ₹{ticketPrice})
                  </p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!appliedCode && (
        <p className="text-xs text-muted-foreground">
          Apply a coupon to get exclusive discounts ✨
        </p>
      )}
    </div>
  );
}

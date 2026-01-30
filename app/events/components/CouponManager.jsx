"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useEventStore from "@/store/eventStore";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SpinnerCustom } from "@/components/ui/spinner";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { IconCircleCheck, IconTicket, IconCircleX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function CouponManager({
    slug,
    selectedTicket,
    onCouponChange,
    allowCoupons = false,
    className,
}) {
    const searchParams = useSearchParams();
    const couponCodeFromUrl = searchParams.get("coupon") || null;

    const {
        verifyCouponCode,
        couponData,
        verifyingCoupon,
        couponFinalPrice,
        couponDiscount,
        clearCoupon
    } = useEventStore();

    const [couponCode, setCouponCode] = useState("");

    // Auto-apply coupon from URL when component mounts and ticket is selected
    useEffect(() => {
        if (couponCodeFromUrl && selectedTicket && !couponData) {
            setCouponCode(couponCodeFromUrl);
            applyCoupon(couponCodeFromUrl);
        }
    }, [couponCodeFromUrl, selectedTicket?.price]);

    // Clear coupon when ticket changes
    useEffect(() => {
        if (selectedTicket && couponData) {
            clearCoupon();
            setCouponCode("");
        }
    }, [selectedTicket?._id]);

    // Notify parent component when coupon changes
    useEffect(() => {
        onCouponChange?.(couponCode, couponData, couponDiscount, couponFinalPrice);
    }, [couponCode, couponData, couponDiscount, couponFinalPrice]);

    // Confetti animation when coupon successfully applied
    useEffect(() => {
        if (couponData && couponDiscount > 0) {
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
    }, [couponData, couponDiscount]);

    const applyCoupon = async (code) => {
        if (!code.trim()) {
            toast.error("Please enter a coupon code.");
            return;
        }

        if (!selectedTicket) {
            toast.error("Please select a ticket first");
            return;
        }

        try {
            const { discountAmount } = await verifyCouponCode(
                slug,
                code.trim(),
                selectedTicket?.price
            );
            setCouponCode(code.trim());
            toast.success(`Coupon applied! ₹${discountAmount} off your ticket`);
        } catch (err) {
            toast.error(err.response?.data?.message || "Invalid coupon code");
            setCouponCode("");
        }
    };

    const removeCoupon = () => {
        clearCoupon();
        setCouponCode("");
        toast.info("Coupon removed");
    };

    if (!allowCoupons) return null;

    return (
        <div className={cn("w-full grid grid-cols-1 sm:grid-cols-2 items-center justify-between gap-3 transition-colors duration-700", className)}>
            <div className="w-full">
                {/* Label */}
                <Label
                    htmlFor="coupon-input"
                    className="font-semibold text-foreground flex items-center gap-2 text-sm sm:text-base"
                >
                    <IconTicket className="w-4 h-4 text-primary" />
                    Apply Coupon
                </Label>

                {/* Input & Button */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                        id="coupon-input"
                        placeholder="Enter your coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        disabled={verifyingCoupon || couponData}
                        className="
                        flex-1 rounded-xl border-border bg-background 
                        focus-visible:ring-2 focus-visible:ring-primary 
                        text-sm sm:text-base
                        py-2
                    "
                    />

                    {couponData ? (
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={removeCoupon}
                            className="rounded-full w-full sm:w-auto flex items-center gap-2"
                        >
                            <IconCircleX className="w-4 h-4" />
                            Remove
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => applyCoupon(couponCode)}
                            disabled={verifyingCoupon}
                            className="rounded-full w-full sm:w-auto flex items-center gap-2"
                        >
                            {verifyingCoupon ? (
                                <SpinnerCustom className="h-4 w-4" />
                            ) : (
                                <>
                                    <IconTicket className="w-4 h-4" />
                                    Apply
                                </>
                            )}
                        </Button>
                    )}
                </div>

                {!couponData && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <IconTicket className="w-3 h-3 text-primary" />
                        Enter a coupon to unlock special student discounts.
                    </p>
                )}
            </div>

            {/* Coupon applied message */}
            <AnimatePresence mode="wait">
                {couponData && (
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
                        <IconCircleCheck className="w-6 h-6 text-success dark:text-success-400 mt-0.5" />
                        <div className="space-y-1">
                            <p className="font-semibold text-success-700 dark:text-success-300">
                                Coupon "{couponData.code}" applied successfully!
                            </p>

                            {couponDiscount > 0 && (
                                <>
                                    <p className="text-sm text-foreground">
                                        Discount: ₹{couponDiscount}{" "}
                                        {couponData.discountType === "percent" &&
                                            `(${couponData.discountValue}%)`}
                                    </p>
                                    <p className="text-sm text-success-700 dark:text-success-400 font-medium">
                                        Final Price: ₹{couponFinalPrice}{" "}
                                        <span className="text-muted-foreground line-through text-xs">
                                            ₹{selectedTicket?.price}
                                        </span>
                                    </p>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
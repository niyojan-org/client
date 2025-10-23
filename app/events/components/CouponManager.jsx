"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useEventStore from "@/store/eventStore";
import { toast } from "sonner";
import CouponInput from "./CouponInput";

export default function CouponManager({
    slug,
    selectedTicket,
    onCouponChange,
    allowCoupons = false
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

    const applyCoupon = async (code) => {
        if (!selectedTicket) {
            toast.error("Please select a ticket first");
            return;
        }

        try {
            const { discountAmount } = await verifyCouponCode(
                slug,
                code,
                selectedTicket?.price
            );
            setCouponCode(code);
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

    const originalPrice = selectedTicket?.price || 0;
    const finalPrice = couponFinalPrice || originalPrice;

    return (
        <CouponInput
            verifying={verifyingCoupon}
            couponData={couponData}
            appliedCode={couponData?.code}
            discountAmount={couponDiscount}
            finalPrice={finalPrice}
            ticketPrice={originalPrice}
            initialCode={couponCode}
            onApply={applyCoupon}
            onClear={removeCoupon}
            className="max-w-sm"
        />
    );
}
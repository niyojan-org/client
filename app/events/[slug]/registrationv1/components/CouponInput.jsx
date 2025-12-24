"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import api from "@/lib/api";
import useEventRegistrationStore from "@/store/eventRegistration";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function CouponInput() {
  const searchParams = useSearchParams();
  const couponCodeFromUrl = searchParams.get("coupon") || null;
  const [code, setCode] = useState("");
  const [couponData, setCouponData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { eventSlug, ticket, setCouponCode, clearCoupon } = useEventRegistrationStore();
  useEffect(() => {
    if (couponCodeFromUrl && !couponData && couponCodeFromUrl.length >= 3) {
      setCode(couponCodeFromUrl);
      applyCoupon(couponCodeFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [couponCodeFromUrl]);

  const applyCoupon = async (couponCode) => {
    if (!couponCode || couponCode.length < 3) {
      toast.error("Please enter a valid coupon code");
      return;
    }

    try {
      setLoading(true);
      const response = await api.get("/event/coupons/apply", {
        params: {
          eventId: eventSlug,
          ticketId: ticket?._id,
          code: couponCode,
        },
      });

      if (response.data.success) {
        setCouponData(response.data.data);
        toast.success(response.data.message || "Coupon applied successfully!");
        setCouponCode(couponCode);
      }
    } catch (error) {
      setCouponData(null);
      toast.error(error.response?.data?.message || "Failed to apply coupon");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCoupon = () => {
    applyCoupon(code);
  };

  const handleRemoveCoupon = () => {
    setCouponData(null);
    setCode("");
    clearCoupon();
    toast.info("Coupon removed");
  };

  return (
    <div className="w-full space-y-2">
      {!couponData ? (
        <>
          <Label htmlFor="coupon">Coupon Code</Label>
          <div className="flex rounded-md shadow-xs">
            <Input
              id="coupon"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Enter coupon code"
              className="-me-px rounded-r-none shadow-none focus-visible:z-1"
            />
            <Button
              onClick={handleApplyCoupon}
              disabled={loading || !code}
              className="rounded-l-none"
            >
              {loading ? "Applying..." : "Apply"}
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <Label>Coupon Applied</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveCoupon}
              className="h-auto p-1 hover:bg-destructive/10"
            >
              <X className="h-4 w-4 text-destructive" />
            </Button>
          </div>
          <div className="border rounded-md p-2 space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="font-semibold">
                {couponData.code}
              </Badge>
              <Badge variant="default" className="bg-green-600 hover:bg-green-600">
                {couponData.pricing.savingsPercentage}% OFF
              </Badge>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between items-center text-muted-foreground">
                <span className="line-through">₹{couponData.pricing.originalPrice}</span>
                <span className="text-xs">-₹{couponData.pricing.discount}</span>
              </div>
              <div className="flex justify-between items-center font-semibold text-base">
                <span>Final Price:</span>
                <span className="text-primary">₹{couponData.pricing.finalPrice}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CouponInput;

"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function CouponInput({ onApply }) {
  const [coupon, setCoupon] = useState("")

  const handleApply = () => {
    if (!coupon.trim()) {
      toast.error("Please enter a valid coupon code")
      return
    }
    onApply?.(coupon)               // notify parent
    toast.info(`Coupon "${coupon}" applied`)
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor="coupon-input" className="font-medium">Coupon Code</Label>
      <div className="flex gap-2">
        <Input
          id="coupon-input"
          placeholder="Enter coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="rounded-full flex-1 border-muted-foreground/50 focus-visible:ring-primary"
        />
        <Button
          type="button"
          variant="secondary"
          onClick={handleApply}
          className="rounded-full"
        >
          Apply
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Apply a coupon to get discounts
      </p>
    </div>
  )
}





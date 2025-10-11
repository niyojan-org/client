"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { XCircle } from "lucide-react";
import DynamicField from "./DynamicField";
import {
  Stepper,
  StepperItem,
  StepperIndicator,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import useEventStore from "@/store/eventStore";
import CouponInput from "./couponInput";

// ── Multi-Step Form for Group Registration ──
export default function GroupMultiStepForm({
  allFields = [],
  groupSettings = {},
  groupName,
  setGroupName,
  leaderData = {},
  onSubmit,
  slug,
  selectedTicket,
  couponCode,
  setCouponCode,
}) {
  const { minParticipants = 2, maxParticipants = 5 } = groupSettings;
  const [currentStep, setCurrentStep] = useState(1);
  const [groupMembers, setGroupMembers] = useState([]);
  const [leaderForm, setLeaderForm] = useState(leaderData);
  const [loading, setLoading] = useState(false);
  const {
    fetchRegistrationForm,
    registrationForm,
    verifyCouponCode,
    couponData,
    verifyingCoupon,
    couponFinalPrice,
    couponDiscount,
    clearCoupon,
  } = useEventStore();

  /** ── ensure at least 1 member exists (Leader + Member2) ── */
  useEffect(() => {
    if (groupMembers.length < minParticipants - 1) {
      setGroupMembers(Array.from({ length: minParticipants - 1 }, () => ({})));
    }
  }, [minParticipants]);

  /** ── step labels ── */
  const steps = [
    "Leader",
    ...groupMembers.map((_, i) => `Member ${i + 2}`),
    "Review",
  ];

  const requiredFields = allFields.filter((f) => f.required);

  /** ── validate each step ── */
  const validateLeader = () =>
    requiredFields.every((f) => !!leaderForm[f.name]);

  const validateMember = (idx) =>
    requiredFields.every((f) => !!groupMembers[idx]?.[f.name]);

  /** check all previous steps up to `step` */
  const validateUpTo = (step) => {
    if (!validateLeader()) return false;
    for (let i = 0; i < step - 1; i++) {
      if (!validateMember(i)) return false;
    }
    return true;
  };

  const nextStep = () => {
    if (validateUpTo(currentStep)) {
      setCurrentStep((s) => Math.min(s + 1, steps.length));
    } else {
      toast.error("Please complete required fields first.");
    }
  };

  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const addMember = () => {
    if (groupMembers.length < maxParticipants - 1) {
      setGroupMembers((prev) => [...prev, {}]);
      setCurrentStep(groupMembers.length + 2); // jump to new member
    }
  };

  const removeMember = (index) => {
    if (index === 0) {
      toast.error("At least two members are required.");
      return;
    }
    const updated = [...groupMembers];
    updated.splice(index, 1);
    setGroupMembers(updated);
    setCurrentStep(Math.min(currentStep, updated.length + 1));
    toast.info("Member removed");
  };

  const handleMemberChange = (index, name, value) => {
    setGroupMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const handleSubmit = async () => {
    if (!validateUpTo(groupMembers.length + 1)) {
      toast.error("Please fill all required fields before submitting.");
      return;
    }
    try {
      setLoading(true);
      await onSubmit({ leader: leaderForm, groupName, groupMembers });
    } finally {
      setLoading(false);
    }
  };

  const isReviewStep = currentStep === steps.length;
  const isLastMemberStep = currentStep === groupMembers.length + 1;
  // 🔢 Final ticket price after coupon
  const originalPrice = selectedTicket?.price || 0;
  const finalPrice = couponFinalPrice || originalPrice;

  ///// ── Render ── ////
  return (
    <Card className="shadow-md border rounded-xl ">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">
          Group Registration
        </CardTitle>
      </CardHeader>

      {/* ── Stepper ── */}
      <div className="px-3 sm:px-6 overflow-x-auto">
        <Stepper
          value={currentStep}
          onValueChange={(val) => {
            if (val <= currentStep) {
              setCurrentStep(val);
            } else if (!validateUpTo(val - 1)) {
              toast.error("Please complete previous steps first.");
            } else {
              setCurrentStep(val);
            }
          }}
          className="w-full flex flex-nowrap gap-4 sm:justify-between scrollbar-thin"
        >
          {steps.map((label, i) => (
            <React.Fragment key={i}>
              <StepperItem step={i + 1}>
                <StepperTrigger className="flex flex-col items-center gap-2">
                  <StepperIndicator className="size-6 text-sm font-semibold" />
                  <StepperTitle className="text-xs sm:text-sm">
                    {label}
                  </StepperTitle>
                </StepperTrigger>
              </StepperItem>
              {i < steps.length - 1 && <StepperSeparator />}
            </React.Fragment>
          ))}
        </Stepper>
      </div>

      {/* ── Step Content ── */}
      <CardContent className="space-y-6 mt-4">
        {!isReviewStep && (
          <>
            {currentStep === 1 && (
              <div>
                <Label className="font-medium mb-2 block">Group Name</Label>
                <Input
                  placeholder="Enter group name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="rounded-xl focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allFields.map((f) => (
                <DynamicField
                  key={`${currentStep}-${f.name}`}
                  field={f}
                  value={
                    currentStep === 1
                      ? leaderForm[f.name]
                      : groupMembers[currentStep - 2]?.[f.name]
                  }
                  onChange={(name, val) =>
                    currentStep === 1
                      ? setLeaderForm((p) => ({ ...p, [name]: val }))
                      : handleMemberChange(currentStep - 2, name, val)
                  }
                />
              ))}
            </div>

            {currentStep > 1 && currentStep <= groupMembers.length + 1 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeMember(currentStep - 2)}
                className="flex items-center gap-2 rounded-full"
              >
                <XCircle className="w-4 h-4" />
                Remove Member
              </Button>
            )}
          </>
        )}

        {/* ── Review ── */}
        {isReviewStep && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-center">
              Review Your Group Details
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Leader</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-medium text-primary">
                    Group Name: {groupName}
                  </p>
                  {allFields.map((f) => (
                    <div
                      key={f.name}
                      className="flex justify-between border-b py-1"
                    >
                      <span className="text-muted-foreground">{f.label}</span>
                      <span>{leaderForm[f.name] || "-"}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Members</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {groupMembers.map((m, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <h4 className="font-semibold text-sm">
                        Member {idx + 2}
                      </h4>
                      {allFields.map((f) => (
                        <div
                          key={f.name}
                          className="flex justify-between border-b py-1"
                        >
                          <span className="text-muted-foreground">
                            {f.label}
                          </span>
                          <span>{m[f.name] || "-"}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* ── Nav Buttons ── */}
        <div className="flex flex-wrap justify-between gap-3 pt-4">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={prevStep}
              className="rounded-full"
            >
              ← Previous
            </Button>
          )}

          {!isReviewStep &&
            isLastMemberStep &&
            groupMembers.length + 1 < maxParticipants && (
              <Button
                variant="secondary"
                onClick={addMember}
                className="rounded-full"
              >
                + Add Member
              </Button>
            )}

          {!isReviewStep && (
            <Button
              onClick={nextStep}
              className="ml-auto rounded-full bg-primary text-primary-foreground px-8"
            >
              Next →
            </Button>
          )}
        </div>

        {/* coupon input filed based on backend data  */}

        {registrationForm?.allowCoupons && isReviewStep && (
          <>
            <CouponInput
              verifying={verifyingCoupon}
              couponData={couponData}
              appliedCode={couponData?.code}
              discountAmount={couponDiscount}
              finalPrice={finalPrice}
              ticketPrice={originalPrice}
              onApply={async (code) => {
                try {
                  const { discountAmount } = await verifyCouponCode(
                    slug,
                    code,
                    selectedTicket?.price
                  );
                  setCouponCode(code);
                  toast.success(
                    `Coupon applied! You saved ₹${discountAmount} off your ticket`
                  );
                } catch (err) {
                  toast.error(
                    err.response?.data?.message || "Invalid coupon code"
                  );
                }
              }}
              onClear={() => {
                clearCoupon();
                setCouponCode("");
              }}
              className="max-w-sm"
            />

            <div className="pt-6 flex justify-center">
              <Button
                size="lg"
                className="w-full sm:w-1/2 bg-primary text-card rounded-full"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading
                  ? "Submitting..."
                  : couponDiscount > 0
                    ? `Pay ₹${originalPrice} → ₹${finalPrice} after coupon`
                    : ` Submit & Pay ₹${originalPrice}`}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

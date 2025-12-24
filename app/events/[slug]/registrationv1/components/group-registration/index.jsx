"use client";

import React, { useEffect, useState } from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useEventStore from "@/store/eventStore";
import CouponInput from "../CouponInput";

// Components
import FormStepper from "./FormStepper";
import FormFields from "./FormFields";
import ReviewStep from "./ReviewStep";
import NavigationButtons from "./NavigationButtons";

// Utilities
import { validateCurrentStep, collectValidationErrors } from "./utils/validation";
import { createFieldHandlers, createNavigationHandlers } from "./utils/handlers";
import { useFieldErrors, useFieldRefs } from "./hooks/useFormState";
import useEventRegistrationStore from "@/store/eventRegistration";

export default function GroupMultiStepForm({
    allFields = [],
    groupName,
    setGroupName,
    leaderData = {},
    onSubmit,
    slug,
    selectedTicket,
    setCouponCode,
}) {

    const { registrationForm, ticket } = useEventRegistrationStore();

    const { minParticipants = 2, maxParticipants = 5 } = ticket?.groupSettings || {};
    const [currentStep, setCurrentStep] = useState(1);
    const [groupMembers, setGroupMembers] = useState([]);
    const [leaderForm, setLeaderForm] = useState(leaderData);
    const [loading, setLoading] = useState(false);

    const { fieldErrors, clearFieldError, setErrors, clearAllErrors } = useFieldErrors();
    const { fieldRefs, scrollToField } = useFieldRefs();

    const {
        verifyCouponCode,
        couponData,
        verifyingCoupon,
        couponFinalPrice,
        couponDiscount,
        clearCoupon,
    } = useEventStore();

    // Initialize minimum members
    useEffect(() => {
        if (groupMembers.length < minParticipants - 1) {
            setGroupMembers(Array.from({ length: minParticipants - 1 }, () => ({})));
        }
    }, [minParticipants]);

    const steps = ["Leader", ...groupMembers.map((_, i) => `Member ${i + 2}`), "Review"];
    const requiredFields = allFields.filter((f) => f.required);
    const isReviewStep = currentStep === steps.length;
    const isLastMemberStep = currentStep === groupMembers.length + 1;

    // Field handlers
    const { handleLeaderChange, handleMemberChange } = createFieldHandlers(
        leaderForm,
        setLeaderForm,
        groupMembers,
        setGroupMembers,
        clearFieldError
    );

    // Navigation handlers
    const { nextStep: goNext, prevStep, addMember, removeMember } = createNavigationHandlers(
        currentStep,
        setCurrentStep,
        steps,
        groupMembers,
        setGroupMembers,
        maxParticipants,
        minParticipants
    );

    const handleFieldFocus = (name) => {
        scrollToField(`${currentStep}-${name}`);
    };

    // Validate and move to next step
    const handleNext = () => {
        const { errors, missingFields } = validateCurrentStep(
            currentStep,
            groupName,
            leaderForm,
            groupMembers,
            requiredFields
        );

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            const fieldsList = missingFields.slice(0, 3).join(", ");
            const remaining = missingFields.length > 3 ? ` and ${missingFields.length - 3} more` : "";
            toast.error(`Please fill: ${fieldsList}${remaining}`);
            scrollToField(Object.keys(errors)[0]);
            return;
        }

        goNext();
    };

    // Handle stepper click
    const handleStepChange = (val) => {
        if (val <= currentStep) {
            setCurrentStep(val);
        } else {
            toast.error("Please complete previous steps first.");
        }
    };

    // Final submission
    const handleSubmit = async () => {
        const { errors, missingFields } = collectValidationErrors(
            groupName,
            leaderForm,
            groupMembers,
            requiredFields
        );

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            const fieldsList = missingFields.slice(0, 3).join(", ");
            const remaining = missingFields.length > 3 ? ` and ${missingFields.length - 3} more` : "";
            toast.error(`Please fill: ${fieldsList}${remaining}`);
            scrollToField(Object.keys(errors)[0]);
            return;
        }

        try {
            setLoading(true);
            clearAllErrors();
            await onSubmit({ leader: leaderForm, groupName, groupMembers });
        } finally {
            setLoading(false);
        }
    };

    const originalPrice = selectedTicket?.price || 0;
    const finalPrice = couponFinalPrice || originalPrice;

    return (
        <div>
            <CardHeader>
                <CardTitle className="text-center text-xl font-semibold">
                    Group Registration
                </CardTitle>
            </CardHeader>

            <FormStepper steps={steps} currentStep={currentStep} onStepChange={handleStepChange} />

            <div className="space-y-6 mt-2">
                {!isReviewStep ? (
                    <FormFields
                        currentStep={currentStep}
                        groupName={groupName}
                        setGroupName={setGroupName}
                        allFields={allFields}
                        leaderForm={leaderForm}
                        groupMembers={groupMembers}
                        fieldErrors={fieldErrors}
                        fieldRefs={fieldRefs}
                        onLeaderChange={handleLeaderChange}
                        onMemberChange={handleMemberChange}
                        onFieldFocus={handleFieldFocus}
                        onClearFieldError={clearFieldError}
                    />
                ) : (
                    <ReviewStep
                        groupName={groupName}
                        leaderForm={leaderForm}
                        groupMembers={groupMembers}
                        allFields={allFields}
                    />
                )}

                {ticket?.price > 0 && registrationForm?.allowCoupons && isReviewStep && (
                    <div className="space-y-4">
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
                                    toast.success(`Coupon applied! You saved ₹${discountAmount}`);
                                } catch (err) {
                                    toast.error(err.response?.data?.message || "Invalid coupon code");
                                }
                            }}
                            onClear={() => {
                                clearCoupon();
                                setCouponCode("");
                            }}
                            className="max-w-sm"
                        />
                    </div>
                )}

                {isReviewStep && (
                    <p className="text-sm text-gray-500 my-2">
                        By proceeding, you agree to our{" "}
                        <a href="/terms-and-conditions" className="underline text-primary" target="_blank">
                            T&C
                        </a>
                        ,{" "}
                        <a href="/refund-policy" className="underline text-primary" target="_blank">
                            Refund Policy
                        </a>
                        , and{" "}
                        <a href="/delivery-policy" className="underline text-primary" target="_blank">
                            Delivery Policy
                        </a>
                    </p>
                )}

                <NavigationButtons
                    currentStep={currentStep}
                    isReviewStep={isReviewStep}
                    isLastMemberStep={isLastMemberStep}
                    canAddMember={groupMembers.length + 1 < maxParticipants}
                    canRemoveMember={
                        currentStep > 1 &&
                        currentStep <= groupMembers.length + 1 &&
                        groupMembers.length >= minParticipants
                    }
                    onPrevious={prevStep}
                    onNext={handleNext}
                    onAddMember={addMember}
                    onRemoveMember={() => removeMember(currentStep - 2)}
                    handleSubmit={handleSubmit}
                />

                {/* Coupon Section */}



            </div>
        </div>
    );
}

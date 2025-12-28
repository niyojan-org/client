"use client";
import DynamicField from "@/app/events/components/DynamicField";
import { Button } from "@/components/ui/button";
import useEventRegistrationStore from "@/store/eventRegistration";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import CouponInput from "./CouponInput";

function SingleParticipant({ allFields }) {
  const [data, setData] = useState({});
  const { register, ticket, isSubmitting, fieldErrors, clearFieldError, registrationForm } =
    useEventRegistrationStore();

  const { user } = useUserStore();
  const fieldRefs = useRef({});

  const handleFieldChange = (name, val) => {
    setData((prev) => ({ ...prev, [name]: val }));
    if (fieldErrors[name]) {
      clearFieldError(name);
    }
  };

  const handleFieldFocus = (name) => {
    // Scroll the field into view when focused (helps with mobile keyboard)
    if (fieldRefs.current[name]) {
      setTimeout(() => {
        fieldRefs.current[name].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300); // Delay to allow keyboard animation
    }
  };

  useEffect(() => {
    if (user) {
      const initialData = {};
      allFields.forEach((field) => {
        // Map phone_number to phone
        const userKey = field.name === "phone" ? "phone_number" : field.name;
        if (user[userKey]) {
          initialData[field.name] = user[userKey];
        }
      });
      setData((prev) => ({ ...prev, ...initialData }));
    }
  }, [user, allFields]);

  const handleSubmit = async () => {
    const result = await register(data);

    if (!result.success) {
      toast.error(result.error || "Please fill all required fields correctly.");
      if (result.firstErrorField && fieldRefs.current[result.firstErrorField]) {
        fieldRefs.current[result.firstErrorField].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    } else {
      // toast.success("Registration successful!");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {allFields.map((f) => (
          <div key={f.name} ref={(el) => (fieldRefs.current[f.name] = el)}>
            <DynamicField
              field={f}
              value={data[f.name] || ""}
              onChange={handleFieldChange}
              onFocus={handleFieldFocus}
              error={fieldErrors[f.name]}
            />
          </div>
        ))}
        {ticket?.price > 0 && registrationForm?.allowCoupons && <CouponInput />}
      </div>
      <p className="text-sm text-gray-500 my-2">
        By proceeding, you agree to our{" "}
        <Link href="/terms-and-conditions" className="underline text-primary" target="_blank">
          T&C{" "}
        </Link>
        ,{" "}
        <Link href="/refund-policy" className="underline text-primary" target="_blank">
          Refund Policy
        </Link>
        , and{" "}
        <Link href="/delivery-policy" className="underline text-primary" target="_blank">
          Delivery Policy
        </Link>
      </p>

      <Button
        onClick={handleSubmit}
        disabled={isSubmitting || !ticket}
        className="w-full rounded-full"
      >
        {isSubmitting
          ? "Submitting..."
          : ticket
            ? ticket?.price > 0
              ? `Pay Now /-`
              : "Register Now"
            : "Select a ticket"}
      </Button>
    </div>
  );
}

export default SingleParticipant;

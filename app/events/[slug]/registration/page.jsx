"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useEventStore from "@/store/eventStore";
import { toast } from "sonner";
import { SpinnerCustom } from "@/components/ui/spinner";
import api from "@/lib/api";
import ErrorCard from "@/components/Card/Error";
import RegistrationBanner from "./components/RegistrationBanner";
import PendingPaymentDialog from "./components/PendingPaymentDialog";
import SuccessMessage from "./components/SuccessMessage";
import FailureMessage from "./components/FailureMessage";
import RegistrationForm from "./components/RegistrationForm";
import { useConfetti } from "./hooks/useConfetti";
import { useRegistration } from "./hooks/useRegistration";

export default function RegistrationPage() {
  const { slug } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("ref") || null;
  const ticketIdFromUrl = searchParams.get("ticketId") || null;

  const { fetchRegistrationForm, registrationForm, error, loadingRegistrationForm } = useEventStore();

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [formData, setFormData] = useState({});
  const [groupName, setGroupName] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  // const [couponFinalPrice, setCouponFinalPrice] = useState(null);

  const {
    submitting,
    setSubmitting,
    paymentStatus,
    participant,
    confirmationMsg,
    pendingPayment,
    showPendingDialog,
    errorForm,
    setErrorForm,
    normalizeDynamicFields,
    handlePendingPaymentResponse,
    processPayment,
    handleRegistrationResponse,
    resetPendingDialog,
    couponFinalPrice,
  } = useRegistration();

  useConfetti(paymentStatus === "success");

  useEffect(() => {
    if (slug) fetchRegistrationForm(slug);
  }, [slug]);

  useEffect(() => {
    if (registrationForm?.tickets) {
      if (ticketIdFromUrl) {
        const ticket = registrationForm.tickets.find((t) => t._id == ticketIdFromUrl);
        if (ticket) setSelectedTicket(ticket);
      } else if (registrationForm.tickets.length === 1) {
        setSelectedTicket(registrationForm.tickets[0]);
      }
    }
  }, [registrationForm, ticketIdFromUrl]);

  const handleCouponChange = (code, data, discount, finalPrice) => {
    setCouponCode(code);
    setCouponDiscount(discount);
    // setCouponFinalPrice(finalPrice);
  };

  const allFields = [
    ...(registrationForm?.defaultFields || []),
    ...(registrationForm?.customFields || []),
  ];

  const validateLeader = () => {
    for (const f of allFields) {
      if (f.required && !formData[f.name]) {
        toast.error(`${f.label} is required`);
        return false;
      }
    }
    if (!selectedTicket) {
      toast.error("Please select a ticket before continuing.");
      return false;
    }
    return true;
  };

  const handleSubmitSingle = async (e) => {
    e.preventDefault();
    if (!validateLeader()) return;

    try {
      setSubmitting(true);
      const payload = {
        ticketId: selectedTicket?._id,
        couponCode: couponCode || null,
        referralCode: referralCode || null,
        name: formData.name || "",
        email: formData.email || "",
        phone: formData.phone || "",
        dynamicFields: normalizeDynamicFields(formData),
      };

      const res = await api.post(`/event/${slug}/register`, payload);
      const { code, data, participant, message } = res.data;

      await handleRegistrationResponse(code, data, message, participant);
    } catch (err) {
      const res = err.response?.data;
      if (res?.code === "PARTICIPANT_PENDING_PAYMENT" && res?.error) {
        handlePendingPaymentResponse(res.error);
        return;
      }
      setErrorForm(res || null);
      toast.error(res?.message || "Registration failed!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitGroup = async ({ leader, groupName, groupMembers }) => {
    if (!selectedTicket) {
      toast.error("Please select a ticket before continuing.");
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        ticketId: selectedTicket._id,
        couponCode: couponCode || null,
        referralCode: referralCode || null,
        groupName: groupName?.trim(),
        groupLeader: {
          ...leader,
          dynamicFields: normalizeDynamicFields(leader),
        },
        groupMembers: groupMembers.map((m) => ({
          ...m,
          dynamicFields: normalizeDynamicFields(m),
        })),
      };

      const res = await api.post(`/event/${slug}/register`, payload);
      const { code, data } = res.data;

      await handleRegistrationResponse(code, data);
    } catch (err) {
      const res = err.response?.data.error;
      if (res?.code === "PARTICIPANT_PENDING_PAYMENT" && res?.details?.payment) {
        handlePendingPaymentResponse(res.details);
        return;
      }
      setErrorForm(res || null);
      toast.error(res?.message || "Registration failed!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetryPayment = async () => {
    setSubmitting(true);
    try {
      const result = await processPayment(pendingPayment, participant);
      if (!result) {
        setSubmitting(false);
      }
    } catch {
      toast.error("Retry payment failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const originalPrice = selectedTicket?.price || 0;
  const finalPrice = couponFinalPrice || originalPrice;

  if (loadingRegistrationForm) {
    return (
      <div className="flex items-center justify-center h-dvh bg-background">
        <SpinnerCustom className="text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <ErrorCard
          error={error}
          onRetry={() => router.reload()}
          onBrowseEvents={() => router.push("/events")}
          onGoHome={() => router.push("/")}
          className="w-full max-w-5xl mx-auto"
        />
      </div>
    );
  }

  if (errorForm) {
    return (
      <div className="h-full flex items-center justify-center">
        <ErrorCard
          error={errorForm}
          onRetry={() => window.location.reload()}
          onBrowseEvents={() => router.push("/events")}
          onGoHome={() => router.push("/")}
          className="w-full max-w-5xl mx-auto"
        />
      </div>
    );
  }

  if (!registrationForm && !loadingRegistrationForm) {
    return null;
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <RegistrationBanner
        bannerImage={registrationForm?.eventDetails?.bannerImage}
        title={registrationForm?.eventDetails?.title}
        onBack={() => router.back()}
      />

      {showPendingDialog && participant && pendingPayment && (
        <PendingPaymentDialog
          participant={participant}
          pendingPayment={pendingPayment}
          eventTitle={registrationForm?.eventDetails?.title}
          submitting={submitting}
          onPayNow={handleRetryPayment}
          onStartOver={resetPendingDialog}
        />
      )}

      {paymentStatus === "success" && (participant || pendingPayment) && (
        <SuccessMessage
          participant={participant}
          confirmationMsg={confirmationMsg}
          onGoToEvents={() => router.push("/events")}
          onGoHome={() => router.push("/")}
        />
      )}

      {paymentStatus === "failed" && (
        <FailureMessage
          confirmationMsg={confirmationMsg}
          onTryAgain={() => window.location.reload()}
        />
      )}

      {!paymentStatus && !showPendingDialog && (
        <RegistrationForm
          registrationForm={registrationForm}
          selectedTicket={selectedTicket}
          setSelectedTicket={setSelectedTicket}
          formData={formData}
          setFormData={setFormData}
          groupName={groupName}
          setGroupName={setGroupName}
          submitting={submitting}
          onSubmitSingle={handleSubmitSingle}
          onSubmitGroup={handleSubmitGroup}
          slug={slug}
          onCouponChange={handleCouponChange}
          couponDiscount={couponDiscount}
          originalPrice={originalPrice}
          finalPrice={finalPrice}
        />
      )}
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useEventStore from "@/store/eventStore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconArrowLeft } from "@tabler/icons-react";
import api from "@/lib/api";
import openRazorpay from "@/lib/openRazorpay";
import DynamicField from "../../components/DynamicField";
import GroupMultiStepForm from "../../components/GroupMultiStepForm";
import CouponInput from "../../components/CouponInput";
import { SpinnerCustom } from "@/components/ui/spinner";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import TicketCardSelectable from "../../components/TicketCardSelectable";
import confetti from "canvas-confetti";

export default function RegistrationPage() {
  const { slug } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("ref") || null;
  // include coupon-related store values
  const { fetchRegistrationForm, registrationForm, verifyCouponCode, couponData, verifyingCoupon, couponFinalPrice, couponDiscount, clearCoupon} = useEventStore();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [formData, setFormData] = useState({});
  const [groupName, setGroupName] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [participant, setParticipant] = useState(null);
  const [confirmationMsg, setConfirmationMsg] = useState("");
  const [pendingPayment, setPendingPayment] = useState(null);
  const [showPendingDialog, setShowPendingDialog] = useState(false);
  //read ticket id from url param and set selected ticket
  const ticketIdFromUrl = searchParams.get("ticketId") || null;

  //select ticket if ticketIdFromUrl is present and registrationForm is loaded 
  useEffect(() => {
    if (registrationForm?.tickets && ticketIdFromUrl) {
      const ticket = registrationForm.tickets.find((t) => t._id == ticketIdFromUrl);
      if (ticket) setSelectedTicket(ticket);
    }
  }, [registrationForm, ticketIdFromUrl]);

  useEffect(() => {
    if (slug) fetchRegistrationForm(slug);
  }, [slug]);

  // 🎉 Confetti animation on success
  useEffect(() => {
    if (paymentStatus === "success") {
      const colors = ["#A786FF", "#FD8BBC", "#FF9B64", "#FFD66B", "#7A5CFF", "#26C485"];
      const end = Date.now() + 3 * 1000;
      const frame = () => {
        if (Date.now() > end) return;
        confetti({ particleCount: 3, angle: 60, spread: 55, startVelocity: 60, origin: { x: 0, y: 0.5 }, colors });
        confetti({ particleCount: 3, angle: 120, spread: 55, startVelocity: 60, origin: { x: 1, y: 0.5 }, colors });
        requestAnimationFrame(frame);
      };
      frame();
      return () => cancelAnimationFrame(frame);
    }
  }, [paymentStatus]);

  const isLoading = !registrationForm;
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <SpinnerCustom className="text-primary" />
      </div>
    );
  }

  const allFields = [
    ...(registrationForm?.defaultFields || []),
    ...(registrationForm?.customFields || []),
  ];

  const normalizeDynamicFields = (fields) => {
    const out = {};
    for (const [key, val] of Object.entries(fields || {})) {
      out[key] = Array.isArray(val) ? val.join(", ") : val ?? "";
    }
    return out;
  };

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

  // 🧩 handle pending states
  const handlePendingPaymentResponse = (participantData) => {
    if (!participantData) {
      toast.error("Unable to load your pending registration. Please try again.");
      return false;
    }
    const payment = participantData.payment;
    if (payment && (payment.status === "pending" || payment.status === "failed")) {
      setParticipant(participantData);
      setPendingPayment(payment);
      setShowPendingDialog(true);
      return true;
    }
    return false;
  };

  // -------- INDIVIDUAL Submit ----------
  const handleSubmitSingle = async () => {
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
      const { code, data } = res.data;
      const { participant: part, payment } = data || {};

      if (code === "PAYMENT_PENDING") {
        setParticipant(part);
        setPendingPayment(payment);
        setShowPendingDialog(true);
        return;
      }

      if (code === "PAYMENT_REQUIRED" && payment) {
        const payRes = await openRazorpay(payment, part?.name, part?.email);
        if (payRes.status === "cancelled") {
          toast.info("Payment cancelled by user.");
          return;
        }
        const verifyRes = await api.post(`/payment/status`, payRes);
        if (verifyRes.data.success) {
          setPaymentStatus("success");
          setConfirmationMsg(verifyRes.data.message);
          setParticipant(part);
          setShowPendingDialog(false);
        } else {
          setPaymentStatus("failed");
          setConfirmationMsg(verifyRes.data.message || "Payment failed.");
        }
      } else {
        setPaymentStatus("success");
        setConfirmationMsg("Registration successful!");
        setParticipant(part);
        setShowPendingDialog(false);
      }
    } catch (err) {
      const res = err.response?.data;
      if (res?.code === "PARTICIPANT_PENDING_PAYMENT" && res?.error) {
        handlePendingPaymentResponse(res.error);
        return;
      }
      if (res?.code === "PARTICIPANT_CONFIRMED" || res?.code === "ALREADY_REGISTERED") {
        toast.success("You are already registered!");
        return;
      }
      toast.error(res?.message || "Registration failed!");
    } finally {
      setSubmitting(false);
    }
  };

  // -------- GROUP Submit ----------
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
      const { participant: part, payment } = data || {};

      if (code === "PAYMENT_PENDING") {
        setParticipant(part);
        setPendingPayment(payment);
        setShowPendingDialog(true);
        return;
      }

      if (code === "PAYMENT_REQUIRED" && payment) {
        const payRes = await openRazorpay(payment, part?.name, part?.email);
        if (payRes.status === "cancelled") {
          toast.info("Payment cancelled by user.");
          return;
        }
        const verifyRes = await api.post(`/payment/status`, payRes);
        if (verifyRes.data.success) {
          setPaymentStatus("success");
          setConfirmationMsg(verifyRes.data.message);
          setParticipant(part);
          setShowPendingDialog(false);
        } else {
          setPaymentStatus("failed");
          setConfirmationMsg(verifyRes.data.message || "Payment failed.");
        }
      } else {
        setPaymentStatus("success");
        setConfirmationMsg("Registration successful!");
        setParticipant(part);
        setShowPendingDialog(false);
      }
    } catch (err) {
      const res = err.response?.data;
      if (res?.code === "PARTICIPANT_PENDING_PAYMENT" && res?.error) {
        handlePendingPaymentResponse(res.error);
        return;
      }
      if (res?.code === "PARTICIPANT_CONFIRMED" || res?.code === "ALREADY_REGISTERED") {
        toast.success("You are already registered!");
        return;
      }
      toast.error(res?.message || "Registration failed!");
    } finally {
      setSubmitting(false);
    }
  };

  // Final ticket price after coupon
  const originalPrice = selectedTicket?.price || 0;
  const finalPrice = couponFinalPrice || originalPrice;

  // ---------- RENDER ----------
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Banner */}
      {registrationForm?.eventDetails?.bannerImage && (
        <div className="relative w-full h-48 sm:h-72 rounded-2xl overflow-hidden shadow-lg border border-border">
          <Image
            src={registrationForm.eventDetails.bannerImage}
            alt={registrationForm.eventDetails.title}
            fill
            className="object-cover"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="absolute top-4 left-4 flex items-center gap-2 rounded-lg backdrop-blur-sm bg-background/30 text-white border border-white/40 hover:bg-background/50"
          >
            <IconArrowLeft size={16} /> Back
          </Button>
        </div>
      )}

      {/* 🟡 Pending Payment Dialog */}
      {showPendingDialog && participant && pendingPayment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 animate-fadeIn">
          <div className="bg-card text-card-foreground rounded-xl shadow-xl p-6 w-full max-w-lg space-y-4 border border-border">
            <h2 className="text-xl font-bold text-primary text-center">
              Pending Registration
            </h2>
            <p className="text-center text-muted-foreground">
              You have a pending payment of ₹{(pendingPayment.amount / 100).toFixed(2)} for
              <b> {registrationForm?.eventDetails?.title}</b>.
            </p>

            <div className="flex gap-4 justify-center pt-4">
              <Button
                onClick={async () => {
                  setSubmitting(true);
                  try {
                    const payRes = await openRazorpay(
                      pendingPayment,
                      participant.name,
                      participant.email
                    );
                    if (payRes.status === "cancelled") {
                      toast.info("Payment cancelled by user.");
                      return;
                    }
                    const verifyRes = await api.post(`/payment/status`, payRes);
                    if (verifyRes.data.success) {
                      setPaymentStatus("success");
                      setConfirmationMsg(verifyRes.data.message);
                      setShowPendingDialog(false);
                    } else {
                      setPaymentStatus("failed");
                      setConfirmationMsg("Payment failed again.");
                      setShowPendingDialog(false);
                    }
                  } catch {
                    toast.error("Retry payment failed. Please try again.");
                  } finally {
                    setSubmitting(false);
                  }
                }}
                disabled={submitting}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 rounded-full"
              >
                {submitting ? "Processing..." : "Pay Now"}
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setShowPendingDialog(false);
                  setPaymentStatus(null);
                  setParticipant(null);
                  setPendingPayment(null);
                }}
              >
                Start Over
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ SUCCESS */}
      {paymentStatus === "success" && ( participant || pendingPayment ) && (
        <div className="flex items-center justify-center bg-card rounded-2xl p-8 border border-border shadow-md text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center shadow-md border border-success/20">
              <CheckCircledIcon className="text-success w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-success">
              Registration Successful!
            </h2>
            <p className="text-foreground">
              🎉 Thank you <strong>{participant.name}</strong> for registering.
            </p>
            <p className="text-muted-foreground">
              A confirmation email has been sent to <strong>{participant.email}</strong>.
            </p>

            {confirmationMsg && (
              <div className="mt-2 w-full p-4 bg-success/10 border border-success/30 rounded-lg">
                <p className="text-success">{confirmationMsg}</p>
              </div>
            )}
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              <Button
                onClick={() => router.push("/events")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 rounded-full"
              >
                Go to Events
              </Button>
              <Button
                onClick={() => router.push("/")}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 rounded-full"
              >
                Home
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ❌ FAILED */}
      {paymentStatus === "failed" && (
        <div className="min-h-[50vh] flex items-center justify-center bg-muted rounded-xl p-6">
          <div className="bg-card border border-border rounded-xl shadow-md p-8 space-y-4 text-center">
            <h2 className="text-2xl font-bold text-destructive">Payment Failed</h2>
            <p className="text-muted-foreground">
              {confirmationMsg || "Your payment was not completed."}
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 rounded-full"
            >
              Try Again
            </Button>
          </div>
        </div>
      )}

      {/* 📝 FORM */}
      {!paymentStatus && !showPendingDialog && (
        <Card className="shadow-md border border-border rounded-xl bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold">
              {registrationForm?.eventDetails?.title || "Register"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {registrationForm?.tickets?.map((t) => (
                <TicketCardSelectable
                  key={t._id}
                  ticketName={t.type}
                  price={t.price}
                  soldOut={t.soldOut}
                  selected={selectedTicket?._id === t._id}
                  onClick={() => {
                    setSelectedTicket(t);
                    clearCoupon();
                  }}
                />
              ))}
            </div>

            {/* INDIVIDUAL FORM */}
            {!selectedTicket || !selectedTicket.isGroupTicket ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitSingle();
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {allFields.map((f) => (
                    <DynamicField
                      key={f.name}
                      field={f}
                      value={formData[f.name] || ""}
                      onChange={(name, val) =>
                        setFormData((prev) => ({ ...prev, [name]: val }))
                      }
                    />
                  ))}
                </div>

                {/* Coupon Input */}
                {registrationForm?.allowCoupons && (
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
                          `Coupon applied! ₹${discountAmount} off your ticket`
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
                )}

                {/* Dynamic Button Label */}
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {submitting
                    ? "Submitting..."
                    : couponDiscount > 0
                    ? `Pay ₹${originalPrice} → ₹${finalPrice} after coupon`
                    : `Submit & Pay ₹${originalPrice}`}
                </Button>
              </form>
            ) : (
              <GroupMultiStepForm
                allFields={allFields}
                groupSettings={selectedTicket.groupSettings}
                leaderData={formData}
                groupName={groupName}
                setGroupName={setGroupName}
                onSubmit={handleSubmitGroup}
                slug={slug}
                selectedTicket={selectedTicket}
                setCouponCode={setCouponCode}
              />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
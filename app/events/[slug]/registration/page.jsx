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
import CouponInput from "../../components/couponInput";
import { SpinnerCustom } from "@/components/ui/spinner";
import Confetti from "react-confetti-boom";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import TicketCardSelectable from "../../components/TicketCardSelectable";
import confetti from "canvas-confetti";


//// Registration Page Component ////
export default function RegistrationPage() {
  const { slug } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("ref") || null;
  const { fetchRegistrationForm, registrationForm } = useEventStore();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [formData, setFormData] = useState({});
  const [couponCode, setCouponCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  // New states for payment flow
  const [paymentStatus, setPaymentStatus] = useState(null); // null | "success" | "failed"
  const [participant, setParticipant] = useState(null);
  const [confirmationMsg, setConfirmationMsg] = useState("");

  useEffect(() => {
    if (slug) fetchRegistrationForm(slug);
  }, [slug]);

  // 🎉 Side-Cannon Confetti Effect on success
  useEffect(() => {
  if (paymentStatus === "success") {
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
    const end = Date.now() + 4 * 1000; // run for 3 seconds

    const frame = () => {
      if (Date.now() > end) return;

      // Left cannon
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors,
      });

      // Right cannon
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  }
}, [paymentStatus]);

  // Loader while fetching form
  const isLoading = !registrationForm;
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SpinnerCustom className=" text-primary" />
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

  // -------- Validation ----------
  const validateLeader = () => {
    for (const f of allFields) {
      if (f.required && !formData[f.name]) {
        toast.error(`${f.label} is required`);
        return false;
      }
    }
    return true;
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

      if (code === "PAYMENT_REQUIRED" && payment) {
        // open Razorpay
        const payRes = await openRazorpay(
          payment,
          part?.name || formData.name,
          part?.email || formData.email
        );

        // verify payment
        const verifyRes = await api.post(`/payment/status`, payRes);

        if (verifyRes.data.success) {
          setPaymentStatus("success");
          setConfirmationMsg(verifyRes.data.message);
          try {
            const partRes = await api.get(
              `/event/${slug}/registration/${verifyRes.data.participantId}`
            );
            setParticipant(partRes.data.participant);
          } catch {
            setParticipant(part);
          }
        } else {
          setPaymentStatus("failed");
          setConfirmationMsg(verifyRes.data.message || "Payment failed.");
        }
      } else {
        setPaymentStatus("success");
        setConfirmationMsg("Registration successful!");
        setParticipant(part);
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || "Registration failed!");
    } finally {
      setSubmitting(false);
    }
  };

  // -------- GROUP Submit ----------
  const handleSubmitGroup = async ({ leader, groupName, groupMembers }) => {
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

      if (code === "PAYMENT_REQUIRED" && payment) {
        const payRes = await openRazorpay(
          payment,
          part?.name || leader.name,
          part?.email || leader.email
        );

        const verifyRes = await api.post(`/payment/status`, payRes);

        if (verifyRes.data.success) {
          setPaymentStatus("success");
          setConfirmationMsg(verifyRes.data.message);
          try {
            const partRes = await api.get(
              `/event/${slug}/registration/${verifyRes.data.participantId}`
            );
            setParticipant(partRes.data.participant);
          } catch {
            setParticipant(part);
          }
        } else {
          setPaymentStatus("failed");
          setConfirmationMsg(verifyRes.data.message || "Payment failed.");
        }
      } else {
        setPaymentStatus("success");
        setConfirmationMsg("Registration successful!");
        setParticipant(part);
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || "Registration failed!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-8">
      {/* ---------- Banner ---------- */}
      {registrationForm?.eventDetails?.bannerImage && (
        <div className="relative w-full h-48 sm:h-72 rounded-2xl overflow-hidden shadow-md">
          <Image
            src={registrationForm.eventDetails.bannerImage}
            alt={registrationForm.eventDetails.title}
            fill
            className="object"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="absolute top-4 left-4 flex items-center gap-2 rounded-lg  bg-white/80 hover:bg-white backdrop-blur cursor-pointer"
          >
            <IconArrowLeft size={16} /> Back
          </Button>
        </div>
      )}

      {/* ---------- SUCCESS SCREEN ---------- */}
      {paymentStatus === "success" && participant && (
        <div className="flex items-center justify-center bg-card rounded-2xl">
          <div className="flex flex-col items-center justify-center p-1 space-y-2  w-full max-w-md">
            {/* Check-mark icon */}
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center shadow-lg">
              <CheckCircledIcon className="text-success w-16 h-16" />
            </div>

            <h2 className="text-2xl font-bold text-success">Registration Successful!</h2>

            <p className="text-gray-700">
              🎉 Thank you <strong>{participant.name}</strong> for registering.
            </p>

            <p className="text-gray-600 text-center">
              A confirmation email has been sent to <strong>{participant.email}</strong>.
            </p>

            {confirmationMsg && (
              <div className="mt-2 w-full p-4 bg-green-50 border border-success rounded-lg">
                <p className="text-primary">{confirmationMsg}</p>
              </div>
            )}

            <div className="flex gap-4 mt-1 w-full justify-center">
              <Button
                onClick={() => router.push("/events")}
                className="bg-primary text-white px-6 cursor-pointer"
              >
                Go to Events
              </Button>
              <Button
                onClick={() => router.push("/")}
                className="bg-secondary text-white px-6 cursor-pointer"
              >
                Home
              </Button>
            </div>
          </div>
        </div>
      )}


      {/* ---------- FAILURE SCREEN ---------- */}
        {paymentStatus === "failed" && (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="flex flex-col items-center justify-center p-6 space-y-6 bg-white rounded-xl shadow-lg w-full max-w-md text-center">
              <h2 className="text-2xl font-bold text-red-600">Payment Failed</h2>
              <p className="text-gray-700">
                {confirmationMsg || "Your payment was not completed."}
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-primary text-white px-6 cursor-pointer"
              >
                Retry Payment
              </Button>
            </div>
          </div>
        )}


      {/* ---------- REGISTRATION FORM ---------- */}
      {!paymentStatus && (
        <Card className="shadow-md border rounded-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold">
              {registrationForm?.eventDetails?.title || "Register"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* ---------- Ticket Selector ---------- */}
            {/* <div>
              <Label className="block mb-3 font-semibold text-lg">
                Choose Your Ticket
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {registrationForm?.tickets?.map((t) => (
                  <div
                    key={t._id}
                    onClick={() => setSelectedTicket(t)}
                    className={`cursor-pointer rounded-xl border p-4 shadow-sm transition-all hover:shadow-md ${
                      selectedTicket?._id === t._id
                        ? "border-primary bg-primary/5"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{t.type}</span>
                      <span className="font-semibold text-primary">
                        ₹{t.price}
                      </span>
                    </div>
                    {t.soldOut && (
                      <p className="text-red-500 text-sm mt-1">Sold Out</p>
                    )}
                  </div>
                ))}
              </div>
            </div> */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {registrationForm?.tickets?.map((t) => (
                <TicketCardSelectable
                  key={t._id}
                  ticketName={t.type}
                  price={t.price}
                  soldOut={t.soldOut}
                  selected={selectedTicket?._id === t._id}
                  onClick={() => setSelectedTicket(t)}
                />
              ))}
            </div>

            {/* ---------- INDIVIDUAL FLOW ---------- */}
            {(!selectedTicket || !selectedTicket.isGroupTicket) && (
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

                {/* Coupon code */}
                {registrationForm?.allowCoupons && (
                  <CouponInput
                    onApply={(code) => setCouponCode(code)}
                    className="max-w-sm"
                  />
                )}

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full"
                >
                  {submitting ? "Submitting..." : "Submit & Pay"}
                </Button>
              </form>
            )}

            {/* ---------- GROUP FLOW ---------- */}
            {selectedTicket?.isGroupTicket && (
              <GroupMultiStepForm
                allFields={allFields}
                groupSettings={selectedTicket.groupSettings}
                leaderData={formData}
                onSubmit={handleSubmitGroup}
              />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

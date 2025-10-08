"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useEventStore from "@/store/eventStore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { IconArrowLeft } from "@tabler/icons-react";
import api from "@/lib/api";
import openRazorpay from "@/lib/openRazorpay";
import DynamicField from "../../components/DynamicField";
import GroupMultiStepForm from "../../components/GroupMultiStepForm";
import CouponInput from "../../components/couponInput";
import { SpinnerCustom } from "@/components/ui/spinner";



// Registration Page Component
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

  useEffect(() => {
    if (slug) fetchRegistrationForm(slug);
  }, [slug]);

  //loader while fetching form using spinner from shadcn
  const isLoading = !registrationForm; // shows spinner until form is loaded
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

  // ----------- Validation ----------
  const validateLeader = () => {
    for (const f of allFields) {
      if (f.required && !formData[f.name]) {
        toast.error(`${f.label} is required`);
        return false;
      }
    }
    return true;
  };

  // ----------- Individual Submit ----------
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
      const { participant, payment } = data || {};

      if (code === "PAYMENT_REQUIRED" && payment) {
        const payRes = await openRazorpay(
          payment,
          participant?.name || formData.name,
          participant?.email || formData.email
        );
        await api.post(`/payment/status`, payRes);
        router.push(
          `/events/${slug}/success?paymentId=${payRes.razorpay_payment_id
          }&name=${encodeURIComponent(
            participant?.name || formData.name
          )}&email=${encodeURIComponent(
            participant?.email || formData.email
          )}&slug=${slug}`
        );
      } else {
        toast.success("Registration successful!");
        router.push(
          `/events/${slug}/success?name=${encodeURIComponent(
            formData.name
          )}&email=${encodeURIComponent(formData.email)}&slug=${slug}`
        );
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || "Registration failed!");
    } finally {
      setSubmitting(false);
    }
  };

  // ----------- Group Submit ----------
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
      const { participant, payment } = data || {};

      if (code === "PAYMENT_REQUIRED" && payment) {
        const payRes = await openRazorpay(
          payment,
          participant?.name || leader.name,
          participant?.email || leader.email
        );
        await api.post(`/payment/status`, payRes);
        router.push(
          `/events/${slug}/success?paymentId=${payRes.razorpay_payment_id
          }&name=${encodeURIComponent(
            participant?.name || leader.name
          )}&email=${encodeURIComponent(leader.email)}&slug=${slug}`
        );
      } else {
        toast.success("Registration successful!");
        router.push(
          `/events/${slug}/success?name=${encodeURIComponent(
            leader.name
          )}&email=${encodeURIComponent(leader.email)}&slug=${slug}`
        );
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
        <div className="relative w-full h-72 rounded-2xl overflow-hidden shadow-md">
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
            className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-white/80 hover:bg-white backdrop-blur cursor-pointer"
          >
            <IconArrowLeft size={16} /> Back
          </Button>
        </div>
      )}

      {/* ---------- Registration Card ---------- */}
      <Card className="shadow-md border rounded-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            {registrationForm?.eventDetails?.title || "Register"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* ---------- Ticket Selector ---------- */}
          <div>
            <Label className="block mb-3 font-semibold text-lg">
              Choose Your Ticket
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {registrationForm?.tickets?.map((t) => (
                <div
                  key={t._id}
                  onClick={() => setSelectedTicket(t)}
                  className={`cursor-pointer rounded-xl border p-4 shadow-sm transition-all hover:shadow-md ${selectedTicket?._id === t._id
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

              {/* couupon code  */}
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
              groupName={formData.groupName || ""}
              setGroupName={(name) =>
                setFormData((prev) => ({ ...prev, groupName: name }))
              }
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

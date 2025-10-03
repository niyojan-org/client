"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useEventStore from "@/store/eventStore";
import { toast } from "sonner";
import DynamicField from "../../components/DynamicField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import api from "@/lib/api";
import openRazorpay from "@/lib/openRazorpay";
import { IconArrowLeft } from "@tabler/icons-react";

export default function RegistrationPage() {
  const { slug } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("ref") || null;

  const { fetchRegistrationForm, registrationForm } = useEventStore();
  const [formData, setFormData] = useState({});
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (slug) fetchRegistrationForm(slug);
  }, [slug]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const allFields = [
    ...(registrationForm?.defaultFields || []),
    ...(registrationForm?.customFields || []),
  ];

  const applyCoupon = () => {
    if (couponCode === "WELCOME20") {
      setDiscount(20);
      toast.success("Coupon applied! 20% discount");
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTicket) return toast.error("Please select a ticket");

    for (const field of allFields) {
      if (field.required && !formData[field.name]) {
        return toast.error(`${field.label} is required`);
      }
    }

    try {
      setSubmitting(true);

      const dynamicFields = {};
      allFields.forEach((field) => {
        let value = formData[field.name] || "";
        if (Array.isArray(value)) value = value.join(", ");
        dynamicFields[field.name] = value;
      });

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        ticketId: selectedTicket._id,
        dynamicFields,
        coupon: couponCode || null,
        referralCode: referralCode || null,
      };

      const res = await api.post(`/event/${slug}/register`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      const { code} = res.data;
      const {participant, payment} = res.data.data;
      console.log(code);
      console.log(payment);

      if (code === "PAYMENT_REQUIRED" && payment) {
        const paymentRes = await openRazorpay(
          payment,
          participant.name,
          participant.email
        );

        await api.post(`/payment/status`, {
          orderId: payment.razorpayOrderId,
          paymentId: paymentRes.razorpay_payment_id,
          signature: paymentRes.razorpay_signature,
          participantId: participant._id,
        });

        router.push(
          `/events/${slug}/success?paymentId=${paymentRes.razorpay_payment_id}&name=${participant.name}&email=${participant.email}&slug=${slug}`
        );
      } else {
        toast.success("Registration successful!");
        router.push(
          `/events/${slug}/success?name=${participant.name}&email=${participant.email}&slug=${slug}`
        );
      }
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error(err.response?.data?.message || "Registration failed!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Event Banner */}
      {registrationForm?.eventDetails?.bannerImage && (
        <div className="relative w-full h-80 rounded-2xl shadow-md overflow-hidden">
          <Image
            src={registrationForm.eventDetails.bannerImage}
            alt={registrationForm.eventDetails.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* back button  */}
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="mb-4 cursor-pointer flex items-center gap-2"
      >
        <IconArrowLeft size={16} /> Back
      </Button>

      <Card className="py-6 space-y-6">
        <CardHeader>
          <CardTitle className="font-bold text-center text-xl">
            {registrationForm?.eventDetails?.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* All fields in two-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allFields.map((field) => (
                <DynamicField
                  key={field.name}
                  field={field}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              ))}
            </div>

            {/* Ticket Selection: two per row on desktop, full width on mobile */}
            <div>
              <Label className="mb-2 block font-semibold">Choose Ticket</Label>
              <div className="flex flex-wrap gap-4 justify-center">
                {registrationForm?.tickets?.map((ticket) => (
                  <div
                    key={ticket._id}
                    onClick={() => !ticket.soldOut && setSelectedTicket(ticket)}
                    className={`flex items-center justify-between p-4 border rounded cursor-pointer transition-all hover:shadow-md w-[90%] sm:w-[48%] md:w-[48%] lg:w-auto ${
                      selectedTicket?._id === ticket._id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    {/* Placeholder for future SVG */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        🎫
                      </div>
                      <span>{ticket.type}</span>
                    </div>
                    <span className="font-medium">₹{ticket.price}</span>
                    {ticket.soldOut && (
                      <span className="ml-2 text-red-500">Sold Out</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Coupon */}
            <div className="space-y-2">
              <Label className="font-semibold">Coupon Code</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={applyCoupon}
                  className="cursor-pointer"
                >
                  Apply
                </Button>
              </div>
              {discount > 0 && (
                <p className="text-green-600">Applied: {discount}% discount</p>
              )}
            </div>

            {referralCode && (
              <p className="text-sm text-gray-600">
                Referral Code Applied:{" "}
                <span className="font-medium">{referralCode}</span>
              </p>
            )}

            <Button
              type="submit"
              disabled={submitting}
              className="w-full cursor-pointer"
            >
              {submitting ? "Submitting..." : "Submit & Pay"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { SpinnerCustom } from "@/components/ui/spinner";
import api from "@/lib/api";
import ErrorCard from "@/components/Card/Error";
import RegistrationBanner from "./components/RegistrationBanner";
import RegistrationForm from "./components/RegistrationForm";
import useEventRegistrationStore from "@/store/eventRegistration";
import Payment from "./components/Payment";
import RegistrationSuccess from "./components/Success";

export default function RegistrationPage() {
  const { slug } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("ref") || null;
  const ticketIdFromUrl = searchParams.get("ticket") || null;

  // const { fetchRegistrationForm, registrationForm, error, loadingRegistrationForm } =
  //   useEventStore();

  const {
    fetchRegistrationForm,
    registrationForm,
    error,
    regFormLoading,
    isPaymentRequired,
    resData,
    successData,
    selectTicket,
  } = useEventRegistrationStore();

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [formData, setFormData] = useState({});
  const [groupName, setGroupName] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  useEffect(() => {
    if (slug) fetchRegistrationForm(slug);
  }, [slug]);

  useEffect(() => {
    if (registrationForm?.tickets && ticketIdFromUrl) {
      selectTicket(ticketIdFromUrl);
    }
  }, [registrationForm, ticketIdFromUrl]);

  useEffect(() => {
    // Clean up URL parameters after they've been processed
    if (ticketIdFromUrl || searchParams.get("coupon")) {
      const params = new URLSearchParams(searchParams.toString());
      let shouldUpdate = false;

      if (ticketIdFromUrl && registrationForm?.tickets) {
        params.delete("ticket");
        shouldUpdate = true;
      }

      if (shouldUpdate) {
        const newUrl = params.toString()
          ? `${window.location.pathname}?${params.toString()}`
          : window.location.pathname;
        router.replace(newUrl, { shallow: true });
      }
    }
  }, [registrationForm, ticketIdFromUrl, searchParams]);

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

  const originalPrice = selectedTicket?.price || 0;

  if (regFormLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-background">
        <SpinnerCustom className="text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <ErrorCard
          error={error}
          onRetry={() => window.location.reload()}
          onBrowseEvents={() => router.push("/events")}
          onGoHome={() => router.push("/")}
          className="w-full max-w-5xl mx-auto"
        />
      </div>
    );
  }

  if (isPaymentRequired && resData) {
    return <Payment paymentData={resData} />;
  }

  if (successData) {
    console.log(successData);
    return <RegistrationSuccess data={successData} />;
  }

  if (registrationForm) {
    return (
      <div>
        <RegistrationBanner
          bannerImage={
            registrationForm?.eventDetails?.bannerImage || "/banner/default-event-banner.png"
          }
          title={registrationForm?.eventDetails?.title}
          onBack={() => router.back()}
        />
        <RegistrationForm
          registrationForm={registrationForm}
          selectedTicket={selectedTicket}
          setSelectedTicket={setSelectedTicket}
          formData={formData}
          setFormData={setFormData}
          groupName={groupName}
          setGroupName={setGroupName}
          slug={slug}
          onCouponChange={handleCouponChange}
          couponDiscount={couponDiscount}
          originalPrice={originalPrice}
        />
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center">
      <ErrorCard
        error={error}
        onRetry={() => window.location.reload()}
        onBrowseEvents={() => router.push("/events")}
        onGoHome={() => router.push("/")}
        className="w-full max-w-5xl mx-auto"
      />
    </div>
  );
}

"use client";
import React, { useState } from "react";
import { IconCreditCard, IconWallet } from "@tabler/icons-react";
import EventHeader from "./payment/EventHeader";
import PaymentGatewaySelection from "./payment/PaymentGatewaySelection";
import OrderSummary from "./payment/OrderSummary";
import api from "@/lib/api";
import { toast } from "sonner";
import Cashfree from "./payment/cashfree";
import useEventRegistrationStore from "@/store/eventRegistration";
import PaymentVerificationLoading from "./PaymentVerificationLoading";

function Payment({ paymentData }) {
  // Detect if this is a group registration
  const isGroupRegistration = paymentData.participants && Array.isArray(paymentData.participants);

  // For group registration, find the leader participant
  const participant = isGroupRegistration
    ? paymentData.participants.find(p => p.isGroupLeader) || paymentData.participants[0]
    : paymentData.participant;

  // For group registration, we need to pass groupId for payment
  const participantId = isGroupRegistration
    ? participant._id
    : paymentData.participant._id;

  const gateways = [
    {
      id: "razorpay",
      name: "Razorpay",
      description: "Cards, UPI, Net Banking, Wallets",
      icon: IconCreditCard,
      available: paymentData.payment.availablePaymentGateways.razorpay,
      features: ["Instant", "Secure", "Multiple Options"],
    },
    {
      id: "cashfree",
      name: "Cashfree",
      description: "UPI, Cards, Net Banking",
      icon: IconWallet,
      available: paymentData.payment.availablePaymentGateways.cashfree,
      features: ["Quick", "Trusted"],
    },
  ];

  const { setSuccessData } = useEventRegistrationStore();

  // Auto-select first available payment gateway
  const [selectedGateway, setSelectedGateway] = useState(() => {
    const firstAvailable = gateways.find((gateway) => gateway.available);
    return firstAvailable ? firstAvailable.id : null;
  });
  const [loading, setLoading] = useState(false);
  const handlePayment = async () => {
    if (!selectedGateway) {
      alert("Please select a payment gateway");
      return;
    }
    try {
      const paymentPayload = {
        gateway: selectedGateway,
        orderId: paymentData.payment.orderId,
        participantId: participantId,
      };

      // Add groupId if this is a group registration
      if (isGroupRegistration && paymentData.groupId) {
        paymentPayload.groupId = paymentData.groupId;
      }

      const res = await api.post(`/payment/event/order`, paymentPayload);

      if (res.data.success && selectedGateway === "cashfree") {
        const paymentSessionId = res.data.data?.payment_session_id;

        if (!paymentSessionId) {
          toast.error("Payment session ID not received from server");
          return;
        }
        const result = await Cashfree({ paymentSessionId });
        if (result) {
          // Verify the payment with backend
          try {
            setLoading(true);
            const verifyRes = await api.get(`/payment/event/order/verify/cashfree`, {
              params: {
                orderId: paymentData.payment.orderId,
              },
            });

            if (verifyRes.data.success) {
              toast.success("Payment completed successfully!", {
                description:
                  verifyRes.data.message || "You will receive a confirmation email shortly.",
              });
              // Pass the full response data which contains participant, event, etc.
              setSuccessData(verifyRes.data);
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error(
              error.response?.data?.message || "Failed to verify payment. Please contact support."
            );
          }finally{
            setLoading(false);
          }
        } else {
          toast.error("Payment was not completed");
        }
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast.error(
        error.response?.data?.message || "Failed to initiate payment. Please try again.",
        {
          description: error.response?.data?.error?.details || "",
        }
      );
    }
  };

  const formatAmount = (amountInPaise) => {
    return `₹${(amountInPaise / 100).toFixed(2)}`;
  };

  if (!paymentData) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <PaymentVerificationLoading />;
  }

  return (
    <div className="h-full overflow-hidden flex items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col h-full pb-6 sm:pb-10">
        {/* Event Header */}
        <EventHeader event={paymentData.event} />

        {/* Main Content Area - Scrollable on overflow */}
        <div className="flex-1 grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 overflow-auto">
          {/* Payment Gateway Selection */}
          <div className="lg:col-span-2 h-full hidden sm:block">
            <PaymentGatewaySelection
              gateways={gateways}
              selectedGateway={selectedGateway}
              onSelectGateway={setSelectedGateway}
            />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 h-full">
            <OrderSummary
              participant={participant}
              priceSummary={paymentData.priceSummary}
              orderId={paymentData.payment.orderId}
              selectedGateway={selectedGateway}
              onPayment={handlePayment}
              formatAmount={formatAmount}
              gateways={gateways}
              onSelectGateway={setSelectedGateway}
              isGroupRegistration={isGroupRegistration}
              groupInfo={isGroupRegistration ? {
                groupId: paymentData.groupId,
                groupName: participant.groupInfo?.groupName,
                totalMembers: paymentData.participants?.length || participant.groupInfo?.totalMembers
              } : null}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

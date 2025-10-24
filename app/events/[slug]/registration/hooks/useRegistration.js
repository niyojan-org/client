import { useState } from "react";
import { toast } from "sonner";
import api from "@/lib/api";
import openRazorpay from "@/lib/openRazorpay";

export function useRegistration() {
  const [submitting, setSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [participant, setParticipant] = useState(null);
  const [confirmationMsg, setConfirmationMsg] = useState("");
  const [pendingPayment, setPendingPayment] = useState(null);
  const [showPendingDialog, setShowPendingDialog] = useState(false);
  const [errorForm, setErrorForm] = useState(null);

  const normalizeDynamicFields = (fields) => {
    const out = {};
    for (const [key, val] of Object.entries(fields || {})) {
      out[key] = Array.isArray(val) ? val.join(", ") : val ?? "";
    }
    return out;
  };

  const handlePendingPaymentResponse = (details) => {
    if (!details?.payment) {
      toast.error("Unable to load your pending registration. Please try again.");
      return false;
    }

    if (details.payment && (details.payment.status === "pending" || details.payment.status === "failed")) {
      setParticipant(details.participant);
      setPendingPayment(details.payment);
      setShowPendingDialog(true);
      return true;
    }
    return false;
  };

  const processPayment = async (payment, participantData) => {
    const payRes = await openRazorpay(payment, participantData?.name, participantData?.email);
    
    if (payRes.status === "cancelled") {
      toast.info("Payment cancelled by user.");
      return null;
    }

    const verifyRes = await api.post(`/payment/status`, payRes);
    
    if (verifyRes.data.success) {
      setPaymentStatus("success");
      setConfirmationMsg(verifyRes.data.message);
      setParticipant(participantData);
      setShowPendingDialog(false);
      return "success";
    } else {
      setPaymentStatus("failed");
      setConfirmationMsg(verifyRes.data.message || "Payment failed.");
      return "failed";
    }
  };

  const handleRegistrationResponse = async (code, data, message, participant) => {
    const { participant: part, payment } = data || {};

    if (code === "PAYMENT_PENDING") {
      setParticipant(part);
      setPendingPayment(payment);
      setShowPendingDialog(true);
      return;
    }

    if (code === "PAYMENT_REQUIRED" && payment) {
      await processPayment(payment, part);
    } else {
      setPaymentStatus("success");
      setConfirmationMsg(message || "Registration successful!");
      setParticipant(part || participant);
      setShowPendingDialog(false);
    }
  };

  const resetPendingDialog = () => {
    setShowPendingDialog(false);
    setPaymentStatus(null);
    setParticipant(null);
    setPendingPayment(null);
  };

  return {
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
  };
}

"use client";
import React, { useEffect, useState } from "react";
import { IconCreditCard, IconWallet } from "@tabler/icons-react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { toast } from "sonner";
import useEventRegistrationStore from "@/store/eventRegistration";
import Cashfree from "../registration/components/payment/cashfree";
import PhonePe from "../registration/components/payment/phonePe";
import EventHeader from "../registration/components/payment/EventHeader";
import PaymentGatewaySelection from "../registration/components/payment/PaymentGatewaySelection";
import OrderSummary from "../registration/components/payment/OrderSummary";
import PaymentVerificationLoading from "../registration/components/PaymentVerificationLoading";
import RegistrationSuccess from "../registration/components/Success";
import ErrorCard from "@/components/Card/Error";
import { SpinnerCustom } from "@/components/ui/spinner";

function Payment() {
    const [paymentData, setPaymentData] = useState(null);
    const [selectedGateway, setSelectedGateway] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentSessionId, setCurrentSessionId] = useState(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const sessionId = searchParams.get("sessionId");
    const redirect = searchParams.get("redirect");
    const { setSuccessData, successData, resetSuccessData } = useEventRegistrationStore();

    // Reset state when sessionId changes or is missing
    useEffect(() => {
        if (sessionId !== currentSessionId) {
            setPaymentData(null);
            setSelectedGateway(null);
            setError(null);
            resetSuccessData();
            setCurrentSessionId(sessionId);
        }
    }, [sessionId, currentSessionId, resetSuccessData]);

    useEffect(() => {
        if (sessionId && redirect) {
            const fetchPaymentData = async () => {
                try {
                    const res = await api.get(`/events/external-checkout`, {
                        params: {
                            sessionId,
                        },
                    });
                    if (res.data.success) {
                        setPaymentData(res.data.data);
                        // Clean up URL after successfully receiving the data
                        // router.replace(window.location.pathname, { scroll: false });
                    } else {
                        toast.error("Failed to fetch payment data");
                        setError({ message: "Failed to fetch payment data" });
                    }
                } catch (error) {
                    toast.error(
                        error.response?.data?.message || "Error fetching payment data"
                    );
                    setError(error.response?.data || "Error fetching payment data");
                }
            };
            fetchPaymentData();
        }
    }, [sessionId, redirect]);

    // Auto-select first available payment gateway when payment data is loaded
    useEffect(() => {
        if (paymentData) {
            const gateways = [
                {
                    id: "razorpay",
                    available: paymentData.payment.availablePaymentGateways.razorpay,
                },
                {
                    id: 'phonepe',
                    available: paymentData.payment.availablePaymentGateways.phonepe,
                }
            ];
            const firstAvailable = gateways.find((gateway) => gateway.available);
            setSelectedGateway(firstAvailable ? firstAvailable.id : null);
        }
    }, [paymentData]);

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

    if (!sessionId || !redirect) {
        return (
            <div className="h-full flex items-center justify-center">
                <ErrorCard
                    error={{ message: "Invalid payment session. Missing session ID or redirection." }}
                    onRetry={() => window.location.reload()}
                    onBrowseEvents={() => router.push("/events")}
                    onGoHome={() => router.push("/")}
                    className="w-full max-w-5xl mx-auto"
                />
            </div>
        );
    }
    if (!paymentData) {
        return (
            <div className="h-full flex items-center justify-center">
                <SpinnerCustom />
            </div>
        )
    }
    

    // Detect if this is a group registration
    const isGroupRegistration = paymentData.participants && Array.isArray(paymentData.participants);
    const participant = isGroupRegistration
        ? paymentData.participants.find(p => p.isGroupLeader) || paymentData.participants[0]
        : paymentData.participant;

    // For group registration, we need to pass participantId for payment
    const participantId = isGroupRegistration
        ? participant?.id
        : paymentData.participant?.id;

    const gateways = [
        {
            id: "razorpay",
            name: "Razorpay",
            description: "Cards, UPI, Net Banking, Wallets",
            icon: IconCreditCard,
            available: paymentData.payment.availablePaymentGateways.razorpay,
            features: ["Instant", "Secure", "Multiple Options"],
        },
        // {
        //   id: "cashfree",
        //   name: "Cashfree",
        //   description: "UPI, Cards, Net Banking",
        //   icon: IconWallet,
        //   available: paymentData.payment.availablePaymentGateways.cashfree,
        //   features: ["Quick", "Trusted"],
        // },
        {
            id: 'phonepe',
            name: 'PhonePe',
            description: 'UPI, Wallets, Cards',
            icon: IconWallet,
            available: paymentData.payment.availablePaymentGateways.phonepe,
            features: ['Easy', 'Fast'],
        }
    ];
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
                    } finally {
                        setLoading(false);
                    }
                } else {
                    toast.error("Payment was not completed");
                }
            }

            if (res.data.success && selectedGateway === "phonepe") {
                const paymentUrl = res.data.data?.payment_url;

                if (!paymentUrl) {
                    toast.error("Payment URL not received from server");
                    return;
                }

                // Open PhonePe PayPage in IFrame mode
                const result = await PhonePe({
                    paymentUrl,
                    onSuccess: async () => {
                        // Payment concluded - verify with backend
                        try {
                            setLoading(true);
                            const verifyRes = await api.get(`/payment/event/order/verify/phonepe`, {
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
                        } finally {
                            setLoading(false);
                        }
                    },
                    onCancel: () => {
                        // User cancelled the payment
                        toast.info("Payment was cancelled");
                    },
                });

                if (!result) {
                    toast.error("Failed to open payment page");
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

    if (successData) {
        const redirectUrl = redirect ? `${redirect}?orderId=${paymentData.payment.orderId}` : null;
        return <RegistrationSuccess data={successData} redirect={redirectUrl} />;
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

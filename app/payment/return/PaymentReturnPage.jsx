"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SpinnerCustom } from "@/components/ui/spinner";
import { useConfetti } from "@/app/events/[slug]/registration/hooks/useConfetti";


export default function PaymentReturnPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("loading");  // loading | success | error | idle
  const [message, setMessage] = useState("");

  useConfetti(status === "success");

  const verifyPayment = async (orderId) => {
    try {
      setStatus("loading");
      const response = await api.post("/payment/cashfree/verify", {
        order_id: orderId,
      });

      if (response.data?.success) {
        setStatus("success");
        setMessage(response.data.message || "Payment verified successfully.");
      } else {
        setStatus("error");
        setMessage("Payment could not be verified. Please contact support.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Payment verification failed. Please try again or contact support.");
    }
  };

  useEffect(() => {
    const orderId = searchParams.get("order_id");
    if (orderId) {
      verifyPayment(orderId);
    }
  }, [searchParams]);

  console.log("All good")

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-card shadow-lg rounded-2xl p-8 max-w-md text-center border border-border">
        
        {status === "loading" && (
          <>
            <Clock className="w-16 h-16 text-yellow-500 mx-auto animate-pulse" />
            <h2 className="text-xl font-semibold mt-4">Confirming your payment...</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Please wait while we verify the payment with Cashfree.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />
            <h2 className="text-xl font-semibold mt-4">Payment Successful 🎉</h2>
            <p className="text-sm text-muted-foreground mt-2">{message}</p>

            <div className="mt-6 space-y-3">
              <Link href="/events">
                <Button className="w-full rounded-full">Back to Events</Button>
              </Link>

              {/* <Link href="/profile">
                <Button variant="outline" className="w-full rounded-full">
                  View Ticket
                </Button>
              </Link> */}
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="w-16 h-16 text-red-600 mx-auto" />
            <h2 className="text-xl font-semibold mt-4 text-red-600">Payment Failed ❌</h2>
            <p className="text-sm text-muted-foreground mt-2">{message}</p>

            <div className="mt-6 space-y-3">
              <Link href="/events">
                <Button variant="outline" className="w-full rounded-full">
                  Go Back
                </Button>
              </Link>
              <Button
                onClick={() => verifyPayment(searchParams.get("order_id"))}
                className="w-full rounded-full"
              >
                Retry Verification
              </Button>
            </div>
          </>
        )}

        {!status && (
            
          <p className="text-sm text-muted-foreground">Processing your request...   </p>
        )}
      </div>
    </div>
  );
}

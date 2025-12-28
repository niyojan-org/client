import useEventRegistrationStore from "@/store/eventRegistration";
import { load } from "@cashfreepayments/cashfree-js";
import { toast } from "sonner";

let cashfree;
var initializeSDK = async function () {
    cashfree = await load({
        // mode: "production",
        //TODO: Change the mode to production while deploying
        mode: "sandbox",
    });
};
initializeSDK();

const doPayment = async ({ paymentSessionId }) => {
    if (!cashfree) {
        toast.error("Payment SDK not initialized");
        return;
    }
    if (!paymentSessionId) {
        toast.error("Payment session ID is missing");
        return;
    }

    // Validate payment session ID format
    if (typeof paymentSessionId !== 'string' || paymentSessionId.trim() === '') {
        toast.error("Invalid payment session ID format");
        return;
    }
    let checkoutOptions = {
        paymentSessionId: paymentSessionId,
        redirectTarget: "_modal",
    };

    try {
        const result = await cashfree.checkout(checkoutOptions);
        if (result.error) {
            // This will be true whenever the user clicks on the close icon inside the modal or any error happens during the payment
            // console.log("User has closed the popup or there is some payment error, Check for Payment Status");
            console.error("Payment error:", result.error);
            toast.error(result.error.message || "Payment error occurred");
            return false;
        }
        if (result.paymentDetails) {
            return true;
        } else {
            toast.error("Payment failed. Please try again.");
            return false;
        }
    } catch (error) {
        console.error("Cashfree checkout error:", error);
        toast.error("Failed to initiate payment. Please try again.");
    }
};

export default async function Cashfree({ paymentSessionId }) {
    return await doPayment({ paymentSessionId });
}
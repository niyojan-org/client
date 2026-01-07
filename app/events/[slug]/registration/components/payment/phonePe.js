"use client";
import { toast } from "sonner";

/**
 * Initialize PhonePe Checkout Script
 * This function loads the PhonePe checkout script dynamically
 */
const initializePhonePeScript = () => {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (window.PhonePeCheckout) {
      resolve(true);
      return;
    }

    // Check if script tag already exists
    const existingScript = document.querySelector(
      'script[src*="phonepe.com/web/bundle/checkout.js"]'
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true));
      return;
    }

    // Create and append the script
    const script = document.createElement("script");
    script.src = "https://mercury.phonepe.com/web/bundle/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("PhonePe Checkout script loaded successfully");
      resolve(true);
    };
    script.onerror = () => {
      console.error("Failed to load PhonePe Checkout script");
      reject(new Error("Failed to load PhonePe Checkout script"));
    };
    document.head.appendChild(script);
  });
};

/**
 * Callback function for PhonePe payment
 * @param {string} response - Either 'USER_CANCEL' or 'CONCLUDED'
 * @param {Function} onSuccess - Callback when payment is concluded
 * @param {Function} onCancel - Callback when user cancels
 */
const createPaymentCallback = (onSuccess, onCancel) => {
  return function (response) {
    if (response === "USER_CANCEL") {
      console.log("User cancelled the payment");
      if (onCancel) onCancel();
      toast.info("Payment was cancelled");
      return;
    } else if (response === "CONCLUDED") {
      console.log("Payment concluded");
      if (onSuccess) onSuccess();
      return;
    }
  };
};

/**
 * Open PhonePe PayPage in IFrame mode
 * @param {Object} params
 * @param {string} params.tokenUrl - The redirect URL from Payment API response
 * @param {Function} params.onSuccess - Callback when payment is concluded
 * @param {Function} params.onCancel - Callback when user cancels
 * @returns {Promise<boolean>} - Returns true if payment was initiated successfully
 */
const openPhonePePayPage = async ({ tokenUrl, onSuccess, onCancel }) => {
  try {
    // Validate tokenUrl
    if (!tokenUrl || typeof tokenUrl !== "string" || tokenUrl.trim() === "") {
      toast.error("Invalid payment URL");
      return false;
    }

    // Initialize PhonePe script if not already loaded
    await initializePhonePeScript();

    // Check if PhonePeCheckout is available
    if (!window.PhonePeCheckout || !window.PhonePeCheckout.transact) {
      toast.error("PhonePe payment service is not available");
      return false;
    }

    // Create callback function
    const callback = createPaymentCallback(onSuccess, onCancel);

    // Open PayPage in IFrame mode
    window.PhonePeCheckout.transact({
      tokenUrl: tokenUrl,
      callback: callback,
      type: "IFRAME",
    });

    return true;
  } catch (error) {
    console.error("PhonePe payment error:", error);
    toast.error("Failed to initiate payment. Please try again.");
    return false;
  }
};

/**
 * Manually close PhonePe PayPage IFrame
 * Note: This is not recommended for standard use cases
 * IFrame will close automatically once payment is done
 */
const closePhonePePayPage = () => {
  if (window.PhonePeCheckout && window.PhonePeCheckout.closePage) {
    window.PhonePeCheckout.closePage();
  }
};

/**
 * Main PhonePe integration function
 * @param {Object} params
 * @param {string} params.paymentUrl - The payment URL from backend (tokenUrl)
 * @param {Function} params.onSuccess - Callback when payment is concluded
 * @param {Function} params.onCancel - Callback when user cancels
 * @returns {Promise<boolean>}
 */
export default function PhonePe({ paymentUrl, onSuccess, onCancel }) {
  if (!paymentUrl) {
    toast.error("Payment URL is missing");
    return Promise.resolve(false);
  }

  return openPhonePePayPage({
    tokenUrl: paymentUrl,
    onSuccess,
    onCancel,
  });
}

// Export helper functions if needed elsewhere
export { initializePhonePeScript, closePhonePePayPage };

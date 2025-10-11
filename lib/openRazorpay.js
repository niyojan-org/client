// lib/openRazorpay.js

export default function openRazorpay(order, participantName, participantEmail) {
  return new Promise((resolve, reject) => {
    // ✅ If Razorpay is already loaded, just launch
    if (window.Razorpay) {
      return launchRazorpay();
    }

    // Dynamically load Razorpay SDK
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = launchRazorpay;
    script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
    document.body.appendChild(script);

    function launchRazorpay() {
      if (!order || !order.orderId) {
        return reject(new Error("Invalid order details"));
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount, // already in paise
        currency: order.currency || "INR",
        name: "Event Registration",
        description: "Complete your event payment",
        order_id: order.orderId, // from backend
        handler: function (response) {
          // ✅ Razorpay returns this after successful payment
          resolve({
            ...response,
            status: "success",
            orderId: order.orderId,
          });
        },
        modal: {
          // ✅ Handles user closing payment popup
          ondismiss: function () {
            reject({ status: "cancelled", message: "Payment cancelled by user" });
          },
        },
        prefill: {
          name: participantName || "",
          email: participantEmail || "",
        },
        theme: {
          color: "#2563eb",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  });
}

// lib/openRazorpay.js
export default function openRazorpay(order, participantName, participantEmail) {
  return new Promise((resolve, reject) => {
    console.log("🔹 openRazorpay called", { order, participantName, participantEmail });

    if (window.Razorpay) {
      console.log("✅ Razorpay SDK already loaded, launching payment");
      return launchRazorpay();
    }

    console.log("⏳ Loading Razorpay SDK...");
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("✅ Razorpay SDK loaded successfully");
      launchRazorpay();
    };
    script.onerror = () => {
      console.error("❌ Razorpay SDK failed to load");
      reject(new Error("Razorpay SDK failed to load"));
    };
    document.body.appendChild(script);

    function launchRazorpay() {
      if (!order || !order.orderId) {
        console.error("❌ Invalid order details", order);
        return reject(new Error("Invalid order details"));
      }

      console.log("🚀 Launching Razorpay checkout", order);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount, // in paise
        currency: order.currency || "INR",
        name: "Event Registration",
        description: "Complete your event payment",
        order_id: order.orderId,
        handler: function (response) {
          console.log("✅ Payment successful", response);
          resolve({
            status: "success",
            orderId: order.orderId,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
        },
        modal: {
          ondismiss: function () {
            console.warn("⚠️ Payment cancelled by user");
            resolve({ status: "cancelled", message: "Payment cancelled by user" });
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
      rzp.on("payment.failed", function (response) {
        console.error("❌ Payment failed", response);
        resolve({ status: "failed", response });
      });
      rzp.open();
    }
  });
}

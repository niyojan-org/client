// lib/openRazorpay.js
export default function openRazorpay(order, participant) {
  return new Promise((resolve, reject) => {
    if (!order || !order.orderId) {
      console.error("❌ Missing or invalid Razorpay order:", order);
      return reject(new Error("Invalid Razorpay order details"));
    }

    if (window.Razorpay) {
      return launch();
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = launch;
    script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
    document.body.appendChild(script);

    function launch() {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount, // paise
        currency: order.currency || "INR",
        name: "Orgatick",
        description: "Event Ticket Payment",
        image: "/icon.png", 
        order_id: order.orderId,

        handler: function (response) {
          resolve({
            status: "success",
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
        },

        prefill: {
          name: participant?.name || "",
          email: participant?.email || "",
          contact: participant?.phone || "",
        },

        notes: {
          eventId: order.eventId || "N/A",
          eventName: order.eventName || "Event",
          platform: "Orgatick",
        },

        // Compliance & trust disclaimer shown on checkout UI
        metadata: {
          business_name: "Orgatick - Payments processed via Razorpay",
        },

        theme: {
          color: "#2563eb",
        },

        retry: {
          enabled: true,
          max_count: 2,
        },

        modal: {
          ondismiss: () => {
            resolve({ status: "cancelled" });
          },
        },

        redirect: false,
      };

      const razorpayInstance = new window.Razorpay(options);

      razorpayInstance.on("payment.failed", (response) => {
        resolve({
          status: "failed",
          error: response.error || response,
        });
      });

      razorpayInstance.open();
    }
  });
}

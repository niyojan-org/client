// // lib/openRazorpay.js
// export default function openRazorpay(order, participant) {
//   return new Promise((resolve, reject) => {
//     if (!order || !order.orderId) {
//       console.error("❌ Missing or invalid Razorpay order:", order);
//       return reject(new Error("Invalid Razorpay order details"));
//     }

//     if (window.Razorpay) {
//       return launch();
//     }

//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = launch;
//     script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
//     document.body.appendChild(script);

//     function launch() {
//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
//         amount: order.amount, // paise
//         currency: order.currency || "INR",
//         name: "orgatick",
//         description: "Event Ticket Payment",
//         image: "/icon.png", 
//         order_id: order.orderId,

//         handler: function (response) {
//           resolve({
//             status: "success",
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_signature: response.razorpay_signature,
//           });
//         },

//         prefill: {
//           name: participant?.name || "",
//           email: participant?.email || "",
//           contact: participant?.phone || "",
//         },

//         notes: {
//           eventId: order.eventId || "N/A",
//           eventName: order.eventName || "Event",
//           platform: "orgatick",
//         },

//         // Compliance & trust disclaimer shown on checkout UI
//         metadata: {
//           business_name: "orgatick - Payments processed via Razorpay",
//         },

//         theme: {
//           color: "#2563eb",
//         },

//         retry: {
//           enabled: true,
//           max_count: 2,
//         },

//         modal: {
//           ondismiss: () => {
//             resolve({ status: "cancelled" });
//           },
//         },

//         redirect: false,
//       };

//       const razorpayInstance = new window.Razorpay(options);

//       razorpayInstance.on("payment.failed", (response) => {
//         resolve({
//           status: "failed",
//           error: response.error || response,
//         });
//       });

//       razorpayInstance.open();
//     }
//   });
// }

// lib/openCashfree.js
export default function openCashfree(payment) {
  console.log(payment)
  return new Promise((resolve, reject) => {
    if (!payment?.payment_session_id) {
      console.error("❌ Invalid Cashfree paymentSessionId");
      return reject(new Error("Invalid payment session"));
    }
    // Ensure SDK is loaded
    if (typeof window.Cashfree !== "undefined") {
      return launch();
    }
    const script = document.createElement("script");
    script.src = process.env.NEXT_PUBLIC_CASHFREE_SDK_URL || "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.onload = launch;
    script.onerror = () => reject(new Error("Failed to load Cashfree SDK"));
    document.body.appendChild(script);

    function launch() {
      try {
        const cf = window.Cashfree({ mode: process.env.NODE_ENV === "production" ? "production" : "sandbox" });
        cf.checkout({
          paymentSessionId: payment.payment_session_id,
          redirectTarget: "_self",
        });
        // Note: checkout redirects — you likely won't get a JS "success" callback here
        resolve({ status: "redirected" });
      } catch (err) {
        reject(err);
      }
    }
  });
}

// lib/razorpay.js
export default function openRazorpay(order, participantName, participantEmail) {
  return new Promise((resolve, reject) => {
    // If Razorpay is already loaded, don’t inject script again
    if (window.Razorpay) {
      return launchRazorpay()
    }

    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload = launchRazorpay
    script.onerror = () => reject(new Error("Razorpay SDK failed to load"))
    document.body.appendChild(script)

    function launchRazorpay() {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount, // already in paise
        currency: order.currency || "INR",
        name: "Event Registration",
        description: "Complete your payment",
        order_id: order.razorpayOrderId, // comes from backend
        handler: function (response) {
          // ✅ This will contain { razorpay_payment_id, razorpay_order_id, razorpay_signature }
          resolve(response)
        },
        modal: {
          ondismiss: function () {
            reject(new Error("Payment cancelled by user"))
          },
        },
        prefill: {
          name: participantName,
          email: participantEmail,
        },
        theme: {
          color: "#2563eb", // blue
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    }
  })
}

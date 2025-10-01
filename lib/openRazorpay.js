// lib/razorpay.js
export default function openRazorpay(order, participantName, participantEmail) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount, // Razorpay order amount is already in paise
        currency: order.currency || 'INR',
        name: 'Event Registration',
        description: 'Complete your payment',
        order_id: order.id,
        handler: function (response) {
          resolve(response) // contains payment_id, signature
        },
        modal: {
          ondismiss: function () {
            reject(new Error('Payment cancelled'))
          },
        },
        prefill: {
          name: participantName,
          email: participantEmail,
        },
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
    }
    script.onerror = () => reject(new Error('Razorpay SDK load failed'))
    document.body.appendChild(script)
  })
}

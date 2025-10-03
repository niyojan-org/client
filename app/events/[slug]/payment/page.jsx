'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');

  useEffect(() => {
    if (!orderId || !amount) return;

    if (typeof window === 'undefined') return;

    // Read name, email, slug from sessionStorage (must be set in registration page)
    const name = sessionStorage.getItem('name') || '';
    const email = sessionStorage.getItem('email') || '';
    const slug = sessionStorage.getItem('slug') || '';

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;

    script.onload = () => {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: parseInt(amount) * 100,
        currency: 'INR',
        name: 'Event Registration',
        description: 'Complete your payment',
        order_id: orderId,
        prefill: {
          name,
          email,
        },
        handler: function (response) {
          const { razorpay_payment_id } = response;

          // Save paymentId and other info for success page
          sessionStorage.setItem('paymentId', razorpay_payment_id);
          sessionStorage.setItem('name', name);
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('slug', slug);

          router.push(`/events/${slug}/success`);
        },
        modal: {
          ondismiss: function () {
            alert('Payment popup closed');
            if (slug) {
              router.push(`/events/${slug}`);
            } else {
              router.push('/');
            }
          },
        },
      };

      console.log(options)

      const rzp = new window.Razorpay(options);
      rzp.open();
    };

    document.body.appendChild(script);
  }, [orderId, amount, router]);

  return <div className="text-center py-20">Redirecting to Razorpay...</div>;
}

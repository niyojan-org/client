'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Lottie from 'lottie-react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [animationData, setAnimationData] = useState(null);
  const [paymentId, setPaymentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [slug, setSlug] = useState('');

  useEffect(() => {
    fetch('/loader/Success.json')
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);

  useEffect(() => {
    // URL params first
    const urlPaymentId = searchParams.get('paymentId');
    const urlName = searchParams.get('name');
    const urlEmail = searchParams.get('email');
    const urlMessage = searchParams.get('message');
    const urlSlug = searchParams.get('slug');

    if (urlPaymentId && urlName && urlEmail) {
      setPaymentId(urlPaymentId);
      setName(urlName);
      setEmail(urlEmail);
      setMessage(urlMessage || '');
      setSlug(urlSlug || '');
      return;
    }

    // sessionStorage fallback
    if (typeof window !== 'undefined') {
      const sessPaymentId = sessionStorage.getItem('paymentId');
      const sessName = sessionStorage.getItem('name');
      const sessEmail = sessionStorage.getItem('email');
      const sessMessage = sessionStorage.getItem('message');
      const sessSlug = sessionStorage.getItem('slug');

      if (sessPaymentId && sessName && sessEmail) {
        setPaymentId(sessPaymentId);
        setName(sessName);
        setEmail(sessEmail);
        setMessage(sessMessage || '');
        setSlug(sessSlug || '');
      } else {
        router.push('/');
      }
    }
  }, [searchParams, router]);

  if (!animationData) return <p>Loading animation...</p>;

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] px-4 text-center">
      <div className="w-[200px] h-[200px]">
        <Lottie animationData={animationData} loop={false} />
      </div>
      <h2 className="text-3xl font-bold mt-6 text-green-700">Registration Successful!</h2>
      <p className="text-gray-700 mt-3 text-lg">
        🎉 Thank you <strong>{name || 'participant'}</strong> for registering!
      </p>
      <p className="text-gray-600 mt-1">
        A confirmation email has been sent to <strong>{email}</strong>.
      </p>
      {message && (
        <p className="text-blue-600 mt-2 text-base">{message}</p>
      )}
      {paymentId && (
        <p className="text-sm text-gray-400 mt-1 break-all">
          Payment ID: <code>{paymentId}</code>
        </p>
      )}

      <div className="mt-8 flex gap-4 justify-center">
        <button
          onClick={() => router.push('/events')}
          className="px-6 py-3 bg-primary text-white rounded-md text-lg hover:bg-primary/90 transition"
          aria-label="Go to Events page"
        >
          Go to Events Page
        </button>

        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-secondary text-white rounded-md text-lg hover:bg-secondary/90 transition"
          aria-label="Go to Home page"
        >
          Go to Home Page
        </button>
      </div>

    </div>
  );
}

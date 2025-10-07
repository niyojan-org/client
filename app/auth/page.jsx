'use client'; // MUST be first line

import { useState, useEffect, Suspense } from 'react';
import Auth from '../../components/Auth';

// Simple CSS loader while the page initializes
const Loader = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function AuthPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      <Auth />
    </Suspense>
  );
}

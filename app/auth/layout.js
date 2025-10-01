// app/(auth)/layout.js
'use client'

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserStore } from '@/store/userStore';

export default function AuthLayout({ children }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { token: storeToken } = useUserStore();

  useEffect(() => {
    const urlToken = searchParams.get('token');

    if (urlToken) {
      localStorage.setItem('token', urlToken);
      useUserStore.setState({ token: urlToken });
      router.push('/events');
    }
  }, [searchParams, router]);

  return <div>{children}</div>;
}
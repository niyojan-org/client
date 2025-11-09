'use client'; // MUST be first line

import { use, useEffect } from 'react';
import Auth from '../../components/Auth';
import { setAccessToken } from '@/lib/api';
import { useRouter } from 'next/navigation';



export default function AuthPage({ searchParams }) {
  const router = useRouter();

  const param = use(searchParams);

  useEffect(() => {
    if (param.token) {
      setAccessToken(param.token);
      router.replace('/events');
    }
  }, [param]);

  return (
    <Auth />
  )
}
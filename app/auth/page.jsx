'use client'; // MUST be first line

import { use, useEffect } from 'react';
import { setAccessToken } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Auth from '@/components/Auth';



export default function AuthPage({ searchParams }) {
  const router = useRouter();

  const param = use(searchParams);

  useEffect(() => {
    if (param.token) {
      setAccessToken(param.token);
      if (param.popup === 'true' || param.popup === true) {
        // Send success message to parent window
        if (window.opener) {
          window.opener.postMessage({
            type: 'AUTH_SUCCESS',
            success: true,
            token: param.token
          }, window.location.origin);
        }
        // Close after a brief delay to ensure message is sent
        setTimeout(() => window.close(), 100);
      } else {
        router.replace('/events');
      }
    }
  }, [param]);

  return (
    <Auth view={param.view} popup={param.popup === 'true' || param.popup === true} />
  )
}
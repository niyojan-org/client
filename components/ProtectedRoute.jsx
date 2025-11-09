'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { toast } from 'sonner';
import { useLoader } from '@/components/LoaderContext';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { isAuthenticated, loading: userLoading } = useUserStore();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    if (userLoading) {
      showLoader();
    } else {
      hideLoader();
      if (isAuthenticated === false) {
        toast.error('Please log in to access this page');
        router.replace('/auth?view=login');
      }
    }
  }, [isAuthenticated, userLoading, router, showLoader, hideLoader]);

  // Render children only if authenticated
  return isAuthenticated ? <>{children}</> : null;
}

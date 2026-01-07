'use client';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { SpinnerCustom } from './ui/spinner';


export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { isAuthenticated, loading: userLoading } = useUserStore();

  if (userLoading) {
    return (
      <div className='h-full flex items-center justify-center'>
        <SpinnerCustom />
      </div>
    )
  }

  // Render children only if authenticated
  return isAuthenticated ? <>{children}</> : null;
}

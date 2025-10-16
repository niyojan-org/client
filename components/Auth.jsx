'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Carousel from './Carousel';
// import CarouselLoader from './CarouselLoader';
import GlobalLoader from './GlobalLoader';
import { toast } from 'sonner';
import api from '../lib/api';
import Link from 'next/link';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import ForgotPassword from './Auth/ForgetPassword';
import { useSearchParams, useRouter } from 'next/navigation';
import GoogleAuthButton from './Auth/GoogleAuthButton';

export default function Auth() {
  const router = useRouter();
  const [carouselImages, setCarouselImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  const searchParams = useSearchParams();
  const initialView = searchParams.get('view');
  const [view, setView] = useState(initialView || 'login');
  const handleViewChange = (newView) => {
    router.push(`/auth?view=${newView}`)
  };

  useEffect(() => {
    const currentView = searchParams.get('view');
    if (currentView === 'login' || currentView === 'signup' || currentView === 'forgot') {
      setView(currentView);
    } else {
      setView('login');
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/util/resources?type=carousel&page=1&limit=3&sort=-createdAt");
        setCarouselImages(response.data.resources);
      } catch (error) {
        toast.error("Failed to fetch carousel images");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  // Page title and subtitle based on view
  const getTitleText = () => {
    if (view === 'login') return 'Welcome back!';
    if (view === 'signup') return 'Create an account';
    return 'Forgot your password?';
  };

  const getSubtitleText = () => {
    if (view === 'login') return 'Sign in to your account';
    if (view === 'signup') return 'Welcome aboard! Let’s get started.';
    return 'We’ll send you a link to reset your password';
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background px-2  py-3 md:py-10 ">

      <div className="w-full max-w-5xl mx-auto h-auto md:h-[600px] flex flex-col md:flex-row md:bg-card rounded-2xl md:shadow-lg overflow-hidden md:border border-border">

        {/* Carousel Section */}
        {isLoading ? <GlobalLoader /> : <Carousel images={carouselImages} />}

        {/* Form Section */}
        <div className="w-full md:w-1/2 flex flex-col text-foreground justify-start p-1 md:p-8 bg-card/80 backdrop-blur-sm h-[500px] md:h-full overflow-y-hidden overflow-x-hidden rounded-xl border-l border-r border-border/20">

          <Link href="/" className="text-sm mb-2 inline-block hover:underline text-muted-foreground hover:text-foreground transition-colors">
            ← Back
          </Link>

          <Card className="w-full max-w-md mx-auto bg-transparent border-none shadow-none flex flex-col flex-1 px-4">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold text-foreground font-inter">
                {getTitleText()}
              </CardTitle>
              <p className="text-sm text-muted-foreground font-inter">{getSubtitleText()}</p>
            </CardHeader>

            <GoogleAuthButton />

            <CardContent className="flex flex-col flex-1 justify-between">
              {view === 'login' &&
                <Login userEmail={userEmail} setUserEmail={setUserEmail} onViewChange={handleViewChange} />}

              {view === 'signup' && <Signup onViewChange={handleViewChange} />}

              {view === 'forgot' && <ForgotPassword userEmail={userEmail} setUserEmail={setUserEmail} onViewChange={handleViewChange} />}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
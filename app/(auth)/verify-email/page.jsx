'use client'

import { use, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import baseApi from '@/lib/base.api'
import { Button } from '@/components/ui/button'
import { IconCheck, IconLoader2, IconMail, IconX } from '@tabler/icons-react'
import { toast } from 'sonner'
import { } from 'react'

const parseIsLogin = (value) => {
    if (!value) return false;
    const normalized = String(value).trim().toLowerCase();
    return normalized === '1' || normalized === 'true' || normalized === 'yes';
};

function page({ searchParams }) {
    const params = use(searchParams);
    const token = (params?.token || '').trim();
    const email = (params?.email || '').trim();
    const shouldAutoLogin = parseIsLogin(params?.isLogin);

    const [status, setStatus] = useState('verifying');
    const [error, setError] = useState('');

    const hasValidParams = useMemo(() => Boolean(token && email), [token, email]);

    useEffect(() => {
        let isActive = true;

        const verifyEmail = async () => {
            if (!hasValidParams) {
                if (!isActive) return;
                setStatus('failed');
                setError('Invalid verification link. Please request a new verification email.');
                return;
            }

            setStatus('verifying');
            setError('');

            try {
                const response = await baseApi.post('/auth/verify-email', { token, email });
                if (!isActive) return;

                toast.success(response?.data?.message || 'Email verified successfully!');

                if (shouldAutoLogin) {
                    setStatus('redirecting');
                    window.location.href = '/';
                    return;
                }

                setStatus('verified');
            } catch (err) {
                if (!isActive) return;

                const message = err?.response?.data?.error?.details
                    || err?.response?.data?.message
                    || 'Verification failed. The link may be invalid or expired.';

                setError(message);
                setStatus('failed');
                toast.error('Email verification failed.');
            }
        };

        verifyEmail();

        return () => {
            isActive = false;
        };
    }, [email, hasValidParams, shouldAutoLogin, token]);

    return (
        <div className="h-full flex flex-col items-center pt-6">
            <Header />

            <div className="flex-1 h-full w-full flex flex-col items-center justify-center gap-4 px-4">
                {status === 'verifying' && (
                    <div className="w-full rounded-2xl border border-border bg-card/80 p-5 space-y-4 shadow-sm text-center">
                        <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                            <IconLoader2 size={28} className="animate-spin" />
                        </div>
                        <div>
                            <p className="text-xl font-semibold">Verifying your email</p>
                            <p className="text-sm text-muted-foreground mt-1">Please wait a moment...</p>
                        </div>
                    </div>
                )}

                {status === 'redirecting' && (
                    <div className="w-full rounded-2xl border border-border bg-card/80 p-5 space-y-4 shadow-sm text-center">
                        <div className="h-14 w-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                            <IconCheck size={28} />
                        </div>
                        <div>
                            <p className="text-xl font-semibold">Email verified</p>
                            <p className="text-sm text-muted-foreground mt-1">Signing you in and redirecting...</p>
                        </div>
                        <IconLoader2 size={20} className="animate-spin mx-auto text-muted-foreground" />
                    </div>
                )}

                {status === 'verified' && (
                    <div className="w-full rounded-2xl border border-border bg-card/80 p-5 space-y-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                <IconMail size={22} />
                            </div>
                            <div>
                                <p className="text-base font-semibold">Email verified</p>
                                <p className="text-sm text-muted-foreground">Your account is now verified successfully.</p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-border/70 bg-muted/30 px-3 py-2 text-sm font-medium break-all">
                            {email}
                        </div>

                        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm flex items-start gap-2">
                            <IconCheck size={16} className="mt-0.5 text-emerald-600" />
                            <span className="text-emerald-700">Verification complete. You can continue using your account.</span>
                        </div>

                        <Button asChild className="w-full rounded-full text-base h-11">
                            <Link href="/login">Go to login</Link>
                        </Button>
                    </div>
                )}

                {status === 'failed' && (
                    <div className="w-full rounded-2xl border border-destructive/20 bg-card/80 p-5 space-y-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="h-11 w-11 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
                                <IconX size={22} />
                            </div>
                            <div>
                                <p className="text-base font-semibold">Verification failed</p>
                                <p className="text-sm text-muted-foreground">This link may be invalid or expired.</p>
                            </div>
                        </div>

                        {email && (
                            <div className="rounded-xl border border-border/70 bg-muted/30 px-3 py-2 text-sm font-medium break-all">
                                {email}
                            </div>
                        )}

                        <p className="text-sm text-destructive">{error}</p>

                        <div className="flex flex-col gap-2">
                            <Button asChild className="w-full rounded-full text-base h-11">
                                <Link href="/login">Go to login</Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full rounded-full text-base h-11">
                                <Link href="/signup">Create account</Link>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default page

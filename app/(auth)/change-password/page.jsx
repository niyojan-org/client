'use client'

import { use, useMemo, useState } from 'react'
import Link from 'next/link'
import { IconCheck, IconLoader2 } from '@tabler/icons-react'
import Header from '../components/Header'
import { Button } from '@/components/ui/button'
import baseApi from '@/lib/base.api'
import { toast } from 'sonner'
import PasswordFields from '../components/PasswordFields'
import { getPasswordChecks } from '../components/password-utils'

function page({ searchParams }) {
    const params = use(searchParams);

    const token = (params?.token || '').trim();
    const email = (params?.email || '').trim();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const checks = useMemo(() => getPasswordChecks(password, confirmPassword), [password, confirmPassword]);
    const hasValidParams = Boolean(token && email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!hasValidParams) {
            setError('Invalid password reset link. Please request a new one.');
            return;
        }

        if (!checks.length || !checks.lowercase || !checks.uppercase || !checks.number || !checks.special) {
            setError('Use 8+ chars with upper, lower, number and special character');
            return;
        }

        if (!checks.matched) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const response = await baseApi.post('/auth/reset-password', {
                token,
                email,
                newPassword: password,
            });

            toast.success(response?.data?.message || 'Password changed successfully!');
            setSuccess(true);
        } catch (err) {
            const message = err?.response?.data?.message || 'Password reset failed. Please request a new link.';
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col items-center pt-6">
            <Header />

            <div className="flex-1 h-full w-full flex flex-col items-center justify-center gap-4 px-4">
                {!success ? (
                    <>
                        <p className="text-4xl font-semibold text-center">Create new password</p>
                        <p className="text-sm text-muted-foreground text-center max-w-sm">
                            Choose a strong password for your account.
                        </p>

                        <div className="w-full rounded-2xl border border-border bg-card/80 p-4 sm:p-5 space-y-4 shadow-sm">
                            <div className="rounded-xl border border-border/70 bg-muted/30 px-3 py-2 text-sm font-medium break-all">
                                {email || 'Email not found in link'}
                            </div>

                            {!hasValidParams && (
                                <p className="text-sm text-destructive" role="alert">
                                    Invalid or expired reset link. Request a new password reset email.
                                </p>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-3">
                                <PasswordFields
                                    password={password}
                                    confirmPassword={confirmPassword}
                                    error={error}
                                    onPasswordChange={(value) => {
                                        if (error) setError('');
                                        setPassword(value);
                                    }}
                                    onConfirmPasswordChange={(value) => {
                                        if (error) setError('');
                                        setConfirmPassword(value);
                                    }}
                                />

                                {error && (
                                    <p className="text-sm text-destructive px-1" role="alert">
                                        {error}
                                    </p>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full rounded-full text-lg h-12"
                                    disabled={loading || !hasValidParams}
                                >
                                    {loading ? <IconLoader2 className="animate-spin" /> : 'Change password'}
                                </Button>
                            </form>
                        </div>

                        <p className="text-sm text-muted-foreground text-center">
                            Back to{' '}
                            <Link href="/login" className="text-primary hover:underline">
                                Log in
                            </Link>
                        </p>
                    </>
                ) : (
                    <div className="w-full rounded-2xl border border-border bg-card/80 p-5 space-y-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                <IconCheck size={22} />
                            </div>
                            <div>
                                <p className="text-base font-semibold">Password changed</p>
                                <p className="text-sm text-muted-foreground">Your password has been updated successfully.</p>
                            </div>
                        </div>

                        <Button asChild className="w-full rounded-full text-base h-11">
                            <Link href="/login">Go to login</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default page

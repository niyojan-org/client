'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { IconLoader2, IconMail, IconCheck } from '@tabler/icons-react'
import baseApi from '@/lib/base.api'
import { authStore } from '../authStore'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function page() {
	const { emailDraft, setEmailDraft } = authStore();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [submittedEmail, setSubmittedEmail] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const normalizedEmail = (emailDraft || '').trim();

		if (!normalizedEmail) {
			setError('Email is required');
			return;
		}

		if (!EMAIL_REGEX.test(normalizedEmail)) {
			setError('Please enter a valid email address');
			return;
		}

		setError('');
		setLoading(true);
		try {
			await baseApi.post('/auth/forgot-password', { email: normalizedEmail });
			setSubmittedEmail(normalizedEmail);
		} catch (err) {
			setError(err?.response?.data?.message || 'Unable to send reset link. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const handleResend = async () => {
		if (!submittedEmail) return;
		setLoading(true);
		setError('');

		try {
			await baseApi.post('/auth/forgot-password', { email: submittedEmail });
		} catch (err) {
			setError(err?.response?.data?.message || 'Unable to resend reset link. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="h-full flex flex-col items-center pt-6">
			<Header />
			<div className="flex-1 h-full flex flex-col w-full items-center justify-center gap-4 px-4">
				<p className="text-4xl font-semibold text-center">Reset your password</p>

				{!submittedEmail ? (
					<div className="w-full gap-4 flex flex-col items-center justify-center">
						<div>
							Remembered your password?{' '}
							<Link href="/login" className="text-primary hover:underline">
								Log in
							</Link>
						</div>

						<form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
							<p className="text-sm text-muted-foreground text-center px-2">
								Enter your email address and we will send you a password reset link.
							</p>

							<Input
								type="email"
								name="email"
								autoComplete="email"
								placeholder="Email address"
								className={`text-xl h-12 ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
								value={emailDraft ?? ''}
								onChange={(e) => {
									if (error) setError('');
									setEmailDraft(e.target.value);
								}}
								aria-invalid={Boolean(error)}
								aria-describedby={error ? 'reset-email-error' : undefined}
							/>

							{error && (
								<p id="reset-email-error" className="text-sm text-destructive px-1" role="alert">
									{error}
								</p>
							)}

							<Button type="submit" className="w-full rounded-full text-xl h-14" disabled={loading}>
								{loading ? <IconLoader2 className="animate-spin" /> : 'Send reset link'}
							</Button>
						</form>
					</div>
				) : (
					<div className="w-full rounded-2xl border border-border bg-card/80 p-5 space-y-4 shadow-sm">
						<div className="flex items-center gap-3">
							<div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center">
								<IconMail size={22} />
							</div>
							<div>
								<p className="text-base font-semibold">Check your email</p>
								<p className="text-sm text-muted-foreground">Password reset link sent to</p>
							</div>
						</div>

						<div className="rounded-xl border border-border/70 bg-muted/30 px-3 py-2 text-sm font-medium break-all">
							{submittedEmail}
						</div>

						<div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm flex items-start gap-2">
							<IconCheck size={16} className="mt-0.5 text-emerald-600" />
							<span className="text-emerald-700">
								The link usually arrives within a minute. Check spam/junk if you do not see it. This works only for email addresses that already have an account.
							</span>
						</div>

						{error && <p className="text-sm text-destructive">{error}</p>}

						<div className="flex flex-col gap-2">
							<Button className="w-full rounded-full text-base h-11" disabled={loading} onClick={handleResend}>
								{loading ? <IconLoader2 className="animate-spin" /> : 'Resend link'}
							</Button>
							<Button asChild variant="outline" className="w-full rounded-full text-base h-11">
								<Link href="/login">Back to login</Link>
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default page

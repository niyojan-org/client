'use client'
import Header from '../components/Header'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IconBrandGoogle } from '@tabler/icons-react'
import { useState } from 'react'
import { IconCheck, IconMail } from '@tabler/icons-react'

import { authStore } from '../authStore'
import EmailView from '../components/EmailView'
import Password from '../components/Password'
import IdentityInput from './IdentityInput'

function page() {
    const { email } = authStore();
    const [verificationState, setVerificationState] = useState(null);


    return (
        <div className="h-full flex flex-col items-center pt-6">
            <Header />
            <div className="flex-1 h-full flex flex-col w-full items-center justify-center gap-4 px-4">
                <p className="text-4xl font-semibold text-center">Create an account</p>
                <div className="w-full gap-4 flex flex-col items-center justify-center">
                    <div>Already have an account? <Link href="/login" className="text-primary hover:underline">Log in</Link></div>
                    {verificationState ? (
                        <div className="w-full rounded-2xl border border-border bg-card/80 p-5 space-y-4 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                    <IconMail size={22} />
                                </div>
                                <div>
                                    <p className="text-base font-semibold">Verify your email</p>
                                    <p className="text-sm text-muted-foreground">We have sent a verification link to</p>
                                </div>
                            </div>

                            <div className="rounded-xl border border-border/70 bg-muted/30 px-3 py-2 text-sm font-medium break-all">
                                {verificationState.email}
                            </div>

                            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm flex items-start gap-2">
                                <IconCheck size={16} className="mt-0.5 text-emerald-600" />
                                <span className="text-emerald-700">
                                    Instant sign-in after verification is <strong>{verificationState.instantSignAfterVerification ? 'ON' : 'OFF'}</strong>.
                                </span>
                            </div>

                            <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                                {/* <IconSparkles size={14} /> */}
                                Open your inbox and click the link to complete signup.
                            </div>

                            <Button asChild className="w-full rounded-full text-base h-11">
                                <Link href="/login">Go to login</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col items-center justify-center gap-3 ">
                            {!email ? (
                                <IdentityInput />
                            ) : (
                                <EmailView message="Creating account with" />
                            )}
                            {email && (
                                <Password
                                    onSuccess={(state) => setVerificationState(state)}
                                />
                            )}
                        </div>
                    )}
                </div>
                <div className="w-full flex flex-col gap-4">
                    <div>
                        <Button className="w-full rounded-full text-xl h-14" variant={'outline'}>
                            <IconBrandGoogle size={18} className="mr-2" />
                            Continue with Google
                        </Button>
                    </div>
                </div>

            </div>

        </div >
    )
}

export default page
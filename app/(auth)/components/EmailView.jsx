import React from 'react'
import { authStore } from '../authStore';
import { Button } from '@/components/ui/button';
import { IconUserCircle } from '@tabler/icons-react';

function EmailView({ message = "Authenticating with email..." }) {
    const { email, setEmail } = authStore();
    if (!email) return null;

    return (
        <div className="w-full rounded-2xl sm:border sm:border-border sm:bg-card/80 space-y-4 ">
            <div className="flex items-start gap-3">
                <div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <IconUserCircle size={24} />
                </div>

                <div className="min-w-0">
                    <p className="text-base font-semibold leading-tight truncate">{email}</p>
                    <p className="text-sm text-muted-foreground mt-1">{message}</p>
                </div>
            </div>

            <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-muted-foreground">Not your account?</p>
                <Button
                    type="button"
                    variant="ghost"
                    className="h-8 px-2 text-sm"
                    onClick={() => setEmail('')}
                >
                    Use different email
                </Button>
            </div>
        </div>
    )
}

export default EmailView
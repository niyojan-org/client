import React, { useState } from 'react'
import { authStore } from '../authStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IconLoader2 } from '@tabler/icons-react';

function EmailInput({ externalError = null, onExternalErrorClear }) {
    const { loading, emailDraft, setEmailDraft, handleEmailSubmit } = authStore();
    const [localError, setLocalError] = useState(null);
    const activeError = localError || externalError;

    const handleEmailSubmitWrapper = async () => {
        setLocalError(null);
        try {
            await handleEmailSubmit(emailDraft);
        } catch (err) {
            setLocalError(err.message || "An error occurred. Please try again.");
        }
    }
    return (
        <>
            <div className="space-y-2 w-full">
                <Input
                    type="email"
                    name="email"
                    autoComplete="username webauthn"
                    placeholder="Email address"
                    className={`text-xl h-12 ${activeError ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    value={emailDraft ?? ''}
                    onChange={(e) => {
                        if (localError) setLocalError(null);
                        if (externalError && onExternalErrorClear) onExternalErrorClear();
                        setEmailDraft(e.target.value);
                    }}
                    aria-invalid={Boolean(activeError)}
                    aria-describedby={activeError ? 'email-error-message' : undefined}
                />
                {activeError && (
                    <p id="email-error-message" className="text-sm text-destructive px-1" role="alert">
                        {activeError}
                    </p>
                )}
            </div>
            <Button className="w-full rounded-full text-xl h-14" onClick={handleEmailSubmitWrapper} disabled={loading}>
                {loading ? <IconLoader2 className="animate-spin" /> : "Continue"}
            </Button>
        </>
    )
}

export default EmailInput
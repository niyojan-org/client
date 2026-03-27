import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IconLoader2 } from '@tabler/icons-react';
import { authStore } from '../authStore';

function IdentityInput() {
    const { loading, signupName, emailDraft, setSignupName, setEmailDraft, handleSignupIdentitySubmit } = authStore();
    const [error, setError] = useState(null);

    const handleContinue = () => {
        setError(null);
        try {
            handleSignupIdentitySubmit({
                name: signupName,
                email: emailDraft,
            });
        } catch (err) {
            setError(err.message || 'Please fill required fields');
        }
    };

    return (
        <>
            <div className="space-y-2 w-full">
                <Input
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Full name"
                    className={`text-lg h-12 ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    value={signupName ?? ''}
                    onChange={(e) => {
                        if (error) setError(null);
                        setSignupName(e.target.value);
                    }}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? 'signup-identity-error-message' : undefined}
                />
                <Input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Email address"
                    className={`text-lg h-12 ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    value={emailDraft ?? ''}
                    onChange={(e) => {
                        if (error) setError(null);
                        setEmailDraft(e.target.value);
                    }}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? 'signup-identity-error-message' : undefined}
                />
                {error && (
                    <p id="signup-identity-error-message" className="text-sm text-destructive px-1" role="alert">
                        {error}
                    </p>
                )}
            </div>
            <Button className="w-full rounded-full text-xl h-14" onClick={handleContinue} disabled={loading}>
                {loading ? <IconLoader2 className="animate-spin" /> : 'Continue'}
            </Button>
        </>
    );
}

export default IdentityInput;

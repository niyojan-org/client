import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { authStore } from '../authStore';
import { IconLoader2 } from '@tabler/icons-react';
import { toast } from 'sonner';
import PasswordFields from './PasswordFields';

function Password({ onSuccess }) {
    const { loading, handleSignupPasswordSubmit } = authStore();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [instantSignAfterVerification, setInstantSignAfterVerification] = useState(true);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        setError(null);
        try {
            const result = await handleSignupPasswordSubmit({
                password,
                confirmPassword,
                instantSignAfterVerification,
            });

            if (onSuccess) {
                onSuccess({
                    email: result.email,
                    instantSignAfterVerification: result.instantSignAfterVerification,
                });
            }
        } catch (err) {
            toast.error(err.message || 'Unable to create account');
            setError(err.message || 'Unable to create account');
        }
    };

    return (
        <div className="w-full space-y-3">
            <PasswordFields
                password={password}
                confirmPassword={confirmPassword}
                error={error}
                onPasswordChange={(value) => {
                    if (error) setError(null);
                    setPassword(value);
                }}
                onConfirmPasswordChange={(value) => {
                    if (error) setError(null);
                    setConfirmPassword(value);
                }}
            />

            <div className="rounded-xl border border-border/70 p-3 flex items-center justify-between gap-3">
                <div>
                    <p className="text-sm font-medium">Instant sign-in after email verification</p>
                </div>
                <Switch
                    checked={instantSignAfterVerification}
                    onCheckedChange={setInstantSignAfterVerification}
                    aria-label="Instant sign-in after email verification"
                />
            </div>

            {error && (
                <p className="text-sm text-destructive px-1" role="alert">
                    {error}
                </p>
            )}

            <Button
                type="button"
                className="w-full rounded-full text-lg h-12"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? <IconLoader2 className="animate-spin" /> : 'Create account'}
            </Button>
        </div>
    );
}

export default Password;

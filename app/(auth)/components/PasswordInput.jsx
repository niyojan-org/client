import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IconEye, IconEyeOff, IconLoader2, IconLock } from '@tabler/icons-react';
import { authStore } from '../authStore';

function PasswordInput() {
    const { loading, handlePasswordSubmit } = authStore();
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordSubmitWrapper = async () => {
        setError(null);
        try {
            await handlePasswordSubmit(password);
        } catch (err) {
            setError(err.message || 'Unable to login with password');
        }
    };

    return (
        <div className="w-full space-y-2">
            <div className="relative">
                <IconLock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className={`h-12 pl-10 pr-11 text-base ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    value={password}
                    onChange={(e) => {
                        if (error) setError(null);
                        setPassword(e.target.value);
                    }}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? 'password-error-message' : undefined}
                />
                <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                    {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                </button>
            </div>

            {error && (
                <p id="password-error-message" className="text-sm text-destructive px-1" role="alert">
                    {error}
                </p>
            )}

            <Button
                type="button"
                className="w-full rounded-full text-lg h-12"
                disabled={loading}
                onClick={handlePasswordSubmitWrapper}
            >
                {loading ? <IconLoader2 className="animate-spin" /> : 'Continue with password'}
            </Button>
        </div>
    )
}

export default PasswordInput

import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { IconCheck, IconEye, IconEyeOff, IconX } from '@tabler/icons-react';
import { getPasswordChecks, getPasswordStrengthMeta } from './password-utils';

function PasswordFields({
    password,
    confirmPassword,
    onPasswordChange,
    onConfirmPasswordChange,
    error,
    passwordPlaceholder = 'Create password',
    confirmPasswordPlaceholder = 'Confirm password',
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const checks = useMemo(() => getPasswordChecks(password, confirmPassword), [password, confirmPassword]);
    const strengthMeta = useMemo(() => getPasswordStrengthMeta(password), [password]);
    const showChecklistPopover = isPasswordFocused && password.length > 0;

    return (
        <>
            <div className="space-y-2 relative">
                <div className="relative">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        autoComplete="new-password"
                        placeholder={passwordPlaceholder}
                        className={`h-12 pr-11 text-base ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        value={password}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        onChange={(e) => onPasswordChange(e.target.value)}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                    </button>
                </div>

                {showChecklistPopover && (
                    <div className="absolute top-full left-0 right-0 mt-2 z-30 rounded-md border bg-popover text-popover-foreground shadow-md p-3 pointer-events-none">
                        <p className="text-xs font-medium text-muted-foreground mb-2">Password checklist</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                            <p className={`flex items-center gap-1.5 ${checks.length ? 'text-emerald-600' : 'text-muted-foreground'}`}>{checks.length ? <IconCheck size={14} /> : <IconX size={14} />}At least 8 characters</p>
                            <p className={`flex items-center gap-1.5 ${checks.uppercase ? 'text-emerald-600' : 'text-muted-foreground'}`}>{checks.uppercase ? <IconCheck size={14} /> : <IconX size={14} />}One uppercase letter</p>
                            <p className={`flex items-center gap-1.5 ${checks.lowercase ? 'text-emerald-600' : 'text-muted-foreground'}`}>{checks.lowercase ? <IconCheck size={14} /> : <IconX size={14} />}One lowercase letter</p>
                            <p className={`flex items-center gap-1.5 ${checks.number ? 'text-emerald-600' : 'text-muted-foreground'}`}>{checks.number ? <IconCheck size={14} /> : <IconX size={14} />}One number</p>
                            <p className={`flex items-center gap-1.5 ${checks.special ? 'text-emerald-600' : 'text-muted-foreground'}`}>{checks.special ? <IconCheck size={14} /> : <IconX size={14} />}One special character</p>
                            <p className={`flex items-center gap-1.5 ${checks.matched ? 'text-emerald-600' : 'text-muted-foreground'}`}>{checks.matched ? <IconCheck size={14} /> : <IconX size={14} />}Passwords match</p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-4 gap-1">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={`strength-bar-${index}`}
                            className={`h-1.5 rounded-full transition-colors ${index < strengthMeta.filledBars ? strengthMeta.barClass : 'bg-muted'}`}
                        />
                    ))}
                </div>
                <p className="text-xs text-muted-foreground">Password strength: <span className="font-medium text-foreground">{strengthMeta.label}</span></p>
            </div>

            <div className="relative">
                <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    autoComplete="new-password"
                    placeholder={confirmPasswordPlaceholder}
                    className={`h-12 pr-11 text-base ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    value={confirmPassword}
                    onChange={(e) => onConfirmPasswordChange(e.target.value)}
                />
                <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                    {showConfirmPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                </button>
            </div>
        </>
    );
}

export default PasswordFields;
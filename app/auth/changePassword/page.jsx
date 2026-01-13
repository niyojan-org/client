"use client";

import { use, useState, useEffect } from "react";
import { toast } from "sonner";
import { IconEye, IconEyeOff, IconCircleCheck, IconCircleX, IconLoader2, IconLock, IconShieldCheck } from "@tabler/icons-react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import Link from "next/link";
import ErrorCard from "@/components/Card/Error";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

export default function ChangePassword({ searchParams }) {
    // Unwrap searchParams promise using React.use()
    const params = use(searchParams);

    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState(null);

    // Extract token and email from URL query parameters
    useEffect(() => {
        const tokenParam = params?.token;
        const emailParam = params?.email;

        setToken(tokenParam);
        setEmail(emailParam);
        setLoading(false);
        if (!tokenParam || !emailParam) {
            setError({ code: 'TOKEN_EMAIL_MISSING' })
        }
    }, [params]);

    // Password validation
    const passwordCriteria = {
        minLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const validatePassword = (password) => {
        return Object.values(passwordCriteria).every(Boolean);
    };

    // Calculate password strength
    const getPasswordStrength = () => {
        if (!password) return 0;
        const criteriaCount = Object.values(passwordCriteria).filter(Boolean).length;
        return (criteriaCount / 5) * 100;
    };

    const getPasswordStrengthLabel = () => {
        const strength = getPasswordStrength();
        if (strength === 0) return { label: "", color: "" };
        if (strength < 40) return { label: "Weak", color: "text-red-500" };
        if (strength < 80) return { label: "Fair", color: "text-yellow-500" };
        if (strength < 100) return { label: "Good", color: "text-blue-500" };
        return { label: "Strong", color: "text-green-500" };
    };

    const isPasswordMatching = password === cpassword && cpassword.length > 0;
    const showPasswordMismatch = cpassword.length > 0 && password !== cpassword;
    const isFormValid = validatePassword(password) && isPasswordMatching;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await api.post("/auth/reset-password", {
                token,
                email,
                newPassword: password,
            });
            toast.success(response.data.message || "Password changed successfully!");
            setSuccess(true);
            setPassword("");
            setCPassword("");
        } catch (err) {
            toast.error(err.response?.data?.message || "Password reset failed. Please try again.");
            setError(
                "Password reset failed. The link may be invalid or expired. Request new one"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show loader initially
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <IconLoader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    // Show error
    if (error) {
        return (
            <div className="flex justify-center items-center h-full p-4">
                {error && (<ErrorCard error={error}
                    onRetry={() => redirect('/auth?view=forgot')}
                    onGoHome={() => redirect('/')}
                />)}
            </div>
        );
    }

    // Show success
    if (success) {
        return (
            <div className="flex justify-center items-center min-h-screen p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md w-full"
                >
                    <Card className="border-green-200 bg-green-50/50">
                        <CardContent className="pt-6 text-center">
                            <div className="mb-6 mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <IconCircleCheck className="text-green-600 w-10 h-10" />
                            </div>
                            <CardTitle className="text-2xl mb-2 text-green-900">
                                Password Changed Successfully!
                            </CardTitle>
                            <CardDescription className="text-green-700 mb-6">
                                Your password has been updated. You can now log in with your new password.
                            </CardDescription>
                            <Button asChild className="w-full" size="lg">
                                <Link href="/auth">
                                    Go to Login Page
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        );
    }

    // Main form
    const strengthInfo = getPasswordStrengthLabel();

    return (
        <div className="flex justify-center items-center h-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full"
            >
                <Card className="shadow-lg border-0">
                    <CardHeader className="space-y-1 text-center pb-4">
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                            <IconShieldCheck className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Change Password</CardTitle>
                        <CardDescription>
                            Create a strong password to secure your account
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
                            {/* New Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="flex items-center gap-2">
                                    <IconLock className="w-4 h-4" />
                                    New Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your new password"
                                        className="pr-10"
                                        aria-invalid={password.length > 0 && !validatePassword(password)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />}
                                    </button>
                                </div>

                                {/* Password Strength Indicator */}
                                {password.length > 0 && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-muted-foreground">Password strength:</span>
                                            <span className={`font-medium ${strengthInfo.color}`}>
                                                {strengthInfo.label}
                                            </span>
                                        </div>
                                        <Progress value={getPasswordStrength()} className="h-1.5" />
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="cpassword" className="flex items-center gap-2">
                                    <IconLock className="w-4 h-4" />
                                    Confirm Password
                                </Label>
                                <Input
                                    id="cpassword"
                                    type={showPassword ? "text" : "password"}
                                    name="cpassword"
                                    value={cpassword}
                                    onChange={(e) => setCPassword(e.target.value)}
                                    placeholder="Re-enter your new password"
                                    aria-invalid={showPasswordMismatch}
                                />

                                {/* Password Match Feedback */}
                                {showPasswordMismatch && (
                                    <Alert variant="destructive" className="py-2">
                                        <IconCircleX className="h-4 w-4" />
                                        <AlertDescription className="text-xs">
                                            Passwords do not match
                                        </AlertDescription>
                                    </Alert>
                                )}

                                {isPasswordMatching && (
                                    <Alert className="py-2 bg-green-50 text-green-700 border-green-200">
                                        <IconCircleCheck className="h-4 w-4" />
                                        <AlertDescription className="text-xs">
                                            Passwords match
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>

                            {/* Password Requirements */}
                            <div className="space-y-2 pt-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                    Password requirements:
                                </p>
                                <div className="grid gap-1.5">
                                    {[
                                        { key: 'minLength', label: 'At least 8 characters', met: passwordCriteria.minLength },
                                        { key: 'hasUpperCase', label: 'One uppercase letter', met: passwordCriteria.hasUpperCase },
                                        { key: 'hasLowerCase', label: 'One lowercase letter', met: passwordCriteria.hasLowerCase },
                                        { key: 'hasNumber', label: 'One number', met: passwordCriteria.hasNumber },
                                        { key: 'hasSpecialChar', label: 'One special character', met: passwordCriteria.hasSpecialChar },
                                    ].map(({ key, label, met }) => (
                                        <div
                                            key={key}
                                            className={`flex items-center gap-2 text-sm transition-colors ${met ? 'text-green-600' : 'text-muted-foreground'
                                                }`}
                                        >
                                            {met ? (
                                                <IconCircleCheck className="w-4 h-4" />
                                            ) : (
                                                <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />
                                            )}
                                            <span className={met ? 'font-medium' : ''}>{label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={!isFormValid || isSubmitting}
                                className="w-full"
                                size="lg"
                            >
                                {isSubmitting ? (
                                    <>
                                        <IconLoader2 className="w-4 h-4 animate-spin" />
                                        Changing Password...
                                    </>
                                ) : (
                                    <>
                                        <IconShieldCheck className="w-4 h-4" />
                                        Change Password
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Back to Login Link */}
                <div className="text-center mt-6">
                    <Link
                        href="/auth"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                        ← Back to Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
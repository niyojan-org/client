export const getPasswordChecks = (password, confirmPassword) => ({
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*]/.test(password),
    matched: password.length > 0 && password === confirmPassword,
});

export const getPasswordStrengthMeta = (password) => {
    const checks = getPasswordChecks(password, password);
    const score = [checks.length, checks.lowercase, checks.uppercase, checks.number, checks.special].filter(Boolean).length;
    const filledBars = Math.ceil((score / 5) * 4);

    if (score <= 2) return { label: 'Weak', barClass: 'bg-destructive', filledBars };
    if (score <= 4) return { label: 'Medium', barClass: 'bg-amber-500', filledBars };
    return { label: 'Strong', barClass: 'bg-emerald-500', filledBars };
};
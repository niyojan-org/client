
import { create } from "zustand";
import baseApi from "@/lib/base.api";
import passkeyAuth from "./login/passketAuth";
import { toast } from "sonner";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,32}$/;

export const authStore = create((set, get) => ({
    email: "",
    emailDraft: "",
    signupName: "",
    loading: false,
    isPasskeyAvailable: null,
    setEmail: (email) => set({ email: typeof email === "string" ? email : "" }),
    setEmailDraft: (emailDraft) => set({ emailDraft: typeof emailDraft === "string" ? emailDraft : "" }),
    setSignupName: (signupName) => set({ signupName: typeof signupName === "string" ? signupName : "" }),
    setIsPasskeyAvailable: (isAvailable) => set({ isPasskeyAvailable: isAvailable }),
    handleSignupIdentitySubmit: ({ name, email }) => {
        const normalizedName = typeof name === "string" ? name.trim() : "";
        const normalizedEmail = typeof email === "string" ? email.trim() : "";

        if (!normalizedName) {
            throw new Error("Name is required");
        }

        if (!normalizedEmail) {
            throw new Error("Email is required");
        }

        if (!EMAIL_REGEX.test(normalizedEmail)) {
            throw new Error("Please enter a valid email address");
        }

        set({
            signupName: normalizedName,
            email: normalizedEmail,
            emailDraft: normalizedEmail,
        });
    },
    handleEmailSubmit: async (email) => {
        try {
            const sourceEmail = typeof email === "string" ? email : get().emailDraft;
            const trimmedEmail = sourceEmail ? sourceEmail.trim() : "";
            if (!trimmedEmail) {
                throw Error("Email is required");
            }
            if (!EMAIL_REGEX.test(trimmedEmail)) {
                throw Error("Please enter a valid email address");
            }

            set({ loading: true });
            const response = await baseApi.get("/auth/email-check", {
                params: {
                    email: trimmedEmail
                }
            });
            set({ email: trimmedEmail, emailDraft: trimmedEmail });
            const passkeyResult = await passkeyAuth(response.data.options, trimmedEmail, false);
            if (passkeyResult) {
                window.location.href = "/";
                //TODO: Handle redirection more elegantly after login instead of hard reload, maybe by setting some global auth state and using that to trigger a re-render in the root layout or something like that. This is a quick solution to ensure the user is redirected to the homepage after login, but it does cause a full page reload which is not ideal in an SPA context.
            }
        } catch (error) {
            throw new Error(error?.response?.data?.message || error.message || "An error occurred. Please try again.");
        } finally {
            set({ loading: false });
        }

    },
    handlePasswordSubmit: async (password) => {
        try {
            const email = (get().email || get().emailDraft || "").trim();
            const normalizedPassword = typeof password === "string" ? password : "";

            if (!email) {
                throw new Error("Please enter email first");
            }

            if (!normalizedPassword.trim()) {
                throw new Error("Password is required");
            }

            set({ loading: true });
            const response = await baseApi.post("/auth/login", {
                email,
                password: normalizedPassword,
            });
            // TODO: Handle the response properly, maybe store the token in localStorage or context and update the global auth state instead of just redirecting. This is a simplified example to demonstrate the flow.
            window.location.href = "/";
        } catch (error) {
            throw new Error(error?.response?.data?.message || error.message || "Unable to login with password");
        } finally {
            set({ loading: false });
        }
    },
    handleSignupPasswordSubmit: async ({ password, confirmPassword, instantSignAfterVerification = true }) => {
        try {
            const email = (get().email || get().emailDraft || "").trim();
            const name = (get().signupName || "").trim();
            const normalizedPassword = typeof password === "string" ? password : "";
            const normalizedConfirmPassword = typeof confirmPassword === "string" ? confirmPassword : "";

            if (!name) {
                throw new Error("Name is required");
            }

            if (!email) {
                throw new Error("Please enter email first");
            }

            if (!normalizedPassword.trim()) {
                throw new Error("Password is required");
            }

            if (!STRONG_PASSWORD_REGEX.test(normalizedPassword)) {
                throw new Error("Use 8+ chars with upper, lower, number and special character");
            }

            if (normalizedPassword !== normalizedConfirmPassword) {
                throw new Error("Passwords do not match");
            }

            set({ loading: true });
            const response = await baseApi.post("/auth/register", {
                name,
                email,
                password: normalizedPassword,
                instantSignAfterVerification: Boolean(instantSignAfterVerification),
            });

            return {
                success: true,
                email,
                instantSignAfterVerification: Boolean(instantSignAfterVerification),
                response: response.data,
            };
        } catch (error) {
            throw new Error(error?.response?.data?.message || error.message || "Unable to create account");
        } finally {
            set({ loading: false });
        }
    }

}));

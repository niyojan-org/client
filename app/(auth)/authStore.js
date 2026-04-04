import { create } from "zustand";
import baseApi from "@/lib/base.api";
import passkeyAuth from "./login/passkeyAuth";
import { toast } from "sonner";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const STRONG_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,32}$/;

export const authStore = create((set, get) => ({
  email: "",
  emailDraft: "",
  signupName: "",
  loading: false,
  isPasskeyAvailable: null,
  setEmail: (email) => set({ email: typeof email === "string" ? email : "" }),
  setEmailDraft: (emailDraft) =>
    set({ emailDraft: typeof emailDraft === "string" ? emailDraft : "" }),
  setSignupName: (signupName) =>
    set({ signupName: typeof signupName === "string" ? signupName : "" }),
  setIsPasskeyAvailable: (isAvailable) =>
    set({ isPasskeyAvailable: isAvailable }),
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
          email: trimmedEmail,
        },
      });
      set({ email: trimmedEmail, emailDraft: trimmedEmail });
      const passkeyResult = await passkeyAuth(
        response.data.options,
        trimmedEmail,
        false,
      );
      
      if (passkeyResult) {
        return true;
      }
      return null;
    } catch (error) {
      throw new Error(
        error?.response?.data?.message ||
          error.message ||
          "An error occurred. Please try again.",
      );
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

      console.log(response);

      const responseData = response?.data?.data || response?.data || {};
      const requiresPasskey = Boolean(responseData?.requiresPasskey);

      if (requiresPasskey) {
        return "/mfa";
      }

      return null;
    } catch (error) {
      throw new Error(
        error?.response?.data?.message ||
          error.message ||
          "Unable to login with password",
      );
    } finally {
      set({ loading: false });
    }
  },
  handleSignupPasswordSubmit: async ({
    password,
    confirmPassword,
    instantSignAfterVerification = true,
  }) => {
    try {
      const email = (get().email || get().emailDraft || "").trim();
      const name = (get().signupName || "").trim();
      const normalizedPassword = typeof password === "string" ? password : "";
      const normalizedConfirmPassword =
        typeof confirmPassword === "string" ? confirmPassword : "";

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
        throw new Error(
          "Use 8+ chars with upper, lower, number and special character",
        );
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
      throw new Error(
        error?.response?.data?.message ||
          error.message ||
          "Unable to create account",
      );
    } finally {
      set({ loading: false });
    }
  },
  handleGoogleLogin: async () => {
    try {
      const response = await baseApi.get("/auth/google/redirect");
      return response?.data?.data?.redirectUrl || response?.data?.redirectUrl;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Unable to login with Google right now. Please try again.",
      );
    }
  },
  
}));

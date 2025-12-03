"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import FloatingInput from "../ui/FloatingInput";
import { useUserStore } from "../../store/userStore";
// import { useLoader } from "@/components/LoaderContext";
import { useLoaderStore } from "@/store/loaderStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

export default function Login({ onViewChange, userEmail, setUserEmail }) {
  const formRef = useRef(null);
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useUserStore();
  const { showLoader, hideLoader } = useLoaderStore();

  useEffect(() => {
    loading ? showLoader() : hideLoader();
  }, [loading, showLoader, hideLoader]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", general: "" }));

    if (name === "email") setUserEmail(value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const success = await login({
      email: formData.email,
      password: formData.password,
    });

    if (success) {
      toast.success("Login successful!");
      formRef.current.reset();
      setFormData({ email: "", password: "" });
      router.push("/events");
    }
  };

  return (
    <Card className="w-full max-w-md border-none shadow-none bg-transparent">
      <form
        ref={formRef}
        value={userEmail}
        onSubmit={handleSubmit}
        autoComplete="off"
        className="font-inter w-full flex flex-col"
      >
        <CardContent className="p-0">
          {/* Error */}
          {error && (
            <div className="text-destructive text-sm text-center mb-0">
              {error}
              {error.toLowerCase().includes("not verified") &&
                formData.email && (
                  <Button
                    variant="link"
                    type="button"
                    onClick={() =>
                      useUserStore
                        .getState()
                        .resendVerificationEmail(formData.email)
                    }
                    className="text-primary p-0 ml-1"
                  >
                    Resend Verification Email
                  </Button>
                )}
            </div>
          )}

          {/* Email */}
          <FloatingInput
            label="Email address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="email"
            className="w-full"
          // placeHolder="Enter you email"
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-1">{errors.email}</p>
          )}

          {/* Password */}
          <div className="relative mt-3">
            <FloatingInput
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="current-password"
              className="w-full p-2 pr-10"
            />
            <Button
              type="button"
              variant="icon"
              size="icon"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-1 top-1/2 -translate-y-1/4 "
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
          </div>
          {errors.password && (
            <p className="text-destructive text-sm mt-1">{errors.password}</p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading || !formData.email || !formData.password}
            className="w-full mt-5 rounded-full"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-primary-foreground"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col items-center ">
          {/* Forgot Password */}
          <Button
            variant="link"
            type="button"
            onClick={() => onViewChange("forgot")}
            className="text-primary text-sm font-medium self-end -mr-1"
          >
            Forgot password?
          </Button>

          {/* Footer Links */}
          <div className="flex flex-col sm:flex-row justify-between items-center w-full text-xs text-muted-foreground">
            <Link
              href="/terms-and-conditions"
              className="hover:underline whitespace-nowrap font-medium hover:text-foreground transition-colors text-center sm:text-left"
            >
              Terms & Conditions
            </Link>

            <p className="whitespace-nowrap font-medium text-center sm:text-right flex">
              Don’t have an account?{" "}
              <span
                onClick={() => onViewChange("signup")}
                className="text-primary p-0 font-medium pl-2 hover:underline underline-offset-2 cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

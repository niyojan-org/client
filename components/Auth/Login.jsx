"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import FloatingInput from "../ui/FloatingInput";
import { useUserStore } from "../../store/userStore";
import { useRef } from "react";
import { useLoader } from "@/components/LoaderContext";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";


export default function Login({ onViewChange, userEmail, setUserEmail }) {
  const formRef = useRef(null);
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const { login, loading, error } = useUserStore();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    if (loading) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [loading, showLoader, hideLoader]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", general: "" }));

    if (name == "email") {
      setUserEmail(e.target.value);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
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

    const success = await login({ email: formData.email, password: formData.password });
    if (success) {
      formRef.current.reset();
      setFormData({ email: "", password: "" });
      router.push("/events");
    }
  };

  return (
    <form
      ref={formRef}
      value={userEmail}
      onSubmit={handleSubmit}
      autoComplete="off"
      className="space-y-4 font-poppins w-full max-w-md mx-auto pb-8 flex flex-col min-h-[80vh]"
    >
      {/* {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>} */}

      <div>
        {error && (
          <div className="text-red-500 text-sm text-center">
            {/* <p>{error}</p> */}
            {error.toLowerCase().includes("not verified") && formData.email && (
              <button
                type="button"
                onClick={() => useUserStore.getState().resendVerificationEmail(formData.email)}
                className="mt-2 text-blue-600 hover:underline cursor-pointer"
              >
                Resend Verification Email
              </button>
            )}
          </div>
        )}
        <FloatingInput
          label="Email address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          autoComplete="email"
          className="w-full p-2 rounded-full border"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <div className="relative">
          <FloatingInput
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            autoComplete="new-password"
            className="w-full p-2 rounded-full border pl-6"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-3/5 -translate-y-1/6 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        <Button
          type="submit"
          disabled={loading || !formData.email || !formData.password}
          className="w-full mt-4 rounded-full cursor-pointer"
        >
          {/* loding on button */}
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-gray-800"
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
                ></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              Logging in...
            </span>
          ) : (
            "Submit"
          )}
        </Button>
      </div>

      {/* forget password link */}
      <div className="text-center text-sm text-gray-600 font-poppins whitespace-nowrap mt-2 pl-25 md:pl-70">
        <button
          type="button"
          onClick={() => onViewChange("forgot")}
          className="text-blue hover:underline mb-2 hover:cursor-pointer"
        >
          Forgot password?
        </button>
      </div>

      {/* Terms and Conditions */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center text-xs text-muted-foreground gap-y-5 px-4 lg:mt-18">
        <Link href="/terms-and-conditions" className="hover:underline whitespace-nowrap font-medium ">
          Terms & Conditions
        </Link>
        <p className="whitespace-nowrap font-medium">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => onViewChange("signup")}
            className="text-blue-600 hover:underline hover:cursor-pointer"
          >
            Sign up
          </button>
        </p>
      </div>
    </form>
  );
}

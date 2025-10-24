"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import Link from "next/link";

// Simple CSS loader (spinning circle)
const Loader = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function ChangePassword() {
  
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

  // for removing the error
  
  // Simulate page loading
  useEffect(() => {
    setLoading(false);
  }, []);

  // Password validation
  const validatePassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };

  const isPasswordMatching = password === cpassword;
  const isFormValid = validatePassword(password) && isPasswordMatching;

  // Check token & email
  useEffect(() => {
    if (!token || !email) {
      setError("Invalid or missing password reset link. Please request a new one.");
    }
  }, [token, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await api.post("/api/auth/reset-password", {
        token,
        email,
        newPassword: password,
      });
      toast.success(response.data.message || "Password changed successfully!");
      setSuccess(true);
      setPassword("");
      setCPassword("");
    } catch (err) {
      toast.error("Password reset failed. Please try again.");
      setError(
        "Password reset failed. The link may be invalid or expired. Request new one"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loader initially
  if (loading) return <Loader />;

  // Show error
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-50 border border-red-400 p-8 rounded-xl shadow-xl max-w-md text-center"
        >
          <XCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />
          <p className="text-red-700 text-lg font-semibold mb-4">{error}</p>
          <Link
            href="/auth"
            className="inline-block bg-gray-700 text-white font-medium px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Go to Login Page
          </Link>
        </motion.div>
      </div>
    );
  }

  // Show success
  if (success) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-green-50 border border-green-400 p-8 rounded-xl shadow-xl max-w-md text-center"
        >
          <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
          <p className="text-green-700 text-lg font-semibold mb-4">
            🎉 Your password has been changed successfully!
          </p>
          <Link
            href="/auth"
            className="inline-block bg-green-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Go to Login Page
          </Link>
        </motion.div>
      </div>
    );
  }

  // Main form
  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white border-0 p-8 rounded-xl shadow-xl max-w-md w-full text-center"
        aria-live="polite"
      >
        <h1 className="text-2xl font-bold mb-6">Change Password</h1>
        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="w-full p-3 border border-gray-300 rounded-md text-base"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
              role="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="cpassword"
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="w-full p-3 border border-gray-300 rounded-md text-base"
            />
          </div>

          {!isPasswordMatching && (
            <p className="text-red-600 text-sm">Passwords do not match.</p>
          )}

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`w-full py-2 rounded-md text-white font-medium transition duration-200 ${
              isFormValid && !isSubmitting
                ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Changing..." : "Change Password"}
          </button>
        </form>

        {/* Password rules */}
        <div className="mt-6 text-sm text-gray-600 text-left">
          <p className="font-medium mb-1">Password must include:</p>
          <ul className="space-y-1">
            <li className={password.match(/[A-Z]/) ? "text-green-600" : "text-red-500"}>
              • Uppercase letter (A-Z)
            </li>
            <li className={password.match(/[a-z]/) ? "text-green-600" : "text-red-500"}>
              • Lowercase letter (a-z)
            </li>
            <li className={password.match(/[0-9]/) ? "text-green-600" : "text-red-500"}>
              • Number (0-9)
            </li>
            <li className={password.match(/[!@#$%^&*(),.?":{}|<>]/) ? "text-green-600" : "text-red-500"}>
              • Special character (!@#$%^&*...)
            </li>
            <li className={password.length >= 8 ? "text-green-600" : "text-red-500"}>
              • At least 8 characters
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import { Suspense, useState, useEffect } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); 

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const verify = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.post("/api/auth/verify-email", { token });
        setVerified(true);
        toast.success(res.data.message || "Email verified successfully!");
      } catch (err) {
        setError(
          "Verification failed. The link may have expired or is invalid. Please log in and request a new verification email."
        );
        toast.error("Email verification failed.");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin w-12 h-12 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <div
        className={`w-full max-w-md sm:max-w-lg p-8 rounded-xl shadow-xl text-center border ${
          verified ? "bg-green-50 border-green-400" : error ? "bg-red-50 border-red-400" : "bg-white border-gray-300"
        }`}
      >
        {verified ? (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle className="text-green-500 w-16 h-16" />
            <p className="text-green-700 text-xl font-semibold">🎉 Your email has been verified!</p>
            <Link
              href="/"
              className="mt-4 inline-block bg-green-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Go to Homepage
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <XCircle className="text-red-500 w-16 h-16" />
            <p className="text-red-700 text-xl font-bold">Verification Failed</p>
            <p className="text-red-600 text-sm">{error}</p>
            <Link
              href="/login"
              className="mt-4 inline-block bg-gray-700 text-white font-medium px-6 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Go to Login Page
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin w-12 h-12 text-blue-500" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}

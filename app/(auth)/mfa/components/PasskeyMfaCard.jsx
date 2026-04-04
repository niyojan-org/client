"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconAlertCircle,
  IconArrowLeft,
  IconCheck,
  IconFingerprint,
  IconLoader2,
  IconMail,
  IconShieldLock,
} from "@tabler/icons-react";

import passkeyAuth from "../../login/passkeyAuth";
import baseApi from "@/lib/base.api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const getMfaErrorMessage = (error) => {
  if (error?.name === "NotAllowedError") {
    return "Authentication was cancelled or timed out. Please try again.";
  }

  if (error?.name === "InvalidStateError") {
    return "This passkey is not available for this account on this device.";
  }

  return (
    error?.response?.data?.message ||
    error?.message ||
    "Unable to verify passkey right now. Please try again."
  );
};

function PasskeyMfaCard({ email, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuthenticate = async () => {
    setError("");

    if (!email) {
      setError("Session expired. Please login again.");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setError("Please login again with a valid email.");
      return;
    }

    try {
      setLoading(true);

      const optionsResponse = await baseApi.post(
        "/auth/passkeys/authenticate/options",
        {
          email,
        },
      );

      const optionsPayload =
        optionsResponse?.data?.data ||
        optionsResponse?.data?.options ||
        optionsResponse?.data;

      if (!optionsPayload) {
        throw new Error("Authentication options were not received");
      }

      await passkeyAuth(optionsPayload, email, false);
      onSuccess();
    } catch (err) {
      setError(getMfaErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-none px-0 p-0 shadow-none bg-transparent w-full">
      <CardHeader className="space-y-3 p-0">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <IconShieldLock size={14} />
          Multi-Factor Authentication
        </div>
        <CardTitle className="text-2xl">Verify with your passkey</CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          Use Face ID, fingerprint, or your security key to continue your login
          securely.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 p-0">
        <div className="rounded-lg border border-border/70 bg-muted/35 p-3">
          <p className="text-sm font-medium">Account email</p>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <IconMail size={16} />
            <span className="truncate">{email || "Not available"}</span>
          </div>
        </div>

        <div className="rounded-lg border border-border/70 bg-muted/35 p-3 text-sm text-muted-foreground">
          <div className="mb-2 flex items-center gap-2 text-foreground">
            <IconCheck size={14} className="text-primary" />
            Quick steps
          </div>
          <p>1. Click Continue with passkey.</p>
          <p>2. Approve the prompt from your device.</p>
          <p>3. You will be signed in automatically.</p>
        </div>

        {error && (
          <Alert variant="destructive" id="mfa-error">
            <IconAlertCircle />
            <AlertTitle>Authentication failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button
          type="button"
          className="h-11 w-full"
          onClick={handleAuthenticate}
          disabled={loading}
        >
          {loading ? (
            <>
              <IconLoader2 className="animate-spin" />
              Verifying passkey...
            </>
          ) : (
            <>
              <IconFingerprint />
              Continue with passkey
            </>
          )}
        </Button>

        <Button type="button" variant="ghost" className="w-full" asChild>
          <Link href="/login">
            <IconArrowLeft />
            Back to login
          </Link>
        </Button>
      </CardContent>
    </div>
  );
}

export default PasskeyMfaCard;

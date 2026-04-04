"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  IconClock,
  IconInfoCircle,
  IconLogin2,
  IconLogout2,
  IconShieldCheck,
} from "@tabler/icons-react";

import { SpinnerCustom } from "@/components/ui/spinner";
import { useUserStore } from "@/store/userStore";
import { Button } from "@/components/ui/button";
import Header from "./Header";

const AUTH_ENTRY_ROUTES = new Set([
  "/login",
  "/signup",
  "/reset-password",
  "/mfa",
  "/oauth-success",
]);

const getRedirectTarget = () => {
  if (typeof window === "undefined") {
    return "/events";
  }

  const pendingRedirect = localStorage.getItem("redirect");
  if (pendingRedirect) {
    localStorage.removeItem("redirect");
    return pendingRedirect;
  }

  return "/events";
};

export default function AuthProtection({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const { fetchUser, isAuthenticated, logout } = useUserStore();
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isPreparingRedirect, setIsPreparingRedirect] = useState(false);
  const [redirectTarget, setRedirectTarget] = useState("/events");
  const [countdown, setCountdown] = useState(10);

  const shouldProtectRoute = useMemo(
    () => AUTH_ENTRY_ROUTES.has(pathname || ""),
    [pathname],
  );

  useEffect(() => {
    let isMounted = true;

    const verifySession = async () => {
      if (!shouldProtectRoute) {
        setIsCheckingSession(false);
        return;
      }

      if (isAuthenticated) {
        setRedirectTarget(getRedirectTarget());
        setCountdown(10);
        setIsPreparingRedirect(true);
        setIsCheckingSession(false);
        return;
      }

      const hasSession = await fetchUser();

      if (!isMounted) {
        return;
      }

      if (hasSession) {
        setRedirectTarget(getRedirectTarget());
        setCountdown(10);
        setIsPreparingRedirect(true);
        setIsCheckingSession(false);
        return;
      }

      setIsCheckingSession(false);
    };

    verifySession();

    return () => {
      isMounted = false;
    };
  }, [fetchUser, isAuthenticated, shouldProtectRoute]);

  useEffect(() => {
    if (!shouldProtectRoute || !isPreparingRedirect) {
      return;
    }

    if (countdown <= 0) {
      router.replace(redirectTarget || "/events");
      return;
    }

    const timer = window.setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    countdown,
    isPreparingRedirect,
    redirectTarget,
    router,
    shouldProtectRoute,
  ]);

  const handleLogoutAndStay = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      setIsPreparingRedirect(false);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (shouldProtectRoute && isCheckingSession) {
    return children;
  }

  if (shouldProtectRoute && isPreparingRedirect) {
    return (
      <div className="flex h-full w-full items-center justify-between px-4 py-8 flex-col">
        <Header />
        <div className="w-full">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-primary/10 p-2.5 text-primary">
              <IconShieldCheck size={22} />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                You are already signed in
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                To keep your account secure and avoid duplicate login steps, we
                will continue to your workspace automatically.
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 rounded-2xl border border-border/70 bg-muted/25 p-4">
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <IconClock size={16} /> Redirecting in
              </span>
              <span className="rounded-full border border-border/70 bg-background px-2.5 py-1 font-semibold">
                {countdown}s
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-background/80">
              <div
                className="h-full rounded-full bg-primary transition-all duration-1000 ease-linear"
                style={{ width: `${Math.max(0, (countdown / 10) * 100)}%` }}
              />
            </div>

            <p className="text-xs text-muted-foreground">
              Destination:{" "}
              <span className="font-medium text-foreground">
                {redirectTarget || "events"}
              </span>
            </p>
          </div>

          <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 p-3 text-sm text-muted-foreground">
            <p className="inline-flex items-start gap-2">
              <IconInfoCircle size={16} className="mt-0.5 shrink-0" />
              If this is a shared device, choose logout to sign out first and
              continue with a different account.
            </p>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <Button
              type="button"
              className="h-11 rounded-full"
              onClick={() => router.replace(redirectTarget || "/events")}
            >
              <IconLogin2 size={18} className="mr-2" />
              Continue now
            </Button>

            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-full"
              onClick={handleLogoutAndStay}
              disabled={isLoggingOut}
            >
              <IconLogout2 size={18} className="mr-2" />
              {isLoggingOut ? "Logging out..." : "Logout and stay here"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}

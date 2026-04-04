"use client";

import Footer from "./components/Footer";
import DesktopInfo from "./components/DesktopInfo";
import AuthProtection from "./components/AuthProtection";
import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const AuthLayoutContent = ({ children }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const redirectTo = searchParams.get("redirect");

  useEffect(() => {
    if (redirectTo) {
      localStorage.setItem("redirect", redirectTo);
      const params = new URLSearchParams(searchParams.toString());
      params.delete("redirect");

      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;

      router.replace(newUrl);
    }
  }, [redirectTo, pathname, router, searchParams]);

  return (
    <div className="h-full relative flex flex-col items-center justify-center w-full space-y-5 pb-4 sm:pb-0">
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-[90%] rounded-full bg-primary/18 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="flex-1 h-full w-full sm:rounded-2xl sm:border sm:border-border/70 sm:bg-card/95 sm:shadow-xl lg:grid grid-cols-2 lg:max-h-160 lg:overflow-hidden lg:rounded-3xl lg:bg-card/90 lg:backdrop-blur sm:max-w-6xl">
        <DesktopInfo />
        <AuthProtection>{children}</AuthProtection>
      </div>

      <Footer />
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <Suspense fallback={<div className="h-full w-full" />}>
      <AuthLayoutContent>{children}</AuthLayoutContent>
    </Suspense>
  );
};

export default Layout;

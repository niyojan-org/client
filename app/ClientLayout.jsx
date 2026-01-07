"use client";

import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

import { useEffect, useMemo, useState } from "react";
import NavigationBar from "@/components/NavigationBar";

// Routes where navbar should be hidden
const hiddenNavbarRoutes = ["/auth"];

export default function ClientLayout({ children }) {
  const { fetchUser } = useUserStore();
  const pathname = usePathname();

  // Add hydration-safe state to prevent mismatch
  const [isHydrated, setIsHydrated] = useState(false);

  // Calculate this synchronously using useMemo so it's consistent on server and client
  const shouldHideNavbar = useMemo(() => {
    if (!isHydrated || !pathname) return false;
    return hiddenNavbarRoutes.some((route) => pathname.startsWith(route));
  }, [pathname, isHydrated]);

  // Ensure hydration is complete before making pathname-based decisions
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Fetch user on mount
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      {!shouldHideNavbar && <NavigationBar />}
      {/* MAIN CONTENT */}
      <main className="h-dvh w-full flex flex-col">
        <div className="flex-1">
          <div className={`w-full h-full px-2 md:px-8 lg:px-16 ${!shouldHideNavbar ? 'pt-16' : ''}`}>
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
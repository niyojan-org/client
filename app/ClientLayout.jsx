"use client";

import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

import { useEffect, useMemo, useState } from "react";
import NavigationBar from "@/components/NavigationBar";
import { ScrollArea } from "@/components/ui/scroll-area";

// Routes where navbar should be hidden
const hiddenNavbarRoutes = ["/auth"];

// Routes where scroll area should be hidden
const hiddenScrollAreaRoutes = ["/auth", "/events/"];

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

  // Calculate whether to hide scroll area
  const shouldHideScrollArea = useMemo(() => {
    if (!isHydrated || !pathname) return false;
    return hiddenScrollAreaRoutes.some((route) => pathname.startsWith(route));
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
        {shouldHideScrollArea ? (
          // Without ScrollArea - for routes that need full control
          <div className="flex-1 ">
            <div className="w-full h-full">
              {children}
            </div>
          </div>
        ) : (
          // With ScrollArea - default behavior
          <ScrollArea className="flex-1 pt-15 px-2 pb-6 sm:px-6 md:px-8">
            <div className="w-full h-full">
              {children}
            </div>
          </ScrollArea>
        )}
      </main>
    </>
  );
}
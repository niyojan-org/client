"use client";

import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

import { useEffect } from "react";
import NavigationBar from "@/components/NavigationBar";

// Routes where navbar should be hidden
const hiddenNavbarRoutes = ["/auth"];

export default function ClientLayout({ children }) {
  const { fetchUser, isAuthenticated } = useUserStore();
  const pathname = usePathname();

  // Fetch user on mount
  useEffect(() => {
    fetchUser()
  }, [isAuthenticated]);

  // Check if current route should hide navbar
  const shouldHideNavbar = hiddenNavbarRoutes.some(route =>
    pathname.startsWith(route)
  );

  return (
    <>
      {!shouldHideNavbar && <NavigationBar />}
      {/* MAIN CONTENT */}
      <main className={shouldHideNavbar ? "" : "pt-16"}>
        {children}
      </main>
    </>
  );
}
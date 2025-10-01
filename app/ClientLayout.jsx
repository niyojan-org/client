"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
} from "../components/ui/navbar";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";


export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const { fetchUser, isAuthenticated, user, logout } = useUserStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch user once
  useEffect(() => {
    console.log("first")
    fetchUser();
  }, [fetchUser]);

  const navItems = [
    { name: "Events", link: "/events" },
    { name: "Features", link: "/features" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
    ...(isAuthenticated ? [{ name: "Organization", link: "/org" }] : []),
  ];

  const hideNavbar =
    pathname.startsWith("/auth") ||
    pathname.startsWith("/auth/verifyEmail") ||
    pathname.startsWith("/events");

  return (
    <>
      {!hideNavbar && (
        <Navbar>
          <NavBody className="relative">
            <NavbarLogo />
            <NavItems
              items={navItems}
              className="text-nav-default font-semibold text-black  tracking-wide text-lg"
            />
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <Link
                  href="/profile"
                  className="relative group block w-12 h-12"
                >
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-zinc-200 dark:border-neutral-700">
                    <Image
                      src={user?.avatar || "/default-avatar.png"}
                      alt={user?.name || "User"}
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <span className="absolute left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block rounded-md bg-white text-black text-xs px-2 py-1 shadow-lg whitespace-nowrap ">
                    {user?.name || "User"}
                  </span>
                </Link>
              ) : (
                <>
                  <NavbarButton
                    className="bg-transparent text-black border border-black hover:brightness-105"
                    variant="custom"
                    href="/auth?view=login"
                  >
                    Login
                  </NavbarButton>
                  <NavbarButton
                    className="rounded-full"
                    variant="primary"
                    href="/auth?view=signup"
                  >
                    Get Started
                  </NavbarButton>
                </>
              )}
            </div>
          </NavBody>

          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.aside
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", stiffness: 250, damping: 30 }}
                  className="fixed inset-y-0 left-0 z-50 flex w-[80%] flex-col bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md px-6 py-6 gap-6 shadow-xl overflow-y-auto h-screen transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <NavbarLogo />
                  </div>

                  {/* Nav Links */}
                  <div className="flex flex-col gap-4 text-lg font-medium text-zinc-700 dark:text-neutral-300">
                    {navItems.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.link}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="hover:text-zinc-900 dark:hover:text-neutral-100 transition"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  <div className="my-4 border-t border-zinc-200 dark:border-neutral-800" />

                  {/* Auth Buttons */}
                  <div className="mt-auto flex flex-col gap-3">
                    {isAuthenticated ? (
                      <>
                        <NavbarButton
                          onClick={() => setIsMobileMenuOpen(false)}
                          href="/dashboard"
                          variant="primary"
                          className="w-full"
                        >
                          Dashboard
                        </NavbarButton>
                        <NavbarButton
                          onClick={() => setIsMobileMenuOpen(false)}
                          href="/profile"
                          variant="primary"
                          className="w-full"
                        >
                          Profile
                        </NavbarButton>
                        <button
                          onClick={() => {
                            logout();
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full rounded-md bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm font-bold transition"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <NavbarButton
                          onClick={() => setIsMobileMenuOpen(false)}
                          variant="primary"
                          className="w-full"
                          href="/auth?view=login"
                        >
                          Login
                        </NavbarButton>
                        <NavbarButton
                          onClick={() => setIsMobileMenuOpen(false)}
                          variant="primary"
                          className="w-full"
                          href="/auth?view=signup"
                        >
                          Get Started
                        </NavbarButton>
                      </>
                    )}
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>
          </MobileNav>
        </Navbar>
      )}
      <main className="">{children}</main>
    </>
  );
}

"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  IconMenu2,
  IconInfoCircle,
  IconLayoutDashboard,
  IconPhoneCall,
  IconSettings,
  IconCalendarEvent,
  IconInfoCircleFilled,
} from "@tabler/icons-react";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { fetchUser, isAuthenticated, user, logout } = useUserStore();
  const [visible, setVisible] = useState(false);

  // Scroll tracking (window scroll)
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setVisible(latest > 80);
    });
    return () => unsubscribe();
  }, [scrollY]);

  // Fetch user once
  useEffect(() => {
    if (typeof fetchUser === "function") {
      fetchUser().catch(() => {});
    }
  }, [fetchUser]);

  const navItems = useMemo(() => {
    return [
      {
        id: "events",
        label: "Events",
        href: "/events",
        icon: <IconCalendarEvent size={18} />,
      },
      {
        id: "features",
        label: "Features",
        href: "/features",
        icon: <IconSettings size={18} />,
      },
      {
        id: "about",
        label: "About",
        href: "/about",
        icon: <IconInfoCircle size={18} />,
      },
      {
        id: "contact",
        label: "Contact",
        href: "/contact",
        icon: <IconPhoneCall size={18} />,
      },
      ...(isAuthenticated
        ? [
            {
              id: "org",
              label: "Organization",
              href: "/org",
              icon: <IconLayoutDashboard size={18} />,
            },
          ]
        : []),
    ];
  }, [isAuthenticated]);

  const hideNavbar =
    (pathname && pathname.startsWith("/auth")) ||
    (pathname && pathname.startsWith("/auth/verifyEmail")) ||
    (pathname && pathname.startsWith("/events"));

  const navigateTo = useCallback(
    (href) => {
      router.push(href);
    },
    [router]
  );

  const isActive = useCallback(
    (href) => {
      if (!pathname) return false;
      return pathname === href || pathname.startsWith(href + "/");
    },
    [pathname]
  );

  const handleLogout = useCallback(async () => {
    try {
      if (logout) await logout();
      router.push("/");
    } catch {}
  }, [logout, router]);

  if (hideNavbar) {
    return <main>{children}</main>;
  }

  return (
    <>
      <motion.header
        animate={{ y: visible ? 8 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 40 }}
        className="fixed inset-x-0 top-3 z-50 w-full pointer-events-auto"
      >
        <motion.div
          className="mx-auto flex max-w-[95%] items-center justify-between rounded-full px-4 md:px-6 py-2 transition-all duration-300"
          animate={{
            backgroundColor: visible
              ? "rgba(244,247,255,0.95)"
              : "rgba(255,255,255,0)",
            backdropFilter: visible ? "blur(10px)" : "blur(0px)",
            boxShadow: visible ? "0 6px 20px rgba(15,23,42,0.08)" : "none",
          }}
        >
          {/* Logo */}
          <div
            role="button"
            aria-label="Home"
            tabIndex={0}
            onClick={() => navigateTo("/")}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && navigateTo("/")
            }
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <Image
              src="/icon1.png"
              alt="Orgatick logo"
              width={40}
              height={40}
              className="rounded-md"
            />
            <span className="hidden md:inline font-bold text-lg leading-none">
              Orgatick
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-semibold tracking-wide text-lg">
            {navItems.map(({ id, label, href }) => (
              <Link
                key={id}
                href={href}
                className={
                  "relative px-2 py-1 group " +
                  (isActive(href)
                    ? "text-[#3447AA]"
                    : "text-zinc-800 dark:text-neutral-100")
                }
                aria-current={isActive(href) ? "page" : undefined}
              >
                <span className="inline-block transition-transform duration-200 group-hover:-translate-y-1">
                  {label}
                </span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-[#3447AA] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative group">
                <button
                  onClick={() => navigateTo("/profile")}
                  className="w-9 h-9 rounded-full overflow-hidden border hover:ring-2 hover:ring-primary transition cursor-pointer"
                  aria-label="Open profile"
                >
                  <Image
                    src={user?.avatar || "/default-avatar.png"}
                    alt={user?.name || "User"}
                    width={36}
                    height={36}
                    className="object-cover"
                  />
                </button>
                <span className="absolute left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block rounded-md bg-white text-black text-xs px-2 py-1 shadow-lg whitespace-nowrap">
                  {user?.name || "User"}
                </span>
              </div>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => navigateTo("/auth?view=login")}
                >
                  Login
                </Button>
                <Button
                  variant="default"
                  onClick={() => navigateTo("/auth?view=signup")}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <IconMenu2 size={22} />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="left"
                aria-describedby="mobile-nav-desc"
                className="w-[260px] bg-card/95 backdrop-blur-md shadow-xl"
              >
                <SheetTitle asChild>
                  <h2 className="sr-only">Mobile Navigation</h2>
                </SheetTitle>
                <p id="mobile-nav-desc" className="sr-only">
                  Mobile navigation. Use arrow keys and enter to navigate
                  through links.
                </p>

                <motion.div
                  className="flex flex-col gap-3 mt-6 px-2"
                  initial={{ x: -8, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                >
                  {isAuthenticated && (
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => navigateTo("/profile")}
                      onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") &&
                        navigateTo("/profile")
                      }
                      className="flex items-center gap-3 px-3 py-2 bg-muted rounded-md shadow-sm cursor-pointer hover:bg-muted/80"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden border">
                        <img
                          src={user?.avatar || "/default-avatar.png"}
                          alt="User avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{user?.name || "User"}</p>
                        <p className="text-xs text-muted-foreground">Member</p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-1 mt-2">
                    {navItems.map(({ id, label, href, icon }, i) => (
                      <motion.div
                        key={id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + i * 0.03 }}
                      >
                        <Button
                          variant="ghost"
                          className="justify-start px-3 w-full"
                          onClick={() => navigateTo(href)}
                          aria-current={isActive(href) ? "page" : undefined}
                        >
                          {icon && <span className="mr-2">{icon}</span>}
                          <span>{label}</span>
                        </Button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="my-3 border-t border-zinc-200 dark:border-neutral-800" />

                  <div className="flex flex-col gap-2">
                    {isAuthenticated ? (
                      <Button
                        variant="destructive"
                        className="justify-start px-3 w-full"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          className="justify-start px-3 w-full"
                          onClick={() => navigateTo("/auth?view=login")}
                        >
                          <IconInfoCircleFilled size={18} className="mr-2" />
                          Login
                        </Button>
                        <Button
                          variant="default"
                          className="w-full"
                          onClick={() => navigateTo("/auth?view=signup")}
                        >
                          Get Started
                        </Button>
                      </>
                    )}
                  </div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </motion.div>
      </motion.header>

      <main>{children}</main>
    </>
  );
}

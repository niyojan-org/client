"use client";

import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  IconMenu2,
  IconCalendarEvent,
  IconSettings,
  IconInfoCircle,
  IconPhoneCall,
  IconLayoutDashboard,
  IconUser,
  IconHistory,
  IconLogout,
} from "@tabler/icons-react";
import { useEffect } from "react";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { fetchUser, isAuthenticated, user, logout } = useUserStore();

  // Fetch user on mount
  useEffect(() => {
    if (typeof fetchUser === "function") fetchUser().catch(() => {});
  }, [fetchUser]);

  const navItems = [
    { id: "events", label: "Events", href: "/events", icon: <IconCalendarEvent size={18} /> },
    { id: "features", label: "Features", href: "/features", icon: <IconSettings size={18} /> },
    { id: "about", label: "About", href: "/about", icon: <IconInfoCircle size={18} /> },
    { id: "contact", label: "Contact", href: "/contact", icon: <IconPhoneCall size={18} /> },
    {
      id: "org",
      label: isAuthenticated ? "My Org" : "Explore Orgs",
      href: "/org",
      icon: <IconLayoutDashboard size={18} />,
    },
  ];


  const navigateTo = (href) => router.push(href);
  const handleLogout = async () => {
    if (logout) await logout();
    router.push("/");
  };

  const hideNavbar =
    pathname?.startsWith("/auth") ||
    pathname?.startsWith("/auth/verifyEmail") ||
    pathname?.startsWith("/events");

  if (hideNavbar) return <main>{children}</main>;

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <header className="fixed inset-x-[2%] bg-primary/10 z-50 rounded-full top-2 backdrop-blur-lg shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5">
          {/* LOGO */}
          <div
            onClick={() => navigateTo("/")}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <Image
              src="/icon1.png"
              alt="Orgatick logo"
              width={40}
              height={40}
              className="rounded-md"
            />
            <span className="hidden md:inline font-bold text-lg text-zinc-800">
              Orgatick
            </span>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 font-semibold text-lg">
            {navItems.map(({ id, label, href }) => (
              <Link
                key={id}
                href={href}
                className="relative px-2 py-1 group text-zinc-800 hover:text-[#3447AA]"
              >
                <span className="inline-block transition-transform group-hover:-translate-y-1">
                  {label}
                </span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-[#3447AA] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          {/* AUTH / PROFILE */}
          <div className="hidden md:flex items-center gap-3 cursor-pointer">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-10 h-10 rounded-full overflow-hidden border hover:ring-2 hover:ring-primary transition cursor-pointer">
                    <Image
                      src={user?.avatar || "/default-avatar.png"}
                      alt={user?.name || "User"}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 mt-2 cursor-pointer">
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigateTo("/profile")}>
                    <IconUser size={16} className="mr-2 " /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigateTo("/history")}>
                    <IconHistory size={16} className="mr-2" /> History
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 cursor-pointer"
                  >
                    <IconLogout size={16} className="mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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

          {/* MOBILE MENU */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <IconMenu2 size={22} />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[260px] bg-white/95 backdrop-blur-lg shadow-lg"
              >
                <SheetTitle className="sr-only">Mobile Nav</SheetTitle>
                <div className="flex flex-col gap-3 mt-6">
                  {isAuthenticated && (
                    <div
                      onClick={() => navigateTo("/profile")}
                      className="flex items-center gap-3 px-3 py-2 rounded-md bg-gray-100 cursor-pointer hover:bg-gray-200"
                    >
                      <Image
                        src={user?.avatar || "/default-avatar.png"}
                        alt="User"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{user?.name || "User"}</p>
                        <p className="text-xs text-muted-foreground">Member</p>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    {navItems.map(({ id, label, href, icon }) => (
                      <Button
                        key={id}
                        variant="ghost"
                        className="justify-start px-3 w-full"
                        onClick={() => navigateTo(href)}
                      >
                        {icon && <span className="mr-2">{icon}</span>}
                        {label}
                      </Button>
                    ))}
                  </div>
                  <div className="my-2 border-t" />
                  {isAuthenticated ? (
                    <Button
                      variant="destructive"
                      className="justify-start px-3 w-full my-65"
                      onClick={handleLogout}
                    >
                      <IconLogout size={18} className="mr-2" /> Logout
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        className="justify-start px-3 w-full"
                        onClick={() => navigateTo("/auth?view=login")}
                      >
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
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="">{children}</main>
    </>
  );
}

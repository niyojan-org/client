'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Hash,
  Home,
  Users,
  Building2,
  FileSignature,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import NotificationMenu from "@/components/navbar-components/notification-menu";
import UserMenu, { SheetDownMenu } from "@/components/navbar-components/user-menu";
import { ModeToggle } from "./navbar-components/settings-menu";
import Logo from "@/assets/Logo";
import { useUserStore } from "@/store/userStore";
import { IconCalendarEvent, IconInfoCircle, IconPhoneCall, IconBuilding, IconMenu2 } from "@tabler/icons-react";

const baseNavigationLinks = [
  { href: "/events", label: "Events", icon: IconCalendarEvent },
  { href: "/features", label: "Features", icon: FileSignature },
  { href: "/about", label: "About", icon: IconInfoCircle },
  { href: "/contact", label: "Contact", icon: IconPhoneCall }
];

const authNavigationLinks = [
  { href: "/events", label: "Events", icon: IconCalendarEvent },
  { href: "/about", label: "About", icon: IconInfoCircle },
  { href: "/contact", label: "Contact", icon: IconPhoneCall },
  { href: "/organization", label: "Organization", icon: IconBuilding }
];

export default function NavigationBar() {
  const { isAuthenticated } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [navigationLinks, setNavigationLinks] = useState(baseNavigationLinks);

  useEffect(() => {
    setNavigationLinks(isAuthenticated ? authNavigationLinks : baseNavigationLinks);
  }, [isAuthenticated]);

  return (
    <header className="fixed top-0 z-50 w-full bg-[color:var(--background)] text-[color:var(--foreground)] border-b border-[color:var(--border)] transition-colors duration-300 shadow-sm">
      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

        {/* Left: Logo + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle menu"
                className="md:hidden"
              >
                <IconMenu2 className="w-5 h-5 text-[color:var(--foreground)] transition-transform duration-300" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 flex flex-col bg-[color:var(--background)] text-[color:var(--foreground)]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 mt-4 flex-1">
                {navigationLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={idx}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[color:var(--accent)]/10 transition-colors"
                    >
                      <Icon size={20} className="text-[color:var(--muted-foreground)]" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <SheetDownMenu onClose={() => setIsOpen(false)} />
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-9 w-9" />
            <span className="hidden md:block text-[color:var(--primary)] font-bold text-lg">Orgatick</span>
          </Link>
        </div>

        {/* Middle: Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex gap-4">
            {navigationLinks.map((link, idx) => {
              const Icon = link.icon;
              return (
                <NavigationMenuItem key={idx}>
                  <NavigationMenuLink
                    href={link.href}
                    className="flex items-center gap-2 px-2 py-1 font-medium rounded-md hover:bg-[color:var(--accent)]/10 hover:text-[color:var(--primary)] transition-colors"
                  >
                    <Icon size={16} className="text-[color:var(--muted-foreground)]/80" />
                    <span>{link.label}</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <NotificationMenu />
          <ModeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}

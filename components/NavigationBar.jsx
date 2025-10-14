'use client'
import { useId, useState, useMemo, useEffect } from "react"
import {
  Hash,
  Home,
  Users,
  Building2,
} from "lucide-react"

import NotificationMenu from "@/components/navbar-components/notification-menu"
import UserMenu, { SheetDownMenu } from "@/components/navbar-components/user-menu"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { IconCalendarEvent, IconInfoCircle, IconMenu2, IconPhoneCall, IconBuilding } from "@tabler/icons-react"
import Link from "next/link"
import Logo from "@/assets/Logo"
import SettingsMenu from "./navbar-components/settings-menu"
import { useUserStore } from "@/store/userStore"

const baseNavigationLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/events", label: "Events", icon: IconCalendarEvent },
  { href: "/about", label: "About", icon: IconInfoCircle },
  { href: "/contact", label: "Contact", icon: IconPhoneCall }
]

// Authenticated user links (replaces base links)
const authNavigationLinks = [
  { href: "/events", label: "Events", icon: IconCalendarEvent },
  { href: "/about", label: "About", icon: IconInfoCircle },
  { href: "/contact", label: "Contact", icon: IconPhoneCall },
  { href: "/organization", label: "Organization", icon: IconBuilding }
]

export default function NavigationBar() {
  const { isAuthenticated } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [navigationLinks, setNavigationLinks] = useState(baseNavigationLinks)


  // Combine navigation links based on authentication status
  useEffect(() => {
    if (isAuthenticated) {
      setNavigationLinks(authNavigationLinks);
    } else {
      setNavigationLinks(baseNavigationLinks);
    }
  }, [isAuthenticated]);

  return (
    <header className="border-b px-4 md:px-6 fixed top-0 z-40 w-full bg-background">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          {/* Mobile menu trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button className="group size-8 md:hidden" variant="ghost" size="icon" aria-label="Toggle menu">
                <IconMenu2 className="h-5 w-5 transition-transform group-data-[state=open]:-rotate-90" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 flex flex-col">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 mt-4 flex-1">
                {navigationLinks.map((link, index) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={index}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-accent transition-colors"
                    >
                      <Icon size={20} className="text-muted-foreground" aria-hidden="true" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="">
                <SheetDownMenu onClose={() => setIsOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-primary hover:text-primary/90 flex items-center">
              <Logo className={"h-9 w-9"} />
              <p className="hidden">Orgatick</p>
            </Link>
          </div>
        </div>
        {/* Middle area */}
        <NavigationMenu className="max-md:hidden">
          <NavigationMenuList className="gap-2">
            {navigationLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    active={link.active}
                    href={link.href}
                    className="flex-row items-center gap-2 font-medium text-foreground hover:text-primary hover:border-b border-primary rounded-none px-2 py-1"
                  >
                    <Icon
                      size={16}
                      className="text-muted-foreground/80 "
                      aria-hidden="true"
                    />
                    <span>{link.label}</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>
        {/* Right side */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="flex items-center gap-2">
            {/* Notification menu */}
            <NotificationMenu />

            <SettingsMenu />
          </div>
          {/* User menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
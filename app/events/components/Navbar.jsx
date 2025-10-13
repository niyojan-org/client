'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  IconMenu2,
  IconUser,
  IconLayoutDashboard,
  IconPhoneCall,
  IconSettings,
  IconCalendarEvent,
  IconInfoCircle,
} from '@tabler/icons-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useRef, useMemo } from 'react';

export default function Navbar() {
  const router = useRouter();
  const { user, organization, isAuthenticated } = useUserStore();
  const ref = useRef(null);
  const { scrollY } = useScroll({ target: ref });
  const [visible, setVisible] = useState(false);

  // Track scroll for dynamic navbar
  useMotionValueEvent(scrollY, 'change', (latest) => setVisible(latest > 80));

  // Memoize nav items for performance
  const navItems = useMemo(() => [
    { id: 'explore', label: 'Explore', icon: <IconCalendarEvent size={18} />, href: '/' },
    { id: 'about', label: 'About', icon: <IconInfoCircle size={18} />, href: '/about' },
    { id: 'features', label: 'Features', icon: <IconSettings size={18} />, href: '/features' },
    { id: 'contact', label: 'Contact', icon: <IconPhoneCall size={18} />, href: '/contact' },
    organization
      ? { id: 'manage-org', label: 'My Organization', icon: <IconLayoutDashboard size={18} />, href: '/org' }
      : { id: 'switch-org', label: 'Organizer Mode', icon: <IconLayoutDashboard size={18} />, href: '/org/create' },
  ], [organization]);

  return (
    <motion.header
      ref={ref}
      animate={{ y: visible ? 8 : 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 40 }}
      className="fixed inset-x-[2%] top-3 z-50 w-full rounded-full backdrop-blur-lg"
    >
      <motion.div
        className="mx-auto flex max-w-[95%] items-center justify-between rounded-full px-6 py-2 transition-all duration-300"
        animate={{
          backgroundColor: visible ? 'rgba(244,247,255,0.9)' : 'rgba(255,255,255,0)',
          backdropFilter: visible ? 'blur(10px)' : 'blur(0px)',
          boxShadow: visible ? '0 2px 12px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push('/')}
        >
          <Image src="/icon1.png" alt="EMS Logo" width={40} height={40} className="rounded-md" />
          <span className="hidden md:inline font-bold text-lg">Orgatick</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-semibold tracking-wide text-lg">
          {navItems.map(({ id, label, href }) => (
            <button
              key={id}
              onClick={() => router.push(href)}
              className="relative px-2 py-1 cursor-pointer group"
            >
              <span className="relative inline-block transition-transform duration-200 group-hover:-translate-y-1">
                {label}
              </span>
              <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-[#3447AA] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="relative group">
              <button
                onClick={() => router.push('/profile')}
                className="w-9 h-9 rounded-full overflow-hidden border hover:ring-2 hover:ring-primary transition"
                aria-label="Profile"
              >
                <Image src={user?.avatar || '/avatar.png'} alt="User Avatar" width={36} height={36} className="object-cover" />
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block rounded-md bg-white text-black text-xs px-2 py-1 shadow-lg whitespace-nowrap">
                {user?.name || 'User'}
              </span>
            </div>
          ) : (
            <Button variant="default" onClick={() => router.push('/auth?view=login')}>
              Login
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open navigation menu">
                <IconMenu2 size={22} />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-[260px] bg-card/90 backdrop-blur-md shadow-xl">
              <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>

              <motion.div
                className="flex flex-col gap-3 mt-8"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                {/* User Info */}
                {isAuthenticated && (
                  <div
                    onClick={() => router.push('/profile')}
                    className="flex items-center gap-3 px-3 py-2 bg-muted rounded-md shadow-sm cursor-pointer hover:bg-muted/70"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden border">
                      <img src={user?.avatar || '/avatar.png'} alt="User Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">Student</p>
                    </div>
                  </div>
                )}

                {/* Mobile Navigation Items */}
                {navItems.map(({ id, label, icon, href }, i) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Button
                      variant="ghost"
                      className="justify-start px-3 w-full"
                      onClick={() => router.push(href)}
                    >
                      {icon}
                      <span className="ml-2">{label}</span>
                    </Button>
                  </motion.div>
                ))}

                {/* Login Button for mobile */}
                {!isAuthenticated && (
                  <Button
                    variant="ghost"
                    className="justify-start px-3 w-full"
                    onClick={() => router.push('/auth?view=login')}
                  >
                    <IconUser size={18} className="mr-2" />
                    Login
                  </Button>
                )}
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.div>
    </motion.header>
  );
}

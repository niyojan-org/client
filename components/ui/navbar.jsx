"use client";

import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/icon.png";
import { useUserStore } from "@/store/userStore";
import React, { useRef, useState } from "react";

//
// ──────────────────────────────
//   Navbar Wrapper (Scroll Logic)
// ──────────────────────────────
//
export const Navbar = ({ children, className }) => {
  const ref = useRef(null);
  const { scrollY } = useScroll({ target: ref });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 80);
  });

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ease-in-out",
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child
      )}
    </motion.div>
  );
};

//
// ──────────────────────────────
//   Desktop Navbar Body
// ──────────────────────────────
//
export const NavBody = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        backgroundColor: visible
          ? "rgba(255,255,255,0.95)"
          : "rgba(255,255,255,0)",
        boxShadow: visible
          ? "0 4px 12px rgba(0,0,0,0.08)"
          : "0 0 0 rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(8px)" : "blur(0px)",
        y: visible ? 4 : 0,
      }}
      transition={{ type: "spring", stiffness: 180, damping: 30 }}
      className={cn(
        "mx-auto hidden w-full max-w-7xl items-center justify-between rounded-full px-8 py-3 lg:flex transition-all duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

//
// ──────────────────────────────
//   Nav Items (Desktop Links)
// ──────────────────────────────
//
export const NavItems = ({ items, className = "", onItemClick }) => {
  return (
    <div
      className={cn(
        "hidden lg:flex flex-1 flex-row items-center justify-center space-x-8 font-semibold tracking-wide text-lg",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          key={idx}
          href={item.link}
          onClick={onItemClick}
          className="relative px-2 py-1 cursor-pointer group"
        >
          <span className="inline-block transition-transform duration-200 group-hover:-translate-y-1">
            {item.name}
          </span>
          <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-[#3447AA] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
        </Link>
      ))}
    </div>
  );
};

//
// ──────────────────────────────
//   Mobile Navbar Body
// ──────────────────────────────
//
export const MobileNav = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        backgroundColor: visible
          ? "rgba(255,255,255,0.9)"
          : "rgba(255,255,255,0)",
        boxShadow: visible
          ? "0 8px 30px rgba(0,0,0,0.05)"
          : "0 0 0 rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(10px)" : "blur(0px)",
        y: visible ? 4 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 40,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-4 py-3 lg:hidden rounded-2xl transition-all duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

//
// ──────────────────────────────
//   Mobile Nav Header
// ──────────────────────────────
//
export const MobileNavHeader = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

//
// ──────────────────────────────
//   Mobile Nav Menu (Dropdown)
// ──────────────────────────────
//
export const MobileNavMenu = ({ children, className, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn(
            "absolute inset-x-0 top-16 z-40 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white/95 dark:bg-neutral-900/90 backdrop-blur-md px-4 py-6 shadow-xl",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

//
// ──────────────────────────────
//   Mobile Toggle Button
// ──────────────────────────────
//
export const MobileNavToggle = ({ isOpen, onClick }) => {
  return isOpen ? (
    <IconX
      size={26}
      onClick={onClick}
      className="cursor-pointer text-black dark:text-white"
    />
  ) : (
    <IconMenu2
      size={26}
      onClick={onClick}
      className="cursor-pointer text-black dark:text-white"
    />
  );
};

//
// ──────────────────────────────
//   Navbar Logo
// ──────────────────────────────
//
export const NavbarLogo = () => {
  const { isAuthenticated } = useUserStore();

  return (
    <div className="flex items-center space-x-2 font-bold text-lg text-black dark:text-white">
      <Image src={logo} width={40} height={40} alt="Orgatick Logo" />
      <Link href={isAuthenticated ? "/events" : "/"}>Orgatick</Link>
    </div>
  );
};

//
// ──────────────────────────────
//   Navbar Buttons (Reusable)
// ──────────────────────────────
//
export const NavbarButton = ({
  href = "about",
  children,
  className,
  variant = "primary",
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-md text-sm font-semibold cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#3447AA] to-[#34E0A1] text-white shadow-md hover:brightness-105",
    secondary:
      "bg-transparent text-black dark:text-white border border-zinc-300 dark:border-neutral-700",
    dark: "bg-black text-white shadow-md",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Link
      href={href}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Link>
  );
};

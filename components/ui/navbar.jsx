"use client";

import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/icon.png";
import { useUserStore } from "@/store/userStore";

import React, { useRef, useState } from "react";

export const Navbar = ({ children, className }) => {
  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-3 z-40 w-full transition-all duration-300 ease-in-out",
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { visible }) : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{ y: visible ? 8 : 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 40 }}
      className={cn(
        "relative z-50 mx-auto hidden w-full max-w-7xl items-center justify-between self-start rounded-full px-6 py-2 lg:flex transition-all duration-300",
        visible
          ? "bg-[rgba(244,247,255,0.9)] dark:bg-neutral-900/20 backdrop-blur-md border border-zinc-200 dark:border-neutral-800 shadow-md"
          : "bg-transparent",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className = "", onItemClick }) => {
  return (
    <div
      className={cn(
        "hidden flex-1 flex-row items-center justify-center space-x-8 lg:flex font-semibold tracking-wide text-lg",
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
          <span
            className="
              relative 
              inline-block
              transition-transform 
              duration-200 
              ease-in-out
              group-hover:-translate-y-1
            "
          >
            {item.name}
          </span>
          {/* Underline animation */}
          <span
            className="
              absolute 
              left-0 
              -bottom-1 
              h-0.5 
              w-full 
              bg-[#3447AA] 
              scale-x-0 
              origin-left 
              transition-transform 
              duration-300 
              ease-in-out 
              group-hover:scale-x-100
            "
          />
        </Link>
      ))}
    </div>
  );
};

export const MobileNav = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 8px 30px rgba(0,0,0,0.05)"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-0 py-2 lg:hidden",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-row items-center justify-between", className)}>
      {children}
    </div>
  );
};

export const MobileNavMenu = ({ children, className, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md px-4 py-8 shadow-xl transition-all duration-300",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({ isOpen, onClick }) => {
  return isOpen ? (
    <IconX className="text-black dark:text-white" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-black dark:text-white" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  const { isAuthenticated } = useUserStore();

  return (
    <div className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-black font-bold text-lg tracking-wide">
      <Image src={logo} width={40} height={40} alt="Orgatick Logo" />
      <Link href={isAuthenticated ? "/events" : "/"}>Orgatick</Link>
    </div>
  );
};

export const NavbarButton = ({
  href = "about",
  children,
  className,
  variant = "primary",
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-md text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#3447AA] to-[#34E0A1] text-white shadow-md hover:brightness-105",
    secondary:
      "bg-transparent text-black dark:text-white border border-zinc-300 dark:border-neutral-700",
    dark:
      "bg-black text-white shadow-md",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Link href={href} className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </Link>
  );
};

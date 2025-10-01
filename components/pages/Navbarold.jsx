"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/store/userStore";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useUserStore();
  const pathname = usePathname();
  const activeSection = pathname.split("/")[1] || "";

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const menuItems = [
    { id: "explore", label: "Explore", path: "/explore" },
    { id: "features", label: "Features", path: "/features" },
    { id: "pricing", label: "Pricing", path: "/pricing" },
    { id: "testimonials", label: "Testimonials", path: "/testimonials" },
    { id: "faqs", label: "FAQs", path: "/faqs" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md font-spaceGrotesk ">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        
        {/* Logo Left */}
        <Link href="/" className="flex items-center select-none">
          <h1
            className="text-3xl md:text-4xl font-extrabold italic text-gray-900"
            aria-label="EMS Logo"
          >
            Rasa
          </h1>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-10 font-semibold text-gray-900">
            {menuItems.map(({ id, label, path }) => (
              <li key={id}>
                <Link
                  href={path}
                  className={`text-base transition-all duration-300
                    ${
                      activeSection === id
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "hover:text-indigo-500"
                    }
                  `}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Auth CTA */}
        <div className="hidden lg:flex items-center">
          {isAuthenticated ? (
            <Link
              href="/profile"
              className="flex items-center gap-3 font-semibold text-gray-900"
            >
              <img
                src={user?.avatar || "https://via.placeholder.com/150"}
                alt="User avatar"
                className="w-10 h-10 rounded-full border-2 border-gray-300"
              />
              <span>{user?.name}</span>
            </Link>
          ) : (
            <Link
              href="/auth"
              className="bg-indigo-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-indigo-700 transition "
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-gray-900 cursor-pointer"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <Menu className="w-8 h-8" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-3/4 h-screen bg-white border-l border-gray-300 z-50 flex flex-col py-12 px-8 font-spaceGrotesk"
          >
            <button
              onClick={toggleMenu}
              aria-label="Close Menu"
              className="absolute top-5 right-5 text-gray-900"
            >
              <X className="w-8 h-8" />
            </button>

            <ul className="flex flex-col gap-8 font-semibold text-gray-900 text-lg">
              {menuItems.map(({ id, label, path }) => (
                <li key={id}>
                  <Link
                    href={path}
                    className={`inline-block ${
                      activeSection === id
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "hover:text-indigo-500"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6 border-t border-gray-300">
              {isAuthenticated ? (
                <Link
                  href="/profile"
                  className="flex items-center gap-3 text-gray-900 font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <img
                    src={user?.avatar || "https://via.placeholder.com/150"}
                    alt="User avatar"
                    className="w-12 h-12 rounded-full border-2 border-gray-300"
                  />
                  <span>{user?.name}</span>
                </Link>
              ) : (
                <Link
                  href="/auth"
                  className="block mt-4 bg-indigo-600 text-white py-3 rounded-lg text-center font-semibold shadow-md hover:bg-indigo-700 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;

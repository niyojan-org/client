"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@/public/icon.png";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.includes("@")) {
      setMessage("Subscribed successfully! 🎉");
      setEmail("");
    } else {
      setMessage("Please enter a valid email.");
    }
  };

  return (
    <footer
      className="bg-[var(--card)] text-[var(--foreground)] pt-10 pb-5 px-6 sm:px-10 relative overflow-hidden"
      role="contentinfo"
    >
      {/* Social & Newsletter */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-16 md:gap-0">
        {/* Newsletter Signup */}
        <section className="flex-1 max-w-md mx-auto md:mx-0 text-center md:text-left">
          <header className="flex items-center justify-center md:justify-start gap-3 mb-6">
            <Image src={logo} alt="Orgatic Logo" width={40} height={40} />
            <h4 className="text-3xl font-extrabold text-[var(--primary)] tracking-tight">
              Stay in the Loop
            </h4>
          </header>
          <p className="text-[var(--muted-foreground)] mb-4 text-base">
            Subscribe for updates on student events, career boosters, and more.
          </p>
          <form
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
            onSubmit={handleSubscribe}
          >
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-[250px] py-5 rounded-lg border-border text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
              required
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary)] py-5 rounded-lg text-white cursor-pointer"
            >
              Subscribe
            </Button>
          </form>
          {message && (
            <p className="mt-2 text-sm text-green-500 font-medium">{message}</p>
          )}

          {/* Social Links */}
          <div className="flex gap-4 mt-6 justify-center md:justify-start">
            <Link href="https://instagram.com/orgatic" target="_blank" aria-label="Instagram">
              <Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} />
            </Link>
            <Link href="https://twitter.com/orgatic" target="_blank" aria-label="Twitter">
              <Image src="/icons/twitter.svg" alt="Twitter" width={24} height={24} />
            </Link>
            <Link href="https://linkedin.com/company/orgatic" target="_blank" aria-label="LinkedIn">
              <Image src="/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} />
            </Link>
          </div>
        </section>

        {/* Footer Links */}
        <ul className="flex flex-1 max-w-4xl justify-between flex-wrap gap-y-6 md:gap-x-6 text-sm md:text-base list-none p-0 m-0">
          {/* Quick Links */}
          <li className="min-w-[150px]">
            <h4 className="text-lg font-semibold mb-5 text-[var(--primary)]">Quick Links</h4>
            <ul className="space-y-3 text-[var(--muted-foreground)]">
              <li>
                <Link href="/about" className="hover:text-[var(--primary)] transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--primary)] transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-[var(--primary)] transition">
                  Explore Events
                </Link>
              </li>
            </ul>
          </li>

          {/* Legal */}
          <li className="min-w-[180px]">
            <h4 className="text-lg font-semibold mb-5 text-[var(--primary)]">Legal</h4>
            <ul className="space-y-3 text-[var(--muted-foreground)]">
              <li>
                <Link href="/privacy-policy" className="hover:text-[var(--chart-1)] transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-[var(--primary)] transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-[var(--primary)] transition">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </li>

          {/* Support */}
          <li className="min-w-[220px]">
            <h4 className="text-lg font-semibold mb-5 text-[var(--primary)]">Support</h4>
            <p className="text-[var(--muted-foreground)] leading-relaxed text-sm">
              Email us at: <br />
              <Link href="mailto:support@orgatic.events" className="text-[var(--primary)] hover:underline">
                support@orgatic.events
              </Link>
            </p>
          </li>
        </ul>
      </div>

      {/* Bottom Divider & Text */}
      <section className="max-w-7xl mx-auto mt-5 border-t border-[var(--border)] pt-4 text-center text-sm text-[var(--muted-foreground)] space-y-1">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-[var(--primary)] font-semibold">
            <Link href="https://orgaticevent.in">Orgatic Event</Link>
          </span>
          . All rights reserved.
        </p>
        <p>
          Managed & developed by{" "}
          <span className="text-[var(--secondary)] font-medium">Niyojan</span>.
        </p>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Orgatic Event",
            url: "https://orgatic.events",
            logo: "https://orgatic.events/logo.png",
            sameAs: [
              "https://instagram.com/orgatic",
              "https://twitter.com/orgatic",
              "https://linkedin.com/company/orgatic"
            ],
          }),
        }}
      />
    </footer>
  );
}

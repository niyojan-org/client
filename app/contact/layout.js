"use client";
import React from "react";

export default function ContactLayout({ children }) {
  return (
    <div className="w-full h-full flex flex-col bg-[color:var(--background)] text-[color:var(--foreground)]">
      {/* Allow natural scrolling */}
      <div className="w-full flex-1 px-4 md:px-20 items-center my-auto h-full pt-5 flex flex-col gap-6">
        {children}
      </div>
    </div>
  );
}

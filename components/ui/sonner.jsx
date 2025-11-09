"use client";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      theme="light"
      position="top-center"
      richColors
      toastOptions={{
        className:
          "rounded-xl border border-neutral-200 bg-white text-black shadow-md py-3 font-medium",
      }}
      visibleToasts={1}
      expand
      icons={true}
      duration={3000}
      className="toaster group"
      style={{
        top: "20px",
        "--normal-bg": "#ffffff",      // white background
        "--normal-text": "#000000",    // black text
        "--normal-border": "#e5e7eb",  // gray border
        "--success": "#16a34a",        // green icon (Tailwind green-600)
        "--error": "#dc2626",          // red icon (optional)
        "--warning": "#ca8a04",        // amber icon (optional)
        "--info": "#2563eb",           // blue icon (optional)
      }}
      {...props}
    />
  );
};

export { Toaster };

"use client";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function GlobalLoader({ animationData }) {
  
  if (!animationData) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 dark:bg-black/20 backdrop-blur-sm transition-all">
      <Lottie animationData={animationData} loop className="w-32 h-32" />
    </div>
  );
}

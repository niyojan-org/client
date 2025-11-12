import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";

export default function RegistrationBanner({ bannerImage, title, onBack }) {
  if (!bannerImage) return null;

  return (
    <div className="relative w-full aspect-[21/9] max-h-52 rounded-lg overflow-hidden shadow-md border border-border mb-4">
      <Image
        src={bannerImage}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      <Button
        variant="outline"
        size="sm"
        onClick={onBack}
        className="absolute top-4 left-4 flex items-center gap-2 rounded-lg backdrop-blur-sm bg-background/30 text-white border border-white/40 hover:bg-background/50"
      >
        <IconArrowLeft size={16} /> Back
      </Button>
    </div>
  );
}

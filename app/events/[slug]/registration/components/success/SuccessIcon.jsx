"use client";

import { IconCircleCheck } from "@tabler/icons-react";

export default function SuccessIcon() {
  return (
    <div className="flex justify-center mb-4">
      <div className="relative">
        <div className="relative bg-primary rounded-full p-3 animate-in zoom-in duration-500">
          <IconCircleCheck className="w-12 h-12 text-primary-foreground" />
        </div>
      </div>
    </div>
  );
}

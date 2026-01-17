"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export function ThemeColor() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    if (metaThemeColor) {
      const color = resolvedTheme === "dark" ? "#0a0a0a" : "#ffffff";
      metaThemeColor.setAttribute("content", color);
    }
  }, [resolvedTheme]);

  return null;
}

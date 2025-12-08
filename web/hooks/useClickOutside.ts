"use client";

import { useEffect } from "react";

export function useClickOutside(
  isActive: boolean,
  onClose: () => void,
  excludeSelectors: string[] = [
    ".mark-outer",
    '[class*="TeaMarkCard"]',
    '[class*="bg-black/40"]',
  ]
) {
  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't close if clicking on excluded elements
      if (excludeSelectors.some((selector) => target.closest(selector))) {
        return;
      }
      onClose();
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isActive, onClose, excludeSelectors]);
}

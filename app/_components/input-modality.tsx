"use client";

import { useEffect } from "react";

/**
 * Records whether the last navigation was Tab or a click, on <html data-modality>.
 * Text fields use it to show their focus ring only when reached with the keyboard.
 */
export function InputModality() {
  useEffect(() => {
    const root = document.documentElement;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Tab") root.dataset.modality = "keyboard";
    };
    const onPointer = () => {
      root.dataset.modality = "pointer";
    };
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("pointerdown", onPointer, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("pointerdown", onPointer, true);
    };
  }, []);
  return null;
}

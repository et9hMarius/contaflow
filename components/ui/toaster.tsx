"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "hsl(222, 25%, 14%)",
          color: "hsl(210, 20%, 98%)",
          border: "1px solid hsl(222, 20%, 22%)",
          fontSize: "13px",
          fontFamily: "var(--font-geist)",
        },
      }}
    />
  );
}

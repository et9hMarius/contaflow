"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function NextStepBar({
  hint,
  label,
  href,
  floating = false,
}: {
  hint: string;
  label: string;
  href: string;
  floating?: boolean;
}) {
  return (
    <div
      className={cn(
        floating
          ? "fixed bottom-6 right-6 z-30 lg:right-8"
          : "mt-8 flex justify-end"
      )}
    >
      <Link
        href={href}
        className="group inline-flex items-center gap-3 rounded-full border border-primary/15 bg-[hsl(222_70%_18%)] py-1.5 pl-4 pr-1.5 text-[13px] font-medium text-primary-foreground shadow-[0_8px_24px_-8px_hsl(222_70%_24%/0.5)] transition-all hover:bg-[hsl(222_75%_22%)] hover:shadow-[0_12px_32px_-10px_hsl(222_70%_24%/0.6)]"
      >
        <span className="hidden text-primary-foreground/60 sm:inline">{hint}</span>
        <span>{label}</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5">
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </Link>
    </div>
  );
}

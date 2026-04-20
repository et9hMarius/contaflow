"use client";

import Link from "next/link";
import * as React from "react";
import { ArrowRight, Menu, PlayCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  links: { href: string; label: string }[];
}

export function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Deschide meniul"
        className="flex h-9 w-9 items-center justify-center rounded-md text-ink-muted hover:bg-muted lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-[hsl(40_30%_98.5%)] lg:hidden">
          <div className="flex h-16 items-center justify-between px-6">
            <span className="font-serif text-[17px] font-semibold tracking-tight text-ink">
              ContaFlow
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Închide meniul"
              className="flex h-9 w-9 items-center justify-center rounded-md text-ink-muted hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-1 px-6 py-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg px-4 py-4 text-[17px] font-medium text-ink transition-colors hover:bg-muted/60"
              >
                {l.label}
                <ArrowRight className="h-4 w-4 text-ink-subtle" />
              </a>
            ))}
            <Link
              href="/demo"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-lg px-4 py-4 text-[17px] font-medium text-ink transition-colors hover:bg-muted/60"
            >
              <span className="inline-flex items-center gap-2">
                <PlayCircle className="h-4 w-4 text-amber-600" />
                Demo interactiv
              </span>
              <ArrowRight className="h-4 w-4 text-ink-subtle" />
            </Link>
          </nav>

          <div className="absolute inset-x-0 bottom-0 space-y-3 border-t border-border/60 bg-white p-6">
            <a
              href="#pilot-full"
              onClick={() => setOpen(false)}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[hsl(222_70%_18%)] px-6 text-[15px] font-medium text-primary-foreground"
            >
              Înscrie-te în pilotul beta
              <ArrowRight className="h-4 w-4" />
            </a>
            <div className="text-center text-[11px] text-ink-subtle">
              ARCHDEVS SRL · contact@archdevs.org · Pitești
            </div>
          </div>
        </div>
      )}
    </>
  );
}

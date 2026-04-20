"use client";

import Link from "next/link";
import * as React from "react";
import { ArrowRight, Mail, MessageSquare, PlayCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingContact() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {open && (
        <button
          aria-label="Închide meniul"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/10 backdrop-blur-[1px] animate-fade-in"
        />
      )}

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        {open && (
          <div className="w-[min(92vw,320px)] overflow-hidden rounded-2xl border border-border/70 bg-white shadow-[0_20px_60px_-20px_hsl(222_30%_14%/0.45)] animate-fade-in">
            <div className="flex items-center justify-between border-b border-border/70 bg-[hsl(222_30%_11%)] px-4 py-3 text-white">
              <div>
                <div className="font-serif text-[15px] font-medium leading-tight">
                  Alege cum continui
                </div>
                <div className="text-[10.5px] text-white/60">
                  2 opțiuni · 0 presiune
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-white/60 hover:bg-white/10 hover:text-white"
                aria-label="Închide"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="divide-y divide-border/60">
              <Link
                href="/demo"
                onClick={() => setOpen(false)}
                className="group flex items-start gap-3 px-4 py-3 transition-colors hover:bg-muted/40"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-700">
                  <PlayCircle className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[13px] font-semibold text-ink">
                      Testează demo-ul interactiv
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-ink-subtle transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <p className="text-[11.5px] leading-snug text-ink-muted">
                    2 minute · 47 de clienți fictivi · parcurgi toți cei 8 pași
                  </p>
                </div>
              </Link>

              <a
                href="#pilot-full"
                onClick={() => setOpen(false)}
                className="group flex items-start gap-3 px-4 py-3 transition-colors hover:bg-muted/40"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[13px] font-semibold text-ink">
                      Înscrie-te în pilotul beta
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-ink-subtle transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <p className="text-[11.5px] leading-snug text-ink-muted">
                    Preț fixat €49/lună pe viață · 30 de locuri, 8 rămase
                  </p>
                </div>
              </a>

              <a
                href="mailto:contact@archdevs.org?subject=ContaFlow — ăsta e profilul meu"
                onClick={() => setOpen(false)}
                className="group flex items-start gap-3 px-4 py-3 transition-colors hover:bg-muted/40"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-500/10 text-slate-700">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[13px] font-semibold text-ink">
                      Scrie-ne direct
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-ink-subtle transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <p className="text-[11.5px] leading-snug text-ink-muted">
                    contact@archdevs.org · fondatorul răspunde personal
                  </p>
                </div>
              </a>
            </div>

            <div className="border-t border-border/60 bg-[hsl(40_30%_99%)] px-4 py-2 text-center text-[10px] text-ink-subtle">
              Un produs ARCHDEVS SRL · Pitești
            </div>
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Închide meniul" : "Deschide meniul de contact"}
          className={cn(
            "group relative flex h-14 w-14 items-center justify-center rounded-full shadow-[0_15px_40px_-10px_hsl(222_70%_24%/0.55)] transition-all hover:scale-105",
            open
              ? "bg-white text-ink ring-1 ring-border"
              : "bg-[hsl(222_70%_18%)] text-primary-foreground hover:bg-[hsl(222_75%_22%)]"
          )}
        >
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-200",
              open ? "opacity-0 rotate-45" : "opacity-100 rotate-0"
            )}
          >
            <MessageSquare className="h-5 w-5" />
          </span>
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-200",
              open ? "opacity-100 rotate-0" : "opacity-0 -rotate-45"
            )}
          >
            <X className="h-5 w-5" />
          </span>
          {!open && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-amber-400 opacity-80" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-500 ring-2 ring-white" />
            </span>
          )}
        </button>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import * as React from "react";
import { ArrowLeft, ArrowRight, Monitor, Smartphone } from "lucide-react";

const STORAGE_KEY = "contaflow-demo-gate-ack";

export function DemoMobileGate() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    // Only gate when viewport is below lg (1024px) and user hasn't acknowledged this session.
    const ack = typeof window !== "undefined" && window.sessionStorage.getItem(STORAGE_KEY);
    const isSmall = window.matchMedia("(max-width: 1023px)").matches;
    setShow(isSmall && !ack);
  }, []);

  React.useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  const dismiss = () => {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
    setShow(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[hsl(40_30%_98.5%)] px-5 py-6 lg:hidden">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[12px] text-ink-muted hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Înapoi la ContaFlow
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200/80 bg-amber-50 px-2.5 py-1 text-[10.5px] font-medium text-amber-800">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Înainte de demo
          </span>
        </div>

        <div className="mt-10 flex flex-1 flex-col justify-center">
          {/* Visual: phone vs monitor */}
          <div className="mx-auto mb-8 flex items-end gap-5">
            <div className="relative flex h-[88px] w-12 items-center justify-center rounded-[14px] border-2 border-ink-muted/70 bg-white">
              <Smartphone className="h-4 w-4 text-ink-subtle" />
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                ×
              </span>
            </div>
            <div className="relative flex h-[92px] w-[124px] flex-col">
              <div className="flex-1 rounded-t-lg border-2 border-primary/80 bg-white p-2">
                <Monitor className="h-5 w-5 text-primary" />
              </div>
              <div className="mx-auto h-1.5 w-16 rounded-b-md bg-primary/70" />
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-bold text-white">
                ✓
              </span>
            </div>
          </div>

          <h1 className="text-center font-serif text-[28px] font-medium leading-[1.15] tracking-tight text-ink">
            Demo-ul merge cel mai bine <br />
            <span className="italic">pe ecran mare.</span>
          </h1>

          <p className="mt-4 text-center text-[14px] leading-relaxed text-ink-muted">
            Am construit flux-ul pentru desktop — tabele dense de clienți, preview de factură
            lângă formular, cockpit SAF-T. Pe telefon merge, dar vei scroll-a mult și unele detalii
            se vor pierde.
          </p>

          <div className="mt-6 rounded-xl border border-border/70 bg-white p-4 text-[12.5px] text-ink-muted">
            <div className="font-semibold text-ink">Ce facem recomandat:</div>
            <ul className="mt-2 space-y-1.5">
              <li className="flex gap-2">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary" />
                Deschide ContaFlow pe laptop când ai 2 minute liniștite
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary" />
                Sau trimite-ți link-ul pe email, ca să nu uiți
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary" />
                Poți continua acum oricum — dar va fi mai frumos pe desktop
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <button
            onClick={dismiss}
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[hsl(222_70%_18%)] px-6 text-[15px] font-medium text-primary-foreground shadow-[0_12px_32px_-12px_hsl(222_70%_24%/0.55)] transition-all hover:bg-[hsl(222_75%_22%)]"
          >
            Am înțeles, continuă
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <Link
            href="/"
            className="flex h-11 w-full items-center justify-center text-[13px] font-medium text-ink-muted hover:text-ink"
          >
            Mai bine revin de pe laptop
          </Link>
        </div>
      </div>
    </div>
  );
}

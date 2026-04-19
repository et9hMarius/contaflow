"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck2,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileCheck2,
  ShieldCheck,
  Sparkles,
  Triangle,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StepHeader } from "@/components/step-header";
import { cn } from "@/lib/utils";
import { allClientNames, declarations, type Declaration } from "@/lib/mock-data";
import { formatDateShort } from "@/lib/format";
import { useDemo } from "@/app/providers";

const SUBMIT_DURATION_MS = 2800;

export default function DeclarationsPage() {
  const { state, dispatch } = useDemo();
  const [active, setActive] = useState<Declaration | null>(null);
  const [phase, setPhase] = useState<"confirm" | "submitting" | "done">("confirm");
  const [progress, setProgress] = useState(0);

  const startSubmit = () => {
    if (!active) return;
    setPhase("submitting");
    setProgress(0);
    const start = performance.now();
    const tick = () => {
      const elapsed = performance.now() - start;
      const pct = Math.min(100, (elapsed / SUBMIT_DURATION_MS) * 100);
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(tick);
      else {
        setPhase("done");
        dispatch({ type: "SUBMIT_DECLARATION", code: active.code });
        toast.success(`${active.code} depusă cu succes`, {
          description: `${active.clientCount}/${active.clientCount} recipise primite de la ANAF`,
          icon: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
        });
      }
    };
    requestAnimationFrame(tick);
  };

  const closeDialog = () => {
    setActive(null);
    setPhase("confirm");
    setProgress(0);
  };

  return (
    <div className="space-y-8">
      <StepHeader
        step={6}
        eyebrow="Declarații ANAF"
        title="Declarații ANAF — martie 2026"
        lede="Pre-completate pe baza datelor categorizate. Un click depune la SPV pentru toți clienții relevanți, cu recipisă individuală salvată în istoricul fiecărui dosar."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {declarations.map((d) => (
          <DeclarationCard
            key={d.code}
            decl={d}
            submitted={state.declarationsSubmitted.has(d.code)}
            onAction={() => {
              if (d.code === "D406") return; // handled via href below
              if (d.ctaDisabled) return;
              setActive(d);
              setPhase("confirm");
              setProgress(0);
            }}
          />
        ))}
      </div>

      {/* HISTORIC CHART */}
      <div className="overflow-hidden rounded-xl border border-border/70 bg-white">
        <div className="flex items-center justify-between border-b border-border/70 px-5 py-3">
          <div>
            <div className="font-serif text-[15px] font-medium text-ink">
              Performanță depuneri · ultimele 6 luni
            </div>
            <div className="text-[11.5px] text-ink-subtle">
              Declarații depuse la timp din totalul obligațiilor per lună
            </div>
          </div>
          <Badge variant="green" className="gap-1.5">
            <Sparkles className="h-3 w-3" /> 100% la timp
          </Badge>
        </div>
        <div className="flex items-end gap-2 px-5 py-6 sm:gap-4">
          {[
            { month: "nov", val: 98 },
            { month: "dec", val: 100 },
            { month: "ian", val: 100 },
            { month: "feb", val: 100 },
            { month: "mar", val: 100 },
            { month: "apr", val: 75, active: true },
          ].map((b) => (
            <div key={b.month} className="flex flex-1 flex-col items-center gap-2">
              <div className="relative h-32 w-full overflow-hidden rounded-md bg-muted/70">
                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0 rounded-md",
                    b.active
                      ? "bg-gradient-to-t from-amber-400 to-amber-300"
                      : "bg-gradient-to-t from-emerald-500 to-emerald-400"
                  )}
                  style={{ height: `${b.val}%` }}
                />
                <div
                  className={cn(
                    "absolute inset-x-0 top-0 h-[1px]",
                    b.active ? "bg-amber-600/40" : "bg-emerald-600/30"
                  )}
                  style={{ top: `${100 - b.val}%` }}
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10.5px] font-semibold uppercase tracking-wide text-ink-subtle">
                  {b.month}
                </span>
                <span
                  className={cn(
                    "font-mono text-[11px] tabular-nums",
                    b.active ? "text-amber-700" : "text-ink"
                  )}
                >
                  {b.val}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/saft"
        className="group flex items-center justify-between rounded-xl border border-amber-300/60 bg-gradient-to-r from-amber-50 via-white to-white p-5 transition-colors hover:bg-amber-50/60"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/15 text-amber-700">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="font-serif text-[17px] font-medium text-ink">
              SAF-T D406 · cockpit dedicat
            </div>
            <div className="text-[12px] text-ink-muted">
              15 clienți small intră sub obligativitate · 390 câmpuri validați per depunere
            </div>
          </div>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-1">
          <ArrowRight className="h-4 w-4" />
        </span>
      </Link>

      {/* SUBMIT MODAL */}
      <Dialog open={!!active} onOpenChange={(o) => !o && closeDialog()}>
        <DialogContent className="max-w-2xl">
          {active && phase === "confirm" && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">
                    {active.code}
                  </Badge>
                  <DialogTitle className="font-serif text-[22px]">
                    Confirmi depunerea pentru {active.clientCount} clienți?
                  </DialogTitle>
                </div>
                <DialogDescription>{active.fullName}</DialogDescription>
              </DialogHeader>

              <div className="slim-scroll max-h-[240px] overflow-y-auto rounded-lg border border-border/70 bg-[hsl(40_30%_99%)] p-3">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-subtle">
                  Clienți incluși ({active.clientCount})
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 md:grid-cols-3">
                  {allClientNames.slice(0, Math.min(active.clientCount, 36)).map((c, i) => (
                    <div key={i} className="flex items-center justify-between gap-2 text-[11.5px]">
                      <span className="truncate text-ink">{c.name}</span>
                      <span className="shrink-0 font-mono text-[10.5px] text-ink-subtle">
                        {c.cui}
                      </span>
                    </div>
                  ))}
                </div>
                {active.clientCount > 36 && (
                  <div className="mt-2 text-center text-[11px] italic text-ink-subtle">
                    + încă {active.clientCount - 36} clienți
                  </div>
                )}
              </div>

              <div className="rounded-lg bg-sky-50 p-3 text-[12px] text-sky-900">
                <div className="flex items-center gap-1.5 font-medium">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Ce se întâmplă când apeși „Depune acum"
                </div>
                <ul className="mt-1.5 space-y-0.5 pl-5 text-sky-800 list-disc">
                  <li>Transmitere semnată digital la SPV ANAF pentru fiecare CUI</li>
                  <li>Număr de înregistrare (recipisă) salvat automat pe fișa clientului</li>
                  <li>Notificare pe email pentru clienții care au optat</li>
                </ul>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={closeDialog}>
                  Anulează
                </Button>
                <Button onClick={startSubmit} className="bg-[hsl(222_70%_18%)] hover:bg-[hsl(222_75%_22%)]">
                  Depune acum
                </Button>
              </DialogFooter>
            </>
          )}

          {active && phase === "submitting" && (
            <div className="space-y-4 py-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/10 text-sky-600">
                <Triangle className="h-5 w-5 animate-pulse-soft rotate-90" />
              </div>
              <div>
                <div className="font-serif text-[20px] font-medium text-ink">
                  Depun {active.code} la SPV ANAF…
                </div>
                <div className="mt-1 text-[12.5px] text-ink-muted">
                  Transmit {Math.min(active.clientCount, Math.ceil((progress / 100) * active.clientCount))} /{" "}
                  {active.clientCount} cereri semnate digital
                </div>
              </div>
              <div className="mx-auto max-w-sm">
                <div className="relative h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-sky-500 to-emerald-500 transition-[width] duration-150 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-2 font-mono text-[11px] tabular-nums text-ink-subtle">
                  {progress.toFixed(0)}%
                </div>
              </div>
            </div>
          )}

          {active && phase === "done" && (
            <div className="space-y-4">
              <DialogHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <DialogTitle className="text-center font-serif text-[22px]">
                  {active.code} depusă cu succes
                </DialogTitle>
                <DialogDescription className="text-center">
                  {active.clientCount}/{active.clientCount} recipise primite de la ANAF și salvate
                  pe fișele clienților.
                </DialogDescription>
              </DialogHeader>

              <div className="slim-scroll max-h-[220px] overflow-y-auto rounded-lg border border-border/70 bg-white p-3 font-mono text-[11.5px]">
                <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-wide text-ink-subtle">
                  Recipise ANAF
                </div>
                <ul className="space-y-1">
                  {allClientNames.slice(0, Math.min(active.clientCount, 12)).map((c, i) => (
                    <li key={i} className="flex items-center justify-between border-b border-border/60 py-1">
                      <span className="truncate text-[11px] text-ink">{c.name}</span>
                      <span className="text-emerald-700">
                        #INT-2026-{String(4820193 + i).padStart(7, "0")}
                      </span>
                    </li>
                  ))}
                  {active.clientCount > 12 && (
                    <li className="pt-1 text-center text-[10.5px] italic text-ink-subtle">
                      + încă {active.clientCount - 12} recipise generate
                    </li>
                  )}
                </ul>
              </div>

              <DialogFooter>
                <Button onClick={closeDialog} variant="outline">
                  Închide
                </Button>
                <Button asChild className="bg-[hsl(222_70%_18%)] hover:bg-[hsl(222_75%_22%)]">
                  <Link href="/saft">
                    Continuă la SAF-T cockpit
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DeclarationCard({
  decl,
  submitted,
  onAction,
}: {
  decl: Declaration;
  submitted: boolean;
  onAction: () => void;
}) {
  const isSaft = decl.code === "D406";
  const borderAccent = isSaft
    ? "border-amber-300/60 ring-1 ring-amber-200/50"
    : decl.statusVariant === "amber"
    ? "border-amber-200"
    : decl.statusVariant === "slate"
    ? "border-border/70"
    : "border-border/70";

  const variantColor: Record<string, string> = {
    green: "text-emerald-700",
    amber: "text-amber-800",
    slate: "text-slate-600",
    red: "text-rose-700",
    blue: "text-sky-700",
  };

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-xl border bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_8px_24px_-12px_hsl(222_30%_14%/0.15)]",
        borderAccent
      )}
    >
      {isSaft && (
        <div
          aria-hidden
          className="absolute inset-0 -z-0 opacity-80"
          style={{
            background:
              "radial-gradient(circle at 100% 0%, hsl(38 95% 60% / 0.08), transparent 55%)",
          }}
        />
      )}
      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11.5px] font-semibold uppercase tracking-wide text-ink-subtle">
              {decl.code}
            </span>
            {isSaft && (
              <Badge variant="amber" className="gap-1 text-[9.5px]">
                obligatoriu 2025
              </Badge>
            )}
            {submitted && (
              <Badge variant="green" className="gap-1 text-[9.5px]">
                <CheckCircle2 className="h-2.5 w-2.5" /> depusă
              </Badge>
            )}
          </div>
          <span className="flex items-center gap-1 text-[10.5px] text-ink-subtle">
            <CalendarCheck2 className="h-3 w-3" />
            {formatDateShort(decl.dueDate)}
          </span>
        </div>

        <div className="mt-3 font-serif text-[17px] font-medium leading-tight text-ink">
          {decl.shortName}
        </div>
        <p className="mt-1 text-[11.5px] leading-relaxed text-ink-muted">{decl.description}</p>

        <div className={cn("mt-3 flex items-center gap-1.5 text-[11.5px] font-medium", variantColor[decl.statusVariant])}>
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              decl.statusVariant === "green" && "bg-emerald-500",
              decl.statusVariant === "amber" && "bg-amber-500",
              decl.statusVariant === "red" && "bg-rose-500",
              decl.statusVariant === "blue" && "bg-sky-500",
              decl.statusVariant === "slate" && "bg-slate-400"
            )}
          />
          {submitted ? "Depusă · recipise primite" : decl.status}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-[11px] text-ink-subtle">
            <span className="font-mono tabular-nums text-ink">{decl.clientCount}</span> clienți
          </span>
          {isSaft ? (
            <Button asChild size="sm" className="bg-[hsl(222_70%_18%)] hover:bg-[hsl(222_75%_22%)]">
              <Link href="/saft">
                {decl.ctaLabel}
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          ) : submitted ? (
            <Button size="sm" variant="outline" disabled>
              <FileCheck2 className="h-3.5 w-3.5" />
              Depusă
            </Button>
          ) : (
            <Button
              size="sm"
              disabled={decl.ctaDisabled}
              onClick={onAction}
              className={
                decl.ctaDisabled
                  ? undefined
                  : "bg-[hsl(222_70%_18%)] hover:bg-[hsl(222_75%_22%)]"
              }
              variant={decl.ctaDisabled ? "outline" : "default"}
            >
              {decl.ctaDisabled && <Clock className="h-3.5 w-3.5" />}
              {decl.ctaLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

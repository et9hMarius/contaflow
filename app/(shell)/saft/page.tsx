"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Cpu,
  Database,
  Download,
  FileCog,
  Landmark,
  Layers,
  ShieldCheck,
  Sparkles,
  Users2,
  Warehouse,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StepHeader } from "@/components/step-header";
import { cn } from "@/lib/utils";
import { saftClients, type SaftClient } from "@/lib/mock-data";
import { useDemo } from "@/app/providers";

const SECTIONS = [
  { code: "GeneralLedgerAccounts", label: "Plan de conturi", validated: 247, total: 247, warnings: 0, errors: 0, icon: Landmark },
  { code: "Customers", label: "Clienți", validated: 89, total: 89, warnings: 0, errors: 0, icon: Users2 },
  { code: "Suppliers", label: "Furnizori", validated: 134, total: 134, warnings: 0, errors: 0, icon: Users2 },
  { code: "Products", label: "Produse / servicii", validated: 1203, total: 1203, warnings: 0, errors: 0, icon: Layers },
  { code: "Invoices", label: "Facturi", validated: 412, total: 412, warnings: 0, errors: 0, icon: FileCog },
  { code: "Payments", label: "Plăți", validated: 389, total: 389, warnings: 0, errors: 0, icon: Landmark },
  { code: "StockMovements", label: "Mișcări stoc", validated: 2041, total: 2108, warnings: 67, errors: 0, icon: Warehouse },
];

const WARNINGS = [
  "Linia 34 · StockMovements · cantitate stoc final negativă (-2 buc) pentru produsul PROD-A-12. Verifică intrările din 14.03.",
  "Linia 187 · StockMovements · diferență cost mediu ponderat 3,4% față de luna precedentă — investigație recomandată.",
  "Linia 402 · StockMovements · unitate de măsură lipsă pentru 4 mișcări — se aplică default 'buc'.",
  "Linia 1.891 · StockMovements · data document în afara perioadei de raportare (14.02.2026 în raport martie) — va fi exclusă automat.",
];

export default function SaftPage() {
  const { state, dispatch } = useDemo();
  const [selected, setSelected] = useState<SaftClient>(saftClients[7]); // Autoservice Tudor SRL (red)
  const [expandWarnings, setExpandWarnings] = useState(true);
  const [phase, setPhase] = useState<"idle" | "generating" | "done">(
    state.saftGenerated ? "done" : "idle"
  );
  const [sectionProgress, setSectionProgress] = useState(0);
  const [generatedClients, setGeneratedClients] = useState(0);

  const statusBuckets = useMemo(() => {
    return {
      validated: saftClients.filter((c) => c.status === "validat").length,
      warnings: saftClients.filter((c) => c.status === "avertismente").length,
      errors: saftClients.filter((c) => c.status === "erori").length,
    };
  }, []);

  const startGenerate = () => {
    setPhase("generating");
    setSectionProgress(0);
    setGeneratedClients(0);

    const totalSteps = SECTIONS.length;
    let currentStep = 0;
    const sectionTick = () => {
      currentStep += 1;
      setSectionProgress((currentStep / totalSteps) * 100);
      if (currentStep < totalSteps) {
        setTimeout(sectionTick, 320);
      } else {
        // then tick through the 15 clients
        let c = 0;
        const clientTick = () => {
          c += 1;
          setGeneratedClients(c);
          if (c < saftClients.length) {
            setTimeout(clientTick, 90);
          } else {
            setPhase("done");
            dispatch({ type: "GENERATE_SAFT" });
            toast.success("D406 SAF-T generat pentru 15 clienți", {
              description: "Fișiere XML validate schema XSD ANAF · 390 câmpuri/client",
              icon: <BadgeCheck className="h-4 w-4 text-emerald-400" />,
            });
          }
        };
        setTimeout(clientTick, 200);
      }
    };
    setTimeout(sectionTick, 260);
  };

  return (
    <div className="space-y-8">
      <StepHeader
        step={7}
        eyebrow="SAF-T · cockpit dedicat"
        title="SAF-T D406 — martie 2026"
        lede="15 clienți mici intră sub obligativitatea D406 din ianuarie 2025. 390 câmpuri per depunere, validate automat contra schemei XSD oficiale ANAF, înainte de trimitere."
      />

      {/* STATUS RIBBON */}
      <div className="flex items-center justify-between rounded-xl border border-border/70 bg-white px-5 py-4">
        <div className="flex items-center gap-6">
          <StatusPill
            tone="emerald"
            icon={<CheckCircle2 className="h-3.5 w-3.5" />}
            label={`${statusBuckets.validated} validați`}
          />
          <StatusPill
            tone="amber"
            icon={<AlertTriangle className="h-3.5 w-3.5" />}
            label={`${statusBuckets.warnings} cu avertismente`}
          />
          <StatusPill
            tone="rose"
            icon={<AlertTriangle className="h-3.5 w-3.5" />}
            label={`${statusBuckets.errors} cu erori`}
          />
        </div>
        <div className="flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1.5 text-[11.5px] text-primary">
          <Clock3 className="h-3.5 w-3.5" />
          <span>
            <strong className="font-semibold">~4 min</strong> per client cu ContaFlow ·{" "}
            <span className="text-ink-subtle line-through">2–3h manual</span>
          </span>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        {/* CLIENT LIST */}
        <div className="overflow-hidden rounded-xl border border-border/70 bg-white">
          <div className="border-b border-border/70 px-4 py-3">
            <div className="font-serif text-[14px] font-medium text-ink">
              15 clienți mici — D406
            </div>
            <div className="text-[11px] text-ink-subtle">Apasă pentru raport de validare</div>
          </div>
          <ul className="slim-scroll max-h-[520px] divide-y divide-border/60 overflow-y-auto">
            {saftClients.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setSelected(c)}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors",
                    selected.id === c.id
                      ? "bg-primary/[0.04]"
                      : "hover:bg-muted/40"
                  )}
                >
                  <span
                    className={cn(
                      "h-2 w-2 shrink-0 rounded-full",
                      c.status === "validat" && "bg-emerald-500",
                      c.status === "avertismente" && "bg-amber-500",
                      c.status === "erori" && "bg-rose-500"
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[12.5px] font-medium text-ink">
                      {c.name}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10.5px] text-ink-subtle">
                      <span className="font-mono">{c.cui}</span>
                      {c.warningCount !== undefined && (
                        <>
                          <span>·</span>
                          <span className="text-amber-700">{c.warningCount} avertismente</span>
                        </>
                      )}
                      {c.errorCount !== undefined && (
                        <>
                          <span>·</span>
                          <span className="text-rose-700">{c.errorCount} erori</span>
                        </>
                      )}
                    </div>
                  </div>
                  {selected.id === c.id && (
                    <ChevronRight className="h-3.5 w-3.5 text-primary" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* VALIDATION REPORT */}
        <div className="overflow-hidden rounded-xl border border-border/70 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <div className="flex items-start justify-between gap-3 border-b border-border/70 bg-[hsl(40_30%_99%)] px-5 py-4">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    selected.status === "validat" && "bg-emerald-500",
                    selected.status === "avertismente" && "bg-amber-500",
                    selected.status === "erori" && "bg-rose-500"
                  )}
                />
                <div className="font-serif text-[20px] font-medium tracking-tight text-ink">
                  {selected.name}
                </div>
                <Badge
                  variant={
                    selected.status === "validat"
                      ? "green"
                      : selected.status === "avertismente"
                      ? "amber"
                      : "red"
                  }
                >
                  {selected.status === "validat"
                    ? "Validat"
                    : selected.status === "avertismente"
                    ? "Cu avertismente"
                    : "Cu erori"}
                </Badge>
              </div>
              <div className="mt-0.5 flex items-center gap-3 text-[11.5px] text-ink-subtle">
                <span>
                  CUI <span className="font-mono text-ink-muted">{selected.cui}</span>
                </span>
                <span>·</span>
                <span>390 câmpuri · 7 secțiuni</span>
                <span>·</span>
                <span>martie 2026</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Cpu className="h-3.5 w-3.5" />
                Re-validează
              </Button>
            </div>
          </div>

          <div className="p-5">
            <div className="space-y-2.5">
              {SECTIONS.map((s) => {
                const Icon = s.icon;
                const pct = Math.round((s.validated / s.total) * 100);
                const hasWarnings = s.warnings > 0;
                return (
                  <div
                    key={s.code}
                    className={cn(
                      "flex items-center gap-4 rounded-lg border px-4 py-2.5",
                      hasWarnings
                        ? "border-amber-200/80 bg-amber-50/50"
                        : "border-border/60 bg-white"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
                        hasWarnings
                          ? "bg-amber-500/10 text-amber-700"
                          : "bg-emerald-500/10 text-emerald-700"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-wide text-ink-subtle">
                            {s.code}
                          </span>
                          <div className="text-[13px] font-medium text-ink">{s.label}</div>
                        </div>
                        <div className="flex items-center gap-3 text-[11.5px]">
                          <span className="font-mono tabular-nums text-ink">
                            {s.validated.toLocaleString("ro-RO")} / {s.total.toLocaleString("ro-RO")}
                          </span>
                          {hasWarnings ? (
                            <Badge variant="amber" className="text-[10px]">
                              {s.warnings} avertismente
                            </Badge>
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          )}
                        </div>
                      </div>
                      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn(
                            "h-full",
                            hasWarnings ? "bg-amber-500" : "bg-emerald-500"
                          )}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* WARNINGS EXPANDER */}
            <div className="mt-4 overflow-hidden rounded-lg border border-amber-200/80 bg-amber-50/30">
              <button
                onClick={() => setExpandWarnings((v) => !v)}
                className="flex w-full items-center justify-between px-4 py-3"
              >
                <div className="flex items-center gap-2 text-[12.5px] font-medium text-amber-900">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  67 avertismente StockMovements — apasă pentru detalii
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-amber-700 transition-transform",
                    expandWarnings && "rotate-180"
                  )}
                />
              </button>
              {expandWarnings && (
                <ul className="space-y-1.5 border-t border-amber-200/60 bg-white/60 px-4 py-3 text-[12px] text-amber-950">
                  {WARNINGS.map((w, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                      <span className="leading-relaxed">{w}</span>
                    </li>
                  ))}
                  <li className="pt-1 text-[10.5px] italic text-amber-700">
                    + încă 63 avertismente similare · se poate auto-remedia
                  </li>
                </ul>
              )}
            </div>

            {/* GENERATE ACTION */}
            <div className="mt-5">
              {phase === "idle" && (
                <Button
                  onClick={startGenerate}
                  className="h-11 w-full rounded-lg bg-[hsl(222_70%_18%)] hover:bg-[hsl(222_75%_22%)]"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Generează XML SAF-T D406 — 15 clienți
                </Button>
              )}

              {phase === "generating" && (
                <div className="space-y-3 rounded-lg border border-border/70 bg-white p-4">
                  <div className="flex items-center justify-between text-[12.5px]">
                    <div className="flex items-center gap-2 text-ink-muted">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-sky-400" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
                      </span>
                      Validare și generare XML SAF-T
                    </div>
                    <span className="font-mono tabular-nums text-ink-muted">
                      {generatedClients} / 15 clienți
                    </span>
                  </div>
                  <Progress value={(generatedClients / 15) * 100} indicatorClassName="bg-gradient-to-r from-primary via-sky-500 to-emerald-500" />
                  <div className="grid grid-cols-7 gap-1">
                    {SECTIONS.map((s, i) => (
                      <div
                        key={s.code}
                        className={cn(
                          "rounded-sm border px-1.5 py-1 text-[9.5px] transition-all",
                          (i + 1) * (100 / SECTIONS.length) <= sectionProgress
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
                            : "border-border/60 bg-muted/30 text-ink-subtle"
                        )}
                      >
                        <div className="truncate font-mono">{s.code}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {phase === "done" && (
                <div className="rounded-lg border border-emerald-200/80 bg-gradient-to-br from-emerald-50/70 via-white to-white p-4 animate-fade-in">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="h-5 w-5 text-emerald-600" />
                        <div className="font-serif text-[18px] font-medium text-ink">
                          15 fișiere D406.xml generate
                        </div>
                      </div>
                      <div className="mt-1 text-[12px] text-ink-muted">
                        Validate contra schemei XSD ANAF · 5.850 câmpuri confirmate · gata
                        pentru depunere SPV
                      </div>
                      <div className="mt-3 flex items-center gap-3 text-[11px] text-ink-subtle">
                        <span className="inline-flex items-center gap-1">
                          <Database className="h-3 w-3" />
                          17,2 MB
                        </span>
                        <span>·</span>
                        <span>acum {Math.floor(Math.random() * 5 + 1)} secunde</span>
                      </div>
                    </div>
                    <Button className="bg-[hsl(222_70%_18%)] hover:bg-[hsl(222_75%_22%)]">
                      <Download className="h-4 w-4" />
                      Descarcă
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-border/70 bg-gradient-to-br from-primary/5 to-transparent p-5 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 shrink-0 text-primary" />
          <div>
            <div className="font-serif text-[15px] font-medium text-ink">
              Timp mediu per client cu ContaFlow: 4 minute
            </div>
            <div className="text-[12px] text-ink-muted">
              Pregătire manuală D406: 2–3 ore per client · 15 clienți × 2,5h ≈ 37,5h manual vs 1h cu ContaFlow
            </div>
          </div>
        </div>
        <Button asChild className="bg-[hsl(222_70%_18%)] hover:bg-[hsl(222_75%_22%)]">
          <Link href="/summary">
            Rezumatul zilei
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function StatusPill({
  tone,
  icon,
  label,
}: {
  tone: "emerald" | "amber" | "rose";
  icon: React.ReactNode;
  label: string;
}) {
  const cls =
    tone === "emerald"
      ? "text-emerald-700"
      : tone === "amber"
      ? "text-amber-800"
      : "text-rose-700";
  const dot =
    tone === "emerald"
      ? "bg-emerald-500"
      : tone === "amber"
      ? "bg-amber-500"
      : "bg-rose-500";
  return (
    <div className={cn("flex items-center gap-2 text-[13px] font-medium", cls)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
      <span>{icon}</span>
      {label}
    </div>
  );
}

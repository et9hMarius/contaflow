"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  CloudDownload,
  FileCheck2,
  Layers,
  Lock,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { StepHeader } from "@/components/step-header";
import { cn } from "@/lib/utils";
import { spvLogLines } from "@/lib/mock-data";
import { useDemo } from "@/app/providers";

export default function SpvPullPage() {
  const { dispatch, state } = useDemo();
  const [progress, setProgress] = useState(state.spvPullCompleted ? 100 : 0);
  const [logCount, setLogCount] = useState(state.spvPullCompleted ? spvLogLines.length : 0);
  const [done, setDone] = useState(state.spvPullCompleted);
  const [scheduleOn, setScheduleOn] = useState(true);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (done) return;
    let cancelled = false;
    const totalDurationMs = 4200;

    // progress animation
    const start = performance.now();
    const tick = () => {
      if (cancelled) return;
      const elapsed = performance.now() - start;
      const pct = Math.min(100, (elapsed / totalDurationMs) * 100);
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // streaming log — accelerating pace
    let i = 0;
    const push = () => {
      if (cancelled) return;
      i += 1;
      setLogCount(i);
      if (i >= spvLogLines.length) {
        setDone(true);
        dispatch({ type: "COMPLETE_SPV_PULL" });
        return;
      }
      const nextDelay = 120 + Math.random() * 120;
      setTimeout(push, nextDelay);
    };
    setTimeout(push, 180);

    return () => {
      cancelled = true;
    };
  }, [done, dispatch]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logCount]);

  const visibleLog = spvLogLines.slice(0, logCount);

  return (
    <div className="space-y-8">
      <StepHeader
        step={3}
        eyebrow="SPV · e-Factura"
        title="Preluare automată e-Factura din SPV"
        lede="ContaFlow se conectează zilnic la SPV pentru fiecare client și descarcă toate facturile B2B. ANAF păstrează datele doar 60 de zile — noi le arhivăm permanent, indexate și căutabile."
      />

      {/* Feature strip */}
      <div className="grid gap-3 sm:grid-cols-3">
        <FeaturePill
          icon={<Lock className="h-4 w-4" />}
          title="Certificat digital calificat"
          desc="Autentificare cu token USB — un singur setup, preluare automată pentru toți clienții"
        />
        <FeaturePill
          icon={<ShieldCheck className="h-4 w-4" />}
          title="Conform GDPR, găzduit în UE"
          desc="Stocare criptată AES-256 în regiunea Frankfurt — jurnal de audit complet"
        />
        <FeaturePill
          icon={<CalendarClock className="h-4 w-4" />}
          title="Arhivare > 60 zile"
          desc="ANAF șterge facturile după 60 zile — ContaFlow le păstrează permanent"
        />
      </div>

      {/* Main pull card */}
      <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-white shadow-[0_10px_40px_-20px_hsl(222_30%_14%/0.15)]">
        {/* header */}
        <div className="flex items-center justify-between border-b border-border/70 bg-[hsl(222_30%_11%)] px-5 py-3 text-[hsl(40_30%_97%)]">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10">
              <Wifi className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[13px] font-medium">Sesiune SPV · 27.04.2026 09:14</div>
              <div className="flex items-center gap-1.5 text-[11px] text-white/60">
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className={cn(
                      "absolute inline-flex h-full w-full rounded-full",
                      done ? "bg-emerald-400" : "animate-pulse-soft bg-amber-400"
                    )}
                  />
                  <span
                    className={cn(
                      "relative inline-flex h-1.5 w-1.5 rounded-full",
                      done ? "bg-emerald-500" : "bg-amber-500"
                    )}
                  />
                </span>
                {done ? "Finalizat" : "În desfășurare"} · 47 clienți în procesare
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex cursor-pointer items-center gap-2 text-[11.5px] text-white/70">
              <span className="hidden sm:inline">Preluare automată zilnic la 06:00</span>
              <button
                type="button"
                onClick={() => setScheduleOn((v) => !v)}
                className={cn(
                  "relative flex h-5 w-9 items-center rounded-full transition-colors",
                  scheduleOn ? "bg-emerald-500/90" : "bg-white/15"
                )}
              >
                <span
                  className={cn(
                    "absolute h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
                    scheduleOn ? "translate-x-[18px]" : "translate-x-0.5"
                  )}
                />
              </button>
            </label>
          </div>
        </div>

        {/* Progress */}
        <div className="border-b border-border/70 px-6 py-5">
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-ink-muted">
              Descărcare facturi B2B din SPV ANAF pentru {Math.min(47, Math.ceil((progress / 100) * 47))} / 47 clienți
            </span>
            <span className="font-mono text-ink tabular-nums">{progress.toFixed(0)}%</span>
          </div>
          <div className="relative mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-sky-500 to-emerald-500 transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute inset-y-0 left-0 bg-[linear-gradient(90deg,transparent_0%,hsl(0_0%_100%/0.5)_50%,transparent_100%)] bg-[length:200%_100%] animate-shimmer mix-blend-overlay"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Log terminal */}
        <div className="bg-[hsl(222_30%_11%)] text-[hsl(40_30%_92%)]">
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
              <span className="ml-3 font-mono text-[10.5px] uppercase tracking-wide text-white/40">
                contaflow / spv-pull / log
              </span>
            </div>
            <span className="font-mono text-[10.5px] text-white/40">
              {logCount} / {spvLogLines.length} lines
            </span>
          </div>
          <div ref={logRef} className="slim-scroll max-h-[360px] overflow-y-auto px-5 py-4 stream-log">
            {visibleLog.map((line, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-3 animate-fade-in",
                  line.kind === "ok" && "text-emerald-300",
                  line.kind === "warn" && "text-amber-300",
                  line.kind === "progress" && "text-sky-300",
                  line.kind === "info" && "text-white/80"
                )}
              >
                <span className="shrink-0 text-white/30">[{line.time}]</span>
                <span className="min-w-0 flex-1">{line.text}</span>
              </div>
            ))}
            {!done && (
              <div className="mt-2 flex items-center gap-2 text-white/40">
                <span className="inline-block h-3 w-2 animate-pulse-soft bg-emerald-300" />
                <span className="font-mono text-[11px]">streaming…</span>
              </div>
            )}
          </div>
        </div>

        {/* Summary when done */}
        {done && (
          <div className="relative animate-fade-in border-t border-border/70 bg-gradient-to-br from-[hsl(40_30%_99%)] to-white px-6 py-6">
            <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              Sincronizare completă
            </div>
            <div className="mt-3 grid gap-4 sm:grid-cols-3">
              <BigStat
                icon={<Layers className="h-3.5 w-3.5" />}
                value="1.247"
                label="documente procesate"
                accent="primary"
              />
              <BigStat
                icon={<Sparkles className="h-3.5 w-3.5" />}
                value="89%"
                label="potrivire automată cu docs clienți"
                accent="emerald"
              />
              <BigStat
                icon={<FileCheck2 className="h-3.5 w-3.5" />}
                value="14"
                label="documente necesită verificare manuală"
                accent="amber"
              />
            </div>

            <div className="mt-6 flex flex-col justify-between gap-3 border-t border-border/60 pt-5 sm:flex-row sm:items-center">
              <div className="text-[12.5px] text-ink-muted">
                Următorul pas: revizuirea celor{" "}
                <span className="font-medium text-ink">14 documente</span> și export către Saga.
              </div>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href="/categorize">
                    Vezi documentele pentru verificare
                  </Link>
                </Button>
                <Button asChild className="bg-[hsl(222_70%_18%)] hover:bg-[hsl(222_75%_22%)]">
                  <Link href="/categorize">
                    Continuă la categorizare
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {!done && (
        <div className="flex items-center justify-between rounded-lg border border-border/70 bg-white px-4 py-2.5 text-[12px] text-ink-muted">
          <div className="flex items-center gap-2">
            <CloudDownload className="h-4 w-4 text-ink-subtle" />
            Se descarcă documente din SPV — estimat ~4s
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setDone(false);
              setProgress(0);
              setLogCount(0);
            }}
            disabled
          >
            <RefreshCcw className="h-3.5 w-3.5" /> Reia
          </Button>
        </div>
      )}
    </div>
  );
}

function FeaturePill({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-3 rounded-xl border border-border/70 bg-white p-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/5 text-primary">
        {icon}
      </div>
      <div>
        <div className="text-[13px] font-semibold text-ink">{title}</div>
        <div className="text-[11.5px] leading-relaxed text-ink-muted">{desc}</div>
      </div>
    </div>
  );
}

function BigStat({
  icon,
  value,
  label,
  accent,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  accent: "primary" | "emerald" | "amber";
}) {
  const accentClass =
    accent === "emerald"
      ? "text-emerald-700 bg-emerald-50"
      : accent === "amber"
      ? "text-amber-800 bg-amber-50"
      : "text-primary bg-primary/5";
  return (
    <div className="rounded-xl border border-border/70 bg-white p-4">
      <div
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.08em]",
          accentClass
        )}
      >
        {icon}
        {label.split(" ").slice(0, 2).join(" ")}
      </div>
      <div className="mt-3 font-serif text-[38px] font-medium leading-none tracking-tight tabular-nums text-ink">
        {value}
      </div>
      <div className="mt-1 text-[12px] text-ink-muted">{label}</div>
    </div>
  );
}

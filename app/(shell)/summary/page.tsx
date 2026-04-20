"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  FileCheck2,
  MoveRight,
  PartyPopper,
  Quote,
  RefreshCcw,
  Sparkles,
  Star,
  TrendingDown,
  Wand2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StepHeader } from "@/components/step-header";
import { cn } from "@/lib/utils";
import { comparisonRows, summaryTimeline } from "@/lib/mock-data";
import { useDemo } from "@/app/providers";

const PLANS = [
  {
    id: "Starter",
    price: "€25",
    tagline: "pentru firme cu până la 20 clienți",
    features: [
      "Preluare zilnică din SPV e-Factura",
      "OCR & categorizare automată",
      "Export Saga / WinMentor / Ciel",
      "Declarații D112, D300, D394 automate",
      "Suport email",
    ],
  },
  {
    id: "Professional",
    price: "€49",
    tagline: "pentru firme cu până la 50 clienți",
    recommended: true,
    features: [
      "Tot din Starter",
      "SAF-T D406 cockpit · 15+ clienți small",
      "Potrivire automată SPV ↔ docs 89%+",
      "Reminder automat WhatsApp / email",
      "Suport prioritar chat",
    ],
  },
  {
    id: "Firma",
    price: "€89",
    tagline: "pentru firme cu până la 150 clienți",
    features: [
      "Tot din Professional",
      "Multi-user (juniori + senior CECCAR)",
      "Jurnal de audit complet + istoric 5 ani",
      "Integrare custom API bookkeeping",
      "Account manager dedicat",
    ],
  },
];

export default function SummaryPage() {
  const router = useRouter();
  const { dispatch } = useDemo();
  const [pricingOpen, setPricingOpen] = useState(false);
  const [clients, setClients] = useState(35);
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");

  const [confetti, setConfetti] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setConfetti(false), 4200);
    return () => clearTimeout(t);
  }, []);

  const restart = () => {
    dispatch({ type: "RESET" });
    router.push("/");
  };

  const recommended = clients <= 20 ? "Starter" : clients <= 50 ? "Professional" : "Firma";
  const annualMultiplier = billing === "annual" ? 0.8 : 1;

  return (
    <div className="relative space-y-10">
      {confetti && <Confetti />}

      <StepHeader
        step={8}
        eyebrow="Rezumat"
        title="Închiderea lunii martie 2026 — gata."
        lede="47 de clienți, 1.247 de documente, 12 declarații. Închis în 2 ore și 14 minute, față de 3–5 zile de lucru manual."
      />

      {/* BIG STATS */}
      <div className="grid gap-4 lg:grid-cols-3">
        <PayoffStat
          icon={<TrendingDown className="h-4 w-4" />}
          accent="amber"
          eyebrow="timp economisit"
          value="~31h"
          caption="față de media de 33h pentru o firmă de această mărime"
        />
        <PayoffStat
          icon={<Wand2 className="h-4 w-4" />}
          accent="primary"
          eyebrow="documente procesate automat"
          value="1.233"
          subValue="din 1.247"
          caption="98,9% — doar 14 au necesitat revizuire umană"
        />
        <PayoffStat
          icon={<FileCheck2 className="h-4 w-4" />}
          accent="emerald"
          eyebrow="declarații depuse"
          value="12"
          subValue="din 12"
          caption="toate cu recipisă ANAF · 100% la timp"
        />
      </div>

      {/* TIMELINE */}
      <div className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-[0_10px_40px_-20px_hsl(222_30%_14%/0.12)]">
        <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
          <div>
            <div className="font-serif text-[17px] font-medium tracking-tight text-ink">
              Cronologia închiderii · 27 aprilie 2026
            </div>
            <div className="text-[11.5px] text-ink-subtle">
              De când Maria ajunge la birou până la ultima declarație depusă
            </div>
          </div>
          <Badge variant="blue" className="gap-1.5">
            <Clock className="h-3 w-3" />
            2h 14min total
          </Badge>
        </div>

        <div className="relative px-6 py-10">
          {/* horizontal rail */}
          <div className="absolute left-10 right-10 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />

          <ol className="relative flex items-center justify-between gap-3">
            {summaryTimeline.map((t, i) => (
              <li key={i} className="relative flex flex-1 flex-col items-center text-center">
                <div className="font-mono text-[11.5px] font-semibold tabular-nums text-ink-subtle">
                  {t.time}
                </div>
                <div className="relative my-2 flex h-6 w-6 items-center justify-center">
                  <span className="absolute h-6 w-6 rounded-full bg-primary/10" />
                  <span className="relative flex h-3 w-3 items-center justify-center rounded-full bg-primary">
                    <CheckCircle2 className="h-2.5 w-2.5 text-white" />
                  </span>
                </div>
                <div className="max-w-[150px] text-[11.5px] leading-tight text-ink-muted">
                  {t.label}
                </div>
              </li>
            ))}
            <li className="relative flex flex-col items-center text-center">
              <div className="font-mono text-[11.5px] font-semibold tabular-nums text-emerald-700">
                11:28
              </div>
              <div className="relative my-2 flex h-6 w-6 items-center justify-center">
                <span className="absolute h-6 w-6 rounded-full bg-emerald-500/15" />
                <span className="relative flex h-3 w-3 items-center justify-center rounded-full bg-emerald-600">
                  <Star className="h-2 w-2 text-white" />
                </span>
              </div>
              <div className="max-w-[120px] text-[11.5px] font-semibold leading-tight text-emerald-800">
                Închidere completă
              </div>
            </li>
          </ol>
        </div>
      </div>

      {/* COMPARISON */}
      <div className="overflow-hidden rounded-2xl border border-border/70 bg-white">
        <div className="grid gap-px bg-border/70 md:grid-cols-2">
          <div className="bg-white p-6">
            <div className="flex items-center gap-2">
              <Badge variant="red" className="text-[10px]">
                fără ContaFlow
              </Badge>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-subtle">
                3–5 zile de lucru
              </span>
            </div>
            <ul className="mt-4 space-y-2">
              {comparisonRows.map((r) => (
                <li key={r.step} className="flex items-start gap-3 text-[12.5px]">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400/80" />
                  <div className="flex-1">
                    <div className="text-ink">{r.step}</div>
                    <div className="text-[11px] text-rose-700/80">{r.without}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-lg border border-rose-200/80 bg-rose-50/60 px-4 py-3">
              <div className="text-[10.5px] font-semibold uppercase tracking-wide text-rose-700">
                Total
              </div>
              <div className="font-serif text-[22px] font-medium text-rose-900">
                3–5 zile de lucru · ~33h
              </div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-[hsl(222_70%_98%)] via-white to-white p-6">
            <div className="flex items-center gap-2">
              <Badge variant="green" className="text-[10px]">
                cu ContaFlow
              </Badge>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                2h 14min
              </span>
            </div>
            <ul className="mt-4 space-y-2">
              {comparisonRows.map((r) => (
                <li key={r.step} className="flex items-start gap-3 text-[12.5px]">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <div className="flex-1">
                    <div className="text-ink">{r.step}</div>
                    <div className="text-[11px] text-emerald-700">{r.withCF}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-lg border border-emerald-200/80 bg-emerald-50/60 px-4 py-3">
              <div className="text-[10.5px] font-semibold uppercase tracking-wide text-emerald-700">
                Total
              </div>
              <div className="font-serif text-[22px] font-medium text-emerald-900">
                2 ore și 14 minute
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIAL */}
      <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-[hsl(222_30%_11%)] p-8 text-[hsl(40_30%_96%)] shadow-[0_20px_50px_-24px_hsl(222_30%_14%/0.4)]">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 0% 0%, hsl(38 95% 60% / 0.12), transparent 55%), radial-gradient(circle at 100% 100%, hsl(222 100% 60% / 0.1), transparent 55%)",
          }}
        />
        <div className="relative grid gap-8 md:grid-cols-[80px_1fr_auto] md:items-center">
          <Quote className="h-14 w-14 text-amber-300/70" />
          <div>
            <p className="font-serif text-[22px] italic leading-snug text-white md:text-[26px]">
              „Prima dată când n-am mai stat trei zile peste weekend să închei luna. Clienții care
              trimit documentele direct prin WhatsApp, facturile venite automat din SPV — efectiv
              îmi dă înapoi seară de seară."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-[12px] font-semibold text-white">
                MP
              </div>
              <div>
                <div className="text-[13px] font-semibold">Maria Popescu</div>
                <div className="text-[11px] text-white/60">
                  Expert contabil CECCAR · beta user · 47 clienți · Cluj-Napoca
                </div>
              </div>
            </div>
          </div>
          <div className="hidden rounded-xl border border-white/10 bg-white/[0.04] p-4 md:block">
            <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-amber-200">
              <Award className="h-3 w-3" /> Cohortă beta
            </div>
            <div className="mt-2 font-serif text-[28px] font-medium text-white">22</div>
            <div className="text-[11px] text-white/60">
              firme de contabilitate folosesc deja ContaFlow în pilot
            </div>
          </div>
        </div>
      </div>

      {/* CTA STRIP */}
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border/70 bg-gradient-to-br from-primary/5 via-white to-white p-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary ring-1 ring-primary/20">
          <Sparkles className="h-3 w-3" />
          Demo terminat
        </div>
        <h2 className="font-serif text-[28px] font-medium tracking-tight text-ink sm:text-[32px]">
          Gata să închizi luna în câteva ore, nu câteva zile?
        </h2>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button
            size="lg"
            onClick={() => setPricingOpen(true)}
            className="h-12 rounded-full bg-[hsl(222_70%_18%)] px-6 hover:bg-[hsl(222_75%_22%)]"
          >
            Vezi cât te-ar costa pentru firma ta
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="ghost" onClick={restart}>
            <RefreshCcw className="h-4 w-4" />
            Rulează demo-ul din nou
          </Button>
        </div>
      </div>

      {/* PRICING DIALOG */}
      <Dialog open={pricingOpen} onOpenChange={setPricingOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-[26px]">
              Cât te-ar costa ContaFlow pentru firma ta?
            </DialogTitle>
            <DialogDescription>
              Toate planurile includ: SPV pull, OCR, Saga/WinMentor/Ciel export, SAF-T cockpit,
              declarații automate. Anulează oricând.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-xl border border-border/70 bg-[hsl(40_30%_99%)] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <label className="text-[12.5px] font-medium text-ink">
                  Câți clienți are firma ta?
                </label>
                <input
                  type="range"
                  min={5}
                  max={150}
                  value={clients}
                  onChange={(e) => setClients(Number(e.target.value))}
                  className="h-1.5 w-44 appearance-none rounded-full bg-muted accent-[hsl(222_70%_24%)]"
                />
                <span className="font-serif text-[18px] font-medium tabular-nums text-ink">
                  {clients}
                </span>
              </div>

              <div className="inline-flex rounded-full border border-border bg-white p-0.5 text-[12px]">
                <button
                  onClick={() => setBilling("monthly")}
                  className={cn(
                    "rounded-full px-3 py-1 transition-colors",
                    billing === "monthly"
                      ? "bg-primary text-primary-foreground"
                      : "text-ink-muted"
                  )}
                >
                  Lunar
                </button>
                <button
                  onClick={() => setBilling("annual")}
                  className={cn(
                    "rounded-full px-3 py-1 transition-colors",
                    billing === "annual"
                      ? "bg-primary text-primary-foreground"
                      : "text-ink-muted"
                  )}
                >
                  Anual <span className={billing === "annual" ? "text-amber-300" : "text-emerald-700"}>−20%</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {PLANS.map((p) => {
              const basePrice = Number(p.price.replace("€", ""));
              const price = Math.round(basePrice * annualMultiplier);
              const isRec = p.id === recommended;
              return (
                <div
                  key={p.id}
                  className={cn(
                    "relative flex flex-col overflow-hidden rounded-xl border p-5 transition-all",
                    isRec
                      ? "border-primary bg-gradient-to-br from-white via-white to-primary/5 shadow-[0_10px_40px_-20px_hsl(222_70%_24%/0.35)]"
                      : "border-border/70 bg-white"
                  )}
                >
                  {isRec && (
                    <div className="absolute right-0 top-0 rounded-bl-lg rounded-tr-xl bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
                      recomandat
                    </div>
                  )}
                  <div className="text-[12px] font-semibold uppercase tracking-wide text-ink-subtle">
                    {p.id}
                  </div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="font-serif text-[34px] font-medium tabular-nums text-ink">
                      €{price}
                    </span>
                    <span className="text-[11.5px] text-ink-subtle">/lună</span>
                  </div>
                  <div className="text-[11.5px] text-ink-muted">{p.tagline}</div>
                  <ul className="mt-4 space-y-1.5 text-[12px]">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-1.5">
                        <CheckCircle2
                          className={cn(
                            "mt-0.5 h-3.5 w-3.5 shrink-0",
                            isRec ? "text-primary" : "text-emerald-600"
                          )}
                        />
                        <span className="text-ink-muted">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={cn(
                      "mt-5 w-full",
                      isRec
                        ? "bg-[hsl(222_70%_18%)] hover:bg-[hsl(222_75%_22%)]"
                        : "bg-white text-primary ring-1 ring-primary/30 hover:bg-primary/5"
                    )}
                  >
                    Alege {p.id}
                    <MoveRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between rounded-lg bg-muted/40 px-4 py-3 text-[11.5px] text-ink-muted">
            <div className="flex items-center gap-2">
              <PartyPopper className="h-3.5 w-3.5 text-amber-600" />
              Prima lună gratuită · setup inclus · migrare date asistată
            </div>
            <button onClick={restart} className="underline hover:text-ink">
              Restart demo ↻
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PayoffStat({
  icon,
  accent,
  eyebrow,
  value,
  subValue,
  caption,
}: {
  icon: React.ReactNode;
  accent: "primary" | "emerald" | "amber";
  eyebrow: string;
  value: string;
  subValue?: string;
  caption: string;
}) {
  const accentBg =
    accent === "emerald"
      ? "from-emerald-500/10 to-emerald-500/0"
      : accent === "amber"
      ? "from-amber-500/15 to-amber-500/0"
      : "from-primary/10 to-primary/0";
  const accentText =
    accent === "emerald"
      ? "text-emerald-700"
      : accent === "amber"
      ? "text-amber-800"
      : "text-primary";
  const valueText =
    accent === "emerald"
      ? "text-emerald-800"
      : accent === "amber"
      ? "text-amber-900"
      : "text-ink";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-white p-6">
      <div className={cn("absolute inset-x-0 top-0 h-20 bg-gradient-to-b", accentBg)} />
      <div className="relative">
        <div className={cn("inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em]", accentText)}>
          {icon}
          {eyebrow}
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span
            className={cn(
              "font-serif text-[54px] font-medium leading-none tracking-tight tabular-nums",
              valueText
            )}
          >
            {value}
          </span>
          {subValue && (
            <span className="text-[14px] font-medium text-ink-muted">{subValue}</span>
          )}
        </div>
        <div className="mt-3 text-[12.5px] leading-relaxed text-ink-muted">{caption}</div>
      </div>
    </div>
  );
}

function Confetti() {
  // lightweight CSS confetti — no runtime deps
  const pieces = Array.from({ length: 42 });
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 1.5;
        const duration = 3 + Math.random() * 1.5;
        const rotate = Math.random() * 360;
        const colors = ["#f59e0b", "#10b981", "#0ea5e9", "#ef4444", "#8b5cf6", "#1e3a8a"];
        const color = colors[i % colors.length];
        const size = 6 + Math.random() * 8;
        return (
          <span
            key={i}
            className="absolute top-[-20px] block"
            style={{
              left: `${left}%`,
              width: size,
              height: size * 0.4,
              background: color,
              transform: `rotate(${rotate}deg)`,
              animation: `confetti-fall ${duration}s ${delay}s ease-in forwards`,
              borderRadius: 2,
            }}
          />
        );
      })}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Database,
  Download,
  FileCheck2,
  FileText,
  Hand,
  Layers,
  LineChart,
  Lock,
  Mail,
  MessageCircle,
  MoveRight,
  PlayCircle,
  Quote,
  Send,
  ShieldCheck,
  Sparkles,
  Timer,
  TrendingDown,
  Users,
  Wand2,
  Zap,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LeadForm } from "@/components/landing/lead-form";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#probleme", label: "Problema" },
  { href: "#cum-functioneaza", label: "Cum funcționează" },
  { href: "#integrari", label: "Integrări" },
  { href: "#preturi", label: "Prețuri" },
  { href: "#faq", label: "FAQ" },
];

export default function LandingPage() {
  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[hsl(40_30%_98.5%)]">
      <StickyNav />
      <Hero />
      <SocialProofRibbon />
      <ProblemSection />
      <HowItWorksSection />
      <InteractiveDemoCta />
      <DifferentiatorsSection />
      <IntegrationsSection />
      <TestimonialSection />
      <PricingSection />
      <FaqSection />
      <FinalCtaSection />
      <Footer />
    </div>
  );
}

/* ---------------- STICKY NAV ---------------- */

function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex items-center justify-between px-6 py-3 transition-colors lg:px-10",
        scrolled
          ? "border-b border-border/50 bg-[hsl(40_30%_98.5%_/_0.88)] backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="flex items-center gap-6">
        <Link href="#top" aria-label="ContaFlow">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-5 text-[13px] text-ink-muted lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <Link href="/demo" className="inline-flex items-center gap-1 text-ink-muted transition-colors hover:text-ink">
            <PlayCircle className="h-3.5 w-3.5" />
            Demo
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/demo"
          className="hidden text-[13px] font-medium text-ink-muted transition-colors hover:text-ink sm:inline"
        >
          Vezi demo
        </Link>
        <a
          href="#pilot"
          className="group inline-flex h-9 items-center gap-2 rounded-full bg-[hsl(222_70%_18%)] pl-4 pr-1.5 text-[13px] font-medium text-primary-foreground shadow-[0_6px_20px_-8px_hsl(222_70%_24%/0.5)] transition-all hover:bg-[hsl(222_75%_22%)]"
        >
          Înscrie-te în pilot
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </a>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  return (
    <section id="top" className="relative px-6 pb-20 pt-12 lg:px-10 lg:pb-28 lg:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -right-32 -top-40 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,hsl(222_70%_24%_/_0.07),transparent_65%)]" />
        <div className="absolute -left-40 top-80 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,hsl(38_95%_60%_/_0.08),transparent_65%)]" />
      </div>

      <div className="mx-auto grid max-w-[1180px] items-start gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-ink-muted backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Beta privat · acceptăm 30 de firme
          </div>

          <h1 className="mt-5 font-serif text-[46px] font-medium leading-[1.02] tracking-tight text-ink sm:text-[62px] lg:text-[68px]">
            Închide luna în{" "}
            <span className="relative inline-block">
              <span className="relative z-10 italic">câteva ore,</span>
              <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-amber-200/70 sm:h-4" />
            </span>
            <br />
            nu câteva zile.
          </h1>

          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-muted sm:text-[17.5px]">
            ContaFlow automatizează tot ce urăști la închiderea lunii —{" "}
            <strong className="font-semibold text-ink">pull SPV e-Factura</strong>,{" "}
            <strong className="font-semibold text-ink">OCR și categorizare</strong>,{" "}
            <strong className="font-semibold text-ink">export Saga</strong>, declarațiile ANAF și
            SAF-T D406 — pentru firme de contabilitate cu{" "}
            <strong className="font-semibold text-ink">20–150 clienți</strong>.
          </p>

          <div id="pilot" className="mt-7 space-y-3">
            <LeadForm
              source="hero"
              variant="inline"
              placeholder="email@firmata.ro"
              buttonLabel="Rezervă acces beta"
            />
            <div className="flex items-center gap-3 text-[12px] text-ink-subtle">
              <span className="inline-flex items-center gap-1">
                <Check className="h-3 w-3 text-emerald-600" />
                Zero spam
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Check className="h-3 w-3 text-emerald-600" />
                GDPR-compliant
              </span>
              <span>·</span>
              <Link href="/demo" className="inline-flex items-center gap-1 underline-offset-4 hover:text-ink hover:underline">
                sau testează demo-ul interactiv <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Tiny stat row */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border/60 pt-6 text-[12px]">
            <Mini value="2h 14m" label="închidere medie în beta" />
            <span className="text-border">·</span>
            <Mini value="98,9%" label="documente categorizate automat" />
            <span className="text-border">·</span>
            <Mini value="4 min" label="per client SAF-T D406" />
          </div>
        </div>

        {/* Product preview */}
        <HeroPreview />
      </div>
    </section>
  );
}

function Mini({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-serif text-[18px] font-medium tabular-nums leading-none text-ink">
        {value}
      </span>
      <span className="text-[11px] text-ink-subtle">{label}</span>
    </div>
  );
}

function HeroPreview() {
  const [progress, setProgress] = useState(23);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const seq = [23, 41, 58, 72, 85, 94, 100];
    let i = 0;
    const step = () => {
      setProgress(seq[i]);
      i = (i + 1) % seq.length;
      const delay = seq[i] === 23 ? 3000 : 900;
      t = setTimeout(step, delay);
    };
    t = setTimeout(step, 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[radial-gradient(circle,hsl(222_70%_24%_/_0.12),transparent_70%)] blur-2xl"
      />

      {/* browser chrome */}
      <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-white shadow-[0_30px_80px_-30px_hsl(222_30%_14%/0.35),0_10px_30px_-15px_hsl(222_30%_14%/0.2)]">
        <div className="flex items-center justify-between border-b border-border/60 bg-[hsl(40_30%_98%)] px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <div className="flex h-6 min-w-[240px] items-center justify-center gap-1.5 rounded-full bg-white px-3 font-mono text-[10.5px] text-ink-subtle ring-1 ring-border/50">
            <Lock className="h-2.5 w-2.5" />
            app.contaflow.ro/dashboard
          </div>
          <div className="h-5 w-16" />
        </div>

        {/* app header */}
        <div className="flex items-center justify-between border-b border-border/60 bg-white px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-[hsl(222_70%_24%)] to-[hsl(222_85%_16%)] text-white">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
                <path d="M4 5v14" />
                <path d="M4 12h8" />
                <path d="M12 5c4 0 7 2 7 7s-3 7-7 7" />
              </svg>
            </div>
            <span className="font-serif text-[13px] font-semibold text-ink">ContaFlow</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-amber-200/80 bg-amber-50 px-2 py-0.5 text-[9.5px] font-medium text-amber-800">
              Demo
            </span>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-[9px] font-semibold text-white">
              MP
            </div>
          </div>
        </div>

        {/* page content */}
        <div className="space-y-3 p-4">
          <div>
            <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-subtle">
              <span>Luni, 27 aprilie 2026</span>
              <span className="text-border">·</span>
              <span className="text-rose-700">4 zile până la termen</span>
            </div>
            <div className="mt-1.5 font-serif text-[17px] font-medium tracking-tight text-ink">
              Bună, Maria. Închidem luna martie.
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 transition-[width] duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-mono text-[10px] tabular-nums text-ink-muted">
                {progress}%
              </span>
            </div>
          </div>

          {/* mini KPIs */}
          <div className="grid grid-cols-3 gap-1.5">
            <MiniKpi icon={<Users className="h-3 w-3" />} label="Clienți lipsă" value="18 / 47" tone="red" />
            <MiniKpi icon={<Layers className="h-3 w-3" />} label="Docs de procesat" value="394" tone="amber" />
            <MiniKpi icon={<FileCheck2 className="h-3 w-3" />} label="Declarații" value="9 / 12" tone="amber" />
          </div>

          {/* mini client table */}
          <div className="overflow-hidden rounded-md border border-border/60 bg-white">
            <div className="flex items-center justify-between border-b border-border/60 bg-[hsl(40_30%_99%)] px-2.5 py-1.5">
              <span className="text-[10px] font-semibold text-ink-muted">Clienți · top urgențe</span>
              <span className="text-[9.5px] text-ink-subtle">47 total</span>
            </div>
            <div className="divide-y divide-border/50">
              {[
                { name: "SC TechLogic SRL", status: "Complet", tone: "green" },
                { name: "Constructii Brîncoveanu SRL", status: "Docs lipsă", tone: "amber" },
                { name: "Transport Rapid TIR SRL", status: "Necontactat", tone: "red" },
                { name: "Cafe Ursul Polar SRL", status: "În procesare", tone: "blue" },
              ].map((r) => {
                const dot =
                  r.tone === "green"
                    ? "bg-emerald-500"
                    : r.tone === "amber"
                    ? "bg-amber-500"
                    : r.tone === "red"
                    ? "bg-rose-500"
                    : "bg-sky-500";
                const text =
                  r.tone === "green"
                    ? "text-emerald-700"
                    : r.tone === "amber"
                    ? "text-amber-700"
                    : r.tone === "red"
                    ? "text-rose-700"
                    : "text-sky-700";
                return (
                  <div key={r.name} className="flex items-center justify-between px-2.5 py-1.5 text-[11px]">
                    <span className="truncate text-ink">{r.name}</span>
                    <span className="inline-flex items-center gap-1">
                      <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
                      <span className={text}>{r.status}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-md border border-primary/15 bg-primary/[0.04] p-2.5">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-primary">
              <Sparkles className="h-3 w-3 text-amber-500" />
              Sugestie ContaFlow
            </div>
            <div className="mt-0.5 text-[10.5px] text-ink-muted">
              Pornește închiderea automată — estimat 2h 14min pentru toți 47.
            </div>
          </div>
        </div>
      </div>

      {/* floating accent tile */}
      <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-border/70 bg-white p-3 shadow-xl sm:block">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-ink">1.233 / 1.247</div>
            <div className="text-[9.5px] text-ink-subtle">automate · 98,9%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniKpi({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "red" | "amber" | "blue";
}) {
  const toneClass =
    tone === "red"
      ? "text-rose-700"
      : tone === "amber"
      ? "text-amber-800"
      : "text-sky-700";
  return (
    <div className="rounded-md border border-border/60 bg-white p-2">
      <div className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-ink-subtle">
        {icon}
        {label}
      </div>
      <div className={cn("mt-1 font-serif text-[15px] font-medium tabular-nums leading-none", toneClass)}>
        {value}
      </div>
    </div>
  );
}

/* ---------------- SOCIAL PROOF ---------------- */

function SocialProofRibbon() {
  return (
    <section className="border-y border-border/60 bg-white/60 py-6">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-3 px-6 text-center lg:flex-row lg:justify-between">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
          Construit de oameni care au închis luna manual. De prea multe ori.
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[12.5px] text-ink-muted">
          {["Saga", "WinMentor", "Ciel", "SmartBill Conta", "SPV ANAF", "D406 SAF-T"].map((label, i) => (
            <span key={label} className="font-serif italic">
              {i > 0 && <span className="mr-5 text-ink-subtle/60">·</span>}
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROBLEM ---------------- */

const PAIN_POINTS = [
  { icon: MessageCircle, label: "Alergi după clienți pe WhatsApp pentru documente", time: "~6h" },
  { icon: Download, label: "Descărcare manuală de facturi din SPV · 47 de clienți", time: "~4h" },
  { icon: Wand2, label: "OCR și introducere în Saga", time: "~8h" },
  { icon: FileText, label: "Categorizare contabilă, document cu document", time: "~6h" },
  { icon: FileCheck2, label: "D112, D300, D394, D100 și SAF-T D406", time: "~9h" },
];

function ProblemSection() {
  return (
    <section id="probleme" className="px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Problema</SectionEyebrow>
          <SectionTitle>
            A <em className="italic">5-a</em> închidere consecutivă peste weekend.
          </SectionTitle>
          <SectionLede>
            Orice expert contabil cu peste 30 de clienți își recunoaște ritualul: 25 ale lunii se apropie,
            WhatsApp-ul sună, iar închiderea se întinde pe 3–5 zile. Nu pentru că ai fi încet —
            ci pentru că instrumentele tale nu vorbesc între ele.
          </SectionLede>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border/70 bg-white shadow-[0_10px_40px_-20px_hsl(222_30%_14%/0.15)]">
          <div className="flex items-center justify-between border-b border-border/70 bg-[hsl(40_30%_99%)] px-5 py-3">
            <div className="flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-wide text-ink-subtle">
              <Hand className="h-3.5 w-3.5" />
              Închidere martie · manual
            </div>
            <Badge variant="red" className="gap-1.5">
              <Timer className="h-3 w-3" /> ~33h de lucru
            </Badge>
          </div>

          <ul className="divide-y divide-border/60">
            {PAIN_POINTS.map((p, i) => {
              const Icon = p.icon;
              return (
                <li key={p.label} className="flex items-center gap-4 px-5 py-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-rose-500/10 text-rose-700">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 text-[13.5px] text-ink">
                    <span className="font-mono text-[10.5px] text-ink-subtle">
                      {String(i + 1).padStart(2, "0")}.
                    </span>{" "}
                    {p.label}
                  </div>
                  <div className="font-mono text-[12px] tabular-nums text-rose-700">
                    {p.time}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center justify-between border-t border-border/70 bg-rose-50/40 px-5 py-4">
            <div className="flex items-center gap-2 text-[12px] font-medium text-rose-900">
              <AlertTriangle className="h-3.5 w-3.5" />
              Total pentru o firmă cu 47 de clienți
            </div>
            <div className="font-serif text-[22px] font-medium text-rose-900">
              33 ore · 3–5 zile lucrătoare
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */

const STEPS = [
  {
    n: 1,
    icon: Download,
    title: "Preluare automată zilnică din SPV",
    desc: "Ne conectăm la SPV cu certificatul digital al firmei și descărcăm toate facturile B2B pentru fiecare client. Arhivăm permanent — ANAF șterge după 60 de zile.",
    metric: "1.247 documente / 30s",
  },
  {
    n: 2,
    icon: Wand2,
    title: "OCR & categorizare",
    desc: "Documentele pe care le primești de la clienți (WhatsApp, email, portal) sunt citite automat: furnizor, CUI, sumă, TVA, categorie contabilă — cu scor de încredere.",
    metric: "394 documente / 5min",
  },
  {
    n: 3,
    icon: Sparkles,
    title: "Potrivire SPV cu documentele clienților",
    desc: "Facturile primite prin SPV sunt potrivite automat cu documentele încărcate de clienți. Ce nu se potrivește, îți arătăm să confirmi — de obicei 7–14 din 1.247.",
    metric: "89% potrivire automată",
  },
  {
    n: 4,
    icon: Database,
    title: "Export nativ în Saga / WinMentor / Ciel",
    desc: "Fișier compatibil 1:1 cu bookkeeping engine-ul pe care-l folosești deja. Import într-un click. Fără dublă introducere. Fără migrarea la un alt sistem.",
    metric: "4,2 MB · un click",
  },
  {
    n: 5,
    icon: FileCheck2,
    title: "Declarații + SAF-T D406",
    desc: "D112, D300, D394, D100 — pre-completate pe baza datelor categorizate. SAF-T D406 cu cele 390 câmpuri validate automat contra schemei XSD ANAF.",
    metric: "12 declarații · 20min",
  },
];

function HowItWorksSection() {
  return (
    <section id="cum-functioneaza" className="bg-[hsl(222_30%_11%)] px-6 py-20 text-[hsl(40_30%_94%)] lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-amber-300">
            Soluția
          </div>
          <h2 className="mt-4 font-serif text-[36px] font-medium leading-[1.05] tracking-tight text-white sm:text-[44px]">
            5 pași automatizați. <span className="italic text-amber-300">2 ore</span> totale.
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-white/70">
            ContaFlow face partea mecanică pentru tine — tu păstrezi controlul,
            judecata profesională și responsabilitatea semnăturii.
          </p>
        </div>

        <ol className="mt-14 space-y-4">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <li
                key={s.n}
                className="group relative grid items-start gap-5 rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-colors hover:bg-white/[0.04] sm:grid-cols-[64px_1fr_200px]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 font-serif text-[22px] font-medium text-amber-300 ring-1 ring-white/10">
                  {String(s.n).padStart(2, "0")}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-amber-300" />
                    <div className="font-serif text-[20px] font-medium text-white">
                      {s.title}
                    </div>
                  </div>
                  <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-white/65">
                    {s.desc}
                  </p>
                </div>
                <div className="sm:text-right">
                  <div className="inline-flex items-baseline gap-1 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 font-mono text-[11.5px] text-emerald-200">
                    <Zap className="h-3 w-3 -translate-y-[1px]" />
                    {s.metric}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- INTERACTIVE DEMO CTA ---------------- */

function InteractiveDemoCta() {
  return (
    <section className="px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-white via-[hsl(40_30%_99%)] to-white p-8 shadow-[0_20px_60px_-30px_hsl(222_30%_14%/0.25)] sm:p-12">
          <div
            aria-hidden
            className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,hsl(38_95%_60%_/_0.16),transparent_70%)] blur-2xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,hsl(222_70%_24%_/_0.14),transparent_70%)] blur-2xl"
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-white px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-primary">
                <PlayCircle className="h-3 w-3" />
                Demo interactiv · 2 minute
              </div>
              <h2 className="mt-4 font-serif text-[34px] font-medium leading-[1.05] tracking-tight text-ink sm:text-[42px]">
                Vezi cu ochii tăi cum arată. <br />
                Fără demo programat. Fără apel de vânzare.
              </h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-muted">
                Intri pe pielea Mariei Popescu — expert contabil CECCAR cu 47 clienți și 1.247
                documente de procesat pentru martie. Parcurgi cele 8 pași ai fluxului,
                click prin click. Te întorci înapoi cu o idee clară dacă ContaFlow te-ar ajuta
                sau nu.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/demo"
                  className="group inline-flex h-12 items-center gap-3 rounded-full bg-[hsl(222_70%_18%)] pl-6 pr-2 text-[15px] font-medium text-primary-foreground shadow-[0_12px_36px_-12px_hsl(222_70%_24%/0.55)] transition-all hover:bg-[hsl(222_75%_22%)]"
                >
                  Deschide demo-ul
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                <span className="text-[12px] text-ink-subtle">
                  Date fictive · niciun CUI real · niciun sales follow-up
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-xl border border-border/70 bg-white p-4 shadow-lg">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-ink-subtle">
                  <span>Parcurgi în 2 min</span>
                  <span>8 pași</span>
                </div>
                <ol className="mt-3 space-y-1.5">
                  {[
                    "Dashboard · 47 clienți, 12 declarații",
                    "Fișă client · WhatsApp reminder",
                    "SPV pull animat · 1.247 docs",
                    "OCR + categorizare · 7 ambigue",
                    "Export Saga / WinMentor / Ciel",
                    "Declarații D112 / D300 / D394",
                    "SAF-T D406 cockpit · 15 clienți",
                    "Rezumat · 2h 14min vs 33h",
                  ].map((step, i) => (
                    <li
                      key={step}
                      className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[12.5px] transition-colors hover:bg-muted/50"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/5 font-mono text-[10px] font-semibold text-primary">
                        {i + 1}
                      </span>
                      <span className="text-ink-muted">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- DIFFERENTIATORS ---------------- */

const COMPARISONS = [
  {
    label: "vs TaxDome & portaluri internaționale",
    eyebrow: "Integrări",
    headline: "Ei au portal. Noi avem și Saga.",
    body: "TaxDome, Canopy și alte portaluri internaționale îți dau un portal frumos pentru clienți. Dar nu exportă nativ în Saga, WinMentor sau Ciel — programele de contabilitate folosite efectiv de peste 90% din firmele din RO. Rămâi cu dublă introducere.",
    wins: ["Export Saga / WinMentor / Ciel / SmartBill", "SAF-T D406 cu schema XSD ANAF", "UI 100% în română, cu diacritice"],
    tone: "primary" as const,
  },
  {
    label: "vs SmartBill · Oblio · FGO",
    eyebrow: "Audiență",
    headline: "Alea sunt pentru firma ta. Noi suntem pentru tine.",
    body: "SmartBill, Oblio și FGO sunt construite pentru antreprenor — cel care emite facturi. ContaFlow e primul portal construit de la zero pentru expertul contabil care le ține evidența. Flux, date, jargon, UX — tot gândit din perspectiva ta.",
    wins: ["Multi-client dashboard", "Auto-pull SPV pentru toți clienții tăi", "Flow de închidere, nu de facturare"],
    tone: "amber" as const,
  },
  {
    label: "vs fără nimic",
    eyebrow: "Status quo",
    headline: '„Noi facem asta de 15 ani așa".',
    body: "SPV-ul șterge facturile după 60 de zile. Manual, nimeni nu descarcă consistent pentru 47 de clienți. Saga și WinMentor nu vorbesc cu SPV. Rezultatul: 33h de muncă mecanică care îți mănâncă weekenduri. Nu e eficiență — e rutină.",
    wins: ["Arhivare permanentă a e-Factura", "Fără pierdere de date fiscale", "Weekend-urile înapoi acasă"],
    tone: "emerald" as const,
  },
];

function DifferentiatorsSection() {
  return (
    <section className="px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Diferențiatorii</SectionEyebrow>
          <SectionTitle>
            Nu mai e încă un SaaS. <em className="italic">E un portal RO, pentru contabilul RO.</em>
          </SectionTitle>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {COMPARISONS.map((c) => {
            const accent =
              c.tone === "primary"
                ? "border-primary/15 from-primary/[0.04] text-primary"
                : c.tone === "amber"
                ? "border-amber-200/60 from-amber-500/[0.06] text-amber-800"
                : "border-emerald-200/60 from-emerald-500/[0.06] text-emerald-800";
            return (
              <div
                key={c.label}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-2xl border bg-white p-6 shadow-[0_10px_30px_-20px_hsl(222_30%_14%/0.15)]",
                  accent.split(" ")[0]
                )}
              >
                <div
                  aria-hidden
                  className={cn(
                    "absolute inset-0 bg-gradient-to-b to-transparent opacity-60",
                    accent.split(" ")[1]
                  )}
                />
                <div className="relative">
                  <div className={cn("text-[10.5px] font-semibold uppercase tracking-[0.12em]", accent.split(" ")[2])}>
                    {c.eyebrow}
                  </div>
                  <div className="mt-1 text-[11px] font-medium text-ink-subtle">{c.label}</div>
                  <h3 className="mt-4 font-serif text-[22px] font-medium leading-tight text-ink">
                    {c.headline}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-ink-muted">{c.body}</p>
                  <ul className="mt-5 space-y-1.5 text-[12.5px] text-ink">
                    {c.wins.map((w) => (
                      <li key={w} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- INTEGRATIONS ---------------- */

const INTEGRATIONS = [
  { name: "Saga", note: "Export XML + DBF nativ" },
  { name: "WinMentor", note: "XML Classic & Enterprise" },
  { name: "Ciel", note: "XML + TXT Gestiune / Contabilitate" },
  { name: "SmartBill Conta", note: "API direct + XLSX" },
  { name: "SPV ANAF", note: "e-Factura · pull zilnic" },
  { name: "SAF-T D406", note: "390 câmpuri · validare XSD" },
  { name: "Revisal", note: "Sync salarii · opțional" },
  { name: "WhatsApp Business", note: "Reminder-e către clienți" },
];

function IntegrationsSection() {
  return (
    <section id="integrari" className="border-y border-border/60 bg-white/60 px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Integrări</SectionEyebrow>
          <SectionTitle>Vorbim cu toate instrumentele cu care lucrezi deja.</SectionTitle>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {INTEGRATIONS.map((i) => (
            <div
              key={i.name}
              className="flex items-center gap-3 rounded-xl border border-border/70 bg-white p-4 transition-shadow hover:shadow-[0_6px_20px_-10px_hsl(222_30%_14%/0.15)]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 font-serif text-[14px] font-medium text-primary">
                {i.name.slice(0, 1)}
              </div>
              <div className="min-w-0">
                <div className="font-serif text-[15px] font-medium tracking-tight text-ink">
                  {i.name}
                </div>
                <div className="text-[11.5px] text-ink-subtle">{i.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIAL ---------------- */

function TestimonialSection() {
  return (
    <section className="px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-[hsl(222_30%_11%)] p-8 text-[hsl(40_30%_96%)] shadow-[0_30px_80px_-40px_hsl(222_30%_14%/0.55)] sm:p-12">
          <div
            aria-hidden
            className="absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(circle at 0% 0%, hsl(38 95% 60% / 0.14), transparent 55%), radial-gradient(circle at 100% 100%, hsl(222 100% 60% / 0.12), transparent 55%)",
            }}
          />
          <div className="relative grid items-center gap-10 md:grid-cols-[80px_1fr_240px]">
            <Quote className="h-16 w-16 text-amber-300/70" />
            <div>
              <p className="font-serif text-[22px] italic leading-snug text-white md:text-[28px]">
                „Prima dată când n-am mai stat trei zile peste weekend să închei luna. Clienții
                trimit documentele direct prin WhatsApp, facturile vin automat din SPV — efectiv
                îmi dă înapoi seară de seară."
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-[13px] font-semibold text-white">
                  MP
                </div>
                <div>
                  <div className="text-[13.5px] font-semibold text-white">Maria Popescu</div>
                  <div className="text-[11.5px] text-white/60">
                    Expert contabil CECCAR · beta user · 47 clienți · Cluj-Napoca
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden rounded-xl border border-white/10 bg-white/[0.04] p-5 md:block">
              <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-amber-200">
                <BadgeCheck className="h-3 w-3" /> Cohortă beta
              </div>
              <div className="mt-2 font-serif text-[36px] font-medium tabular-nums leading-none text-white">
                22
              </div>
              <div className="mt-1 text-[11px] text-white/60">
                firme de contabilitate în pilot · 847 clienți cumulați procesați
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRICING ---------------- */

const PLANS = [
  {
    id: "Starter",
    price: "€25",
    tagline: "până la 20 clienți",
    highlight: false,
    features: [
      "SPV e-Factura pull zilnic",
      "OCR & categorizare automată",
      "Export Saga / WinMentor / Ciel",
      "Declarații D112, D300, D394 automate",
      "Suport email · răspuns în 24h",
    ],
  },
  {
    id: "Professional",
    price: "€49",
    tagline: "până la 50 clienți",
    highlight: true,
    features: [
      "Tot din Starter",
      "SAF-T D406 cockpit · pentru clienți small",
      "Potrivire automată SPV ↔ docs 89%+",
      "Reminder automat WhatsApp / email",
      "Suport chat prioritar",
    ],
  },
  {
    id: "Firma",
    price: "€89",
    tagline: "până la 150 clienți",
    highlight: false,
    features: [
      "Tot din Professional",
      "Multi-user (juniori + senior CECCAR)",
      "Audit trail complet + istoric 5 ani",
      "API custom + webhook-uri",
      "Account manager dedicat",
    ],
  },
];

function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const multiplier = billing === "annual" ? 0.8 : 1;

  return (
    <section id="preturi" className="px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Prețuri</SectionEyebrow>
          <SectionTitle>
            <em className="italic">Se plătește singur</em> în prima dimineață de aprilie.
          </SectionTitle>
          <SectionLede>
            Prețurile sunt pentru firma de contabilitate, nu per client final. Prima lună e
            gratuită, setup-ul inclus, migrarea datelor e asistată.
          </SectionLede>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full border border-border bg-white p-0.5 text-[12px]">
            <button
              onClick={() => setBilling("monthly")}
              className={cn(
                "rounded-full px-4 py-1.5 font-medium transition-colors",
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
                "rounded-full px-4 py-1.5 font-medium transition-colors",
                billing === "annual"
                  ? "bg-primary text-primary-foreground"
                  : "text-ink-muted"
              )}
            >
              Anual <span className={billing === "annual" ? "text-amber-300" : "text-emerald-700"}>−20%</span>
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {PLANS.map((p) => {
            const base = Number(p.price.replace("€", ""));
            const price = Math.round(base * multiplier);
            return (
              <div
                key={p.id}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-2xl border bg-white p-6 transition-all",
                  p.highlight
                    ? "border-primary bg-gradient-to-br from-white via-white to-primary/[0.04] shadow-[0_20px_50px_-24px_hsl(222_70%_24%/0.35)]"
                    : "border-border/70"
                )}
              >
                {p.highlight && (
                  <div className="absolute right-0 top-0 rounded-bl-xl rounded-tr-2xl bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
                    Recomandat
                  </div>
                )}
                <div className="text-[12px] font-semibold uppercase tracking-wide text-ink-subtle">
                  {p.id}
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-serif text-[46px] font-medium tabular-nums leading-none text-ink">
                    €{price}
                  </span>
                  <span className="text-[12.5px] text-ink-subtle">/lună</span>
                </div>
                <div className="text-[12px] text-ink-muted">{p.tagline}</div>

                <ul className="mt-6 space-y-2 text-[13px]">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <CheckCircle2
                        className={cn(
                          "mt-0.5 h-3.5 w-3.5 shrink-0",
                          p.highlight ? "text-primary" : "text-emerald-600"
                        )}
                      />
                      <span className="text-ink-muted">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={cn(
                    "mt-7 h-11 w-full rounded-lg",
                    p.highlight
                      ? "bg-[hsl(222_70%_18%)] hover:bg-[hsl(222_75%_22%)]"
                      : "bg-white text-primary ring-1 ring-primary/30 hover:bg-primary/5"
                  )}
                >
                  <a href="#pilot-full">
                    Înscrie-te în pilot
                    <MoveRight className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-ink-muted">
          <span className="inline-flex items-center gap-1">
            <Check className="h-3 w-3 text-emerald-600" /> Prima lună gratuită
          </span>
          <span className="text-border">·</span>
          <span className="inline-flex items-center gap-1">
            <Check className="h-3 w-3 text-emerald-600" /> Setup & migrare incluse
          </span>
          <span className="text-border">·</span>
          <span className="inline-flex items-center gap-1">
            <Check className="h-3 w-3 text-emerald-600" /> Anulare oricând, fără costuri
          </span>
          <span className="text-border">·</span>
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-emerald-600" /> Date găzduite în UE (Frankfurt)
          </span>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

const FAQ = [
  {
    q: "Cât de sigur e? Clienții mei îmi dau documente sensibile.",
    a: "Storage criptat AES-256 în EU (Frankfurt), audit trail complet, segregare strictă la nivel de firmă de contabilitate. Nu folosim datele voastre pentru nimic — nici training AI, nici analytics agregat. Clauze GDPR explicite în contract.",
  },
  {
    q: "Ce se întâmplă cu datele mele dacă anulez?",
    a: 'Export complet în 24h (Saga XML + JSON integral) și ștergere garantată din backup-uri în 30 de zile. Fără hold-uri, fără „închidere facturi existente întâi".',
  },
  {
    q: "Trebuie să schimb Saga / WinMentor?",
    a: "Nu. ContaFlow stă în amonte de engine-ul tău contabil — îți livrează fișier de import compatibil. Continui să ții contabilitatea în Saga / WinMentor / Ciel / SmartBill, exact cum faci azi.",
  },
  {
    q: "Cum se conectează la SPV ANAF?",
    a: "Cu certificatul digital calificat al firmei tale (același pe care-l folosești deja pentru depuneri). Setup unic de 10 minute, după care pull-ul rulează automat zilnic pentru toți clienții tăi. Nu îți cerem certificatele clienților — folosim pe al tău, în calitate de împuternicit fiscal.",
  },
  {
    q: "Cum arată SAF-T D406 cu voi?",
    a: "Avem un cockpit dedicat — 7 secțiuni validate automat contra schemei XSD oficiale ANAF, 390 câmpuri, warning-uri structurate pentru anomalii. Durata medie per client: 4 minute, față de 2–3h manual.",
  },
  {
    q: "Sunt CECCAR. E conform cu normele profesiei?",
    a: "Da. ContaFlow nu înlocuiește judecata profesională — automatizează doar introducerea și pregătirea datelor. Responsabilitatea declarației rămâne la expertul contabil, semnătura la fel. Vorbim activ cu CECCAR pentru versiunea finală.",
  },
  {
    q: "Când se lansează?",
    a: "Beta privat cu 22 firme — acum. General availability — Q3 2026. Înscrierea în pilot include preț locked la €49/lună pentru primii 100 de utilizatori, valabil pe viață.",
  },
];

function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="faq" className="border-y border-border/60 bg-white/60 px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[980px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionEyebrow>Întrebări frecvente</SectionEyebrow>
            <h2 className="mt-3 font-serif text-[30px] font-medium leading-tight tracking-tight text-ink sm:text-[36px]">
              Ce întrebă oamenii în primul demo.
            </h2>
            <p className="mt-3 text-[13.5px] leading-relaxed text-ink-muted">
              Dacă nu-ți răspundem aici, scrie-ne direct la{" "}
              <a
                href="mailto:hello@contaflow.ro"
                className="underline underline-offset-4 hover:text-ink"
              >
                hello@contaflow.ro
              </a>
              . Fondatorul răspunde personal.
            </p>
          </div>

          <div className="divide-y divide-border/70 rounded-2xl border border-border/70 bg-white">
            {FAQ.map((item, i) => {
              const isOpen = openIdx === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/30"
                  >
                    <span className="font-serif text-[16px] font-medium leading-snug text-ink">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-ink-subtle transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-[13.5px] leading-relaxed text-ink-muted animate-fade-in">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */

function FinalCtaSection() {
  return (
    <section id="pilot-full" className="px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1180px]">
        <div className="relative overflow-hidden rounded-3xl bg-[hsl(222_30%_11%)] p-8 text-[hsl(40_30%_96%)] shadow-[0_30px_80px_-30px_hsl(222_30%_14%/0.5)] sm:p-14">
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(circle at 0% 0%, hsl(38 95% 60% / 0.18), transparent 55%), radial-gradient(circle at 100% 100%, hsl(222 100% 60% / 0.18), transparent 55%)",
            }}
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-amber-200">
                <Sparkles className="h-3 w-3" />
                30 locuri în pilot · 8 rămase
              </div>
              <h2 className="mt-4 font-serif text-[36px] font-medium leading-[1.05] tracking-tight text-white sm:text-[48px]">
                Luna viitoare, <em className="italic">la 25</em>,
                <br />
                vrei o închidere ca-ntotdeauna sau una automată?
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">
                Înscrie-te în pilotul beta — primele 30 de firme primesc{" "}
                <strong className="text-white">preț fixat la €49/lună</strong> pe viață, onboarding
                personal cu fondatorul și migrare asistată din Saga.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-[12px] text-white/60">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Prima lună gratuită
                </span>
                <span>·</span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Zero spam
                </span>
                <span>·</span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Anulare oricând
                </span>
              </div>
            </div>

            <LeadForm
              source="footer"
              variant="stacked"
              withExtras
              theme="dark"
              buttonLabel="Rezervă-mi un loc în pilot"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-[hsl(40_30%_97%)] px-6 py-10 lg:px-10">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-[12.5px] leading-relaxed text-ink-muted">
            Portalul contabilului român. Construit în Cluj-Napoca, pentru experții contabili CECCAR
            care vor weekend-urile înapoi.
          </p>
          <div className="mt-4 flex items-center gap-3 text-[11.5px] text-ink-subtle">
            <a href="mailto:hello@contaflow.ro" className="inline-flex items-center gap-1 hover:text-ink">
              <Mail className="h-3 w-3" /> hello@contaflow.ro
            </a>
            <span>·</span>
            <span>Cluj-Napoca, RO</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-[12px] text-ink-muted sm:grid-cols-3">
          <FooterCol title="Produs">
            <FooterLink href="/demo">Demo interactiv</FooterLink>
            <FooterLink href="#cum-functioneaza">Cum funcționează</FooterLink>
            <FooterLink href="#integrari">Integrări</FooterLink>
            <FooterLink href="#preturi">Prețuri</FooterLink>
          </FooterCol>
          <FooterCol title="Resurse">
            <FooterLink href="#faq">FAQ</FooterLink>
            <FooterLink href="mailto:hello@contaflow.ro">Contact</FooterLink>
            <FooterLink href="#pilot-full">Înscriere pilot</FooterLink>
          </FooterCol>
          <FooterCol title="Legal">
            <FooterLink href="#">Termeni</FooterLink>
            <FooterLink href="#">Confidențialitate</FooterLink>
            <FooterLink href="#">GDPR</FooterLink>
          </FooterCol>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-[1180px] border-t border-border/60 pt-5 text-center text-[11px] text-ink-subtle">
        © {new Date().getFullYear()} ContaFlow SRL · Marca înregistrată · Toate drepturile rezervate
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-subtle">
        {title}
      </div>
      {children}
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className="text-ink-muted transition-colors hover:text-ink">
      {children}
    </a>
  );
}

/* ---------------- SHARED BITS ---------------- */

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-white px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-4 font-serif text-[36px] font-medium leading-[1.05] tracking-tight text-ink sm:text-[44px]">
      {children}
    </h2>
  );
}

function SectionLede({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-[15px] leading-relaxed text-ink-muted sm:text-[16px]">
      {children}
    </p>
  );
}

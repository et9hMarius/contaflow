"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Building2,
  CalendarClock,
  ClipboardList,
  FileCheck2,
  Users,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { DemoPill } from "@/components/demo-pill";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  firm,
  totalDocsThisMonth,
  totalDeclarations,
} from "@/lib/mock-data";
import { formatNumber } from "@/lib/format";

const steps = [
  { n: 1, label: "Dashboard", href: "/dashboard" },
  { n: 2, label: "Fișă client", href: "/clients/3" },
  { n: 3, label: "SPV auto-pull", href: "/spv-pull" },
  { n: 4, label: "Categorizare", href: "/categorize" },
  { n: 5, label: "Export Saga", href: "/saga-export" },
  { n: 6, label: "Declarații ANAF", href: "/declarations" },
  { n: 7, label: "SAF-T cockpit", href: "/saft" },
  { n: 8, label: "Rezumat", href: "/summary" },
];

export default function WelcomePage() {
  const router = useRouter();
  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      {/* decorative background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,hsl(222_70%_24%_/_0.08),transparent_70%)]" />
        <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,hsl(38_95%_60%_/_0.08),transparent_70%)]" />
      </div>

      <header className="flex h-16 items-center justify-between px-6 lg:px-10">
        <Logo />
        <div className="flex items-center gap-3">
          <DemoPill />
          <span className="hidden text-[12px] text-ink-subtle sm:inline">
            27 aprilie 2026 · Cluj-Napoca
          </span>
        </div>
      </header>

      <main className="mx-auto flex max-w-[1180px] flex-col items-center px-6 pb-16 pt-10 lg:pt-20">
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-ink-muted backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Demo interactiv · închiderea lunii martie 2026
          </div>

          <h1 className="max-w-3xl font-serif text-[44px] font-medium leading-[1.02] tracking-tight text-ink sm:text-[64px]">
            Închide luna{" "}
            <span className="relative inline-block">
              <span className="relative z-10">în câteva ore,</span>
              <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-amber-200/70 sm:h-4" />
            </span>
            <br />
            nu câteva zile.
          </h1>

          <p className="max-w-2xl text-[16px] leading-relaxed text-ink-muted sm:text-[17px]">
            Ești <span className="font-medium text-ink">Maria Popescu</span>, expert contabil CECCAR cu 47 de
            clienți. Astăzi e 27 aprilie, mai sunt 4 zile până la termenul limită, iar închiderea tradițională
            îți ia 3–5 zile. ContaFlow o reduce la câteva ore.
          </p>

          <div className="mt-3 flex flex-col items-center gap-3 sm:flex-row">
            <button
              onClick={() => router.push("/dashboard")}
              className="group inline-flex h-12 items-center gap-3 rounded-full bg-[hsl(222_70%_18%)] pl-6 pr-2 text-[15px] font-medium text-primary-foreground shadow-[0_12px_36px_-12px_hsl(222_70%_24%/0.55),inset_0_1px_0_hsl(222_100%_70%/0.18)] transition-all hover:bg-[hsl(222_75%_22%)] hover:shadow-[0_16px_44px_-12px_hsl(222_70%_24%/0.65),inset_0_1px_0_hsl(222_100%_70%/0.22)]"
            >
              Începe demo-ul
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-ink-subtle">sau sari la</span>
              <Select onValueChange={(v) => router.push(v)}>
                <SelectTrigger className="h-9 w-[180px] bg-white/70 text-[13px]">
                  <SelectValue placeholder="pasul…" />
                </SelectTrigger>
                <SelectContent>
                  {steps.map((s) => (
                    <SelectItem key={s.n} value={s.href}>
                      Pasul {s.n} — {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* scene-setting stats card */}
        <div className="mt-16 w-full max-w-4xl overflow-hidden rounded-2xl border border-border/80 bg-white/80 shadow-[0_10px_40px_-20px_hsl(222_30%_14%/0.15)] backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-border/60 bg-[hsl(40_30%_97%)] px-6 py-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-ink-subtle" />
              <span className="font-serif text-[14px] italic text-ink-muted">
                {firm.name}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-ink-subtle">
              <span className="rounded-sm bg-emerald-50 px-1.5 py-0.5 font-semibold text-emerald-700">
                {firm.ceccarId}
              </span>
              <span>·</span>
              <span>{firm.location}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 divide-border/70 sm:grid-cols-4 sm:divide-x">
            <StatBlock
              icon={<Users className="h-4 w-4" />}
              value={formatNumber(firm.clientCount)}
              label="clienți în portofoliu"
              tone="ink"
            />
            <StatBlock
              icon={<ClipboardList className="h-4 w-4" />}
              value={formatNumber(totalDocsThisMonth)}
              label="documente de procesat"
              tone="ink"
            />
            <StatBlock
              icon={<FileCheck2 className="h-4 w-4" />}
              value={formatNumber(totalDeclarations)}
              label="declarații de depus"
              tone="amber"
            />
            <StatBlock
              icon={<CalendarClock className="h-4 w-4" />}
              value="4 zile"
              label="până la termenul limită"
              tone="red"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-ink-subtle">
          <span>Construit pentru integrare cu</span>
          {["Saga", "WinMentor", "Ciel", "SmartBill Conta", "SPV ANAF", "D406 SAF-T"].map((label, i) => (
            <span
              key={label}
              className="font-serif text-[14px] italic text-ink-muted"
            >
              {i > 0 && <span className="mr-6 text-ink-subtle">·</span>}
              {label}
            </span>
          ))}
        </div>
      </main>

      <footer className="border-t border-border/60 bg-white/40 py-4 text-center text-[11px] text-ink-subtle">
        Toate datele din acest demo sunt fictive. Niciun client real, niciun CUI real, nicio conexiune
        ANAF reală.
      </footer>
    </div>
  );
}

function StatBlock({
  icon,
  value,
  label,
  tone,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  tone: "ink" | "amber" | "red";
}) {
  const toneClass =
    tone === "red"
      ? "text-rose-700"
      : tone === "amber"
      ? "text-amber-700"
      : "text-ink";
  return (
    <div className="flex flex-col gap-1 px-6 py-5">
      <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-subtle">
        <span className="text-ink-subtle/70">{icon}</span>
        {label}
      </div>
      <div className={`font-serif text-[28px] font-medium tabular-nums leading-none tracking-tight ${toneClass}`}>
        {value}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Clock3,
  FileCheck2,
  Flame,
  Layers,
  MoreHorizontal,
  Sparkles,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  anonymizedClientCount,
  clients,
  firm,
  type Client,
} from "@/lib/mock-data";
import { formatDayMonth, formatNumber } from "@/lib/format";

const kpis = [
  {
    label: "Clienți cu documente lipsă",
    value: 18,
    total: 47,
    tone: "red" as const,
    icon: Users,
    hint: "8 din 18 sunt în stadiu critic (peste 5 documente lipsă)",
  },
  {
    label: "Documente de procesat",
    value: 394,
    total: 1247,
    tone: "amber" as const,
    icon: Layers,
    hint: "394 necesită OCR + categorizare",
  },
  {
    label: "Declarații de depus",
    value: 9,
    total: 12,
    tone: "amber" as const,
    icon: FileCheck2,
    hint: "D112, D300, D394 pentru 47 clienți · D406 pentru 15 clienți small",
  },
  {
    label: "Timp estimat rămas (manual)",
    value: "~32h",
    total: null,
    tone: "red" as const,
    icon: Clock3,
    hint: "La ritm manual: ~32h. Cu ContaFlow: estimare ~2h.",
  },
];

const statusMeta: Record<Client["status"], { label: string; variant: "green" | "amber" | "red" | "blue" }> = {
  complete: { label: "Complet", variant: "green" },
  missing: { label: "Documente lipsă", variant: "amber" },
  uncontacted: { label: "Necontactat", variant: "red" },
  processing: { label: "În procesare", variant: "blue" },
};

export default function DashboardPage() {
  const [anonExpanded, setAnonExpanded] = useState(false);
  const progress = 23;
  const filedCount = Math.round((progress / 100) * 12);

  return (
    <div className="space-y-8">
      {/* HERO */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
            <span>Luni, 27 aprilie 2026</span>
            <span className="h-1 w-1 rounded-full bg-ink-subtle/40" />
            <span className="text-rose-700">4 zile până la termen</span>
          </div>
          <h1 className="mt-3 font-serif text-[36px] font-medium leading-[1.05] tracking-tight text-ink sm:text-[42px]">
            Bună, {firm.seniorAccountant.split(" ")[0]}.{" "}
            <span className="text-ink-muted">4 zile până la termenul limită.</span>
          </h1>
          <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">
            Ai depus{" "}
            <span className="font-semibold text-ink">{filedCount} din 12</span> declarații
            pentru martie 2026. La ritmul actual, închiderea e la ~32 ore de lucru manual.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <Progress
              value={progress}
              indicatorClassName="bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500"
              className="h-2 max-w-md"
            />
            <span className="font-serif text-[13px] font-medium italic text-ink-muted">
              {progress}% din închiderea martie
            </span>
          </div>
        </div>

        <Link
          href="/spv-pull"
          className="group inline-flex h-12 items-center gap-3 self-start rounded-full bg-[hsl(222_70%_18%)] pl-5 pr-2 text-[14px] font-medium text-primary-foreground shadow-[0_12px_32px_-14px_hsl(222_70%_24%/0.55),inset_0_1px_0_hsl(222_100%_70%/0.2)] transition-all hover:bg-[hsl(222_75%_22%)] lg:self-auto"
        >
          <Sparkles className="h-4 w-4 text-amber-300" />
          Pornește închiderea automată
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5">
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          const toneBar =
            k.tone === "red"
              ? "from-rose-500/80 to-rose-400/20"
              : k.tone === "amber"
              ? "from-amber-500/80 to-amber-400/20"
              : "from-primary/80 to-primary/20";
          const toneDot =
            k.tone === "red" ? "bg-rose-500" : k.tone === "amber" ? "bg-amber-500" : "bg-primary";
          const valueTone =
            k.tone === "red" ? "text-rose-700" : k.tone === "amber" ? "text-amber-800" : "text-ink";

          return (
            <div
              key={k.label}
              className="relative overflow-hidden rounded-xl border border-border/70 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
            >
              <div
                className={cn(
                  "absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r",
                  toneBar
                )}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-ink-muted">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-subtle">
                    {k.label}
                  </span>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="text-ink-subtle hover:text-ink">
                      <span className="relative flex h-2 w-2">
                        <span className={cn("absolute inline-flex h-full w-full animate-pulse-soft rounded-full opacity-70", toneDot)} />
                        <span className={cn("relative inline-flex h-2 w-2 rounded-full", toneDot)} />
                      </span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{k.hint}</TooltipContent>
                </Tooltip>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <div className={cn("font-serif text-[32px] font-medium leading-none tracking-tight tabular-nums", valueTone)}>
                  {typeof k.value === "number" ? formatNumber(k.value) : k.value}
                </div>
                {k.total !== null && (
                  <div className="text-[12px] text-ink-subtle">
                    din {formatNumber(k.total)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* CLIENT TABLE */}
      <div className="overflow-hidden rounded-xl border border-border/70 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <div className="flex items-center justify-between border-b border-border/70 px-5 py-3">
          <div>
            <div className="font-serif text-[17px] font-medium tracking-tight text-ink">
              Clienți — status închidere martie 2026
            </div>
            <div className="text-[12px] text-ink-subtle">
              8 afișați detaliat · 39 agregați · ordonați după severitate
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="red" className="gap-1.5">
              <AlertTriangle className="h-3 w-3" />
              18 cu probleme
            </Badge>
            <Button variant="outline" size="sm">
              <Flame className="h-3.5 w-3.5" />
              Sortare: Severitate
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[30%]">Client</TableHead>
              <TableHead className="w-[14%]">CUI</TableHead>
              <TableHead className="w-[14%] text-right">Docs primite</TableHead>
              <TableHead className="w-[14%] text-right">Docs lipsă</TableHead>
              <TableHead className="w-[16%]">Ultima interacțiune</TableHead>
              <TableHead className="w-[10%]">Status</TableHead>
              <TableHead className="w-[2%]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((c) => {
              const meta = statusMeta[c.status];
              const isLinked = c.id === "3";
              return (
                <TableRow key={c.id} className="cursor-pointer">
                  <TableCell>
                    <Link
                      href={`/clients/${c.id}`}
                      className={cn(
                        "flex items-center gap-3",
                        !isLinked && "pointer-events-none opacity-100"
                      )}
                    >
                      <ClientAvatar name={c.name} status={c.status} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-ink">{c.name}</span>
                          {c.overdueDeclarations && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="inline-flex items-center rounded bg-rose-50 px-1 py-0.5 text-[10px] font-semibold text-rose-700">
                                  !
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                {c.overdueDeclarations.length} declarații restante:{" "}
                                {c.overdueDeclarations.join(", ")}
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                        <div className="text-[11px] text-ink-subtle">
                          {c.type} · {c.uses}
                        </div>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-[12px] text-ink-muted">{c.cui}</span>
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-ink">
                    {formatNumber(c.docsReceived)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {c.docsMissing === 0 ? (
                      <span className="text-emerald-700">—</span>
                    ) : (
                      <span className={cn(c.docsMissing > 20 ? "text-rose-700" : "text-amber-700", "font-medium")}>
                        {formatNumber(c.docsMissing)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-[12.5px] text-ink">
                      {formatDayMonth(c.lastContact)}
                    </div>
                    <div className="text-[11px] text-ink-subtle">
                      {c.lastContactChannel} · {c.lastContactNote.slice(0, 36)}
                      {c.lastContactNote.length > 36 ? "…" : ""}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={meta.variant}>
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          meta.variant === "green" && "bg-emerald-500",
                          meta.variant === "amber" && "bg-amber-500",
                          meta.variant === "red" && "bg-rose-500",
                          meta.variant === "blue" && "bg-sky-500"
                        )}
                      />
                      {meta.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="rounded-md p-1 text-ink-subtle transition-colors hover:bg-muted hover:text-ink"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        {isLinked ? (
                          <Link href={`/clients/${c.id}`}>
                            <DropdownMenuItem>Deschide fișă client</DropdownMenuItem>
                          </Link>
                        ) : (
                          <DropdownMenuItem disabled>Deschide fișă client</DropdownMenuItem>
                        )}
                        <DropdownMenuItem disabled>Trimite reminder</DropdownMenuItem>
                        <DropdownMenuItem disabled>Marchează complet</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem disabled>Exportă docs</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}

            {/* Anonymized group */}
            <TableRow
              className="cursor-pointer bg-[hsl(40_30%_99%)]"
              onClick={() => setAnonExpanded((v) => !v)}
            >
              <TableCell colSpan={7}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[13px] font-medium text-ink-muted">
                    {anonExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    + {anonymizedClientCount} alți clienți
                    <span className="text-[11px] font-normal text-ink-subtle">
                      · 12 complet · 21 în procesare · 6 cu documente lipsă
                    </span>
                  </div>
                  <span className="text-[11px] text-ink-subtle">
                    Click pentru detalii
                  </span>
                </div>
              </TableCell>
            </TableRow>

            {anonExpanded && (
              <TableRow>
                <TableCell colSpan={7} className="bg-[hsl(40_30%_99%_/_0.6)] px-5 py-6">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[12px] text-ink-muted sm:grid-cols-3">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between border-b border-border/50 py-1.5"
                      >
                        <span>Client anonimizat #{i + 9}</span>
                        <Badge variant={i % 4 === 0 ? "amber" : "green"} className="text-[10px]">
                          {i % 4 === 0 ? "lipsă" : "complet"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 text-center text-[11px] italic text-ink-subtle">
                    … și încă 27 clienți. Fișe detaliate ascunse în demo pentru claritate.
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="rounded-xl border border-dashed border-border bg-cream/40 p-4 text-[12.5px] text-ink-muted">
        <strong className="font-medium text-ink">Click pe Constructii Brîncoveanu SRL</strong>{" "}
        pentru fișa detaliată a clientului — apoi continuă spre pasul 3 (SPV auto-pull) via butonul
        principal din dreapta-sus.
      </div>
    </div>
  );
}

function ClientAvatar({ name, status }: { name: string; status: Client["status"] }) {
  const initials = name
    .replace(/SRL|SA|PFA/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const bg =
    status === "complete"
      ? "from-emerald-500/70 to-emerald-700/80"
      : status === "missing"
      ? "from-amber-400/70 to-amber-600/80"
      : status === "uncontacted"
      ? "from-rose-400/80 to-rose-600/80"
      : "from-sky-400/80 to-sky-600/80";
  return (
    <div
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-br text-[11px] font-semibold text-white shadow-[inset_0_1px_0_hsl(0_0%_100%/0.2)]",
        bg
      )}
    >
      {initials}
    </div>
  );
}

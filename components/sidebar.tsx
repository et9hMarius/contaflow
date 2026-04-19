"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  FileCheck2,
  ShieldCheck,
  BarChart3,
  Settings,
  Download,
  Wand2,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { firm } from "@/lib/mock-data";

type Item = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  count?: string;
  step?: number;
};

const items: Item[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, step: 1 },
  { href: "/clients/3", label: "Clienți", icon: Users, count: "47", step: 2 },
  { href: "/spv-pull", label: "SPV e-Factura", icon: Download, count: "1.247", step: 3 },
  { href: "/categorize", label: "Documente", icon: Wand2, count: "394", step: 4 },
  { href: "/saga-export", label: "Export Saga", icon: FileText, step: 5 },
  { href: "/declarations", label: "Declarații", icon: FileCheck2, count: "12", step: 6 },
  { href: "/saft", label: "SAF-T D406", icon: ShieldCheck, count: "15", step: 7 },
  { href: "/summary", label: "Rezumat", icon: Sparkles, step: 8 },
];

const secondary: Item[] = [
  { href: "#", label: "Rapoarte", icon: BarChart3 },
  { href: "#", label: "Setări", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-border/70 bg-[hsl(40_30%_99%)] lg:flex">
      <div className="flex h-16 items-center px-5 border-b border-border/70">
        <Logo />
      </div>

      <nav className="flex-1 overflow-y-auto slim-scroll px-3 py-5">
        <div className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
          Flux închidere martie
        </div>
        <ul className="space-y-0.5">
          {items.map((item) => {
            const active =
              pathname === item.href ||
              (item.href === "/clients/3" && pathname.startsWith("/clients"));
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-ink-muted hover:bg-muted/70 hover:text-ink"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-semibold tabular-nums",
                      active
                        ? "bg-white/15 text-primary-foreground"
                        : "bg-muted text-ink-subtle group-hover:bg-muted/80"
                    )}
                  >
                    {item.step ?? <Icon className="h-3 w-3" />}
                  </span>
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      active ? "text-primary-foreground" : "text-ink-subtle"
                    )}
                  />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.count && (
                    <span
                      className={cn(
                        "shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold tabular-nums",
                        active
                          ? "bg-white/15 text-primary-foreground/90"
                          : "bg-muted text-ink-subtle"
                      )}
                    >
                      {item.count}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
          Firma
        </div>
        <ul className="space-y-0.5">
          {secondary.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium text-ink-muted transition-colors hover:bg-muted/70 hover:text-ink"
                >
                  <span className="h-5 w-5" />
                  <Icon className="h-4 w-4 text-ink-subtle" />
                  <span className="flex-1 truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-border/70 p-4">
        <div className="rounded-lg border border-border/70 bg-white p-3 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-ink">{firm.seniorAccountant.split(" ")[0]}</span>
            <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700">
              CECCAR
            </span>
          </div>
          <div className="mt-0.5 text-ink-subtle">{firm.name}</div>
          <div className="mt-0.5 text-ink-subtle">{firm.location}</div>
        </div>
      </div>
    </aside>
  );
}

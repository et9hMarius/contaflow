"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LifeBuoy, LogOut, RefreshCw, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DemoPill } from "@/components/demo-pill";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { firm } from "@/lib/mock-data";
import { useDemo } from "@/app/providers";

export function TopNav() {
  const router = useRouter();
  const { dispatch } = useDemo();

  const onReset = () => {
    dispatch({ type: "RESET" });
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-border/70 bg-[hsl(40_30%_99%_/_0.85)] px-6 backdrop-blur-md">
      <div className="hidden items-center gap-2 md:flex">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-subtle" />
          <input
            placeholder="Caută client, CUI, document…"
            className="h-8 w-72 rounded-md border border-border/70 bg-white/70 pl-8 pr-3 text-[13px] placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-border bg-white px-1 font-mono text-[10px] font-medium text-ink-subtle">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <DemoPill />
        <div className="hidden h-6 w-px bg-border md:block" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-md px-1.5 py-1 text-left transition-colors hover:bg-muted/60">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-gradient-to-br from-[hsl(222_70%_24%)] to-[hsl(222_85%_16%)] text-[10px]">
                  MP
                </AvatarFallback>
              </Avatar>
              <div className="hidden leading-tight sm:block">
                <div className="text-[13px] font-semibold text-ink">{firm.seniorAccountant}</div>
                <div className="text-[10px] text-ink-subtle">{firm.ceccarId}</div>
              </div>
              <ChevronDown className="hidden h-3.5 w-3.5 text-ink-subtle sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel>Contul meu</DropdownMenuLabel>
            <DropdownMenuItem>
              <LifeBuoy className="h-4 w-4" />
              Suport ContaFlow
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={onReset} className="text-amber-800 focus:text-amber-900">
              <RefreshCw className="h-4 w-4" />
              Restart demo
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="h-4 w-4" />
              Ieșire
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

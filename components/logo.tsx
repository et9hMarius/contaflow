import { cn } from "@/lib/utils";

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[hsl(222_70%_24%)] to-[hsl(222_85%_16%)] text-[hsl(40_30%_98%)] shadow-[0_2px_8px_-2px_hsl(222_70%_24%/0.5),inset_0_1px_0_hsl(222_100%_50%/0.2)]">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 5v14" />
          <path d="M4 12h8" />
          <path d="M12 5c4 0 7 2 7 7s-3 7-7 7" />
        </svg>
        <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-background" />
      </div>
      {!compact && (
        <div className="flex flex-col leading-none">
          <span className="font-serif text-[17px] font-semibold tracking-tight text-ink">ContaFlow</span>
          <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink-subtle">
            Portalul contabilului
          </span>
        </div>
      )}
    </div>
  );
}

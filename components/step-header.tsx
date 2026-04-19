import { cn } from "@/lib/utils";

export function StepHeader({
  step,
  eyebrow,
  title,
  lede,
  align = "left",
}: {
  step: number;
  eyebrow: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <div
        className={cn(
          "flex items-center gap-2",
          align === "center" && "justify-center"
        )}
      >
        <span className="inline-flex h-6 items-center justify-center rounded-full border border-primary/20 bg-white px-2 font-serif text-[11px] italic text-primary">
          Pasul {step} / 8
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
          {eyebrow}
        </span>
      </div>
      <h1 className="mt-3 font-serif text-[32px] font-medium leading-[1.08] tracking-tight text-ink sm:text-[38px]">
        {title}
      </h1>
      {lede && (
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
          {lede}
        </p>
      )}
    </div>
  );
}

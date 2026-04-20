"use client";

import * as React from "react";
import { useTransition } from "react";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { captureLead, type LeadPayload } from "@/app/actions";

interface LeadFormProps {
  source: LeadPayload["source"];
  variant?: "inline" | "stacked";
  withExtras?: boolean;
  buttonLabel?: string;
  placeholder?: string;
  className?: string;
  theme?: "light" | "dark";
}

export function LeadForm({
  source,
  variant = "inline",
  withExtras = false,
  buttonLabel = "Rezervă-mi locul în pilotul beta",
  placeholder = "email@firmata.ro",
  className,
  theme = "light",
}: LeadFormProps) {
  const [pending, startTransition] = useTransition();
  const [submitted, setSubmitted] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [firma, setFirma] = React.useState("");
  const [clientCount, setClientCount] = React.useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Ai uitat să completezi adresa de email.");
      return;
    }
    startTransition(async () => {
      const res = await captureLead({ email, firma, clientCount, source });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      setSubmitted(true);
      toast.success("Te-am adăugat în lista beta.", {
        description: "Îți trimitem un email în 24h cu detalii despre acces.",
        icon: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
      });
    });
  };

  if (submitted) {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl border px-4 py-3",
          theme === "dark"
            ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
            : "border-emerald-200/80 bg-emerald-50/80 text-emerald-900",
          className
        )}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        </div>
        <div>
          <div className="text-[13.5px] font-semibold">
            Mulțumim! Ești pe lista pilotului beta.
          </div>
          <div className={cn("text-[11.5px]", theme === "dark" ? "text-emerald-200/80" : "text-emerald-700")}>
            Îți trimitem detalii pe <span className="font-mono">{email}</span> în 24h.
          </div>
        </div>
      </div>
    );
  }

  const inputBase =
    theme === "dark"
      ? "bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:border-white/40"
      : "bg-white border-border/80 text-ink placeholder:text-ink-subtle focus:border-primary/40";

  if (variant === "inline" && !withExtras) {
    return (
      <form
        onSubmit={onSubmit}
        className={cn(
          "flex w-full max-w-lg flex-col gap-2 sm:flex-row sm:items-center sm:gap-0 sm:overflow-hidden sm:rounded-full sm:border sm:p-1.5 sm:shadow-[0_10px_30px_-18px_hsl(222_30%_14%/0.25)] sm:transition-shadow sm:focus-within:shadow-[0_16px_40px_-18px_hsl(222_30%_14%/0.35)]",
          theme === "dark"
            ? "sm:border-white/15 sm:bg-white/5 sm:backdrop-blur-sm"
            : "sm:border-border/80 sm:bg-white",
          className
        )}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "h-11 min-w-0 flex-1 rounded-full border px-4 text-[14px] outline-none placeholder:font-normal sm:h-auto sm:rounded-none sm:border-0 sm:bg-transparent sm:px-4 sm:py-0",
            theme === "dark"
              ? "border-white/15 bg-white/5 text-white placeholder:text-white/40"
              : "border-border/80 bg-white text-ink placeholder:text-ink-subtle"
          )}
        />
        <Button
          type="submit"
          disabled={pending}
          size="lg"
          className={cn(
            "h-11 w-full shrink-0 gap-2 rounded-full px-4 sm:w-auto sm:px-5",
            theme === "dark"
              ? "bg-amber-400 text-[hsl(222_30%_11%)] hover:bg-amber-300"
              : "bg-[hsl(222_70%_18%)] text-primary-foreground hover:bg-[hsl(222_75%_22%)]"
          )}
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Trimit…
            </>
          ) : (
            <>
              <span className="truncate">{buttonLabel}</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </>
          )}
        </Button>
      </form>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "rounded-2xl border p-5 shadow-[0_10px_30px_-18px_hsl(222_30%_14%/0.25)]",
        theme === "dark" ? "border-white/10 bg-white/[0.04]" : "border-border/80 bg-white",
        className
      )}
    >
      <div className="space-y-3">
        <label className="block">
          <span
            className={cn(
              "mb-1 block text-[10.5px] font-semibold uppercase tracking-[0.1em]",
              theme === "dark" ? "text-white/60" : "text-ink-subtle"
            )}
          >
            Email profesional
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className={cn(
              "h-11 w-full rounded-lg border px-3 text-[14px] outline-none transition-colors focus:ring-2 focus:ring-primary/20",
              inputBase
            )}
          />
        </label>

        {withExtras && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block">
              <span
                className={cn(
                  "mb-1 block text-[10.5px] font-semibold uppercase tracking-[0.1em]",
                  theme === "dark" ? "text-white/60" : "text-ink-subtle"
                )}
              >
                Firma (opțional)
              </span>
              <input
                type="text"
                value={firma}
                onChange={(e) => setFirma(e.target.value)}
                placeholder="ex. Maria Popescu Expert Contabil SRL"
                className={cn(
                  "h-10 w-full rounded-lg border px-3 text-[13.5px] outline-none transition-colors focus:ring-2 focus:ring-primary/20",
                  inputBase
                )}
              />
            </label>
            <label className="block">
              <span
                className={cn(
                  "mb-1 block text-[10.5px] font-semibold uppercase tracking-[0.1em]",
                  theme === "dark" ? "text-white/60" : "text-ink-subtle"
                )}
              >
                Câți clienți ai?
              </span>
              <select
                value={clientCount}
                onChange={(e) => setClientCount(e.target.value)}
                className={cn(
                  "h-10 w-full rounded-lg border px-3 text-[13.5px] outline-none transition-colors focus:ring-2 focus:ring-primary/20",
                  inputBase
                )}
              >
                <option value="">Alege…</option>
                <option value="1-20">1–20 clienți</option>
                <option value="21-50">21–50 clienți</option>
                <option value="51-100">51–100 clienți</option>
                <option value="101-150">101–150 clienți</option>
                <option value="150+">peste 150 clienți</option>
              </select>
            </label>
          </div>
        )}

        <Button
          type="submit"
          disabled={pending}
          size="lg"
          className={cn(
            "h-11 w-full rounded-lg",
            theme === "dark"
              ? "bg-amber-400 text-[hsl(222_30%_11%)] hover:bg-amber-300"
              : "bg-[hsl(222_70%_18%)] text-primary-foreground hover:bg-[hsl(222_75%_22%)]"
          )}
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Trimit…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {buttonLabel}
            </>
          )}
        </Button>

        <p
          className={cn(
            "text-center text-[10.5px]",
            theme === "dark" ? "text-white/50" : "text-ink-subtle"
          )}
        >
          Zero spam. Dezabonare cu un click. Respectăm GDPR.
        </p>
      </div>
    </form>
  );
}

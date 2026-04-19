"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  CheckCircle,
  Download,
  Info,
  Receipt,
  Sparkles,
  Wand2,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { StepHeader } from "@/components/step-header";
import { cn } from "@/lib/utils";
import { autoCategorizedCount, categorizeRows } from "@/lib/mock-data";
import { formatRON } from "@/lib/format";
import { useDemo } from "@/app/providers";

export default function CategorizePage() {
  const { state, dispatch } = useDemo();
  const [fadingOut, setFadingOut] = useState<Set<string>>(new Set());

  const pending = useMemo(
    () =>
      categorizeRows.filter(
        (r) => !state.confirmedRowIds.has(r.id) && !state.rejectedRowIds.has(r.id)
      ),
    [state.confirmedRowIds, state.rejectedRowIds]
  );

  const processed =
    state.confirmedRowIds.size + state.rejectedRowIds.size;
  const allDone = pending.length === 0;

  const handleConfirm = (id: string) => {
    setFadingOut((prev) => new Set(prev).add(id));
    setTimeout(() => {
      dispatch({ type: "CONFIRM_ROW", rowId: id });
      setFadingOut((prev) => {
        const n = new Set(prev);
        n.delete(id);
        return n;
      });
    }, 280);
  };

  const handleReject = (id: string) => {
    setFadingOut((prev) => new Set(prev).add(id));
    setTimeout(() => {
      dispatch({ type: "REJECT_ROW", rowId: id });
      setFadingOut((prev) => {
        const n = new Set(prev);
        n.delete(id);
        return n;
      });
    }, 280);
  };

  const pendingCount = pending.length;

  return (
    <div className="space-y-8">
      <StepHeader
        step={4}
        eyebrow="OCR + categorizare automată"
        title={`Categorizare automată — ${pendingCount + processed} documente în așteptare`}
        lede={`Am identificat furnizorul, suma, TVA-ul și categoria contabilă pentru ${autoCategorizedCount} din 394 documente. Doar ${pendingCount} mai necesită atenția ta.`}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <HeroMetric
          label="Procesate automat"
          value={autoCategorizedCount.toString()}
          sub="de ContaFlow"
          accent="emerald"
          icon={<Sparkles className="h-4 w-4" />}
        />
        <HeroMetric
          label="Necesită revizuire"
          value={pendingCount.toString()}
          sub={`din ${categorizeRows.length}`}
          accent="amber"
          icon={<Wand2 className="h-4 w-4" />}
        />
        <HeroMetric
          label="Timp estimat"
          value={pendingCount === 0 ? "gata" : `~${pendingCount * 20}s`}
          sub={pendingCount === 0 ? "totul confirmat" : "în total"}
          accent={pendingCount === 0 ? "emerald" : "primary"}
          icon={<Receipt className="h-4 w-4" />}
        />
      </div>

      <Tabs defaultValue="review">
        <TabsList className="bg-white shadow-[0_1px_0_hsl(var(--border))]">
          <TabsTrigger value="review" className="gap-2">
            Revizuire rapidă
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                pendingCount === 0
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
              )}
            >
              {pendingCount}
            </span>
          </TabsTrigger>
          <TabsTrigger value="auto">
            Auto-categorizate
            <span className="ml-2 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
              {autoCategorizedCount}
            </span>
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Respinse
            <span className="ml-2 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-ink-subtle">
              {state.rejectedRowIds.size}
            </span>
          </TabsTrigger>
        </TabsList>

        {/* REVIEW TAB */}
        <TabsContent value="review" className="mt-5">
          {!allDone ? (
            <div className="overflow-hidden rounded-xl border border-border/70 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[8%]">Preview</TableHead>
                    <TableHead className="w-[15%]">Client</TableHead>
                    <TableHead className="w-[18%]">Furnizor</TableHead>
                    <TableHead className="w-[10%] text-right">Sumă</TableHead>
                    <TableHead className="w-[10%] text-right">TVA</TableHead>
                    <TableHead className="w-[22%]">Categorie sugerată</TableHead>
                    <TableHead className="w-[10%]">Confidence</TableHead>
                    <TableHead className="w-[7%] text-right">Acțiuni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pending.map((r) => (
                    <ReviewRow
                      key={r.id}
                      row={r}
                      fading={fadingOut.has(r.id)}
                      onConfirm={() => handleConfirm(r.id)}
                      onReject={() => handleReject(r.id)}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 rounded-xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/80 via-white to-white py-14 text-center animate-fade-in">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                <CheckCircle className="h-7 w-7" />
              </div>
              <div>
                <div className="font-serif text-[24px] font-medium tracking-tight text-ink">
                  Totul categorizat.
                </div>
                <div className="mt-1 text-[13px] text-ink-muted">
                  394 documente gata pentru exportul în Saga · 0 în așteptare.
                </div>
              </div>
              <Button size="lg" asChild className="h-11 rounded-full bg-[hsl(222_70%_18%)] px-6 hover:bg-[hsl(222_75%_22%)]">
                <Link href="/saga-export">
                  Continuă la export Saga
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="auto" className="mt-5">
          <div className="overflow-hidden rounded-xl border border-border/70 bg-white">
            <div className="flex items-center justify-between border-b border-border/70 px-5 py-3">
              <div>
                <div className="font-serif text-[15px] font-medium text-ink">
                  Auto-categorizate · confidence ≥ 80%
                </div>
                <div className="text-[11px] text-ink-subtle">
                  ContaFlow le-a categorizat, tu le poți audita în orice moment
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Marchează pentru re-review
                </Button>
                <Button size="sm" asChild className="bg-[hsl(222_70%_18%)] hover:bg-[hsl(222_75%_22%)]">
                  <Link href="/saga-export">
                    <Download className="h-3.5 w-3.5" />
                    Exportă toate în Saga
                  </Link>
                </Button>
              </div>
            </div>
            <div className="slim-scroll max-h-[520px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-white">
                  <TableRow className="hover:bg-transparent">
                    <TableHead>#</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Furnizor</TableHead>
                    <TableHead className="text-right">Sumă</TableHead>
                    <TableHead>Categorie</TableHead>
                    <TableHead>Confidence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {SAMPLE_AUTO.map((a, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-mono text-[11px] text-ink-subtle">
                        {String(i + 1).padStart(4, "0")}
                      </TableCell>
                      <TableCell className="text-[12.5px]">{a.client}</TableCell>
                      <TableCell className="text-[12.5px] text-ink-muted">{a.furnizor}</TableCell>
                      <TableCell className="text-right tabular-nums text-[12.5px]">
                        {formatRON(a.suma)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="slate" className="text-[10px]">
                          {a.categorie}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                          <span className="font-mono text-[11px] text-ink-muted">{a.confidence}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="border-t border-border/60 bg-[hsl(40_30%_99%)] py-3 text-center text-[11px] italic text-ink-subtle">
                + încă {autoCategorizedCount - SAMPLE_AUTO.length} documente auto-categorizate
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="mt-5">
          <div className="rounded-xl border border-dashed border-border bg-white/60 p-10 text-center text-[13px] text-ink-muted">
            {state.rejectedRowIds.size === 0
              ? "Niciun document respins. Documentele pe care le respingi ajung aici pentru urmărire."
              : `${state.rejectedRowIds.size} document(e) respins(e).`}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ReviewRow({
  row,
  fading,
  onConfirm,
  onReject,
}: {
  row: (typeof categorizeRows)[number];
  fading: boolean;
  onConfirm: () => void;
  onReject: () => void;
}) {
  const [categorie, setCategorie] = useState(row.categorie);

  const confidenceTone =
    row.confidence >= 70 ? "text-amber-700" : "text-rose-700";
  const confidenceBarBg =
    row.confidence >= 70 ? "bg-amber-500" : "bg-rose-500";

  return (
    <TableRow
      className={cn(
        "transition-all duration-300 ease-out",
        fading && "scale-[0.99] opacity-0 translate-x-4"
      )}
    >
      <TableCell>
        <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border/70 bg-[hsl(40_30%_98%)] text-ink-subtle">
          <Receipt className="h-4 w-4" />
        </div>
      </TableCell>
      <TableCell>
        <div className="text-[12.5px] font-medium text-ink">{row.clientShort}</div>
        <div className="text-[10.5px] text-ink-subtle">{row.preview}</div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1.5 text-[12.5px] text-ink">
          {row.furnizor}
          {row.warning && (
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-600" />
              </TooltipTrigger>
              <TooltipContent>{row.warning}</TooltipContent>
            </Tooltip>
          )}
        </div>
      </TableCell>
      <TableCell className="text-right font-serif text-[13.5px] font-medium tabular-nums text-ink">
        {formatRON(row.suma, { suffix: "" })}
      </TableCell>
      <TableCell className="text-right tabular-nums text-[12.5px] text-ink-muted">
        {formatRON(row.tva, { suffix: "" })}
      </TableCell>
      <TableCell>
        <Select value={categorie} onValueChange={setCategorie}>
          <SelectTrigger className="h-8 text-[12px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
            {!CATEGORIES.includes(categorie) && (
              <SelectItem value={categorie}>{categorie}</SelectItem>
            )}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className={cn("h-full", confidenceBarBg)}
              style={{ width: `${row.confidence}%` }}
            />
          </div>
          <span className={cn("w-8 text-right font-mono text-[11px] tabular-nums", confidenceTone)}>
            {row.confidence}%
          </span>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-1">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 px-2 text-rose-700 hover:bg-rose-50"
            onClick={onReject}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="sm"
            onClick={onConfirm}
            className="h-8 gap-1 bg-[hsl(222_70%_18%)] px-3 hover:bg-[hsl(222_75%_22%)]"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Confirmă
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

function HeroMetric({
  label,
  value,
  sub,
  accent,
  icon,
}: {
  label: string;
  value: string;
  sub: string;
  accent: "emerald" | "amber" | "primary";
  icon: React.ReactNode;
}) {
  const toneClass =
    accent === "emerald"
      ? "from-emerald-500/5 text-emerald-700"
      : accent === "amber"
      ? "from-amber-500/5 text-amber-800"
      : "from-primary/5 text-primary";
  const valueTone =
    accent === "emerald"
      ? "text-emerald-700"
      : accent === "amber"
      ? "text-amber-800"
      : "text-ink";
  return (
    <div className="relative overflow-hidden rounded-xl border border-border/70 bg-white p-4">
      <div className={cn("absolute inset-0 bg-gradient-to-br to-transparent opacity-80", toneClass)} />
      <div className="relative">
        <div className={cn("inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.1em]", toneClass)}>
          {icon}
          {label}
        </div>
        <div className="mt-3 flex items-baseline gap-1.5">
          <span className={cn("font-serif text-[32px] font-medium leading-none tracking-tight tabular-nums", valueTone)}>
            {value}
          </span>
          <span className="text-[11.5px] text-ink-subtle">{sub}</span>
        </div>
      </div>
    </div>
  );
}

const CATEGORIES = [
  "Materiale construcții — deductibil integral",
  "Prestări servicii — deductibil integral",
  "Combustibil — autoturism companie (50% deductibil)",
  "Combustibil transport marfă — deductibil integral",
  "Produse alimentare — deductibil integral",
  "Materii prime HoReCa — deductibil integral",
  "Servicii comunicații — deductibil integral",
  "Consumabile medicale — deductibil integral",
  "Îngrășăminte — deductibil integral",
  "Neclasificat — necesită review manual",
];

const SAMPLE_AUTO = [
  { client: "SC TechLogic SRL", furnizor: "AWS EMEA SARL", suma: 1823.44, categorie: "Servicii cloud", confidence: 98 },
  { client: "SC TechLogic SRL", furnizor: "Google Workspace", suma: 294.12, categorie: "Servicii cloud", confidence: 97 },
  { client: "Farmacia Sf. Maria SRL", furnizor: "Farmexpert DCI SRL", suma: 14823.0, categorie: "Produse farma", confidence: 99 },
  { client: "Farmacia Sf. Maria SRL", furnizor: "A&D Pharma SRL", suma: 8720.5, categorie: "Produse farma", confidence: 98 },
  { client: "Constructii Brîncoveanu", furnizor: "Metro Cash & Carry SRL", suma: 1476.2, categorie: "Materiale construcții", confidence: 97 },
  { client: "Cafe Ursul Polar SRL", furnizor: "Selgros Cash & Carry SRL", suma: 3842.0, categorie: "Materii prime HoReCa", confidence: 96 },
  { client: "Cafe Ursul Polar SRL", furnizor: "Lidl România SCS", suma: 241.15, categorie: "Materii prime HoReCa", confidence: 91 },
  { client: "Transport Rapid TIR SRL", furnizor: "OMV Petrom SA", suma: 8342.75, categorie: "Combustibil transport", confidence: 94 },
  { client: "Transport Rapid TIR SRL", furnizor: "Dacia Service Cluj", suma: 1820.0, categorie: "Reparații auto", confidence: 88 },
  { client: "Dental Clinic Alba SRL", furnizor: "MedImpact SRL", suma: 2150.8, categorie: "Consumabile medicale", confidence: 92 },
  { client: "Dental Clinic Alba SRL", furnizor: "Electrica Furnizare SA", suma: 620.33, categorie: "Utilități", confidence: 99 },
  { client: "Ionescu Mihai PFA", furnizor: "Figma Inc.", suma: 89.0, categorie: "Software licență", confidence: 96 },
  { client: "Ionescu Mihai PFA", furnizor: "Vodafone România SA", suma: 58.0, categorie: "Comunicații", confidence: 99 },
  { client: "Agroferma Crișul SRL", furnizor: "Cargill Agriculture SRL", suma: 18420.0, categorie: "Semințe și inputuri", confidence: 95 },
  { client: "Agroferma Crișul SRL", furnizor: "Engie România SA", suma: 410.22, categorie: "Utilități", confidence: 99 },
];

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  CheckCircle2,
  Clock,
  FileClock,
  Fingerprint,
  History,
  Inbox,
  Mail,
  MessageCircle,
  Paperclip,
  Phone,
  RefreshCcw,
  Send,
  Settings2,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { NextStepBar } from "@/components/next-step";
import { cn } from "@/lib/utils";
import {
  brincoveanuDocuments,
  brincoveanuMissingDocs,
  clients,
  reminderMessage,
  type DocumentRow,
} from "@/lib/mock-data";
import { formatDateShort, formatRON } from "@/lib/format";
import { useDemo } from "@/app/providers";

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = clients.find((c) => c.id === params.id) ?? clients[2];
  const { state, dispatch } = useDemo();
  const reminded = state.remindedClientIds.has(client.id);

  const [openDoc, setOpenDoc] = useState<DocumentRow | null>(null);
  const [reminderOpen, setReminderOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(reminderMessage);

  const missingDocs = useMemo(
    () =>
      brincoveanuMissingDocs.map((m) => ({
        ...m,
        status: reminded ? "solicitat" : m.status,
        detail: reminded ? "Solicitat acum · WhatsApp + email" : m.detail,
      })),
    [reminded]
  );

  const sendReminder = () => {
    dispatch({ type: "SEND_REMINDER", clientId: client.id });
    setReminderOpen(false);
    toast.success("Reminder trimis.", {
      description: "Clientul va primi mesaj pe WhatsApp și email cu link-ul de upload.",
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
    });
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[12px] text-ink-subtle">
        <Link href="/dashboard" className="flex items-center gap-1 hover:text-ink">
          <ArrowLeft className="h-3 w-3" />
          Dashboard
        </Link>
        <span>›</span>
        <Link href="/dashboard" className="hover:text-ink">
          Clienți
        </Link>
        <span>›</span>
        <span className="text-ink">{client.name}</span>
      </div>

      {/* HEADER CARD */}
      <div className="overflow-hidden rounded-xl border border-border/70 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <div className="relative">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.6]"
            style={{
              background:
                "radial-gradient(circle at 100% 0%, hsl(222 70% 24% / 0.07), transparent 45%), linear-gradient(180deg, hsl(40 30% 98%) 0%, hsl(0 0% 100%) 60%)",
            }}
          />
          <div className="relative p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-amber-500 text-[18px] font-semibold text-white shadow-[inset_0_1px_0_hsl(0_0%_100%/0.25)]">
                  CB
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="font-serif text-[26px] font-medium tracking-tight text-ink">
                      {client.name}
                    </h1>
                    <Badge variant="amber">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      Documente lipsă
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-ink-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Fingerprint className="h-3.5 w-3.5" /> {client.cui}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5" /> CAEN {client.caen} — {client.type}
                    </span>
                  </div>
                  <div className="pt-2 text-[12.5px] text-ink-muted">
                    <span className="font-medium text-ink">{client.contact.name}</span>,{" "}
                    {client.contact.role}
                    <span className="mx-2 text-ink-subtle">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {client.contact.phone}
                    </span>
                    <span className="mx-2 text-ink-subtle">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {client.contact.email}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 lg:items-end">
                <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white px-3 py-1 text-[11.5px] text-ink-muted">
                  <Clock className="h-3 w-3" />
                  Ultima interacțiune: {formatDateShort(client.lastContact)} ·{" "}
                  {client.lastContactChannel}
                </div>
                <Badge variant="slate" className="gap-1.5">
                  <BadgeCheck className="h-3 w-3" /> {client.subscription}
                </Badge>
              </div>
            </div>
          </div>

          {/* quick stats bar */}
          <div className="grid grid-cols-2 border-t border-border/70 bg-[hsl(40_30%_99%)] sm:grid-cols-4">
            <MiniStat label="Documente primite" value={String(client.docsReceived)} tone="ink" />
            <MiniStat label="Documente lipsă" value={String(client.docsMissing)} tone="amber" />
            <MiniStat label="Volum lunar" value={`${client.monthlyVolume}`} sub="docs/lună" tone="ink" />
            <MiniStat
              label="Restanțe ANAF"
              value={String(client.overdueDeclarations?.length ?? 0)}
              sub={client.overdueDeclarations ? "declarații" : "fără restanțe"}
              tone={client.overdueDeclarations ? "red" : "ink"}
            />
          </div>
        </div>
      </div>

      {/* TABS */}
      <Tabs defaultValue="docs">
        <div className="overflow-x-auto">
          <TabsList className="bg-white/80 shadow-[0_1px_0_hsl(var(--border))]">
            <TabsTrigger value="docs" className="gap-1.5">
              <Inbox className="h-3.5 w-3.5" />
              Documente
            </TabsTrigger>
            <TabsTrigger value="declaratii">Declarații</TabsTrigger>
            <TabsTrigger value="spv-emise" className="gap-1.5">
              Facturi emise (SPV)
            </TabsTrigger>
            <TabsTrigger value="spv-primite">Facturi primite (SPV)</TabsTrigger>
            <TabsTrigger value="banca">
              <Banknote className="h-3.5 w-3.5" /> Bancă
            </TabsTrigger>
            <TabsTrigger value="istoric">
              <History className="h-3.5 w-3.5" /> Istoric
            </TabsTrigger>
            <TabsTrigger value="setari">
              <Settings2 className="h-3.5 w-3.5" /> Setări
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="docs" className="mt-5">
          <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
            {/* Documents inbox */}
            <div className="overflow-hidden rounded-xl border border-border/70 bg-white">
              <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
                <div>
                  <div className="font-serif text-[15px] font-medium text-ink">
                    Inbox documente — martie 2026
                  </div>
                  <div className="text-[11px] text-ink-subtle">
                    12 documente · 10 OCR complet · 1 în procesare · 1 necesită review
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Upload className="h-3.5 w-3.5" />
                  Încarcă manual
                </Button>
              </div>
              <div className="divide-y divide-border/70">
                {brincoveanuDocuments.map((d) => (
                  <DocRow key={d.id} doc={d} onView={() => setOpenDoc(d)} />
                ))}
              </div>
            </div>

            {/* Missing docs panel */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-xl border border-border/70 bg-white">
                <div className="border-b border-border/70 px-4 py-3">
                  <div className="font-serif text-[15px] font-medium text-ink">
                    Documente lipsă detectate
                  </div>
                  <div className="text-[11px] text-ink-subtle">
                    Diferență între e-Factura din SPV și documentele primite
                  </div>
                </div>
                <ul className="divide-y divide-border/70">
                  {missingDocs.map((m) => {
                    const isSolicited = m.status === "solicitat";
                    return (
                      <li
                        key={m.id}
                        className={cn(
                          "flex items-start gap-3 px-4 py-3 transition-colors",
                          isSolicited ? "bg-amber-50/50" : "bg-rose-50/30"
                        )}
                      >
                        <span
                          className={cn(
                            "mt-1 h-2 w-2 shrink-0 rounded-full",
                            isSolicited ? "bg-amber-500" : "bg-rose-500"
                          )}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-[13px] font-medium text-ink">{m.label}</div>
                          <div
                            className={cn(
                              "text-[11px]",
                              isSolicited ? "text-amber-800" : "text-rose-700"
                            )}
                          >
                            {m.detail}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="border-t border-border/70 bg-[hsl(40_30%_99%)] p-3">
                  <Button
                    variant="default"
                    size="lg"
                    className="h-11 w-full rounded-lg bg-[hsl(222_70%_18%)] hover:bg-[hsl(222_75%_22%)]"
                    onClick={() => setReminderOpen(true)}
                    disabled={reminded}
                  >
                    {reminded ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Reminder trimis
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Trimite reminder automat
                      </>
                    )}
                  </Button>
                  <div className="mt-2 text-center text-[11px] text-ink-subtle">
                    WhatsApp + email cu link personalizat de upload
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border/70 bg-gradient-to-br from-primary/5 to-transparent p-4">
                <div className="flex items-center gap-2 text-[12px] font-semibold text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  Sugestie ContaFlow
                </div>
                <p className="mt-2 text-[12.5px] leading-relaxed text-ink-muted">
                  Clientul are{" "}
                  <strong className="font-medium text-ink">
                    {client.overdueDeclarations?.length ?? 0} declarații restante
                  </strong>{" "}
                  și un istoric de trimitere cu întârziere. Setează un reminder săptămânal
                  automat între 15 și 25 ale lunii?
                </p>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  <RefreshCcw className="h-3.5 w-3.5" />
                  Activează reminder automat lunar
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="declaratii" className="mt-5">
          <Placeholder title="Declarații client" desc="În curs de procesare — vezi pasul 6 din demo pentru declarațiile consolidate." />
        </TabsContent>

        <TabsContent value="spv-emise" className="mt-5">
          <Placeholder title="Facturi emise via SPV" desc="În procesare..." />
        </TabsContent>

        <TabsContent value="spv-primite" className="mt-5">
          <div className="flex items-center justify-between rounded-xl border border-border/70 bg-white p-4">
            <div>
              <div className="font-serif text-[15px] font-medium text-ink">
                Facturi primite — sincronizate din SPV
              </div>
              <div className="text-[11.5px] text-ink-subtle">
                Ultima sincronizare: azi, 09:14 · 34 facturi primite în martie
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/spv-pull">
                <RefreshCcw className="h-3.5 w-3.5" />
                Pull din SPV acum
              </Link>
            </Button>
          </div>
          <Placeholder
            className="mt-4"
            title="Listă completă"
            desc="Preview complet disponibil după pasul 3 — SPV auto-pull."
          />
        </TabsContent>

        <TabsContent value="banca" className="mt-5">
          <Placeholder title="Extrase bancare" desc="În procesare..." />
        </TabsContent>
        <TabsContent value="istoric" className="mt-5">
          <Placeholder title="Istoric comunicări & modificări" desc="În procesare..." />
        </TabsContent>
        <TabsContent value="setari" className="mt-5">
          <Placeholder title="Setări client" desc="În procesare..." />
        </TabsContent>
      </Tabs>

      {/* OCR modal */}
      <Dialog open={!!openDoc} onOpenChange={(o) => !o && setOpenDoc(null)}>
        <DialogContent className="max-w-4xl">
          {openDoc && <OcrPreview doc={openDoc} onClose={() => setOpenDoc(null)} />}
        </DialogContent>
      </Dialog>

      {/* Reminder modal */}
      <Dialog open={reminderOpen} onOpenChange={setReminderOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-[22px]">
              Reminder automat către {client.contact.name.split(" ")[0]}
            </DialogTitle>
            <DialogDescription>
              Mesaj pre-scris de ContaFlow pe baza documentelor lipsă detectate. Poți edita
              înainte de trimitere.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-xl border border-border/70 bg-[hsl(142_44%_97%)] p-4">
            <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
              <div className="flex items-center gap-2 text-[12px] font-medium text-emerald-800">
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp Business · +40 744 xxx xxx
              </div>
              <span className="text-[11px] text-emerald-700/70">draft</span>
            </div>
            {editing ? (
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={10}
                className="mt-3 w-full resize-none rounded-md border border-emerald-200/60 bg-white p-3 text-[13px] leading-relaxed text-ink focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            ) : (
              <pre className="mt-3 whitespace-pre-wrap font-sans text-[13px] leading-relaxed text-ink">
                {message}
              </pre>
            )}
          </div>

          <div className="flex items-center gap-2 text-[11.5px] text-ink-subtle">
            <Paperclip className="h-3 w-3" />
            Se trimite și pe email ({client.contact.email}) cu același conținut + link de upload.
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setEditing((v) => !v)}>
              {editing ? "Termină editarea" : "Editează"}
            </Button>
            <Button onClick={sendReminder} className="bg-[hsl(222_70%_18%)] hover:bg-[hsl(222_75%_22%)]">
              <Send className="h-4 w-4" />
              Trimite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <NextStepBar
        hint="Pasul 3"
        label="Continuă cu SPV auto-pull"
        href="/spv-pull"
        floating
      />
    </div>
  );
}

function MiniStat({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub?: string;
  tone: "ink" | "amber" | "red";
}) {
  const toneClass =
    tone === "red" ? "text-rose-700" : tone === "amber" ? "text-amber-800" : "text-ink";
  return (
    <div className="flex flex-col gap-0.5 border-r border-border/70 px-5 py-3 last:border-r-0">
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink-subtle">
        {label}
      </span>
      <div className="flex items-baseline gap-1.5">
        <span className={cn("font-serif text-[22px] font-medium tabular-nums leading-none", toneClass)}>
          {value}
        </span>
        {sub && <span className="text-[11px] text-ink-subtle">{sub}</span>}
      </div>
    </div>
  );
}

function DocRow({ doc, onView }: { doc: DocumentRow; onView: () => void }) {
  const typeVariant: Record<DocumentRow["type"], "blue" | "amber" | "green" | "slate"> = {
    "Factură furnizor": "blue",
    "Factură emisă": "slate",
    "Bon fiscal": "amber",
    "Extras bancar": "green",
    "Chitanță": "slate",
  };
  const statusVariant: Record<DocumentRow["ocrStatus"], "green" | "amber" | "red"> = {
    "OCR completat": "green",
    "În procesare": "amber",
    "Necesită verificare": "red",
  };
  const isImage = doc.filename.match(/\.(jpe?g|png)$/i);
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-muted/40">
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border/70",
          isImage
            ? "bg-[repeating-linear-gradient(45deg,hsl(220_20%_96%)_0,hsl(220_20%_96%)_3px,hsl(220_20%_92%)_3px,hsl(220_20%_92%)_6px)]"
            : "bg-[hsl(40_30%_99%)]"
        )}
      >
        <FileClock className="h-4 w-4 text-ink-subtle" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-mono text-[12.5px] text-ink">{doc.filename}</span>
          <Badge variant={typeVariant[doc.type]} className="text-[10px]">
            {doc.type}
          </Badge>
        </div>
        <div className="text-[11px] text-ink-subtle">
          {doc.uploadedBy} · {new Date(doc.uploadedAt).toLocaleString("ro-RO", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
      <Badge variant={statusVariant[doc.ocrStatus]} className="text-[10px]">
        {doc.ocrStatus}
      </Badge>
      <Button variant="ghost" size="sm" onClick={onView}>
        Vezi
      </Button>
    </div>
  );
}

function OcrPreview({ doc, onClose }: { doc: DocumentRow; onClose: () => void }) {
  const e = doc.extracted;
  const fallback = {
    furnizor: "Metro Cash & Carry România SRL",
    cui: "RO8119286",
    numar: "F-2026-00452819",
    data: "18.03.2026",
    fara_tva: 1240.5,
    tva_rate: 19,
    tva: 235.7,
    total: 1476.2,
    categorie: "Materiale construcții — deductibil integral",
    confidence: 97,
  };
  const data = e ?? fallback;

  const [categorie, setCategorie] = useState(data.categorie);

  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <div className="font-serif text-[18px] font-medium tracking-tight text-ink">
            Document OCR
          </div>
          <Badge variant="green" className="gap-1">
            <BadgeCheck className="h-3 w-3" />
            {data.confidence}% încredere
          </Badge>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-[hsl(40_30%_97%)] to-white p-6">
          <div className="noise pointer-events-none absolute inset-0" />
          <div className="relative space-y-4 font-mono text-[11.5px] text-ink-muted">
            <div className="text-center">
              <div className="font-sans text-[16px] font-semibold text-ink">
                {data.furnizor}
              </div>
              <div className="text-[10px] uppercase tracking-wider">
                CUI {data.cui} · J40/12345/2008
              </div>
            </div>
            <div className="ornament-rule" />
            <div className="flex justify-between">
              <div>
                <div className="text-[9px] uppercase">Factură fiscală nr.</div>
                <div className="font-sans text-[13px] font-semibold text-ink">
                  {data.numar}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[9px] uppercase">Data emiterii</div>
                <div className="font-sans text-[13px] font-semibold text-ink">
                  {data.data}
                </div>
              </div>
            </div>
            <div className="ornament-rule" />
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span>Materiale construcții — ciment Portland CEM II</span>
                <span>{formatRON(820.4)}</span>
              </div>
              <div className="flex justify-between">
                <span>Materiale construcții — oțel-beton BST500</span>
                <span>{formatRON(420.1)}</span>
              </div>
            </div>
            <div className="ornament-rule" />
            <div className="space-y-1 font-sans text-[12px]">
              <div className="flex justify-between text-ink">
                <span>Subtotal fără TVA</span>
                <span className="tabular-nums">{formatRON(data.fara_tva)}</span>
              </div>
              <div className="flex justify-between text-ink">
                <span>TVA {data.tva_rate}%</span>
                <span className="tabular-nums">{formatRON(data.tva)}</span>
              </div>
              <div className="flex justify-between border-t border-border/60 pt-1.5 text-[13px] font-semibold text-ink">
                <span>TOTAL DE PLATĂ</span>
                <span className="tabular-nums">{formatRON(data.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <div className="font-serif text-[18px] font-medium tracking-tight text-ink">
            Date extrase
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wide text-ink-subtle">
            {doc.filename}
          </span>
        </div>
        <div className="rounded-xl border border-border/70 bg-white p-5">
          <dl className="space-y-3 text-[13px]">
            <Field label="Furnizor" value={data.furnizor} />
            <Field label="CUI furnizor" value={data.cui} mono />
            <Field label="Număr factură" value={data.numar} mono />
            <Field label="Data" value={data.data} />
            <div className="grid grid-cols-3 gap-3 border-t border-border/60 pt-3">
              <FieldSmall label="Fără TVA" value={formatRON(data.fara_tva, { suffix: "" })} />
              <FieldSmall label={`TVA ${data.tva_rate}%`} value={formatRON(data.tva, { suffix: "" })} />
              <FieldSmall label="Total" value={formatRON(data.total, { suffix: "" })} strong />
            </div>
            <div className="border-t border-border/60 pt-3">
              <div className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink-subtle">
                Categorie sugerată
              </div>
              <Select value={categorie} onValueChange={setCategorie}>
                <SelectTrigger className="h-9 text-[12.5px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Materiale construcții — deductibil integral">
                    Materiale construcții — deductibil integral
                  </SelectItem>
                  <SelectItem value="Prestări servicii — deductibil integral">
                    Prestări servicii — deductibil integral
                  </SelectItem>
                  <SelectItem value="Combustibil — autoturism (50% deductibil)">
                    Combustibil — autoturism (50% deductibil)
                  </SelectItem>
                  <SelectItem value="Neclasificat — necesită review manual">
                    Neclasificat — necesită review manual
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-[11.5px] text-emerald-800">
              <div className="h-1 flex-1 rounded-full bg-emerald-200">
                <div
                  className="h-1 rounded-full bg-emerald-500"
                  style={{ width: `${data.confidence}%` }}
                />
              </div>
              <span className="font-medium tabular-nums">{data.confidence}% încredere</span>
            </div>
          </dl>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Button className="flex-1 bg-[hsl(222_70%_18%)] hover:bg-[hsl(222_75%_22%)]">
            <CheckCircle2 className="h-4 w-4" /> Confirmă și adaugă în Saga
          </Button>
          <Button variant="outline">Editează</Button>
          <Button variant="ghost" className="text-rose-700 hover:bg-rose-50">
            <X className="h-4 w-4" /> Respinge
          </Button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between border-b border-dashed border-border/60 pb-1.5">
      <dt className="text-[11.5px] text-ink-subtle">{label}</dt>
      <dd className={cn("text-ink", mono && "font-mono text-[12px]")}>{value}</dd>
    </div>
  );
}

function FieldSmall({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-wide text-ink-subtle">
        {label}
      </div>
      <div className={cn("font-serif tabular-nums", strong ? "text-[18px] font-medium" : "text-[15px]")}>
        {value}
      </div>
    </div>
  );
}

function Placeholder({
  title,
  desc,
  className,
}: {
  title: string;
  desc: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-white/60 py-14 text-center",
        className
      )}
    >
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-subtle">
        <Clock className="h-3 w-3" />
        În procesare
      </div>
      <div className="font-serif text-[18px] text-ink">{title}</div>
      <div className="mt-1 max-w-md text-[12.5px] text-ink-subtle">{desc}</div>
    </div>
  );
}

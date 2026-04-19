"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowRight,
  Archive,
  CheckCircle2,
  Download,
  FileCode2,
  Link2,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StepHeader } from "@/components/step-header";
import { cn } from "@/lib/utils";
import { useDemo } from "@/app/providers";

type Format = "Saga" | "WinMentor" | "Ciel" | "SmartBill Conta";

const FORMATS: { id: Format; label: string; ext: string; note: string }[] = [
  { id: "Saga", label: "Saga", ext: "XML + DBF", note: "Cel mai folosit engine de ținere a contabilității în RO" },
  { id: "WinMentor", label: "WinMentor", ext: "XML", note: "Pentru firmele care încă rulează pe WinMentor Classic / Enterprise" },
  { id: "Ciel", label: "Ciel", ext: "XML + TXT", note: "Ciel Gestiune + Ciel Contabilitate" },
  { id: "SmartBill Conta", label: "SmartBill Conta", ext: "API / XLSX", note: "Import direct prin API sau XLSX" },
];

const previews: Record<Format, string> = {
  Saga: `<?xml version="1.0" encoding="UTF-8"?>
<SagaExport version="2026.1" firma="Maria Popescu Expert Contabil SRL">
  <Metadata>
    <GeneratLa>2026-04-27T10:22:14+03:00</GeneratLa>
    <Perioada luna="03" an="2026"/>
    <NrClienti>47</NrClienti>
    <NrInregistrari>1247</NrInregistrari>
  </Metadata>
  <Client cui="RO38291047" nume="SC TechLogic SRL">
    <FacturaPrimita>
      <Numar>F-2026-00452819</Numar>
      <Data>2026-03-18</Data>
      <Furnizor cui="RO8119286">Metro Cash & Carry România SRL</Furnizor>
      <Suma fara_tva="1240.50" tva="235.70" total="1476.20" moneda="RON"/>
      <CategorieContabila cod="602">Materiale auxiliare</CategorieContabila>
      <Conturi>
        <NotaContabila debit="602" credit="401" suma="1240.50"/>
        <NotaContabila debit="4426" credit="401" suma="235.70"/>
      </Conturi>
    </FacturaPrimita>
    <FacturaEmisa>
      <Numar>F-2026-00012</Numar>
      <Data>2026-03-05</Data>
      <Client cui="RO19384756">Constructii Brîncoveanu SRL</Client>
      <Suma fara_tva="8420.00" tva="1599.80" total="10019.80" moneda="RON"/>
      <CategorieContabila cod="704">Lucrări executate</CategorieContabila>
    </FacturaEmisa>
    ...`,
  WinMentor: `<?xml version="1.0" encoding="windows-1250"?>
<WMEXPORT versiune="2026.03" firma="Maria Popescu Expert Contabil SRL">
  <CAP_DATE>
    <DATA>27.04.2026</DATA>
    <LUNA>03/2026</LUNA>
    <TOTAL_INREG>1247</TOTAL_INREG>
  </CAP_DATE>
  <Partener COD_FISCAL="RO38291047">
    <DENUMIRE>SC TechLogic SRL</DENUMIRE>
    <TIP>CLIENT_FURNIZOR</TIP>
  </Partener>
  <Document TIP="FACTURA_INTRARE">
    <NUMAR>F-2026-00452819</NUMAR>
    <DATA>18.03.2026</DATA>
    <COD_FISCAL_FURNIZOR>RO8119286</COD_FISCAL_FURNIZOR>
    <VALOARE>1240.50</VALOARE>
    <TVA>235.70</TVA>
    <TOTAL>1476.20</TOTAL>
    <CONT_DEBIT>602</CONT_DEBIT>
    <CONT_CREDIT>401</CONT_CREDIT>
  </Document>
  <Document TIP="FACTURA_IESIRE">
    <NUMAR>F-2026-00012</NUMAR>
    <DATA>05.03.2026</DATA>
    <VALOARE>8420.00</VALOARE>
    <TVA>1599.80</TVA>
    <TOTAL>10019.80</TOTAL>
    <CONT_DEBIT>4111</CONT_DEBIT>
    <CONT_CREDIT>704</CONT_CREDIT>
  </Document>
  ...`,
  Ciel: `<?xml version="1.0" encoding="UTF-8"?>
<CielImport dateGeneration="2026-04-27">
  <Entreprise codeSiret="RO38291047" nom="SC TechLogic SRL">
    <PieceComptable type="ACHAT" numero="F-2026-00452819">
      <Date>18/03/2026</Date>
      <Fournisseur codeTVA="RO8119286">Metro Cash &amp; Carry SRL</Fournisseur>
      <Ligne>
        <CompteDebit>602000</CompteDebit>
        <CompteCredit>401000</CompteCredit>
        <Montant devise="RON">1240.50</Montant>
        <TVAMontant>235.70</TVAMontant>
      </Ligne>
    </PieceComptable>
    <PieceComptable type="VENTE" numero="F-2026-00012">
      <Date>05/03/2026</Date>
      <Client>Constructii Brîncoveanu SRL</Client>
      <Ligne>
        <CompteDebit>411000</CompteDebit>
        <CompteCredit>704000</CompteCredit>
        <Montant devise="RON">8420.00</Montant>
      </Ligne>
    </PieceComptable>
  </Entreprise>
  ...`,
  "SmartBill Conta": `{
  "format": "smartbill-conta-import/v3",
  "generated_at": "2026-04-27T10:22:14+03:00",
  "firm": {
    "name": "Maria Popescu Expert Contabil SRL",
    "period": "2026-03"
  },
  "clients": [
    {
      "cui": "RO38291047",
      "name": "SC TechLogic SRL",
      "entries": [
        {
          "type": "purchase_invoice",
          "number": "F-2026-00452819",
          "date": "2026-03-18",
          "supplier": {
            "cui": "RO8119286",
            "name": "Metro Cash & Carry România SRL"
          },
          "amount_no_vat": 1240.50,
          "vat": 235.70,
          "total": 1476.20,
          "currency": "RON",
          "account_debit": "602",
          "account_credit": "401",
          "category": "materiale_auxiliare"
        }
      ]
    }
  ]
  ...`,
};

export default function SagaExportPage() {
  const { state, dispatch } = useDemo();
  const [format, setFormat] = useState<Format>(state.exportFormat);

  const handleFormat = (f: Format) => {
    setFormat(f);
    dispatch({ type: "SET_EXPORT_FORMAT", format: f });
  };

  const handleDownload = () => {
    dispatch({ type: "EXPORT_SAGA" });
    toast.success("Descărcare pornită (demo)", {
      description: `Fișier ${format} generat — 4,2 MB · 1.247 înregistrări`,
      icon: <Download className="h-4 w-4 text-sky-400" />,
    });
  };

  const current = FORMATS.find((f) => f.id === format)!;

  return (
    <div className="space-y-8">
      <StepHeader
        step={5}
        eyebrow="Integrare bookkeeping engine"
        title={`Export în ${current.label} — gata de import`}
        lede={
          format === "Saga"
            ? "Fișierul este generat în formatul Saga standard (XML + DBF). Deschide Saga, File → Import, selectează fișierul. Durează 10 secunde."
            : format === "WinMentor"
            ? "Generat în formatul XML acceptat de WinMentor Classic și Enterprise. Import direct prin Administrare → Import date."
            : format === "Ciel"
            ? "Formate XML + TXT compatibile cu Ciel Gestiune și Ciel Contabilitate, inclusiv plan de conturi francez."
            : "Import prin API SmartBill Conta sau export XLSX pentru firmele care preferă validarea manuală."
        }
      />

      <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
        {/* FILE SUMMARY CARD */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-border/70 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/5 text-primary">
                  <Package className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-ink">Fișier export</div>
                  <div className="text-[10.5px] text-ink-subtle">Generat acum 3 secunde</div>
                </div>
              </div>
              <Badge variant="green" className="gap-1">
                <CheckCircle2 className="h-3 w-3" />
                valid
              </Badge>
            </div>
            <div className="p-4">
              <div className="rounded-lg bg-[hsl(40_30%_98%)] px-3 py-2.5 font-mono text-[11.5px]">
                <div className="text-ink">
                  export_
                  <span className="text-primary">{format.toLowerCase().replace(/\s+/g, "_")}</span>
                  _martie_2026_47clienti.zip
                </div>
                <div className="mt-0.5 text-[10px] text-ink-subtle">
                  SHA-256 · a7f3…b102 · semnat digital
                </div>
              </div>

              <dl className="mt-4 space-y-2 text-[12.5px]">
                <Row label="Format">
                  <span className="font-serif italic text-ink">{current.ext}</span>
                </Row>
                <Row label="Mărime">
                  <span className="font-mono text-ink">4,2 MB</span>
                </Row>
                <Row label="Înregistrări contabile">
                  <span className="font-mono text-ink">1.247</span>
                </Row>
                <Row label="Fișe clienți">
                  <span className="font-mono text-ink">47</span>
                </Row>
                <Row label="Declarații pre-completate">
                  <span className="font-mono text-ink">12</span>
                </Row>
                <Row label="Compatibilitate">
                  <Badge variant="blue" className="text-[10px]">
                    {current.label} v2026.1+
                  </Badge>
                </Row>
              </dl>

              <Button
                onClick={handleDownload}
                className="mt-5 h-11 w-full rounded-lg bg-[hsl(222_70%_18%)] hover:bg-[hsl(222_75%_22%)]"
              >
                <Download className="h-4 w-4" />
                Descarcă fișier
              </Button>
              <Button variant="ghost" size="sm" className="mt-2 w-full text-ink-subtle">
                <Link2 className="h-3.5 w-3.5" />
                Copiază link de acces direct
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-4">
            <div className="flex items-center gap-2 text-[12px] font-semibold text-primary">
              <Archive className="h-3.5 w-3.5" />
              Istoric export
            </div>
            <p className="mt-2 text-[12px] leading-relaxed text-ink-muted">
              Fiecare fișier generat rămâne versionat în istoric. Dacă trebuie să regenerezi un
              export pentru februarie 2026 — un click.
            </p>
          </div>
        </div>

        {/* XML/JSON PREVIEW */}
        <div className="overflow-hidden rounded-xl border border-border/70 bg-[hsl(222_30%_10%)] text-[hsl(40_30%_92%)] shadow-[0_10px_40px_-20px_hsl(222_30%_14%/0.25)]">
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
              <span className="ml-3 font-mono text-[10.5px] uppercase tracking-wide text-white/40">
                preview · {format === "SmartBill Conta" ? "payload.json" : "export.xml"}
              </span>
            </div>
            <span className="font-mono text-[10.5px] text-white/40">primele 30 de linii</span>
          </div>

          {/* FORMAT TOGGLE */}
          <div className="border-b border-white/5 px-4 py-3">
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
              {FORMATS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => handleFormat(f.id)}
                  className={cn(
                    "group rounded-md border px-3 py-2 text-left transition-all",
                    format === f.id
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                      : "border-white/5 bg-white/[0.02] text-white/70 hover:bg-white/[0.05]"
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        format === f.id ? "bg-emerald-400" : "bg-white/30"
                      )}
                    />
                    <span className="text-[12.5px] font-semibold">{f.label}</span>
                  </div>
                  <div className="mt-0.5 text-[10.5px] text-white/50">{f.ext}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="slim-scroll max-h-[460px] overflow-y-auto">
            <pre className="xml-preview relative overflow-x-auto px-5 py-4 text-[hsl(40_30%_92%)]">
              <SyntaxHighlight code={previews[format]} />
            </pre>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-border/70 bg-white p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
            <FileCode2 className="h-4 w-4" />
          </div>
          <div className="text-[13px]">
            <div className="font-semibold text-ink">Schema validată local</div>
            <div className="text-[11.5px] text-ink-muted">
              Validator ContaFlow rulează înainte de export — 0 erori, 0 avertismente
            </div>
          </div>
        </div>
        <Button asChild className="bg-[hsl(222_70%_18%)] hover:bg-[hsl(222_75%_22%)]">
          <Link href="/declarations">
            Continuă la declarații
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-dashed border-border/60 pb-1.5 last:border-0 last:pb-0">
      <dt className="text-[11.5px] text-ink-subtle">{label}</dt>
      <dd className="text-right">{children}</dd>
    </div>
  );
}

function SyntaxHighlight({ code }: { code: string }) {
  const lines = code.split("\n");
  return (
    <code className="block">
      {lines.map((line, i) => (
        <div key={i} className="flex">
          <span className="mr-4 w-7 shrink-0 select-none text-right text-white/25">
            {String(i + 1).padStart(2, " ")}
          </span>
          <span className="min-w-0 flex-1 whitespace-pre">{colorize(line)}</span>
        </div>
      ))}
    </code>
  );
}

function colorize(line: string) {
  // Light-weight tokenizer for both XML and JSON using matchAll
  const pattern = /(<\/?[\w:-]+)|([\w:-]+)="([^"]*)"|"([\w_]+)":|"([^"]*)"|(\d+\.?\d*)/g;
  const tokens: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of line.matchAll(pattern)) {
    const idx = m.index ?? 0;
    if (idx > last) tokens.push(line.slice(last, idx));
    if (m[1]) tokens.push(<span key={key++} className="text-sky-300">{m[1]}</span>);
    else if (m[2]) {
      tokens.push(<span key={key++} className="text-amber-200">{m[2]}</span>);
      tokens.push('="');
      tokens.push(<span key={key++} className="text-emerald-200">{m[3]}</span>);
      tokens.push('"');
    } else if (m[4]) {
      tokens.push(<span key={key++} className="text-amber-200">"{m[4]}"</span>);
      tokens.push(":");
    } else if (m[5]) {
      tokens.push(<span key={key++} className="text-emerald-200">"{m[5]}"</span>);
    } else if (m[6]) {
      tokens.push(<span key={key++} className="text-rose-200">{m[6]}</span>);
    }
    last = idx + m[0].length;
  }
  if (last < line.length) tokens.push(line.slice(last));
  return tokens;
}

# Accountant Client Portal — Functional Demo Spec

**For:** Claude Code
**Goal:** Build a clickable, locally-runnable prototype that walks through the monthly close workflow from the accountant's perspective. All data is mocked. No real API calls. The point is to make the product tangible enough that a human can feel the value in 90 seconds.

**Working name for the product:** `ContaFlow` (placeholder — change if you want something else)

**Who the prototype is for:** A non-technical co-founder, potential customer (expert contabil), or investor. They should be able to click through a realistic month-close in a browser and come away understanding *why this saves 3–5 days of work per month*.

---

## 1. Tech stack

Keep it simple and local. No backend, no DB, no auth. Everything is static data + client-side state.

- **Framework:** Next.js 14 (App Router) with TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components (install the ones you need: `button`, `card`, `table`, `badge`, `input`, `dialog`, `progress`, `tabs`, `avatar`, `select`, `tooltip`, `separator`)
- **Icons:** `lucide-react`
- **State:** React `useState` / `useReducer` (no Redux, no Zustand — too much for a demo)
- **Mock data:** a single `lib/mock-data.ts` file exporting typed fixtures
- **Routing:** file-based, one route per major screen
- **Language:** UI copy is **Romanian** (that's the whole point — the demo has to feel RO-native). Code, comments, variable names stay in English.

**Run command:** `npm run dev` → localhost:3000. That's it.

---

## 2. The fictional accounting firm

The demo is seeded with one accounting firm and its client book. All data below is fake but realistic. Use these exact names and numbers — consistency across screens is what makes the demo feel real.

**Firm:** Maria Popescu Expert Contabil SRL
- 1 senior expert contabil (Maria Popescu, CECCAR member), 2 junior accountants (Andrei Ionescu, Elena Stan)
- 47 client companies
- Bookkeeping engine: **Saga** (this matters — it's the export target throughout the demo)
- Location: Cluj-Napoca

**Current "demo date":** 27 April 2026 (we're in the thick of closing March books — the 25th just passed, Maria is behind)

**Mock clients (pick ~8 to show in detail, rest as "+39 clienți" aggregate):**

| # | Client name | CUI | Type | Monthly volume | Uses |
|:-:|:--|:--|:--|:-:|:--|
| 1 | SC TechLogic SRL | RO38291047 | IT services | ~45 docs/mo | SmartBill |
| 2 | Farmacia Sfânta Maria SRL | RO28194756 | Pharmacy | ~180 docs/mo | Paper bonuri + SmartBill |
| 3 | Constructii Brîncoveanu SRL | RO19384756 | Construction | ~90 docs/mo | Paper + WhatsApp |
| 4 | Cafe Ursul Polar SRL | RO41928374 | Café (HoReCa) | ~220 docs/mo | Oblio + paper bonuri |
| 5 | Ionescu Mihai PFA | RO47283910 | Freelance designer | ~12 docs/mo | FGO |
| 6 | Transport Rapid TIR SRL | RO33827461 | Transport | ~140 docs/mo | Paper + fuel cards |
| 7 | Dental Clinic Alba SRL | RO52837461 | Dental clinic | ~60 docs/mo | SmartBill |
| 8 | Agroferma Crișul SRL | RO27384920 | Agriculture | ~35 docs/mo | Paper only, emails PDFs |

Each client has: a status (docs complete / missing X docs / not started), last contact date, overdue declarations if any.

---

## 3. Screens (the actual demo flow)

The user walks through **8 screens in order**. Each screen has a prominent "Next →" button that advances the story. They can also jump around via the left sidebar. Every screen has a subtle "Demo mode — data is mocked" pill in the top-right corner so no one is confused.

Below, each screen has: **purpose** (what the viewer learns), **layout** (what's on the page), **interactions** (what clicks do), **mock behavior** (what happens on click, since there's no real backend).

### Screen 0 — Welcome / Demo Setup

**URL:** `/`
**Purpose:** Set the scene in 20 seconds. Make it clear this is a demo, state the scenario.

**Layout:**
- Centered card, max-width 640px.
- Logo mark: "ContaFlow" + small tagline *"Portalul contabilului roman"*
- Heading: *"Demo interactiv — închiderea lunii martie 2026"*
- Short paragraph: *"Ești Maria Popescu, expert contabil CECCAR. Ai 47 de clienți și trebuie să închei luna. Astăzi e 27 aprilie. Procesul normal îți ia 3–5 zile. Hai să-ți arătăm cum ContaFlow îl reduce la câteva ore."*
- Stats row: "47 clienți · 1.247 documente de procesat · 12 declarații de depus"
- Big button: *"Începe demo-ul →"* (navigates to `/dashboard`)
- Secondary small link: *"Sari direct la pasul X"* (dropdown with all 8 screens)

**Interactions:** button → `/dashboard`.

### Screen 1 — Dashboard (the "Monday morning" view)

**URL:** `/dashboard`
**Purpose:** Show the accountant arriving at work and seeing the state of all 47 clients at once. The pain visible before ContaFlow did anything: a wall of red-flag clients.

**Layout:**
- Top nav: ContaFlow logo left, "Maria Popescu" avatar + firm name right, demo-mode pill
- Left sidebar (persistent across all screens):
  - Dashboard
  - Clienți (47)
  - Documente (1.247)
  - Declarații (12)
  - SAF-T D406
  - Rapoarte
  - Setări
- Main area:
  - H1: *"Bună, Maria. 4 zile până la termenul limită."* (subtext: *"Ai depus 23% din declarațiile lunii martie."*)
  - Progress bar showing 23% complete (red/amber)
  - 4-card row of KPIs:
    1. *"Clienți cu documente lipsă"* — **18 din 47** (red)
    2. *"Documente de procesat"* — **394** (amber)
    3. *"Declarații de depus"* — **9 din 12** (amber)
    4. *"Timp estimat rămas"* — **~32 ore** (red)
  - Below: Table "Clienți — status închidere martie 2026"
    - Columns: Client, CUI, Docs primite, Docs lipsă, Ultima interacțiune, Status (badge), Acțiuni
    - Row for each of the 8 named clients, plus a collapsible "+39 alți clienți" group
    - Status badges: green "Complet", amber "Documente lipsă", red "Necontactat", blue "În procesare"
    - "Acțiuni" column has a `...` button that opens a dropdown (just visual — no behavior needed except one option we'll wire in Screen 2)

**Interactions:**
- Clicking on a client row → `/clients/[id]` (Screen 2) — wire this for client #3 "Constructii Brîncoveanu SRL" specifically, because that's the one we'll use to demo the workflow.
- The big CTA button top-right: *"Pornește închiderea automată →"* — for now this navigates to `/spv-pull` (Screen 3).

**Feel:** It should look busy but not overwhelming. Red/amber dominates — 18 of 47 clients have issues. The CTA button is the escape hatch.

### Screen 2 — Client Detail (the "what's going on with THIS client" view)

**URL:** `/clients/3` (for Constructii Brîncoveanu SRL)
**Purpose:** Show the per-client workflow. This is where we demo document collection — the painful "chase clients on WhatsApp" step.

**Layout:**
- Breadcrumb: Dashboard › Clienți › Constructii Brîncoveanu SRL
- Header card:
  - Company name + CUI + CAEN code (4120 - Lucrări de construcții)
  - Contact: "Gheorghe Brîncoveanu, administrator" + phone + email
  - Last contact: "18 aprilie — WhatsApp, a promis documentele"
  - Subscription badge: "Plan Standard — €5/lună per client"
- Tabs below: *Documente*, *Declarații*, *Facturi emise (SPV)*, *Facturi primite (SPV)*, *Bancă*, *Istoric*, *Setări*

**Tab: Documente (default open)**
- Split view:
  - Left: a document inbox. Show ~12 rows with:
    - Filename ("IMG_20260425_143012.jpg", "Factura_Metro_452819.pdf", "extras_cont_BT_martie.pdf", etc.)
    - Uploaded by: "Client (WhatsApp bot)" / "Client (portal)" / "Maria (manual)"
    - Upload date
    - Type auto-detected: badge "Factură furnizor", "Bon fiscal", "Extras bancar", "Chitanță"
    - Status: "OCR completat" / "În procesare" / "Necesită review"
    - Tiny action: *"Vezi"* → opens a modal with a fake OCR preview
  - Right: a "Missing documents" panel
    - Heading: *"Documente lipsă detectate"*
    - List: 
      - "Extras bancar aprilie — BT" (amber — *"Solicitat pe WhatsApp acum 2 zile"*)
      - "Facturi Petrom card combustibil — martie" (red — *"Nesolicitat"*)
      - "Bon fiscal lipsă din seria 2430-2440 (Kaufland Cluj)" (red)
    - Big button: *"Trimite reminder automat clientului →"*

**Interaction: clicking "Trimite reminder automat clientului"**
- Opens a dialog modal
- Preview of auto-generated RO WhatsApp message:
  > *"Bună ziua, domnule Brîncoveanu! Suntem la 4 zile de termenul limită pentru declarațiile martie. Ne lipsesc: extrasul de cont BT pentru aprilie, facturile Petrom pentru cardul de combustibil din martie, și bonurile cu seria 2430-2440. Puteți să le urcați direct în portalul dvs. la acest link: contaflow.ro/c/brincoveanu. Mulțumim! Maria"*
- Two buttons: *"Trimite"* and *"Editează"*
- Clicking "Trimite" → toast notification *"Reminder trimis. Client va primi și email."*, modal closes, the "Missing documents" items change from red to amber with "Solicitat acum"

**Interaction: clicking "Vezi" on a document**
- Opens a modal with:
  - Left side: a mock of the document (use a placeholder like a gray rectangle labeled "Factură furnizor — Metro România SA, 18.03.2026")
  - Right side: OCR-extracted structured data in a form:
    - Furnizor: Metro Cash & Carry România SRL
    - CUI furnizor: RO8119286
    - Număr factură: F-2026-00452819
    - Data: 18.03.2026
    - Valoare fără TVA: 1.240,50 RON
    - TVA 19%: 235,70 RON
    - Total: 1.476,20 RON
    - Categorie sugerată: *"Materiale construcții — deductibil integral"* (with a dropdown to change)
    - Confidence score: 97% (small green bar)
  - Buttons: *"Confirmă și adaugă în Saga"*, *"Editează"*, *"Respinge"*

**Other tabs:** keep them mostly stubbed with a "În procesare..." placeholder, but the "Facturi primite (SPV)" tab should have a visible "Ultima sincronizare: azi, 09:14" timestamp with a refresh button to tease Screen 3.

**Nav:** a floating "Continuă demo → Vezi SPV pull automat" button that goes to `/spv-pull`.

### Screen 3 — SPV Auto-Pull (the "magic" step)

**URL:** `/spv-pull`
**Purpose:** Show the automated e-Factura retrieval from ANAF SPV across all 47 clients. This is the headline feature — "pull automat din SPV" is in the landing page wedge.

**Layout:**
- H1: *"Preluare automată e-Factura din SPV"*
- Subtext: *"ContaFlow se conectează zilnic la SPV pentru fiecare client și descarcă toate facturile B2B. ANAF păstrează datele doar 60 de zile — noi le arhivăm permanent."*
- Big animated progress area:
  - Progress bar 0 → 100% animates over ~4 seconds on page load
  - Below, a log output that streams in (use `setTimeout` to append lines):
    ```
    [09:14:02] Conectare la SPV cu certificatul digital al firmei...
    [09:14:03] Autentificare reușită ✓
    [09:14:04] Sincronizare client 1/47: SC TechLogic SRL
    [09:14:05] → 18 facturi primite, 23 facturi emise descărcate
    [09:14:06] Sincronizare client 2/47: Farmacia Sfânta Maria SRL
    [09:14:07] → 47 facturi primite, 156 facturi emise descărcate
    [09:14:08] Sincronizare client 3/47: Constructii Brîncoveanu SRL
    [09:14:09] → 34 facturi primite, 11 facturi emise descărcate
    [09:14:10] ⚠ Atenție: 2 facturi stornate detectate — necesită review
    ...
    [09:14:34] Sincronizare completă: 47/47 clienți
    [09:14:35] Total descărcat: 1.247 documente (834 primite, 413 emise)
    [09:14:35] Arhivare în cloud storage (GDPR-compliant, EU region) ✓
    [09:14:36] Potrivire automată cu documente încărcate de clienți: 89% match rate
    ```
- After progress hits 100%, show a summary card:
  - 3 big numbers: "1.247 documente procesate", "89% potrivire automată", "14 documente necesită review manual"
  - 2 buttons: *"Vezi documentele pentru review →"* (navigates to `/review`) and *"Continuă la categorizare →"* (navigates to `/categorize`)

**Interactions:**
- Page auto-animates on load.
- Buttons navigate.
- There's a small toggle top-right: *"Programează pull automat: zilnic la 06:00"* — just visual, no state change needed.

**Feel:** satisfying. The log streaming in is the money shot — make sure it's paced well (~200ms per line, burst during "sincronizare" lines).

### Screen 4 — OCR + Categorization (the "500 receipts in 10 minutes" step)

**URL:** `/categorize`
**Purpose:** Show bulk OCR on client-uploaded docs + auto-categorization with accountant review. This is where we demo the core time-saver.

**Layout:**
- H1: *"Categorizare automată — 394 documente în așteptare"*
- Subtext: *"Am identificat furnizorul, suma, TVA-ul și categoria contabilă pentru 387 din 394 documente. Doar 7 necesită atenția ta."*
- Tabs at top:
  - *"Revizuire rapidă (7)"* (default) — red badge
  - *"Auto-categorizate (387)"* — green
  - *"Respinse (0)"*

**Revizuire rapidă tab:**
- Table with 7 rows, showing documents that need human confirmation. Columns:
  - Preview thumbnail (small gray rectangle with document label)
  - Client
  - Furnizor (OCR'd)
  - Sumă
  - TVA
  - Categorie sugerată (with dropdown — let the user actually change it)
  - Confidence (small bar — all are 60–75% so they need review)
  - Action: *"Confirmă"* / *"Respinge"*
- One row should have an obvious ambiguity example:
  - Farmacia Sfânta Maria SRL, furnizor "Mega Image", sumă 84,50 RON
  - Categorie sugerată: "Produse alimentare — deductibil integral"
  - But has a warning icon with tooltip: *"Posibilă achiziție personală — confirmă cu clientul"*

**Auto-categorizate tab:**
- Just a scrollable table of 387 rows, pre-filled, with green checkmarks. Makes the point: "this is what you'd normally review one-by-one, but we already did it."
- Bulk actions: *"Exportă toate în Saga →"*, *"Marchează pentru re-review"*

**Interactions:**
- Confirm on a row: row disappears with a fade animation, counter updates (7 → 6 → 5...)
- When last row is confirmed, show a success state: *"Totul categorizat. Export Saga disponibil."* with a big *"Continuă →"* button to `/saga-export`

**Feel:** fast. The Confirm button should feel like a satisfying tap, row animates out, counter tick down.

### Screen 5 — Saga Export (the moat demo)

**URL:** `/saga-export`
**Purpose:** Show that ContaFlow produces the exact Saga import file — this is the technical wedge vs TaxDome.

**Layout:**
- H1: *"Export în Saga — gata de import"*
- Subtext: *"Fișierul este generat în formatul Saga standard (XML + DBF). Deschide Saga, File → Import, selectează fișierul. Durează 10 secunde."*
- Center panel:
  - Card showing file summary:
    - Nume: `export_saga_martie_2026_47clienti.zip`
    - Mărime: 4,2 MB
    - Conține: 1.247 înregistrări contabile, 47 fișe clienți, 12 declarații pre-completate
    - Generat: acum 3 secunde
  - Preview pane (styled like a code editor) showing the first 30 lines of the generated XML — something like:
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <SagaExport version="2026.1" firma="Maria Popescu Expert Contabil SRL">
      <Client cui="RO38291047" nume="SC TechLogic SRL">
        <FacturaPrimita>
          <Numar>F-2026-00452819</Numar>
          <Data>2026-03-18</Data>
          <Furnizor cui="RO8119286">Metro Cash & Carry România SRL</Furnizor>
          <Suma fara_tva="1240.50" tva="235.70" total="1476.20" moneda="RON"/>
          <CategorieContabila cod="602">Materiale auxiliare</CategorieContabila>
        </FacturaPrimita>
        ...
    ```
  - Button: *"Descarcă fișier"* (fake download — trigger a toast *"Descărcare pornită (demo)"*)
- Toggle row below:
  - *"Exportă în loc pentru: ○ Saga ● WinMentor ○ Ciel ○ SmartBill Conta"* — show it's multi-format
  - When you select WinMentor, the XML preview re-renders with different tag names. This is important — shows the integration matrix is real.
- Bottom button: *"Continuă → Declarații ANAF"* to `/declarations`

**Interactions:** toggle the export format, trigger the toast download.

**Feel:** technical. This is the "you can see it's real" screen.

### Screen 6 — Declarations (D112, D300, D394, SAF-T)

**URL:** `/declarations`
**Purpose:** Show that declarations are pre-filled based on categorized data, and can be submitted to SPV with one click.

**Layout:**
- H1: *"Declarații ANAF — martie 2026"*
- Row of declaration cards (use Card component):
  - **D112** — declarație obligatii plată, 47 clienți, status: *"Pre-completată, gata pentru depunere"*, button *"Depune la SPV"*
  - **D300** — decont TVA, 31 clienți plătitori, status: *"Pre-completată"*, button *"Depune la SPV"*
  - **D394** — declarație informativă TVA intracomunitar, 8 clienți, status: *"Pre-completată"*, button *"Depune la SPV"*
  - **D100** — impozit pe profit/microîntreprinderi, 47 clienți, status: *"În pregătire — 3 clienți necesită clarificări"*, button disabled
  - **D101** — declarație anuală impozit profit, 12 clienți, status: *"Programată pentru 25 mai"*
  - **SAF-T D406** — **highlight this card differently** (e.g., a subtle amber border). Status: *"15 clienți small — obligatoriu din ianuarie 2025"*, button *"Deschide cockpit SAF-T →"*
- Below:
  - Historic timeline: a small chart showing "depuneri la timp" last 6 months for this firm (all green — subtle brag about the product).

**Interaction: click "Depune la SPV" on D112**
- Modal opens:
  - *"Confirmi depunerea D112 pentru 47 clienți?"*
  - List preview of the 47 CUIs
  - *"Vei primi număr de înregistrare pentru fiecare, salvat automat în istoricul clientului."*
  - Buttons: *"Anulează"*, *"Depune acum"*
- Click "Depune acum" → progress bar animation (3 seconds) → success state with 47 recipisa numbers listed → toast *"D112 depusă cu succes. 47/47 recipise primite."*

**Interaction: click "Deschide cockpit SAF-T"**
- Navigates to `/saft` (Screen 7).

### Screen 7 — SAF-T D406 Cockpit (the "this could be its own product" feature)

**URL:** `/saft`
**Purpose:** SAF-T D406 is a 390-field nightmare. Showing a focused cockpit here demonstrates depth — and hints that this alone could be a paid add-on.

**Layout:**
- H1: *"SAF-T D406 — martie 2026"*
- Subtext: *"15 clienți small intră sub obligativitate din ianuarie 2025. 390 câmpuri per client, validate automat."*
- Left panel: list of 15 clients with SAF-T status:
  - 11 green ("Validat, gata de depunere")
  - 3 amber ("Avertismente — review recomandat")
  - 1 red ("Erori de validare — 7 câmpuri")
- Right panel (when a client is selected):
  - Validation report card with sections:
    - **GeneralLedgerAccounts** (planul de conturi) — 247/247 valid ✓
    - **Customers** — 89/89 valid ✓
    - **Suppliers** — 134/134 valid ✓
    - **Products** — 1.203/1.203 valid ✓
    - **Invoices** — 412/412 valid ✓
    - **Payments** — 389/389 valid ✓
    - **StockMovements** — 67 avertismente ⚠ (with a *"Vezi detalii"* expander)
  - Expander shows 3–4 warning rows like: *"Linia 34: cantitate stoc final negativă (-2 buc) pentru produsul PROD-A-12. Verifică intrările din 14.03."*
  - Button at bottom: *"Generează XML SAF-T →"*
- When "Generează XML SAF-T" is clicked:
  - Progress animation (validating 390 fields per client visualization is nice — show it sweeping through section names)
  - End state: a download card similar to Screen 5, showing the generated D406.xml file stats
- Top-right pill: *"Timp mediu per client cu ContaFlow: 4 minute. Manual: 2–3 ore."*

**Nav:** *"Continuă → Rezumatul zilei"* to `/summary`

### Screen 8 — Summary / Close-out (the "value visualized" screen)

**URL:** `/summary`
**Purpose:** Pay off the demo. Show what just happened.

**Layout:**
- Centered, celebratory but not tacky.
- H1: *"Închiderea martie 2026 — completă"*
- Subtext: *"47 clienți, 1.247 documente, 12 declarații. Terminat în 2h 14min."*
- Three big stat cards:
  1. **"Timp economisit"** — **~31 ore** (with small subtext: *"față de media de 33h pentru o firmă de această mărime"*)
  2. **"Documente procesate automat"** — **1.233 din 1.247** (98,9%)
  3. **"Declarații depuse la ANAF"** — **12 din 12** (toate cu recipisă)
- Timeline recap (horizontal):
  - 09:14 — Pull SPV automat (47 clienți)
  - 09:47 — Review și categorizare (7 documente ambigue)
  - 10:22 — Export Saga generat
  - 11:08 — Declarațiile D112, D300, D394 depuse
  - 11:28 — SAF-T D406 depus pentru 15 clienți small
  - **2h 14min total**
- Below, a comparison card:
  - Two columns side by side:
    - **"Fără ContaFlow"** — list of 8 painful steps, total: *"3–5 zile de lucru"*
    - **"Cu ContaFlow"** — same 8 steps, each followed by *"automat"* or *"1 click"*, total: *"2h 14min"*
- Bottom:
  - *"Vezi cât te-ar costa pentru firma ta →"* button opening a pricing dialog:
    - 3 plans: 
      - **Starter** — €25/lună pentru firme cu până la 20 clienți
      - **Professional** — €49/lună pentru firme cu până la 50 clienți (★ recomandat)
      - **Firma** — €89/lună pentru firme cu până la 150 clienți
    - All plans: "Include SPV pull, OCR, Saga/WinMentor/Ciel export, SAF-T cockpit, declarații automate"
    - Annual discount: *"-20% la plată anuală"*
  - Small footer: *"Demo terminat. Restart demo ↻"* button that clears state and goes back to `/`

---

## 4. Important details for the build

### Mock data architecture

Everything comes from `lib/mock-data.ts`. Structure:

```typescript
export type Client = { id: string; name: string; cui: string; caen: string; contact: Contact; status: ClientStatus; docsReceived: number; docsMissing: number; lastContact: string; /* ... */ }
export type Document = { id: string; clientId: string; filename: string; uploadedBy: string; uploadedAt: string; type: DocType; ocrStatus: OCRStatus; extracted?: ExtractedData; }
export type Declaration = { id: string; type: 'D112' | 'D300' | 'D394' | 'D100' | 'D101' | 'D406'; clients: string[]; status: string; dueDate: string; }

export const firm = { name: "Maria Popescu Expert Contabil SRL", /*...*/ }
export const clients: Client[] = [ /* 8 detailed + 39 anonymized */ ]
export const documents: Document[] = [ /* ~20-30 named docs, rest in aggregate counts */ ]
export const declarations: Declaration[] = [ /* all 12 */ ]
```

State that changes during the demo (reminders sent, documents confirmed, declarations submitted) should live in a React Context so navigating between screens preserves it. Keep it in `app/providers.tsx`.

### Reset button

The top-right user menu should have a *"Restart demo"* option that clears all state and returns to Screen 0. Needed for giving the demo to multiple people in sequence.

### Responsive

Desktop-first. This is a B2B tool — nobody closes books on their phone. But make sure it doesn't break on a 1280px screen.

### What NOT to build (scope guards — do not over-engineer)

- No real auth. There's a fake "Maria Popescu" avatar always shown.
- No real OCR. Extracted data is hardcoded in mock-data.
- No real SPV / Saga / ANAF integration. All animations are `setTimeout` + pre-written log lines.
- No real file downloads. Trigger toasts instead.
- No real DB. Everything in-memory.
- No real backend. No API routes beyond whatever Next.js requires.
- No tests. This is a demo, not a product.
- No i18n system. All Romanian copy is hardcoded.
- Don't try to make the XML/SAF-T output actually validate to real schemas — it just needs to look right.

### Styling notes

- Use Tailwind's default neutral palette (zinc or slate) as base.
- Accent color: a calm blue (`blue-600` for primary actions, `blue-50` for subtle backgrounds). Avoid anything that screams "fintech startup" — accountants trust calm, not neon.
- Status badges: green = complete, amber = attention, red = overdue, blue = in progress.
- Use Romanian number formatting throughout: `1.247` (period as thousands separator), `1.476,20 RON` (comma as decimal).
- Use Romanian date formatting: `27.04.2026` or `27 aprilie 2026`.

### Reference screenshots / inspiration (describe in comments, don't import)

- Linear's dashboard density (but less cluttered)
- Stripe's onboarding flow progress bar
- Ramp's transaction review UI (for the categorization screen)

---

## 5. Definition of done

Claude Code, you're done when:

1. `npm install && npm run dev` works on a fresh clone.
2. All 8 screens are reachable from Screen 0 by clicking "Next →" buttons.
3. Clicking on client #3 in the dashboard navigates to the client detail screen.
4. The SPV pull animation runs on page load and finishes in under 6 seconds.
5. The categorization screen lets you confirm rows and the counter decrements.
6. The Saga export preview changes when you toggle between Saga / WinMentor / Ciel / SmartBill Conta.
7. The D112 submit modal runs its animation and shows success.
8. The SAF-T cockpit lets you select a client and see the validation report.
9. The summary screen recaps the timeline correctly.
10. The "Restart demo" button clears state and returns to Screen 0.

Once done, open a browser to localhost:3000 and walk through all 8 screens. If any click leaves the user stuck, fix it.

---

## 6. Nice-to-haves (only if time permits after the definition of done)

- Keyboard shortcut: `→` and `←` arrows to navigate between screens.
- A "presenter mode" toggle that shows small annotation tooltips highlighting what each screen is demonstrating (useful when showing to investors).
- A subtle confetti burst on the summary screen when it loads for the first time.
- Dark mode toggle.

None of these are required. Ship the main flow first.

// Mock fixtures for the ContaFlow demo. All data is fake but internally consistent.

export type ClientStatus = "complete" | "missing" | "uncontacted" | "processing";

export interface Contact {
  name: string;
  role: string;
  phone: string;
  email: string;
}

export interface Client {
  id: string;
  name: string;
  cui: string;
  caen: string;
  caenLabel: string;
  type: string;
  contact: Contact;
  monthlyVolume: number;
  uses: string;
  docsReceived: number;
  docsMissing: number;
  lastContact: string;
  lastContactChannel: string;
  lastContactNote: string;
  status: ClientStatus;
  subscription: string;
  overdueDeclarations?: string[];
  city: string;
}

export interface Firm {
  name: string;
  seniorAccountant: string;
  ceccarId: string;
  juniors: string[];
  clientCount: number;
  bookkeepingEngine: string;
  location: string;
  currentDemoDate: string;
  deadline: string;
}

export interface DocumentRow {
  id: string;
  clientId: string;
  filename: string;
  uploadedBy: string;
  uploadedAt: string;
  type: "Factură furnizor" | "Bon fiscal" | "Extras bancar" | "Chitanță" | "Factură emisă";
  ocrStatus: "OCR completat" | "În procesare" | "Necesită review";
  preview?: string;
  extracted?: {
    furnizor: string;
    cui: string;
    numar: string;
    data: string;
    fara_tva: number;
    tva_rate: number;
    tva: number;
    total: number;
    categorie: string;
    confidence: number;
  };
}

export interface MissingDoc {
  id: string;
  label: string;
  status: "nesolicitat" | "solicitat";
  detail: string;
}

export interface CategorizeRow {
  id: string;
  clientName: string;
  clientShort: string;
  furnizor: string;
  suma: number;
  tva: number;
  categorie: string;
  confidence: number;
  warning?: string;
  preview: string;
}

export interface Declaration {
  code: "D112" | "D300" | "D394" | "D100" | "D101" | "D406";
  fullName: string;
  shortName: string;
  clientCount: number;
  status: string;
  statusVariant: "green" | "amber" | "red" | "blue" | "slate";
  dueDate: string;
  ctaLabel: string;
  ctaDisabled?: boolean;
  description: string;
}

export interface SaftClient {
  id: string;
  name: string;
  cui: string;
  status: "validat" | "avertismente" | "erori";
  warningCount?: number;
  errorCount?: number;
}

export const firm: Firm = {
  name: "Maria Popescu Expert Contabil SRL",
  seniorAccountant: "Maria Popescu",
  ceccarId: "CECCAR 47.289",
  juniors: ["Andrei Ionescu", "Elena Stan"],
  clientCount: 47,
  bookkeepingEngine: "Saga",
  location: "Cluj-Napoca",
  currentDemoDate: "2026-04-27",
  deadline: "2026-05-01",
};

export const clients: Client[] = [
  {
    id: "1",
    name: "SC TechLogic SRL",
    cui: "RO38291047",
    caen: "6201",
    caenLabel: "Activități de realizare a software-ului la comandă",
    type: "IT services",
    contact: {
      name: "Radu Dumitrescu",
      role: "CEO",
      phone: "+40 744 218 903",
      email: "radu@techlogic.ro",
    },
    monthlyVolume: 45,
    uses: "SmartBill",
    docsReceived: 45,
    docsMissing: 0,
    lastContact: "2026-04-24",
    lastContactChannel: "Email",
    lastContactNote: "A trimis toate facturile la timp.",
    status: "complete",
    subscription: "Plan Professional — €49/lună",
    city: "Cluj-Napoca",
  },
  {
    id: "2",
    name: "Farmacia Sfânta Maria SRL",
    cui: "RO28194756",
    caen: "4773",
    caenLabel: "Comerț cu amănuntul al produselor farmaceutice",
    type: "Farmacie",
    contact: {
      name: "Adriana Marin",
      role: "administrator",
      phone: "+40 740 182 394",
      email: "contact@farmaciasfantamaria.ro",
    },
    monthlyVolume: 180,
    uses: "Paper bonuri + SmartBill",
    docsReceived: 162,
    docsMissing: 18,
    lastContact: "2026-04-22",
    lastContactChannel: "Telefon",
    lastContactNote: "A promis bonurile lipsă până vineri.",
    status: "missing",
    subscription: "Plan Professional — €49/lună",
    city: "Cluj-Napoca",
  },
  {
    id: "3",
    name: "Constructii Brîncoveanu SRL",
    cui: "RO19384756",
    caen: "4120",
    caenLabel: "Lucrări de construcții a clădirilor rezidențiale și nerezidențiale",
    type: "Construcții",
    contact: {
      name: "Gheorghe Brîncoveanu",
      role: "administrator",
      phone: "+40 745 827 193",
      email: "g.brincoveanu@gmail.com",
    },
    monthlyVolume: 90,
    uses: "Paper + WhatsApp",
    docsReceived: 52,
    docsMissing: 38,
    lastContact: "2026-04-18",
    lastContactChannel: "WhatsApp",
    lastContactNote: "A promis documentele până miercuri.",
    status: "missing",
    subscription: "Plan Standard — €25/lună",
    overdueDeclarations: ["D112 martie", "D300 martie"],
    city: "Turda",
  },
  {
    id: "4",
    name: "Cafe Ursul Polar SRL",
    cui: "RO41928374",
    caen: "5630",
    caenLabel: "Baruri și alte activități de servire a băuturilor",
    type: "Café (HoReCa)",
    contact: {
      name: "Diana Oprea",
      role: "manager",
      phone: "+40 747 291 847",
      email: "diana@ursulpolar.ro",
    },
    monthlyVolume: 220,
    uses: "Oblio + paper bonuri",
    docsReceived: 198,
    docsMissing: 22,
    lastContact: "2026-04-26",
    lastContactChannel: "Portal",
    lastContactNote: "A urcat bonurile prin portal ieri.",
    status: "processing",
    subscription: "Plan Professional — €49/lună",
    city: "Cluj-Napoca",
  },
  {
    id: "5",
    name: "Ionescu Mihai PFA",
    cui: "RO47283910",
    caen: "7410",
    caenLabel: "Activități de design specializat",
    type: "Freelance designer",
    contact: {
      name: "Mihai Ionescu",
      role: "titular PFA",
      phone: "+40 722 384 102",
      email: "mihai@ionescu.design",
    },
    monthlyVolume: 12,
    uses: "FGO",
    docsReceived: 12,
    docsMissing: 0,
    lastContact: "2026-04-25",
    lastContactChannel: "Email",
    lastContactNote: "Documentele luate automat din FGO.",
    status: "complete",
    subscription: "Plan Starter — €25/lună",
    city: "Floresti",
  },
  {
    id: "6",
    name: "Transport Rapid TIR SRL",
    cui: "RO33827461",
    caen: "4941",
    caenLabel: "Transporturi rutiere de mărfuri",
    type: "Transport",
    contact: {
      name: "Costel Preda",
      role: "administrator",
      phone: "+40 743 918 274",
      email: "costel@transportrapid.ro",
    },
    monthlyVolume: 140,
    uses: "Paper + fuel cards",
    docsReceived: 0,
    docsMissing: 140,
    lastContact: "2026-04-10",
    lastContactChannel: "—",
    lastContactNote: "Nu a răspuns la ultimele 3 mesaje.",
    status: "uncontacted",
    subscription: "Plan Standard — €25/lună",
    overdueDeclarations: ["D112 martie", "D300 martie", "D394 martie"],
    city: "Apahida",
  },
  {
    id: "7",
    name: "Dental Clinic Alba SRL",
    cui: "RO52837461",
    caen: "8623",
    caenLabel: "Activități de asistență stomatologică",
    type: "Clinică dentară",
    contact: {
      name: "Dr. Alina Albu",
      role: "medic stomatolog, administrator",
      phone: "+40 741 203 854",
      email: "contact@dentalalba.ro",
    },
    monthlyVolume: 60,
    uses: "SmartBill",
    docsReceived: 60,
    docsMissing: 0,
    lastContact: "2026-04-24",
    lastContactChannel: "Portal",
    lastContactNote: "Documente sincronizate automat.",
    status: "complete",
    subscription: "Plan Professional — €49/lună",
    city: "Cluj-Napoca",
  },
  {
    id: "8",
    name: "Agroferma Crișul SRL",
    cui: "RO27384920",
    caen: "0111",
    caenLabel: "Cultivarea cerealelor",
    type: "Agricultură",
    contact: {
      name: "Vasile Crișan",
      role: "administrator",
      phone: "+40 746 384 920",
      email: "v.crisan@agrofermacrisul.ro",
    },
    monthlyVolume: 35,
    uses: "Paper only, emails PDFs",
    docsReceived: 8,
    docsMissing: 27,
    lastContact: "2026-04-15",
    lastContactChannel: "Email",
    lastContactNote: "A trimis 8 PDF-uri, mai lipsesc multe.",
    status: "missing",
    subscription: "Plan Standard — €25/lună",
    city: "Huedin",
  },
];

export const anonymizedClientCount = 39;
export const totalDocsThisMonth = 1247;
export const totalDeclarations = 12;
export const declarationsFiled = 3;

// --- Constructii Brîncoveanu documents (Screen 2) ---
export const brincoveanuDocuments: DocumentRow[] = [
  {
    id: "d1",
    clientId: "3",
    filename: "Factura_Metro_452819.pdf",
    uploadedBy: "Client (WhatsApp bot)",
    uploadedAt: "2026-04-26T09:12:00",
    type: "Factură furnizor",
    ocrStatus: "OCR completat",
    preview: "Factură furnizor — Metro România SA, 18.03.2026",
    extracted: {
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
    },
  },
  {
    id: "d2",
    clientId: "3",
    filename: "IMG_20260425_143012.jpg",
    uploadedBy: "Client (WhatsApp bot)",
    uploadedAt: "2026-04-25T14:30:00",
    type: "Bon fiscal",
    ocrStatus: "OCR completat",
    preview: "Bon fiscal — Dedeman Cluj-Napoca, 25.04.2026",
  },
  {
    id: "d3",
    clientId: "3",
    filename: "extras_cont_BT_martie.pdf",
    uploadedBy: "Client (portal)",
    uploadedAt: "2026-04-24T18:05:00",
    type: "Extras bancar",
    ocrStatus: "OCR completat",
    preview: "Extras cont Banca Transilvania — 01–31.03.2026",
  },
  {
    id: "d4",
    clientId: "3",
    filename: "Factura_Arabesque_34872.pdf",
    uploadedBy: "Client (WhatsApp bot)",
    uploadedAt: "2026-04-24T10:18:00",
    type: "Factură furnizor",
    ocrStatus: "OCR completat",
    preview: "Factură furnizor — Arabesque, 12.03.2026",
  },
  {
    id: "d5",
    clientId: "3",
    filename: "Chitanta_munca_ziliera_03.pdf",
    uploadedBy: "Maria (manual)",
    uploadedAt: "2026-04-22T16:40:00",
    type: "Chitanță",
    ocrStatus: "OCR completat",
    preview: "Chitanță — plată zilier, 22.03.2026",
  },
  {
    id: "d6",
    clientId: "3",
    filename: "IMG_20260422_091547.jpg",
    uploadedBy: "Client (WhatsApp bot)",
    uploadedAt: "2026-04-22T09:15:00",
    type: "Bon fiscal",
    ocrStatus: "Necesită review",
    preview: "Bon fiscal — fotografie neclară, 22.04.2026",
  },
  {
    id: "d7",
    clientId: "3",
    filename: "Factura_Leroy_Merlin_88920.pdf",
    uploadedBy: "Client (portal)",
    uploadedAt: "2026-04-21T11:03:00",
    type: "Factură furnizor",
    ocrStatus: "OCR completat",
    preview: "Factură furnizor — Leroy Merlin, 21.03.2026",
  },
  {
    id: "d8",
    clientId: "3",
    filename: "factura_emisa_F2026-0032.pdf",
    uploadedBy: "Sistem (SPV pull)",
    uploadedAt: "2026-04-21T06:00:00",
    type: "Factură emisă",
    ocrStatus: "OCR completat",
    preview: "Factură emisă — Constructii Brîncoveanu SRL",
  },
  {
    id: "d9",
    clientId: "3",
    filename: "IMG_20260419_102233.jpg",
    uploadedBy: "Client (WhatsApp bot)",
    uploadedAt: "2026-04-19T10:22:00",
    type: "Bon fiscal",
    ocrStatus: "OCR completat",
    preview: "Bon fiscal — Kaufland Cluj, 19.03.2026",
  },
  {
    id: "d10",
    clientId: "3",
    filename: "Chitanta_salarii_martie.pdf",
    uploadedBy: "Maria (manual)",
    uploadedAt: "2026-04-16T08:30:00",
    type: "Chitanță",
    ocrStatus: "OCR completat",
    preview: "Chitanță — salarii martie 2026",
  },
  {
    id: "d11",
    clientId: "3",
    filename: "Factura_Holcim_7382.pdf",
    uploadedBy: "Client (WhatsApp bot)",
    uploadedAt: "2026-04-14T15:40:00",
    type: "Factură furnizor",
    ocrStatus: "În procesare",
    preview: "Factură furnizor — Holcim România, 14.03.2026",
  },
  {
    id: "d12",
    clientId: "3",
    filename: "IMG_20260412_184501.jpg",
    uploadedBy: "Client (WhatsApp bot)",
    uploadedAt: "2026-04-12T18:45:00",
    type: "Bon fiscal",
    ocrStatus: "OCR completat",
    preview: "Bon fiscal — Petrom, 12.03.2026",
  },
];

export const brincoveanuMissingDocs: MissingDoc[] = [
  {
    id: "m1",
    label: "Extras bancar aprilie — BT",
    status: "solicitat",
    detail: "Solicitat pe WhatsApp acum 2 zile",
  },
  {
    id: "m2",
    label: "Facturi Petrom — card combustibil martie",
    status: "nesolicitat",
    detail: "Nesolicitat",
  },
  {
    id: "m3",
    label: "Bonuri lipsă — seria 2430–2440 (Kaufland Cluj)",
    status: "nesolicitat",
    detail: "Nesolicitat",
  },
];

export const reminderMessage = `Bună ziua, domnule Brîncoveanu!

Suntem la 4 zile de termenul limită pentru declarațiile martie. Ne lipsesc:
• extrasul de cont BT pentru aprilie,
• facturile Petrom pentru cardul de combustibil din martie,
• bonurile cu seria 2430–2440 (Kaufland Cluj).

Puteți să le urcați direct în portalul dvs. la acest link:
contaflow.ro/c/brincoveanu

Mulțumim!
Maria`;

// --- SPV pull log lines (Screen 3) ---
export interface SpvLogLine {
  time: string;
  text: string;
  kind: "info" | "ok" | "warn" | "progress";
}

export const spvLogLines: SpvLogLine[] = [
  { time: "09:14:02", text: "Conectare la SPV cu certificatul digital al firmei...", kind: "info" },
  { time: "09:14:03", text: "Autentificare reușită ✓", kind: "ok" },
  { time: "09:14:04", text: "Sincronizare client 1/47: SC TechLogic SRL", kind: "progress" },
  { time: "09:14:05", text: "→ 18 facturi primite, 23 facturi emise descărcate", kind: "info" },
  { time: "09:14:06", text: "Sincronizare client 2/47: Farmacia Sfânta Maria SRL", kind: "progress" },
  { time: "09:14:07", text: "→ 47 facturi primite, 156 facturi emise descărcate", kind: "info" },
  { time: "09:14:08", text: "Sincronizare client 3/47: Constructii Brîncoveanu SRL", kind: "progress" },
  { time: "09:14:09", text: "→ 34 facturi primite, 11 facturi emise descărcate", kind: "info" },
  { time: "09:14:10", text: "⚠ Atenție: 2 facturi stornate detectate — necesită review", kind: "warn" },
  { time: "09:14:11", text: "Sincronizare client 4/47: Cafe Ursul Polar SRL", kind: "progress" },
  { time: "09:14:12", text: "→ 11 facturi primite, 0 facturi emise (HoReCa — predominant bonuri)", kind: "info" },
  { time: "09:14:13", text: "Sincronizare client 5/47: Ionescu Mihai PFA", kind: "progress" },
  { time: "09:14:14", text: "→ 0 facturi primite, 12 facturi emise descărcate", kind: "info" },
  { time: "09:14:16", text: "Sincronizare client 12/47: Autoservice Tudor SRL", kind: "progress" },
  { time: "09:14:17", text: "→ 62 facturi primite, 89 facturi emise descărcate", kind: "info" },
  { time: "09:14:19", text: "Sincronizare client 23/47: Pensiunea La Munte SRL", kind: "progress" },
  { time: "09:14:20", text: "→ 28 facturi primite, 17 facturi emise descărcate", kind: "info" },
  { time: "09:14:22", text: "Sincronizare client 34/47: Salon Beauty Room SRL", kind: "progress" },
  { time: "09:14:23", text: "→ 14 facturi primite, 4 facturi emise descărcate", kind: "info" },
  { time: "09:14:26", text: "Sincronizare client 45/47: Florăria Iris SRL", kind: "progress" },
  { time: "09:14:27", text: "→ 9 facturi primite, 52 facturi emise descărcate", kind: "info" },
  { time: "09:14:30", text: "Sincronizare client 47/47: Transport Rapid TIR SRL", kind: "progress" },
  { time: "09:14:31", text: "→ 0 facturi primite, 0 facturi emise (⚠ date SPV lipsă — verifică certificat)", kind: "warn" },
  { time: "09:14:34", text: "Sincronizare completă: 47/47 clienți", kind: "ok" },
  { time: "09:14:35", text: "Total descărcat: 1.247 documente (834 primite, 413 emise)", kind: "info" },
  { time: "09:14:35", text: "Arhivare în cloud storage (GDPR-compliant, EU region) ✓", kind: "ok" },
  { time: "09:14:36", text: "Potrivire automată cu documente încărcate de clienți: 89% match rate", kind: "ok" },
];

// --- Review queue (Screen 4) ---
export const categorizeRows: CategorizeRow[] = [
  {
    id: "r1",
    clientName: "Farmacia Sfânta Maria SRL",
    clientShort: "Farmacia Sf. Maria",
    furnizor: "Mega Image",
    suma: 84.5,
    tva: 13.51,
    categorie: "Produse alimentare — deductibil integral",
    confidence: 64,
    warning: "Posibilă achiziție personală — confirmă cu clientul",
    preview: "Bon fiscal · 14.03.2026",
  },
  {
    id: "r2",
    clientName: "Constructii Brîncoveanu SRL",
    clientShort: "Brîncoveanu",
    furnizor: "Petrom SA",
    suma: 487.2,
    tva: 77.82,
    categorie: "Combustibil — autoturism companie (50% deductibil)",
    confidence: 72,
    preview: "Factură · 09.03.2026",
  },
  {
    id: "r3",
    clientName: "Cafe Ursul Polar SRL",
    clientShort: "Ursul Polar",
    furnizor: "Selgros Cluj",
    suma: 1284.4,
    tva: 205.29,
    categorie: "Materii prime HoReCa — deductibil integral",
    confidence: 68,
    preview: "Factură · 17.03.2026",
  },
  {
    id: "r4",
    clientName: "Transport Rapid TIR SRL",
    clientShort: "Transport Rapid",
    furnizor: "OMV Petrom — card flotă",
    suma: 8342.75,
    tva: 1334.84,
    categorie: "Combustibil transport marfă — deductibil integral",
    confidence: 74,
    preview: "Extras flotă · martie 2026",
  },
  {
    id: "r5",
    clientName: "Agroferma Crișul SRL",
    clientShort: "Agroferma Crișul",
    furnizor: "Agrii România SA",
    suma: 4120.0,
    tva: 659.2,
    categorie: "Îngrășăminte — deductibil integral",
    confidence: 61,
    warning: "CAEN neconcordant — verifică natura achiziției",
    preview: "Factură · 21.03.2026",
  },
  {
    id: "r6",
    clientName: "SC TechLogic SRL",
    clientShort: "TechLogic",
    furnizor: "Orange Business Services",
    suma: 349.0,
    tva: 55.84,
    categorie: "Servicii comunicații — deductibil integral",
    confidence: 70,
    preview: "Factură recurentă · 01.03.2026",
  },
  {
    id: "r7",
    clientName: "Dental Clinic Alba SRL",
    clientShort: "Dental Alba",
    furnizor: "MedImpact SRL",
    suma: 2150.8,
    tva: 344.13,
    categorie: "Consumabile medicale — deductibil integral",
    confidence: 66,
    preview: "Factură · 11.03.2026",
  },
];

export const autoCategorizedCount = 387;
export const rejectedCount = 0;

// --- Declarations (Screen 6) ---
export const declarations: Declaration[] = [
  {
    code: "D112",
    fullName: "Declarație privind obligațiile de plată a contribuțiilor sociale, impozitului pe venit și evidența nominală a persoanelor asigurate",
    shortName: "Obligații salariale",
    clientCount: 47,
    status: "Pre-completată, gata pentru depunere",
    statusVariant: "green",
    dueDate: "2026-04-25",
    ctaLabel: "Depune la SPV",
    description: "47 clienți · termen depășit cu 2 zile",
  },
  {
    code: "D300",
    fullName: "Decont de taxă pe valoarea adăugată",
    shortName: "Decont TVA",
    clientCount: 31,
    status: "Pre-completată",
    statusVariant: "green",
    dueDate: "2026-04-25",
    ctaLabel: "Depune la SPV",
    description: "31 clienți plătitori TVA · termen depășit cu 2 zile",
  },
  {
    code: "D394",
    fullName: "Declarație informativă privind livrările/prestările și achizițiile efectuate pe teritoriul național",
    shortName: "Informativă TVA intracomunitar",
    clientCount: 8,
    status: "Pre-completată",
    statusVariant: "green",
    dueDate: "2026-04-25",
    ctaLabel: "Depune la SPV",
    description: "8 clienți cu operațiuni intracomunitare",
  },
  {
    code: "D100",
    fullName: "Declarație privind obligațiile de plată la bugetul de stat",
    shortName: "Impozit profit / micro",
    clientCount: 47,
    status: "În pregătire — 3 clienți necesită clarificări",
    statusVariant: "amber",
    dueDate: "2026-04-25",
    ctaLabel: "Rezolvă clarificări",
    ctaDisabled: true,
    description: "47 clienți · 3 clarificări în așteptare",
  },
  {
    code: "D101",
    fullName: "Declarație anuală privind impozitul pe profit",
    shortName: "Impozit profit anual",
    clientCount: 12,
    status: "Programată pentru 25 mai",
    statusVariant: "slate",
    dueDate: "2026-05-25",
    ctaLabel: "Programat",
    ctaDisabled: true,
    description: "12 clienți plătitori de impozit pe profit",
  },
  {
    code: "D406",
    fullName: "SAF-T — fișier standard de audit fiscal",
    shortName: "SAF-T D406",
    clientCount: 15,
    status: "15 clienți small — obligatoriu din ianuarie 2025",
    statusVariant: "amber",
    dueDate: "2026-04-30",
    ctaLabel: "Deschide cockpit SAF-T",
    description: "15 clienți small · 390 câmpuri per depunere",
  },
];

// --- SAF-T clients (Screen 7) ---
export const saftClients: SaftClient[] = [
  { id: "s1", name: "SC TechLogic SRL", cui: "RO38291047", status: "validat" },
  { id: "s2", name: "Farmacia Sfânta Maria SRL", cui: "RO28194756", status: "avertismente", warningCount: 3 },
  { id: "s3", name: "Cafe Ursul Polar SRL", cui: "RO41928374", status: "avertismente", warningCount: 67 },
  { id: "s4", name: "Dental Clinic Alba SRL", cui: "RO52837461", status: "validat" },
  { id: "s5", name: "Salon Beauty Room SRL", cui: "RO38472910", status: "validat" },
  { id: "s6", name: "Pensiunea La Munte SRL", cui: "RO29384756", status: "validat" },
  { id: "s7", name: "Florăria Iris SRL", cui: "RO18273645", status: "validat" },
  { id: "s8", name: "Autoservice Tudor SRL", cui: "RO47382910", status: "erori", errorCount: 7 },
  { id: "s9", name: "Panificație Morărița SRL", cui: "RO39482716", status: "validat" },
  { id: "s10", name: "IT Consult Cluj SRL", cui: "RO48293701", status: "validat" },
  { id: "s11", name: "Tipografia Ardealul SRL", cui: "RO28374601", status: "avertismente", warningCount: 5 },
  { id: "s12", name: "Distribuitor Plus SRL", cui: "RO19384726", status: "validat" },
  { id: "s13", name: "Mobilier Select SRL", cui: "RO47382617", status: "validat" },
  { id: "s14", name: "Carmangeria Bunica SRL", cui: "RO38291746", status: "validat" },
  { id: "s15", name: "Agro Verde Plus SRL", cui: "RO29374861", status: "validat" },
];

// --- Summary timeline (Screen 8) ---
export interface TimelineStep {
  time: string;
  label: string;
}

export const summaryTimeline: TimelineStep[] = [
  { time: "09:14", label: "Pull SPV automat (47 clienți)" },
  { time: "09:47", label: "Review și categorizare (7 documente ambigue)" },
  { time: "10:22", label: "Export Saga generat" },
  { time: "11:08", label: "Declarațiile D112, D300, D394 depuse" },
  { time: "11:28", label: "SAF-T D406 depus pentru 15 clienți small" },
];

export interface ComparisonRow {
  step: string;
  without: string;
  withCF: string;
}

export const comparisonRows: ComparisonRow[] = [
  { step: "Preluare e-Factura SPV", without: "Manual pe fiecare client, 4h", withCF: "Automat, 30s" },
  { step: "Colectare documente clienți", without: "Chase pe WhatsApp, 6h", withCF: "Reminder automat, 2min" },
  { step: "OCR și introducere în Saga", without: "Manual, 8h", withCF: "Automat, 5min" },
  { step: "Categorizare contabilă", without: "Manual one-by-one, 6h", withCF: "Auto + review 7 ambigue, 15min" },
  { step: "Potrivire cu e-Factura", without: "Manual, 3h", withCF: "Automat 89%, 2min" },
  { step: "Generare declarații D112/D300/D394", without: "Manual în DUK, 4h", withCF: "Pre-completat, 1 click" },
  { step: "SAF-T D406 (15 clienți small)", without: "2–3h per client, 30h+", withCF: "4min per client, 1h" },
  { step: "Depunere SPV + recipise", without: "Manual, 2h", withCF: "Automat, 30s" },
];

export const allClientNames = [
  ...clients.map((c) => ({ name: c.name, cui: c.cui })),
  { name: "Autoservice Tudor SRL", cui: "RO47382910" },
  { name: "Pensiunea La Munte SRL", cui: "RO29384756" },
  { name: "Salon Beauty Room SRL", cui: "RO38472910" },
  { name: "Florăria Iris SRL", cui: "RO18273645" },
  { name: "Panificație Morărița SRL", cui: "RO39482716" },
  { name: "IT Consult Cluj SRL", cui: "RO48293701" },
  { name: "Tipografia Ardealul SRL", cui: "RO28374601" },
  { name: "Distribuitor Plus SRL", cui: "RO19384726" },
  { name: "Mobilier Select SRL", cui: "RO47382617" },
  { name: "Carmangeria Bunica SRL", cui: "RO38291746" },
  { name: "Agro Verde Plus SRL", cui: "RO29374861" },
  { name: "Restaurant Trei Fântâni SRL", cui: "RO28374092" },
  { name: "Consultanță Fiscală Pop SRL", cui: "RO47382910" },
  { name: "Hotel Boutique 7 SRL", cui: "RO39482716" },
  { name: "Lăcătușerie Alfa SRL", cui: "RO28374182" },
  { name: "Grădinița Albinuța SRL", cui: "RO47382910" },
  { name: "Spălătorie Pro SRL", cui: "RO29384726" },
  { name: "Tabara Digitală SRL", cui: "RO38472910" },
  { name: "BioMed Diagnostics SRL", cui: "RO47382617" },
  { name: "Croitorie Elena SRL", cui: "RO29384716" },
  { name: "Pizza Napoli SRL", cui: "RO38472918" },
  { name: "Optică Vizio SRL", cui: "RO47382917" },
  { name: "Curățătorie Alb-Extra SRL", cui: "RO28374918" },
  { name: "Service Auto Vest SRL", cui: "RO39482726" },
  { name: "Magazin Casa Mea SRL", cui: "RO29374881" },
  { name: "Cofetăria Simona SRL", cui: "RO48293718" },
  { name: "Taxi Dispecer SRL", cui: "RO28374619" },
  { name: "Marketing Boutique SRL", cui: "RO47382615" },
  { name: "Club Sportiv Pro SRL", cui: "RO29384712" },
  { name: "Bazar Oriental SRL", cui: "RO38472913" },
  { name: "Pescărie Nord SRL", cui: "RO47382913" },
  { name: "Cabinet Avocatură Man SRL", cui: "RO28374612" },
  { name: "Fabrica de Mobilier Lemn SRL", cui: "RO39482712" },
  { name: "Laborator Foto Instant SRL", cui: "RO29374812" },
  { name: "Magazin Bio Verde SRL", cui: "RO48293712" },
  { name: "Galerie Artă Modernă SRL", cui: "RO28374613" },
  { name: "Ștrand Municipal SRL", cui: "RO47382614" },
  { name: "Depozit Materiale SRL", cui: "RO29384713" },
  { name: "Studio Yoga Light SRL", cui: "RO38472914" },
];

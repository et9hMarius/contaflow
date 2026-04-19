// Ad-hoc verification that the lead capture write path works.
// Mirrors the logic in app/actions.ts without the "use server" wrapping.
import { promises as fs } from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(LEADS_FILE);
  } catch {
    await fs.writeFile(LEADS_FILE, "[]", "utf8");
  }
}

async function capture(payload) {
  const email = (payload.email ?? "").trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "invalid email" };
  }
  const record = {
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    email,
    firma: payload.firma?.trim() || undefined,
    clientCount: payload.clientCount || undefined,
    source: payload.source,
    submittedAt: new Date().toISOString(),
  };
  await ensureFile();
  const raw = await fs.readFile(LEADS_FILE, "utf8");
  const list = JSON.parse(raw || "[]");
  list.push(record);
  await fs.writeFile(LEADS_FILE, JSON.stringify(list, null, 2), "utf8");
  return { ok: true, count: list.length, record };
}

const samples = [
  { email: "maria@popescu-contabilitate.ro", firma: "Maria Popescu Expert Contabil SRL", clientCount: "21-50", source: "hero" },
  { email: "andrei@ionescu.pfa", firma: "Ionescu PFA", clientCount: "1-20", source: "mid" },
  { email: "invalid-email", source: "footer" },
  { email: "office@demo-firma-cluj.ro", firma: "Demo Firma Cluj SRL", clientCount: "51-100", source: "footer" },
];

for (const s of samples) {
  const r = await capture(s);
  console.log(r.ok ? `ok  · lead #${r.count} · ${r.record.email} [${r.record.source}]` : `err · ${s.email} (${r.error})`);
}

const raw = await fs.readFile(LEADS_FILE, "utf8");
const list = JSON.parse(raw);
console.log(`\nTotal leads in file: ${list.length}`);
console.log(`Last lead:`, list[list.length - 1]);

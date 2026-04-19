"use server";

import { promises as fs } from "node:fs";
import path from "node:path";

export interface LeadPayload {
  email: string;
  firma?: string;
  clientCount?: string;
  source: "hero" | "mid" | "footer" | "pricing";
  note?: string;
}

export interface LeadRecord extends LeadPayload {
  id: string;
  submittedAt: string;
  userAgent?: string;
}

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

export async function captureLead(
  payload: LeadPayload
): Promise<{ ok: true; count: number } | { ok: false; error: string }> {
  // minimal validation at the boundary
  const email = (payload.email ?? "").trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Adresa de email nu pare validă." };
  }

  const record: LeadRecord = {
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    email,
    firma: payload.firma?.trim() || undefined,
    clientCount: payload.clientCount || undefined,
    source: payload.source,
    note: payload.note?.trim() || undefined,
    submittedAt: new Date().toISOString(),
  };

  try {
    await ensureFile();
    const raw = await fs.readFile(LEADS_FILE, "utf8");
    const list: LeadRecord[] = JSON.parse(raw || "[]");
    list.push(record);
    await fs.writeFile(LEADS_FILE, JSON.stringify(list, null, 2), "utf8");
    return { ok: true, count: list.length };
  } catch (err) {
    console.error("[captureLead] failed", err);
    return { ok: false, error: "Ceva n-a mers la trimitere. Încearcă din nou?" };
  }
}

export async function getLeadCount(): Promise<number> {
  try {
    await ensureFile();
    const raw = await fs.readFile(LEADS_FILE, "utf8");
    const list: LeadRecord[] = JSON.parse(raw || "[]");
    return list.length;
  } catch {
    return 0;
  }
}

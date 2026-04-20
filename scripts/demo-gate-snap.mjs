import puppeteer from "puppeteer";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { promises as fs } from "node:fs";

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, "..", "tmp-mobile");
await fs.mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({ headless: true });
try {
  for (const route of ["/demo", "/dashboard"]) {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle0" });
    // Small wait so the gate shows
    await new Promise((r) => setTimeout(r, 400));
    const fname = path.join(outDir, `gate${route.replace(/\//g, "-")}.png`);
    await page.screenshot({ path: fname, fullPage: false });
    console.log(`captured ${route}`);
    await page.close();
  }
} finally {
  await browser.close();
}

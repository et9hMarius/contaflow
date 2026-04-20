// Visual check: capture the landing hero at common mobile widths and print
// if anything horizontally overflows the viewport.
import puppeteer from "puppeteer";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, "..", "tmp-mobile");
import { promises as fs } from "node:fs";
await fs.mkdir(outDir, { recursive: true });

const widths = [320, 360, 390, 414];
const browser = await puppeteer.launch({ headless: true });
try {
  for (const w of widths) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: 800, deviceScaleFactor: 2 });
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });

    const overflow = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
      return {
        scrollWidth: Math.max(body.scrollWidth, html.scrollWidth),
        clientWidth: html.clientWidth,
      };
    });
    const overflowing = overflow.scrollWidth > overflow.clientWidth + 1;
    const tag = overflowing ? "OVERFLOW" : "ok";
    console.log(`${w}px → ${tag} (scrollWidth=${overflow.scrollWidth}, clientWidth=${overflow.clientWidth})`);

    await page.screenshot({
      path: path.join(outDir, `landing-${w}.png`),
      fullPage: false,
    });
    await page.close();
  }
} finally {
  await browser.close();
}

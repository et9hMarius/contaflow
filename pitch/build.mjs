import puppeteer from "puppeteer";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(here, "deck.html");
const pdfPath = path.join(here, "ContaFlow_Pitch_Deck.pdf");

const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.goto("file://" + htmlPath.replace(/\\/g, "/"), { waitUntil: "networkidle0" });

  await page.pdf({
    path: pdfPath,
    width: "1280px",
    height: "720px",
    printBackground: true,
    preferCSSPageSize: false,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  console.log(`PDF generat: ${pdfPath}`);
} finally {
  await browser.close();
}

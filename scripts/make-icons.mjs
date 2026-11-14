// Renders build/icon.svg to the PNGs electron-builder needs (it derives .ico/.icns from icon.png).
// Usage: npm run icons   (requires Playwright with a Chromium build available)
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const svg = readFileSync(new URL('../build/icon.svg', import.meta.url), 'utf8');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });
await page.setContent(
  `<html><body style="margin:0;background:transparent">${svg}</body></html>`,
);
const png = await page.locator('svg').screenshot({ omitBackground: true });
writeFileSync(new URL('../build/icon.png', import.meta.url), png);
writeFileSync(new URL('../electron/icon.png', import.meta.url), png);
await browser.close();
console.log('icons written');

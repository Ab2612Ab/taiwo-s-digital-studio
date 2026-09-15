const { chromium } = require('playwright');
const fs = require('fs');

const baseUrl = process.env.GENERATOR_BASE_URL;
const cacheBust = process.env.GITHUB_SHA || Date.now().toString();
const assets = [
  'business-website',
  'design-mistakes',
  'mobile-first',
  'performance',
  'ux-conversion',
  'building-website',
  'trust',
  'process',
];

if (!baseUrl) throw new Error('GENERATOR_BASE_URL is required');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/snap/bin/chromium',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    for (const asset of assets) {
      console.log(`Generating ${asset}...`);
      const page = await browser.newPage({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 1,
      });
      await page.goto(
        `${baseUrl}/?asset=${encodeURIComponent(asset)}&cacheBust=${cacheBust}`,
        { waitUntil: 'domcontentloaded', timeout: 30000 },
      );
      await page.waitForFunction(
        () => {
          const payload = document.querySelector('#payload');
          return Boolean(payload?.textContent?.trim());
        },
        { timeout: 180000 },
      );
      const payload = await page.locator('#payload').textContent();
      if (!payload) throw new Error(`Empty generator payload for ${asset}`);
      const parsed = JSON.parse(payload);
      if (parsed.error || !parsed.data || !parsed.mimeType) {
        throw new Error(`Generator failed for ${asset}: ${JSON.stringify(parsed).slice(0, 500)}`);
      }
      fs.writeFileSync(`/tmp/${asset}.json`, payload, 'utf8');
      await page.close();
    }
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});

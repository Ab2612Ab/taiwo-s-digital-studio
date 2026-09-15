const { chromium } = require('playwright');
const fs = require('fs');

const baseUrl = process.env.GENERATOR_BASE_URL;
const cacheBust = process.env.GITHUB_SHA || Date.now().toString();
const chromiumPath = process.env.CHROMIUM_PATH || '/usr/bin/chromium';
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
const maxAttempts = 4;
const retryDelayMs = 10000;
const betweenAssetsDelayMs = 5000;

if (!baseUrl) throw new Error('GENERATOR_BASE_URL is required');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: chromiumPath,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    for (const asset of assets) {
      let generated = false;
      let lastError;

      for (let attempt = 1; attempt <= maxAttempts && !generated; attempt += 1) {
        console.log(`Generating ${asset} (attempt ${attempt}/${maxAttempts})...`);
        const page = await browser.newPage({
          viewport: { width: 1600, height: 1000 },
          deviceScaleFactor: 1,
        });

        try {
          await page.goto(
            `${baseUrl}/?asset=${encodeURIComponent(asset)}&cacheBust=${cacheBust}-${attempt}`,
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
          generated = true;
        } catch (error) {
          lastError = error;
          console.warn(`Attempt ${attempt} failed for ${asset}: ${error.message}`);
          if (attempt < maxAttempts) await sleep(retryDelayMs);
        } finally {
          await page.close();
        }
      }

      if (!generated) throw lastError || new Error(`Generator failed for ${asset}`);
      await sleep(betweenAssetsDelayMs);
    }
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});

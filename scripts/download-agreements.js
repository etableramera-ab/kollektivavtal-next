const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const pdf = require('pdf-parse');

const agreements = [
  { slug: 'byggavtalet', url: 'https://www.byggnads.se/49ec78/siteassets/kollektivavtal/byggavtalet-2025-digital-utgava-1.pdf' },
  { slug: 'i-avtalet', url: 'https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/i-avtalet-2025-2027.pdf' },
  { slug: 'stal-och-metall', url: 'https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/stal--och-metallindustrin-roda-avtalet.pdf' },
  { slug: 'gemensamma-metall', url: 'https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/gemensamma-metall-2025-2027.pdf' },
  { slug: 'glasavtalet-industri', url: 'https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/glasavtalet-2025-2027.pdf' },
  { slug: 'samhallsavtalet', url: 'https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/samhall-lo-2025-2027.pdf' },
];

const TEXT_DIR = path.join(__dirname, '..', 'src', 'data', 'agreement-texts');

function download(url, redirects = 0) {
  if (redirects > 5) return Promise.reject(new Error('Too many redirects'));
  const client = url.startsWith('https') ? https : http;

  return new Promise((resolve, reject) => {
    const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 30000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, redirects + 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

function cleanText(text) {
  let cleaned = text;
  cleaned = cleaned.replace(/^\d{1,3}\s*$/gm, '');
  cleaned = cleaned.replace(/(\w)-\n(\w)/g, '$1$2');
  cleaned = cleaned.replace(/\n{4,}/g, '\n\n\n');
  cleaned = cleaned.replace(/[ \t]+$/gm, '');
  cleaned = cleaned.replace(/^\s+$/gm, '');
  return cleaned.trim();
}

async function processAgreement(agreement) {
  const outputPath = path.join(TEXT_DIR, `${agreement.slug}-clean.txt`);

  if (fs.existsSync(outputPath)) {
    const stat = fs.statSync(outputPath);
    if (stat.size > 1000) {
      console.log(`[SKIP] ${agreement.slug} — already exists (${stat.size} bytes)`);
      return;
    }
  }

  console.log(`[DOWNLOAD] ${agreement.slug}...`);
  const buffer = await download(agreement.url);
  console.log(`[EXTRACT] ${agreement.slug} — ${buffer.length} bytes PDF`);

  const data = await pdf(buffer);
  const cleaned = cleanText(data.text);

  fs.writeFileSync(outputPath, cleaned, 'utf-8');
  console.log(`[DONE] ${agreement.slug} — ${data.numpages} pages, ${cleaned.length} chars → ${outputPath}`);
}

async function main() {
  if (!fs.existsSync(TEXT_DIR)) {
    fs.mkdirSync(TEXT_DIR, { recursive: true });
    console.log(`[MKDIR] ${TEXT_DIR}`);
  }

  for (const agreement of agreements) {
    try {
      await processAgreement(agreement);
    } catch (err) {
      console.warn(`[WARN] Failed to process ${agreement.slug}: ${err.message}`);
      console.warn(`[WARN] AI chat for ${agreement.slug} will use summary fallback`);
    }
  }

  console.log('[PREBUILD] Agreement text download complete');
}

main();

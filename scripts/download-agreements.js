const fs = require('fs');
const path = require('path');
const https = require('https');
const pdf = require('pdf-parse');

const agreements = [
  {
    slug: 'byggavtalet',
    url: 'https://www.byggnads.se/49ec78/siteassets/kollektivavtal/byggavtalet-2025-digital-utgava-1.pdf',
  },
  // Add more agreements here as they become available
];

const TEXT_DIR = path.join(__dirname, '..', 'src', 'data', 'agreement-texts');

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
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
  const cleanPath = path.join(TEXT_DIR, `${agreement.slug}-clean.txt`);

  if (fs.existsSync(cleanPath)) {
    console.log(`[SKIP] ${agreement.slug} — already exists`);
    return;
  }

  console.log(`[DOWNLOAD] ${agreement.slug} from ${agreement.url}`);
  const buffer = await download(agreement.url);

  console.log(`[EXTRACT] ${agreement.slug} — ${buffer.length} bytes`);
  const data = await pdf(buffer);

  const cleaned = cleanText(data.text);
  fs.writeFileSync(cleanPath, cleaned, 'utf-8');
  console.log(`[DONE] ${agreement.slug} — ${data.numpages} pages, ${cleaned.length} chars`);
}

async function main() {
  if (!fs.existsSync(TEXT_DIR)) fs.mkdirSync(TEXT_DIR, { recursive: true });

  for (const agreement of agreements) {
    try {
      await processAgreement(agreement);
    } catch (err) {
      console.error(`[ERROR] ${agreement.slug}: ${err.message}`);
    }
  }
}

main();

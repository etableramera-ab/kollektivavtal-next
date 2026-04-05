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
  { slug: 'glasmasteriavtalet', url: 'https://www.byggnads.se/4a728f/siteassets/kollektivavtal/glasmasteriavtalet-2025-2027.pdf' },
  { slug: 'entreprenadmaskinavtalet', url: 'https://www.byggnads.se/4a4eef/siteassets/kollektivavtal/entreprenadmaskinavtalet-2025-2027.pdf' },
  { slug: 'plat-ventilationsavtalet', url: 'https://www.byggnads.se/4a76c4/siteassets/kollektivavtal/plat--och-ventilationsavtalet-2025---2027.pdf' },
  { slug: 'maleriavtalet', url: 'https://www.byggnads.se/4a4f6e/siteassets/kollektivavtal/kollektivavtal-for-maleriyrket-2025-2027.pdf' },
  { slug: 'vvs-montorsavtalet', url: 'https://www.byggnads.se/4a7b02/siteassets/kollektivavtal/teknikinstallationsavtal-vvs-kyl-2025-2027.pdf' },
  // SKR — kommun/region
  { slug: 'ab-kommunalt', url: 'https://skr.se/download/18.4c5d386919996f3b21151e81/1759306535392/Allmanna-Bestammelser-AB-25-i-lydelse-2025-04-01.pdf' },
  { slug: 'hok-kommunal', url: 'https://skr.se/download/18.4d2a888c19913a970f86ce83/1757406196642/Huvudoverenskommelse-(HOK)-25-med-Kommunal.pdf' },
  { slug: 'laraavtalet', url: 'https://skr.se/download/18.4d2a888c19913a970f86d2cf/1757406957810/HOK-25-OFRs-Larare.pdf' },
  { slug: 'hok-vision', url: 'https://skr.se/download/18.4d2a888c19913a970f86d11f/1757406625508/Huvudoverenskommelse-(HOK)-25-med-OFR-AKV.pdf' },
  { slug: 'sjukskoterska-avtal', url: 'https://skr.se/download/18.4d2a888c19913a970f86d134/1757406796925/HOK-25-OFR-H%C3%A4lso-och-sjukvard..pdf' },
  { slug: 'hok-akademiker', url: 'https://skr.se/download/18.4d2a888c19913a970f86cfd2/1757406413579/HOK-T-med-AkademikerAlliansen-i-lydelse%202025-04-01.pdf' },
  { slug: 'lakare-kommun', url: 'https://skr.se/download/18.2eae6b4519a0f5b858e1b6e7/1761294674524/H%C3%96K%2025%20L%C3%A4karf%C3%B6rbundet.pdf' },
  { slug: 'bilaga-m-larare', url: 'https://skr.se/download/18.4d2a888c19913a970f86c663/1757404111873/Bilaga%20M-25.pdf' },
  { slug: 'bilaga-r-raddningstjanst', url: 'https://skr.se/download/18.4d2a888c19913a970f86c661/1757404111635/Bilaga-R-i-lydelse-2025-04-01.pdf' },
  // HRF — Hotell & Restaurang
  { slug: 'hotell-restaurang', url: 'https://www.hrf.net/app/uploads/2025/05/Grona-riksen-2025-2027-1.pdf' },
  { slug: 'hotell-restaurang-hang', url: 'https://www.hrf.net/app/uploads/2025/05/Visita-Hangavtal-2025-2027.pdf' },
  // Handelsavtalet (Detaljhandel)
  { slug: 'handelsavtalet', url: 'https://www.in.se/globalassets/dokument/arbetsgivarguiden/publik/kollektivavtal/detaljhandelsavtalet-2025-2027-in.pdf' },
  // Arbetsgivarverket — Villkorsavtal Saco
  { slug: 'villkorsavtal-saco', url: 'https://www.av.se/globalassets/filer/arbetsmiljoarbete-och-inspektioner/avtal-utstationering/kollektivavtal-villkorsavtal-t-mellan-arbetsgivarverket-saco-s.pdf' },
  // Seko — Väg och ban
  { slug: 'vag-banavtalet-seko', url: 'https://www.seko.se/4a5cef/siteassets/kollektivavtal/branschavtal/vag-och-ban/vag-och-banavtalet-2025-2027-utgava-1.pdf' },
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

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
  { slug: 'villkorsavtal-saco', url: 'https://www.arbetsgivarverket.se/globalassets/arbetsgivarverket/avtal-och-skrifter/avtal/villkorsavtal-t-arbetsgivarverket---saco-s/villkorsavtal-t-saco-s-6.0-20260114.pdf' },
  // Seko — Väg och ban
  { slug: 'vag-banavtalet-seko', url: 'https://www.seko.se/4a5cef/siteassets/kollektivavtal/branschavtal/vag-och-ban/vag-och-banavtalet-2025-2027-utgava-1.pdf' },
  // IF Metall — nya
  { slug: 'teknikavtalet-ifmetall', url: 'https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/teknikavtalet-2025-2027.pdf' },
  { slug: 'svemek-avtalet', url: 'https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/svemek-2025-2027.pdf' },
  { slug: 'kemiskt-avtal-ifmetall', url: 'https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/kemiska-fabriker-2025-2027.pdf' },
  // TechSverige — Telekom
  { slug: 'telekomavtalet', url: 'https://www.akavia.se/siteassets/03-rad-och-stod/kollektivavtal-privat-sektor/tech-och-it/kollektivavtal-allmanna-anstallningsvillkor---avtal-2025---techsverige-telekom.pdf' },
  // Elektrikerna — Installationsavtalet
  { slug: 'installationsavtalet', url: 'https://www.in.se/globalassets/dokument/arbetsgivarguiden/publik/kollektivavtal/installationsavtalet-2025-2027.pdf' },
  // LO-förbunden — Bemanningsavtalet
  { slug: 'bemanningsavtalet', url: 'https://www.livs.se/globalassets/livs.se/arbetsplats--och-avtalsfragor/avtal-2020-2025/material-avtal-2020-2025/bemanningsavtalet-2025-05-01---2027-04-30.pdf' },
  // Kompetensföretagen — tjänstemän
  { slug: 'kompetensforetagen-tjansteman', url: 'https://www.kompetensforetagen.se/app/uploads/sites/5/2025/11/Kollektivavtal-Kompetensforetagen-tjansteman-2025-2027-artnr-6512-2506.pdf' },
  // Almega Fastighetsarbetsgivarna — Fastighetsavtalet (tjänsteman)
  { slug: 'fastighetsavtalet', url: 'https://www.akavia.se/siteassets/03-rad-och-stod/kollektivavtal-privat-sektor/almega/kollektivavtal---avtal-2025---fastighetsarbetsgivarna---20250601.pdf' },
  // Skogsstyrelsen — VISST (Villkorsavtal för skogligt arbete)
  { slug: 'skogsavtalet', url: 'https://www.skogsstyrelsen.se/globalassets/om-oss/kollektivavtal/visst-2026-2027.pdf' },
  // Pappers — Massa- och pappersindustrin, arbetare
  { slug: 'massa-pappersindustrin-pappers', url: 'https://www.pappers.se/sites/default/files/2026-01/kollektivavtal-25-27.pdf' },
  // Massa- och pappersindustrin — tjänstemän
  { slug: 'massa-pappersindustrin-tjansteman', url: 'https://www.unionen.se/sites/default/files/files/Allm%C3%A4nna%20villkor%2C%20Partsgemensamma%20kommentarer%20MoP%202025-2027.pdf' },
  // Sågverksindustrin — tjänstemän inom basindustrin
  { slug: 'sagverksindustrin-tjansteman', url: 'https://www.unionen.se/sites/default/files/files/2025-%202027%20Tjm%20Basindustrin_250820.pdf' },
  // Träindustrin — tjänstemän hos TMF-anslutna företag
  { slug: 'traindustrin-tjansteman-tmf', url: 'https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/tmf_tra_och_mobelforetagen/?block=22169&mode=Index&resourcename=1.+Tj%C3%A4nstemannaavtal+Tr%C3%A4industri+2025+-+2027.pdf' },
  // Ytterligare tjänstemannaavtal inom industri och bygg
  { slug: 'ikem-tjanstemannaavtal', url: 'https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/innovations-kemiindustrierna/?block=22150&mode=Index&resourcename=1.+IKEM-avtalet+1+april+2025+-+31+mars+2027.pdf' },
  { slug: 'livsmedelsindustrin-tjanstemannaavtal', url: 'https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/livsmedelsforetagen/?block=22168&mode=Index&resourcename=1.+Tj%C3%A4nstemaannaavtalet-i-livsmedelsindustrin-2025-2027.pdf' },
  { slug: 'byggforetagen-tjanstemannaavtal', url: 'https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/byggforetagen/?block=22154&mode=Index&resourcename=1.+Tj%C3%A4nstemannaavtalet+-+Byggf%C3%B6retagen+2025+-+2027.pdf' },
  {
    slug: 'stal-metallindustrin-tjansteman',
    urls: [
      'https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/stal-och-metallforbundet/?block=22152&mode=Index&resourcename=1.+Basindustrin+-+Allm%C3%A4nna+anst%C3%A4llningsvillkor+2025+-+2027+%282%29.pdf',
      'https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/stal-och-metallforbundet/?block=22152&mode=Index&resourcename=2.+S%C3%A4rtryck+-+avtal+och+bilagor+till+allm%C3%A4nna+anst%C3%A4llningsvillkor+-+St%C3%A5l+och+Metall+2025-04-01+-+2027-03-31.pdf',
    ],
  },
  {
    slug: 'gruvindustrin-tjansteman',
    urls: [
      'https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/gruvornas_arbetsgivareforbund/?block=22148&mode=Index&resourcename=1.+Basindustrin+-+Allm%C3%A4nna+anst%C3%A4llningsvillkor+2025+-+2027.pdf',
      'https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/gruvornas_arbetsgivareforbund/?block=22148&mode=Index&resourcename=2.+S%C3%A4rtryck+-+avtal+och+bilagor+till+allm%C3%A4nna+anst%C3%A4llningsvillkor+Gruvindustrin+2025-04-01+-+2027-03-31.pdf',
    ],
  },
  { slug: 'gruvindustrin-if-metall', url: 'https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/gruvindustrin-2025-2027.pdf' },
  { slug: 'spartrafikavtalet', url: 'https://www.seko.se/48db46/siteassets/kollektivavtal/branschavtal/spartrafik/spartrafikavtalet_2025-2027-2.pdf' },
  { slug: 'branschavtal-kommunikation', url: 'https://www.seko.se/4ada49/siteassets/kollektivavtal/branschavtal/kommunikation/kollektivavtal-bransch-kommunikation-2025-2027.pdf' },
  { slug: 'branschavtal-energi-efa', url: 'https://www.seko.se/490235/siteassets/kollektivavtal/branschavtal/energi/kollektivavtal_efa_2025-2027.pdf' },
  // Besöksnäringens tjänstemannaavtal — Visita/Unionen
  { slug: 'besoksnaringens-tjanstemannaavtal', url: 'https://visita.se/app/uploads/2025/07/Visita-Unionen-2025-2027.pdf' },
  // Arbetaravtalen för privat skog, sågverk och träindustri ligger bakom
  // parternas inloggning. Använd inte äldre avtalsböcker som AI-underlag.
  // Arbetsgivarverket — Villkorsavtal OFR/S,P,O
  { slug: 'villkorsavtal-ofr', url: 'https://reservofficerarna.se/app/uploads/2026/01/villkorsavtalet-2026.pdf' },
  // Arbetsgivarverket — Villkorsavtal Seko
  { slug: 'villkorsavtal-seko', url: 'https://www.arbetsgivarverket.se/globalassets/arbetsgivarverket/avtal-och-skrifter/avtal/villkorsavtal-arbetsgivarverket---seko/villkorsavtal-seko-6.0-20260114.pdf' },
  // Transportföretagen och motorbranschen
  { slug: 'tjanstemannaavtalet-transportforetagen', url: 'https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/transportforetagen/?block=22176&mode=Index&resourcename=6.+Kollektivavtal+-+Avtal+2025+-+Transportf%C3%B6retagen+-+20250501.pdf' },
  { slug: 'tjanstemannaavtalet-motorbranschen', url: 'https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/transportforetagen/?block=22176&mode=Index&resourcename=5.+Kollektivavtal+-+Avtal+2025+-+Motorbranschen+-+20250501.pdf' },
  { slug: 'motorbranschavtalet', url: 'https://www.ifmetall.se/globalassets/avdelningar/forbundskontoret/resurser/dokument/kollektivavtal/kollektivavtal-2025-/motorbranschavtalet-20252027.pdf' },
  // Bank och finans
  { slug: 'bankavtalet-finansforbundet', url: 'https://www.finansforbundet.se/globalassets/material---bestall-hem/produkter/allmanna-villkor-finansforbundet-2026-01-01-002.pdf' },
  { slug: 'bankavtalet-saco', url: 'https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/finansarbetsgivarna/?block=22144&mode=Index&resourcename=1.+Kollektivavtal+-+Avtal+2026+-+Finansarbetsgivarna+-+20260101.pdf' },
  // Teknikkonsult, tjänsteföretag och försäkring
  { slug: 'innovationsavtalet', url: 'https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/innovationsforetagen/?block=22162&mode=Index&resourcename=3.+Kollektivavtal+Allm%C3%A4nna+anst%C3%A4llningsvillkor++-+Avtal+2025+-+Innovationsf%C3%B6retagen+-+20250401.pdf' },
  { slug: 'grona-avtalet', url: 'https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/tjansteforetagen_och_medieforetagen/?block=22171&mode=Index&resourcename=1.+Kollektivavtal+-+Avtal+2025+-+Medief%C3%B6retagen+Tj%C3%A4nstef%C3%B6retagen+gr%C3%B6na+avtalet+-+20250501.pdf' },
  { slug: 'forsakringsavtalet-forena', url: 'https://www.forena.se/media/sfjdzp4p/kollektivavtalfaoforena2025-2027.pdf' },
  { slug: 'forsakringsavtalet-saco', url: 'https://www.sverigesingenjorer.se/kollektivavtal/avtalsomrade/forsakringsbranschen/?block=22191&mode=Index&resourcename=3.+Kollektivavtal+-+Avtal+2025+-+F%C3%B6rs%C3%A4kringsbranschens+arbetsgivareorganisation+FAO+-+20250401+-+20270331.pdf' },
  // Privata apoteksföretag
  { slug: 'apoteksavtalet-svensk-handel', url: 'https://www.sverigesfarmaceuter.se/globalassets/2-dokument/2-rad-och-stod/anstallning/kollektivavtal/apotek/svensk-handel/apoteksavtalet-2025-2027.pdf' },
  { slug: 'apoteksforetagen-almega', url: 'https://www.sverigesfarmaceuter.se/globalassets/2-dokument/2-rad-och-stod/anstallning/kollektivavtal/apotek/almega/kollektivavtal-apotek-tjansteman-2025-2027-sveriges-ingenjorer-sveriges-farmaceuter-unionen-artnr-6072-2505.pdf' },
  // Medieföretagen — Journalistförbundet
  { slug: 'journalistavtalet-dagspress', url: 'https://www.sjf.se/system/files/2025-06/Dagspress%20kollektivavtal%202025-2027.pdf' },
  { slug: 'journalistavtalet-public-service', url: 'https://www.sjf.se/system/files/2025-05/Public%20service%20kollektivavtal%202025-2027.pdf' },
  { slug: 'journalistavtalet-tidskrift', url: 'https://www.sjf.se/system/files/2025-07/Tidskrifter%20kollektivavtal%202025-2027.pdf' },
  { slug: 'journalistavtalet-etermedier', url: 'https://www.sjf.se/system/files/2025-07/Etermedier%20kollektivavtal%202025-2027.pdf' },
  { slug: 'journalistavtalet-bemanning', url: 'https://www.sjf.se/system/files/2025-09/Bemanning%20kollektivavtal%202025-2027.pdf' },
  // Fastighetsarbete
  { slug: 'fastigheter-arbetare-almega', url: 'https://www.fastighets.se/49a08c/contentassets/3e30983e855d4780adef9611b4d62256/kollektivavtal-almega-fastigheter-2025-2027-fastighetsanstalldas-forbund-artnr-6554-2504.pdf' },
  { slug: 'f-avtalet-fastigo', url: 'https://www.fastighets.se/49b36f/contentassets/63ff67138286461ebbe8e9921b86aaf5/f-avtal-2025.pdf' },
  // Sobona — fem separata branschöverenskommelser
  { slug: 'sobona-bok-besoksnaring-kulturarv', url: 'https://sobona.se/download/18.1eca47cd19c1c71f06dce0be/1772530261589/Avtal%20Bes%C3%B6ksn%C3%A4ring%20och%20kulturarv%202025.pdf' },
  { slug: 'sobona-bok-energi', url: 'https://sobona.se/download/18.1eca47cd19c1c71f06dd16a5/1770224541432/Avtal%20Energi%202025.pdf' },
  { slug: 'sobona-bok-fastigheter', url: 'https://sobona.se/download/18.1eca47cd19c1c71f06dd1afa/1770225129562/Avtal%20Fastigheter%202025.pdf' },
  { slug: 'sobona-bok-flygplatser', url: 'https://sobona.se/download/18.1eca47cd19c1c71f06dd1cfd/1770225395675/Avtal%20Flygplatser%202025.pdf' },
  { slug: 'sobona-bok-vatten-miljo', url: 'https://sobona.se/download/18.1eca47cd19c1c71f06dd35e9/1770226688715/Avtal%20Vatten%20och%20milj%C3%B6%202025.pdf' },
  // Friskolor och Svenska kyrkan
  { slug: 'friskoleavtalet-larare', url: 'https://www.sverigeslarare.se/siteassets/1.-rad-och-stod/kollektivavtal/almega/friskoleavtalet-2025-2027/almega_friskoleavtalet_kollektivavtal_2025_2027.pdf' },
  { slug: 'svenska-kyrkan-tjansteman', url: 'https://www.skao.se/media/iddkx44a/svenska-kyrkans-ab-25_tjaenstemaen_giltig_from_1maj2026.pdf' },
  { slug: 'svenska-kyrkan-kommunal', url: 'https://www.skao.se/media/3mojjuhu/svenska-kyrkans-ab-25_kommunalsavtalsomraade_giltig_from_1maj2026.pdf' },
  // Transportavtalet 2025–2027 finns bakom parternas inloggning. Ladda inte
  // längre ned den utgångna tredjepartskopian från avtalsperioden 2023–2025.
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

  const urls = agreement.urls || [agreement.url];
  const textParts = [];
  let totalPages = 0;

  for (const [index, url] of urls.entries()) {
    console.log(`[DOWNLOAD] ${agreement.slug} (${index + 1}/${urls.length})...`);
    const buffer = await download(url);
    console.log(`[EXTRACT] ${agreement.slug} — ${buffer.length} bytes PDF`);

    const data = await pdf(buffer);
    totalPages += data.numpages;
    textParts.push(cleanText(data.text));
  }

  const cleaned = textParts.join('\n\n--- NÄSTA OFFICIELLA AVTALSDOKUMENT ---\n\n');

  fs.writeFileSync(outputPath, cleaned, 'utf-8');
  console.log(`[DONE] ${agreement.slug} — ${totalPages} pages, ${cleaned.length} chars → ${outputPath}`);
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

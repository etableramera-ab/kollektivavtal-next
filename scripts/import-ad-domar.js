const fs = require('fs');

const API_BASE = 'https://rattspraxis.etjanst.domstol.se/api/v1';
const OUTPUT_FILE = 'src/data/court-cases-imported.json';
const PAGE_SIZE = 50;
const RATE_LIMIT_MS = 250;

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function detectTopic(keywords, summary) {
  const kw = keywords.map(k => k.toLowerCase()).join(' ');
  const t = (kw + ' ' + (summary || '').toLowerCase());
  if (t.includes('uppsägning') || t.includes('avsked') || t.includes('sakliga skäl')) return 'Uppsägning';
  if (t.includes('lön') || t.includes('löne') || t.includes('ersättning') && !t.includes('skadestånd')) return 'Lön';
  if (t.includes('diskriminering') || t.includes('jämställd') || t.includes('likabehandl')) return 'Diskriminering';
  if (t.includes('strejk') || t.includes('stridsåtgärd') || t.includes('blockad') || t.includes('sympatiåtgärd') || t.includes('fredsplikt')) return 'Stridsåtgärd';
  if (t.includes('arbetstid') || t.includes('övertid') || t.includes('semester') || t.includes('ob-tillägg') || t.includes('obekväm')) return 'Arbetstid';
  if (t.includes('kollektivavtal') || t.includes('avtalstolk') || t.includes('tolkning')) return 'Kollektivavtalstolkning';
  if (t.includes('medbestämmande') || t.includes('mbl') || t.includes('förhandling') && t.includes('skyldighet')) return 'Medbestämmande';
  if (t.includes('omplacering') || t.includes('arbetsskyldighet')) return 'Arbetsskyldighet';
  if (t.includes('skadestånd')) return 'Skadestånd';
  return 'Övrigt';
}

function detectAgreement(summary, keywords) {
  const t = ((summary || '') + ' ' + keywords.join(' ')).toLowerCase();
  if (t.includes('byggnads') || t.includes('byggföretagen') || t.includes('byggavtal')) return 'byggavtalet';
  if (t.includes('handels') && (t.includes('svensk handel') || t.includes('handelsavtal') || t.includes('butik'))) return 'handelsavtalet';
  if (t.includes('if metall') || t.includes('teknikarbetsgivarna') || t.includes('teknikavtal')) return 'teknikavtalet';
  if (t.includes('kommunal') && (t.includes('skr') || t.includes('kommun') || t.includes('hök'))) return 'hok-kommunal';
  if (t.includes('transport') && !t.includes('kollektivtrafik')) return 'transportavtalet';
  if (t.includes('hotell') || t.includes('restaurang') || t.includes('hrf') || t.includes('visita')) return 'hotell-restaurang';
  if (t.includes('unionen') && t.includes('almega')) return 'almega-tjansteforetagen';
  if (t.includes('elektrik') || t.includes('installatör')) return 'installationsavtalet';
  if (t.includes('seko') && (t.includes('stat') || t.includes('arbetsgivarverket'))) return 'villkorsavtal-seko';
  if (t.includes('saco') && t.includes('arbetsgivarverket')) return 'villkorsavtal-saco';
  if (t.includes('livs') || t.includes('livsmedel')) return 'livsmedelsavtalet';
  if (t.includes('fastighets')) return 'fastighetsavtalet';
  if (t.includes('finans') || t.includes('bank')) return 'bankavtalet';
  if (t.includes('pilot') || t.includes('flyg')) return null;
  if (t.includes('vision') && t.includes('kommun')) return 'hok-vision';
  if (t.includes('vårdföretag')) return 'vard-omsorg-privat';
  if (t.includes('bemanning') || t.includes('kompetensföretag')) return 'bemanningsavtalet';
  return null;
}

function makeSlug(referat) {
  // "AD 2024 nr 103" → "ad-2024-nr-103"
  return referat.toLowerCase().replace(/\s+/g, '-');
}

async function importAllCases() {
  console.log('Importing Arbetsdomstolen cases...\n');

  const allCases = [];
  let page = 0;
  let hasMore = true;

  while (hasMore) {
    const body = {
      sidIndex: page,
      antalPerSida: PAGE_SIZE,
      sortorder: 'avgorandedatum',
      asc: false,
      filter: { domstolKodLista: ['ADO'] },
    };

    const response = await fetch(`${API_BASE}/sok`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error(`API error: ${response.status}`);
      break;
    }

    const data = await response.json();
    const cases = data.publiceringLista || [];
    const total = data.total || 0;

    if (cases.length === 0) {
      hasMore = false;
      break;
    }

    for (const c of cases) {
      const referat = (c.referatNummerLista && c.referatNummerLista[0]) || `AD ${c.avgorandedatum?.substring(0, 4)} mål ${(c.malNummerLista || ['okänt'])[0]}`;
      const slug = makeSlug(referat);
      const year = parseInt(c.avgorandedatum?.substring(0, 4) || '0');
      const summary = (c.sammanfattning || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

      allCases.push({
        id: slug,
        externalId: c.id,
        caseNumber: referat,
        caseNumbers: c.malNummerLista || [],
        date: c.avgorandedatum || '',
        year,
        title: (c.benamning || summary.substring(0, 120) + (summary.length > 120 ? '...' : '')).trim(),
        summary,
        topic: detectTopic(c.nyckelordLista || [], summary),
        keywords: c.nyckelordLista || [],
        relatedAgreement: detectAgreement(summary, c.nyckelordLista || []),
        outcome: 'Övrigt',
        sourceUrl: `https://rattspraxis.etjanst.domstol.se/sok/publicering/${c.gruppKorrelationsnummer}`,
        isGuiding: c.arVagledande || false,
        type: c.typ || 'REFERAT',
      });
    }

    console.log(`  Page ${page + 1}: ${cases.length} cases (${allCases.length}/${total})`);
    page++;

    if (allCases.length >= total) hasMore = false;
    await sleep(RATE_LIMIT_MS);
  }

  console.log(`\nTotal: ${allCases.length} cases imported`);

  // Stats
  const topics = {};
  const years = {};
  let linked = 0;
  for (const c of allCases) {
    topics[c.topic] = (topics[c.topic] || 0) + 1;
    years[c.year] = (years[c.year] || 0) + 1;
    if (c.relatedAgreement) linked++;
  }
  console.log('\nTopics:', topics);
  console.log('Year range:', Math.min(...Object.keys(years).map(Number)), '-', Math.max(...Object.keys(years).map(Number)));
  console.log('Linked to agreements:', linked);

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allCases, null, 2), 'utf-8');
  console.log(`\nSaved to ${OUTPUT_FILE}`);
}

importAllCases().catch(console.error);

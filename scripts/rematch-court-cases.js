const fs = require('fs');

const cases = require('../src/data/court-cases-imported.json');
const OUTPUT = 'src/data/court-cases-imported.json';

const MATCHERS = {
  'byggavtalet': [
    'byggnads', 'byggnadsarbetareförbundet', 'byggföretagen', 'byggavtal',
    'byggindustri', 'sveriges byggindustrier'
  ],
  'teknikavtalet': [
    'if metall', 'industrifacket metall', 'teknikarbetsgivarna', 'teknikavtal',
    'verkstadsföreningen', 'metallarbetareförbundet', 'metallindustriarbetareförbundet',
    'teknikföretagen'
  ],
  'handelsavtalet': [
    'handelsanställda', 'svensk handel', 'handelsavtal',
    'handelstjänstemannaförbundet', 'hao'
  ],
  'hok-kommunal': [
    'kommunalarbetareförbundet', 'svenska kommunalarbetareförbundet',
    'sobona', 'kommunalarbetare'
  ],
  'ab-kommunalt': [],
  'hok-vision': [
    'vision', 'sktf', 'akademikerförbundet ssr'
  ],
  'it-avtalet': [
    'techsverige', 'it&telekomföretagen', 'it- och telekomföretagen'
  ],
  'transportavtalet': [
    'transportarbetareförbundet', 'svenska transportarbetareförbundet',
    'biltrafikens arbetsgivare', 'transportavtal'
  ],
  'hotell-restaurang': [
    'hotell- och restaurangfacket', 'hotell och restaurang',
    'visita', 'restaurangavtal', 'shr'
  ],
  'almega-tjansteforetagen': [
    'almega'
  ],
  'installationsavtalet': [
    'elektrikerförbundet', 'svenska elektrikerförbundet',
    'installatörsföretagen', 'eio'
  ],
  'vard-omsorg-privat': [
    'vårdföretagarna'
  ],
  'livsmedelsavtalet': [
    'livsmedelsarbetareförbundet', 'livsmedelsföretagen',
    'livsmedelsindustri'
  ],
  'fastighetsavtalet': [
    'fastighetsanställda', 'fastigo'
  ],
  'bemanningsavtalet': [
    'kompetensföretagen', 'bemanningsavtal', 'bemanningsföretagen'
  ],
  'bankavtalet': [
    'finansförbundet', 'bankinstitut', 'bankföreningen',
    'bankinstitutens arbetsgivareorganisation'
  ],
  'forsakringsavtalet': [
    'forena', 'försäkringstjänstemannaförbundet', 'ftf',
    'försäkringsbranschens arbetsgivareorganisation'
  ],
  'skogsavtalet': [
    'gs-facket', 'skogsindustrierna', 'pappers',
    'grafiska fackförbundet', 'sågverk'
  ],
  'mediaavtalet': [
    'journalistförbundet', 'tidningsutgivarna', 'medieföretagen',
    'publicistklubben'
  ],
  'vaganlaggningsavtalet': [
    'väganläggning'
  ],
  'villkorsavtal-saco': [
    'saco-s', 'arbetsgivarverket.*saco', 'rals'
  ],
  'villkorsavtal-ofr': [
    'polisförbundet', 'officersförbundet',
    'offentliganställdas förhandlingsråd', 'fackförbundet st',
    'tull-kust', 'försvarsmakten'
  ],
  'villkorsavtal-seko': [
    'seko.*arbetsgivarverket', 'service- och kommunikationsfacket'
  ],
  'systembolagsavtalet': [
    'systembolaget'
  ],
  'kommunal-skola': [
    'arbetsgivaralliansen.*skola', 'fristående skol'
  ],
};

// Special keyword-based matching
const KEYWORD_MATCHERS = {
  'villkorsavtal-ofr': ['Polis', 'Officer'],
};

// Broad matchers — only match if no specific match found and text strongly suggests it
const BROAD_MATCHERS = {
  'hok-kommunal': [/\bkommunal\b.*\b(kommun|skr|region|landsting)\b/i, /\b(kommun|landsting|region)\b.*\bkommunal\b/i],
  'ab-kommunalt': [/\b(kommun|landsting|region)\b.*\b(anställ|arbets)/i],
};

function detectAgreement(c) {
  const searchText = [
    c.title || '',
    c.summary || '',
    (c.keywords || []).join(' '),
    (c.caseNumbers || []).join(' '),
  ].join(' ');
  const lower = searchText.toLowerCase();

  // Exact matchers first
  for (const [slug, matchers] of Object.entries(MATCHERS)) {
    for (const matcher of matchers) {
      if (matcher.includes('.*')) {
        try {
          if (new RegExp(matcher, 'i').test(lower)) return slug;
        } catch { /* skip bad regex */ }
      } else if (lower.includes(matcher.toLowerCase())) {
        return slug;
      }
    }
  }

  // Keyword matchers
  const kws = (c.keywords || []).map(k => k);
  for (const [slug, kwMatchers] of Object.entries(KEYWORD_MATCHERS)) {
    for (const kw of kwMatchers) {
      if (kws.includes(kw)) return slug;
    }
  }

  // Broad matchers (only if nothing else matched)
  for (const [slug, regexes] of Object.entries(BROAD_MATCHERS)) {
    for (const re of regexes) {
      if (re.test(searchText)) return slug;
    }
  }

  return null;
}

// Run
const beforeLinked = cases.filter(c => c.relatedAgreement).length;
const newLinks = {};
let changed = 0;

for (const c of cases) {
  const newMatch = detectAgreement(c);
  if (newMatch && newMatch !== c.relatedAgreement) {
    if (!c.relatedAgreement) {
      // Only add, never change existing
      c.relatedAgreement = newMatch;
      changed++;
      newLinks[newMatch] = (newLinks[newMatch] || 0) + 1;
    }
  }
}

const afterLinked = cases.filter(c => c.relatedAgreement).length;
const stillUnlinked = cases.filter(c => !c.relatedAgreement).length;

console.log(`Before: ${beforeLinked} linked`);
console.log(`After: ${afterLinked} linked (+${changed} new)`);
console.log(`Still unlinked: ${stillUnlinked}\n`);

console.log('New links per agreement:');
const sorted = Object.entries(newLinks).sort((a, b) => b[1] - a[1]);
for (const [slug, count] of sorted) {
  console.log(`  +${count}  ${slug}`);
}

// Save
fs.writeFileSync(OUTPUT, JSON.stringify(cases, null, 2), 'utf-8');
console.log(`\nSaved to ${OUTPUT}`);

// Show remaining top org names
const unlinked = cases.filter(c => !c.relatedAgreement);
const orgPatterns = ['kommun', 'landsting', 'region', 'vision', 'försvarsmakten', 'pappers', 'handels', 'polis'];
const orgHits = {};
for (const c of unlinked) {
  const t = (c.summary || '').toLowerCase();
  for (const p of orgPatterns) {
    if (t.includes(p)) orgHits[p] = (orgHits[p] || 0) + 1;
  }
}
console.log('\nRemaining org mentions in unlinked:');
for (const [k, v] of Object.entries(orgHits).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${v}x  ${k}`);
}

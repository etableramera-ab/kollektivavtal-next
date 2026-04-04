const cases = require('../src/data/court-cases-imported.json');

const linked = cases.filter(c => c.relatedAgreement);
const unlinked = cases.filter(c => !c.relatedAgreement);

console.log(`Total: ${cases.length}`);
console.log(`Linked: ${linked.length}`);
console.log(`Unlinked: ${unlinked.length}\n`);

// Count linked per agreement
const perAgreement = {};
for (const c of linked) {
  perAgreement[c.relatedAgreement] = (perAgreement[c.relatedAgreement] || 0) + 1;
}
console.log('Per agreement:', JSON.stringify(perAgreement, null, 2));

// Find common words in unlinked summaries and keywords
const wordCount = {};
for (const c of unlinked) {
  const text = (c.summary + ' ' + c.keywords.join(' ')).toLowerCase();
  // Extract organization-like names (capitalized words)
  const orgs = (c.summary || '').match(/[A-ZÅÄÖ][a-zåäö]+(?:\s+[A-ZÅÄÖ][a-zåäö]+)*/g) || [];
  for (const org of orgs) {
    if (org.length > 3) {
      wordCount[org] = (wordCount[org] || 0) + 1;
    }
  }
}

const sorted = Object.entries(wordCount).sort((a, b) => b[1] - a[1]).slice(0, 50);
console.log('\nTop 50 names in UNLINKED cases:');
for (const [name, count] of sorted) {
  console.log(`  ${count}x  ${name}`);
}

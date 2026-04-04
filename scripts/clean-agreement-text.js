const fs = require('fs');
const path = require('path');

function cleanText(text) {
  let cleaned = text;

  // Remove page numbers (standalone numbers on their own line)
  cleaned = cleaned.replace(/^\d{1,3}\s*$/gm, '');

  // Remove repeated headers/footers (common patterns)
  cleaned = cleaned.replace(/^BYGGAVTALET\s*$/gm, '');
  cleaned = cleaned.replace(/^RIKSAVTAL 2025\s*$/gm, '');

  // Fix hyphenated words split across lines
  cleaned = cleaned.replace(/(\w)-\n(\w)/g, '$1$2');

  // Collapse multiple blank lines into max 2
  cleaned = cleaned.replace(/\n{4,}/g, '\n\n\n');

  // Remove trailing whitespace per line
  cleaned = cleaned.replace(/[ \t]+$/gm, '');

  // Remove leading whitespace but preserve indentation for structure
  // Only remove lines that are purely whitespace
  cleaned = cleaned.replace(/^\s+$/gm, '');

  return cleaned.trim();
}

const slug = process.argv[2] || 'byggavtalet';
const dir = 'src/data/agreement-texts';
const inputPath = path.join(dir, `${slug}.txt`);
const outputPath = path.join(dir, `${slug}-clean.txt`);

const raw = fs.readFileSync(inputPath, 'utf-8');
const cleaned = cleanText(raw);

fs.writeFileSync(outputPath, cleaned, 'utf-8');
console.log(`Cleaned: ${raw.length} → ${cleaned.length} characters (saved ${raw.length - cleaned.length})`);
console.log(`Saved to ${outputPath}`);

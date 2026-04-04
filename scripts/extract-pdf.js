const fs = require('fs');
const pdf = require('pdf-parse');

async function extractPdf(inputPath, outputPath) {
  const dataBuffer = fs.readFileSync(inputPath);
  const data = await pdf(dataBuffer);
  fs.writeFileSync(outputPath, data.text, 'utf-8');
  console.log(`Extracted ${data.numpages} pages, ${data.text.length} characters`);
  console.log(`Saved to ${outputPath}`);
}

const input = process.argv[2] || '/tmp/byggavtalet-2025.pdf';
const output = process.argv[3] || 'src/data/agreement-texts/byggavtalet.txt';

extractPdf(input, output).catch(console.error);

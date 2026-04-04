import fs from "fs";
import path from "path";

const AGREEMENT_TEXT_DIR = path.join(process.cwd(), "src/data/agreement-texts");

const textCache: Record<string, string> = {};

export function getAgreementFullText(slug: string): string | null {
  if (textCache[slug]) return textCache[slug];

  const filePath = path.join(AGREEMENT_TEXT_DIR, `${slug}-clean.txt`);

  try {
    if (!fs.existsSync(filePath)) return null;
    const text = fs.readFileSync(filePath, "utf-8");
    textCache[slug] = text;
    return text;
  } catch {
    return null;
  }
}

export function getTruncatedAgreementText(
  slug: string,
  maxChars: number = 80000
): string | null {
  const fullText = getAgreementFullText(slug);
  if (!fullText) return null;

  if (fullText.length <= maxChars) return fullText;

  const truncated = fullText.substring(0, maxChars);
  const lastParagraph = truncated.lastIndexOf("\n\n");
  return (
    truncated.substring(0, lastParagraph > 0 ? lastParagraph : maxChars) +
    "\n\n[Texten är förkortad. Kontakta Byggnads för fullständig avtalstext.]"
  );
}

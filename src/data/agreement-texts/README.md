# Avtalstexter

Denna mapp innehåller extraherade texter från officiella kollektivavtal.
Texterna används som kontext för AI-chatten — de visas ALDRIG för användaren.

## Tillgängliga texter:
- byggavtalet-clean.txt — Byggavtalet 2025-2027 (Byggnads/Byggföretagen)

## Källa:
Alla texter är nedladdade från respektive fackförbunds officiella webbplats.

## Upphovsrätt:
Texterna är upphovsrättsligt skyddade av respektive avtalsparter.
De används enbart som intern kontext för AI-sammanfattning.
Avtalstexten citeras ALDRIG ordagrant i AI-svar eller på sajten.

## Lägg till fler avtal:
1. Ladda ner PDF från fackförbundets sajt
2. Kör: `node scripts/extract-pdf.js /path/to/pdf.pdf src/data/agreement-texts/[slug].txt`
3. Kör: `node scripts/clean-agreement-text.js [slug]`
4. Testa AI-chatten på avtalssidan

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checkLinks = process.argv.includes("--check-links");

function loadTypeScriptModule(relativePath, dependencies = {}, append = "") {
  const filename = path.join(projectRoot, relativePath);
  const source = `${fs.readFileSync(filename, "utf8")}\n${append}`;
  const javascript = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: filename,
  }).outputText;
  const module = { exports: {} };
  const localRequire = (specifier) => {
    if (specifier in dependencies) return dependencies[specifier];
    throw new Error(`Unexpected runtime import ${specifier} in ${relativePath}`);
  };

  new Function("module", "exports", "require", javascript)(
    module,
    module.exports,
    localRequire
  );
  return module.exports;
}

function difference(left, right) {
  return [...left].filter((value) => !right.has(value));
}

function duplicateValues(values) {
  const seen = new Set();
  const duplicates = new Set();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
}

function isHttpsUrl(value) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

const registry = loadTypeScriptModule("src/lib/agreement-source-registry.ts");
const factStatus = loadTypeScriptModule(
  "src/lib/agreement-fact-status.ts",
  { "@/lib/agreement-source-registry": registry },
  "export { PUBLIC_SOURCE_MATCHED_FACTS };"
);
const publicAgreementModule = loadTypeScriptModule(
  "src/lib/public-agreements.ts",
  { "@/lib/agreement-fact-status": factStatus },
  "export { PUBLIC_AGREEMENT_BASES };"
);
const verifiedAgreementModule = loadTypeScriptModule(
  "src/lib/verified-agreements.ts"
);
const finderModule = loadTypeScriptModule("src/data/agreement-finder.ts");

const identities = registry.PUBLIC_AGREEMENT_IDENTITIES;
const factSets = factStatus.PUBLIC_SOURCE_MATCHED_FACTS;
const publicBases = publicAgreementModule.PUBLIC_AGREEMENT_BASES;
const verifiedSlugs = verifiedAgreementModule.VERIFIED_AGREEMENTS;
const finderData = finderModule.finderData;
const publicSlugs = publicBases.map((agreement) => agreement.slug);
const publicSlugSet = new Set(publicSlugs);
const identitySlugSet = new Set(Object.keys(identities));
const factSlugSet = new Set(Object.keys(factSets));
const errors = [];
const warnings = [];

for (const slug of duplicateValues(publicSlugs)) {
  errors.push(`${slug}: förekommer flera gånger i den publika avtalslistan`);
}

for (const [label, left, right] of [
  ["publikt men inte verifierat", publicSlugSet, verifiedSlugs],
  ["verifierat men inte publikt", verifiedSlugs, publicSlugSet],
  ["publikt men saknar identitet", publicSlugSet, identitySlugSet],
  ["identitet men inte publikt", identitySlugSet, publicSlugSet],
  ["publikt men saknar faktaunderlag", publicSlugSet, factSlugSet],
  ["faktaunderlag men inte publikt", factSlugSet, publicSlugSet],
]) {
  const slugs = difference(left, right);
  if (slugs.length > 0) errors.push(`${label}: ${slugs.join(", ")}`);
}

for (const slug of publicSlugs) {
  const identity = identities[slug];
  const facts = factSets[slug];
  if (!identity || !facts) continue;

  for (const [field, value] of [
    ["namn", identity.name],
    ["kortnamn", identity.shortName],
    ["giltighetsperiod", identity.validPeriod],
    ["sammanfattning", facts.summary],
  ]) {
    if (typeof value !== "string" || value.trim().length === 0) {
      errors.push(`${slug}: saknar ${field}`);
    }
  }

  if (!identity.parties?.unions?.length || !identity.parties?.employers?.length) {
    errors.push(`${slug}: saknar en eller flera avtalsparter`);
  }
  if (!identity.sources?.length) errors.push(`${slug}: saknar källor`);
  for (const source of identity.sources ?? []) {
    if (!source.label?.trim()) errors.push(`${slug}: en källa saknar etikett`);
    if (!isHttpsUrl(source.url)) errors.push(`${slug}: ogiltig källadress ${source.url}`);
  }
  if (
    duplicateValues((identity.sources ?? []).map((source) => source.url)).length > 0
  ) {
    errors.push(`${slug}: samma källadress förekommer flera gånger`);
  }

  const note = facts.sourceNote;
  if (
    !note?.reviewedAt?.trim() ||
    !note?.sections?.trim() ||
    !note?.label?.trim() ||
    !isHttpsUrl(note?.url)
  ) {
    errors.push(`${slug}: ofullständig granskningsnotering`);
  } else if (!(identity.sources ?? []).some((source) => source.url === note.url)) {
    warnings.push(`${slug}: detaljkällan visas endast i granskningsnoteringen`);
  }

  for (const [key, value] of Object.entries(facts.keyFacts ?? {})) {
    if (typeof value !== "string" || value.trim().length === 0) {
      errors.push(`${slug}: faktan ${key} är tom`);
    }
  }
  if (!facts.faq?.length) errors.push(`${slug}: saknar FAQ`);
  for (const item of facts.faq ?? []) {
    if (!item.question?.trim() || !item.answer?.trim()) {
      errors.push(`${slug}: har en ofullständig FAQ-post`);
    }
  }
}

const finderAgreementSlugs = [];
for (const sector of finderData) {
  if (!sector.branches?.length) errors.push(`${sector.value}: saknar branscher i avtalsguiden`);
  for (const branch of sector.branches ?? []) {
    if (!branch.occupations?.length) {
      errors.push(`${sector.value}/${branch.label}: saknar val i avtalsguiden`);
      continue;
    }
    for (const duplicate of duplicateValues(branch.occupations.map((item) => item.label))) {
      errors.push(`${sector.value}/${branch.label}: dubbelt val ${duplicate}`);
    }
    for (const occupation of branch.occupations) {
      if (occupation.agreementSlug && occupation.followUp) {
        errors.push(`${sector.value}/${branch.label}/${occupation.label}: har både direktresultat och följdfråga`);
      }
      if (occupation.agreementSlug) finderAgreementSlugs.push(occupation.agreementSlug);
      if (occupation.followUp) {
        if (occupation.followUp.options.length < 2) {
          errors.push(`${sector.value}/${branch.label}/${occupation.label}: följdfrågan har för få val`);
        }
        for (const option of occupation.followUp.options) {
          if (option.agreementSlug) finderAgreementSlugs.push(option.agreementSlug);
        }
      }
    }
  }
}

for (const slug of new Set(finderAgreementSlugs)) {
  if (!publicSlugSet.has(slug)) errors.push(`avtalsguiden länkar till ett dolt avtal: ${slug}`);
}

async function checkUrl(url) {
  const attempt = async (method) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);
    try {
      const response = await fetch(url, {
        method,
        redirect: "follow",
        headers: method === "GET" ? { Range: "bytes=0-0" } : undefined,
        signal: controller.signal,
      });
      await response.body?.cancel();
      return response.status;
    } finally {
      clearTimeout(timeout);
    }
  };

  try {
    let status = await attempt("HEAD");
    if (status === 403 || status === 405 || status >= 500) status = await attempt("GET");
    return { url, status };
  } catch (error) {
    return { url, error: error instanceof Error ? error.message : String(error) };
  }
}

async function mapWithConcurrency(values, concurrency, mapper) {
  const results = new Array(values.length);
  let nextIndex = 0;
  async function worker() {
    while (nextIndex < values.length) {
      const index = nextIndex++;
      results[index] = await mapper(values[index]);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  return results;
}

if (checkLinks) {
  const primaryUrls = [...new Set(publicSlugs.map((slug) => factSets[slug]?.sourceNote?.url).filter(Boolean))];
  console.log(`Kontrollerar ${primaryUrls.length} primära detaljkällor ...`);
  const results = await mapWithConcurrency(primaryUrls, 6, checkUrl);
  for (const result of results) {
    if (result.status === 404 || result.status === 410) {
      errors.push(`bruten detaljkälla (${result.status}): ${result.url}`);
    } else if (result.error || !result.status || result.status >= 400) {
      warnings.push(
        `detaljkälla kunde inte verifieras (${result.status ?? result.error}): ${result.url}`
      );
    }
  }
}

const factCounts = publicSlugs.map(
  (slug) => Object.keys(factSets[slug]?.keyFacts ?? {}).length
);
const fullFactCount = factCounts.filter((count) => count === 11).length;
const noFactCount = factCounts.filter((count) => count === 0).length;
const wageTableCount = publicSlugs.filter(
  (slug) => factSets[slug]?.wageTable?.length > 0
).length;

console.log("\nAvtalsgranskning");
console.log(`- ${publicSlugs.length} publika och verifierade avtal`);
console.log(`- ${fullFactCount} avtal med samtliga 11 nyckelfakta`);
console.log(`- ${wageTableCount} avtal med lönetabell`);
console.log(`- ${noFactCount} avtal publicerade som källöversikt utan detaljfakta`);
console.log(`- ${new Set(finderAgreementSlugs).size} avtal nås via avtalsguiden`);

if (warnings.length > 0) {
  console.log(`\nVarningar (${warnings.length})`);
  for (const warning of warnings) console.log(`- ${warning}`);
}

if (errors.length > 0) {
  console.error(`\nFel (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("\nAlla blockerande avtalskontroller passerade.");
}

function normalizeSearchText(value: string): string {
  return value.normalize("NFKC").toLocaleLowerCase("sv").trim();
}

function compactSearchText(value: string): string {
  return normalizeSearchText(value).replace(/[\s\p{P}\p{S}]+/gu, "");
}

export function matchesSearchText(value: string, query: string): boolean {
  return getSearchMatchScore(value, query) > 0;
}

export function getSearchMatchScore(value: string, query: string): number {
  const normalizedValue = normalizeSearchText(value);
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return 1;

  const compactValue = compactSearchText(normalizedValue);
  const compactQuery = compactSearchText(normalizedQuery);

  if (normalizedValue === normalizedQuery || compactValue === compactQuery) return 4;
  if (
    normalizedValue.startsWith(normalizedQuery) ||
    compactValue.startsWith(compactQuery)
  ) {
    return 3;
  }
  if (
    normalizedValue.includes(normalizedQuery) ||
    compactValue.includes(compactQuery)
  ) {
    return 1;
  }

  return 0;
}

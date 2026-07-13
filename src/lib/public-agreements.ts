import { agreements } from "@/data/agreements";
import { vsComparisons } from "@/data/comparisons";
import { isVerifiedAgreement } from "@/lib/verified-agreements";
import {
  AGREEMENTS_WITH_SOURCE_MATCHED_WAGE_TABLES,
  createPublicAgreementView,
} from "@/lib/agreement-fact-status";

export const publicAgreements = agreements
  .filter((agreement) => isVerifiedAgreement(agreement.slug))
  .map(createPublicAgreementView);

export const publicWageAgreements = publicAgreements.filter((agreement) =>
  AGREEMENTS_WITH_SOURCE_MATCHED_WAGE_TABLES.has(agreement.slug)
);

// Re-enable individual comparisons only after every compared fact is source-matched.
export const publicComparisons = vsComparisons.filter(() => false);

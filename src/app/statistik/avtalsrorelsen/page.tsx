import Link from "next/link";
import { publicAgreements } from "@/lib/public-agreements";

export default function Avtalsrorelsen() {
  return (
    <>
      <section className="bg-primary text-white py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h1
            className="text-4xl sm:text-5xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Avtalsperioder
          </h1>
          <p className="mt-3 text-white/80">
            Perioderna nedan är kontrollerade mot organisationernas
            originalkällor.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="space-y-3">
            {publicAgreements.map((agreement) => (
              <Link
                key={agreement.slug}
                href={`/avtal/${agreement.slug}`}
                className="block border border-border bg-white p-4 transition-colors hover:border-primary"
              >
                <p className="font-semibold text-primary">
                  {agreement.shortName}
                </p>
                <p className="mt-1 text-sm text-text-secondary">
                  {agreement.validPeriod}
                </p>
              </Link>
            ))}
          </div>
          <p className="mt-5 text-xs text-text-secondary">
            Sidan gör inga prognoser om framtida förhandlingar eller
            löneökningar.
          </p>
        </div>
      </section>
    </>
  );
}

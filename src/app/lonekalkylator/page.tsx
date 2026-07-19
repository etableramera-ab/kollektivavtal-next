import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Lonekalkylator() {
  return (
    <>
      <section className="bg-primary-dark text-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1
            className="text-4xl sm:text-5xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Lönekalkylatorn byggs om
          </h1>
          <p className="mt-4 leading-relaxed text-white/80">
            Den tidigare kalkylatorn gjorde egna antaganden om erfarenhet, OB
            och pension. Vi öppnar den igen när varje beräkning kan göras med
            kontrollerade uppgifter.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Link
            href="/yrke"
            className="inline-flex min-h-[44px] items-center gap-1 rounded-[8px] bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent/90"
          >
            Se officiell lönestatistik från SCB <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}

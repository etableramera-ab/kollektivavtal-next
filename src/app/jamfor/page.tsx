import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export default function JamforOverview() {
  return (
    <>
      <section className="bg-primary-dark text-white pt-10 pb-10 sm:pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-2xl sm:text-4xl font-extrabold">Jämförelser av kollektivavtal</h1>
            <p className="mt-3 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              Jämförelserna byggs om med samma källkrav som avtalssidorna
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="border-l-[3px] border-l-accent bg-[#EFE7DA] p-6">
            <h2 className="text-xl text-text-primary">Jämförelserna källgranskas</h2>
            <p className="mt-2 text-text-secondary">
              Vi öppnar en jämförelse först när samma uppgift har kontrollerats i båda avtalen.
            </p>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8 pb-16 sm:pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-r-lg border-l-[3px] border-l-primary bg-[#F0FDFA] p-4 sm:p-5">
            <p className="text-sm text-text-primary leading-relaxed">
              Svenska kollektivavtal använder olika tider, formler och villkor. Därför öppnar vi
              inte jämförelseverktyget förrän uppgifterna går att jämföra rättvist och tydligt.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/avtal"
              className="inline-flex min-h-[44px] items-center justify-center gap-1 rounded-[8px] bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent/90"
            >
              Läs källgranskade avtal <ArrowRight size={14} />
            </Link>
            <Link
              href="/kallor-och-metod"
              className="inline-flex min-h-[44px] items-center justify-center gap-1 rounded-[8px] border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-[#F0FDFA]"
            >
              Så granskar vi källor <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

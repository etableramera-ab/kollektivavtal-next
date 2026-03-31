"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import ComparisonTable from "@/components/ComparisonTable";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  align?: "left" | "right";
}

interface Row {
  slug: string;
  name: string;
  [key: string]: string | number;
}

interface Props {
  title: string;
  subtitle: string;
  aeoAnswer: string;
  columns: Column[];
  rows: Row[];
  ctaText?: string;
  ctaHref?: string;
  disclaimer?: string;
}

export default function TopicComparisonPage({ title, subtitle, aeoAnswer, columns, rows, ctaText, ctaHref, disclaimer }: Props) {
  return (
    <>
      <section className="bg-primary text-white py-10 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-2xl sm:text-4xl font-extrabold">{title}</h1>
            <p className="mt-3 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">{subtitle}</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[12px] bg-blue-50 border border-blue-200 p-4 sm:p-5">
            <p className="text-sm text-blue-900 leading-relaxed">{aeoAnswer}</p>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <ComparisonTable columns={columns} rows={rows} />
          </AnimatedSection>

          {ctaText && ctaHref && (
            <AnimatedSection delay={0.1}>
              <Link href={ctaHref} className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-4 hover:underline min-h-[44px]">
                {ctaText} <ArrowRight size={14} />
              </Link>
            </AnimatedSection>
          )}

          <div className="mt-8 rounded-[12px] bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 leading-relaxed">
            {disclaimer || "Uppgifterna är ungefärliga och baserade på kollektivavtalen. Kontakta ditt fackförbund för exakta villkor."}
          </div>
        </div>
      </section>
    </>
  );
}

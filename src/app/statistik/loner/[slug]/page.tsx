import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { fallbackWageData } from "@/lib/scb-wages";
import { publicAgreements } from "@/lib/public-agreements";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const branchAgreements: Record<string, string[]> = {
  "it-telekom": ["it-avtalet", "almega-tjansteforetagen", "teknikavtalet"],
  "bank-finans": ["bankavtalet", "forsakringsavtalet"],
  "juridik-teknik": ["almega-tjansteforetagen", "teknikavtalet-ifmetall"],
  "industri": ["teknikavtalet", "teknikavtalet-ifmetall", "stal-och-metall", "kemiskt-avtal-ifmetall", "svemek-avtalet"],
  "bygg-anlaggning": ["byggavtalet", "installationsavtalet", "plat-ventilationsavtalet", "vvs-montorsavtalet", "maleriavtalet"],
  "transport": ["transportavtalet", "vaganlaggningsavtalet"],
  "offentlig-forvaltning": ["villkorsavtal-saco", "villkorsavtal-ofr", "villkorsavtal-seko"],
  "utbildning": ["laraavtalet", "ab-kommunalt", "hok-kommunal"],
  "vard-omsorg": ["hok-kommunal", "ab-kommunalt", "sjukskoterska-avtal", "lakare-kommun"],
  "handel": ["handelsavtalet"],
  "hotell-restaurang": ["hotell-restaurang"],
};

export function generateStaticParams() {
  return fallbackWageData.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const branch = fallbackWageData.find((d) => d.slug === slug);
  if (!branch) return {};
  return {
    title: `Lönestatistik ${branch.label} — SCB 2023 | kollektivavtal.ai`,
    description: `Medianlön för ${branch.label} i Sverige enligt SCB:s lönestrukturstatistik 2023.`,
    alternates: { canonical: `https://kollektivavtal.ai/statistik/loner/${slug}` },
  };
}

export default async function BranchPage({ params }: PageProps) {
  const { slug } = await params;
  const branch = fallbackWageData.find((d) => d.slug === slug);
  if (!branch) notFound();

  const relatedAgreementSlugs = branchAgreements[slug] || [];
  const relatedAgreements = relatedAgreementSlugs
    .map((s) => publicAgreements.find((a) => a.slug === s))
    .filter(Boolean);

  return (
    <>
      <section style={{ background: "linear-gradient(135deg, #0F766E 0%, #0A5F59 40%, #0D6B64 100%)" }} className="text-white pt-10 pb-10 sm:pb-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-[13px] text-white/60 mb-5">
            <Link href="/statistik/loner" className="hover:text-white transition-colors">Lönestatistik</Link>
            <span className="text-white/40">/</span>
            <span className="text-white/90">{branch.label}</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl md:text-[56px]" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>
            {branch.label}
          </h1>
          <p className="mt-2 text-white/80">Lönestatistik och kollektivavtal</p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Salary cards */}
          <div className="max-w-sm mb-10">
            {[
              { label: "Medianlön", value: branch.medianWage, highlight: true },
            ].map((s) => (
              <div key={s.label} className={`rounded-xl border ${s.highlight ? "border-accent border-2" : "border-border"} bg-white p-5 text-center`}>
                <p className="text-xs text-text-secondary">{s.label}</p>
                <p className={`text-2xl sm:text-3xl mt-1 ${s.highlight ? "text-accent" : "text-text-primary"}`} style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>
                  {s.value.toLocaleString("sv-SE")} kr
                </p>
                <p className="text-xs text-text-secondary mt-1">per månad</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <p className="text-sm text-text-secondary">Källa: SCB lönestrukturstatistik 2023</p>
          </div>

          <p className="text-text-primary leading-relaxed mb-10">
            Inom {branch.label.toLowerCase()} är medianlönen {branch.medianWage.toLocaleString("sv-SE")} kr per månad.
            {relatedAgreements.length > 0 && ` Inom branschen gäller ${relatedAgreements.length} kollektivavtal som täcker ${relatedAgreements.reduce((s, a) => s + a!.employeeCount, 0).toLocaleString("sv-SE")} anställda.`}
          </p>

          {/* Related agreements */}
          {relatedAgreements.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl sm:text-[32px] text-text-primary mb-4" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>
                Kollektivavtal inom {branch.label.toLowerCase()}
              </h2>
              <div className="space-y-2">
                {relatedAgreements.map((a) => (
                  <Link key={a!.slug} href={`/avtal/${a!.slug}`} className="block rounded-xl border border-border bg-white p-4 hover:border-primary hover:shadow-sm transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-text-primary">{a!.shortName}</p>
                        <p className="text-sm text-text-secondary mt-0.5">{a!.employeeCount.toLocaleString("sv-SE")} anställda</p>
                      </div>
                      <ArrowRight size={16} className="text-text-secondary" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 leading-relaxed">
            Lönerna baseras på SCB:s lönestrukturstatistik 2023. Individuell lön beror på erfarenhet, arbetsgivare, ort och lokala förhandlingar.
          </div>
        </div>
      </section>
    </>
  );
}

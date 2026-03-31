import type { Metadata } from "next";
import { Mail, Building, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Om kollektivavtal.ai — Vem står bakom?",
  description:
    "kollektivavtal.ai drivs av Etablera Mera AB och är en oberoende informationsplattform som förklarar Sveriges kollektivavtal på klarspråk.",
};

export default function OmOss() {
  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary mb-6">
          Om kollektivavtal.ai
        </h1>

        <div className="prose max-w-none space-y-4 text-text-primary leading-relaxed">
          <p>
            kollektivavtal.ai drivs av Etablera Mera AB och är en oberoende informationsplattform.
            Vi sammanfattar och förklarar Sveriges kollektivavtal på klarspråk, med hjälp av
            AI-teknik.
          </p>
          <p>
            Vi är inte ett fackförbund och ger inte juridisk rådgivning. Informationen på webbplatsen
            är vägledande och ersätter inte det officiella kollektivavtalet. Kontakta alltid ditt
            fackförbund för bindande besked.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[12px] border border-border bg-white p-5 shadow-sm">
            <Mail size={20} className="text-accent mb-2" />
            <p className="text-sm font-medium text-text-primary">Kontakt</p>
            <a
              href="mailto:info@kollektivavtal.ai"
              className="text-sm text-accent hover:underline"
            >
              info@kollektivavtal.ai
            </a>
          </div>

          <div className="rounded-[12px] border border-border bg-white p-5 shadow-sm">
            <Building size={20} className="text-accent mb-2" />
            <p className="text-sm font-medium text-text-primary">Företag</p>
            <p className="text-sm text-text-secondary">Etablera Mera AB</p>
          </div>

          <div className="rounded-[12px] border border-border bg-white p-5 shadow-sm">
            <FileText size={20} className="text-accent mb-2" />
            <p className="text-sm font-medium text-text-primary">Org.nr</p>
            <p className="text-sm text-text-secondary">559444-2526</p>
          </div>
        </div>
      </div>
    </section>
  );
}

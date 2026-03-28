import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-white/70">
              Om oss
            </h3>
            <ul className="space-y-1 text-sm text-white/80">
              <li>
                <Link href="/om-oss" className="hover:text-white transition-colors inline-block py-2">
                  Om kollektivavtal.ai
                </Link>
              </li>
              <li>
                <Link href="/om-oss" className="hover:text-white transition-colors inline-block py-2">
                  Kontakt
                </Link>
              </li>
              <li>
                <span className="inline-block py-2">Drivs av Etablera Mera AB</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-white/70">
              Populära avtal
            </h3>
            <ul className="space-y-1 text-sm text-white/80">
              <li>
                <Link href="/avtal/handelsavtalet" className="hover:text-white transition-colors inline-block py-2">
                  Handelsavtalet
                </Link>
              </li>
              <li>
                <Link href="/avtal/teknikavtalet" className="hover:text-white transition-colors inline-block py-2">
                  Teknikavtalet
                </Link>
              </li>
              <li>
                <Link href="/avtal/byggavtalet" className="hover:text-white transition-colors inline-block py-2">
                  Byggavtalet
                </Link>
              </li>
              <li>
                <Link href="/avtal/hok-kommunal" className="hover:text-white transition-colors inline-block py-2">
                  HÖK Kommunal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-white/70">
              Verktyg
            </h3>
            <ul className="space-y-1 text-sm text-white/80">
              <li>
                <Link href="/hitta-avtal" className="hover:text-white transition-colors inline-block py-2">
                  Hitta ditt avtal
                </Link>
              </li>
              <li>
                <Link href="/lonekalkylator" className="hover:text-white transition-colors inline-block py-2">
                  Lönekalkylator
                </Link>
              </li>
              <li>
                <Link href="/statistik" className="hover:text-white transition-colors inline-block py-2">
                  Lönestatistik
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-white/70">
              Juridiskt
            </h3>
            <ul className="space-y-1 text-sm text-white/80">
              <li>
                <Link href="/integritetspolicy" className="hover:text-white transition-colors inline-block py-2">
                  Integritetspolicy
                </Link>
              </li>
              <li>
                <Link href="/cookiepolicy" className="hover:text-white transition-colors inline-block py-2">
                  Cookiepolicy
                </Link>
              </li>
              <li>
                <Link href="/om-oss" className="hover:text-white transition-colors inline-block py-2">
                  Om oss
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/20">
          <p className="text-xs text-white/60 max-w-3xl">
            Källa: Sammanfattningar baserade på officiella kollektivavtal. Informationen är
            vägledande — kontakta ditt fackförbund för bindande besked.
          </p>
          <p className="text-xs text-white/40 mt-2 pb-safe">
            &copy; {new Date().getFullYear()} Etablera Mera AB. Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </footer>
  );
}

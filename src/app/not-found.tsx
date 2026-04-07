import Link from "next/link";

export default function NotFound() {
  return (
    <section
      style={{ background: "linear-gradient(135deg, #0F766E 0%, #0A5F59 40%, #0D6B64 100%)" }}
      className="text-white py-20 sm:py-32"
    >
      <div className="mx-auto max-w-2xl px-4 text-center">
        <p className="text-[120px] sm:text-[160px] font-normal leading-none text-white/20" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>
          404
        </p>
        <h1 className="text-3xl sm:text-4xl mt-4" style={{ fontFamily: "var(--font-dm-serif, var(--font-serif))" }}>
          Sidan hittades inte
        </h1>
        <p className="mt-4 text-white/70 max-w-md mx-auto">
          Sidan du letar efter finns inte eller har flyttats. Prova att söka efter ditt avtal istället.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-lg text-sm font-semibold uppercase tracking-widest text-white transition-all duration-200 hover:-translate-y-px"
            style={{ background: "linear-gradient(135deg, #D97706 0%, #B45309 100%)" }}
          >
            Till startsidan
          </Link>
          <Link
            href="/avtal"
            className="px-6 py-3 rounded-lg border border-white/30 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            Se alla avtal
          </Link>
        </div>
      </div>
    </section>
  );
}

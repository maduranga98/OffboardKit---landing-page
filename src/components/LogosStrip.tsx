export function LogosStrip() {
  const logos = ["Acme Corp", "Lattice", "Clearbit", "Notion Labs", "OpenSea", "Loom"];
  return (
    <section className="border-y border-warm-white/[0.06] bg-slate/20 py-10">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 text-center">
        <div className="text-mist text-[11px] uppercase tracking-[0.22em] mb-6">
          Trusted by HR teams at
        </div>
        <div className="logo-fade-mask flex flex-wrap justify-center items-center gap-x-12 gap-y-4 opacity-40">
          {logos.map((l) => (
            <span key={l} className="font-display text-[22px] text-warm-white">
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

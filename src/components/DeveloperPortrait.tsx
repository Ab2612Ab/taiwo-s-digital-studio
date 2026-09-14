import { PORTFOLIO_RESOURCES } from "@/lib/portfolio-resources";

export function DeveloperPortrait() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border p-1" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}>
      <div className="relative min-h-[22rem] overflow-hidden rounded-[1.85rem] bg-[#0d1117] sm:min-h-[26rem]">
        {/* Subtle developer workstation backdrop — intentionally kept behind the portrait. */}
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.08),transparent_38%)]" />
          <div className="absolute inset-x-5 top-5 h-[12.5rem] rounded-xl border border-white/10 bg-[#151b23] shadow-2xl sm:inset-x-7 sm:top-7 sm:h-[15rem]">
            <div className="flex h-7 items-center gap-1.5 border-b border-white/10 bg-black/20 px-3">
              <span className="size-2 rounded-full bg-white/25" />
              <span className="size-2 rounded-full bg-white/20" />
              <span className="size-2 rounded-full bg-white/15" />
              <span className="ml-2 font-mono text-[8px] text-white/35">taiwo-emmanuel / portfolio</span>
            </div>
            <div className="grid h-[calc(100%-1.75rem)] grid-cols-[2.4rem_1fr]">
              <div className="border-r border-white/10 bg-black/10 py-3 text-center font-mono text-[8px] leading-4 text-white/20">1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8</div>
              <pre className="overflow-hidden px-3 py-3 font-mono text-[8px] leading-4 text-white/45 sm:text-[9px]">{`const portfolio = {\n  name: "Taiwo Emmanuel",\n  role: "Web Designer & Developer",\n  stack: ["React", "TypeScript", "CSS"],\n  responsive: true,\n};\n\nexport default portfolio;`}</pre>
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 h-12 w-[72%] -translate-x-1/2 rounded-t-[1.25rem] border-x border-t border-white/10 bg-[#151b23] shadow-2xl sm:h-14" />
          <div className="absolute bottom-2 left-1/2 h-2 w-[58%] -translate-x-1/2 rounded-full bg-white/10 blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/35" />
        </div>

        <div className="relative z-10 flex h-full min-h-[22rem] items-end justify-center px-4 pt-10 sm:min-h-[26rem]">
          <img src={PORTFOLIO_RESOURCES.heroProfile} alt="Portrait of Taiwo Emmanuel, web designer and developer" width={520} height={520} className="max-h-[25rem] w-auto max-w-full object-contain drop-shadow-2xl" />
        </div>
      </div>
    </div>
  );
}

import { PORTFOLIO_RESOURCES } from "@/lib/portfolio-resources";

export function DeveloperPortrait() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border p-1" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}>
      <div className="relative min-h-[22rem] overflow-hidden rounded-[1.85rem] bg-[#10131a] sm:min-h-[26rem]">
        <div aria-hidden="true" className="absolute inset-0 opacity-80">
          <div className="absolute inset-x-0 top-0 h-9 border-b border-white/10 bg-black/30" />
          <div className="absolute left-0 top-9 bottom-0 w-10 border-r border-white/10 bg-black/20" />
          <pre className="absolute inset-0 overflow-hidden px-14 pt-14 font-mono text-[10px] leading-5 text-white/45 sm:text-xs sm:leading-6">{`01  const developer = {\n02    name: "Taiwo Emmanuel",\n03    role: "Web Designer & Developer",\n04    focus: "responsive digital experiences",\n05  };\n\n06  function buildExperience() {\n07    design();\n08    develop();\n09    test();\n10    launch();\n11  }\n\n12  buildExperience();`}</pre>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-black/45" />
        </div>
        <div className="relative z-10 flex h-full min-h-[22rem] items-end justify-center px-4 pt-10 sm:min-h-[26rem]">
          <img src={PORTFOLIO_RESOURCES.heroProfile} alt="Portrait of Taiwo Emmanuel, web designer and developer" width={520} height={520} className="max-h-[25rem] w-auto max-w-full object-contain drop-shadow-2xl" />
        </div>
      </div>
    </div>
  );
}

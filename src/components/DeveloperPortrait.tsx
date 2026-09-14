import { PORTFOLIO_RESOURCES } from "@/lib/portfolio-resources";

export function DeveloperPortrait() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border p-1" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}>
      <div className="relative min-h-[22rem] overflow-hidden rounded-[1.85rem] bg-[#17120e] sm:min-h-[26rem]">
        <img
          src={PORTFOLIO_RESOURCES.heroWorkspaceBackground}
          alt="Warm cinematic creative studio environment"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
          width={640}
          height={720}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/55" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20" />

        <div className="relative z-10 flex h-full min-h-[22rem] items-end justify-center px-4 pt-10 sm:min-h-[26rem]">
          <img
            src={PORTFOLIO_RESOURCES.heroProfile}
            alt="Portrait of Taiwo Emmanuel, web designer and developer"
            width={520}
            height={520}
            className="max-h-[25rem] w-auto max-w-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}

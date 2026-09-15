import { PORTFOLIO_RESOURCES } from "@/lib/portfolio-resources";

export function DeveloperPortrait({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-border p-1 ${className}`} style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}>
      <div className="relative h-full overflow-hidden rounded-[1.85rem] bg-background">
        <img
          src={PORTFOLIO_RESOURCES.heroWorkspaceBackground}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          width={1200}
          height={1400}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-background/20 via-transparent to-background/55" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-black/30" />

        <div className="relative z-10 flex h-full items-end justify-center pt-8">
          <img
            src={PORTFOLIO_RESOURCES.heroProfile}
            alt="Portrait of Taiwo Emmanuel, web designer and developer"
            width={520}
            height={520}
            className="h-auto w-[112%] max-w-none object-contain object-bottom drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { PORTFOLIO_RESOURCES } from "@/lib/portfolio-resources";
import { PROJECT_MAP } from "@/lib/projects-data";

type VisualKind = "hero" | "about" | "design" | "development" | "business" | "ux" | "project" | "process";

const visualPhotos: Record<Exclude<VisualKind, "project">, { src: string; alt: string }> = {
  hero: { src: PORTFOLIO_RESOURCES.heroWorkspaceImage, alt: "Modern professional creative workspace" },
  about: { src: PORTFOLIO_RESOURCES.aboutImage, alt: "Portrait of Taiwo Emmanuel, web designer and developer" },
  design: { src: PORTFOLIO_RESOURCES.serviceImages["design"] ?? "", alt: "Professional designer working on a website design project" },
  development: { src: PORTFOLIO_RESOURCES.serviceImages["development"] ?? "", alt: "Developer working on code at a professional workstation" },
  business: { src: PORTFOLIO_RESOURCES.serviceImages["business"] ?? "", alt: "Modern professional business office environment" },
  ux: { src: PORTFOLIO_RESOURCES.serviceImages["ux"] ?? "", alt: "Professional UX and interface design workspace" },
  process: { src: PORTFOLIO_RESOURCES.processImage, alt: "Professional creative team collaborating around a table" },
};

export function Portfolio3DVisual({ kind, className = "", project }: { kind: VisualKind; className?: string; project?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [detectedProject, setDetectedProject] = useState<string | undefined>(project);

  useEffect(() => {
    if (kind !== "project" || project) return;
    const article = rootRef.current?.closest("article");
    const projectName = article?.querySelector("h2, h3")?.textContent?.trim() ?? "";
    const names: Record<string, string> = Object.fromEntries(Object.values(PROJECT_MAP).map(p => [p.name, p.slug]));
    const detected = names[projectName];
    if (detected) setDetectedProject(detected);
  }, [kind, project]);

  const entry = kind === "project" && detectedProject ? PROJECT_MAP[detectedProject] : undefined;
  const photo = kind === "project"
    ? entry ? { src: entry.image, alt: entry.imageAlt } : undefined
    : visualPhotos[kind];

  return (
    <div ref={rootRef} className={`relative overflow-hidden rounded-[2rem] border border-border bg-card ${className}`} data-project-visual={detectedProject ?? "unassigned"}>
      {photo ? (
        <img
          src={photo.src}
          alt={photo.alt}
          width={1400}
          height={900}
          loading={kind === "hero" ? "eager" : "lazy"}
          decoding="async"
          className="block h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
        />
      ) : kind === "project" ? (
        <div aria-hidden="true" className="h-full min-h-40 w-full bg-card" />
      ) : null}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { PORTFOLIO_RESOURCES } from "@/lib/portfolio-resources";

type VisualKind = "hero" | "about" | "design" | "development" | "business" | "ux" | "project" | "process";
type ProjectVariant = "meridian-consulting" | "lumen-studio" | "northside-fitness" | "crate-and-co" | "atlas-dashboard" | "verde-interiors";

const projectPhotos: Record<ProjectVariant, { src: string; alt: string }> = {
  "meridian-consulting": { src: PORTFOLIO_RESOURCES.projectImages["meridian-consulting"], alt: "Professional consulting team collaborating in a modern business office" },
  "lumen-studio": { src: PORTFOLIO_RESOURCES.projectImages["lumen-studio"], alt: "Modern creative studio and branding workspace" },
  "northside-fitness": { src: PORTFOLIO_RESOURCES.projectImages["northside-fitness"], alt: "Modern professional fitness gym with high-quality equipment" },
  "crate-and-co": { src: PORTFOLIO_RESOURCES.projectImages["crate-and-co"], alt: "Premium product photographed for an e-commerce storefront" },
  "atlas-dashboard": { src: PORTFOLIO_RESOURCES.projectImages["atlas-dashboard"], alt: "Business analytics and data visualization environment" },
  "verde-interiors": { src: PORTFOLIO_RESOURCES.projectImages["verde-interiors"], alt: "Premium contemporary interior architecture and interior design" },
};

const visualPhotos: Record<Exclude<VisualKind, "project">, { src: string; alt: string }> = {
  hero: { src: PORTFOLIO_RESOURCES.heroWorkspaceImage, alt: "Modern professional creative workspace" },
  about: { src: PORTFOLIO_RESOURCES.aboutImage, alt: "Portrait of Taiwo Emmanuel, web designer and developer" },
  design: { src: PORTFOLIO_RESOURCES.serviceImages.design, alt: "Professional designer working on a website design project" },
  development: { src: PORTFOLIO_RESOURCES.serviceImages.development, alt: "Developer working on code at a professional workstation" },
  business: { src: PORTFOLIO_RESOURCES.serviceImages.business, alt: "Modern professional business office environment" },
  ux: { src: PORTFOLIO_RESOURCES.serviceImages.ux, alt: "Professional UX and interface design workspace" },
  process: { src: PORTFOLIO_RESOURCES.processImage, alt: "Professional creative team collaborating around a table" },
};

export function Portfolio3DVisual({ kind, className = "", project }: { kind: VisualKind; className?: string; project?: ProjectVariant }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [detectedProject, setDetectedProject] = useState<ProjectVariant | undefined>(project);

  useEffect(() => {
    if (kind !== "project" || project) return;
    const article = rootRef.current?.closest("article");
    const projectName = article?.querySelector("h2")?.textContent?.trim() ?? "";
    const names: Record<string, ProjectVariant> = {
      "Meridian Consulting": "meridian-consulting",
      "Lumen Studio": "lumen-studio",
      "Northside Fitness": "northside-fitness",
      "Crate & Co.": "crate-and-co",
      "Atlas Dashboard": "atlas-dashboard",
      "Verde Interiors": "verde-interiors",
    };
    const detected = names[projectName];
    if (detected) setDetectedProject(detected);
  }, [kind, project]);

  const photo = kind === "project"
    ? detectedProject ? projectPhotos[detectedProject] : undefined
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

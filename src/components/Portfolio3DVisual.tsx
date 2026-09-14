import { PORTFOLIO_RESOURCES } from "@/lib/portfolio-resources";

type VisualKind = "hero" | "about" | "design" | "development" | "business" | "ux" | "project" | "process";
type ProjectVariant = "meridian" | "lumen" | "northside" | "crate" | "atlas" | "verde";

const projectPhotos: Record<ProjectVariant, { src: string; alt: string }> = {
  meridian: { src: PORTFOLIO_RESOURCES.projectImages["meridian-consulting"], alt: "Professional business consulting team working together in a modern office" },
  lumen: { src: PORTFOLIO_RESOURCES.projectImages["lumen-studio"], alt: "Bright modern creative studio workspace with professional desks and natural light" },
  northside: { src: PORTFOLIO_RESOURCES.projectImages["northside-fitness"], alt: "Professional modern gym with fitness equipment" },
  crate: { src: PORTFOLIO_RESOURCES.projectImages["crate-and-co"], alt: "Professional product photography of a premium e-commerce product" },
  atlas: { src: PORTFOLIO_RESOURCES.projectImages["atlas-dashboard"], alt: "Professional analytics and technology workspace" },
  verde: { src: PORTFOLIO_RESOURCES.projectImages["verde-interiors"], alt: "High-end contemporary interior design with refined furniture and architecture" },
};

const visualPhotos: Record<VisualKind, { src: string; alt: string }> = {
  hero: { src: PORTFOLIO_RESOURCES.heroWorkspaceImage, alt: "Modern professional creative workspace" },
  about: { src: PORTFOLIO_RESOURCES.aboutImage, alt: "Portrait of Taiwo Emmanuel, web designer and developer" },
  design: { src: PORTFOLIO_RESOURCES.serviceImages.design, alt: "Professional designer working on a website design project" },
  development: { src: PORTFOLIO_RESOURCES.serviceImages.development, alt: "Developer working on code at a professional workstation" },
  business: { src: PORTFOLIO_RESOURCES.serviceImages.business, alt: "Modern professional business office environment" },
  ux: { src: PORTFOLIO_RESOURCES.serviceImages.ux, alt: "Professional UX and interface design workspace" },
  project: { src: PORTFOLIO_RESOURCES.projectImages["atlas-dashboard"], alt: "Professional technology and analytics workspace" },
  process: { src: PORTFOLIO_RESOURCES.processImage, alt: "Professional creative team collaborating around a table" },
};

export function Portfolio3DVisual({ kind, className = "", project }: { kind: VisualKind; className?: string; project?: ProjectVariant }) {
  const photo = kind === "project" && project ? projectPhotos[project] : visualPhotos[kind];

  return (
    <div className={`relative overflow-hidden rounded-[2rem] border border-border bg-card ${className}`}>
      <img
        src={photo.src}
        alt={photo.alt}
        width={1400}
        height={900}
        loading={kind === "hero" ? "eager" : "lazy"}
        decoding="async"
        className="block h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
    </div>
  );
}

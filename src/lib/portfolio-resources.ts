import portrait from "@/assets/taiwo-portrait.png";
import cinematicProfileEnvironment from "@/assets/cinematic-profile-environment.svg";
import meridianConsulting from "@/assets/projects/meridian-consulting.svg";
import lumenStudio from "@/assets/projects/lumen-studio.svg";
import northsideFitness from "@/assets/projects/northside-fitness.svg";
import crateAndCo from "@/assets/projects/crate-and-co.svg";
import atlasDashboard from "@/assets/projects/atlas-dashboard.svg";
import verdeInteriors from "@/assets/projects/verde-interiors.svg";

/** Central resource map for approved portfolio visual assets. */
export const PORTFOLIO_RESOURCES = {
  heroProfile: portrait,
  aboutImage: portrait,
  heroWorkspaceBackground: cinematicProfileEnvironment,
  projectImages: {
    "meridian-consulting": meridianConsulting,
    "lumen-studio": lumenStudio,
    "northside-fitness": northsideFitness,
    "crate-and-co": crateAndCo,
    "atlas-dashboard": atlasDashboard,
    "verde-interiors": verdeInteriors,
  } as Record<string, string>,
  serviceImages: {} as Record<string, string>,
  processImage: cinematicProfileEnvironment,
  heroWorkspaceImage: cinematicProfileEnvironment,
} as const;

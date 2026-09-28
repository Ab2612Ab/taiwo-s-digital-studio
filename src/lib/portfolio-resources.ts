import portrait from "@/assets/taiwo-portrait.png";
import cinematicProfileEnvironment from "@/assets/cinematic-profile-environment.svg";
import { PROJECT_MAP } from "@/lib/projects-data";

/** Central resource map for approved portfolio visual assets. */
export const PORTFOLIO_RESOURCES = {
  heroProfile: portrait,
  aboutImage: portrait,
  heroWorkspaceBackground: cinematicProfileEnvironment,
  projectImages: Object.fromEntries(Object.entries(PROJECT_MAP).map(([slug, project]) => [slug, project.image])) as Record<string, string>,
  serviceImages: {
    design: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85",
    development: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=85",
    business: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",
    ux: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=85",
  } as Record<string, string>,
  processImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85",
  heroWorkspaceImage: cinematicProfileEnvironment,
} as const;

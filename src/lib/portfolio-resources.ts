import portrait from "@/assets/taiwo-portrait.png";

/**
 * Central resource map. Replace these imports/values when new approved assets
 * are added; the UI does not need to be rebuilt around hard-coded URLs.
 */
export const PORTFOLIO_RESOURCES = {
  heroProfile: portrait,
  aboutImage: portrait,
  projectImages: {
    "meridian-consulting": null,
    "lumen-studio": null,
    "northside-fitness": null,
    "crate-and-co": null,
    "atlas-dashboard": null,
    "verde-interiors": null,
  } as Record<string, string | null>,
} as const;

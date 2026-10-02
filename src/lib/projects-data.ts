/** Shared project data for the portfolio — live deployments first, concept work after. */
import premiumStoreImage from "@/assets/projects/premium-store.webp";
import novaframeImage from "@/assets/projects/novaframe.webp";
import voltixImage from "@/assets/projects/voltix-electronics-store.svg";
import dubaiVisionImage from "@/assets/projects/dubai-vision.webp";
import luneaImage from "@/assets/projects/lunea-skin.webp";
import webdevSiteImage from "@/assets/projects/webdev-site.svg";
import meridianConsulting from "@/assets/projects/meridian-consulting.webp";
import crateAndCo from "@/assets/projects/crate-and-co.webp";
import lumenStudio from "@/assets/projects/lumen-studio.webp";
import northsideFitness from "@/assets/projects/northside-fitness.webp";
import atlasDashboard from "@/assets/projects/atlas-dashboard.webp";
import verdeInteriors from "@/assets/projects/verde-interiors.webp";

export type ProjectEntry = {
  slug: string;
  name: string;
  tag: string;
  body: string;
  detail: string[];
  /** Set when the project is a live deployment — the card links out to it. */
  liveUrl?: string;
  /** Optional external case study URL; falls back to the internal page. */
  caseStudyUrl?: string;
  image: string;
  imageAlt: string;
};

export const LIVE_PROJECTS: ProjectEntry[] = [
  {
    slug: "novaframe-studios",
    name: "NovaFrame Studios",
    tag: "Animation Studio Website",
    body: "Marketing site for an independent animation and motion design studio — cinematic hero, service breakdowns, process walkthrough and a project enquiry flow.",
    detail: ["Dark theme", "Motion-first", "Enquiry flow"],
    liveUrl: "https://novaframe-studios.vercel.app/",
    image: novaframeImage,
    imageAlt: "NovaFrame Studios website hero with a cinematic dark theme and bold typography",
  },
  {
    slug: "dubai-vision",
    name: "TheRealtorDubai V2",
    tag: "Real Estate Concept",
    body: "A Version 2 experience concept for a Dubai real estate brand: property search across buy, rent, sell and invest, area guides and consultation booking.",
    detail: ["Property search", "Area guides", "Consultation"],
    liveUrl: "https://dubai-vision-2-j8u8.vercel.app/",
    image: dubaiVisionImage,
    imageAlt: "TheRealtorDubai V2 concept site with a Dubai skyline hero and property search form",
  },
  {
    slug: "lunea-skin",
    name: "Lunéa Skin",
    tag: "Skincare E-commerce",
    body: "Elevated skincare storefront with shop, ritual guidance, brand story and journal sections — a soft editorial aesthetic built around the products.",
    detail: ["E-commerce", "Editorial design", "Brand storytelling"],
    liveUrl: "https://lunea-skin-website.vercel.app/",
    image: luneaImage,
    imageAlt: "Lunéa Skin storefront hero with soft editorial styling and product photography",
  },
  {
    slug: "premium-woocommerce-store",
    name: "Premium WooCommerce Store",
    tag: "WooCommerce Storefront",
    body: "WooCommerce storefront with product categories, live search, cart and wishlist flows across fashion, electronics, beauty and home.",
    detail: ["WooCommerce", "Categories", "Cart & wishlist"],
    liveUrl: "https://premium-woocommerce-store-preview-w5mbh3.v2.appdeploy.ai/",
    image: premiumStoreImage,
    imageAlt: "Premium WooCommerce store storefront with product grid, categories and search",
  },
  {
    slug: "voltix-electronics-store",
    name: "Voltix Electronics Storefront",
    tag: "E-commerce",
    body: "A modern electronics e-commerce experience designed for product discovery, responsive shopping, and a smooth path from browsing to checkout.",
    detail: ["E-commerce", "Product catalogue", "Shopping experience", "Responsive UI"],
    liveUrl: "https://voltix-electronics-store-emmy-5644.vercel.app/",
    caseStudyUrl: "https://taiwo-s-digital-studio.vercel.app/projects/voltix-electronics-store",
    image: voltixImage,
    imageAlt: "Voltix electronics storefront preview with product cards and an electric accent",
  },
  {
    slug: "webdev-site",
    name: "Webdev Digital Brand Website",
    tag: "Business Website",
    body: "A professional digital agency website created to showcase web design and development services, communicate capabilities clearly, and turn visitors into enquiries.",
    detail: ["Business website", "Service presentation", "Responsive design", "Lead generation"],
    liveUrl: "https://webdev-emmy-5644.vercel.app/",
    caseStudyUrl: "https://taiwo-s-digital-studio.vercel.app/projects/webdev-site",
    image: webdevSiteImage,
    imageAlt: "Webdev brand website preview with a blue gradient accent",
  },
];

export const CONCEPT_PROJECTS: ProjectEntry[] = [
  {
    slug: "meridian-consulting",
    name: "Meridian Consulting",
    tag: "Business Website",
    body: "A multi-page site for a consulting practice with service breakdowns, case summaries and a booking-first contact flow.",
    detail: ["5 pages", "Responsive", "Lead form"],
    image: meridianConsulting,
    imageAlt: "Professional consulting team collaborating in a modern business office",
  },
  {
    slug: "lumen-studio",
    name: "Lumen Studio",
    tag: "Landing Page",
    body: "A single-scroll launch page built around one offer, with sectioned proof, pricing clarity and a persistent call to action.",
    detail: ["One-page", "Animation", "CTA focus"],
    image: lumenStudio,
    imageAlt: "Modern creative studio and branding workspace",
  },
  {
    slug: "northside-fitness",
    name: "Northside Fitness",
    tag: "Redesign",
    body: "Rebuild of a dated gym site: new visual system, simplified class schedule and a mobile-first membership sign-up path.",
    detail: ["Redesign", "Mobile-first", "Schedule UI"],
    image: northsideFitness,
    imageAlt: "Modern professional fitness gym with high-quality equipment",
  },
  {
    slug: "crate-and-co",
    name: "Crate & Co.",
    tag: "E-commerce UI",
    body: "Storefront interface work covering product grids, filtering and a streamlined checkout layout designed to reduce drop-off.",
    detail: ["Catalogue", "Filters", "Checkout"],
    image: crateAndCo,
    imageAlt: "Premium product photographed for an e-commerce storefront",
  },
  {
    slug: "atlas-dashboard",
    name: "Atlas Dashboard",
    tag: "UI/UX",
    body: "An admin interface concept with dense data tables, clear states and a component set that scales across screen sizes.",
    detail: ["Design system", "Data tables", "Dark mode"],
    image: atlasDashboard,
    imageAlt: "Business analytics and data visualization environment",
  },
  {
    slug: "verde-interiors",
    name: "Verde Interiors",
    tag: "Portfolio",
    body: "A gallery-led portfolio for an interior design practice, prioritising imagery, whitespace and quiet, confident navigation.",
    detail: ["Gallery", "Typography", "Enquiries"],
    image: verdeInteriors,
    imageAlt: "Premium contemporary interior architecture and interior design",
  },
];

export const ALL_PROJECTS: ProjectEntry[] = [...LIVE_PROJECTS, ...CONCEPT_PROJECTS];

export const PROJECT_MAP: Record<string, ProjectEntry> = Object.fromEntries(
  ALL_PROJECTS.map((project) => [project.slug, project]),
);

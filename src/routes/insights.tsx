import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock3 } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Reveal } from "@/components/Reveal";

const ARTICLES = [
  { slug: "planning-a-business-website", title: "Planning a Business Website Before Design Starts", category: "Website Design", date: "September 2026", reading: "5 min", description: "A practical way to define goals, audiences, pages and calls to action before visual design begins." },
  { slug: "conversion-focused-homepage", title: "What Makes a Homepage Easy to Understand?", category: "Conversion Design", date: "September 2026", reading: "4 min", description: "A clear homepage helps visitors understand who you serve, what you offer and what to do next." },
  { slug: "responsive-design-basics", title: "Responsive Design: Designing Beyond the Desktop", category: "Responsive Design", date: "August 2026", reading: "6 min", description: "Why responsive work is more than shrinking a desktop layout and how to think in flexible systems." },
  { slug: "wordpress-maintenance", title: "A Simple WordPress Maintenance Routine", category: "WordPress", date: "August 2026", reading: "5 min", description: "A straightforward checklist for keeping a business WordPress site healthy after launch." },
  { slug: "ecommerce-product-pages", title: "Building Better E-commerce Product Pages", category: "E-commerce", date: "July 2026", reading: "6 min", description: "Useful principles for product hierarchy, information clarity, trust and the path toward checkout." },
  { slug: "website-performance-basics", title: "Website Performance: Start With the Basics", category: "Performance", date: "July 2026", reading: "5 min", description: "A practical introduction to image weight, loading behaviour, JavaScript and perceived speed." },
] as const;

export const Route = createFileRoute("/insights")({ head: () => ({ meta: [{ title: "Insights | Taiwo Emmanuel" }, { name: "description", content: "Practical insights from Taiwo Emmanuel on website design, development, UX, WordPress, e-commerce and performance." }] }), component: InsightsPage });

function InsightsPage() {
  return <div className="min-h-screen bg-background text-foreground"><SiteHeader /><main className="px-5 pb-20 pt-32 md:pt-40"><div className="mx-auto max-w-6xl"><Reveal><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Insights</p><h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">Useful ideas for building better websites.</h1><p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">Practical notes on design, development, UX, WordPress, e-commerce and website performance.</p></Reveal><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{ARTICLES.map((article, i) => <Reveal key={article.slug} delay={(i % 3) * 70}><article className="flex h-full flex-col rounded-2xl border border-border bg-card/60 p-6"><span className="text-xs font-semibold uppercase tracking-wider text-primary">{article.category}</span><h2 className="mt-4 text-xl font-semibold leading-tight">{article.title}</h2><p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{article.description}</p><div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground"><span>{article.date}</span><span className="inline-flex items-center gap-1"><Clock3 className="size-3.5" />{article.reading}</span></div><Link to="/insights/$slug" params={{ slug: article.slug }} className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary hover:underline">Read article <ArrowRight className="size-4" /></Link></article></Reveal>)}</div></div></main><SiteFooter /></div>;
}

export { ARTICLES };

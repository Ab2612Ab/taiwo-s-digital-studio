import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Clock3, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Reveal } from "@/components/Reveal";

export const CATEGORIES = ["All", "Web Design", "Development", "UI/UX", "Business", "SEO", "Performance"] as const;
export type Category = (typeof CATEGORIES)[number];

const INSIGHTS_VISUAL = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85";

export const ARTICLES = [
  { slug: "what-makes-a-business-website-actually-work", title: "What Makes a Business Website Actually Work?", category: "Business", date: "September 12, 2026", reading: "6 min", description: "Discover how a focused website can earn trust, guide decisions and turn more of the right visitors into customers." },
  { slug: "5-website-design-mistakes-that-cost-businesses-customers", title: "5 Website Design Mistakes That Cost Businesses Customers", category: "Web Design", date: "September 9, 2026", reading: "5 min", description: "Five common design problems that create hesitation, confusion or unnecessary friction for visitors." },
  { slug: "why-mobile-first-design-matters", title: "Why Mobile-First Design Matters for Modern Businesses", category: "UI/UX", date: "September 5, 2026", reading: "5 min", description: "How starting with smaller screens can produce clearer layouts and better decisions across every device." },
  { slug: "website-speed-user-experience", title: "Website Speed: The Hidden Part of a Good User Experience", category: "Performance", date: "August 29, 2026", reading: "6 min", description: "A practical look at the performance details users notice even when they never talk about them." },
  { slug: "good-ui-ux-turns-visitors-into-customers", title: "How Good UI/UX Turns Visitors Into Customers", category: "UI/UX", date: "August 24, 2026", reading: "7 min", description: "Clarity, hierarchy and reduced friction can make a website easier to use and easier to act on." },
  { slug: "before-building-a-business-website", title: "What Every Business Should Know Before Building a Website", category: "Business", date: "August 17, 2026", reading: "6 min", description: "The questions worth answering about goals, audience, content, ownership and maintenance before development begins." },
  { slug: "designing-websites-that-build-trust", title: "Designing Websites That Build Trust", category: "Web Design", date: "August 10, 2026", reading: "5 min", description: "Trust is built through details: consistency, useful information, honest messaging and a predictable experience." },
  { slug: "from-idea-to-launch-website-development-process", title: "From Idea to Launch: My Website Development Process", category: "Development", date: "August 3, 2026", reading: "7 min", description: "A transparent view of how a website project moves from discovery and structure through development, testing and launch." },
] as const;

export const Route = createFileRoute("/insights")({ head: () => ({ meta: [
  { title: "Insights | Taiwo Emmanuel" },
  { name: "description", content: "Practical insights from Taiwo Emmanuel on website design, development, business websites, UI/UX, SEO basics and performance." },
  { property: "og:title", content: "Insights | Taiwo Emmanuel" },
  { property: "og:description", content: "Ideas, strategies and practical lessons for better websites and digital experiences." },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
  { property: "og:image", content: INSIGHTS_VISUAL },
] }), component: InsightsPage });

function ArticleCard({ article }: { article: (typeof ARTICLES)[number] }) {
  return <article className="group flex h-full flex-col rounded-2xl border border-border bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{article.category}</span>
    <h2 className="mt-3 text-xl font-semibold leading-tight"><Link to="/insights/$slug" params={{ slug: article.slug }} className="hover:text-primary">{article.title}</Link></h2>
    <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{article.description}</p>
    <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground"><span>{article.date}</span><span className="inline-flex items-center gap-1"><Clock3 className="size-3.5" aria-hidden="true" />{article.reading}</span></div>
    <Link to="/insights/$slug" params={{ slug: article.slug }} className="mx-auto mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Read article <ArrowRight className="size-4" aria-hidden="true" /></Link>
  </article>;
}

function InsightsPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => { const q = query.trim().toLowerCase(); return ARTICLES.filter((article) => (category === "All" || article.category === category) && (!q || `${article.title} ${article.description} ${article.category}`.toLowerCase().includes(q))); }, [category, query]);
  if (pathname !== "/insights" && pathname !== "/insights/") return <Outlet />;
  return <div className="min-h-screen bg-background text-foreground"><SiteHeader /><main className="px-5 pb-24 pt-32 text-center md:pt-40"><div className="mx-auto max-w-6xl">
    <Reveal><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Insights</p><h1 className="mx-auto mt-3 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Ideas, strategies and practical lessons for better websites and digital experiences.</h1><p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-muted-foreground">Useful articles about website design, web development, business websites, UI/UX, conversion, performance, SEO basics, digital presence, working with clients and building better online experiences.</p></Reveal>
    <Reveal delay={80}><section className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-3xl border border-border bg-card/60"><div className="grid lg:grid-cols-[1.15fr_.85fr]"><div className="min-h-64 overflow-hidden bg-muted"><img src={INSIGHTS_VISUAL} alt="Bright modern creative workspace with desks, plants and natural light, representing a professional environment for digital ideas" className="h-full min-h-64 w-full object-cover transition-transform duration-500 hover:scale-[1.02]" loading="eager" /></div><div className="flex flex-col items-center justify-center p-7 text-center sm:p-10"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Featured Insight</p><p className="mt-5 text-xs text-muted-foreground">{ARTICLES[0].category} · {ARTICLES[0].date} · {ARTICLES[0].reading}</p><h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">{ARTICLES[0].title}</h2><p className="mt-4 max-w-xl leading-7 text-muted-foreground">{ARTICLES[0].description}</p><Link to="/insights/$slug" params={{ slug: ARTICLES[0].slug }} className="mt-7 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>Discover what makes it work <ArrowRight className="size-4" aria-hidden="true" /></Link></div></div></section></Reveal>
    <section className="mx-auto mt-14" aria-labelledby="insights-library"><div className="flex flex-col items-center gap-5"><div><h2 id="insights-library" className="text-3xl font-bold sm:text-4xl">Latest insights</h2><p className="mt-2 text-sm text-muted-foreground">Search by topic or browse the full library.</p></div><div className="relative w-full max-w-sm"><label htmlFor="insight-search" className="sr-only">Search articles</label><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" /><input id="insight-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles..." className="w-full rounded-full border border-input bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/30" /></div></div>
      <div className="mx-auto mt-6 flex max-w-full justify-center gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter articles by category">{CATEGORIES.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${category === item ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card/50 text-muted-foreground hover:text-foreground"}`}>{item}</button>)}</div>
      {filtered.length ? <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map((article, i) => <Reveal key={article.slug} delay={(i % 3) * 60}><ArticleCard article={article} /></Reveal>)}</div> : <div className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center"><h3 className="font-semibold">No insights found</h3><p className="mt-2 text-sm text-muted-foreground">Try another keyword or choose a different category.</p></div>}
    </section>
    <Reveal delay={80}><section className="mx-auto mt-20 max-w-5xl rounded-3xl border border-border bg-card/60 px-6 py-12 text-center sm:px-10"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Have a project in mind?</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl">Let's turn your idea into a website that works.</h2><p className="mx-auto mt-4 max-w-xl text-muted-foreground">Tell me what you are building, what you need the website to achieve and where you want to take it next.</p><Link to="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>Let's Work Together <ArrowRight className="size-4" aria-hidden="true" /></Link></section></Reveal>
  </div></main><SiteFooter /></div>;
}

export default InsightsPage;

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { PROJECT_MAP } from "@/lib/projects-data";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => { const project = PROJECT_MAP[params.slug]; if (!project) throw notFound(); return project; },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.name ?? "Project"} | Taiwo Emmanuel` }, { name: "description", content: loaderData?.body ?? "Project case study by Taiwo Emmanuel." }] }),
  component: CaseStudy,
});

function CaseStudy() {
  const project = Route.useLoaderData();
  return <div className="min-h-screen bg-background text-foreground"><SiteHeader /><main className="px-5 pb-20 pt-32 md:pt-40"><div className="mx-auto max-w-5xl"><Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" />Back to projects</Link><Reveal><div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card/60"><img src={project.image} alt={`${project.name} project preview`} className="h-auto w-full object-cover" /></div></Reveal><Reveal delay={80} className="mt-10"><p className="text-sm font-medium text-primary">{project.tag}</p><h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">{project.name}</h1><p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">{project.body}</p><div className="mt-8 flex flex-wrap gap-2">{project.detail.map(item => <span key={item} className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground">{item}</span>)}</div>{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/10">Visit live site <ArrowUpRight className="size-4" /></a>}</Reveal><div className="mt-16 grid gap-6 md:grid-cols-2"><Reveal><section className="rounded-2xl border border-border bg-card/50 p-6"><h2 className="text-lg font-semibold">Project overview</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.body}</p></section></Reveal><Reveal delay={80}><section className="rounded-2xl border border-border bg-card/50 p-6"><h2 className="text-lg font-semibold">Available information</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">This case study only uses information already present in the portfolio. No client results, metrics or technologies are invented.{project.liveUrl ? " The live deployment is linked above." : ""}</p></section></Reveal></div><Link to="/contact" className="mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>Discuss a similar project <ArrowUpRight className="size-4" /></Link></div></main><SiteFooter /></div>;
}

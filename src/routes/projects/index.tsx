import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Portfolio3DVisual } from "@/components/Portfolio3DVisual";
import { Reveal } from "@/components/Reveal";
import { CONCEPT_PROJECTS, LIVE_PROJECTS, type ProjectEntry } from "@/lib/projects-data";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const Route = createFileRoute("/projects/")({
  head: () => ({ meta: [{ title: "Projects | Taiwo Emmanuel" }, { name: "description", content: "Selected web design and development projects by Taiwo Emmanuel." }] }),
  component: Projects,
});

function ProjectCard({ project, delay }: { project: ProjectEntry; delay: number }) {
  return (
    <Reveal key={project.slug} delay={delay} as="article">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/60">
        <div className="relative">
          <Portfolio3DVisual kind="project" project={project.slug} className="min-h-40 rounded-none border-0 border-b" />
          {project.liveUrl && <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">Live site</span>}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <span className="text-xs font-medium text-primary">{project.tag}</span>
          <h2 className="mt-2 text-lg font-semibold">{project.name}</h2>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{project.body}</p>
          <div className="mt-5 flex flex-wrap gap-2">{project.detail.map(d => <span key={d} className="rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground">{d}</span>)}</div>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">Visit live site <ArrowUpRight className="size-4" /></a>}
            <a href={`/projects/${project.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">Case study <ArrowRight className="size-4" /></a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Projects() {
  return <div className="min-h-screen bg-background text-foreground"><SiteHeader /><main className="px-5 pb-20 pt-32 md:pt-40"><div className="mx-auto max-w-6xl">
    <Reveal><h1 className="text-4xl font-extrabold sm:text-5xl">Selected projects</h1><p className="mt-4 max-w-xl text-muted-foreground">Live deployments first, followed by concept and interface work.</p></Reveal>
    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{LIVE_PROJECTS.map((project, i) => <ProjectCard key={project.slug} project={project} delay={(i % 3) * 70} />)}</div>
    <Reveal><h2 className="mt-20 text-2xl font-bold sm:text-3xl">Concept &amp; UI work</h2><p className="mt-3 max-w-xl text-muted-foreground">Interface concepts and redesign studies exploring layout, systems and conversion.</p></Reveal>
    <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{CONCEPT_PROJECTS.map((project, i) => <ProjectCard key={project.slug} project={project} delay={(i % 3) * 70} />)}</div>
  </div></main><SiteFooter /></div>;
}

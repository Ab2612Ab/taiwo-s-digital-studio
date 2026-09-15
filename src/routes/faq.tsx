import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Reveal } from "@/components/Reveal";

const FAQS = [
  ["What type of websites do you build?", "I build modern business websites, landing pages, e-commerce interfaces, WordPress websites and tailored web experiences."],
  ["Do you work with businesses remotely?", "Yes. The portfolio is set up for remote project enquiries and collaboration."],
  ["Do you redesign existing websites?", "Yes. A redesign can focus on visual direction, content hierarchy, responsive behaviour, UX and development depending on the project."],
  ["Do you work with WordPress?", "Yes. WordPress is included in the development toolkit for suitable business and content-managed projects."],
  ["Can you build e-commerce websites?", "Yes. E-commerce projects can cover storefront structure, product presentation, filtering, checkout UX and the required development work."],
  ["How does your process work?", "The core process is Discovery, Strategy, Design, Development, Testing and Launch."],
  ["How long does a website project take?", "Timing depends on scope, content, feedback and integrations. A project timeline is discussed after the requirements are clear."],
  ["How do I start a project?", "Use the Start a Project form to describe your needs, choose a project type, budget range and timeline, then send the enquiry."],
] as const;

export const Route = createFileRoute("/faq")({ head: () => ({ meta: [{ title: "FAQ | Taiwo Emmanuel" }, { name: "description", content: "Frequently asked questions about working with Taiwo Emmanuel on website projects." }] }), component: FAQ });
function FAQ() { return <div className="min-h-screen bg-background text-foreground"><SiteHeader/><main className="px-5 pb-20 pt-32 md:pt-40"><div className="mx-auto max-w-4xl"><Reveal><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">FAQ</p><h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Questions, answered clearly.</h1><p className="mt-5 text-muted-foreground">A quick guide to the projects, services and process.</p></Reveal><div className="mt-10 space-y-3">{FAQS.map(([question, answer], i) => <Reveal key={question} delay={i * 40}><details className="group rounded-2xl border border-border bg-card/60 p-5"><summary className="cursor-pointer list-none pr-8 font-semibold outline-none focus-visible:ring-2 focus-visible:ring-primary">{question}<span className="float-right text-muted-foreground transition-transform group-open:rotate-45">+</span></summary><p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{answer}</p></details></Reveal>)}</div></div></main><SiteFooter/></div>; }

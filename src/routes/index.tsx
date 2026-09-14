import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, Mail, MapPin, Phone, Layout, Code2, Building2, MousePointerClick, Menu, X } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Portfolio3DVisual } from "@/components/Portfolio3DVisual";
import { PORTFOLIO_RESOURCES } from "@/lib/portfolio-resources";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Taiwo Emmanuel | Web Designer & Developer" },
      { name: "description", content: "Taiwo Emmanuel is a web designer and developer who builds modern, responsive websites and digital experiences for businesses and professionals." },
      { property: "og:title", content: "Taiwo Emmanuel | Web Designer & Developer" },
      { property: "og:description", content: "Modern, responsive websites and digital experiences by Taiwo Emmanuel." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Home", href: "#top" }, { label: "About", href: "#about" }, { label: "Services", href: "#services" },
  { label: "Projects", href: "#work" }, { label: "Process", href: "#process" }, { label: "Contact", href: "#contact" },
];

const SERVICES = [
  { icon: Layout, title: "Website Design", body: "Clean, brand-led interface design with clear hierarchy, purposeful typography and layouts that guide attention to what matters.", visual: "design" as const },
  { icon: Code2, title: "Website Development", body: "Fast, accessible front-end builds with semantic markup, smooth interactions and performance treated as a feature, not an afterthought.", visual: "development" as const },
  { icon: Building2, title: "Business Websites", body: "Complete sites for small businesses and service providers — structured around credibility, clear offers and getting enquiries in.", visual: "business" as const },
  { icon: MousePointerClick, title: "UI/UX Optimisation", body: "Auditing and refining existing pages: sharper messaging, simpler flows and friction removed from the path to conversion.", visual: "ux" as const },
];

const PROJECTS = [
  { slug: "meridian-consulting", name: "Meridian Consulting", tag: "Business Website", body: "A multi-page site for a consulting practice with service breakdowns, case summaries and a booking-first contact flow.", detail: ["5 pages", "Responsive", "Lead form"] },
  { slug: "lumen-studio", name: "Lumen Studio", tag: "Landing Page", body: "A single-scroll launch page built around one offer, with sectioned proof, pricing clarity and a persistent call to action.", detail: ["One-page", "Animation", "CTA focus"] },
  { slug: "northside-fitness", name: "Northside Fitness", tag: "Redesign", body: "Rebuild of a dated gym site: new visual system, simplified class schedule and a mobile-first membership sign-up path.", detail: ["Redesign", "Mobile-first", "Schedule UI"] },
  { slug: "crate-and-co", name: "Crate & Co.", tag: "E-commerce UI", body: "Storefront interface work covering product grids, filtering and a streamlined checkout layout designed to reduce drop-off.", detail: ["Catalogue", "Filters", "Checkout"] },
  { slug: "atlas-dashboard", name: "Atlas Dashboard", tag: "UI/UX", body: "An admin interface concept with dense data tables, clear states and a component set that scales across screen sizes.", detail: ["Design system", "Data tables", "Dark mode"] },
  { slug: "verde-interiors", name: "Verde Interiors", tag: "Portfolio", body: "A gallery-led portfolio for an interior design practice, prioritising imagery, whitespace and quiet, confident navigation.", detail: ["Gallery", "Typography", "Enquiries"] },
];

const SKILLS = [
  { group: "Design", items: ["Figma", "Layout & Grids", "Typography", "Design Systems", "Wireframing"] },
  { group: "Development", items: ["HTML5", "CSS3 / Tailwind", "JavaScript", "React", "WordPress"] },
  { group: "Craft", items: ["Responsive Design", "Accessibility", "Performance", "SEO Basics", "Animation"] },
];

const PROCESS = [
  { step: "01", title: "Discovery", body: "Understanding the business, the audience and what a successful site actually needs to achieve." },
  { step: "02", title: "Strategy", body: "Plan the structure, user experience and project direction before visual design begins." },
  { step: "03", title: "Design", body: "Visual direction, typography and components refined together until the interface is clear and purposeful." },
  { step: "04", title: "Development", body: "Clean, responsive development with testing across mobile, tablet and desktop as I go." },
  { step: "05", title: "Testing", body: "Check responsiveness, functionality, accessibility and the user experience before launch." },
  { step: "06", title: "Launch", body: "Prepare the completed website for launch and hand over the finished work clearly." },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(""); setSent(false);
    const form = e.currentTarget; const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim(); const email = String(data.get("email") ?? "").trim();
    const projectType = String(data.get("projectType") ?? "").trim(); const message = String(data.get("message") ?? "").trim();
    if (!name || name.length > 100) return setError("Please enter your name (under 100 characters).");
    if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 255) return setError("Please enter a valid email address.");
    if (!projectType) return setError("Please select a project type.");
    if (!message || message.length > 1000) return setError("Please enter a message (under 1000 characters).");
    setSending(true);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, projectType, message }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "The message could not be sent.");
      setSent(true); form.reset();
    } catch (submitError) { setError(submitError instanceof Error ? submitError.message : "The message could not be sent."); }
    finally { setSending(false); }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4">
          <a href="#top" className="min-w-0 truncate font-display text-base font-bold tracking-tight">Taiwo<span className="text-gradient"> Emmanuel</span></a>
          <nav className="hidden items-center gap-6 md:flex">{NAV.map((n) => <a key={n.href} href={n.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{n.label}</a>)}<a href="#contact" className="rounded-full border border-primary/40 px-4 py-2 text-sm font-semibold hover:bg-primary/15">Hire me</a></nav>
          <button type="button" aria-label="Toggle menu" onClick={() => setMenuOpen((v) => !v)} className="shrink-0 rounded-md border border-border p-2 md:hidden">{menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}</button>
        </div>
        {menuOpen && <nav className="flex flex-col gap-1 border-t border-border/60 px-5 pb-4 md:hidden">{NAV.map((n) => <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="py-2 text-sm text-muted-foreground">{n.label}</a>)}</nav>}
      </header>

      <main id="top">
        <section className="relative overflow-hidden px-5 pt-32 pb-20 md:pt-44 md:pb-28">
          <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl" style={{ background: "var(--gradient-primary)" }} />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal><p className="inline-flex rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">Web Designer &amp; Developer</p><h1 className="mt-6 text-4xl leading-[1.05] font-extrabold sm:text-5xl lg:text-6xl">I build modern, responsive websites that turn visitors into <span className="text-gradient">customers</span>.</h1><p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">I'm Taiwo Emmanuel. I design and develop clean, fast, conversion-focused websites for businesses — from the first wireframe to the final deployed page.</p><div className="mt-9 flex flex-wrap gap-3"><a href="#work" className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}>View My Work <ArrowRight className="size-4" /></a><a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-accent">Let's Work Together</a></div></Reveal>
            <Reveal delay={120} className="justify-self-center"><div className="w-full max-w-[24rem]"><Portfolio3DVisual kind="hero" className="mb-5 aspect-[4/3]" /><div className="relative"><div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border border-primary/30" /><div className="relative overflow-hidden rounded-[2rem] border border-border p-1" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}><div className="overflow-hidden rounded-[1.85rem] bg-card"><img src={PORTFOLIO_RESOURCES.heroProfile} alt="Portrait of Taiwo Emmanuel, web designer and developer" width={520} height={520} className="h-auto w-full object-cover" /></div></div></div></div></Reveal>
          </div>
        </section>

        <section id="about" className="border-t border-border/60 px-5 py-20 md:py-28 scroll-mt-24"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]"><Reveal><div className="overflow-hidden rounded-2xl border border-border bg-card/60"><img src={PORTFOLIO_RESOURCES.aboutImage} alt="Taiwo Emmanuel" width={520} height={520} className="aspect-square w-full object-cover" /></div><Portfolio3DVisual kind="about" className="mt-5 aspect-[4/3]" /></Reveal><Reveal delay={100} className="space-y-5 text-base leading-relaxed text-muted-foreground"><div><h2 className="text-3xl font-bold text-foreground sm:text-4xl">About me</h2><p className="mt-3 text-sm">Design thinking, development discipline.</p></div><p>I'm a web designer and developer who works across both sides of a project — the visual design and the code that ships it. That means fewer handover gaps, and a finished site that behaves the way it was drawn.</p><p>My approach starts with the goal rather than the aesthetic. Who is the page for, what do they need to understand in the first few seconds, and what should they do next? The design follows from those answers: restrained layouts, readable typography and interfaces that stay out of their own way.</p><p>On the development side I care about the things users feel but rarely name — load speed, clean responsive behaviour, tidy interactions on touch as well as desktop. I work closely with clients throughout, keeping the process transparent and the feedback loops short.</p></Reveal></div></section>

        <section id="services" className="border-t border-border/60 px-5 py-20 md:py-28 scroll-mt-24"><div className="mx-auto max-w-6xl"><Reveal><h2 className="text-3xl font-bold sm:text-4xl">Services</h2><p className="mt-3 max-w-xl text-muted-foreground">Four core offerings, each aimed at the same outcome: a site that works hard for the business behind it.</p></Reveal><div className="mt-12 grid gap-5 sm:grid-cols-2">{SERVICES.map((s, i) => <Reveal key={s.title} delay={i * 80}><div className="group h-full overflow-hidden rounded-2xl border border-border bg-card/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"><Portfolio3DVisual kind={s.visual} className="aspect-[16/9] rounded-none border-0 border-b" /><div className="p-7"><div className="inline-flex size-11 items-center justify-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-primary)" }}><s.icon className="size-5" /></div><h3 className="mt-5 text-xl font-semibold">{s.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p></div></div></Reveal>)}</div></div></section>

        <section id="work" className="border-t border-border/60 px-5 py-20 md:py-28 scroll-mt-24"><div className="mx-auto max-w-6xl"><Reveal><h2 className="text-3xl font-bold sm:text-4xl">Selected projects</h2><p className="mt-3 max-w-xl text-muted-foreground">A cross-section of the kind of work already represented in this portfolio.</p></Reveal><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{PROJECTS.map((p, i) => { const image = PORTFOLIO_RESOURCES.projectImages[p.slug]; return <Reveal key={p.name} delay={(i % 3) * 80} as="article"><div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"><div className="relative min-h-40 overflow-hidden">{image ? <img src={image} alt={`${p.name} project preview`} className="h-full min-h-40 w-full object-cover" /> : <Portfolio3DVisual kind="project" className="min-h-40 rounded-none border-0" />}<span className="absolute bottom-3 left-4 rounded-full bg-background/80 px-3 py-1 text-xs font-medium">{p.tag}</span></div><div className="flex flex-1 flex-col p-6"><h3 className="text-lg font-semibold">{p.name}</h3><p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p><ul className="mt-5 flex flex-wrap gap-2">{p.detail.map((d) => <li key={d} className="rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground">{d}</li>)}</ul><a href={`/projects/${p.slug}`} className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary hover:underline">Case Study <ArrowRight className="size-4" /></a></div></div></Reveal>; })}</div></div></section>

        <section id="process" className="border-t border-border/60 px-5 py-20 md:py-28 scroll-mt-24"><div className="mx-auto max-w-6xl"><Reveal><h2 className="text-3xl font-bold sm:text-4xl">Skills &amp; process</h2></Reveal><Portfolio3DVisual kind="process" className="mx-auto mt-10 aspect-[16/7] max-w-5xl" /><div className="mt-12 grid gap-5 sm:grid-cols-3">{SKILLS.map((s, i) => <Reveal key={s.group} delay={i * 80}><div className="h-full rounded-2xl border border-border bg-card/60 p-6"><p className="font-display text-sm font-semibold tracking-wide uppercase text-gradient">{s.group}</p><ul className="mt-4 space-y-2">{s.items.map((it) => <li key={it} className="flex items-center gap-2 text-sm text-muted-foreground"><span className="size-1.5 rounded-full bg-primary" />{it}</li>)}</ul></div></Reveal>)}</div><ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{PROCESS.map((p, i) => <Reveal key={p.step} delay={i * 70} as="li"><div className="h-full rounded-2xl border border-border bg-card/40 p-5"><span className="font-display text-2xl font-extrabold text-primary/70">{p.step}</span><h3 className="mt-2 text-base font-semibold">{p.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p></div></Reveal>)}</ol></div></section>

        <section id="contact" className="border-t border-border/60 px-5 py-20 md:py-28 scroll-mt-24"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]"><Reveal><Portfolio3DVisual kind="about" className="mb-8 aspect-[16/9]" /><h2 className="text-3xl font-bold sm:text-4xl">Let's Build Something Great</h2><p className="mt-4 max-w-md leading-relaxed text-muted-foreground">Tell me about your website or digital project, what you need it to achieve, and what you would like to build.</p><ul className="mt-8 space-y-4 text-sm"><li className="flex items-center gap-3"><Mail className="size-4 text-primary" /><a href="mailto:hello@taiwoemmanuel.com" className="hover:text-primary">hello@taiwoemmanuel.com</a></li><li className="flex items-center gap-3"><Phone className="size-4 text-primary" /><a href="tel:+2348000000000" className="hover:text-primary">+234 800 000 0000</a></li><li className="flex items-center gap-3 text-muted-foreground"><MapPin className="size-4 text-primary" />Available for remote work worldwide</li></ul></Reveal><Reveal delay={100}><form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card/60 p-6 sm:p-8"><div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm"><span className="mb-2 block font-medium">Name</span><input name="name" maxLength={100} required className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" placeholder="Your name" /></label><label className="block text-sm"><span className="mb-2 block font-medium">Email</span><input name="email" type="email" maxLength={255} required className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" placeholder="you@company.com" /></label></div><label className="mt-4 block text-sm"><span className="mb-2 block font-medium">Project type</span><select name="projectType" required defaultValue="" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"><option value="" disabled>Select a project type</option><option>Website Design</option><option>Website Development</option><option>Business Website</option><option>E-commerce</option><option>Website Redesign</option><option>Custom Web Solution</option><option>Other</option></select></label><label className="mt-4 block text-sm"><span className="mb-2 block font-medium">Message</span><textarea name="message" rows={5} maxLength={1000} required className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" placeholder="Tell me about your project and what you need..." /></label>{error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}{sent && <p role="status" className="mt-3 text-sm text-primary-glow">Thanks — your enquiry was sent successfully.</p>}<button type="submit" disabled={sending} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto" style={{ background: "var(--gradient-primary)" }}>{sending ? "Sending..." : "Send enquiry"} <ArrowRight className="size-4" /></button></form></Reveal></div></section>
      </main>

      <footer className="border-t border-border/60 px-5 py-8"><div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row"><div><p className="font-semibold text-foreground">Taiwo Emmanuel</p><p>Web Designer &amp; Developer</p></div><nav className="flex flex-wrap justify-center gap-4">{NAV.map((n) => <a key={n.href} href={n.href} className="hover:text-foreground">{n.label}</a>)}</nav><p>© 2026 Taiwo Emmanuel. All rights reserved.</p></div></footer>
    </div>
  );
}

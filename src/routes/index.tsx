import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Layout,
  Code2,
  Building2,
  MousePointerClick,
  Menu,
  X,
} from "lucide-react";
import portrait from "@/assets/taiwo-portrait.png";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Taiwo Emmanuel — Web Designer & Developer" },
      {
        name: "description",
        content:
          "Taiwo Emmanuel designs and builds modern, responsive, conversion-focused websites for businesses. View selected projects, services and get in touch.",
      },
      { property: "og:title", content: "Taiwo Emmanuel — Web Designer & Developer" },
      {
        property: "og:description",
        content:
          "Modern, responsive and conversion-focused websites for businesses. Design, development and UI/UX optimisation.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: Layout,
    title: "Website Design",
    body: "Clean, brand-led interface design with clear hierarchy, purposeful typography and layouts that guide attention to what matters.",
  },
  {
    icon: Code2,
    title: "Website Development",
    body: "Fast, accessible front-end builds with semantic markup, smooth interactions and performance treated as a feature, not an afterthought.",
  },
  {
    icon: Building2,
    title: "Business Websites",
    body: "Complete sites for small businesses and service providers — structured around credibility, clear offers and getting enquiries in.",
  },
  {
    icon: MousePointerClick,
    title: "UI/UX Optimisation",
    body: "Auditing and refining existing pages: sharper messaging, simpler flows and friction removed from the path to conversion.",
  },
];

const PROJECTS = [
  {
    name: "Meridian Consulting",
    tag: "Business Website",
    body: "A multi-page site for a consulting practice with service breakdowns, case summaries and a booking-first contact flow.",
    detail: ["5 pages", "Responsive", "Lead form"],
  },
  {
    name: "Lumen Studio",
    tag: "Landing Page",
    body: "A single-scroll launch page built around one offer, with sectioned proof, pricing clarity and a persistent call to action.",
    detail: ["One-page", "Animation", "CTA focus"],
  },
  {
    name: "Northside Fitness",
    tag: "Redesign",
    body: "Rebuild of a dated gym site: new visual system, simplified class schedule and a mobile-first membership sign-up path.",
    detail: ["Redesign", "Mobile-first", "Schedule UI"],
  },
  {
    name: "Crate & Co.",
    tag: "E-commerce UI",
    body: "Storefront interface work covering product grids, filtering and a streamlined checkout layout designed to reduce drop-off.",
    detail: ["Catalogue", "Filters", "Checkout"],
  },
  {
    name: "Atlas Dashboard",
    tag: "UI/UX",
    body: "An admin interface concept with dense data tables, clear states and a component set that scales across screen sizes.",
    detail: ["Design system", "Data tables", "Dark mode"],
  },
  {
    name: "Verde Interiors",
    tag: "Portfolio",
    body: "A gallery-led portfolio for an interior design practice, prioritising imagery, whitespace and quiet, confident navigation.",
    detail: ["Gallery", "Typography", "Enquiries"],
  },
];

const SKILLS = [
  { group: "Design", items: ["Figma", "Layout & Grids", "Typography", "Design Systems", "Wireframing"] },
  { group: "Development", items: ["HTML5", "CSS3 / Tailwind", "JavaScript", "React", "WordPress"] },
  { group: "Craft", items: ["Responsive Design", "Accessibility", "Performance", "SEO Basics", "Animation"] },
];

const PROCESS = [
  { step: "01", title: "Discovery", body: "Understanding the business, the audience and what a successful site actually needs to achieve." },
  { step: "02", title: "Structure", body: "Sitemap, content hierarchy and wireframes agreed before a single pixel of visual design." },
  { step: "03", title: "Design", body: "Visual direction, typography and components refined together until the look feels inevitable." },
  { step: "04", title: "Build", body: "Clean, responsive development with testing across mobile, tablet and desktop as I go." },
  { step: "05", title: "Launch & Support", body: "Deployment, final checks and a handover that leaves you able to run the site confidently." },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || name.length > 100) return setError("Please enter your name (under 100 characters).");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255)
      return setError("Please enter a valid email address.");
    if (!message || message.length > 1000) return setError("Please enter a message (under 1000 characters).");

    setError("");
    setSent(true);
    window.location.href = `mailto:hello@taiwoemmanuel.com?subject=${encodeURIComponent(
      `Project enquiry from ${name}`,
    )}&body=${encodeURIComponent(`${message}\n\n— ${name} (${email})`)}`;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4">
          <a href="#top" className="min-w-0 truncate font-display text-base font-bold tracking-tight">
            Taiwo<span className="text-gradient"> Emmanuel</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full border border-primary/40 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-primary/15"
            >
              Hire me
            </a>
          </nav>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="shrink-0 rounded-md border border-border p-2 md:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {menuOpen && (
          <nav className="flex flex-col gap-1 border-t border-border/60 px-5 pb-4 md:hidden">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="py-2 text-sm text-muted-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden px-5 pt-32 pb-20 md:pt-44 md:pb-28">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
            style={{ background: "var(--gradient-primary)" }}
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Web Designer &amp; Developer
              </p>
              <h1 className="mt-6 text-4xl leading-[1.05] font-extrabold sm:text-5xl lg:text-6xl">
                I build modern, responsive websites that turn visitors into{" "}
                <span className="text-gradient">customers</span>.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                I'm Taiwo Emmanuel. I design and develop clean, fast, conversion-focused websites for
                businesses — from the first wireframe to the final deployed page.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
                  style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}
                >
                  View My Work
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent"
                >
                  Let's Work Together
                </a>
              </div>
            </Reveal>

            <Reveal delay={120} className="justify-self-center">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border border-primary/30"
                />
                <div
                  className="relative overflow-hidden rounded-[2rem] border border-border p-1"
                  style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}
                >
                  <div className="overflow-hidden rounded-[1.85rem] bg-card">
                    <img
                      src={portrait}
                      alt="Portrait of Taiwo Emmanuel, web designer and developer"
                      width={520}
                      height={520}
                      className="h-auto w-[19rem] object-cover sm:w-[22rem]"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* About */}
        <section id="about" className="border-t border-border/60 px-5 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <h2 className="text-3xl font-bold sm:text-4xl">About me</h2>
              <p className="mt-3 text-sm text-muted-foreground">Design thinking, development discipline.</p>
            </Reveal>
            <Reveal delay={100} className="space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                I'm a web designer and developer who works across both sides of a project — the visual
                design and the code that ships it. That means fewer handover gaps, and a finished site
                that behaves the way it was drawn.
              </p>
              <p>
                My approach starts with the goal rather than the aesthetic. Who is the page for, what do
                they need to understand in the first few seconds, and what should they do next? The design
                follows from those answers: restrained layouts, readable typography and interfaces that
                stay out of their own way.
              </p>
              <p>
                On the development side I care about the things users feel but rarely name — load speed,
                clean responsive behaviour, tidy interactions on touch as well as desktop. I work closely
                with clients throughout, keeping the process transparent and the feedback loops short.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-3">
                {[
                  ["Design + build", "One person, end to end"],
                  ["Mobile-first", "Tested on every size"],
                  ["Clear process", "No black boxes"],
                ].map(([t, s]) => (
                  <div key={t} className="rounded-xl border border-border bg-card/50 p-4">
                    <p className="font-display text-sm font-semibold text-foreground">{t}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{s}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="border-t border-border/60 px-5 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-3xl font-bold sm:text-4xl">Services</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Four core offerings, each aimed at the same outcome: a site that works hard for the
                business behind it.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={i * 80}>
                  <div className="group h-full rounded-2xl border border-border bg-card/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
                    <div
                      className="inline-flex size-11 items-center justify-center rounded-xl text-primary-foreground"
                      style={{ background: "var(--gradient-primary)" }}
                    >
                      <s.icon className="size-5" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="border-t border-border/60 px-5 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-3xl font-bold sm:text-4xl">Selected projects</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                A cross-section of the kind of work I take on — business sites, landing pages, redesigns
                and interface work.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((p, i) => (
                <Reveal key={p.name} delay={(i % 3) * 80} as="article">
                  <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
                    <div
                      className="relative h-36 overflow-hidden"
                      style={{ background: "var(--gradient-primary)" }}
                    >
                      <div className="absolute inset-0 opacity-90 mix-blend-overlay [background:radial-gradient(circle_at_30%_20%,white,transparent_60%)]" />
                      <span className="absolute bottom-3 left-4 rounded-full bg-background/80 px-3 py-1 text-xs font-medium">
                        {p.tag}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-semibold">{p.name}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {p.detail.map((d) => (
                          <li
                            key={d}
                            className="rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground"
                          >
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Skills & Process */}
        <section id="process" className="border-t border-border/60 px-5 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-3xl font-bold sm:text-4xl">Skills &amp; process</h2>
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {SKILLS.map((s, i) => (
                <Reveal key={s.group} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-border bg-card/60 p-6">
                    <p className="font-display text-sm font-semibold tracking-wide uppercase text-gradient">
                      {s.group}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {s.items.map((it) => (
                        <li key={it} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="size-1.5 rounded-full bg-primary" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>

            <ol className="mt-14 grid gap-4 md:grid-cols-5">
              {PROCESS.map((p, i) => (
                <Reveal key={p.step} delay={i * 70} as="li">
                  <div className="h-full rounded-2xl border border-border bg-card/40 p-5">
                    <span className="font-display text-2xl font-extrabold text-primary/70">{p.step}</span>
                    <h3 className="mt-2 text-base font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t border-border/60 px-5 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <h2 className="text-3xl font-bold sm:text-4xl">Let's work together</h2>
              <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                Tell me about the project — what the business does, what the site needs to do, and when
                you'd like it live. I reply to every serious enquiry.
              </p>
              <ul className="mt-8 space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <Mail className="size-4 text-primary" />
                  <a href="mailto:hello@taiwoemmanuel.com" className="hover:text-primary">
                    hello@taiwoemmanuel.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="size-4 text-primary" />
                  <a href="tel:+2348000000000" className="hover:text-primary">
                    +234 800 000 0000
                  </a>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="size-4 text-primary" />
                  Available for remote work worldwide
                </li>
              </ul>
            </Reveal>

            <Reveal delay={100}>
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-border bg-card/60 p-6 sm:p-8"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm">
                    <span className="mb-2 block font-medium">Name</span>
                    <input
                      name="name"
                      maxLength={100}
                      required
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-2 block font-medium">Email</span>
                    <input
                      name="email"
                      type="email"
                      maxLength={255}
                      required
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                      placeholder="you@company.com"
                    />
                  </label>
                </div>
                <label className="mt-4 block text-sm">
                  <span className="mb-2 block font-medium">Project details</span>
                  <textarea
                    name="message"
                    rows={5}
                    maxLength={1000}
                    required
                    className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                    placeholder="What are you building, and what does success look like?"
                  />
                </label>
                {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
                {sent && !error && (
                  <p className="mt-3 text-sm text-primary-glow">
                    Thanks — your email app should now be open with the message ready to send.
                  </p>
                )}
                <button
                  type="submit"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] sm:w-auto"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  Send enquiry
                  <ArrowRight className="size-4" />
                </button>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Taiwo Emmanuel</p>
          <p>Web Designer &amp; Developer</p>
        </div>
      </footer>
    </div>
  );
}

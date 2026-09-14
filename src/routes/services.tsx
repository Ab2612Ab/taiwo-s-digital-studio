import { createFileRoute } from "@tanstack/react-router";
import { Building2, Code2, Layout, MousePointerClick } from "lucide-react";
import { Portfolio3DVisual } from "@/components/Portfolio3DVisual";
import { Reveal } from "@/components/Reveal";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
const SERVICES=[
 {icon:Layout,title:"Website Design",body:"Clean, brand-led interface design with clear hierarchy, purposeful typography and layouts that guide attention to what matters.",visual:"design" as const},
 {icon:Code2,title:"Website Development",body:"Fast, accessible front-end builds with semantic markup, smooth interactions and performance treated as a feature, not an afterthought.",visual:"development" as const},
 {icon:Building2,title:"Business Websites",body:"Complete sites for small businesses and service providers — structured around credibility, clear offers and getting enquiries in.",visual:"business" as const},
 {icon:MousePointerClick,title:"UI/UX Optimisation",body:"Auditing and refining existing pages: sharper messaging, simpler flows and friction removed from the path to conversion.",visual:"ux" as const},
];
export const Route=createFileRoute("/services")({head:()=>({meta:[{title:"Services | Taiwo Emmanuel"},{name:"description",content:"Web design, development, business websites and UI/UX optimisation by Taiwo Emmanuel."}]}),component:Services});
function Services(){return <div className="min-h-screen bg-background text-foreground"><SiteHeader/><main className="px-5 pb-20 pt-32 md:pt-40"><div className="mx-auto max-w-6xl"><Reveal><p className="text-sm font-medium uppercase tracking-wide text-primary">Taiwo Emmanuel</p><h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Services</h1><p className="mt-4 max-w-xl text-muted-foreground">Four core offerings, each aimed at the same outcome: a site that works hard for the business behind it.</p></Reveal><div className="mt-14 grid gap-5 sm:grid-cols-2">{SERVICES.map((s,i)=><Reveal key={s.title} delay={i*70}><article className="overflow-hidden rounded-2xl border border-border bg-card/60"><Portfolio3DVisual kind={s.visual} className="aspect-[16/9] rounded-none border-0 border-b"/><div className="p-7"><div className="inline-flex size-11 items-center justify-center rounded-xl text-primary-foreground" style={{background:"var(--gradient-primary)"}}><s.icon className="size-5"/></div><h2 className="mt-5 text-xl font-semibold">{s.title}</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p></div></article></Reveal>)}</div></div></main><SiteFooter/></div>}

import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, Facebook, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { FACEBOOK_URL, LINKEDIN_URL, SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const Route = createFileRoute("/contact")({ head: () => ({ meta: [{ title: "Start a Project | Taiwo Emmanuel" }, { name: "description", content: "Start a website design or development project with Taiwo Emmanuel." }] }), component: Contact });

function Contact() {
  const [sending, setSending] = useState(false); const [status, setStatus] = useState(""); const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("");
    setSending(true);
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const name = value("name");
    const email = value("email");
    const projectType = value("projectType");
    const message = value("message");
    if (!name || name.length > 100) {
      setError("Please enter your name.");
      setSending(false);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      setSending(false);
      return;
    }
    if (!projectType || !message) {
      setError("Please complete the project type and message fields.");
      setSending(false);
      return;
    }
    const lines = [
      "Hello Taiwo, I’d like to discuss a project.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      value("phone") ? `Phone: ${value("phone")}` : "",
      value("company") ? `Company: ${value("company")}` : "",
      `Project type: ${projectType}`,
      value("budget") ? `Budget: ${value("budget")}` : "",
      value("timeline") ? `Timeline: ${value("timeline")}` : "",
      "",
      message,
    ].filter(Boolean);
    const whatsappUrl = `https://wa.me/2349045945470?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setStatus("WhatsApp opened with your enquiry. Review the message and press Send there.");
    form.reset();
    setSending(false);
  }
  return <div className="min-h-screen bg-background text-foreground"><SiteHeader/><main className="px-5 pb-20 pt-32 md:pt-40"><div className="mx-auto max-w-6xl"><Reveal><p className="text-sm font-medium uppercase tracking-wide text-primary">Start a project</p><h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Let's Build Something Great</h1><p className="mt-4 max-w-2xl text-muted-foreground">Tell me what you are building, what you need it to achieve, your preferred timeline and budget range.</p></Reveal><div className="mt-12 grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><Reveal><div className="space-y-4"><a href="mailto:taiwoemmanuel693@gmail.com" className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-5 hover:border-primary/50"><Mail className="size-5 text-primary"/><span className="text-sm">taiwoemmanuel693@gmail.com</span></a><a href="tel:+2349045945470" className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-5 hover:border-primary/50"><Phone className="size-5 text-primary"/><span className="text-sm">+2349045945470</span></a><a href="https://github.com/Ab2612Ab" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-5 hover:border-primary/50"><Github className="size-5 text-primary"/><span className="text-sm">github.com/Ab2612Ab</span></a><a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-5 hover:border-primary/50"><Linkedin className="size-5 text-primary"/><span className="text-sm">linkedin.com/in/emmanuel-taiwo-46b309271</span></a><a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-5 hover:border-primary/50"><Facebook className="size-5 text-primary"/><span className="text-sm">Webdev on Facebook</span></a><div className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-5"><MapPin className="size-5 text-primary"/><span className="text-sm text-muted-foreground">Available for remote work worldwide</span></div><div className="rounded-2xl border border-border bg-card/40 p-5 text-sm text-muted-foreground"><p className="font-semibold text-foreground">Simple project flow</p><p className="mt-2">1. Tell me about your project</p><p>2. Explain what you need</p><p>3. Choose your timeline</p><p>4. Send your enquiry</p></div></div></Reveal><Reveal delay={100}><form onSubmit={submit} className="rounded-3xl border border-border bg-card/60 p-6 sm:p-8"><div className="grid gap-4 sm:grid-cols-2"><Field label="Name" name="name" required/><Field label="Email" name="email" type="email" required/><Field label="Phone" name="phone"/><Field label="Company / Business" name="company"/></div><div className="mt-4 grid gap-4 sm:grid-cols-2"><Select label="Project type" name="projectType" options={["New Website","Website Redesign","E-commerce Website","Landing Page","UI/UX Design","WordPress Website","Website Maintenance","Other"]}/><Select label="Budget range" name="budget" options={["Under $500","$500 – $1,000","$1,000 – $2,500","$2,500 – $5,000","$5,000+"]}/></div><div className="mt-4"><Select label="Timeline" name="timeline" options={["As soon as possible","1–2 weeks","3–4 weeks","1–2 months","Flexible"]}/></div><label className="mt-4 block text-sm font-medium">Message<textarea name="message" rows={6} required maxLength={2000} placeholder="Tell me about your project and what you need..." className="mt-2 w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"/></label>{error&&<p role="alert" className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}{status&&<p role="status" className="mt-4 rounded-xl border border-primary/30 bg-primary/10 p-3 text-sm">{status}</p>}<button type="submit" disabled={sending} className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60" style={{background:"var(--gradient-primary)"}}>{sending ? "Opening WhatsApp…" : "Continue in WhatsApp"}<ArrowRight className="size-4"/></button></form></Reveal></div></div></main><SiteFooter/></div>;
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) { return <label className="block text-sm font-medium">{label}{required&&<span aria-hidden="true"> *</span>}<input name={name} type={type} required={required} maxLength={name === "phone" ? 40 : 120} className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"/></label>; }
function Select({ label, name, options }: { label: string; name: string; options: string[] }) { return <label className="block text-sm font-medium">{label}<select name={name} required defaultValue="" className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"><option value="" disabled>Select {label.toLowerCase()}</option>{options.map(option => <option key={option}>{option}</option>)}</select></label>; }

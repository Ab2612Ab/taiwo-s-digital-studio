import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [["Home", "/"], ["About", "/about"], ["Services", "/services"], ["Projects", "/projects"], ["Process", "/process"], ["Insights", "/insights"], ["Contact", "/contact"]] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"><a href="/" className="font-display text-base font-bold">Taiwo<span className="text-gradient"> Emmanuel</span></a><nav className="hidden items-center gap-6 md:flex">{NAV.map(([label, href]) => <a key={href} href={href} className="text-sm text-muted-foreground hover:text-foreground">{label}</a>)}<a href="/contact" className="rounded-full border border-primary/40 px-4 py-2 text-sm font-semibold">Hire me</a></nav><button type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(v => !v)} className="rounded-md border border-border p-2 md:hidden">{open ? <X className="size-5" /> : <Menu className="size-5" />}</button></div>{open && <nav className="flex flex-col gap-1 border-t border-border/60 px-5 pb-4 md:hidden">{NAV.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="py-2 text-sm text-muted-foreground">{label}</a>)}</nav>}</header>;
}

export function SiteFooter() {
  return <footer className="border-t border-border/60 px-5 py-8"><div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row"><div><p className="font-semibold text-foreground">Taiwo Emmanuel</p><p>Web Designer &amp; Developer</p></div><p>© 2026 Taiwo Emmanuel. All rights reserved.</p></div></footer>;
}

import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [["Home", "/"], ["About", "/about"], ["Services", "/services"], ["Projects", "/projects/"], ["Insights", "/insights"], ["Booking", "/booking"], ["Process", "/process"], ["Contact", "/contact"]] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"><a href="/" className="font-display text-base font-bold"><span className="text-primary">web</span><span className="text-accent">dev</span></a><nav className="hidden items-center gap-6 md:flex">{NAV.map(([label, href]) => <a key={href} href={href} className="text-sm text-muted-foreground hover:text-foreground">{label}</a>)}<a href="/booking" className="rounded-full border border-primary/40 px-4 py-2 text-sm font-semibold">Book a call</a></nav><button type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(v => !v)} className="rounded-md border border-border p-2 md:hidden">{open ? <X className="size-5" /> : <Menu className="size-5" />}</button></div>{open && <nav className="flex flex-col gap-1 border-t border-border/60 px-5 pb-4 md:hidden">{NAV.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="py-2 text-sm text-muted-foreground">{label}</a>)}</nav>}</header>;
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 px-5 py-10 text-center">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-sm text-muted-foreground">
        <div className="flex flex-col items-center gap-1">
          <p className="font-display text-xl font-bold">
            <span className="text-primary">web</span><span className="text-accent">dev</span>
          </p>
          <p>Web Designer &amp; Developer</p>
        </div>
        <p>© 2026 webdev. All rights reserved.</p>
        <a
          href="https://wa.me/2349045945470?text=Hello%20Taiwo%20Emmanuel%2C%20I%20would%20like%20to%20discuss%20a%20website%20project%20with%20you."
          target="_blank"
          rel="noreferrer"
          aria-label="Contact me on WhatsApp"
          title="Contact me on WhatsApp"
          className="inline-flex items-center justify-center rounded-full border border-primary/40 p-2 text-primary transition-colors hover:bg-primary/10"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 fill-current">
            <path d="M20.52 3.48A11.78 11.78 0 0 0 12.04 0C5.5 0 .18 5.32.18 11.86c0 2.09.55 4.13 1.6 5.93L.08 24l6.36-1.67a11.85 11.85 0 0 0 5.6 1.42h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.23-6.14-3.39-8.41ZM12.05 21.7h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.77.99 1.01-3.67-.23-.38a9.85 9.85 0 0 1-1.51-5.2C2.16 6.42 6.59 2 12.05 2a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.46-4.43 9.89-9.88 9.89Zm5.42-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.5 1.71.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}

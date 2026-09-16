import { useMemo, useState } from "react";
import { Bot, CalendarDays, MessageCircle, Send, X } from "lucide-react";

type Message = { id: number; role: "assistant" | "visitor"; text: string };

const WHATSAPP = "2349045945470";

const answers = {
  services:
    "WebDesk AI can explain Taiwo's services: website design, website development, business websites, e-commerce, landing pages, redesigns, and UI/UX optimisation.",
  projects:
    "The portfolio includes Meridian Consulting, Lumen Studio, Northside Fitness, Crate & Co., Atlas Dashboard, and Verde Interiors. You can open Projects to explore the case studies.",
  process:
    "Projects normally move through discovery, strategy, design, development, testing, and launch. The exact workflow is adjusted to the project.",
  pricing:
    "Current published starting prices are Website Design $850+, Website Development $1,000+, Business Websites $1,200+, and UI/UX Optimisation $850+. Final pricing depends on scope and requirements.",
  booking:
    "The fastest next step is a project consultation. Use the Booking page to share what you want built, or continue through WhatsApp if you prefer a direct conversation.",
};

function initialMessage(): Message {
  return {
    id: 1,
    role: "assistant",
    text: "Hi! I'm WebDesk AI, Taiwo's digital receptionist. Taiwo may be unavailable right now, but I can answer questions about the services, portfolio, process, starting prices, and help you prepare for a project consultation. How can I help?",
  };
}

function replyFor(input: string): string {
  const text = input.toLowerCase();
  if (/price|pricing|cost|budget|how much/.test(text)) return answers.pricing;
  if (/service|services|offer|what do you do/.test(text)) return answers.services;
  if (/project|portfolio|case stud|work|example/.test(text)) return answers.projects;
  if (/process|workflow|how.*work|steps/.test(text)) return answers.process;
  if (/book|booking|consult|call|appointment|schedule/.test(text)) return answers.booking;
  if (/hello|hi|hey|good morning|good afternoon|good evening/.test(text))
    return "Welcome. I'm WebDesk AI, the site's AI receptionist. Tell me what you need help with and I'll point you to the right next step.";
  if (/website|web site|redesign|landing|ecommerce|e-commerce|store|shop|ui|ux|responsive/.test(text))
    return "That sounds like a website project WebDesk AI can help you scope. Tell me what the business does, whether you already have a website, and the main result you want from the new or improved site.";
  if (/contact|whatsapp|reach|message/.test(text))
    return "You can continue directly on WhatsApp, or use the Contact page. If you want a project consultation, the Booking page is the clearest next step.";
  return "I can help with services, portfolio projects, starting prices, the design and development process, or booking a consultation. What would you like to know?";
}

export function WebDeskAI() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([initialMessage()]);
  const [leadOpen, setLeadOpen] = useState(false);
  const [lead, setLead] = useState({ name: "", email: "", project: "" });
  const suggestions = useMemo(
    () => ["What services do you offer?", "How much does a website cost?", "Show me your projects", "I want to book a consultation"],
    [],
  );

  function send(text = input) {
    const clean = text.trim();
    if (!clean) return;
    const visitor: Message = { id: Date.now(), role: "visitor", text: clean };
    const assistant: Message = { id: Date.now() + 1, role: "assistant", text: replyFor(clean) };
    setMessages((current) => [...current, visitor, assistant]);
    setInput("");
  }

  function openWhatsApp() {
    const message = `Hello Taiwo Emmanuel, I would like to discuss a website project.\nName: ${lead.name || "Not provided"}\nEmail: ${lead.email || "Not provided"}\nProject: ${lead.project || "Not provided"}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="fixed bottom-24 right-5 z-[60]">
      {open && (
        <section className="mb-3 flex h-[min(650px,calc(100vh-120px))] w-[min(410px,calc(100vw-32px))] flex-col overflow-hidden rounded-3xl border border-border bg-background/95 shadow-2xl backdrop-blur-xl" aria-label="WebDesk AI receptionist">
          <header className="flex items-center justify-between border-b border-border bg-primary px-4 py-4 text-primary-foreground">
            <div className="flex items-center gap-3 text-left">
              <span className="grid size-10 place-items-center rounded-full bg-background/15"><Bot className="size-5" /></span>
              <div>
                <p className="font-semibold">WebDesk AI</p>
                <p className="text-xs text-primary-foreground/75">AI receptionist · available 24/7</p>
              </div>
            </div>
            <button type="button" aria-label="Close WebDesk AI" onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-background/10"><X className="size-5" /></button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message) => (
              <div key={message.id} className={message.role === "visitor" ? "ml-8 rounded-2xl rounded-br-md bg-primary p-3 text-left text-sm text-primary-foreground" : "mr-8 rounded-2xl rounded-bl-md bg-muted p-3 text-left text-sm text-foreground"}>
                {message.text}
              </div>
            ))}

            <div className="grid gap-2 pt-1">
              {suggestions.map((suggestion) => (
                <button key={suggestion} type="button" onClick={() => send(suggestion)} className="rounded-xl border border-border px-3 py-2 text-center text-xs transition hover:border-primary/50 hover:bg-muted">
                  {suggestion}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-muted/50 p-3 text-center">
              <p className="text-xs text-muted-foreground">Need to leave details while Taiwo is unavailable?</p>
              <button type="button" onClick={() => setLeadOpen((value) => !value)} className="mt-2 inline-flex items-center gap-2 rounded-full border border-primary/40 px-3 py-2 text-xs font-semibold hover:bg-background">
                <CalendarDays className="size-3.5" /> Prepare a consultation
              </button>
            </div>

            {leadOpen && (
              <div className="space-y-2 rounded-2xl border border-border p-3">
                <input value={lead.name} onChange={(event) => setLead({ ...lead, name: event.target.value })} placeholder="Your name" className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
                <input value={lead.email} onChange={(event) => setLead({ ...lead, email: event.target.value })} placeholder="Email address" type="email" className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
                <textarea value={lead.project} onChange={(event) => setLead({ ...lead, project: event.target.value })} placeholder="Briefly describe your project" rows={3} className="w-full resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
                <div className="flex flex-wrap justify-center gap-2">
                  <a href="/booking" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"><CalendarDays className="size-3.5" /> Open Booking</a>
                  <button type="button" onClick={openWhatsApp} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold"><MessageCircle className="size-3.5" /> Send on WhatsApp</button>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={(event) => { event.preventDefault(); send(); }} className="flex items-center gap-2 border-t border-border p-3">
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask WebDesk AI..." aria-label="Message WebDesk AI" className="min-w-0 flex-1 rounded-full border border-border bg-muted px-4 py-2.5 text-sm outline-none focus:border-primary" />
            <button type="submit" aria-label="Send message" className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-50" disabled={!input.trim()}><Send className="size-4" /></button>
          </form>
        </section>
      )}

      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close WebDesk AI" : "Open WebDesk AI"} className="group ml-auto flex items-center gap-2 rounded-full border border-primary/30 bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl">
        <span className="grid size-8 place-items-center rounded-full bg-background/15"><Bot className="size-4" /></span>
        <span>WebDesk AI</span>
      </button>
    </div>
  );
}

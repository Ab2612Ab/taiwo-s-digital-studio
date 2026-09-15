import { useMemo, useState } from "react";
import { Bot, ChevronDown, Send, X } from "lucide-react";

const KNOWLEDGE = [
  { keys: ["price", "pricing", "cost", "budget", "how much"], answer: "Website services start from $850+, with final pricing based on the scope and requirements. Website Design starts at $850+, Website Development at $1,000+, Business Websites at $1,200+, and UI/UX Optimisation at $850+." },
  { keys: ["service", "services", "offer", "do you do"], answer: "I offer Website Design, Website Development, Business Websites, and UI/UX Optimisation. I can also help with redesigns, e-commerce websites, landing pages, WordPress websites, and maintenance." },
  { keys: ["booking", "book", "appointment", "call", "meeting"], answer: "You can book a project consultation directly from the Booking page. Choose your service, preferred date and time, then submit the request. No AI API or account is required." },
  { keys: ["process", "workflow", "steps", "work"], answer: "The process is Discovery, Strategy, Design, Development, Testing, and Launch. The goal is to keep the project clear and practical from the first conversation to launch." },
  { keys: ["project", "portfolio", "work examples", "case study"], answer: "You can explore the Projects section for the portfolio and open individual case studies where available. The site only presents project information that is already part of the portfolio." },
  { keys: ["contact", "email", "hire", "reach", "start"], answer: "To start a project, use the Contact page. You can send your name, email, project type, budget, timeline and message. You can also book a consultation from the Booking page." },
  { keys: ["insight", "article", "blog", "learn", "tips"], answer: "The Insights section contains practical articles about website design, development, UI/UX, business websites, performance, SEO basics and building better digital experiences." },
  { keys: ["mobile", "responsive", "phone", "tablet"], answer: "The portfolio is designed to work across mobile, tablet, laptop and desktop screens, with responsive navigation and layouts." },
];

function getAnswer(input: string) {
  const text = input.toLowerCase();
  const match = KNOWLEDGE.find(item => item.keys.some(key => text.includes(key)));
  if (match) return match.answer;
  return "I can help with services, pricing, booking, the project process, portfolio projects, Insights, or starting a project. Try asking something like: 'What are your website prices?'";
}

export function AIStudioAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ from: "bot", text: "Hi — I’m Taiwo’s website assistant. Ask me about services, pricing, projects, booking or the process." }]);
  const suggestions = useMemo(() => ["What are your prices?", "What services do you offer?", "How can I book?"], []);

  function send(text = input) {
    const clean = text.trim();
    if (!clean) return;
    setMessages(prev => [...prev, { from: "user", text: clean }, { from: "bot", text: getAnswer(clean) }]);
    setInput("");
  }

  return <div className="fixed bottom-5 right-5 z-[60]">
    {open && <div className="mb-3 flex h-[min(560px,calc(100vh-120px))] w-[min(380px,calc(100vw-40px))] flex-col overflow-hidden rounded-3xl border border-border bg-background/95 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-border p-4"><div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground"><Bot className="size-5" /></div><div><p className="font-semibold">Taiwo Assistant</p><p className="text-xs text-muted-foreground">Instant answers • No API required</p></div></div><button type="button" aria-label="Close assistant" onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-muted"><X className="size-4" /></button></div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">{messages.map((message, index) => <div key={index} className={message.from === "user" ? "ml-8 rounded-2xl rounded-br-md bg-primary p-3 text-sm text-primary-foreground" : "mr-8 rounded-2xl rounded-bl-md bg-muted p-3 text-sm text-foreground"}>{message.text}</div>)}<div className="flex flex-wrap gap-2 pt-1">{suggestions.map(s => <button key={s} type="button" onClick={() => send(s)} className="rounded-full border border-border px-3 py-1.5 text-xs hover:border-primary/50">{s}</button>)}</div></div>
      <form onSubmit={e => { e.preventDefault(); send(); }} className="flex gap-2 border-t border-border p-3"><input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about the portfolio..." aria-label="Ask the website assistant" className="min-w-0 flex-1 rounded-full border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"/><button type="submit" aria-label="Send question" className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Send className="size-4" /></button></form>
    </div>}
    <button type="button" aria-label={open ? "Close AI assistant" : "Open AI assistant"} onClick={() => setOpen(v => !v)} className="grid size-14 place-items-center rounded-full text-primary-foreground shadow-xl transition-transform hover:scale-105" style={{ background: "var(--gradient-primary)" }}>{open ? <ChevronDown className="size-6" /> : <Bot className="size-6" />}</button>
  </div>;
}

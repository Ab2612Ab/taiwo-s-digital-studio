import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, ChevronDown, Mic, MicOff, Send, Volume2, VolumeX, X } from "lucide-react";

type Message = { id: number; from: "bot" | "user"; text: string; speaking?: boolean };

const SESSION_KEY = "taiwo-ai-studio-conversation";
const KNOWLEDGE = {
  services: "Taiwo Emmanuel provides Website Design, Website Development, Business Websites and UI/UX Optimisation. The portfolio also covers e-commerce websites, landing pages and website redesign work.",
  projects: "The selected projects are Meridian Consulting, Lumen Studio, Northside Fitness, Crate & Co., Atlas Dashboard and Verde Interiors, each with its own case-study page.",
  process: "The process is Discovery, Strategy, Design, Development, Testing and Launch.",
  pricing: "Published starting prices are Website Design $850+, Website Development $1,000+, Business Websites $1,200+ and UI/UX Optimisation $850+. Final pricing depends on the project requirements.",
  contact: "You can use the Contact page, the Contact me WhatsApp button, or book a project consultation through /booking.",
  ecommerce: "E-commerce work can cover storefront structure, product merchandising, product grids, filtering and a streamlined checkout experience.",
};

function loadMessages(): Message[] {
  try { const saved = sessionStorage.getItem(SESSION_KEY); if (saved) return JSON.parse(saved); } catch {}
  return [{ id: Date.now(), from: "bot", text: "Hi! 👋 I'm Taiwo's Studio Assistant. Welcome! What are you looking to build, improve, or solve with your website?" }];
}

function conversationReply(input: string, history: Message[]) {
  const text = input.toLowerCase();
  const recent = history.filter(m => m.from === "user").slice(-4).map(m => m.text.toLowerCase()).join(" ");
  const context = `${recent} ${text}`;
  const hasWebsiteProblem = /slow|outdated|bad|broken|nobody|no one|not getting|conversion|old website|redesign|problem|improve/.test(context);
  const isNewSite = /need a website|new website|build a website|business website|website for my/.test(context);
  const isEcommerce = /e.?commerce|online store|shop|sell online|products|checkout/.test(context);
  const isBooking = /book|appointment|schedule|calendar/.test(context);
  const isPrice = /price|pricing|cost|budget|expensive|how much/.test(context);
  const isProject = /project|portfolio|case stud|meridian|lumen|northside|crate|atlas|verde/.test(context);
  const isContact = /contact|hire|email|whatsapp|reach taiwo/.test(context);

  if (hasWebsiteProblem) return "That sounds like something worth diagnosing rather than jumping straight into a redesign. What type of business is the website for, and what do you most want visitors to do when they arrive?";
  if (isEcommerce) return "Absolutely. For an online store, I’d first clarify the products, how customers should browse them, and how checkout should work. Are you starting from scratch, or do you already have a store that needs improvement?";
  if (isNewSite) return "Great. Let’s shape it around the business rather than starting with a generic template. What is the business or brand name, and what is the main goal of the new website?";
  if (isBooking) return "If customers need to schedule appointments, the site can be structured around a clear booking journey. Do you need simple booking requests, or do you need customers to choose available dates and times?";
  if (isPrice) return `${KNOWLEDGE.pricing} What kind of website are you considering, and roughly what would you like it to accomplish? That will help narrow the scope before you book.`;
  if (/service|services|offer|what do you do/.test(text)) return `${KNOWLEDGE.services} If you tell me what you are trying to achieve, I can help identify which service fits best.`;
  if (isProject) return `${KNOWLEDGE.projects} If you tell me which project interests you, I can explain the type of work it represents without inventing details.`;
  if (/process|workflow|how do you work/.test(text)) return `${KNOWLEDGE.process} We can start with the problem you want solved and work through the appropriate stages from there.`;
  if (/insight|article|blog/.test(text)) return "The Insights section contains practical material around web design, development, UI/UX, performance, SEO basics and digital experiences. You can explore it at /insights.";
  if (isContact) return `${KNOWLEDGE.contact} If you already know what you want built, Booking is usually the best next step.`;
  if (/hello|hi |hey|good morning|good afternoon|good evening/.test(text)) return history.length > 2 ? "Good to hear from you again. What would you like to work through next?" : "Hi! 👋 Tell me a little about what you are building or what is not working, and we can work through it together.";
  if (/mobile|responsive|phone|tablet/.test(text)) return "Responsive behaviour is part of the portfolio approach. I’d want to know which screens or user journeys are giving you trouble so we can focus on the right part of the experience.";
  if (/help me plan|don't know|do not know|what features/.test(text)) return "Absolutely. We can plan it together without deciding everything at once. First, what does the business need the website to help customers do: learn, enquire, book, buy, or something else?";
  if (history.length > 2) return "I’m with you. Based on what you’ve told me so far, the next useful step is to clarify the goal before choosing features. What result would make you say the new or improved website is working?";
  return "I can help you think through the website problem step by step. Tell me what you are trying to build or what is currently going wrong, and I’ll ask the right follow-up questions.";
}

export function AIStudioAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(loadMessages);
  const [listening, setListening] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [speechAvailable, setSpeechAvailable] = useState(false);
  const recognitionRef = useRef<any>(null);
  const nextId = useRef(messages.length + 1);
  const suggestions = useMemo(() => ["I need a website", "I need help with my existing website", "How much does a website cost?", "Tell me about your services", "Help me plan my project", "I want to book a project"], []);

  useEffect(() => { try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages)); } catch {} }, [messages]);
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setSpeechAvailable(!!SpeechRecognition);
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.continuous = false; recognition.interimResults = true; recognition.lang = "en-US";
    recognition.onstart = () => { setListening(true); setProcessing(false); };
    recognition.onresult = (event: any) => { let transcript = ""; for (let i = event.resultIndex; i < event.results.length; i++) transcript += event.results[i][0].transcript; setInput(transcript); };
    recognition.onerror = () => { setListening(false); setProcessing(false); };
    recognition.onend = () => { setListening(false); setProcessing(false); };
    recognitionRef.current = recognition;
    return () => { try { recognition.stop(); } catch {} };
  }, []);

  function toggleListening() {
    if (!speechAvailable) return;
    if (listening) { setProcessing(true); try { recognitionRef.current?.stop(); } catch { setListening(false); setProcessing(false); } }
    else { setProcessing(false); try { recognitionRef.current?.start(); } catch {} }
  }
  function send(text = input) {
    const clean = text.trim(); if (!clean) return;
    const user: Message = { id: nextId.current++, from: "user", text: clean };
    setMessages(prev => { const next = [...prev, user]; const reply: Message = { id: nextId.current++, from: "bot", text: conversationReply(clean, next) }; return [...next, reply]; });
    setInput("");
  }
  function speak(text: string) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.rate = 1; window.speechSynthesis.speak(utterance);
  }
  function stopSpeaking() { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); }
  function resetConversation() { stopSpeaking(); try { sessionStorage.removeItem(SESSION_KEY); } catch {} setMessages([{ id: Date.now(), from: "bot", text: "Welcome back! 👋 What are you looking to build, improve, or solve with your website?" }]); }

  return <div className="fixed bottom-24 right-5 z-[60]">
    {open && <div className="mb-3 flex h-[min(620px,calc(100vh-120px))] w-[min(400px,calc(100vw-32px))] flex-col overflow-hidden rounded-3xl border border-border bg-background/95 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-border p-4"><div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground"><Bot className="size-5"/></div><div><p className="font-semibold">Taiwo's Studio Assistant</p><p className="text-xs text-muted-foreground">Conversational help • Voice enabled when supported</p></div></div><button type="button" aria-label="Close assistant" onClick={()=>setOpen(false)} className="rounded-full p-2 hover:bg-muted"><X className="size-4"/></button></div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">{messages.map(message=><div key={message.id} className={message.from==="user"?"ml-8 rounded-2xl rounded-br-md bg-primary p-3 text-sm text-primary-foreground":"mr-8 rounded-2xl rounded-bl-md bg-muted p-3 text-sm text-foreground"}><div>{message.text}</div>{message.from==="bot" && <div className="mt-2 flex gap-1"><button type="button" onClick={()=>speak(message.text)} className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-1 text-[11px] hover:border-primary/50" aria-label="Listen to assistant response"><Volume2 className="size-3"/> Listen</button><button type="button" onClick={stopSpeaking} className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-1 text-[11px] hover:border-primary/50" aria-label="Stop assistant speech"><VolumeX className="size-3"/> Stop</button></div>}</div>)}{processing && <div className="mr-8 rounded-2xl bg-muted p-3 text-sm text-muted-foreground animate-pulse">Processing...</div>}<div className="flex flex-wrap gap-2 pt-1">{suggestions.map(s=><button key={s} type="button" onClick={()=>send(s)} className="rounded-full border border-border px-3 py-1.5 text-xs hover:border-primary/50">{s}</button>)}</div></div>
      <form onSubmit={e=>{e.preventDefault();send();}} className="border-t border-border p-3"><div className="flex items-end gap-2"><textarea value={input} onChange={e=>setInput(e.target.value)} rows={1} maxLength={4000} placeholder={listening?"Listening...":processing?"Processing...":"Tell me about your project..."} aria-label="Message the website assistant" className="min-h-10 max-h-28 min-w-0 flex-1 resize-y rounded-2xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"/><button type="button" onClick={toggleListening} disabled={!speechAvailable} aria-label={speechAvailable?(listening?"Stop voice input":"Tap to speak"):"Voice input is unavailable in this browser"} title={!speechAvailable?"Voice input is unavailable in this browser":listening?"Stop":"Tap to speak"} className={`grid size-10 shrink-0 place-items-center rounded-full border border-border ${listening?"bg-primary text-primary-foreground":"bg-background"} disabled:cursor-not-allowed disabled:opacity-40`}>{listening?<MicOff className="size-4"/>:<Mic className="size-4"/>}</button><button type="submit" aria-label="Send message" className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Send className="size-4"/></button></div>{!speechAvailable && <p className="mt-2 text-[11px] text-muted-foreground">Voice input is unavailable in this browser. You can type your message instead.</p>}<div className="mt-2 flex items-center justify-between"><button type="button" onClick={resetConversation} className="text-[11px] text-muted-foreground underline-offset-2 hover:underline">Reset conversation</button><div className="flex gap-2"><a href="/booking" className="rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">Book a Project</a><a href="/contact" className="rounded-full border border-border px-3 py-1.5 text-xs font-medium">Contact me</a></div></div></form>
    </div>}
    <button type="button" aria-label={open?"Close AI assistant":"Open AI assistant"} onClick={()=>setOpen(v=>!v)} className="grid size-14 place-items-center rounded-full text-primary-foreground shadow-xl transition-transform hover:scale-105" style={{background:"var(--gradient-primary)"}}>{open?<ChevronDown className="size-6"/>:<Bot className="size-6"/>}</button>
  </div>;
}

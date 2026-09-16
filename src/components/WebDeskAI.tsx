import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, CalendarDays, LoaderCircle, MessageCircle, Mic, MicOff, Send, Volume2, X } from "lucide-react";

type Message = { id: number; role: "assistant" | "visitor"; text: string; voice?: boolean };

const WHATSAPP = "2349045945470";

const answers = {
  services:
    "I can explain webdev's services: website design, website development, business websites, e-commerce, landing pages, redesigns, responsive builds, and UI/UX optimisation.",
  projects:
    "The portfolio includes Meridian Consulting, Lumen Studio, Northside Fitness, Crate & Co., Atlas Dashboard, and Verde Interiors. You can open Projects to explore the work.",
  process:
    "Projects normally move through discovery, strategy, design, development, testing, and launch. The workflow is adapted to the project's goals and complexity.",
  pricing:
    "Published starting prices are Website Design $850+, Website Development $1,000+, Business Websites $1,200+, and UI/UX Optimisation $850+. Final pricing depends on scope and requirements.",
  booking:
    "The clearest next step is a project consultation. Open the Booking page and share what you want built, or continue through WhatsApp for a direct conversation.",
};

function initialMessage(): Message {
  return {
    id: 1,
    role: "assistant",
    text: "Hi! I'm WebDesk AI, webdev's AI digital receptionist. I'm here when Taiwo is unavailable. You can type to me or send a voice note, and I can help with services, projects, pricing, project planning and consultations.",
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
    return "Welcome. I'm WebDesk AI, the site's AI receptionist. Tell me what you need to accomplish and I'll help you work out the right next step.";
  if (/website|web site|redesign|landing|ecommerce|e-commerce|store|shop|ui|ux|responsive/.test(text))
    return "I can help you scope that website project. Tell me what the business does, whether you already have a website, who the site is for, and the main result you want from the new or improved website.";
  if (/contact|whatsapp|reach|message/.test(text))
    return "You can continue directly on WhatsApp, use the Contact page, or prepare a consultation through the Booking page.";
  return "I can help you understand the services, review portfolio work, discuss starting prices, plan a website project, or prepare a consultation. Tell me what you are trying to achieve and I'll help you from there.";
}

function decodeBase64(base64: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

export function WebDeskAI() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([initialMessage()]);
  const [leadOpen, setLeadOpen] = useState(false);
  const [lead, setLead] = useState({ name: "", email: "", project: "" });
  const [busy, setBusy] = useState(false);
  const [recording, setRecording] = useState(false);
  const [status, setStatus] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const suggestions = useMemo(
    () => ["What services do you offer?", "How much does a website cost?", "Show me your projects", "I want to book a consultation"],
    [],
  );

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    audioRef.current?.pause();
  }, []);

  async function playSpeech(base64: string, mediaType = "audio/mpeg") {
    audioRef.current?.pause();
    const blob = new Blob([decodeBase64(base64)], { type: mediaType });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.onended = () => URL.revokeObjectURL(url);
    await audio.play();
  }

  async function speak(text: string) {
    try {
      setStatus("Preparing voice...");
      const response = await fetch("/api/webdesk-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: [], speak: true }),
      });
      const data = await response.json();
      if (data.audioBase64) await playSpeech(data.audioBase64, data.audioMediaType);
      else if ("speechSynthesis" in window) window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    } catch {
      if ("speechSynthesis" in window) window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    } finally {
      setStatus("");
    }
  }

  async function send(text = input) {
    const clean = text.trim();
    if (!clean || busy) return;

    const visitor: Message = { id: Date.now(), role: "visitor", text: clean };
    const history = messages.map((message) => ({ role: message.role === "visitor" ? "user" as const : "assistant" as const, content: message.text }));
    setMessages((current) => [...current, visitor]);
    setInput("");
    setBusy(true);
    setStatus("WebDesk AI is thinking...");

    try {
      const response = await fetch("/api/webdesk-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: clean, history }),
      });
      const data = await response.json();
      const reply = response.ok && data.reply ? data.reply : replyFor(clean);
      setMessages((current) => [...current, { id: Date.now() + 1, role: "assistant", text: reply }]);
    } catch {
      setMessages((current) => [...current, { id: Date.now() + 1, role: "assistant", text: replyFor(clean) }]);
    } finally {
      setBusy(false);
      setStatus("");
    }
  }

  async function startRecording() {
    if (busy || recording) return;
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setStatus("Voice notes are not supported by this browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      const preferred = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"].find((type) => MediaRecorder.isTypeSupported(type));
      const recorder = preferred ? new MediaRecorder(stream, { mimeType: preferred }) : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      recorder.ondataavailable = (event) => {
        if (event.data.size) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        void sendVoiceNote(blob);
      };
      recorder.start();
      setRecording(true);
      setStatus("Listening... tap the microphone again when you're finished.");
    } catch {
      setStatus("Microphone access was not available. Please allow microphone permission and try again.");
    }
  }

  function stopRecording() {
    if (!mediaRecorderRef.current || mediaRecorderRef.current.state === "inactive") return;
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current = null;
    setRecording(false);
    setBusy(true);
    setStatus("Transcribing your voice note...");
  }

  async function sendVoiceNote(blob: Blob) {
    const history = messages.map((message) => ({ role: message.role === "visitor" ? "user" as const : "assistant" as const, content: message.text }));
    const formData = new FormData();
    formData.append("audio", blob, "webdesk-voice-note.webm");
    formData.append("history", JSON.stringify(history));

    try {
      const response = await fetch("/api/webdesk-ai", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok || !data.reply) throw new Error(data.error || "Voice request failed");

      setMessages((current) => [
        ...current,
        { id: Date.now(), role: "visitor", text: data.transcript, voice: true },
        { id: Date.now() + 1, role: "assistant", text: data.reply },
      ]);
      if (data.audioBase64) await playSpeech(data.audioBase64, data.audioMediaType);
      setStatus("");
    } catch {
      setMessages((current) => [...current, { id: Date.now(), role: "assistant", text: "I couldn't process that voice note right now. Please try recording it again, or type your message and I'll help you." }]);
      setStatus("");
    } finally {
      setBusy(false);
    }
  }

  function openWhatsApp() {
    const message = `Hello Taiwo Emmanuel, I would like to discuss a website project.\nName: ${lead.name || "Not provided"}\nEmail: ${lead.email || "Not provided"}\nProject: ${lead.project || "Not provided"}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="fixed bottom-24 right-5 z-[60]">
      {open && (
        <section className="mb-3 flex h-[min(700px,calc(100vh-120px))] w-[min(430px,calc(100vw-32px))] flex-col overflow-hidden rounded-3xl border border-border bg-background/95 shadow-2xl backdrop-blur-xl" aria-label="WebDesk AI receptionist">
          <header className="flex items-center justify-between border-b border-border bg-primary px-4 py-4 text-primary-foreground">
            <div className="flex items-center gap-3 text-left">
              <span className="grid size-10 place-items-center rounded-full bg-background/15"><Bot className="size-5" /></span>
              <div className="text-left">
                <div className="font-semibold">WebDesk AI</div>
                <div className="text-xs text-primary-foreground/75">AI receptionist · voice &amp; chat</div>
              </div>
            </div>
            <button type="button" aria-label="Close WebDesk AI" onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-background/10"><X className="size-5" /></button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message) => (
              <div key={message.id} className={message.role === "visitor" ? "ml-8 rounded-2xl rounded-br-md bg-primary p-3 text-left text-sm text-primary-foreground" : "mr-8 rounded-2xl rounded-bl-md bg-muted p-3 text-left text-sm text-foreground"}>
                <div>{message.text}</div>
                {message.role === "assistant" && (
                  <button type="button" onClick={() => void speak(message.text)} className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-border/60 px-2.5 py-1 text-[11px] text-muted-foreground hover:bg-background" aria-label="Play WebDesk AI response aloud">
                    <Volume2 className="size-3" /> Listen
                  </button>
                )}
                {message.voice && <div className="mt-2 text-[10px] opacity-70">Voice note transcribed</div>}
              </div>
            ))}

            {busy && (
              <div className="mr-8 flex items-center gap-2 rounded-2xl rounded-bl-md bg-muted p-3 text-left text-xs text-muted-foreground">
                <LoaderCircle className="size-4 animate-spin" /> {status || "Working on it..."}
              </div>
            )}

            <div className="grid gap-2 pt-1">
              {suggestions.map((suggestion) => (
                <button key={suggestion} type="button" onClick={() => void send(suggestion)} disabled={busy} className="rounded-xl border border-border px-3 py-2 text-center text-xs transition hover:border-primary/50 hover:bg-muted disabled:opacity-50">
                  {suggestion}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-muted/50 p-3 text-center">
              <div className="text-xs text-muted-foreground">Want to leave a project brief while Taiwo is unavailable?</div>
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

          <form onSubmit={(event) => { event.preventDefault(); void send(); }} className="border-t border-border p-3">
            {status && !busy && <div className="mb-2 text-center text-[11px] text-muted-foreground">{status}</div>}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => (recording ? stopRecording() : void startRecording())}
                disabled={busy && !recording}
                aria-label={recording ? "Stop voice note" : "Record voice note"}
                className={`grid size-11 shrink-0 place-items-center rounded-full border ${recording ? "border-destructive bg-destructive text-destructive-foreground" : "border-primary/40 bg-muted text-foreground"}`}
              >
                {recording ? <MicOff className="size-4" /> : <Mic className="size-4" />}
              </button>
              <input value={input} onChange={(event) => setInput(event.target.value)} placeholder={recording ? "Recording voice note..." : "Ask WebDesk AI..."} aria-label="Message WebDesk AI" disabled={busy || recording} className="min-w-0 flex-1 rounded-full border border-border bg-muted px-4 py-2.5 text-sm outline-none focus:border-primary disabled:opacity-60" />
              <button type="submit" aria-label="Send message" className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-50" disabled={!input.trim() || busy || recording}><Send className="size-4" /></button>
            </div>
            <div className="mt-2 text-center text-[10px] text-muted-foreground">Tap the microphone, speak naturally, then tap it again. WebDesk AI will transcribe you and speak its reply aloud.</div>
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

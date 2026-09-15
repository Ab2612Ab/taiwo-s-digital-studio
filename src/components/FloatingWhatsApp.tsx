import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "2349045945470";
const WHATSAPP_MESSAGE = "Hello Taiwo, I found your portfolio and would like to discuss a web project.";

export function FloatingWhatsApp() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Taiwo Emmanuel on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-[60] inline-flex size-14 items-center justify-center rounded-full border border-border/40 bg-primary text-primary-foreground shadow-lg transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <MessageCircle className="size-7" aria-hidden="true" />
      <span className="absolute right-0 top-0 size-3 rounded-full border-2 border-background bg-primary" aria-hidden="true" />
    </a>
  );
}

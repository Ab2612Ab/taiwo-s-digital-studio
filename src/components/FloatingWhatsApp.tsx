const WHATSAPP_NUMBER = "2349045945470";
const WHATSAPP_MESSAGE = "Hello Taiwo Emmanuel, I would like to discuss a website project with you.";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" aria-hidden="true" fill="currentColor">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .17 5.33.17 11.88c0 2.1.55 4.15 1.6 5.96L.07 24l6.3-1.65a11.84 11.84 0 0 0 5.68 1.45h.01c6.55 0 11.87-5.33 11.87-11.88 0-3.18-1.24-6.16-3.41-8.44ZM12.06 21.8h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.64-.23-.37a9.88 9.88 0 1 1 8.37 4.62Zm5.42-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.74-1.65-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

export function FloatingWhatsApp() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Taiwo Emmanuel on WhatsApp"
      title="Contact me on WhatsApp"
      className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full border border-border/40 bg-background px-4 py-3 text-sm font-semibold text-foreground shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#25D366] text-white" aria-hidden="true">
        <WhatsAppIcon />
      </span>
      <span>Contact me</span>
    </a>
  );
}

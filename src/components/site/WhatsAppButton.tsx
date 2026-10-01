import { MessageCircle } from "lucide-react";

import { contact } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      href={contact.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Reservar por WhatsApp"
      className="red-glow fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center gap-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary-hover sm:h-auto sm:w-auto sm:rounded-none sm:px-6 sm:py-4"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden text-[0.7rem] font-medium tracking-[0.25em] uppercase sm:inline">
        Reservar
      </span>
    </a>
  );
}

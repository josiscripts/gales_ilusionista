import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle } from "lucide-react";

import { Reveal } from "./Reveal";
import { contact, images } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6 py-24">
      <img
        src={images.stageCta}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
      <Reveal className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        <span className="eyebrow text-primary">El telón está a punto de subir</span>
        <h2 className="mt-6 font-display text-5xl leading-[1.02] text-white sm:text-7xl">
          ¿Estás listo para vivir lo imposible?
        </h2>
        <Link
          to="/contacto"
          className="btn-red mt-10"
        >
          Reservar espectáculo
        </Link>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-primary"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <a
            href={contact.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-primary"
          >
            <Instagram className="h-4 w-4" /> Instagram
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-2 transition-colors hover:text-primary"
          >
            <Mail className="h-4 w-4" /> {contact.email}
          </a>
        </div>
      </Reveal>
    </section>
  );
}

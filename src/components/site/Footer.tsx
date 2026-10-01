import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle } from "lucide-react";

import { Logo } from "./Logo";
import { contact, navLinks } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface px-6 py-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <Logo />
        <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="text-xs tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-5">
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
          <a
            href={contact.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${contact.email}`}
            aria-label="Correo"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
        <p className="text-[0.7rem] tracking-[0.2em] text-muted-foreground/70 uppercase">
          © {new Date().getFullYear()} Gales Ilusionista
        </p>
      </div>
    </footer>
  );
}

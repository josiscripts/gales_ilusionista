import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Reveal } from "@/components/site/Reveal";
import { submitContactRequest } from "@/lib/contact.functions";
import { contact } from "@/lib/site";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Hagamos inolvidable tu evento | GALES" },
      {
        name: "description",
        content:
          "Solicita disponibilidad y presupuesto para tu evento: empresas, bodas, celebraciones privadas y teatros.",
      },
      { property: "og:title", content: "Contacto — Hagamos inolvidable tu evento" },
      {
        property: "og:description",
        content: "Cuéntanos tu evento y recibe una propuesta personalizada en menos de 24 horas.",
      },
    ],
  }),
  component: Contacto,
});

const tipos = ["Empresa", "Boda", "Evento privado", "Teatro", "Televisión", "Otro"];

function Contacto() {
  const enviar = useServerFn(submitContactRequest);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSending(true);
    try {
      await enviar({
        data: {
          name: String(fd.get("name") || ""),
          company: String(fd.get("company") || ""),
          email: String(fd.get("email") || ""),
          phone: String(fd.get("phone") || ""),
          event_type: String(fd.get("event_type") || ""),
          event_date: String(fd.get("event_date") || ""),
          city: String(fd.get("city") || ""),
          message: String(fd.get("message") || ""),
        },
      });
      toast.success("Solicitud enviada. Te responderemos en menos de 24 horas.");
      form.reset();
    } catch {
      toast.error("No hemos podido enviar la solicitud. Inténtalo de nuevo.");
    } finally {
      setSending(false);
    }
  }

  const field =
    "w-full border border-border bg-surface px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

  return (
    <main>
      <section className="px-6 pt-40 pb-14 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow text-primary">Contacto</span>
          <h1 className="mt-5 font-display text-5xl leading-[0.95] font-bold text-white sm:text-7xl">
            Hagamos inolvidable tu evento
          </h1>
        </Reveal>
      </section>

      <section className="px-6 pb-28 sm:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
              <input name="name" required placeholder="Nombre *" className={field} />
              <input name="company" placeholder="Empresa (opcional)" className={field} />
              <input name="email" type="email" required placeholder="Email *" className={field} />
              <input name="phone" placeholder="Teléfono" className={field} />
              <select name="event_type" required defaultValue="" className={field}>
                <option value="" disabled>
                  Tipo de evento *
                </option>
                {tipos.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <input name="event_date" type="date" className={field} />
              <input name="city" placeholder="Ciudad" className={`${field} sm:col-span-2`} />
              <textarea
                name="message"
                required
                rows={6}
                placeholder="Cuéntanos cómo imaginas el momento *"
                className={`${field} sm:col-span-2`}
              />
              <button
                type="submit"
                disabled={sending}
                className="btn-red sm:col-span-2"
              >
                {sending ? "Enviando…" : "Enviar solicitud"}
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border border-border bg-surface p-8">
              <h2 className="font-display text-3xl text-white">Habla directamente</h2>
              <ul className="mt-8 space-y-6 text-sm">
                <li>
                  <a
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0 text-primary" />{" "}
                    {contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-primary" /> {contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Instagram className="h-4 w-4 shrink-0 text-primary" /> @galesilusionista
                  </a>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" /> {contact.city}
                </li>
              </ul>
              <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
                Estos datos de contacto son provisionales. Envíanos los reales y los actualizamos.
              </p>
            </div>

            <div className="mt-6 overflow-hidden border border-border">
              <iframe
                title="Ubicación"
                src="https://www.google.com/maps?q=Madrid,Espa%C3%B1a&output=embed"
                loading="lazy"
                className="h-72 w-full grayscale invert-[0.92] hue-rotate-180"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

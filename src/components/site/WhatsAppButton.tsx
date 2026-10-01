"use client";

import { MessageCircle, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import { contact } from "@/lib/site";
import { cn } from "@/lib/utils";

const contactOptions = [
  {
    id: "reserve",
    icon: "🎩",
    label: "Reservar un espectáculo",
    message: "Hola Gales, quiero reservar un espectáculo. Me gustaría recibir información sobre disponibilidad y opciones.",
  },
  {
    id: "availability",
    icon: "📅",
    label: "Consultar disponibilidad",
    message: "Hola Gales, me gustaría consultar la disponibilidad para un espectáculo.",
  },
  {
    id: "shows",
    icon: "🎭",
    label: "Ver espectáculos",
    message: "Hola Gales, me gustaría conocer los espectáculos y experiencias disponibles.",
  },
  {
    id: "other",
    icon: "💬",
    label: "Otra consulta",
    message: "Hola Gales, tengo una consulta y me gustaría recibir más información.",
  },
];

function buildWhatsAppUrl(message: string): string {
  const whatsappNumber = contact.whatsapp.replace("https://wa.me/", "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        const button = document.querySelector('[aria-label="Abrir contacto de WhatsApp"]');
        if (button && !button.contains(event.target as Node)) {
          setOpen(false);
        }
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  const handleOpenWhatsApp = (message: string) => {
    const url = buildWhatsAppUrl(message);
    window.open(url, "_blank");
    setOpen(false);
  };

  return (
    <>
      {/* BOTÓN FLOTANTE */}
      <motion.button
        whileHover={{ y: -2, scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(!open)}
        className="btn-green fixed right-6 bottom-6 z-40 flex items-center justify-center gap-2 md:gap-3"
        aria-label="Abrir contacto de WhatsApp"
      >
        <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
        <span className="hidden text-xs tracking-wider uppercase font-medium sm:inline">WhatsApp</span>
        <span className="text-xs tracking-wider uppercase font-medium md:hidden">→</span>
      </motion.button>

      {/* PANEL FLOTANTE */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed right-6 bottom-24 z-40 w-full max-w-sm md:max-w-md"
            style={{ maxWidth: "calc(100vw - 48px)" }}
          >
            {/* CONTENEDOR DEL PANEL */}
            <div className="bg-black/80 border border-white/10 rounded-lg backdrop-blur-lg shadow-2xl p-6 space-y-6">
              {/* HEADER */}
              <div className="text-center border-b border-white/10 pb-6">
                <h3 className="font-display text-xl text-white">GALES</h3>
                <p className="text-xs text-gray-400 mt-1">Ilusionista · Disponible</p>
              </div>

              {/* MENSAJE */}
              <div className="space-y-3">
                <p className="text-sm leading-relaxed text-gray-300">
                  Hola 👋<br />
                  ¿Quieres llevar la magia a tu próximo evento?<br />
                  <br />
                  Cuéntanos qué tienes en mente y te ayudamos a preparar tu experiencia.
                </p>
              </div>

              {/* OPCIONES */}
              <div className="space-y-3 border-t border-white/10 pt-6">
                {contactOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    whileHover={{ x: 4 }}
                    onClick={() => handleOpenWhatsApp(option.message)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-md border border-white/15 text-gray-300 hover:border-white/30 hover:text-white hover:bg-white/5 transition-all duration-200 text-left text-sm"
                  >
                    <span className="text-base shrink-0">{option.icon}</span>
                    <span className="font-medium">{option.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* BOTÓN FINAL */}
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOpenWhatsApp(contactOptions[0].message)}
                className="btn-green w-full"
              >
                Abrir WhatsApp →
              </motion.button>

              {/* BOTÓN CERRAR */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-md border border-white/15 text-gray-400 hover:text-white hover:border-white/30 transition-colors"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

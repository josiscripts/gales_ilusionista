"use client";

import { Ticket, Calendar, Sparkles, MessageSquare, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import { Logo } from "./Logo";
import { contact } from "@/lib/site";
import whatsappSvg from "@/assets/whatsapp-svgrepo-com.svg";

const contactOptions = [
  {
    id: "reserve",
    iconId: "ticket" as const,
    label: "Reservar un espectáculo",
    message: "Hola Gales, quiero reservar un espectáculo. Me gustaría recibir información sobre disponibilidad y opciones.",
  },
  {
    id: "availability",
    iconId: "calendar" as const,
    label: "Consultar disponibilidad",
    message: "Hola Gales, me gustaría consultar la disponibilidad para un espectáculo.",
  },
  {
    id: "shows",
    iconId: "sparkles" as const,
    label: "Ver espectáculos",
    message: "Hola Gales, me gustaría conocer los espectáculos y experiencias disponibles.",
  },
  {
    id: "other",
    iconId: "message" as const,
    label: "Otra consulta",
    message: "Hola Gales, tengo una consulta y me gustaría recibir más información.",
  },
];

function getIcon(id: string) {
  switch (id) {
    case "ticket":
      return <Ticket className="h-5 w-5 shrink-0" />;
    case "calendar":
      return <Calendar className="h-5 w-5 shrink-0" />;
    case "sparkles":
      return <Sparkles className="h-5 w-5 shrink-0" />;
    case "message":
      return <MessageSquare className="h-5 w-5 shrink-0" />;
    default:
      return <Ticket className="h-5 w-5 shrink-0" />;
  }
}

function buildWhatsAppUrl(message: string): string {
  const whatsappNumber = contact.whatsapp.replace("https://wa.me/", "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
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
      {/* BOTÓN FLOTANTE BLANCO */}
      <motion.button
        ref={buttonRef}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed right-6 bottom-6 z-40 flex items-center justify-center gap-2.5 px-4 py-3 bg-white text-[#25D366] rounded-md transition-all duration-200 hover:shadow-lg"
        style={{
          clipPath: "polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)",
        }}
        aria-label="Abrir contacto de WhatsApp"
      >
        <img src={whatsappSvg} alt="WhatsApp" className="h-5 w-5" />
        <span className="text-xs font-semibold tracking-wider uppercase hidden sm:inline">WhatsApp</span>
        <span className="text-xs font-semibold">→</span>
      </motion.button>

      {/* PANEL FLOTANTE BLANCO */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed z-40"
            style={{
              right: "24px",
              bottom: "92px",
              width: "380px",
              maxWidth: "calc(100vw - 32px)",
            }}
          >
            {/* CONTENEDOR DEL PANEL */}
            <div className="bg-white border border-gray-200 shadow-xl p-6 space-y-5" style={{ borderRadius: "24px" }}>
              {/* HEADER */}
              <div className="text-center">
                <Logo compact />
                <p className="text-xs text-gray-500 mt-2">Ilusionista · Disponible</p>
              </div>

              {/* MENSAJE */}
              <div className="text-center space-y-2 border-t border-gray-200 pt-5">
                <p className="text-sm leading-relaxed text-gray-700">
                  Hola<br />
                  ¿Quieres llevar la magia a tu próximo evento?<br />
                  <br />
                  Cuéntanos qué tienes en mente y te ayudamos a preparar tu experiencia.
                </p>
              </div>

              {/* OPCIONES */}
              <div className="space-y-2">
                {contactOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    whileHover={{ x: 2 }}
                    onClick={() => handleOpenWhatsApp(option.message)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-md border border-gray-200 text-gray-700 hover:border-[#25D366] hover:text-[#25D366] hover:bg-[#f0f9f7] transition-all duration-200 text-left text-sm font-medium"
                  >
                    {getIcon(option.iconId)}
                    <span>{option.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* BOTÓN FINAL */}
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const firstOption = contactOptions.find(o => o.id === "reserve");
                  if (firstOption) handleOpenWhatsApp(firstOption.message);
                }}
                className="w-full px-4 py-3 bg-[#25D366] text-white rounded-md font-semibold text-sm tracking-wider uppercase transition-all duration-200 hover:bg-[#20ba5a]"
                style={{
                  clipPath: "polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)",
                }}
              >
                Abrir WhatsApp →
              </motion.button>

              {/* BOTÓN CERRAR */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

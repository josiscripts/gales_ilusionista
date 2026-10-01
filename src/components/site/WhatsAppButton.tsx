"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerClose } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
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

function ContactPanel({ onClose, selectedMessage }: { onClose: () => void; selectedMessage: string | null }) {
  const [selected, setSelected] = useState<string | null>(selectedMessage);

  const handleOpenWhatsApp = () => {
    if (!selected) return;
    const option = contactOptions.find((opt) => opt.id === selected);
    if (option) {
      const url = buildWhatsAppUrl(option.message);
      window.open(url, "_blank");
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col gap-4"
    >
      <div className="text-center">
        <h2 className="font-display text-xl text-foreground">GALES</h2>
        <p className="text-xs text-muted-foreground">Ilusionista · Disponible</p>
      </div>

      <div className="border-t border-border pt-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Hola 👋<br />
          ¿Quieres llevar la magia a tu próximo evento?<br />
          <br />
          Cuéntanos qué tienes en mente y te ayudamos a preparar tu experiencia.
        </p>
      </div>

      <div className="space-y-2 border-t border-border pt-4">
        {contactOptions.map((option) => (
          <motion.button
            key={option.id}
            whileHover={{ x: 4 }}
            onClick={() => setSelected(option.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-md border transition-all duration-200",
              selected === option.id
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
            )}
          >
            <span className="text-lg">{option.icon}</span>
            <span className="text-left text-sm font-medium">{option.label}</span>
          </motion.button>
        ))}
      </div>

      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleOpenWhatsApp}
        disabled={!selected}
        className={cn(
          "w-full btn-green",
          !selected && "opacity-50 pointer-events-none",
        )}
      >
        Abrir WhatsApp →
      </motion.button>
    </motion.div>
  );
}

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <>
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setOpen(true)}
          className="btn-green fixed right-4 bottom-4 z-40 flex items-center justify-center gap-2"
          aria-label="Abrir contacto de WhatsApp"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="sm:inline hidden text-xs tracking-wider uppercase font-medium">WhatsApp</span>
        </motion.button>

        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="bg-background border-t border-border">
            <div className="mx-auto w-full max-w-md px-4 py-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-lg text-foreground">Contacto</h2>
                <DrawerClose asChild>
                  <button
                    aria-label="Cerrar"
                    className="grid h-9 w-9 place-items-center rounded-lg border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </DrawerClose>
              </div>
              <ContactPanel onClose={() => setOpen(false)} selectedMessage={null} />
            </div>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return (
    <>
      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(true)}
        className="btn-green fixed right-6 bottom-6 z-40 flex items-center justify-center gap-3"
        aria-label="Abrir contacto de WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="text-xs tracking-wider uppercase font-medium">WhatsApp</span>
      </motion.button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-96 gap-0 border-border bg-gradient-to-br from-background to-background/95 backdrop-blur-xl">
          <div className="absolute top-4 right-4">
            <DialogClose asChild>
              <button
                aria-label="Cerrar"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </DialogClose>
          </div>
          <div className="pt-4 pb-6 px-6">
            <ContactPanel onClose={() => setOpen(false)} selectedMessage={null} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

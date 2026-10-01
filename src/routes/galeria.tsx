import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useMemo, useState } from "react";

import { Reveal } from "@/components/site/Reveal";
import { FinalCta } from "@/components/site/FinalCta";
import { usePhotos } from "@/lib/content";
import { photoCategories } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galería — Instantes imposibles | GALES ILUSIONISTA" },
      {
        name: "description",
        content:
          "Fotografías de escenario, close up, empresas, bodas y público en los espectáculos de Gales Ilusionista.",
      },
      { property: "og:title", content: "Galería — Instantes imposibles" },
      {
        property: "og:description",
        content: "Escenario, close up, empresas, bodas y público en imágenes.",
      },
    ],
  }),
  component: Galeria,
});

function Galeria() {
  const { items } = usePhotos();
  const [filter, setFilter] = useState("Todos");
  const [open, setOpen] = useState<string | null>(null);

  const filtered = useMemo(
    () => items.filter((p) => filter === "Todos" || p.category === filter),
    [items, filter],
  );

  return (
    <main>
      <section className="px-6 pt-40 pb-14 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow text-primary">Galería</span>
          <h1 className="mt-5 font-display text-5xl leading-[0.95] font-bold text-white sm:text-8xl">
            Instantes imposibles
          </h1>
        </Reveal>
      </section>

      <section className="px-6 pb-28 sm:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {["Todos", ...photoCategories].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={cn(
                  "border px-5 py-2.5 font-theatre text-[0.65rem] tracking-[0.25em] uppercase transition-all duration-300",
                  filter === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {filtered.length > 0 ? (
              filtered.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i, 6) * 0.04}>
                  <button
                    type="button"
                    onClick={() => setOpen(p.image_url)}
                    onContextMenu={(e) => e.preventDefault()}
                    className="group relative block w-full overflow-hidden border border-border"
                  >
                    <img
                      src={p.image_url}
                      alt={p.title}
                      loading="lazy"
                      draggable={false}
                      className="no-save w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 flex items-end bg-gradient-to-t from-background/90 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="text-left">
                        <span className="eyebrow block text-primary">{p.category}</span>
                        <span className="mt-1 block font-display text-2xl text-white">{p.title}</span>
                      </span>
                    </span>
                  </button>
                </Reveal>
              ))
            ) : (
              <Reveal className="col-span-full flex flex-col items-center justify-center gap-6 py-24">
                <span className="eyebrow text-primary">Galería</span>
                <h2 className="font-display text-4xl text-white">Próximamente</h2>
                <p className="text-center text-muted-foreground max-w-md">
                  Estamos recopilando los mejores momentos de esta categoría. Vuelve pronto.
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] grid place-items-center bg-background/97 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            onContextMenu={(e) => e.preventDefault()}
          >
            <button
              type="button"
              aria-label="Cerrar"
              className="absolute top-6 right-6 grid h-11 w-11 place-items-center border border-border text-foreground hover:border-primary hover:text-primary"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={open}
              alt=""
              draggable={false}
              className="no-save max-h-[85vh] max-w-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <FinalCta />
    </main>
  );
}

import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Play, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { Reveal } from "./Reveal";
import { useVideos, type VideoItem } from "@/lib/content";
import { videoCategories } from "@/lib/site";
import { cn } from "@/lib/utils";

export function VideoLibrary({
  withSearch = false,
  editorial = false,
}: {
  withSearch?: boolean;
  editorial?: boolean;
}) {
  const { items } = useVideos();
  const [filter, setFilter] = useState<string>("Todos");
  const [term, setTerm] = useState("");
  const [active, setActive] = useState<VideoItem | null>(null);

  const filtered = useMemo(
    () =>
      items.filter(
        (v) =>
          (filter === "Todos" || v.category === filter) &&
          v.title.toLowerCase().includes(term.trim().toLowerCase()),
      ),
    [items, filter, term],
  );

  return (
    <div>
      {withSearch && (
        <div className="mx-auto mb-8 flex max-w-xl items-center gap-3 border border-border bg-surface px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Buscar un vídeo por su nombre"
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
      )}

      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {["Todos", ...videoCategories].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={cn(
              "border px-5 py-2.5 font-theatre text-[0.65rem] tracking-[0.25em] uppercase transition-all duration-300",
              filter === cat
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-foreground",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div
        className={cn(
          "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
          editorial && "lg:grid-flow-dense",
        )}
      >
        {filtered.map((video, i) => (
          <Reveal
            key={video.id}
            delay={Math.min(i, 5) * 0.05}
            className={cn(editorial && i % 3 === 0 && "sm:col-span-2 lg:row-span-2")}
          >
            <button
              type="button"
              onClick={() => setActive(video)}
              className={cn(
                "group relative block w-full overflow-hidden border border-border bg-card text-left transition-colors duration-300 hover:border-primary",
                editorial && "h-full",
              )}
            >
              <div
                className={cn(
                  "relative aspect-video overflow-hidden",
                  editorial && i % 3 === 0 && "lg:aspect-auto lg:h-[calc(100%-6.5rem)]",
                )}
              >
                {video.thumbnail_url ? (
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-50"
                  />
                ) : (
                  <div className="h-full w-full bg-surface" />
                )}
                <span className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-primary">
                    <Play className="h-5 w-5 fill-current text-primary-foreground" />
                  </span>
                </span>
                {video.duration && (
                  <span className="absolute right-3 bottom-3 bg-background/80 px-2 py-1 text-[0.65rem] tracking-widest text-foreground">
                    {video.duration}
                  </span>
                )}
              </div>
              <div className="p-5">
                <span className="eyebrow text-primary">{video.category}</span>
                <h3 className="mt-2 font-display text-2xl text-foreground">{video.title}</h3>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-muted-foreground">
          No hay vídeos en esta categoría todavía.
        </p>
      )}

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[90] overflow-y-auto bg-background/97 px-4 py-16 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Cerrar"
              className="fixed top-6 right-6 grid h-11 w-11 place-items-center border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mx-auto max-w-5xl">
              <div className="aspect-video w-full border border-border bg-black">
                {active.video_url ? (
                  active.video_url.includes("youtube") || active.video_url.includes("vimeo") ? (
                    <iframe
                      src={active.video_url}
                      title={active.title}
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  ) : (
                    <video src={active.video_url} controls playsInline className="h-full w-full" />
                  )
                ) : (
                  <div className="grid h-full w-full place-items-center text-center">
                    {active.thumbnail_url && (
                      <img
                        src={active.thumbnail_url}
                        alt={active.title}
                        className="absolute inset-0 h-0 w-0 opacity-0"
                      />
                    )}
                    <p className="px-6 text-sm text-muted-foreground">
                      Vídeo de ejemplo. Sube el archivo real desde el panel de administración.
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0">
                  <span className="eyebrow text-primary">
                    {active.category}
                    {active.location ? ` · ${active.location}` : ""}
                  </span>
                  <h3 className="mt-2 font-display text-4xl text-foreground">{active.title}</h3>
                  {active.description && (
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {active.description}
                    </p>
                  )}
                </div>
                <Link
                  to="/contacto"
                  onClick={() => setActive(null)}
                  className="btn-red shrink-0"
                >
                  Reservar
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

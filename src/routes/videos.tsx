import { createFileRoute } from "@tanstack/react-router";

import { Reveal } from "@/components/site/Reveal";
import { VideoLibrary } from "@/components/site/VideoLibrary";
import { FinalCta } from "@/components/site/FinalCta";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Videoteca oficial — GALES ILUSIONISTA" },
      {
        name: "description",
        content:
          "Todos los vídeos de Gales Ilusionista: empresas, bodas, teatros, close up y televisión. Busca y reproduce cada espectáculo.",
      },
      { property: "og:title", content: "Videoteca oficial — GALES ILUSIONISTA" },
      {
        property: "og:description",
        content: "Empresas, bodas, teatros, close up y televisión en una sola videoteca.",
      },
    ],
  }),
  component: Videos,
});

function Videos() {
  return (
    <main>
      <section className="px-6 pt-40 pb-16 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow text-primary">Streaming</span>
          <h1 className="mt-5 font-display text-5xl leading-[0.95] font-bold text-white sm:text-8xl">
            Videoteca oficial
          </h1>
          <p className="mt-6 text-muted-foreground">
            Busca por nombre, filtra por categoría y entra en cada espectáculo a pantalla completa.
          </p>
        </Reveal>
      </section>

      <section className="px-6 pb-28 sm:px-8">
        <div className="mx-auto max-w-[1300px]">
          <VideoLibrary withSearch />
        </div>
      </section>

      <FinalCta />
    </main>
  );
}

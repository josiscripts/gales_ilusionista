import { createFileRoute } from "@tanstack/react-router";

import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StarDivider } from "@/components/site/StarDivider";
import { FinalCta } from "@/components/site/FinalCta";
import { images } from "@/lib/site";

export const Route = createFileRoute("/sobre-gales")({
  head: () => ({
    meta: [
      { title: "Sobre Gales — La historia detrás de la ilusión" },
      {
        name: "description",
        content:
          "Biografía, filosofía, trayectoria y premios del ilusionista Gales. Quince años convirtiendo el asombro en un lenguaje.",
      },
      { property: "og:title", content: "Sobre Gales — La historia detrás de la ilusión" },
      {
        property: "og:description",
        content: "Biografía, filosofía y trayectoria del ilusionista Gales.",
      },
    ],
  }),
  component: SobreGales,
});

const trayectoria = [
  { año: "2011", texto: "Primeras actuaciones de cartomagia en salas pequeñas de Madrid." },
  { año: "2014", texto: "Debuta en circuito de galas corporativas por toda España." },
  { año: "2017", texto: "Estrena su primer espectáculo completo de teatro." },
  { año: "2020", texto: "Crea un formato íntimo para audiencias reducidas y transmisión en directo." },
  { año: "2023", texto: "Gira nacional con más de setenta funciones y lleno absoluto." },
  { año: "2026", texto: "Nueva producción de gran formato en preparación." },
];

const premios = [
  "Premio Nacional de Magia de Cerca — Finalista",
  "Mejor Espectáculo de Escenario, Festival de Ilusionismo de Levante",
  "Reconocimiento del público, Ciclo Magia en el Teatro",
];

const medios = ["El Diario Cultural", "Radio Escena", "Revista Espectáculo", "Canal Sur Noche"];

function SobreGales() {
  return (
    <main>
      <section className="relative flex min-h-[90vh] items-end overflow-hidden">
        <img
          src={images.galBackstage}
          alt="Retrato de Gales entre bastidores"
          width={900}
          height={1300}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/40" />
        <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 pb-24 sm:px-8">
          <Reveal>
            <span className="eyebrow text-primary">El artista</span>
            <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[0.95] font-bold text-white sm:text-8xl">
              La historia detrás de la ilusión
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <span className="eyebrow text-primary">Biografía</span>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                Gales creció en una casa donde nunca pasaba nada extraordinario, y quizá por eso
                decidió fabricar lo extraordinario él mismo. A los once años cambió su bicicleta por
                un libro de magia que apenas entendía. A los diecisiete ya ensayaba seis horas
                diarias frente a un espejo que le devolvía todos sus errores.
              </p>
              <p>
                Su carrera no empezó en un teatro, sino en mesas de restaurante, entre platos y
                conversaciones a medias. Allí aprendió lo más difícil: mirar a alguien a los ojos y
                sostener su atención sin más recurso que las manos, el ritmo y la palabra justa.
              </p>
              <p>
                Hoy pasa del salón íntimo al gran escenario con la misma naturalidad. Pero, se
                presente donde se presente, su objetivo sigue siendo exactamente el mismo que
                aquella primera noche: provocar ese segundo de silencio que nadie olvida.
              </p>
            </div>

            <h2 className="mt-16 font-display text-4xl text-white">Filosofía</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              La magia no consiste en engañar a nadie. Consiste en devolverle a un adulto la
              sensación de no entender el mundo, esa que perdió hace demasiado tiempo. Por eso Gales
              trabaja el asombro como un director trabaja una escena: cuidando la luz, el silencio y
              el momento exacto en el que todo se detiene.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <img
              src={images.aboutGales}
              alt="Gales sosteniendo una carta"
              loading="lazy"
              width={1024}
              height={1536}
              className="w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      <StarDivider />

      <section className="bg-surface px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-[1100px]">
          <SectionHeading eyebrow="Recorrido" title="Trayectoria" align="left" />
          <div className="mt-12 grid gap-px bg-border sm:grid-cols-2">
            {trayectoria.map((t, i) => (
              <Reveal key={t.año} delay={i * 0.05}>
                <div className="h-full bg-surface p-8">
                  <span className="font-theatre text-sm tracking-[0.3em] text-primary">{t.año}</span>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{t.texto}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-20 grid gap-14 md:grid-cols-2">
            <Reveal>
              <h2 className="font-display text-4xl text-white">Premios</h2>
              <ul className="mt-6 space-y-4">
                {premios.map((p) => (
                  <li key={p} className="flex gap-3 text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl text-white">Medios</h2>
              <ul className="mt-6 space-y-4">
                {medios.map((m) => (
                  <li key={m} className="flex gap-3 text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary" />
                    {m}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-[1300px]">
          <SectionHeading eyebrow="Editorial" title="Instantes de escena" />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[images.instante1, images.instante2, images.instante3, images.instante4].map(
              (src, i) => (
                <Reveal key={src} delay={i * 0.06}>
                  <div className="overflow-hidden border border-border">
                    <img
                      src={src}
                      alt="Fotografía editorial del espectáculo"
                      loading="lazy"
                      className="h-80 w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}

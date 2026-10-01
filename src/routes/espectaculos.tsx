import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { StarDivider } from "@/components/site/StarDivider";
import { FinalCta } from "@/components/site/FinalCta";
import { images } from "@/lib/site";

export const Route = createFileRoute("/espectaculos")({
  head: () => ({
    meta: [
      { title: "Espectáculos — Magia para empresas, bodas y teatros | GALES" },
      {
        name: "description",
        content:
          "Formatos de espectáculo de Gales Ilusionista: galas y convenciones de empresa, bodas, eventos privados y grandes producciones de teatro.",
      },
      { property: "og:title", content: "Espectáculos para cada ocasión — GALES ILUSIONISTA" },
      {
        property: "og:description",
        content: "Empresas, bodas, eventos privados y teatros. Un formato para cada momento.",
      },
    ],
  }),
  component: Espectaculos,
});

const bloques = [
  {
    titulo: "Empresas",
    img: images.expEmpresas,
    texto:
      "Galas, ferias, convenciones y presentaciones de producto. El mensaje de la compañía se integra dentro de la propia magia, de modo que lo que el equipo recuerda no es una charla más: es el momento en el que el logotipo apareció donde nadie podía haberlo puesto.",
    ventajas: [
      "Guion adaptado a la marca y al mensaje del evento",
      "Formatos de 20, 45 o 60 minutos",
      "Magia itinerante durante el cóctel o show de escenario",
    ],
  },
  {
    titulo: "Bodas",
    img: images.expPrivados,
    texto:
      "Magia de cerca durante la recepción, sorpresas en el banquete y un momento imposible después del baile. Gales trabaja con vuestro timing, sin robar protagonismo y sin interrumpir a nadie.",
    ventajas: [
      "Magia entre invitados en recepción y banquete",
      "Numero personalizado con la historia de la pareja",
      "Coordinación directa con vuestro wedding planner",
    ],
  },
  {
    titulo: "Eventos privados",
    img: images.galBodas,
    texto:
      "Cumpleaños, comuniones, aniversarios y celebraciones íntimas. Un formato cercano, elegante y pensado para grupos reducidos donde todo ocurre a un palmo de las manos.",
    ventajas: [
      "Ideal para grupos de 10 a 120 personas",
      "Sin necesidad de escenario ni sonido complejo",
      "Adaptable a interiores y exteriores",
    ],
  },
  {
    titulo: "Teatros",
    img: images.expTeatros,
    texto:
      "Gran producción, ilusiones de escenario, iluminación diseñada y una dramaturgia que sostiene setenta y cinco minutos sin un solo hueco. El formato más ambicioso del repertorio.",
    ventajas: [
      "Producción completa con equipo técnico propio",
      "Grandes ilusiones y escenografía original",
      "Rider adaptable a cada sala",
    ],
  },
];

function Espectaculos() {
  return (
    <main>
      <section className="relative flex min-h-[80vh] items-center overflow-hidden">
        <img
          src={images.stageCta}
          alt="Escenario de teatro con humo rojo"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 pt-28 sm:px-8">
          <Reveal>
            <span className="eyebrow text-primary">Formatos</span>
            <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[0.95] font-bold text-white sm:text-8xl">
              Espectáculos para cada ocasión
            </h1>
          </Reveal>
        </div>
      </section>

      {bloques.map((b, i) => (
        <section key={b.titulo} className={i % 2 === 1 ? "bg-surface" : ""}>
          <div className="mx-auto grid max-w-[1300px] items-center gap-14 px-6 py-24 sm:px-8 lg:grid-cols-2">
            <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
              <div className="overflow-hidden border border-border">
                <img
                  src={b.img}
                  alt={b.titulo}
                  loading="lazy"
                  className="h-[480px] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="eyebrow text-primary">Formato {String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-4 font-display text-4xl text-white sm:text-6xl">{b.titulo}</h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">{b.texto}</p>
              <ul className="mt-8 space-y-3">
                {b.ventajas.map((v) => (
                  <li key={v} className="flex gap-3 text-sm text-foreground/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {v}
                  </li>
                ))}
              </ul>
              <Link
                to="/contacto"
                className="btn-red mt-10"
              >
                Solicitar propuesta
              </Link>
            </Reveal>
          </div>
        </section>
      ))}

      <StarDivider />
      <FinalCta />
    </main>
  );
}

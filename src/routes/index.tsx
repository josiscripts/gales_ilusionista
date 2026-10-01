import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { Award, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { VideoLibrary } from "@/components/site/VideoLibrary";
import { FinalCta } from "@/components/site/FinalCta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { images } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GALES ILUSIONISTA — La magia no se observa. Se vive." },
      {
        name: "description",
        content:
          "Espectáculo premium de ilusionismo para empresas, bodas, eventos privados y teatros. Descubre la experiencia GALES.",
      },
      { property: "og:title", content: "GALES ILUSIONISTA — La magia no se observa. Se vive." },
      {
        property: "og:description",
        content: "Espectáculo premium de ilusionismo para empresas, bodas y grandes teatros.",
      },
    ],
  }),
  component: Home,
});

const marcas = [
  "SANTIAGO GROUP",
  "NOVA MEDIA",
  "GRAN TEATRO",
  "AURELIA",
  "VELVET EVENTS",
  "IBERTECH",
  "CASA REAL DE FIESTAS",
];

const experiencias = [
  {
    titulo: "Empresas",
    en: "Corporate",
    img: images.expEmpresas,
    texto:
      "Galas, convenciones y ferias donde la marca se convierte en parte del truco. Impacto medido, elegancia absoluta.",
  },
  {
    titulo: "Eventos privados",
    en: "Private events",
    img: images.expPrivados,
    texto:
      "Bodas, cumpleaños, comuniones y celebraciones VIP. Magia de cerca entre los invitados, sin escenario y sin distancia.",
  },
  {
    titulo: "Teatros",
    en: "Stage",
    img: images.expTeatros,
    texto:
      "Grandes escenarios, producción completa y las ilusiones más ambiciosas del repertorio de Gales.",
  },
];

const testimonios = [
  {
    texto:
      "Nunca había visto a 600 directivos en silencio absoluto. Y después, en pie. Gales cambió por completo el tono de la noche.",
    nombre: "Marta Ruiz",
    tipo: "Convención anual",
  },
  {
    texto:
      "Pasó entre las mesas durante el cóctel y todavía hoy nuestros invitados nos preguntan cómo lo hizo.",
    nombre: "Álvaro y Nuria",
    tipo: "Boda en Sevilla",
  },
  {
    texto:
      "Elegancia, ritmo y emoción. No es un mago haciendo trucos: es un artista contando una historia.",
    nombre: "Javier Peña",
    tipo: "Teatro Gran Vía",
  },
];

const faqs = [
  {
    q: "¿En qué ciudades actúa?",
    a: "Gales actúa en toda España y viaja habitualmente a Europa y Latinoamérica. El desplazamiento y la logística se organizan desde su equipo, sin que tengas que preocuparte de nada.",
  },
  {
    q: "¿Cuánto dura el espectáculo?",
    a: "Depende del formato: la magia itinerante entre invitados suele ocupar entre 60 y 90 minutos, el show de escenario 45 minutos y la producción completa de teatro alrededor de 75 minutos.",
  },
  {
    q: "¿Es para empresas?",
    a: "Sí. Es uno de sus formatos más solicitados: galas, convenciones, ferias y presentaciones de producto, con la marca del cliente integrada dentro de la propia magia.",
  },
  {
    q: "¿Se adapta a bodas?",
    a: "Completamente. Recepción, banquete o momento sorpresa después del baile: el espectáculo se diseña a medida del ritmo de vuestro día.",
  },
  {
    q: "¿Cómo reservar?",
    a: "Escríbenos desde la página de contacto o por WhatsApp con la fecha, la ciudad y el tipo de evento. Recibirás una propuesta personalizada en menos de 24 horas.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function Home() {
  const [testimonio, setTestimonio] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setTestimonio((v) => (v + 1) % testimonios.length), 6000);
    return () => window.clearInterval(id);
  }, []);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(heroP, [0, 1], ["0%", "10%"]);
  const textY = useTransform(heroP, [0, 1], [0, 120]);
  const textO = useTransform(heroP, [0, 0.7], [1, 0]);

  const impRef = useRef<HTMLElement>(null);
  const { scrollYProgress: impP } = useScroll({ target: impRef, offset: ["start end", "end start"] });
  const cardRX = useTransform(impP, [0, 0.5, 1], [35, 0, -20]);
  const cardRY = useTransform(impP, [0, 0.5, 1], [-30, -8, 25]);
  const cardS = useTransform(impP, [0, 0.5, 1], [0.8, 1, 0.92]);
  const cardY = useTransform(impP, [0, 1], [80, -80]);

  return (
    <main>
      {/* HERO */}
      <section ref={heroRef} className="grain relative flex min-h-[100svh] items-end justify-center overflow-hidden pb-[9svh]">
        <motion.img
          src={images.heroGales}
          alt="Gales, ilusionista, con una cuerda en un teatro envuelto en humo"
          width={1738}
          height={905}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease }}
          style={{ y: bgY }}
          className="absolute inset-0 h-full w-full object-cover object-[50%_20%]"
        />
        <div className="absolute inset-0 bg-background/15" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_80%,color-mix(in_oklab,var(--color-background)_85%,transparent),transparent_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/70 to-transparent" />

        <motion.div style={{ y: textY, opacity: textO }} className="relative z-10 w-full max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease }}
            className="flex items-center justify-center gap-3 text-[0.62rem] font-medium tracking-[0.4em] text-foreground/75 uppercase sm:text-[0.68rem]"
          >
            <span className="h-px w-6 bg-primary" />
            Ilusionista · Magia · Experiencias
            <span className="h-px w-6 bg-primary" />
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 1.1, ease }}
            className="mt-4 font-display text-[5.5rem] leading-[0.85] font-semibold tracking-tight text-foreground [text-shadow:0_0_40px_rgb(0_0_0/0.45)] sm:text-[9rem] lg:text-[11rem]"
          >
            GALES
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.9, ease }}
            className="mt-2 pl-[0.55em] text-sm font-semibold tracking-[0.55em] text-primary uppercase sm:text-base"
          >
            Ilusionista
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease }}
            className="mt-6 font-display text-2xl leading-snug text-foreground/90 italic sm:text-3xl"
          >
            “La magia no se observa.
            <br />
            Se vive.”
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.55, duration: 0.7, ease }}
            className="mx-auto mt-9 flex max-w-xs flex-col gap-4 sm:max-w-none sm:flex-row sm:justify-center"
          >
            <a href="https://wa.me/34605228133?text=Hola%20Gales%2C%20quiero%20reservar%20un%20espect%C3%A1culo.%20Me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20disponibilidad%20y%20opciones." target="_blank" rel="noreferrer" className="btn-red">
              Reservar espectáculo
            </a>
            <a href="#showreel" className="btn-glass">
              <Play className="h-4 w-4 fill-current" /> Ver showreel
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* MANIFIESTO */}
      <section className="px-6 py-40 sm:px-8 lg:py-56">
        <div className="mx-auto max-w-[1300px] text-center">
          <Reveal>
            <h2 className="font-display text-5xl leading-none text-foreground sm:text-7xl lg:text-8xl">
              No hacemos trucos.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 font-display text-3xl text-primary italic sm:text-5xl lg:text-6xl">
              Creamos momentos imposibles.
            </p>
          </Reveal>
        </div>
      </section>

      {/* EXPERIENCIAS */}
      <section id="experiencias" className="scroll-mt-20 border-t border-border">
        <div className="grid md:grid-cols-3">
          {experiencias.map((e, i) => (
            <Reveal key={e.titulo} delay={i * 0.1}>
              <article className="group relative h-[70vh] min-h-[460px] overflow-hidden border-b border-border md:h-[85vh] md:border-r md:border-b-0">
                <img
                  src={e.img}
                  alt={e.titulo}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10 transition-colors duration-500" />
                <div className="absolute inset-0 bg-background/0 transition-colors duration-500 group-hover:bg-background/40" />
                <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                  <span className="text-[0.65rem] font-medium tracking-[0.35em] text-muted-foreground uppercase">
                    0{i + 1} — {e.en}
                  </span>
                  <h3 className="mt-3 font-display text-4xl text-foreground transition-transform duration-500 group-hover:-translate-y-2 lg:text-5xl">
                    {e.titulo}
                  </h3>
                  <span className="mt-4 block h-px w-0 bg-primary transition-all duration-700 group-hover:w-24" />
                  <p className="mt-5 max-w-sm text-sm leading-relaxed text-foreground/75">{e.texto}</p>
                  <Link
                    to="/espectaculos"
                    className="mt-6 inline-block text-[0.68rem] font-medium tracking-[0.3em] text-primary uppercase"
                  >
                    Descubrir →
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SHOWREEL */}
      <section id="showreel" className="scroll-mt-20 px-4 py-32 sm:px-8">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-[0.68rem] font-medium tracking-[0.4em] text-primary uppercase">Showreel</span>
              <h2 className="mt-4 font-display text-4xl leading-tight text-foreground italic sm:text-6xl">
                “Una experiencia que no se explica.
                <br />
                Se vive.”
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="group relative aspect-[16/9] overflow-hidden lg:aspect-[21/9]">
              <img
                src={images.showreelCover}
                alt="Showreel de Gales Ilusionista"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-background/45" />
              <button type="button" className="absolute inset-0 grid place-items-center" aria-label="Reproducir showreel">
                <span className="red-glow grid h-24 w-24 place-items-center rounded-full border border-foreground/40 bg-primary/90 lg:h-28 lg:w-28">
                  <Play className="ml-1 h-8 w-8 fill-current text-primary-foreground" />
                </span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EL IMPOSIBLE */}
      <section ref={impRef} className="overflow-hidden border-y border-border bg-surface px-6 py-32 sm:px-8 lg:py-40">
        <div className="mx-auto grid max-w-[1300px] items-center gap-16 lg:grid-cols-2">
          <div className="flex justify-center [perspective:1200px]">
            <motion.div
              style={{ rotateX: cardRX, rotateY: cardRY, scale: cardS, y: cardY }}
              className="relative aspect-[2.5/3.5] w-60 overflow-hidden border border-primary/50 shadow-[0_40px_80px_-30px_var(--color-primary)] sm:w-72"
            >
              <img src={images.closeupHands} alt="Las manos de Gales con una carta" loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-foreground/10" />
            </motion.div>
          </div>
          <Reveal>
            <span className="text-[0.68rem] font-medium tracking-[0.4em] text-primary uppercase">El imposible</span>
            <h2 className="mt-6 font-display text-5xl leading-[0.95] text-foreground sm:text-7xl">
              ¿Y si lo imposible
              <br />
              <em className="text-primary">estuviera frente a ti?</em>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* SOBRE GALES */}
      <section className="px-6 py-32 sm:px-8">
        <div className="mx-auto grid max-w-[1300px] items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <img
              src={images.aboutGales}
              alt="Retrato editorial de Gales"
              loading="lazy"
              width={1024}
              height={1536}
              className="w-full object-cover"
            />
          </Reveal>
          <div>
            <Reveal>
              <span className="text-[0.68rem] font-medium tracking-[0.4em] text-primary uppercase">Sobre Gales</span>
              <h2 className="mt-5 font-display text-4xl leading-[1.05] text-foreground sm:text-6xl">
                Más que magia.
                <br />
                <em>Una experiencia inolvidable.</em>
              </h2>
              <div className="mt-8 space-y-5 leading-relaxed text-muted-foreground">
                <p>
                  Empezó con una baraja prestada y un salón lleno de tíos escépticos. Aquella noche
                  Gales descubrió algo que ya no le abandonaría: el silencio exacto que se hace
                  medio segundo antes de que alguien entienda que lo que acaba de ver no debería
                  haber ocurrido.
                </p>
                <p>
                  Desde entonces ha perseguido ese silencio en salones íntimos, en galas para
                  cientos de personas y sobre los escenarios de algunos de los teatros más
                  importantes del país. No colecciona trucos: construye momentos.
                </p>
              </div>
            </Reveal>
            <div className="mt-14 grid grid-cols-3 border-t border-border pt-10">
              {[
                { n: "+850", l: "Espectáculos" },
                { n: "15", l: "Años de escena" },
                { n: "+400", l: "Clientes" },
              ].map((s, i) => (
                <Reveal key={s.l} delay={i * 0.08}>
                  <p className="font-display text-5xl text-foreground sm:text-6xl">{s.n}</p>
                  <p className="mt-2 text-[0.62rem] font-medium tracking-[0.25em] text-muted-foreground uppercase">
                    {s.l}
                  </p>
                </Reveal>
              ))}
            </div>
            <Link to="/sobre-gales" className="mt-10 inline-block text-[0.68rem] font-medium tracking-[0.3em] text-primary uppercase">
              Conocer a Gales →
            </Link>
          </div>
        </div>
      </section>

      {/* VIDEOTECA */}
      <section className="bg-surface px-6 py-32 sm:px-8">
        <div className="mx-auto max-w-[1300px]">
          <SectionHeading
            eyebrow="Videoteca"
            title="Todos los espectáculos"
            intro="Empresas, bodas, teatros, close up y televisión. Elige un formato y entra dentro."
          />
          <div className="mt-14">
            <VideoLibrary editorial />
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/videos"
              className="inline-block border border-border px-8 py-4 text-[0.68rem] font-medium tracking-[0.3em] text-foreground uppercase transition-colors hover:border-primary hover:text-primary"
            >
              Ver la videoteca completa
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="px-6 py-36 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-[0.68rem] font-medium tracking-[0.4em] text-primary uppercase">Lo que recuerda el público</span>
          <div className="relative mt-12 min-h-[300px] sm:min-h-[260px]">
            {testimonios.map((t, i) => (
              <motion.figure
                key={t.nombre}
                initial={false}
                animate={{ opacity: testimonio === i ? 1 : 0, y: testimonio === i ? 0 : 12 }}
                transition={{ duration: 0.8, ease }}
                className="absolute inset-0"
                aria-hidden={testimonio !== i}
              >
                <blockquote className="font-display text-3xl leading-snug text-foreground italic sm:text-5xl">
                  “{t.texto}”
                </blockquote>
                <figcaption className="mt-8 text-sm text-foreground">
                  {t.nombre} <span className="text-primary">—</span>{" "}
                  <span className="text-muted-foreground">{t.tipo}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
          <div className="mt-8 flex justify-center gap-3">
            {testimonios.map((t, i) => (
              <button
                key={t.nombre}
                type="button"
                onClick={() => setTestimonio(i)}
                aria-label={`Testimonio ${i + 1}`}
                className={`h-px w-10 transition-colors ${testimonio === i ? "bg-primary" : "bg-border"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border px-6 py-28 sm:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <span className="text-[0.68rem] font-medium tracking-[0.4em] text-primary uppercase">Dudas</span>
            <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl">Preguntas frecuentes</h2>
            <p className="mt-6 flex items-center gap-3 text-muted-foreground">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-xs tracking-[0.2em] uppercase">Respuesta en menos de 24 h</span>
            </p>
          </div>
          <Accordion type="single" collapsible>
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-border">
                <AccordionTrigger className="py-6 text-left font-display text-2xl text-foreground hover:text-primary hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}

import heroGales from "@/assets/hero-gales.png";
import imagen1 from "@/assets/imagen_1.jpeg";
import imagen2 from "@/assets/imagen_2.jpeg";
import imagen4 from "@/assets/imagen_4.jpeg";
import imagen6 from "@/assets/imagen_6.jpeg";
import imagen7 from "@/assets/imagen_7.jpeg";
import imagen8 from "@/assets/imagen_8.jpeg";
import imagen9 from "@/assets/imagen_9.jpeg";
import imagen10 from "@/assets/imagen_10.jpeg";
import imagen11 from "@/assets/imagen_11.jpeg";
import imagen12 from "@/assets/imagen_12.jpeg";
import imagen13 from "@/assets/imagen_13.jpeg";
import imagen14 from "@/assets/imagen_14.jpeg";
import imagen15 from "@/assets/imagen_15.jpeg";
import imagen16 from "@/assets/imagen_16.jpeg";
import imagen17 from "@/assets/imagen_17.jpeg";
import imagen18 from "@/assets/imagen_18.jpeg";
import imagen19 from "@/assets/imagen_19.jpeg";
import imagen20 from "@/assets/imagen_20.jpeg";
import imagen21 from "@/assets/imagen_21.jpeg";

// Legacy imports - mantener para compatibilidad
import stageCta from "@/assets/stage-cta.jpg";
import showreelCover from "@/assets/showreel-cover.jpg";
import closeupHands from "@/assets/closeup-hands.jpg";

export const images = {
  heroGales,
  aboutGales: imagen21,
  expEmpresas: imagen7,
  expPrivados: imagen2,
  expTeatros: imagen6,
  stageCta: stageCta,
  showreelCover: showreelCover,
  galPublico: imagen2,
  galEscenario: imagen8,
  galBodas: imagen2,
  galBackstage: imagen21,
  // Nuevas imágenes para Sobre Gales - Instantes
  instante1: imagen8,
  instante2: imagen12,
  instante3: imagen11,
  instante4: imagen19,
};

/** Datos de contacto provisionales: sustituir por los reales. */
export const contact = {
  phoneDisplay: "+34 600 000 000",
  whatsapp: "https://wa.me/34600000000",
  email: "hola@galesilusionista.com",
  instagram: "https://instagram.com/galesilusionista",
  instagramHandle: "@galesilusionista",
  city: "Madrid, España",
};

export const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/sobre-gales", label: "Sobre Gales" },
  { to: "/espectaculos", label: "Espectáculos" },
  { to: "/videos", label: "Multimedia" },
  { to: "/galeria", label: "Galería" },
  { to: "/contacto", label: "Contacto" },
] as const;

export const videoCategories = ["Empresas", "Bodas", "Teatros", "Close Up", "Plato de Televisión"] as const;
export const photoCategories = ["Escenario", "Close Up", "Empresas", "Bodas", "Público"] as const;
export const galleryCategories = photoCategories;

export type DemoVideo = {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  location: string;
  thumbnail_url: string;
  video_url: string;
};

export const demoVideos: DemoVideo[] = [
  {
    id: "demo-1",
    title: "Gala anual — Auditorio Nacional",
    category: "Teatros",
    description: "Una gran ilusión de escenario ante 1.800 personas, con producción completa.",
    duration: "04:12",
    location: "Madrid",
    thumbnail_url: imagen20,
    video_url: "",
  },
  {
    id: "demo-2",
    title: "Convención tecnológica",
    category: "Empresas",
    description: "Apertura de convención con la marca del cliente integrada en la magia.",
    duration: "02:48",
    location: "Barcelona",
    thumbnail_url: imagen16,
    video_url: "",
  },
  {
    id: "demo-3",
    title: "Cóctel de boda",
    category: "Bodas",
    description: "Magia de cerca entre los invitados durante la recepción.",
    duration: "03:20",
    location: "Sevilla",
    thumbnail_url: imagen2,
    video_url: "",
  },
  {
    id: "demo-4",
    title: "Cartomagia a un palmo",
    category: "Close Up",
    description: "Las manos, las cartas y nada más. Imposible a diez centímetros.",
    duration: "01:55",
    location: "Valencia",
    thumbnail_url: closeupHands,
    video_url: "",
  },
  {
    id: "demo-5",
    title: "Plató de televisión",
    category: "Plato de Televisión",
    description: "Intervención en directo para un programa de máxima audiencia.",
    duration: "05:02",
    location: "Madrid",
    thumbnail_url: imagen4,
    video_url: "",
  },
];

export const demoPhotos = [
  // ESCENARIO (imagen_6 a imagen_20 — 15 imágenes)
  { id: "g1", title: "Escenario 1", category: "Escenario", image_url: imagen6 },
  { id: "g2", title: "Escenario 2", category: "Escenario", image_url: imagen7 },
  { id: "g3", title: "Escenario 3", category: "Escenario", image_url: imagen8 },
  { id: "g4", title: "Escenario 4", category: "Escenario", image_url: imagen9 },
  { id: "g5", title: "Escenario 5", category: "Escenario", image_url: imagen10 },
  { id: "g6", title: "Escenario 6", category: "Escenario", image_url: imagen11 },
  { id: "g7", title: "Escenario 7", category: "Escenario", image_url: imagen12 },
  { id: "g8", title: "Escenario 8", category: "Escenario", image_url: imagen13 },
  { id: "g9", title: "Escenario 9", category: "Escenario", image_url: imagen14 },
  { id: "g10", title: "Escenario 10", category: "Escenario", image_url: imagen15 },
  { id: "g11", title: "Escenario 11", category: "Escenario", image_url: imagen16 },
  { id: "g12", title: "Escenario 12", category: "Escenario", image_url: imagen17 },
  { id: "g13", title: "Escenario 13", category: "Escenario", image_url: imagen18 },
  { id: "g14", title: "Escenario 14", category: "Escenario", image_url: imagen19 },
  { id: "g15", title: "Escenario 15", category: "Escenario", image_url: imagen20 },
  // EMPRESAS (imagen_1, imagen_2)
  { id: "g16", title: "Evento corporativo 1", category: "Empresas", image_url: imagen1 },
  { id: "g17", title: "Evento corporativo 2", category: "Empresas", image_url: imagen2 },
];

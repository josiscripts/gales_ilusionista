import heroGalesAsset from "@/assets/hero-gales.png.asset.json";
import aboutGalesAsset from "@/assets/gales-about.png.asset.json";
import expEmpresas from "@/assets/exp-empresas.jpg";
import expPrivados from "@/assets/exp-privados.jpg";
import expTeatros from "@/assets/exp-teatros.jpg";
import stageCta from "@/assets/stage-cta.jpg";
import showreelCover from "@/assets/showreel-cover.jpg";
import closeupHands from "@/assets/closeup-hands.jpg";
import galPublico from "@/assets/gal-publico.jpg";
import galEscenario from "@/assets/gal-escenario.jpg";
import galBodas from "@/assets/gal-bodas.jpg";
import galBackstage from "@/assets/gal-backstage.jpg";

export const images = {
  heroGales: heroGalesAsset.url,
  aboutGales: aboutGalesAsset.url,
  expEmpresas,
  expPrivados,
  expTeatros,
  stageCta,
  showreelCover,
  closeupHands,
  galPublico,
  galEscenario,
  galBodas,
  galBackstage,
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
  { to: "/videos", label: "Vídeos" },
  { to: "/galeria", label: "Galería" },
  { to: "/contacto", label: "Contacto" },
] as const;

export const videoCategories = ["Empresas", "Bodas", "Teatros", "Close Up", "TV"] as const;
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
    thumbnail_url: showreelCover,
    video_url: "",
  },
  {
    id: "demo-2",
    title: "Convención tecnológica",
    category: "Empresas",
    description: "Apertura de convención con la marca del cliente integrada en la magia.",
    duration: "02:48",
    location: "Barcelona",
    thumbnail_url: expEmpresas,
    video_url: "",
  },
  {
    id: "demo-3",
    title: "Cóctel de boda",
    category: "Bodas",
    description: "Magia de cerca entre los invitados durante la recepción.",
    duration: "03:20",
    location: "Sevilla",
    thumbnail_url: expPrivados,
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
    category: "TV",
    description: "Intervención en directo para un programa de máxima audiencia.",
    duration: "05:02",
    location: "Madrid",
    thumbnail_url: galEscenario,
    video_url: "",
  },
  {
    id: "demo-6",
    title: "Teatro Gran Vía",
    category: "Teatros",
    description: "Fragmento del espectáculo completo, con público en pie.",
    duration: "06:30",
    location: "Madrid",
    thumbnail_url: expTeatros,
    video_url: "",
  },
];

export const demoPhotos = [
  { id: "p1", title: "Aparición imposible", category: "Escenario", image_url: galEscenario },
  { id: "p2", title: "El público", category: "Público", image_url: galPublico },
  { id: "p3", title: "A un palmo", category: "Close Up", image_url: closeupHands },
  { id: "p4", title: "Sí, quiero magia", category: "Bodas", image_url: galBodas },
  { id: "p5", title: "Gala corporativa", category: "Empresas", image_url: expEmpresas },
  { id: "p6", title: "Antes de salir", category: "Escenario", image_url: galBackstage },
  { id: "p7", title: "Gran teatro", category: "Escenario", image_url: expTeatros },
  { id: "p8", title: "Sobremesa mágica", category: "Bodas", image_url: expPrivados },
  { id: "p9", title: "Retrato", category: "Escenario", image_url: aboutGalesAsset.url },
];

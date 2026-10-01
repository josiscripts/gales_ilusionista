# GALES ILUSIONISTA — Web cinematográfica premium

Sitio en español, 6 páginas, negro absoluto + blanco marfil + rojo #FF0024, con panel privado para gestionar vídeos y galería.

## Identidad

- Colores: #000000 fondo, #080808 secciones, #141414 tarjetas, #F5F5F5 texto, #FFFFFF títulos, #FF0024 acento, #D8001F hover. Sin dorado, azul ni morado.
- Tipografías: Cormorant Garamond (títulos), Cinzel (subtítulos, tracking amplio), Inter (texto).
- Detalles: humo y partículas muy sutiles, destello de estrella roja entre secciones, mucho aire negro.

## Navegación

Barra transparente con logo blanco; al hacer scroll pasa a negro con desenfoque y línea roja de 1px (300 ms). Enlaces: Inicio, Sobre Gales, Espectáculos, Vídeos, Galería, Contacto. A la derecha, botón rojo RESERVAR. Hover: texto rojo con destello inferior. En móvil, menú a pantalla completa.

## Páginas

**Inicio** — 11 bloques en este orden: preloader cinematográfico (2–3 s: sombrero, G, estrella roja, humo, fundido), hero a pantalla completa con parallax de ratón y foto enorme, carrusel infinito de logos en blanco, bloque 50/50 sobre Gales con tres cifras, tres tarjetas gigantes de experiencias (Empresas / Eventos privados / Teatros) con zoom y velo rojo al pasar el ratón, showreel 16:9 con play rojo, videoteca con filtros y lightbox, testimonios en rotación automática, FAQ en acordeón, CTA final a pantalla casi completa con WhatsApp / Instagram / correo, y footer minimalista.

**Sobre Gales** — retrato enorme, "La historia detrás de la ilusión", biografía narrativa, filosofía, trayectoria, premios, medios, galería editorial y CTA. Maquetación tipo revista de lujo.

**Espectáculos** — hero con vídeo de fondo y bloques para Empresas, Bodas, Eventos privados y Teatros; cada uno con imagen, descripción, beneficios y CTA.

**Vídeos** — videoteca tipo plataforma de streaming: buscador por nombre, filtros por categoría (Todos, Empresas, Bodas, Teatros, Close Up, TV), rejilla 3/2/1 columnas con carga progresiva y reproductor a pantalla completa con descripción, ciudad y botón de reserva.

**Galería** — mosaico editorial por categorías (Escenario, Close Up, Empresas, Bodas, Público), lightbox y descarga desactivada (clic derecho y arrastre bloqueados).

**Contacto** — formulario (nombre, empresa opcional, email, teléfono, tipo de evento, fecha, ciudad, mensaje) con validación y aviso de envío, bloque lateral con WhatsApp, correo, Instagram y ubicación, y mapa en tono oscuro.

## Panel de administración

Acceso privado con email y contraseña. Desde ahí se pueden crear, editar y borrar:

- Vídeos: archivo o enlace, miniatura, título, categoría, descripción, duración y ubicación.
- Fotos de galería: imagen, título y categoría.
- Solicitudes recibidas del formulario de contacto, en una lista.

La web pública lee estos contenidos en tiempo real; si aún no hay nada subido, muestra el contenido de ejemplo.

## Contenido provisional

Genero imágenes cinematográficas de marcador (retratos, escenario, close up, bodas, empresas) y textos completos en español. Los vídeos usan miniaturas generadas con reproductor de ejemplo hasta que subas los reales.

Pendiente de ti: el archivo del logotipo (lo integro en barra, preloader y pie) y los datos reales de WhatsApp, correo, Instagram y ciudad. Mientras tanto pongo valores provisionales claramente sustituibles.

## Notas técnicas

- TanStack Start con rutas separadas por página, cada una con su propio título y descripción para buscadores y redes.
- Tokens de color y tipografía definidos en `src/styles.css` (@theme), fuentes cargadas con `<link>` en `__root.tsx`.
- Animaciones con Motion: fade + translateY de 300–500 ms al entrar en pantalla, hover con elevación 3 px y brillo rojo, zoom suave en imágenes.
- Lovable Cloud para autenticación, tablas `videos`, `gallery_photos` y `contact_requests` con RLS (lectura pública de contenidos, escritura solo administrador) y almacenamiento de archivos.
- Rutas del panel protegidas bajo `_authenticated`.

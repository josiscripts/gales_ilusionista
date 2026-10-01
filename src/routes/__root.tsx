import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl font-bold text-primary">404</h1>
        <h2 className="mt-4 font-display text-3xl text-foreground">Esta página se ha esfumado</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Puede que el truco haya salido demasiado bien. Vuelve al inicio.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-primary px-6 py-4 font-theatre text-[0.7rem] tracking-[0.3em] text-primary-foreground uppercase hover:bg-primary-hover"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void; info?: unknown }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-foreground">Esta página no ha cargado</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo ha fallado por nuestra parte. Puedes intentarlo de nuevo o volver al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-primary px-6 py-3 font-theatre text-[0.7rem] tracking-[0.3em] text-primary-foreground uppercase hover:bg-primary-hover"
          >
            Reintentar
          </button>
          <a
            href="/"
            className="border border-border px-6 py-3 font-theatre text-[0.7rem] tracking-[0.3em] text-foreground uppercase hover:border-primary"
          >
            Inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "GALES ILUSIONISTA — Magia de escenario y close up" },
      {
        name: "description",
        content:
          "Espectáculos de ilusionismo para empresas, bodas, eventos privados y teatros. La magia no se observa. Se vive.",
      },
      { name: "author", content: "Gales Ilusionista" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Cinzel:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent as never,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const bare = pathname.startsWith("/admin") || pathname.startsWith("/auth");

  return (
    <QueryClientProvider client={queryClient}>
      {!bare && <Navbar />}
      <Outlet />
      {!bare && <Footer />}
      {!bare && <WhatsAppButton />}
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}

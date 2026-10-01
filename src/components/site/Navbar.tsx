import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Logo } from "./Logo";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-[4%] sm:pt-5">
      <nav
        className={cn(
          "glass-nav mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4 transition-colors duration-300 sm:h-[72px] sm:px-6",
          scrolled && "bg-background/70",
        )}
      >
        <Link to="/" onClick={() => setOpen(false)} aria-label="GALES ILUSIONISTA — Inicio" className="shrink-0">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                className="group relative py-2 text-[0.74rem] font-medium tracking-[0.16em] text-foreground/85 uppercase transition-colors duration-200 hover:text-primary data-[status=active]:text-primary"
                activeProps={{ className: "text-primary [&>span]:w-full" }}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-primary transition-all duration-200 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/contacto"
            className="btn-red btn-red-sm hidden sm:inline-flex"
          >
            Reservar
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-lg border border-border text-foreground lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 top-0 -z-10 pt-24 flex flex-col bg-background px-6 pt-10 lg:hidden">
          <ul className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl text-foreground"
                  activeProps={{ className: "text-primary" }}
                  activeOptions={{ exact: link.to === "/" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/contacto"
            onClick={() => setOpen(false)}
            className="btn-red mt-10"
          >
            Reservar
          </Link>
        </div>
      )}
    </header>
  );
}

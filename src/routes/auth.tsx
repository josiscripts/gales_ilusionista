import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Logo } from "@/components/site/Logo";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acceso privado — GALES ILUSIONISTA" },
      { name: "description", content: "Acceso al panel de administración de Gales Ilusionista." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Acceso privado — GALES ILUSIONISTA" },
      { property: "og:description", content: "Panel de administración." },
    ],
  }),
  component: Auth,
});

function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "in") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Cuenta creada. Ya puedes entrar.");
        setMode("in");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se ha podido completar el acceso.");
    } finally {
      setBusy(false);
    }
  }

  const field =
    "w-full border border-border bg-surface px-4 py-3.5 text-sm text-foreground outline-none focus:border-primary";

  return (
    <main className="grid min-h-screen place-items-center px-6 py-20">
      <div className="w-full max-w-sm">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-10 text-center font-display text-4xl text-white">
          {mode === "in" ? "Acceso privado" : "Crear cuenta"}
        </h1>
        <form onSubmit={submit} className="mt-8 grid gap-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={field}
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className={field}
          />
          <button
            type="submit"
            disabled={busy}
            className="bg-primary px-8 py-4 font-theatre text-[0.7rem] tracking-[0.3em] text-primary-foreground uppercase hover:bg-primary-hover disabled:opacity-60"
          >
            {busy ? "Un momento…" : mode === "in" ? "Entrar" : "Registrarme"}
          </button>
        </form>
        <button
          type="button"
          onClick={() => setMode(mode === "in" ? "up" : "in")}
          className="mt-6 w-full text-center text-xs tracking-[0.2em] text-muted-foreground uppercase hover:text-primary"
        >
          {mode === "in" ? "Crear una cuenta" : "Ya tengo cuenta"}
        </button>
      </div>
    </main>
  );
}

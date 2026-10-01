import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { LogOut, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Logo } from "@/components/site/Logo";
import { supabase } from "@/integrations/supabase/client";
import { claimAdminRole, isAdmin } from "@/lib/admin.functions";
import { photoCategories, videoCategories } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Panel de administración — GALES ILUSIONISTA" },
      { name: "description", content: "Gestión de vídeos, galería y solicitudes." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Panel de administración — GALES" },
      { property: "og:description", content: "Gestión de contenido." },
    ],
  }),
  component: Admin,
});

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

async function uploadFile(file: File, folder: string) {
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, file, { upsert: false });
  if (error) throw new Error(error.message);
  const { data, error: signError } = await supabase.storage
    .from("media")
    .createSignedUrl(path, TEN_YEARS);
  if (signError || !data) throw new Error(signError?.message ?? "No se pudo firmar el archivo");
  return data.signedUrl;
}

const field =
  "w-full border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none focus:border-primary";

function Admin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const checkAdmin = useServerFn(isAdmin);
  const claim = useServerFn(claimAdminRole);
  const [tab, setTab] = useState<"videos" | "fotos" | "solicitudes">("videos");

  const adminQuery = useQuery({ queryKey: ["is-admin"], queryFn: () => checkAdmin({}) });

  useEffect(() => {
    if (adminQuery.data && !adminQuery.data.admin) {
      claim({})
        .then((r) => {
          if (r.granted) {
            toast.success("Te hemos dado acceso de administrador.");
            queryClient.invalidateQueries({ queryKey: ["is-admin"] });
          }
        })
        .catch(() => undefined);
    }
  }, [adminQuery.data, claim, queryClient]);

  const videos = useQuery({
    queryKey: ["admin-videos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const photos = useQuery({
    queryKey: ["admin-photos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_photos")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const requests = useQuery({
    queryKey: ["admin-requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const [busy, setBusy] = useState(false);

  async function addVideo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setBusy(true);
    try {
      const videoFile = fd.get("video") as File | null;
      const thumbFile = fd.get("thumbnail") as File | null;
      const videoUrl = videoFile && videoFile.size > 0 ? await uploadFile(videoFile, "videos") : "";
      const thumbUrl =
        thumbFile && thumbFile.size > 0 ? await uploadFile(thumbFile, "thumbnails") : null;
      const { error } = await supabase.from("videos").insert({
        title: String(fd.get("title")),
        category: String(fd.get("category")),
        description: String(fd.get("description") || "") || null,
        duration: String(fd.get("duration") || "") || null,
        location: String(fd.get("location") || "") || null,
        video_url: videoUrl,
        thumbnail_url: thumbUrl,
      });
      if (error) throw error;
      toast.success("Vídeo publicado.");
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["admin-videos"] });
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se ha podido subir el vídeo.");
    } finally {
      setBusy(false);
    }
  }

  async function addPhoto(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setBusy(true);
    try {
      const file = fd.get("image") as File | null;
      if (!file || file.size === 0) throw new Error("Selecciona una fotografía");
      const url = await uploadFile(file, "gallery");
      const { error } = await supabase.from("gallery_photos").insert({
        title: String(fd.get("title")),
        category: String(fd.get("category")),
        image_url: url,
      });
      if (error) throw error;
      toast.success("Fotografía publicada.");
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["admin-photos"] });
      queryClient.invalidateQueries({ queryKey: ["gallery_photos"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se ha podido subir la foto.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(table: "videos" | "gallery_photos", id: string) {
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Eliminado.");
    queryClient.invalidateQueries();
  }

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <main className="min-h-screen px-6 py-10 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border pb-8 sm:flex sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <Logo />
            <span className="hidden font-theatre text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase sm:block">
              Panel
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Link
              to="/"
              className="border border-border px-4 py-2.5 text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase hover:border-primary hover:text-primary"
            >
              Ver web
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="flex items-center gap-2 border border-border px-4 py-2.5 text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase hover:border-primary hover:text-primary"
            >
              <LogOut className="h-3.5 w-3.5" /> Salir
            </button>
          </div>
        </header>

        <div className="mt-8 flex flex-wrap gap-3">
          {(["videos", "fotos", "solicitudes"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "border px-5 py-2.5 font-theatre text-[0.65rem] tracking-[0.25em] uppercase",
                tab === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "videos" && (
          <section className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <form onSubmit={addVideo} className="grid h-fit gap-4 border border-border p-6">
              <h2 className="font-display text-3xl text-white">Nuevo vídeo</h2>
              <input name="title" required placeholder="Título" className={field} />
              <select name="category" required defaultValue="" className={field}>
                <option value="" disabled>
                  Categoría
                </option>
                {videoCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <textarea name="description" rows={3} placeholder="Descripción" className={field} />
              <input name="duration" placeholder="Duración (ej. 3:24)" className={field} />
              <input name="location" placeholder="Ciudad o ubicación" className={field} />
              <label className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                Archivo de vídeo
                <input name="video" type="file" accept="video/*" className={`${field} mt-2`} />
              </label>
              <label className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                Miniatura
                <input name="thumbnail" type="file" accept="image/*" className={`${field} mt-2`} />
              </label>
              <button
                type="submit"
                disabled={busy}
                className="bg-primary px-6 py-4 font-theatre text-[0.65rem] tracking-[0.3em] text-primary-foreground uppercase hover:bg-primary-hover disabled:opacity-60"
              >
                {busy ? "Subiendo…" : "Publicar vídeo"}
              </button>
            </form>

            <div className="grid h-fit gap-3">
              {(videos.data ?? []).map((v) => (
                <div
                  key={v.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border border-border p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-foreground">{v.title}</p>
                    <p className="text-xs text-muted-foreground">{v.category}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove("videos", v.id)}
                    aria-label="Eliminar"
                    className="shrink-0 text-muted-foreground hover:text-primary"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {videos.data?.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Todavía no hay vídeos propios. La web muestra ejemplos hasta que subas los reales.
                </p>
              )}
            </div>
          </section>
        )}

        {tab === "fotos" && (
          <section className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <form onSubmit={addPhoto} className="grid h-fit gap-4 border border-border p-6">
              <h2 className="font-display text-3xl text-white">Nueva fotografía</h2>
              <input name="title" required placeholder="Título" className={field} />
              <select name="category" required defaultValue="" className={field}>
                <option value="" disabled>
                  Categoría
                </option>
                {photoCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <label className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                Imagen
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  required
                  className={`${field} mt-2`}
                />
              </label>
              <button
                type="submit"
                disabled={busy}
                className="bg-primary px-6 py-4 font-theatre text-[0.65rem] tracking-[0.3em] text-primary-foreground uppercase hover:bg-primary-hover disabled:opacity-60"
              >
                {busy ? "Subiendo…" : "Publicar fotografía"}
              </button>
            </form>

            <div className="grid h-fit gap-3">
              {(photos.data ?? []).map((p) => (
                <div
                  key={p.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border border-border p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-foreground">{p.title}</p>
                    <p className="text-xs text-muted-foreground">{p.category}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove("gallery_photos", p.id)}
                    aria-label="Eliminar"
                    className="shrink-0 text-muted-foreground hover:text-primary"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "solicitudes" && (
          <section className="mt-10 grid gap-3">
            {(requests.data ?? []).map((r) => (
              <article key={r.id} className="border border-border p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl text-white">{r.name}</h3>
                  <span className="text-xs text-muted-foreground">
                    {r.event_type} {r.city ? `· ${r.city}` : ""}
                  </span>
                </div>
                <p className="mt-2 text-sm text-primary">
                  {r.email} {r.phone ? `· ${r.phone}` : ""}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{r.message}</p>
              </article>
            ))}
            {requests.data?.length === 0 && (
              <p className="text-sm text-muted-foreground">Aún no hay solicitudes.</p>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

import logoAsset from "@/assets/gales-logo.png.asset.json";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center">
      <img
        src={logoAsset.url}
        alt="Gales Ilusionista"
        className={compact ? "h-10 w-auto object-contain" : "h-12 w-auto object-contain sm:h-14"}
      />
    </span>
  );
}

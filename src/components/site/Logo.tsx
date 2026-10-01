import galesLogo from "@/assets/gales-logo.png";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center">
      <img
        src={galesLogo}
        alt="Gales Ilusionista"
        className={compact ? "h-10 w-auto object-contain" : "h-12 w-auto object-contain sm:h-14"}
      />
    </span>
  );
}

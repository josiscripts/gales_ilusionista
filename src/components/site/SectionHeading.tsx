import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      {eyebrow && <span className="eyebrow text-primary">{eyebrow}</span>}
      <h2 className="mt-4 font-display text-4xl leading-[1.05] text-white sm:text-6xl">{title}</h2>
      {intro && <p className="mt-5 text-base leading-relaxed text-muted-foreground">{intro}</p>}
    </Reveal>
  );
}

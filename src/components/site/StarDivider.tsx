import { motion } from "motion/react";

/** Destello de la estrella del logotipo usado como transición entre secciones. */
export function StarDivider() {
  return (
    <div className="flex items-center justify-center gap-6 py-10">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-border sm:w-28" />
      <motion.svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-primary"
        initial={{ opacity: 0.25, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M12 0l2.2 8.2L22 12l-7.8 3.8L12 24l-2.2-8.2L2 12l7.8-3.8z"
        />
      </motion.svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-border sm:w-28" />
    </div>
  );
}

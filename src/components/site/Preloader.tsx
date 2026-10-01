import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 2600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            className="smoke-veil absolute inset-0"
            initial={{ opacity: 0, x: "-40%" }}
            animate={{ opacity: [0, 0.9, 0.2], x: ["-40%", "10%", "45%"] }}
            transition={{ duration: 2.6, ease: "easeInOut" }}
          />
          <div className="relative flex flex-col items-center gap-6">
            <svg viewBox="0 0 160 110" className="h-28 w-40" aria-hidden="true">
              <motion.path
                d="M40 78 C40 60 46 26 80 26 C114 26 120 60 120 78 M18 82 C40 92 120 92 142 82"
                fill="none"
                stroke="currentColor"
                className="text-foreground"
                strokeWidth={2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </svg>
            <motion.span
              className="font-display text-6xl leading-none font-bold text-foreground"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              G
            </motion.span>
            <motion.svg
              viewBox="0 0 24 24"
              className="absolute -top-2 right-6 h-6 w-6 text-primary"
              initial={{ opacity: 0, scale: 0.4, rotate: -40 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.6, duration: 0.7 }}
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M12 0l2.2 8.2L22 12l-7.8 3.8L12 24l-2.2-8.2L2 12l7.8-3.8z"
              />
            </motion.svg>
            <motion.span
              className="eyebrow text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.6 }}
            >
              Gales Ilusionista
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

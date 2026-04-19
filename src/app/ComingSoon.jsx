import { motion } from "framer-motion";
import { Construction } from "lucide-react";

export default function ComingSoon({ name }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-[60vh] grid place-items-center"
    >
      <div className="flex flex-col items-center text-center max-w-[420px]">
        <div className="size-12 rounded-[var(--radius-lg)] bg-brand-50 dark:bg-brand-500/10 grid place-items-center mb-5">
          <Construction className="size-5 text-brand-600 dark:text-brand-300" />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)] mb-2">
          Phase 2+
        </p>
        <h1 className="text-[28px] font-semibold tracking-tight mb-2">
          {name} — coming soon
        </h1>
        <p className="text-[14px] text-[var(--text-tertiary)] leading-relaxed">
          Phase 1 ships the foundation: tokens, layout, theme, and router. The
          {" "}{name.toLowerCase()} view lands in a later phase.
        </p>
      </div>
    </motion.div>
  );
}

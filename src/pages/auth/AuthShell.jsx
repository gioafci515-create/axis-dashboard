import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[var(--bg-app)]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-12"
      >
        <div className="flex items-center gap-2.5 mb-10">
          <div className="size-9 rounded-[var(--radius-md)] bg-brand-500 grid place-items-center shadow-sm">
            <Zap className="size-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-[17px] tracking-tight">kosha</span>
        </div>

        <div className="w-full max-w-[400px]">
          <h1 className="text-[26px] font-semibold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-1.5 text-[14px] text-[var(--text-tertiary)]">{subtitle}</p>}
          <div className="mt-7">{children}</div>
          {footer && <div className="mt-6 text-[13px] text-center text-[var(--text-tertiary)]">{footer}</div>}
        </div>
      </motion.div>

      <div className="hidden lg:block relative overflow-hidden bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25) 0%, transparent 40%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.2) 0%, transparent 45%), radial-gradient(circle at 50% 90%, rgba(255,255,255,0.15) 0%, transparent 35%)",
        }} />
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full flex flex-col justify-center items-center text-center px-10 text-white"
        >
          <h2 className="text-[32px] font-semibold tracking-tight leading-[1.15] max-w-md">
            Bring your dashboards, orders, and customers into one calm surface.
          </h2>
          <p className="mt-4 text-[15px] text-white/80 max-w-md leading-relaxed">
            Admin at a higher resolution. No noise, no drift — only the numbers that move.
          </p>
          <div className="mt-10 flex items-center gap-6 text-[12px] text-white/70">
            <span>99.99% uptime</span>
            <span className="size-1 rounded-full bg-white/40" />
            <span>SOC 2 Type II</span>
            <span className="size-1 rounded-full bg-white/40" />
            <span>GDPR ready</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

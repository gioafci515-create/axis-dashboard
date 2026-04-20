import { NavLink } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap } from "lucide-react";
import { NAV_SECTIONS } from "./nav-config";
import { cn } from "@/lib/cn";

export default function MobileDrawer({ open, onOpenChange }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="fixed left-0 top-0 z-50 h-full w-[280px] bg-[var(--bg-surface)] border-r border-[var(--border)] lg:hidden flex flex-col"
              >
                <Dialog.Title className="sr-only">Navigation</Dialog.Title>
                <div className="h-[72px] flex items-center px-5 border-b border-[var(--border)]">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-[var(--radius-md)] bg-brand-500 grid place-items-center shadow-sm">
                      <Zap className="size-4 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="font-semibold text-[15px] tracking-tight text-[var(--text-primary)]">
                      kosha
                    </span>
                  </div>
                  <Dialog.Close asChild>
                    <button
                      aria-label="Close navigation"
                      className="ml-auto size-8 grid place-items-center rounded-md text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
                    >
                      <X className="size-4" />
                    </button>
                  </Dialog.Close>
                </div>
                <nav className="flex-1 overflow-y-auto px-3 py-4">
                  {NAV_SECTIONS.map((section) => (
                    <div key={section.label} className="mb-5 last:mb-0">
                      <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-muted)]">
                        {section.label}
                      </p>
                      <ul className="space-y-0.5">
                        {section.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <li key={item.to}>
                              <NavLink
                                to={item.to}
                                end={item.end}
                                onClick={() => onOpenChange(false)}
                                className={({ isActive }) =>
                                  cn(
                                    "flex items-center gap-3 h-10 px-3 rounded-[var(--radius-md)] text-[14px] font-medium",
                                    isActive
                                      ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
                                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                                  )
                                }
                              >
                                <Icon className="size-4" />
                                {item.label}
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </nav>
              </motion.aside>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronsLeft, Zap } from "lucide-react";
import { cn } from "@/lib/cn";
import { NAV_SECTIONS } from "./nav-config";

export default function Sidebar({ collapsed, onToggle }) {
  const width = collapsed ? 80 : 260;

  return (
    <motion.aside
      initial={false}
      animate={{ width }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="hidden lg:flex shrink-0 h-screen sticky top-0 flex-col bg-[var(--bg-surface)] border-r border-[var(--border)]"
    >
      <div className="h-[72px] flex items-center px-5 border-b border-[var(--border)]">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-[var(--radius-md)] bg-brand-500 grid place-items-center shadow-sm">
            <Zap className="size-4 text-white" strokeWidth={2.5} />
          </div>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.2 }}
                className="font-semibold text-[15px] tracking-tight text-[var(--text-primary)]"
              >
                kosha
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="ml-auto size-7 rounded-md grid place-items-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
        >
          <ChevronsLeft
            className={cn("size-4 transition-transform", collapsed && "rotate-180")}
          />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="mb-5 last:mb-0">
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-muted)]"
                >
                  {section.label}
                </motion.p>
              )}
            </AnimatePresence>

            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.to}>
                  <NavItem item={item} collapsed={collapsed} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-[var(--border)]">
        <UserCard collapsed={collapsed} />
      </div>
    </motion.aside>
  );
}

function NavItem({ item, collapsed }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.end}
      className={({ isActive }) =>
        cn(
          "group relative flex items-center gap-3 h-9 px-3 rounded-[var(--radius-md)] text-[13.5px] font-medium transition-colors",
          isActive
            ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
            : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              layoutId="nav-active-bar"
              className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-r-full bg-brand-500"
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
          <Icon className="size-4 shrink-0" strokeWidth={2} />
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -4 }}
                transition={{ duration: 0.18 }}
                className="truncate"
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>
        </>
      )}
    </NavLink>
  );
}

function UserCard({ collapsed }) {
  return (
    <Link
      to="/profile"
      aria-label="Open profile"
      className={cn(
        "flex items-center gap-3 p-2 rounded-[var(--radius-md)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer",
        collapsed && "justify-center"
      )}
    >
      <div className="size-8 shrink-0 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 grid place-items-center text-white text-[12px] font-semibold">
        GA
      </div>
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="min-w-0 flex-1"
          >
            <p className="text-[13px] font-medium text-[var(--text-primary)] truncate">
              Giorgi A.
            </p>
            <p className="text-[11.5px] text-[var(--text-tertiary)] truncate">
              admin@kosha.app
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
}

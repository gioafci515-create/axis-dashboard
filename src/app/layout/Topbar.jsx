import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import {
  Search,
  Sun,
  Moon,
  Bell,
  Menu,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { NAV_SECTIONS } from "./nav-config";
import { cn } from "@/lib/cn";

const ALL_NAV = NAV_SECTIONS.flatMap((s) =>
  s.items.map((i) => ({ ...i, section: s.label }))
);

export default function Topbar({ onOpenMobileNav }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 h-[72px] flex items-center gap-3 px-4 lg:px-6 bg-[var(--bg-surface)]/85 backdrop-blur-md border-b border-[var(--border)]">
        <button
          onClick={onOpenMobileNav}
          aria-label="Open navigation"
          className="lg:hidden size-9 grid place-items-center rounded-md text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
        >
          <Menu className="size-4.5" />
        </button>

        <Breadcrumbs pathname={location.pathname} />

        <div className="ml-auto flex items-center gap-1.5">
          <button
            onClick={() => setPaletteOpen(true)}
            className="hidden md:inline-flex h-9 items-center gap-2 pl-2.5 pr-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-app)] text-[13px] text-[var(--text-tertiary)] hover:border-[var(--border-strong)] transition-colors min-w-[240px]"
          >
            <Search className="size-3.5" />
            <span>Search…</span>
            <span className="ml-auto flex items-center gap-0.5">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </span>
          </button>

          <button
            onClick={() => setPaletteOpen(true)}
            aria-label="Search"
            className="md:hidden size-9 grid place-items-center rounded-md text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
          >
            <Search className="size-4" />
          </button>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="size-9 grid place-items-center rounded-md text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition-colors"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          <button
            aria-label="Notifications"
            className="relative size-9 grid place-items-center rounded-md text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition-colors"
          >
            <Bell className="size-4" />
            <span className="absolute top-2 right-2 size-1.5 rounded-full bg-error-500 ring-2 ring-[var(--bg-surface)]" />
          </button>

          <div className="ml-1 size-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 grid place-items-center text-white text-[12px] font-semibold shadow-sm cursor-pointer">
            GA
          </div>
        </div>
      </header>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  );
}

function Breadcrumbs({ pathname }) {
  const parts = pathname.split("/").filter(Boolean);
  const current = parts.length === 0 ? "Marketing" : toTitle(parts[parts.length - 1]);

  return (
    <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-[13px] min-w-0">
      <Link to="/" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">
        Axis
      </Link>
      <ChevronRight className="size-3.5 text-[var(--text-muted)] shrink-0" />
      <span className="font-medium text-[var(--text-primary)] truncate">{current}</span>
    </nav>
  );
}

function toTitle(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function Kbd({ children }) {
  return (
    <kbd className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-[4px] border border-[var(--border)] bg-[var(--bg-surface)] font-mono text-[10px] text-[var(--text-tertiary)]">
      {children}
    </kbd>
  );
}

function CommandPalette({ open, onOpenChange }) {
  const navigate = useNavigate();

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-[18vh] z-50 w-[min(92vw,560px)] -translate-x-1/2 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg-elevated)] shadow-lg overflow-hidden">
          <Dialog.Title className="sr-only">Command menu</Dialog.Title>
          <Command className="flex flex-col">
            <div className="flex items-center gap-2 px-4 border-b border-[var(--border)]">
              <Search className="size-4 text-[var(--text-tertiary)]" />
              <Command.Input
                placeholder="Jump to a page, setting, or doc…"
                className="flex-1 h-12 bg-transparent outline-none text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
              />
              <Kbd>Esc</Kbd>
            </div>
            <Command.List className="max-h-[360px] overflow-y-auto p-2">
              <Command.Empty className="py-10 text-center text-[13px] text-[var(--text-tertiary)]">
                Nothing matches.
              </Command.Empty>
              {NAV_SECTIONS.map((section) => (
                <Command.Group
                  key={section.label}
                  heading={section.label}
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.06em] [&_[cmdk-group-heading]]:text-[var(--text-muted)]"
                >
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Command.Item
                        key={item.to}
                        value={`${item.label} ${section.label}`}
                        onSelect={() => {
                          navigate(item.to);
                          onOpenChange(false);
                        }}
                        className={cn(
                          "flex items-center gap-2.5 px-3 h-9 rounded-[var(--radius-md)] cursor-pointer text-[13.5px] text-[var(--text-secondary)]",
                          "data-[selected=true]:bg-[var(--bg-hover)] data-[selected=true]:text-[var(--text-primary)]"
                        )}
                      >
                        <Icon className="size-4 text-[var(--text-tertiary)]" />
                        <span>{item.label}</span>
                        <span className="ml-auto font-mono text-[11px] text-[var(--text-muted)]">
                          {item.to}
                        </span>
                      </Command.Item>
                    );
                  })}
                </Command.Group>
              ))}
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

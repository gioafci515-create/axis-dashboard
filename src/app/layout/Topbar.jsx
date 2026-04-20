import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import * as Popover from "@radix-ui/react-popover";
import { Command } from "cmdk";
import {
  Search,
  Sun,
  Moon,
  Bell,
  Menu,
  ChevronRight,
  CheckCheck,
  ShoppingBag,
  UserPlus,
  AlertTriangle,
  MessageCircle,
  GitMerge,
  User,
  Settings,
  LogOut,
  LifeBuoy,
} from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
} from "@/components/ui/Dropdown";
import { useTheme } from "@/hooks/useTheme";
import { NAV_SECTIONS } from "./nav-config";
import { cn } from "@/lib/cn";

const NOTIFICATIONS_SEED = [
  { id: "n1", icon: ShoppingBag, tone: "brand", title: "New order placed", desc: "Order #4821 from Lena Ortiz — $284.00", when: "2m ago", unread: true },
  { id: "n2", icon: UserPlus, tone: "success", title: "New signup", desc: "Mark Chen joined the Pro plan.", when: "14m ago", unread: true },
  { id: "n3", icon: AlertTriangle, tone: "warning", title: "Low stock", desc: "Aurora Hoodie — 3 units left.", when: "1h ago", unread: true },
  { id: "n4", icon: MessageCircle, tone: "info", title: "New comment on #412", desc: "Sarah: \"Ship it after QA signoff.\"", when: "3h ago", unread: false },
  { id: "n5", icon: GitMerge, tone: "brand", title: "PR merged", desc: "phase-7: a11y + polish merged to main.", when: "Yesterday", unread: false },
];

const TONE_BG = {
  brand: "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300",
  success: "bg-success-50 text-[var(--success-500)] dark:bg-success-500/15",
  warning: "bg-warning-50 text-[var(--warning-500)] dark:bg-warning-500/15",
  info: "bg-info-50 text-[var(--info-500)] dark:bg-info-500/15",
  error: "bg-error-50 text-[var(--error-500)] dark:bg-error-500/15",
};

export default function Topbar({ onOpenMobileNav }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [notifs, setNotifs] = useState(NOTIFICATIONS_SEED);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const unreadCount = notifs.filter((n) => n.unread).length;

  const markAllRead = () => setNotifs((ns) => ns.map((n) => ({ ...n, unread: false })));
  const markOneRead = (id) => setNotifs((ns) => ns.map((n) => (n.id === id ? { ...n, unread: false } : n)));

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

          <NotificationsPopover
            notifs={notifs}
            unreadCount={unreadCount}
            onMarkAll={markAllRead}
            onMarkOne={markOneRead}
          />

          <UserMenu />
        </div>
      </header>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  );
}

function UserMenu() {
  const navigate = useNavigate();
  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <button
          aria-label="Account menu"
          className="ml-1 size-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 grid place-items-center text-white text-[12px] font-semibold shadow-sm hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]"
        >
          GA
        </button>
      </DropdownTrigger>
      <DropdownContent align="end" className="min-w-[220px]">
        <div className="px-2.5 py-2.5 border-b border-[var(--border)] mb-1">
          <p className="text-[13px] font-medium text-[var(--text-primary)]">Giorgi Afciauri</p>
          <p className="text-[11.5px] text-[var(--text-tertiary)] truncate">admin@kosha.app</p>
        </div>
        <DropdownLabel>Account</DropdownLabel>
        <DropdownItem onSelect={() => navigate("/profile")}>
          <User /> Profile
        </DropdownItem>
        <DropdownItem onSelect={() => navigate("/forms")}>
          <Settings /> Settings
        </DropdownItem>
        <DropdownItem>
          <LifeBuoy /> Help & support
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem onSelect={() => navigate("/signin")} className="text-[var(--error-500)] data-[highlighted]:text-[var(--error-500)]">
          <LogOut /> Sign out
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}

function Breadcrumbs({ pathname }) {
  const parts = pathname.split("/").filter(Boolean);
  const current = parts.length === 0 ? "Marketing" : toTitle(parts[parts.length - 1]);

  return (
    <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-[13px] min-w-0">
      <Link to="/" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">
        kosha
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

function NotificationsPopover({ notifs, unreadCount, onMarkAll, onMarkOne }) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          aria-label={unreadCount > 0 ? `Notifications, ${unreadCount} unread` : "Notifications"}
          className="relative size-9 grid place-items-center rounded-md text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition-colors"
        >
          <Bell className="size-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-[15px] h-[15px] px-1 rounded-full bg-error-500 text-white text-[9.5px] font-bold tabular-nums grid place-items-center ring-2 ring-[var(--bg-surface)]">
              {unreadCount}
            </span>
          )}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={8}
          className="z-50 w-[min(92vw,380px)] rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] shadow-lg overflow-hidden data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <h3 className="text-[14px] font-semibold text-[var(--text-primary)]">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-[10.5px] font-bold tabular-nums px-1.5 py-0.5 rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
                  {unreadCount} new
                </span>
              )}
            </div>
            <button
              onClick={onMarkAll}
              disabled={unreadCount === 0}
              className="inline-flex items-center gap-1 text-[12px] font-medium text-brand-500 hover:text-brand-600 disabled:text-[var(--text-muted)] disabled:cursor-not-allowed"
            >
              <CheckCheck className="size-3.5" /> Mark all read
            </button>
          </div>

          {notifs.length === 0 ? (
            <div className="py-10 px-6 text-center">
              <div className="size-10 mx-auto mb-2 rounded-full bg-[var(--bg-muted)] grid place-items-center text-[var(--text-tertiary)]">
                <Bell className="size-4" />
              </div>
              <p className="text-[13px] font-medium text-[var(--text-secondary)]">You're all caught up</p>
              <p className="text-[12px] text-[var(--text-tertiary)]">New activity will show up here.</p>
            </div>
          ) : (
            <ul className="max-h-[360px] overflow-y-auto divide-y divide-[var(--border)]">
              {notifs.map((n) => {
                const Icon = n.icon;
                return (
                  <li key={n.id}>
                    <button
                      onClick={() => onMarkOne(n.id)}
                      className="group w-full text-left flex items-start gap-3 px-4 py-3 hover:bg-[var(--bg-hover)] transition-colors"
                    >
                      <div className={cn("size-8 shrink-0 rounded-[var(--radius-md)] grid place-items-center [&_svg]:size-3.5", TONE_BG[n.tone])}>
                        <Icon strokeWidth={2.2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="text-[13px] font-medium text-[var(--text-primary)] truncate">{n.title}</p>
                          <span className="text-[11px] text-[var(--text-tertiary)] shrink-0 tabular-nums">{n.when}</span>
                        </div>
                        <p className="text-[12.5px] text-[var(--text-tertiary)] line-clamp-2 mt-0.5">{n.desc}</p>
                      </div>
                      {n.unread && (
                        <span className="mt-1.5 size-2 shrink-0 rounded-full bg-brand-500" aria-label="Unread" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="px-4 py-2.5 border-t border-[var(--border)] bg-[var(--bg-app)]/50">
            <button className="w-full text-[12.5px] font-medium text-brand-500 hover:text-brand-600 text-center">
              View all notifications
            </button>
          </div>
          <Popover.Arrow className="fill-[var(--bg-elevated)]" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
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

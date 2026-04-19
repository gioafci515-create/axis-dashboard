import { useLocation, Link } from "react-router-dom";
import { Search, Bell, ChevronRight, Sun, Moon } from "lucide-react";
import { cn } from "@/utils/format";

const pathLabels = {
  "/": "Overview",
  "/revenue": "Revenue",
  "/customers": "Customers",
  "/events": "Events",
  "/funnels": "Funnels",
  "/settings": "Settings",
};

export default function TopBar({ onOpenSearch, theme, onToggleTheme }) {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const pageLabel = pathLabels[location.pathname] || segments[segments.length - 1] || "Overview";

  return (
    <header
      className="sticky top-0 z-30 flex items-center h-[52px] border-b px-6"
      style={{
        backgroundColor: "var(--bg-raised)",
        borderColor: "var(--border-subtle)",
      }}
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[13px] min-w-0">
        <Link to="/" className="hover:underline" style={{ color: "var(--text-tertiary)" }}>
          Signal
        </Link>
        <ChevronRight size={12} style={{ color: "var(--text-disabled)" }} />
        <span className="font-medium" style={{ color: "var(--text-primary)" }}>
          {pageLabel}
        </span>
      </div>

      {/* Search */}
      <button
        onClick={onOpenSearch}
        className="ml-auto mr-4 flex items-center gap-2 h-8 px-3 rounded-md border text-[13px] transition-colors duration-150"
        style={{
          backgroundColor: "var(--bg-overlay)",
          borderColor: "var(--border-default)",
          color: "var(--text-tertiary)",
          minWidth: 220,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-strong)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-default)"; }}
      >
        <Search size={14} strokeWidth={1.5} />
        <span className="flex-1 text-left">Search...</span>
        <kbd
          className="text-[11px] px-1.5 py-0.5 rounded font-mono"
          style={{
            backgroundColor: "var(--bg-hover)",
            color: "var(--text-disabled)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          {"\u2318"}K
        </kbd>
      </button>

      {/* Right actions */}
      <div className="flex items-center gap-1">
        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          className="w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-150"
          style={{ color: "var(--text-secondary)" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-hover)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
          title="Toggle theme"
        >
          {theme === "dark" ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
        </button>

        {/* Notifications */}
        <button
          className="relative w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-150"
          style={{ color: "var(--text-secondary)" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-hover)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
        >
          <Bell size={16} strokeWidth={1.5} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ backgroundColor: "var(--accent)" }}
          />
        </button>

        {/* Avatar */}
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center ml-2 text-[11px] font-medium"
          style={{
            backgroundColor: "var(--accent-muted)",
            color: "var(--accent)",
          }}
        >
          AC
        </div>
      </div>
    </header>
  );
}

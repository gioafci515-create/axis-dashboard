import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronsLeft, ChevronsRight, Settings, Zap } from "lucide-react";
import { primaryNav, secondaryNav } from "@/data/navigation";
import { cn } from "@/utils/format";

export default function Sidebar({ collapsed, onToggle }) {
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 z-40 flex flex-col border-r transition-all duration-200",
        collapsed ? "w-[56px]" : "w-[240px]"
      )}
      style={{
        backgroundColor: "var(--bg-base)",
        borderColor: "var(--border-subtle)",
      }}
    >
      {/* Workspace switcher */}
      <div
        className="flex items-center gap-3 px-4 h-[52px] border-b cursor-pointer hover:opacity-80"
        style={{ borderColor: "var(--border-subtle)" }}
        onClick={() => !collapsed && setWorkspaceOpen(!workspaceOpen)}
      >
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
          style={{ backgroundColor: "var(--accent)" }}
        >
          <Zap size={14} color="white" strokeWidth={2} />
        </div>
        {!collapsed && (
          <>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium truncate" style={{ color: "var(--text-primary)" }}>
                Signal
              </div>
              <div className="text-[11px] truncate" style={{ color: "var(--text-tertiary)" }}>
                Acme Corp
              </div>
            </div>
            <ChevronDown size={14} style={{ color: "var(--text-tertiary)" }} />
          </>
        )}
      </div>

      {/* Primary nav */}
      <nav className="flex-1 py-2 px-2 overflow-y-auto scroll-thin">
        <div className="space-y-0.5">
          {primaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-2.5 h-8 rounded-md text-[13px] font-normal transition-colors duration-150",
                  collapsed && "justify-center px-0"
                )}
                style={{
                  color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                  backgroundColor: isActive ? "var(--bg-hover)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "var(--bg-hover)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                }}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={16} strokeWidth={1.5} />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </div>

        {/* Secondary nav groups */}
        {!collapsed && secondaryNav.map((group) => (
          <div key={group.group} className="mt-6">
            <div className="label px-2.5 mb-1.5">{group.group}</div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.external ? "#" : item.path}
                    className="flex items-center gap-3 px-2.5 h-8 rounded-md text-[13px] transition-colors duration-150"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-hover)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <Icon size={16} strokeWidth={1.5} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom: Settings + Collapse */}
      <div className="border-t px-2 py-2" style={{ borderColor: "var(--border-subtle)" }}>
        <NavLink
          to="/settings"
          className={cn(
            "flex items-center gap-3 px-2.5 h-8 rounded-md text-[13px] transition-colors duration-150",
            collapsed && "justify-center px-0"
          )}
          style={{
            color: location.pathname.startsWith("/settings") ? "var(--text-primary)" : "var(--text-secondary)",
            backgroundColor: location.pathname.startsWith("/settings") ? "var(--bg-hover)" : "transparent",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-hover)"; }}
          onMouseLeave={(e) => {
            if (!location.pathname.startsWith("/settings")) e.currentTarget.style.backgroundColor = "transparent";
          }}
          title={collapsed ? "Settings" : undefined}
        >
          <Settings size={16} strokeWidth={1.5} />
          {!collapsed && <span>Settings</span>}
        </NavLink>

        <button
          onClick={onToggle}
          className={cn(
            "flex items-center gap-3 px-2.5 h-8 rounded-md text-[13px] w-full transition-colors duration-150",
            collapsed && "justify-center px-0"
          )}
          style={{ color: "var(--text-tertiary)" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-hover)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
        >
          {collapsed ? <ChevronsRight size={16} strokeWidth={1.5} /> : <ChevronsLeft size={16} strokeWidth={1.5} />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}

import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./Header";
import CommandPalette from "./CommandPalette";
import ToastContainer from "@/components/common/ToastContainer";
import { useTheme } from "@/hooks/useTheme";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

export default function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const openPalette = useCallback(() => setCommandPaletteOpen(true), []);
  const closePalette = useCallback(() => setCommandPaletteOpen(false), []);

  useKeyboardShortcuts([
    { key: "mod+k", handler: openPalette },
    { key: "?", handler: openPalette },
  ], [openPalette]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-raised)" }}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div
        className="transition-all duration-200"
        style={{ marginLeft: sidebarCollapsed ? 56 : 240 }}
      >
        <TopBar
          onOpenSearch={openPalette}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <main className="p-6 max-w-[1536px] mx-auto">
          <Outlet />
        </main>
      </div>

      <CommandPalette
        open={commandPaletteOpen}
        onClose={closePalette}
        onToggleTheme={toggleTheme}
      />

      <ToastContainer />
    </div>
  );
}

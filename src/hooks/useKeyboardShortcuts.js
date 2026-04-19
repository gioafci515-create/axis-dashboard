import { useEffect, useRef, useCallback } from "react";

export function useKeyboardShortcuts(shortcuts, deps = []) {
  const pendingKey = useRef(null);
  const pendingTimeout = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      // Skip if user is typing in an input
      const tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || e.target.isContentEditable) {
        return;
      }

      const key = e.key.toLowerCase();

      // Handle Cmd/Ctrl+K for command palette
      if ((e.metaKey || e.ctrlKey) && key === "k") {
        e.preventDefault();
        const shortcut = shortcuts.find((s) => s.key === "mod+k");
        if (shortcut) shortcut.handler();
        return;
      }

      // Handle two-key chords (G then O, etc.)
      if (pendingKey.current) {
        const chord = `${pendingKey.current} ${key}`;
        pendingKey.current = null;
        clearTimeout(pendingTimeout.current);
        const shortcut = shortcuts.find((s) => s.key === chord);
        if (shortcut) {
          e.preventDefault();
          shortcut.handler();
        }
        return;
      }

      // Check for chord starters
      const isChordStart = shortcuts.some((s) => s.key.startsWith(`${key} `));
      if (isChordStart) {
        pendingKey.current = key;
        pendingTimeout.current = setTimeout(() => {
          pendingKey.current = null;
        }, 800);
        return;
      }

      // Single key shortcuts
      const shortcut = shortcuts.find((s) => s.key === key);
      if (shortcut) {
        e.preventDefault();
        shortcut.handler();
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      clearTimeout(pendingTimeout.current);
    };
  }, deps);
}

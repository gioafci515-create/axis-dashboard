import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, CornerDownLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { commandPaletteItems } from "@/data/navigation";
import { cn } from "@/utils/format";

export default function CommandPalette({ open, onClose, onToggleTheme }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    if (!query) return commandPaletteItems;
    const q = query.toLowerCase();
    return commandPaletteItems.filter(
      (item) => item.label.toLowerCase().includes(q) || item.section.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const groups = {};
    filtered.forEach((item) => {
      if (!groups[item.section]) groups[item.section] = [];
      groups[item.section].push(item);
    });
    return groups;
  }, [filtered]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const executeItem = (item) => {
    onClose();
    if (item.action === "toggle-theme") {
      onToggleTheme();
    } else if (item.action?.startsWith("/")) {
      navigate(item.action);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") { onClose(); return; }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
    if (e.key === "Enter" && filtered[activeIndex]) {
      executeItem(filtered[activeIndex]);
    }
  };

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Scrim */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "var(--scrim)", backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
          />

          {/* Palette */}
          <motion.div
            className="fixed top-[20%] left-1/2 z-50 w-[560px] max-h-[420px] rounded-xl border overflow-hidden flex flex-col"
            style={{
              backgroundColor: "var(--bg-raised)",
              borderColor: "var(--border-default)",
              boxShadow: "var(--shadow-modal)",
              x: "-50%",
            }}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 h-12 border-b" style={{ borderColor: "var(--border-subtle)" }}>
              <Search size={16} strokeWidth={1.5} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-[14px] outline-none placeholder-[var(--text-disabled)]"
                style={{ color: "var(--text-primary)" }}
              />
              <kbd
                className="text-[11px] px-1.5 py-0.5 rounded font-mono shrink-0"
                style={{
                  backgroundColor: "var(--bg-overlay)",
                  color: "var(--text-disabled)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="overflow-y-auto scroll-thin flex-1 py-2">
              {filtered.length === 0 && (
                <div className="px-4 py-8 text-center text-[13px]" style={{ color: "var(--text-tertiary)" }}>
                  No results found
                </div>
              )}
              {Object.entries(grouped).map(([section, items]) => (
                <div key={section}>
                  <div className="label px-4 py-1.5">{section}</div>
                  {items.map((item) => {
                    const globalIndex = filtered.indexOf(item);
                    const isActive = globalIndex === activeIndex;
                    return (
                      <div
                        key={item.id}
                        data-index={globalIndex}
                        className={cn(
                          "flex items-center gap-3 px-4 h-9 cursor-pointer text-[13px] transition-colors duration-100"
                        )}
                        style={{
                          backgroundColor: isActive ? "var(--bg-hover)" : "transparent",
                          color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                        }}
                        onClick={() => executeItem(item)}
                        onMouseEnter={() => setActiveIndex(globalIndex)}
                      >
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.shortcut && (
                          <span className="font-mono text-[11px] shrink-0" style={{ color: "var(--text-disabled)" }}>
                            {item.shortcut}
                          </span>
                        )}
                        {isActive && (
                          <CornerDownLeft size={12} style={{ color: "var(--text-disabled)" }} />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

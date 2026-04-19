import { useState, useMemo, useCallback } from "react";
import { ChevronUp, ChevronDown, MoreHorizontal, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/utils/format";
import { motion, AnimatePresence } from "framer-motion";

const PAGE_SIZE = 50;

export default function DataTable({
  data,
  columns,
  onRowClick,
  selectable = false,
  emptyState = null,
  pageSize = PAGE_SIZE,
}) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(new Set());

  const handleSort = useCallback((key) => {
    if (sortKey === key) {
      if (sortDir === "asc") setSortDir("desc");
      else if (sortDir === "desc") { setSortKey(null); setSortDir("asc"); }
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }, [sortKey, sortDir]);

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const cmp = typeof aVal === "string" ? aVal.localeCompare(bVal) : aVal - bVal;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);
  const start = page * pageSize + 1;
  const end = Math.min((page + 1) * pageSize, sorted.length);

  const toggleAll = () => {
    if (selected.size === paged.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(paged.map((r) => r.id)));
    }
  };

  const toggleRow = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  if (data.length === 0 && emptyState) {
    return emptyState;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
              {selectable && (
                <th className="w-10 px-3 py-2.5">
                  <input
                    type="checkbox"
                    checked={selected.size === paged.length && paged.length > 0}
                    onChange={toggleAll}
                    className="w-3.5 h-3.5 rounded accent-[var(--accent)]"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "label px-3 py-2.5 text-left cursor-pointer select-none whitespace-nowrap",
                    col.align === "right" && "text-right",
                    col.align === "center" && "text-center"
                  )}
                  style={{ width: col.width }}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {sortKey === col.key && (
                      sortDir === "asc"
                        ? <ChevronUp size={10} />
                        : <ChevronDown size={10} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((row) => {
              const isSelected = selected.has(row.id);
              return (
                <tr
                  key={row.id}
                  className="group relative transition-colors duration-100"
                  style={{
                    borderBottom: "1px solid var(--border-subtle)",
                    backgroundColor: isSelected ? "var(--accent-subtle)" : undefined,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = "var(--bg-hover)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = "";
                  }}
                  onClick={() => onRowClick?.(row)}
                >
                  {/* Left accent bar on hover */}
                  <td className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: "var(--accent)" }} />
                  {selectable && (
                    <td className="w-10 px-3 py-2" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRow(row.id)}
                        className="w-3.5 h-3.5 rounded accent-[var(--accent)]"
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        "px-3 py-2 text-[13px] whitespace-nowrap",
                        col.align === "right" && "text-right",
                        col.align === "center" && "text-center",
                        col.mono && "mono"
                      )}
                      style={{
                        color: "var(--text-primary)",
                        height: 40,
                      }}
                    >
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-3 py-3 px-3">
        <span className="text-[12px] mono" style={{ color: "var(--text-tertiary)" }}>
          {start.toLocaleString()}\u2013{end.toLocaleString()} of {sorted.length.toLocaleString()}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="w-7 h-7 flex items-center justify-center rounded transition-colors duration-100"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = "var(--bg-hover)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            <ChevronsLeft size={14} />
          </button>
          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
            className="w-7 h-7 flex items-center justify-center rounded transition-colors duration-100"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = "var(--bg-hover)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            <ChevronsRight size={14} />
          </button>
        </div>
      </div>

      {/* Floating selection bar */}
      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 px-5 py-2.5 rounded-lg border"
            style={{
              backgroundColor: "var(--bg-overlay)",
              borderColor: "var(--border-default)",
              boxShadow: "var(--shadow-modal)",
            }}
          >
            <span className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>
              {selected.size} selected
            </span>
            <span className="text-[11px]" style={{ color: "var(--text-disabled)" }}>&middot;</span>
            <button className="text-[13px] hover:underline" style={{ color: "var(--accent)" }}>Export</button>
            <button className="text-[13px] hover:underline" style={{ color: "var(--text-secondary)" }}>Archive</button>
            <button className="text-[13px] hover:underline" style={{ color: "var(--danger)" }}>Delete</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

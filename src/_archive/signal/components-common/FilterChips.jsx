import { useState } from "react";
import { X, Plus } from "lucide-react";
import { cn } from "@/utils/format";

function Chip({ filter, onRemove, onEdit }) {
  return (
    <button
      onClick={onEdit}
      className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md border text-[12px] transition-colors duration-100 group"
      style={{
        backgroundColor: "var(--bg-overlay)",
        borderColor: "var(--border-default)",
        color: "var(--text-primary)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-strong)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-default)"; }}
    >
      <span style={{ color: "var(--text-secondary)" }}>{filter.property}</span>
      <span style={{ color: "var(--text-disabled)" }}>{filter.operator}</span>
      <span className="font-medium">{filter.value}</span>
      <span
        className="ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        style={{ color: "var(--text-tertiary)" }}
      >
        <X size={10} />
      </span>
    </button>
  );
}

export default function FilterChips({ filters, onFiltersChange, properties = [] }) {
  const [showAdd, setShowAdd] = useState(false);

  const removeFilter = (index) => {
    const next = filters.filter((_, i) => i !== index);
    onFiltersChange(next);
  };

  const addFilter = (property, operator, value) => {
    onFiltersChange([...filters, { property, operator, value }]);
    setShowAdd(false);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {filters.map((f, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && filters.length > 2 && (
            <span className="text-[11px] font-medium mx-0.5" style={{ color: "var(--text-disabled)" }}>
              AND
            </span>
          )}
          <Chip
            filter={f}
            onRemove={() => removeFilter(i)}
            onEdit={() => {}}
          />
        </span>
      ))}

      <button
        onClick={() => setShowAdd(!showAdd)}
        className="inline-flex items-center gap-1 h-7 px-2 rounded-md border border-dashed text-[12px] transition-colors duration-100"
        style={{
          borderColor: "var(--border-default)",
          color: "var(--text-tertiary)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--border-strong)";
          e.currentTarget.style.color = "var(--text-secondary)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border-default)";
          e.currentTarget.style.color = "var(--text-tertiary)";
        }}
      >
        <Plus size={12} />
        Add filter
      </button>

      {showAdd && properties.length > 0 && (
        <div
          className="absolute mt-1 py-1 rounded-lg border z-50 min-w-[160px]"
          style={{
            backgroundColor: "var(--bg-raised)",
            borderColor: "var(--border-default)",
            boxShadow: "var(--shadow-modal)",
          }}
        >
          {properties.map((prop) => (
            <button
              key={prop}
              className="w-full text-left px-3 py-1.5 text-[13px] transition-colors duration-100"
              style={{ color: "var(--text-primary)" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-hover)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              onClick={() => addFilter(prop, "is", "...")}
            >
              {prop}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

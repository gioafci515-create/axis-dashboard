export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8" style={{ minHeight: 280 }}>
      {/* Geometric illustration */}
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mb-5">
        <rect x="8" y="16" width="48" height="36" rx="4" stroke="var(--text-tertiary)" strokeWidth="1.5" />
        <line x1="8" y1="28" x2="56" y2="28" stroke="var(--text-tertiary)" strokeWidth="1.5" />
        <circle cx="16" cy="22" r="2" fill="var(--accent)" opacity="0.6" />
        <circle cx="22" cy="22" r="2" fill="var(--text-disabled)" />
        <circle cx="28" cy="22" r="2" fill="var(--text-disabled)" />
        <rect x="16" y="34" width="20" height="3" rx="1.5" fill="var(--text-disabled)" opacity="0.5" />
        <rect x="16" y="41" width="14" height="3" rx="1.5" fill="var(--text-disabled)" opacity="0.3" />
      </svg>

      <h3 className="text-[14px] font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>
        {title}
      </h3>
      <p className="text-[13px] text-center max-w-[280px] mb-4" style={{ color: "var(--text-secondary)" }}>
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="h-9 px-4 rounded-md text-[13px] font-medium transition-colors duration-150"
          style={{
            backgroundColor: "var(--accent)",
            color: "white",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--accent-hover)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--accent)"; }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-8">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mb-6">
        <rect x="10" y="10" width="60" height="60" rx="8" stroke="var(--text-tertiary)" strokeWidth="1.5" />
        <path d="M30 35 L50 55 M50 35 L30 55" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      </svg>

      <h1 className="text-[40px] mono font-medium mb-2" style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
        404
      </h1>
      <p className="text-[14px] mb-1" style={{ color: "var(--text-primary)" }}>
        Page not found
      </p>
      <p className="text-[13px] mb-6 max-w-[280px]" style={{ color: "var(--text-secondary)" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="h-9 px-4 rounded-md text-[13px] font-medium inline-flex items-center transition-colors duration-150"
        style={{ backgroundColor: "var(--accent)", color: "white" }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--accent-hover)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--accent)"; }}
      >
        Back to Overview
      </Link>
    </div>
  );
}

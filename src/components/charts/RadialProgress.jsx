import { useId } from "react";
import { cn } from "@/lib/cn";

export function RadialProgress({
  value = 0,
  max = 100,
  size = 120,
  stroke = 10,
  color = "var(--brand-500)",
  trackColor = "var(--bg-muted)",
  label,
  sublabel,
  className,
}) {
  const id = useId().replace(/:/g, "");
  const pct = Math.max(0, Math.min(1, value / max));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct);

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <defs>
          <linearGradient id={`radial-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity={0.75} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={trackColor}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#radial-${id})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 800ms cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label && (
          <p className="text-[20px] font-semibold tabular-nums tracking-tight text-[var(--text-primary)]">
            {label}
          </p>
        )}
        {sublabel && (
          <p className="text-[11px] uppercase tracking-[0.06em] text-[var(--text-muted)]">
            {sublabel}
          </p>
        )}
      </div>
    </div>
  );
}

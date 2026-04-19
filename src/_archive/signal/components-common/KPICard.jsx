import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import { formatMetricValue, cn } from "@/utils/format";

function MiniSparkline({ data, color = "var(--accent)", width = 80, height = 40 }) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  });

  const pathD = `M${points.join(" L")}`;
  const areaD = `${pathD} L${width},${height} L0,${height} Z`;

  return (
    <svg width={width} height={height} className="shrink-0">
      <defs>
        <linearGradient id={`spark-grad-${color.replace(/[^a-z0-9]/gi, "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#spark-grad-${color.replace(/[^a-z0-9]/gi, "")})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function KPICard({ label, value, format, delta, sparkline, invertDelta, isFirst }) {
  const animatedValue = useAnimatedNumber(value);
  const displayValue = formatMetricValue(animatedValue, format);

  const deltaColor = invertDelta
    ? delta >= 0 ? "var(--success)" : "var(--danger)"
    : delta >= 0 ? "var(--success)" : "var(--danger)";
  const deltaSign = delta >= 0 ? "\u25B2" : "\u25BC";

  return (
    <div
      className={cn(
        "group relative flex items-center gap-4 px-5 py-4 cursor-pointer transition-colors duration-150",
        !isFirst && "border-l"
      )}
      style={{
        borderColor: "var(--border-subtle)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-hover)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
    >
      <div className="flex-1 min-w-0">
        <div className="label mb-1">{label}</div>
        <div className="text-[28px] font-medium mono leading-none tracking-tight" style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
          {displayValue}
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <span
            className="inline-flex items-center gap-1 text-[12px] font-medium px-1.5 py-0.5 rounded"
            style={{
              color: deltaColor,
              backgroundColor: delta >= 0 ? "var(--success-muted)" : "var(--danger-muted)",
            }}
          >
            <span className="text-[10px]">{deltaSign}</span>
            {Math.abs(delta).toFixed(1)}%
          </span>
          <span className="text-[11px]" style={{ color: "var(--text-disabled)" }}>
            vs last 7d
          </span>
        </div>
      </div>

      <MiniSparkline data={sparkline} />

      <ChevronRight
        size={14}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        style={{ color: "var(--text-disabled)" }}
      />
    </div>
  );
}

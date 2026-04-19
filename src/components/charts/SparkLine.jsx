import { useId } from "react";
import { cn } from "@/lib/cn";

export function SparkLine({
  data = [],
  width = 120,
  height = 32,
  stroke = "var(--brand-500)",
  fill = "var(--brand-500)",
  fillOpacity = 0.12,
  strokeWidth = 1.5,
  showArea = true,
  showDot = true,
  className,
}) {
  const id = useId().replace(/:/g, "");
  if (!data.length) return <div style={{ width, height }} className={className} />;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = data.length > 1 ? width / (data.length - 1) : 0;

  const points = data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return [x, y];
  });

  const d = points
    .map(([x, y], i) => (i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : `L ${x.toFixed(2)} ${y.toFixed(2)}`))
    .join(" ");

  const areaD = `${d} L ${width} ${height} L 0 ${height} Z`;
  const last = points[points.length - 1];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("overflow-visible", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={`spark-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={fill} stopOpacity={fillOpacity} />
          <stop offset="100%" stopColor={fill} stopOpacity={0} />
        </linearGradient>
      </defs>
      {showArea && <path d={areaD} fill={`url(#spark-${id})`} />}
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {showDot && last && (
        <circle
          cx={last[0]}
          cy={last[1]}
          r={2.5}
          fill={stroke}
          stroke="var(--bg-surface)"
          strokeWidth={1.5}
        />
      )}
    </svg>
  );
}

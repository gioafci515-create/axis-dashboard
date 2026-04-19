import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { ChartTooltip } from "./ChartTooltip";

export function DonutChart({
  data,
  height = 220,
  innerRadius = 58,
  outerRadius = 82,
  valueFormatter,
  centerLabel,
  centerValue,
}) {
  return (
    <div className="relative w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            stroke="var(--bg-surface)"
            strokeWidth={2}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip formatter={valueFormatter} />} />
        </PieChart>
      </ResponsiveContainer>
      {(centerLabel || centerValue != null) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {centerValue != null && (
            <p className="text-[24px] font-semibold tracking-tight tabular-nums text-[var(--text-primary)]">
              {centerValue}
            </p>
          )}
          {centerLabel && (
            <p className="mt-0.5 text-[11px] uppercase tracking-[0.06em] text-[var(--text-muted)]">
              {centerLabel}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function DonutLegend({ data, valueFormatter, className = "" }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {data.map((d) => {
        const pct = total > 0 ? (d.value / total) * 100 : 0;
        return (
          <li key={d.name} className="flex items-center gap-2.5 text-[13px]">
            <span
              className="size-2 rounded-full shrink-0"
              style={{ backgroundColor: d.color }}
            />
            <span className="text-[var(--text-secondary)] truncate">{d.name}</span>
            <span className="ml-auto flex items-center gap-2">
              <span className="tabular-nums text-[var(--text-primary)] font-medium">
                {valueFormatter ? valueFormatter(d.value) : d.value}
              </span>
              <span className="tabular-nums text-[var(--text-muted)] text-[11.5px] w-10 text-right">
                {pct.toFixed(1)}%
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

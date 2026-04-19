import { useId } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ChartTooltip } from "./ChartTooltip";

export function AreaChartCard({
  data,
  series = [{ key: "value", name: "Value", color: "var(--brand-500)" }],
  xKey = "label",
  height = 260,
  valueFormatter,
  showGrid = true,
  showAxes = true,
}) {
  const gid = useId().replace(/:/g, "");

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: -12 }}>
        <defs>
          {series.map((s, i) => (
            <linearGradient
              key={i}
              id={`area-${gid}-${i}`}
              x1="0"
              x2="0"
              y1="0"
              y2="1"
            >
              <stop offset="0%" stopColor={s.color} stopOpacity={0.28} />
              <stop offset="100%" stopColor={s.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        {showGrid && (
          <CartesianGrid
            stroke="var(--border)"
            strokeDasharray="3 3"
            vertical={false}
          />
        )}
        {showAxes && (
          <>
            <XAxis
              dataKey={xKey}
              stroke="var(--text-muted)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={4}
            />
            <YAxis
              stroke="var(--text-muted)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              width={44}
              tickFormatter={valueFormatter}
            />
          </>
        )}
        <Tooltip
          cursor={{ stroke: "var(--brand-300)", strokeDasharray: "2 4" }}
          content={<ChartTooltip formatter={valueFormatter} />}
        />
        {series.map((s, i) => (
          <Area
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.name}
            stroke={s.color}
            strokeWidth={2}
            fill={`url(#area-${gid}-${i})`}
            activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--bg-surface)" }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

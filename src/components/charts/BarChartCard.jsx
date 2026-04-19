import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { ChartTooltip } from "./ChartTooltip";

export function BarChartCard({
  data,
  series = [{ key: "value", name: "Value", color: "var(--brand-500)" }],
  xKey = "label",
  height = 260,
  valueFormatter,
  stacked = false,
  radius = 4,
  barSize = 18,
  highlightIndex = -1,
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: -12 }}>
        <CartesianGrid
          stroke="var(--border)"
          strokeDasharray="3 3"
          vertical={false}
        />
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
        <Tooltip
          cursor={{ fill: "var(--bg-hover)" }}
          content={<ChartTooltip formatter={valueFormatter} />}
        />
        {series.map((s) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            name={s.name}
            stackId={stacked ? "a" : undefined}
            radius={[radius, radius, 0, 0]}
            barSize={barSize}
            fill={s.color}
          >
            {highlightIndex >= 0 &&
              data.map((_, i) => (
                <Cell
                  key={i}
                  fill={s.color}
                  fillOpacity={i === highlightIndex ? 1 : 0.35}
                />
              ))}
          </Bar>
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

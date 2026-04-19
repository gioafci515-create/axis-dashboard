import { useState, useMemo } from "react";
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import KPICard from "@/components/common/KPICard";
import { getKPISummary, getRevenueChartData, topMovers, funnelData, cohortData } from "@/data/metrics";
import { customers } from "@/data/customers";
import { formatCurrency, formatNumber, formatCompactNumber, cn } from "@/utils/format";

const CHART_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];
const PLAN_KEYS = ["enterprise", "business", "pro", "starter"];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg border px-3 py-2.5 text-[12px]"
      style={{
        backgroundColor: "var(--bg-overlay)",
        borderColor: "var(--border-default)",
        boxShadow: "var(--shadow-modal)",
      }}
    >
      <div className="mono mb-1.5" style={{ color: "var(--text-tertiary)" }}>{label}</div>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span style={{ color: "var(--text-secondary)" }}>{entry.name}</span>
          </div>
          <span className="mono font-medium" style={{ color: "var(--text-primary)" }}>
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Overview() {
  const [granularity, setGranularity] = useState("day");
  const [chartType, setChartType] = useState("area");
  const [hiddenSeries, setHiddenSeries] = useState(new Set());

  const kpis = useMemo(() => getKPISummary(), []);
  const chartData = useMemo(() => getRevenueChartData(granularity), [granularity]);

  const toggleSeries = (key) => {
    const next = new Set(hiddenSeries);
    next.has(key) ? next.delete(key) : next.add(key);
    setHiddenSeries(next);
  };

  const granularities = ["hour", "day", "week", "month"];

  return (
    <div className="space-y-6">
      {/* KPI Strip */}
      <div className="flex border rounded-lg overflow-hidden" style={{ borderColor: "var(--border-subtle)" }}>
        {kpis.map((kpi, i) => (
          <div key={kpi.id} className="flex-1">
            <KPICard {...kpi} isFirst={i === 0} />
          </div>
        ))}
      </div>

      {/* Primary Chart + Side Module */}
      <div className="grid grid-cols-5 gap-6">
        {/* Main Chart (3/5) */}
        <div className="col-span-3 border rounded-lg p-5" style={{ borderColor: "var(--border-subtle)" }}>
          {/* Chart header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>Revenue by Plan</h3>
              {/* Legend */}
              <div className="flex items-center gap-4 mt-2">
                {PLAN_KEYS.map((key, i) => (
                  <button
                    key={key}
                    className={cn("flex items-center gap-1.5 text-[12px] transition-opacity", hiddenSeries.has(key) && "opacity-40")}
                    style={{ color: "var(--text-secondary)" }}
                    onClick={() => toggleSeries(key)}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[i] }} />
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <div className="flex rounded-md border overflow-hidden" style={{ borderColor: "var(--border-default)" }}>
                {granularities.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGranularity(g)}
                    className="px-2.5 py-1 text-[11px] font-medium uppercase transition-colors duration-100"
                    style={{
                      backgroundColor: granularity === g ? "var(--bg-overlay)" : "transparent",
                      color: granularity === g ? "var(--text-primary)" : "var(--text-tertiary)",
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <defs>
                {PLAN_KEYS.map((key, i) => (
                  <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={CHART_COLORS[i]} stopOpacity={0.15} />
                    <stop offset="100%" stopColor={CHART_COLORS[i]} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid
                horizontal={true}
                vertical={false}
                stroke="var(--border-subtle)"
                strokeDasharray="2 4"
                strokeOpacity={0.5}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "var(--text-disabled)", fontFamily: "var(--font-mono)" }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
                minTickGap={60}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--text-disabled)", fontFamily: "var(--font-mono)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                width={50}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--border-strong)", strokeWidth: 1 }} />
              {PLAN_KEYS.map((key, i) => (
                !hiddenSeries.has(key) && (
                  <Area
                    key={key}
                    type="monotone"
                    dataKey={key}
                    name={key.charAt(0).toUpperCase() + key.slice(1)}
                    stroke={CHART_COLORS[i]}
                    fill={`url(#grad-${key})`}
                    strokeWidth={1.5}
                    dot={false}
                    animationDuration={300}
                  />
                )
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Movers (2/5) */}
        <div className="col-span-2 border rounded-lg" style={{ borderColor: "var(--border-subtle)" }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: "var(--border-subtle)" }}>
            <h3 className="text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>Top Movers</h3>
            <p className="text-[12px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>By revenue change, last 30 days</p>
          </div>
          <div>
            {topMovers.map((item, i) => (
              <div
                key={item.rank}
                className="flex items-center gap-3 px-5 h-[44px] border-b transition-colors duration-100 cursor-pointer"
                style={{ borderColor: "var(--border-subtle)" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-hover)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <span className="mono text-[11px] w-4 text-right" style={{ color: "var(--text-disabled)" }}>
                  {item.rank}
                </span>
                <span className="flex-1 text-[13px] truncate" style={{ color: "var(--text-primary)" }}>
                  {item.name}
                </span>
                <span className="mono text-[13px] w-16 text-right" style={{ color: "var(--text-primary)" }}>
                  {formatCurrency(item.metric, true)}
                </span>
                {/* Delta bar */}
                <div className="w-20 h-3 relative flex items-center">
                  <div
                    className="absolute left-1/2 w-px h-full"
                    style={{ backgroundColor: "var(--border-default)" }}
                  />
                  <div
                    className="absolute h-2 rounded-sm"
                    style={{
                      backgroundColor: item.delta >= 0 ? "var(--success)" : "var(--danger)",
                      opacity: 0.8,
                      left: item.delta >= 0 ? "50%" : `${50 + item.delta / 1}%`,
                      width: `${Math.min(Math.abs(item.delta) / 0.7, 50)}%`,
                    }}
                  />
                </div>
                <span
                  className="mono text-[11px] w-12 text-right"
                  style={{ color: item.delta >= 0 ? "var(--success)" : "var(--danger)" }}
                >
                  {item.delta >= 0 ? "+" : ""}{item.delta}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Grid: Funnel + Geo + Cohort */}
      <div className="grid grid-cols-3 gap-6">
        {/* Funnel */}
        <div className="border rounded-lg p-5" style={{ borderColor: "var(--border-subtle)" }}>
          <h3 className="text-[14px] font-medium mb-4" style={{ color: "var(--text-primary)" }}>Conversion Funnel</h3>
          <div className="space-y-3">
            {funnelData.map((stage, i) => {
              const width = (stage.count / funnelData[0].count) * 100;
              const isFirst = i === 0;
              const dropoff = i > 0
                ? (((funnelData[i - 1].count - stage.count) / funnelData[i - 1].count) * 100).toFixed(1)
                : null;
              return (
                <div key={stage.stage}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>{stage.stage}</span>
                    <span className="mono text-[12px]" style={{ color: "var(--text-tertiary)" }}>
                      {formatNumber(stage.count)}
                      {dropoff && <span style={{ color: "var(--danger)", marginLeft: 6 }}>-{dropoff}%</span>}
                    </span>
                  </div>
                  <div className="h-6 rounded" style={{ backgroundColor: "var(--bg-overlay)" }}>
                    <div
                      className="h-full rounded transition-all duration-500"
                      style={{
                        width: `${width}%`,
                        backgroundColor: i === funnelData.length - 1 ? "var(--accent)" : "var(--border-strong)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Geographic (simplified bar chart) */}
        <div className="border rounded-lg p-5" style={{ borderColor: "var(--border-subtle)" }}>
          <h3 className="text-[14px] font-medium mb-4" style={{ color: "var(--text-primary)" }}>Top Regions</h3>
          <div className="space-y-2">
            {[
              { name: "United States", pct: 31.3, count: 892 },
              { name: "United Kingdom", pct: 10.0, count: 284 },
              { name: "Germany", pct: 8.5, count: 241 },
              { name: "France", pct: 7.0, count: 198 },
              { name: "Canada", pct: 6.0, count: 172 },
              { name: "Australia", pct: 5.5, count: 156 },
              { name: "Japan", pct: 4.5, count: 128 },
              { name: "Netherlands", pct: 4.0, count: 114 },
            ].map((country) => (
              <div key={country.name} className="group cursor-pointer">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>{country.name}</span>
                  <span className="mono text-[11px]" style={{ color: "var(--text-tertiary)" }}>{country.pct}%</span>
                </div>
                <div className="h-2 rounded-sm" style={{ backgroundColor: "var(--bg-overlay)" }}>
                  <div
                    className="h-full rounded-sm transition-all duration-300 group-hover:opacity-80"
                    style={{
                      width: `${(country.pct / 31.3) * 100}%`,
                      backgroundColor: "var(--accent)",
                      opacity: 0.3 + (country.pct / 31.3) * 0.7,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cohort Retention */}
        <div className="border rounded-lg p-5 overflow-hidden" style={{ borderColor: "var(--border-subtle)" }}>
          <h3 className="text-[14px] font-medium mb-3" style={{ color: "var(--text-primary)" }}>Cohort Retention</h3>
          <div className="overflow-x-auto -mx-1">
            <table className="text-[10px]">
              <thead>
                <tr>
                  <th className="px-1 py-1 text-left font-medium" style={{ color: "var(--text-tertiary)" }}>Cohort</th>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <th key={i} className="px-1 py-1 text-center font-medium mono" style={{ color: "var(--text-tertiary)", minWidth: 32 }}>
                      M{i}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cohortData.slice(0, 8).map((row) => (
                  <tr key={row.cohort}>
                    <td className="px-1 py-0.5 mono whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>
                      {row.cohort}
                    </td>
                    {row.retention.slice(0, 7).map((val, i) => {
                      const intensity = val / 100;
                      return (
                        <td key={i} className="px-0.5 py-0.5">
                          <div
                            className="w-full h-6 flex items-center justify-center rounded-sm mono text-[9px]"
                            style={{
                              backgroundColor: `color-mix(in srgb, var(--accent) ${Math.round(intensity * 100)}%, var(--bg-overlay))`,
                              color: intensity > 0.5 ? "white" : "var(--text-secondary)",
                            }}
                          >
                            {val.toFixed(0)}%
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="border rounded-lg" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: "var(--border-subtle)" }}>
          <h3 className="text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>Recent Customers</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
              {["Name", "Company", "Plan", "MRR", "Status", "Last Seen"].map((h) => (
                <th key={h} className="label px-4 py-2.5 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.slice(0, 10).map((c) => (
              <tr
                key={c.id}
                className="group border-b transition-colors duration-100 cursor-pointer"
                style={{ borderColor: "var(--border-subtle)" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-hover)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <td className="px-4 py-2 text-[13px]" style={{ color: "var(--text-primary)" }}>
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium shrink-0"
                      style={{ backgroundColor: "var(--accent-muted)", color: "var(--accent)" }}
                    >
                      {c.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    {c.name}
                  </div>
                </td>
                <td className="px-4 py-2 text-[13px]" style={{ color: "var(--text-secondary)" }}>{c.company}</td>
                <td className="px-4 py-2">
                  <span className="text-[12px] font-medium px-2 py-0.5 rounded" style={{ backgroundColor: "var(--bg-overlay)", color: "var(--text-secondary)" }}>
                    {c.plan}
                  </span>
                </td>
                <td className="px-4 py-2 mono text-[13px] text-right" style={{ color: "var(--text-primary)" }}>
                  {formatCurrency(c.mrr)}
                </td>
                <td className="px-4 py-2">
                  <span
                    className="inline-flex items-center gap-1.5 text-[12px]"
                    style={{
                      color: c.status === "active" ? "var(--success)" : c.status === "churned" ? "var(--danger)" : c.status === "trial" ? "var(--info)" : "var(--warning)",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "currentcolor" }} />
                    {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-2 mono text-[12px]" style={{ color: "var(--text-tertiary)" }}>
                  {new Date(c.lastSeen).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

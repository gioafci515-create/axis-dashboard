import { useState, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell,
} from "recharts";
import KPICard from "@/components/common/KPICard";
import { mrrDaily, arrDaily, planDistribution, cohortData, getRevenueChartData } from "@/data/metrics";
import { formatCurrency, cn } from "@/utils/format";

const CHART_COLORS = ["#7C5CFF", "#22D3EE", "#F472B6", "#FBBF24", "#34D399"];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border px-3 py-2" style={{ backgroundColor: "var(--bg-overlay)", borderColor: "var(--border-default)", boxShadow: "var(--shadow-modal)" }}>
      <div className="mono text-[11px] mb-1" style={{ color: "var(--text-tertiary)" }}>{label}</div>
      {payload.map((e, i) => (
        <div key={i} className="flex justify-between gap-4 text-[12px]">
          <span style={{ color: "var(--text-secondary)" }}>{e.name}</span>
          <span className="mono font-medium" style={{ color: "var(--text-primary)" }}>{formatCurrency(e.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function Revenue() {
  const [granularity, setGranularity] = useState("day");
  const chartData = useMemo(() => getRevenueChartData(granularity), [granularity]);

  const latestMRR = mrrDaily[mrrDaily.length - 1].value;
  const latestARR = latestMRR * 12;
  const prevMRR = mrrDaily[mrrDaily.length - 31]?.value || mrrDaily[0].value;
  const mrrGrowth = ((latestMRR - prevMRR) / prevMRR * 100).toFixed(1);

  const sparkline30 = mrrDaily.slice(-30).map(d => d.value);

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="flex border rounded-lg overflow-hidden" style={{ borderColor: "var(--border-subtle)" }}>
        {[
          { id: "mrr", label: "MRR", value: latestMRR, format: "currency", delta: parseFloat(mrrGrowth), sparkline: sparkline30 },
          { id: "arr", label: "ARR", value: latestARR, format: "currency", delta: parseFloat(mrrGrowth), sparkline: sparkline30.map(v => v * 12) },
          { id: "arpu", label: "ARPU", value: latestMRR / 2847, format: "currency", delta: 3.2, sparkline: sparkline30.map(v => v / 2847) },
          { id: "churn-rev", label: "Revenue Churn", value: 1.8, format: "percent", delta: -0.3, sparkline: sparkline30.map(() => 1.8 + (Math.random() - 0.5) * 0.4), invertDelta: true },
        ].map((kpi, i) => (
          <div key={kpi.id} className="flex-1">
            <KPICard {...kpi} isFirst={i === 0} />
          </div>
        ))}
      </div>

      {/* MRR Chart */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 border rounded-lg p-5" style={{ borderColor: "var(--border-subtle)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>MRR Trend</h3>
            <div className="flex rounded-md border overflow-hidden" style={{ borderColor: "var(--border-default)" }}>
              {["day", "week", "month"].map((g) => (
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
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mrrDaily.slice(-120)} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid horizontal vertical={false} stroke="var(--border-subtle)" strokeDasharray="2 4" strokeOpacity={0.5} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--text-disabled)", fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} interval="preserveStartEnd" minTickGap={60} />
              <YAxis tick={{ fontSize: 11, fill: "var(--text-disabled)", fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} width={54} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--border-strong)", strokeWidth: 1 }} />
              <Area type="monotone" dataKey="value" name="MRR" stroke="var(--accent)" fill="url(#mrrGrad)" strokeWidth={1.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Plan Distribution */}
        <div className="border rounded-lg p-5" style={{ borderColor: "var(--border-subtle)" }}>
          <h3 className="text-[14px] font-medium mb-4" style={{ color: "var(--text-primary)" }}>Plan Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={planDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={2}
                dataKey="value"
              >
                {planDistribution.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="rounded-lg border px-3 py-2 text-[12px]" style={{ backgroundColor: "var(--bg-overlay)", borderColor: "var(--border-default)" }}>
                      <div className="font-medium" style={{ color: "var(--text-primary)" }}>{d.name}</div>
                      <div style={{ color: "var(--text-secondary)" }}>{d.value} customers &middot; {formatCurrency(d.mrr)}</div>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {planDistribution.map((plan, i) => (
              <div key={plan.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[i] }} />
                  <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>{plan.name}</span>
                </div>
                <span className="mono text-[12px]" style={{ color: "var(--text-primary)" }}>{formatCurrency(plan.mrr)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Churn waterfall / Cohort Revenue */}
      <div className="border rounded-lg p-5" style={{ borderColor: "var(--border-subtle)" }}>
        <h3 className="text-[14px] font-medium mb-4" style={{ color: "var(--text-primary)" }}>MRR Movements</h3>
        <div className="grid grid-cols-5 gap-4">
          {[
            { label: "Starting MRR", value: 278400, color: "var(--text-primary)" },
            { label: "New Business", value: 12800, color: "var(--success)", prefix: "+" },
            { label: "Expansion", value: 8400, color: "var(--success)", prefix: "+" },
            { label: "Contraction", value: -3200, color: "var(--danger)", prefix: "" },
            { label: "Churn", value: -5600, color: "var(--danger)", prefix: "" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="label mb-2">{item.label}</div>
              <div className="mono text-[20px] font-medium" style={{ color: item.color, letterSpacing: "-0.02em" }}>
                {item.prefix}{formatCurrency(Math.abs(item.value), true)}
              </div>
              <div className="mt-2 mx-auto h-24 w-12 rounded" style={{ backgroundColor: item.value >= 0 ? "var(--success-muted)" : "var(--danger-muted)" }}>
                <div
                  className="w-full rounded transition-all duration-500"
                  style={{
                    height: `${Math.min((Math.abs(item.value) / 278400) * 500, 100)}%`,
                    backgroundColor: item.color,
                    opacity: 0.6,
                    marginTop: item.value >= 0 ? "auto" : 0,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

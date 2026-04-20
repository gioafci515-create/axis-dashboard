import { Card, CardHeader, CardTitle, CardDescription, CardBody } from "@/components/ui/Card";
import { AreaChartCard } from "@/components/charts/AreaChartCard";
import { REVENUE_TREND } from "@/data/ecommerce";

export function RevenueTrendCard() {
  const total = REVENUE_TREND.reduce((s, d) => s + d.revenue, 0);
  return (
    <Card className="col-span-12 xl:col-span-8">
      <CardHeader>
        <CardTitle>Revenue & orders</CardTitle>
        <CardDescription>Daily totals, last 30 days</CardDescription>
        <div className="mt-2 flex items-baseline gap-3">
          <span className="text-[26px] font-semibold tabular-nums tracking-tight">${(total/1000).toFixed(1)}k</span>
          <span className="text-[13px] text-[var(--text-tertiary)]">gross over period</span>
        </div>
      </CardHeader>
      <CardBody>
        <AreaChartCard
          data={REVENUE_TREND}
          series={[
            { key: "revenue", name: "Revenue", color: "var(--brand-500)" },
            { key: "orders", name: "Orders", color: "var(--chart-2)" },
          ]}
          height={280}
          valueFormatter={(v) => v >= 1000 ? `$${(v/1000).toFixed(1)}k` : String(v)}
        />
      </CardBody>
    </Card>
  );
}

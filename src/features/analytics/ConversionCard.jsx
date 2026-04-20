import { Card, CardHeader, CardTitle, CardDescription, CardBody } from "@/components/ui/Card";
import { AreaChartCard } from "@/components/charts/AreaChartCard";
import { CONVERSIONS } from "@/data/analytics";

export function ConversionCard() {
  const avg = CONVERSIONS.reduce((s, d) => s + d.rate, 0) / CONVERSIONS.length;
  return (
    <Card className="col-span-12">
      <CardHeader>
        <div className="flex items-baseline gap-3">
          <CardTitle>Conversion rate</CardTitle>
          <span className="text-[22px] font-semibold tabular-nums text-[var(--text-primary)]">{avg.toFixed(2)}%</span>
          <span className="text-[12px] text-[var(--text-tertiary)]">30-day average</span>
        </div>
        <CardDescription>Signups as a percent of visitors</CardDescription>
      </CardHeader>
      <CardBody>
        <AreaChartCard
          data={CONVERSIONS}
          series={[{ key: "rate", name: "Conversion rate", color: "var(--brand-500)" }]}
          height={230}
          valueFormatter={(v) => `${v.toFixed(2)}%`}
        />
      </CardBody>
    </Card>
  );
}

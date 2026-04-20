import { Card, CardHeader, CardTitle, CardDescription, CardBody } from "@/components/ui/Card";
import { DonutChart, DonutLegend } from "@/components/charts/DonutChart";
import { CATEGORY_BREAKDOWN } from "@/data/ecommerce";

export function CategoryBreakdownCard() {
  const total = CATEGORY_BREAKDOWN.reduce((s, d) => s + d.value, 0);
  return (
    <Card className="col-span-12 xl:col-span-4">
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>Revenue share, month-to-date</CardDescription>
      </CardHeader>
      <CardBody>
        <DonutChart
          data={CATEGORY_BREAKDOWN}
          height={210}
          centerValue={`$${(total/1000).toFixed(0)}k`}
          centerLabel="Total"
          valueFormatter={(v) => `$${(v/1000).toFixed(1)}k`}
        />
        <DonutLegend data={CATEGORY_BREAKDOWN} valueFormatter={(v) => `$${(v/1000).toFixed(0)}k`} className="mt-4" />
      </CardBody>
    </Card>
  );
}

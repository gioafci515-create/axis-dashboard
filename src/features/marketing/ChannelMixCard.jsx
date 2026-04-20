import { Card, CardHeader, CardTitle, CardDescription, CardBody } from "@/components/ui/Card";
import { DonutChart, DonutLegend } from "@/components/charts/DonutChart";
import { CHANNEL_MIX } from "@/data/marketing";

export function ChannelMixCard() {
  const total = CHANNEL_MIX.reduce((s, d) => s + d.value, 0);
  return (
    <Card className="col-span-12 md:col-span-6 xl:col-span-4">
      <CardHeader>
        <CardTitle>Channel mix</CardTitle>
        <CardDescription>Traffic sources, last 30 days</CardDescription>
      </CardHeader>
      <CardBody>
        <DonutChart
          data={CHANNEL_MIX}
          height={200}
          centerValue={`${total.toFixed(0)}%`}
          centerLabel="Total"
          valueFormatter={(v) => `${v.toFixed(1)}%`}
        />
        <DonutLegend
          data={CHANNEL_MIX}
          valueFormatter={(v) => `${v.toFixed(1)}%`}
          className="mt-4"
        />
      </CardBody>
    </Card>
  );
}

import { Card, CardHeader, CardTitle, CardDescription, CardBody } from "@/components/ui/Card";
import { BarChartCard } from "@/components/charts/BarChartCard";
import { HOURLY_TRAFFIC } from "@/data/analytics";

export function HourlyTrafficCard() {
  return (
    <Card className="col-span-12 xl:col-span-8">
      <CardHeader>
        <CardTitle>Traffic by hour</CardTitle>
        <CardDescription>Visitors and sessions, last 24 hours</CardDescription>
      </CardHeader>
      <CardBody>
        <BarChartCard
          data={HOURLY_TRAFFIC}
          series={[
            { key: "visitors", name: "Visitors", color: "var(--brand-500)" },
            { key: "sessions", name: "Sessions", color: "var(--chart-4)" },
          ]}
          height={280}
          barSize={8}
          valueFormatter={(v) => v.toLocaleString()}
        />
      </CardBody>
    </Card>
  );
}

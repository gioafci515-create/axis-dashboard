import { Card, CardHeader, CardTitle, CardDescription, CardBody } from "@/components/ui/Card";
import { DonutChart, DonutLegend } from "@/components/charts/DonutChart";
import { DEVICE_MIX } from "@/data/analytics";

export function DeviceMixCard() {
  return (
    <Card className="col-span-12 xl:col-span-4">
      <CardHeader>
        <CardTitle>Device mix</CardTitle>
        <CardDescription>Sessions by device</CardDescription>
      </CardHeader>
      <CardBody>
        <DonutChart
          data={DEVICE_MIX}
          height={210}
          centerValue={`${DEVICE_MIX[0].value.toFixed(1)}%`}
          centerLabel={DEVICE_MIX[0].name}
          valueFormatter={(v) => `${v.toFixed(1)}%`}
        />
        <DonutLegend data={DEVICE_MIX} valueFormatter={(v) => `${v.toFixed(1)}%`} className="mt-4" />
      </CardBody>
    </Card>
  );
}

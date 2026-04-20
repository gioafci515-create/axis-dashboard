import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardBody } from "@/components/ui/Card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { AreaChartCard } from "@/components/charts/AreaChartCard";
import { STATISTICS } from "@/data/marketing";

const TABS = [
  { value: "revenue", label: "Revenue", color: "var(--brand-500)", formatter: (v) => `$${(v / 1000).toFixed(1)}k` },
  { value: "sales", label: "Sales", color: "var(--chart-2)", formatter: (v) => `${Math.round(v)}` },
];

export function StatisticsCard() {
  const [metric, setMetric] = useState("revenue");
  const tab = TABS.find((t) => t.value === metric);
  const data = STATISTICS[metric];

  return (
    <Card className="col-span-12">
      <CardHeader
        action={
          <Tabs value={metric} onValueChange={setMetric}>
            <TabsList>
              {TABS.map((t) => (
                <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        }
      >
        <CardTitle>Statistics</CardTitle>
        <CardDescription>Target you've set for each day · last 30 days</CardDescription>
      </CardHeader>
      <CardBody>
        <AreaChartCard
          data={data}
          series={[
            { key: "current", name: "This period", color: tab.color },
            { key: "previous", name: "Previous", color: "var(--gray-400)" },
          ]}
          height={260}
          valueFormatter={tab.formatter}
        />
      </CardBody>
    </Card>
  );
}

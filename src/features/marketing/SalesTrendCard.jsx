import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardBody } from "@/components/ui/Card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";
import { AreaChartCard } from "@/components/charts/AreaChartCard";
import { MONTHLY_SALES } from "@/data/marketing";

const RANGES = ["3M", "6M", "12M"];

export function SalesTrendCard() {
  const [range, setRange] = useState("12M");

  const data = useMemo(() => {
    if (range === "3M") return MONTHLY_SALES.slice(-3);
    if (range === "6M") return MONTHLY_SALES.slice(-6);
    return MONTHLY_SALES;
  }, [range]);

  const total = data.reduce((s, d) => s + d.revenue, 0);

  return (
    <Card className="col-span-12 xl:col-span-8">
      <CardHeader
        action={
          <Tabs value={range} onValueChange={setRange}>
            <TabsList>
              {RANGES.map((r) => (
                <TabsTrigger key={r} value={r}>{r}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        }
      >
        <div className="flex items-center gap-2">
          <CardTitle>Monthly sales</CardTitle>
          <Badge tone="success" dot size="sm">Live</Badge>
        </div>
        <div className="mt-2 flex items-baseline gap-3">
          <span className="text-[26px] font-semibold tracking-tight tabular-nums text-[var(--text-primary)]">
            ${(total / 1000).toFixed(1)}k
          </span>
          <span className="text-[13px] text-[var(--text-tertiary)]">across {data.length} months</span>
        </div>
      </CardHeader>
      <CardBody>
        <AreaChartCard
          data={data}
          series={[{ key: "revenue", name: "Revenue", color: "var(--brand-500)" }]}
          height={280}
          valueFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
        />
      </CardBody>
    </Card>
  );
}

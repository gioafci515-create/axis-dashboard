import { Card, CardHeader, CardTitle, CardDescription, CardBody } from "@/components/ui/Card";
import { RadialProgress } from "@/components/charts/RadialProgress";
import { Badge } from "@/components/ui/Badge";
import { TARGET } from "@/data/marketing";
import { ArrowUpRight } from "lucide-react";

export function MonthlyTargetCard() {
  return (
    <Card className="col-span-12 xl:col-span-4 flex flex-col">
      <CardHeader>
        <CardTitle>Monthly target</CardTitle>
        <CardDescription>Target set for every month</CardDescription>
      </CardHeader>
      <CardBody className="flex-1 flex flex-col items-center text-center">
        <RadialProgress
          value={TARGET.value}
          size={180}
          stroke={14}
          color="var(--brand-500)"
          label={`${TARGET.value.toFixed(1)}%`}
          sublabel="of target"
        />
        <Badge tone="success" size="md" className="mt-5">
          <ArrowUpRight className="size-3" /> +{TARGET.deltaPct}% this week
        </Badge>
        <p className="mt-4 max-w-[280px] text-[13px] text-[var(--text-tertiary)] leading-relaxed">
          You earned <span className="font-semibold text-[var(--text-primary)]">${TARGET.revenue.toLocaleString()}</span> today.
          Keep the pace to hit this month's goal.
        </p>
      </CardBody>
      <div className="grid grid-cols-3 divide-x divide-[var(--border)] border-t border-[var(--border)] text-center">
        <Stat label="Target" value={`$${(TARGET.target / 1000).toFixed(0)}k`} trend="down" />
        <Stat label="Revenue" value={`$${(TARGET.revenue / 1000).toFixed(0)}k`} trend="up" />
        <Stat label="Today" value={`$${TARGET.today.toLocaleString()}`} trend="up" />
      </div>
    </Card>
  );
}

function Stat({ label, value, trend }) {
  return (
    <div className="px-4 py-4">
      <p className="text-[11px] uppercase tracking-[0.04em] text-[var(--text-tertiary)]">{label}</p>
      <p className="mt-1 text-[15px] font-semibold tabular-nums text-[var(--text-primary)] inline-flex items-center gap-1">
        {value}
        <ArrowUpRight
          className={`size-3 ${trend === "up" ? "text-success-500" : "text-error-500 rotate-90"}`}
        />
      </p>
    </div>
  );
}

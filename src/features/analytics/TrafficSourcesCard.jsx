import { Card, CardHeader, CardTitle, CardDescription, CardBody } from "@/components/ui/Card";
import { TRAFFIC_SOURCES } from "@/data/analytics";

export function TrafficSourcesCard() {
  const total = TRAFFIC_SOURCES.reduce((s, d) => s + d.value, 0);
  const max = Math.max(...TRAFFIC_SOURCES.map((d) => d.value));
  return (
    <Card className="col-span-12 md:col-span-6">
      <CardHeader>
        <CardTitle>Traffic sources</CardTitle>
        <CardDescription>Visitors by channel, last 30 days</CardDescription>
      </CardHeader>
      <CardBody>
        <ul className="space-y-3.5">
          {TRAFFIC_SOURCES.map((s) => {
            const pct = (s.value / total) * 100;
            const barPct = (s.value / max) * 100;
            return (
              <li key={s.name}>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="flex items-center gap-2 text-[13.5px] text-[var(--text-primary)]">
                    <span className="size-2 rounded-full" style={{ backgroundColor: s.color }} />
                    {s.name}
                  </span>
                  <span className="flex items-center gap-2.5 tabular-nums">
                    <span className="text-[13px] font-semibold text-[var(--text-primary)]">
                      {s.value.toLocaleString()}
                    </span>
                    <span className="text-[11.5px] text-[var(--text-tertiary)] w-12 text-right">
                      {pct.toFixed(1)}%
                    </span>
                  </span>
                </div>
                <div className="relative h-1.5 rounded-full bg-[var(--bg-muted)] overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${barPct}%`,
                      backgroundColor: s.color,
                      transition: "width 900ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </CardBody>
    </Card>
  );
}

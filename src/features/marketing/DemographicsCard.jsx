import { Card, CardHeader, CardTitle, CardDescription, CardBody } from "@/components/ui/Card";
import { DEMOGRAPHICS } from "@/data/marketing";

export function DemographicsCard() {
  return (
    <Card className="col-span-12 xl:col-span-5">
      <CardHeader>
        <CardTitle>Customer demographics</CardTitle>
        <CardDescription>Where your customers are visiting from</CardDescription>
      </CardHeader>
      <CardBody className="pt-0">
        <ul className="divide-y divide-[var(--border)]">
          {DEMOGRAPHICS.map((d) => (
            <li key={d.country} className="flex items-center gap-3 py-3">
              <span
                className="size-8 shrink-0 rounded-full bg-[var(--bg-muted)] grid place-items-center text-[10.5px] font-bold text-[var(--text-secondary)] tracking-wider"
                aria-hidden
              >
                {d.flag}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13.5px] font-medium text-[var(--text-primary)] truncate">
                    {d.country}
                  </span>
                  <span className="text-[12px] tabular-nums text-[var(--text-tertiary)]">
                    {d.users.toLocaleString()} users
                  </span>
                </div>
                <div className="relative h-1.5 rounded-full bg-[var(--bg-muted)] overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-brand-500"
                    style={{
                      width: `${d.pct}%`,
                      transition: "width 900ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  />
                </div>
              </div>
              <span className="text-[13px] tabular-nums font-semibold text-[var(--text-primary)] w-12 text-right">
                {d.pct.toFixed(1)}%
              </span>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}

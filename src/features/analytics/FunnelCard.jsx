import { Card, CardHeader, CardTitle, CardDescription, CardBody } from "@/components/ui/Card";
import { FUNNEL } from "@/data/analytics";

export function FunnelCard() {
  return (
    <Card className="col-span-12">
      <CardHeader>
        <CardTitle>Conversion funnel</CardTitle>
        <CardDescription>User journey from visit to retention</CardDescription>
      </CardHeader>
      <CardBody>
        <ol className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {FUNNEL.map((s, i) => {
            const prev = FUNNEL[i - 1];
            const dropPct = prev ? ((prev.count - s.count) / prev.count) * 100 : 0;
            return (
              <li key={s.step} className="relative">
                <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-surface)] p-4">
                  <p className="text-[11px] uppercase tracking-[0.06em] text-[var(--text-muted)]">Step {i + 1}</p>
                  <p className="mt-1 text-[14px] font-medium text-[var(--text-primary)]">{s.step}</p>
                  <p className="mt-3 text-[22px] font-semibold tabular-nums tracking-tight text-[var(--text-primary)]">
                    {s.count.toLocaleString()}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[11.5px] tabular-nums">
                    <span className="text-[var(--text-tertiary)]">{s.pct.toFixed(1)}% of visits</span>
                    {i > 0 && (
                      <span className="text-error-500 font-medium">
                        -{dropPct.toFixed(1)}%
                      </span>
                    )}
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-[var(--bg-muted)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-brand-500"
                      style={{ width: `${s.pct}%`, transition: "width 900ms cubic-bezier(0.22, 1, 0.36, 1)" }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </CardBody>
    </Card>
  );
}

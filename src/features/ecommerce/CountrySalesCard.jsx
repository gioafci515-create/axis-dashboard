import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { COUNTRY_SALES } from "@/data/ecommerce";

export function CountrySalesCard() {
  const max = Math.max(...COUNTRY_SALES.map((c) => c.revenue));
  return (
    <Card className="col-span-12 md:col-span-6">
      <CardHeader>
        <CardTitle>Sales by country</CardTitle>
        <CardDescription>Top revenue markets</CardDescription>
      </CardHeader>
      <div className="px-5 pb-5">
        <ul className="divide-y divide-[var(--border)]">
          {COUNTRY_SALES.map((c) => (
            <li key={c.country} className="flex items-center gap-3 py-3">
              <span className="size-8 shrink-0 rounded-full bg-[var(--bg-muted)] grid place-items-center text-[10.5px] font-bold tracking-wider text-[var(--text-secondary)]">
                {c.flag}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-[13.5px] font-medium text-[var(--text-primary)] truncate">{c.country}</span>
                  <span className="text-[11.5px] tabular-nums text-[var(--text-tertiary)]">
                    {c.orders} orders
                  </span>
                </div>
                <div className="relative h-1.5 rounded-full bg-[var(--bg-muted)] overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-brand-500"
                    style={{
                      width: `${(c.revenue / max) * 100}%`,
                      transition: "width 900ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  />
                </div>
              </div>
              <span className="text-[13px] font-semibold tabular-nums text-[var(--text-primary)] w-20 text-right">
                ${(c.revenue / 1000).toFixed(1)}k
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

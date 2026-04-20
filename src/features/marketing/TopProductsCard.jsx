import { Card, CardHeader, CardTitle, CardDescription, CardBody } from "@/components/ui/Card";
import { TOP_PRODUCTS } from "@/data/marketing";

export function TopProductsCard() {
  return (
    <Card className="col-span-12 md:col-span-6 xl:col-span-8">
      <CardHeader>
        <CardTitle>Top products</CardTitle>
        <CardDescription>Revenue leaders this month</CardDescription>
      </CardHeader>
      <CardBody>
        <ul className="space-y-4">
          {TOP_PRODUCTS.map((p, i) => (
            <li key={p.sku} className="flex items-center gap-4">
              <span className="size-6 shrink-0 rounded-md bg-[var(--bg-muted)] grid place-items-center text-[11px] font-bold tabular-nums text-[var(--text-secondary)]">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-1.5 gap-3">
                  <span className="text-[13.5px] font-medium text-[var(--text-primary)] truncate">
                    {p.name}
                  </span>
                  <span className="text-[13px] tabular-nums font-semibold text-[var(--text-primary)] shrink-0">
                    ${p.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="relative h-1.5 rounded-full bg-[var(--bg-muted)] overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-500 to-brand-400"
                    style={{
                      width: `${p.pct}%`,
                      transition: "width 900ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  />
                </div>
                <p className="mt-1.5 text-[11px] font-mono text-[var(--text-muted)]">{p.sku}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}

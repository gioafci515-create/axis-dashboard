import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { TOP_PAGES } from "@/data/analytics";

export function TopPagesCard() {
  return (
    <Card className="col-span-12 md:col-span-6">
      <CardHeader>
        <CardTitle>Top pages</CardTitle>
        <CardDescription>Views and avg. time on page</CardDescription>
      </CardHeader>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead className="bg-[var(--bg-muted)]/60 border-y border-[var(--border)]">
            <tr className="text-left">
              <th className="px-5 h-10 text-[11px] font-semibold uppercase tracking-[0.04em] text-[var(--text-tertiary)]">Page</th>
              <th className="px-5 h-10 text-[11px] font-semibold uppercase tracking-[0.04em] text-[var(--text-tertiary)] text-right">Views</th>
              <th className="px-5 h-10 text-[11px] font-semibold uppercase tracking-[0.04em] text-[var(--text-tertiary)] text-right">Avg. time</th>
              <th className="px-5 h-10 text-[11px] font-semibold uppercase tracking-[0.04em] text-[var(--text-tertiary)] text-right">Δ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {TOP_PAGES.map((p) => {
              const up = p.change >= 0;
              return (
                <tr key={p.path} className="hover:bg-[var(--bg-hover)] transition-colors">
                  <td className="px-5 py-3 font-mono text-[12.5px] text-[var(--text-primary)]">{p.path}</td>
                  <td className="px-5 py-3 text-right tabular-nums font-semibold text-[var(--text-primary)]">
                    {p.views.toLocaleString()}
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums text-[var(--text-secondary)]">{p.avgTime}</td>
                  <td className="px-5 py-3 text-right">
                    <span className={`inline-flex items-center gap-0.5 text-[12px] font-semibold tabular-nums ${up ? "text-success-500" : "text-error-500"}`}>
                      {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                      {Math.abs(p.change).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

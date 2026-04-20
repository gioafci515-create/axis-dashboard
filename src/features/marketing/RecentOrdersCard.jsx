import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { Avatar } from "@/components/ui/Avatar";
import { RECENT_ORDERS } from "@/data/marketing";

const STATUS_TONE = {
  delivered: "success",
  shipped: "info",
  processing: "warning",
  cancelled: "error",
};

export function RecentOrdersCard() {
  return (
    <Card className="col-span-12 xl:col-span-7">
      <CardHeader
        action={
          <Button size="sm" variant="ghost">See all</Button>
        }
      >
        <CardTitle>Recent orders</CardTitle>
        <CardDescription>Orders from the past 24 hours</CardDescription>
      </CardHeader>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead className="bg-[var(--bg-muted)]/60 border-y border-[var(--border)]">
            <tr className="text-left">
              <Th>Product</Th>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Customer</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {RECENT_ORDERS.map((o) => (
              <tr key={o.id} className="hover:bg-[var(--bg-hover)] transition-colors">
                <td className="px-5 py-3 min-w-0">
                  <div className="flex items-center gap-3">
                    <div className="size-9 shrink-0 rounded-[var(--radius-md)] bg-[var(--bg-muted)] grid place-items-center text-[10px] font-bold text-[var(--text-secondary)]">
                      {o.product.split(" ").map(w => w[0]).slice(0,2).join("")}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-[var(--text-primary)] truncate">{o.product}</p>
                      <p className="text-[11.5px] font-mono text-[var(--text-muted)]">{o.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-[var(--text-secondary)]">{o.category}</td>
                <td className="px-5 py-3 tabular-nums font-semibold text-[var(--text-primary)]">
                  ${o.price.toLocaleString()}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar name={o.customer} size="xs" />
                    <span className="text-[var(--text-secondary)]">{o.customer}</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <StatusPill tone={STATUS_TONE[o.status]} pulse={o.status === "processing"}>
                    {o.status[0].toUpperCase() + o.status.slice(1)}
                  </StatusPill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function Th({ children }) {
  return (
    <th className="px-5 h-10 text-[11px] font-semibold uppercase tracking-[0.04em] text-[var(--text-tertiary)] whitespace-nowrap">
      {children}
    </th>
  );
}

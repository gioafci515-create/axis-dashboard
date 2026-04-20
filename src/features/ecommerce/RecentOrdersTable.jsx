import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import { Avatar } from "@/components/ui/Avatar";
import { DataTable } from "@/components/data/DataTable";
import { ORDERS } from "@/data/ecommerce";
import { date } from "@/lib/format";

const STATUS_TONE = {
  delivered: "success",
  shipped: "info",
  processing: "warning",
  cancelled: "error",
};

export function RecentOrdersTable() {
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Order",
        cell: ({ getValue }) => (
          <span className="font-mono text-[12.5px] text-[var(--text-primary)]">{getValue()}</span>
        ),
      },
      {
        accessorKey: "customer",
        header: "Customer",
        cell: ({ row }) => (
          <div className="flex items-center gap-2.5 min-w-0">
            <Avatar name={row.original.customer} size="xs" />
            <div className="min-w-0">
              <p className="font-medium text-[var(--text-primary)] truncate">{row.original.customer}</p>
              <p className="text-[11.5px] text-[var(--text-muted)] truncate">{row.original.email}</p>
            </div>
          </div>
        ),
      },
      { accessorKey: "date", header: "Date", cell: ({ getValue }) => date(getValue()) },
      { accessorKey: "items", header: "Items", cell: ({ getValue }) => <span className="tabular-nums">{getValue()}</span> },
      { accessorKey: "channel", header: "Channel" },
      {
        accessorKey: "total",
        header: "Total",
        cell: ({ getValue }) => (
          <span className="tabular-nums font-semibold text-[var(--text-primary)]">
            ${getValue().toFixed(2)}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const s = getValue();
          return (
            <StatusPill tone={STATUS_TONE[s]} pulse={s === "processing"}>
              {s[0].toUpperCase() + s.slice(1)}
            </StatusPill>
          );
        },
      },
    ],
    []
  );

  return (
    <Card className="col-span-12 md:col-span-6">
      <CardHeader>
        <CardTitle>Recent orders</CardTitle>
        <CardDescription>Latest 48 orders across channels</CardDescription>
      </CardHeader>
      <div className="px-5 pb-5">
        <DataTable
          data={ORDERS}
          columns={columns}
          pageSize={6}
          searchKeys={["id", "customer", "email", "channel", "status"]}
          searchPlaceholder="Search orders…"
        />
      </div>
    </Card>
  );
}

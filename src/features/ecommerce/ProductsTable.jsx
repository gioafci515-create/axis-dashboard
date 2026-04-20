import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/data/DataTable";
import { PRODUCTS } from "@/data/ecommerce";
import { Star } from "lucide-react";

export function ProductsTable() {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Product",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="size-8 shrink-0 rounded-[var(--radius-sm)] bg-[var(--bg-muted)] grid place-items-center text-[10px] font-bold text-[var(--text-secondary)]">
              {row.original.name.split(" ").map(w => w[0]).slice(0,2).join("")}
            </div>
            <div className="min-w-0">
              <p className="font-medium text-[var(--text-primary)] truncate">{row.original.name}</p>
              <p className="text-[11px] font-mono text-[var(--text-muted)]">{row.original.sku}</p>
            </div>
          </div>
        ),
      },
      { accessorKey: "category", header: "Category" },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ getValue }) => <span className="tabular-nums font-semibold text-[var(--text-primary)]">${getValue().toLocaleString()}</span>,
      },
      {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ getValue }) => {
          const v = getValue();
          if (v === 0) return <Badge tone="error" size="sm">Out</Badge>;
          if (v < 40) return <Badge tone="warning" size="sm">{v} left</Badge>;
          return <span className="tabular-nums text-[var(--text-secondary)]">{v}</span>;
        },
      },
      {
        accessorKey: "sold",
        header: "Sold",
        cell: ({ getValue }) => <span className="tabular-nums text-[var(--text-primary)] font-medium">{getValue()}</span>,
      },
      {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ getValue }) => (
          <span className="inline-flex items-center gap-1 tabular-nums">
            <Star className="size-3 text-warning-500 fill-warning-500" />
            {getValue().toFixed(1)}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <Card className="col-span-12">
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>Catalog performance and stock status</CardDescription>
      </CardHeader>
      <div className="px-5 pb-5">
        <DataTable
          data={PRODUCTS}
          columns={columns}
          pageSize={8}
          searchKeys={["name", "sku", "category"]}
          searchPlaceholder="Search products, SKUs…"
        />
      </div>
    </Card>
  );
}

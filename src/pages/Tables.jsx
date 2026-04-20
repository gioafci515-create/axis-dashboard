import { useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatusPill } from "@/components/ui/StatusPill";
import { Avatar } from "@/components/ui/Avatar";
import { DataTable } from "@/components/data/DataTable";
import { ORDERS, PRODUCTS } from "@/data/ecommerce";
import { date } from "@/lib/format";

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };

const STATUS_TONE = { delivered: "success", shipped: "info", processing: "warning", cancelled: "error" };

export default function Tables() {
  const orderCols = useMemo(
    () => [
      { accessorKey: "id", header: "Order", cell: ({ getValue }) => <span className="font-mono text-[12.5px]">{getValue()}</span> },
      {
        accessorKey: "customer",
        header: "Customer",
        cell: ({ row }) => (
          <div className="flex items-center gap-2.5">
            <Avatar name={row.original.customer} size="xs" />
            <span>{row.original.customer}</span>
          </div>
        ),
      },
      { accessorKey: "date", header: "Date", cell: ({ getValue }) => date(getValue()) },
      { accessorKey: "items", header: "Items" },
      { accessorKey: "total", header: "Total", cell: ({ getValue }) => <span className="tabular-nums font-semibold">${getValue().toFixed(2)}</span> },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => <StatusPill tone={STATUS_TONE[getValue()]}>{getValue()}</StatusPill>,
      },
    ],
    []
  );

  const prodCols = useMemo(
    () => [
      { accessorKey: "name", header: "Product" },
      { accessorKey: "sku", header: "SKU", cell: ({ getValue }) => <span className="font-mono text-[12px]">{getValue()}</span> },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "price", header: "Price", cell: ({ getValue }) => <span className="tabular-nums font-semibold">${getValue()}</span> },
      {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ getValue }) => {
          const v = getValue();
          if (v === 0) return <Badge tone="error" size="sm">Out</Badge>;
          if (v < 40) return <Badge tone="warning" size="sm">{v}</Badge>;
          return <span className="tabular-nums">{v}</span>;
        },
      },
      { accessorKey: "sold", header: "Sold" },
    ],
    []
  );

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[1440px] mx-auto space-y-5">
      <motion.header variants={fadeUp}>
        <Badge tone="brand" size="sm" className="mb-1.5">Data tables</Badge>
        <h1 className="text-[24px] font-semibold tracking-tight">Tables</h1>
        <p className="mt-1 text-[14px] text-[var(--text-tertiary)]">
          Sortable columns, global search, pagination, and status rendering.
        </p>
      </motion.header>

      <motion.section variants={fadeUp}>
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>All orders across channels</CardDescription>
          </CardHeader>
          <div className="px-5 pb-5">
            <DataTable data={ORDERS} columns={orderCols} pageSize={10} searchKeys={["id", "customer", "email", "status"]} />
          </div>
        </Card>
      </motion.section>

      <motion.section variants={fadeUp}>
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Inventory and catalog performance</CardDescription>
          </CardHeader>
          <div className="px-5 pb-5">
            <DataTable data={PRODUCTS} columns={prodCols} pageSize={8} searchKeys={["name", "sku", "category"]} />
          </div>
        </Card>
      </motion.section>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EcomKpiRow } from "@/features/ecommerce/EcomKpiRow";
import { RevenueTrendCard } from "@/features/ecommerce/RevenueTrendCard";
import { CategoryBreakdownCard } from "@/features/ecommerce/CategoryBreakdownCard";
import { CountrySalesCard } from "@/features/ecommerce/CountrySalesCard";
import { RecentOrdersTable } from "@/features/ecommerce/RecentOrdersTable";
import { ProductsTable } from "@/features/ecommerce/ProductsTable";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } } };

export default function Ecommerce() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[1440px] mx-auto space-y-5">
      <motion.header variants={fadeUp} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge tone="success" size="sm">Commerce</Badge>
            <span className="text-[11.5px] font-mono text-[var(--text-tertiary)]">live inventory</span>
          </div>
          <h1 className="text-[24px] font-semibold tracking-tight">Storefront overview</h1>
          <p className="mt-1 text-[14px] text-[var(--text-tertiary)]">Sales, orders, and catalog — all in one place.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Download className="size-3.5" /> Export</Button>
          <Button variant="primary" size="sm"><Plus className="size-3.5" /> New product</Button>
        </div>
      </motion.header>

      <motion.section variants={fadeUp}><EcomKpiRow /></motion.section>
      <motion.section variants={fadeUp} className="grid grid-cols-12 gap-4">
        <RevenueTrendCard />
        <CategoryBreakdownCard />
      </motion.section>
      <motion.section variants={fadeUp} className="grid grid-cols-12 gap-4">
        <CountrySalesCard />
        <RecentOrdersTable />
      </motion.section>
      <motion.section variants={fadeUp} className="grid grid-cols-12 gap-4">
        <ProductsTable />
      </motion.section>
    </motion.div>
  );
}

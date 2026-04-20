import { motion } from "framer-motion";
import { DollarSign, ShoppingBag, Wallet, Undo2 } from "lucide-react";
import { KpiCard } from "@/components/kpi/KpiCard";
import { ECOM_KPIS } from "@/data/ecommerce";

const ICONS = { revenue: DollarSign, orders: ShoppingBag, aov: Wallet, refund: Undo2 };

export function EcomKpiRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {ECOM_KPIS.map((k, i) => (
        <motion.div
          key={k.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.06 }}
        >
          <KpiCard
            label={k.label}
            value={k.value}
            delta={k.delta}
            invertDelta={k.id === "refund"}
            valueFormatter={k.formatter}
            icon={ICONS[k.id]}
            iconTone={k.tone}
          />
        </motion.div>
      ))}
    </div>
  );
}

import { motion } from "framer-motion";
import { Users, ShoppingBag, Activity, DollarSign } from "lucide-react";
import { KpiCard } from "@/components/kpi/KpiCard";
import { KPIS } from "@/data/marketing";

const ICONS = { users: Users, shoppingBag: ShoppingBag, activity: Activity, dollarSign: DollarSign };

const SPARK = {
  brand: "var(--brand-500)",
  warning: "var(--warning-500)",
  info: "var(--info-500)",
  success: "var(--success-500)",
};

export function KpiRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {KPIS.map((kpi, i) => (
        <motion.div
          key={kpi.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          <KpiCard
            label={kpi.label}
            value={kpi.value}
            delta={kpi.delta}
            invertDelta={kpi.id === "orders"}
            valueFormatter={kpi.formatter}
            icon={ICONS[kpi.icon]}
            iconTone={kpi.tone}
            sparkline={kpi.spark}
            sparkColor={SPARK[kpi.tone]}
          />
        </motion.div>
      ))}
    </div>
  );
}

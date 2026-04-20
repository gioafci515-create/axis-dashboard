import { motion } from "framer-motion";
import { Users, Eye, LogOut, Clock } from "lucide-react";
import { KpiCard } from "@/components/kpi/KpiCard";
import { ANALYTICS_KPIS } from "@/data/analytics";

const ICONS = { visitors: Users, pageviews: Eye, bounce: LogOut, avgDuration: Clock };

export function AnalyticsKpiRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {ANALYTICS_KPIS.map((kpi, i) => (
        <motion.div
          key={kpi.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.06 }}
        >
          <KpiCard
            label={kpi.label}
            value={kpi.value}
            delta={kpi.delta}
            invertDelta={kpi.id === "bounce"}
            valueFormatter={kpi.formatter}
            icon={ICONS[kpi.id]}
            iconTone={kpi.tone}
            sparkline={kpi.spark}
          />
        </motion.div>
      ))}
    </div>
  );
}

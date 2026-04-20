import { motion } from "framer-motion";
import { Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnalyticsKpiRow } from "@/features/analytics/AnalyticsKpiRow";
import { HourlyTrafficCard } from "@/features/analytics/HourlyTrafficCard";
import { DeviceMixCard } from "@/features/analytics/DeviceMixCard";
import { TrafficSourcesCard } from "@/features/analytics/TrafficSourcesCard";
import { TopPagesCard } from "@/features/analytics/TopPagesCard";
import { ConversionCard } from "@/features/analytics/ConversionCard";
import { FunnelCard } from "@/features/analytics/FunnelCard";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } } };

export default function Analytics() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[1440px] mx-auto space-y-5">
      <motion.header variants={fadeUp} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge tone="info" size="sm">Analytics</Badge>
            <span className="text-[11.5px] font-mono text-[var(--text-tertiary)]">synced 2m ago</span>
          </div>
          <h1 className="text-[24px] font-semibold tracking-tight">Traffic & engagement</h1>
          <p className="mt-1 text-[14px] text-[var(--text-tertiary)]">Understand how visitors move through your product.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Filter className="size-3.5" /> Filters</Button>
          <Button variant="outline" size="sm"><Calendar className="size-3.5" /> Last 30 days</Button>
        </div>
      </motion.header>

      <motion.section variants={fadeUp}><AnalyticsKpiRow /></motion.section>
      <motion.section variants={fadeUp} className="grid grid-cols-12 gap-4">
        <HourlyTrafficCard />
        <DeviceMixCard />
      </motion.section>
      <motion.section variants={fadeUp} className="grid grid-cols-12 gap-4">
        <ConversionCard />
      </motion.section>
      <motion.section variants={fadeUp} className="grid grid-cols-12 gap-4">
        <TrafficSourcesCard />
        <TopPagesCard />
      </motion.section>
      <motion.section variants={fadeUp} className="grid grid-cols-12 gap-4">
        <FunnelCard />
      </motion.section>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { KpiRow } from "@/features/marketing/KpiRow";
import { SalesTrendCard } from "@/features/marketing/SalesTrendCard";
import { MonthlyTargetCard } from "@/features/marketing/MonthlyTargetCard";
import { StatisticsCard } from "@/features/marketing/StatisticsCard";
import { DemographicsCard } from "@/features/marketing/DemographicsCard";
import { RecentOrdersCard } from "@/features/marketing/RecentOrdersCard";
import { ChannelMixCard } from "@/features/marketing/ChannelMixCard";
import { TopProductsCard } from "@/features/marketing/TopProductsCard";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

export default function Marketing() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[1440px] mx-auto space-y-5">
      <motion.header variants={fadeUp} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge tone="brand" size="sm">Marketing</Badge>
            <span className="text-[11.5px] font-mono text-[var(--text-tertiary)]">
              refreshed just now
            </span>
          </div>
          <h1 className="text-[24px] font-semibold tracking-tight text-[var(--text-primary)]">
            Good to see you, Giorgi.
          </h1>
          <p className="mt-1 text-[14px] text-[var(--text-tertiary)]">
            Here's what's happening across your channels this month.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="size-3.5" /> Last 30 days
          </Button>
          <Button variant="primary" size="sm">
            <Download className="size-3.5" /> Export
          </Button>
        </div>
      </motion.header>

      <motion.section variants={fadeUp}>
        <KpiRow />
      </motion.section>

      <motion.section variants={fadeUp} className="grid grid-cols-12 gap-4">
        <SalesTrendCard />
        <MonthlyTargetCard />
      </motion.section>

      <motion.section variants={fadeUp} className="grid grid-cols-12 gap-4">
        <StatisticsCard />
      </motion.section>

      <motion.section variants={fadeUp} className="grid grid-cols-12 gap-4">
        <DemographicsCard />
        <RecentOrdersCard />
      </motion.section>

      <motion.section variants={fadeUp} className="grid grid-cols-12 gap-4">
        <ChannelMixCard />
        <TopProductsCard />
      </motion.section>
    </motion.div>
  );
}

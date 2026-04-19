import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { SparkLine } from "@/components/charts/SparkLine";
import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/cn";

function DeltaBadge({ delta, invertSign = false }) {
  if (delta == null) return null;
  const value = Number(delta);
  const sign = invertSign ? -value : value;
  const up = sign > 0;
  const flat = sign === 0;
  const tone = flat
    ? "text-[var(--text-tertiary)] bg-[var(--bg-muted)]"
    : up
    ? "text-[var(--success-500)] bg-success-50 dark:bg-success-500/10"
    : "text-[var(--error-500)] bg-error-50 dark:bg-error-500/10";
  const Icon = flat ? Minus : up ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 h-5 pl-1 pr-1.5 rounded-full text-[11.5px] font-semibold tabular-nums",
        tone
      )}
    >
      <Icon className="size-3" strokeWidth={2.5} />
      {Math.abs(value).toFixed(1)}%
    </span>
  );
}

export function KpiCard({
  label,
  value,
  valueFormatter = (v) => v.toLocaleString(),
  delta,
  deltaLabel = "vs last period",
  icon: Icon,
  iconTone = "brand",
  sparkline,
  sparkColor = "var(--brand-500)",
  invertDelta = false,
  loading = false,
  className,
}) {
  const animated = useCountUp(Number(value) || 0, { duration: 1200, enabled: !loading });

  const tonePalette = {
    brand: "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300",
    success: "bg-success-50 text-[var(--success-500)] dark:bg-success-500/10",
    warning: "bg-warning-50 text-[var(--warning-500)] dark:bg-warning-500/10",
    info: "bg-info-50 text-[var(--info-500)] dark:bg-info-500/10",
    error: "bg-error-50 text-[var(--error-500)] dark:bg-error-500/10",
    neutral: "bg-[var(--bg-muted)] text-[var(--text-secondary)]",
  };

  return (
    <Card className={cn("p-5 flex flex-col gap-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[12px] font-medium text-[var(--text-tertiary)] uppercase tracking-[0.04em]">
            {label}
          </p>
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-[28px] font-semibold tracking-[-0.02em] tabular-nums text-[var(--text-primary)]"
          >
            {loading ? "—" : valueFormatter(animated)}
          </motion.p>
        </div>
        {Icon && (
          <div className={cn("size-9 shrink-0 rounded-[var(--radius-md)] grid place-items-center", tonePalette[iconTone])}>
            <Icon className="size-4" strokeWidth={2} />
          </div>
        )}
      </div>

      <div className="flex items-end justify-between gap-3 mt-auto">
        <div className="flex items-center gap-2">
          <DeltaBadge delta={delta} invertSign={invertDelta} />
          <span className="text-[11.5px] text-[var(--text-tertiary)] truncate">
            {deltaLabel}
          </span>
        </div>
        {sparkline?.length ? (
          <SparkLine
            data={sparkline}
            width={80}
            height={30}
            stroke={sparkColor}
            fill={sparkColor}
          />
        ) : null}
      </div>
    </Card>
  );
}

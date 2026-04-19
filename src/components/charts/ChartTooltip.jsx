import { cn } from "@/lib/cn";

export function ChartTooltip({ active, payload, label, formatter, valueSuffix = "", className }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className={cn(
        "rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-elevated)] shadow-md px-3 py-2 text-[12px] min-w-[140px]",
        className
      )}
    >
      {label != null && (
        <p className="text-[11px] font-medium uppercase tracking-[0.04em] text-[var(--text-muted)] mb-1.5">
          {label}
        </p>
      )}
      <div className="space-y-1">
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="inline-block size-2 rounded-full shrink-0"
              style={{ backgroundColor: entry.color || entry.stroke || entry.fill }}
            />
            <span className="text-[var(--text-tertiary)] capitalize">
              {entry.name}
            </span>
            <span className="ml-auto font-semibold tabular-nums text-[var(--text-primary)]">
              {formatter ? formatter(entry.value) : entry.value}
              {valueSuffix}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

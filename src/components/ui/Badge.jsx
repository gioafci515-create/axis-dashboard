import { cn } from "@/lib/cn";

const TONES = {
  neutral:
    "bg-[var(--bg-muted)] text-[var(--text-secondary)] border border-[var(--border)]",
  brand:
    "bg-brand-50 text-brand-700 border border-brand-100 dark:bg-brand-500/10 dark:text-brand-300 dark:border-brand-500/20",
  success:
    "bg-success-50 text-[var(--success-500)] border border-[rgba(18,183,106,0.2)] dark:bg-success-500/10 dark:text-success-500",
  warning:
    "bg-warning-50 text-[var(--warning-500)] border border-[rgba(247,144,9,0.2)] dark:bg-warning-500/10 dark:text-warning-500",
  error:
    "bg-error-50 text-[var(--error-500)] border border-[rgba(240,68,56,0.2)] dark:bg-error-500/10 dark:text-error-500",
  info:
    "bg-info-50 text-[var(--info-500)] border border-[rgba(46,144,250,0.2)] dark:bg-info-500/10 dark:text-info-500",
};

const SIZES = {
  sm: "h-5 px-1.5 text-[10.5px]",
  md: "h-6 px-2 text-[11.5px]",
  lg: "h-7 px-2.5 text-[12.5px]",
};

export function Badge({
  tone = "neutral",
  size = "md",
  dot = false,
  className,
  children,
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium uppercase tracking-[0.04em] whitespace-nowrap",
        TONES[tone],
        SIZES[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "size-1.5 rounded-full",
            tone === "success" && "bg-success-500",
            tone === "warning" && "bg-warning-500",
            tone === "error" && "bg-error-500",
            tone === "info" && "bg-info-500",
            tone === "brand" && "bg-brand-500",
            tone === "neutral" && "bg-gray-400"
          )}
        />
      )}
      {children}
    </span>
  );
}

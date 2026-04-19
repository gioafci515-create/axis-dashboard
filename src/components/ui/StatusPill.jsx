import { cn } from "@/lib/cn";

const TONES = {
  success: "text-[var(--success-500)] bg-success-50 dark:bg-success-500/10",
  warning: "text-[var(--warning-500)] bg-warning-50 dark:bg-warning-500/10",
  error: "text-[var(--error-500)] bg-error-50 dark:bg-error-500/10",
  info: "text-[var(--info-500)] bg-info-50 dark:bg-info-500/10",
  neutral: "text-[var(--text-secondary)] bg-[var(--bg-muted)]",
};

const DOT = {
  success: "bg-success-500",
  warning: "bg-warning-500",
  error: "bg-error-500",
  info: "bg-info-500",
  neutral: "bg-gray-400",
};

export function StatusPill({ tone = "neutral", pulse = false, className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 h-6 pl-1.5 pr-2 rounded-full text-[11.5px] font-medium",
        TONES[tone],
        className
      )}
    >
      <span className="relative inline-flex size-1.5">
        {pulse && (
          <span
            aria-hidden
            className={cn(
              "absolute inset-0 rounded-full opacity-60 animate-ping",
              DOT[tone]
            )}
          />
        )}
        <span className={cn("relative rounded-full size-1.5", DOT[tone])} />
      </span>
      {children}
    </span>
  );
}

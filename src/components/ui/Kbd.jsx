import { cn } from "@/lib/cn";

export function Kbd({ className, children, ...props }) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center min-w-[18px] h-[18px] px-1",
        "rounded-[4px] border border-[var(--border)] bg-[var(--bg-surface)]",
        "font-mono text-[10px] text-[var(--text-tertiary)]",
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}

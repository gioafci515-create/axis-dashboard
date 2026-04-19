import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export const Select = forwardRef(function Select(
  { className, children, ...props },
  ref
) {
  return (
    <div className="relative w-full">
      <select
        ref={ref}
        className={cn(
          "block w-full h-9 appearance-none rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-surface)] pl-3 pr-8 text-[13.5px]",
          "text-[var(--text-primary)]",
          "focus:outline-none focus:border-brand-400 focus:shadow-[var(--shadow-focus)]",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[var(--text-tertiary)] pointer-events-none" />
    </div>
  );
});

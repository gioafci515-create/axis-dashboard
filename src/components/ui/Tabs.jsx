import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/cn";

export const Tabs = TabsPrimitive.Root;

export function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      className={cn(
        "inline-flex items-center gap-1 p-1 rounded-[var(--radius-md)] bg-[var(--bg-muted)]",
        className
      )}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex items-center justify-center h-7 px-3 rounded-[var(--radius-sm)] text-[12.5px] font-medium whitespace-nowrap",
        "text-[var(--text-secondary)] transition-colors",
        "hover:text-[var(--text-primary)]",
        "data-[state=active]:bg-[var(--bg-surface)] data-[state=active]:text-[var(--text-primary)] data-[state=active]:shadow-xs",
        "focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]",
        className
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Content
      className={cn("mt-4 focus-visible:outline-none", className)}
      {...props}
    />
  );
}

export function TabsUnderline({ className, ...props }) {
  return (
    <TabsPrimitive.List
      className={cn(
        "inline-flex items-center gap-5 border-b border-[var(--border)]",
        className
      )}
      {...props}
    />
  );
}

export function TabsUnderlineTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "relative h-9 text-[13px] font-medium text-[var(--text-secondary)] transition-colors",
        "hover:text-[var(--text-primary)]",
        "data-[state=active]:text-brand-600 dark:data-[state=active]:text-brand-400",
        "after:absolute after:inset-x-0 after:-bottom-px after:h-[2px] after:bg-brand-500 after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform",
        "focus-visible:outline-none",
        className
      )}
      {...props}
    />
  );
}

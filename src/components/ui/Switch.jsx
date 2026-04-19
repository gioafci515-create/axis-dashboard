import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/cn";

export function Switch({ className, ...props }) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors",
        "bg-[var(--gray-300)] dark:bg-[var(--gray-700)]",
        "data-[state=checked]:bg-brand-500",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block size-4 rounded-full bg-white shadow-sm ring-0 transition-transform",
          "translate-x-0.5 data-[state=checked]:translate-x-[18px]"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export function Checkbox({ className, ...props }) {
  return (
    <input
      type="checkbox"
      className={cn(
        "size-4 rounded border-[var(--border-strong)] bg-[var(--bg-surface)]",
        "text-brand-500 accent-brand-500",
        "focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]",
        className
      )}
      {...props}
    />
  );
}

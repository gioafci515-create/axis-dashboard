import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/cn";

export const TooltipProvider = TooltipPrimitive.Provider;

export function Tooltip({ children, content, side = "top", align = "center", delayDuration = 200 }) {
  if (!content) return children;
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            sideOffset={6}
            className={cn(
              "z-50 rounded-[var(--radius-sm)] px-2 py-1 bg-[var(--gray-900)] text-white dark:bg-[var(--gray-25)] dark:text-[var(--gray-900)] text-[11.5px] font-medium shadow-md",
              "data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95"
            )}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-[var(--gray-900)] dark:fill-[var(--gray-25)]" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export const Dropdown = DropdownMenu.Root;
export const DropdownTrigger = DropdownMenu.Trigger;
export const DropdownGroup = DropdownMenu.Group;

const contentClasses = cn(
  "z-50 min-w-[10rem] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] shadow-lg p-1",
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
);

const itemClasses = cn(
  "relative flex items-center gap-2 px-2.5 h-8 rounded-[var(--radius-sm)] cursor-pointer select-none outline-none text-[13px] text-[var(--text-secondary)]",
  "data-[highlighted]:bg-[var(--bg-hover)] data-[highlighted]:text-[var(--text-primary)]",
  "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
  "[&_svg]:size-3.5 [&_svg]:text-[var(--text-tertiary)]"
);

export function DropdownContent({ className, sideOffset = 6, ...props }) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        sideOffset={sideOffset}
        className={cn(contentClasses, className)}
        {...props}
      />
    </DropdownMenu.Portal>
  );
}

export function DropdownItem({ className, inset, children, shortcut, ...props }) {
  return (
    <DropdownMenu.Item
      className={cn(itemClasses, inset && "pl-8", className)}
      {...props}
    >
      {children}
      {shortcut && (
        <span className="ml-auto font-mono text-[11px] text-[var(--text-muted)]">
          {shortcut}
        </span>
      )}
    </DropdownMenu.Item>
  );
}

export function DropdownLabel({ className, children, ...props }) {
  return (
    <DropdownMenu.Label
      className={cn(
        "px-2.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[var(--text-muted)]",
        className
      )}
      {...props}
    >
      {children}
    </DropdownMenu.Label>
  );
}

export function DropdownSeparator({ className }) {
  return (
    <DropdownMenu.Separator
      className={cn("my-1 h-px bg-[var(--border)]", className)}
    />
  );
}

export function DropdownCheckboxItem({ className, checked, children, ...props }) {
  return (
    <DropdownMenu.CheckboxItem
      checked={checked}
      className={cn(itemClasses, "pl-8", className)}
      {...props}
    >
      <span className="absolute left-2 flex items-center justify-center size-3.5">
        <DropdownMenu.ItemIndicator>
          <Check className="size-3.5" />
        </DropdownMenu.ItemIndicator>
      </span>
      {children}
    </DropdownMenu.CheckboxItem>
  );
}

export function DropdownSub({ children }) {
  return <DropdownMenu.Sub>{children}</DropdownMenu.Sub>;
}

export function DropdownSubTrigger({ className, children, ...props }) {
  return (
    <DropdownMenu.SubTrigger className={cn(itemClasses, className)} {...props}>
      {children}
      <ChevronRight className="ml-auto size-3.5" />
    </DropdownMenu.SubTrigger>
  );
}

export function DropdownSubContent({ className, ...props }) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.SubContent className={cn(contentClasses, className)} {...props} />
    </DropdownMenu.Portal>
  );
}

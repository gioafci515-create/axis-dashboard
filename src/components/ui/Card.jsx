import { cn } from "@/lib/cn";

export function Card({ className, as: Comp = "div", children, ...props }) {
  return (
    <Comp
      className={cn(
        "rounded-[var(--radius-xl)] bg-[var(--bg-surface)] border border-[var(--border)] shadow-xs",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function CardHeader({ className, children, action, ...props }) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 px-5 pt-5 pb-4",
        className
      )}
      {...props}
    >
      <div className="min-w-0">{children}</div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3
      className={cn(
        "text-[15px] font-semibold tracking-tight text-[var(--text-primary)]",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }) {
  return (
    <p
      className={cn(
        "mt-1 text-[13px] text-[var(--text-tertiary)]",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardBody({ className, children, ...props }) {
  return (
    <div className={cn("px-5 pb-5", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-5 py-3 border-t border-[var(--border)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

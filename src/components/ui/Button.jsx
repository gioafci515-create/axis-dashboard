import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/cn";

const VARIANTS = {
  primary:
    "bg-brand-500 text-white shadow-sm hover:bg-brand-600 active:bg-brand-700 focus-visible:shadow-[var(--shadow-focus)]",
  secondary:
    "bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border)] shadow-xs hover:bg-[var(--bg-hover)] hover:border-[var(--border-strong)]",
  soft:
    "bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-300 dark:hover:bg-brand-500/20",
  ghost:
    "bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]",
  outline:
    "bg-transparent text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--bg-hover)] hover:border-[var(--border-strong)]",
  destructive:
    "bg-error-500 text-white shadow-sm hover:brightness-110 active:brightness-95",
  link: "text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline-offset-4 hover:underline px-0",
};

const SIZES = {
  xs: "h-7 px-2.5 text-[12px] gap-1 [&_svg]:size-3",
  sm: "h-8 px-3 text-[13px] gap-1.5 [&_svg]:size-3.5",
  md: "h-9 px-3.5 text-[13.5px] gap-1.5 [&_svg]:size-4",
  lg: "h-10 px-4 text-[14px] gap-2 [&_svg]:size-4",
  icon: "h-9 w-9 [&_svg]:size-4",
  "icon-sm": "h-8 w-8 [&_svg]:size-3.5",
};

export const Button = forwardRef(function Button(
  {
    className,
    variant = "secondary",
    size = "md",
    asChild = false,
    loading = false,
    disabled,
    type = "button",
    children,
    ...props
  },
  ref
) {
  const classes = cn(
    "inline-flex items-center justify-center whitespace-nowrap font-medium rounded-[var(--radius-md)] select-none",
    "transition-[background,color,border-color,box-shadow,transform] duration-150",
    "focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:shrink-0",
    VARIANTS[variant],
    SIZES[size],
    className
  );

  if (asChild) {
    return (
      <Slot ref={ref} className={classes} {...props}>
        {children}
      </Slot>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || loading}
      data-loading={loading ? "" : undefined}
      {...props}
    >
      {loading && (
        <span
          aria-hidden
          className="size-3.5 rounded-full border-[1.5px] border-current border-t-transparent animate-spin"
        />
      )}
      {children}
    </button>
  );
});

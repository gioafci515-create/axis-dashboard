import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export const Input = forwardRef(function Input(
  { className, type = "text", leftIcon, rightIcon, error, ...props },
  ref
) {
  return (
    <div className="relative w-full">
      {leftIcon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none [&_svg]:size-4">
          {leftIcon}
        </span>
      )}
      <input
        ref={ref}
        type={type}
        className={cn(
          "block w-full h-9 rounded-[var(--radius-md)] border bg-[var(--bg-surface)] px-3 text-[13.5px]",
          "text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]",
          "transition-[border-color,box-shadow] duration-150",
          "focus:outline-none focus:border-brand-400 focus:shadow-[var(--shadow-focus)]",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          error
            ? "border-error-500 focus:border-error-500 focus:shadow-[0_0_0_4px_rgba(240,68,56,0.12)]"
            : "border-[var(--border)]",
          leftIcon && "pl-9",
          rightIcon && "pr-9",
          className
        )}
        {...props}
      />
      {rightIcon && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] [&_svg]:size-4">
          {rightIcon}
        </span>
      )}
    </div>
  );
});

export function Textarea({ className, error, rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      className={cn(
        "block w-full rounded-[var(--radius-md)] border bg-[var(--bg-surface)] px-3 py-2 text-[13.5px]",
        "text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]",
        "transition-[border-color,box-shadow] duration-150",
        "focus:outline-none focus:border-brand-400 focus:shadow-[var(--shadow-focus)]",
        "resize-y",
        error
          ? "border-error-500 focus:border-error-500"
          : "border-[var(--border)]",
        className
      )}
      {...props}
    />
  );
}

export function Label({ className, required, children, ...props }) {
  return (
    <label
      className={cn(
        "block text-[13px] font-medium text-[var(--text-secondary)] mb-1.5",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-error-500 ml-0.5">*</span>}
    </label>
  );
}

export function HelperText({ error, children, className }) {
  if (!children) return null;
  return (
    <p
      className={cn(
        "mt-1.5 text-[12px]",
        error ? "text-error-500" : "text-[var(--text-tertiary)]",
        className
      )}
    >
      {children}
    </p>
  );
}

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/cn";
import { initials as getInitials } from "@/lib/format";

const SIZES = {
  xs: "size-6 text-[10px]",
  sm: "size-7 text-[11px]",
  md: "size-9 text-[12px]",
  lg: "size-11 text-[14px]",
  xl: "size-14 text-[16px]",
};

export function Avatar({
  src,
  alt = "",
  name,
  size = "md",
  status,
  className,
}) {
  const label = name || alt;
  return (
    <div className={cn("relative inline-block", className)}>
      <AvatarPrimitive.Root
        className={cn(
          "inline-flex items-center justify-center overflow-hidden rounded-full select-none bg-gradient-to-br from-brand-400 to-brand-600 text-white font-semibold",
          SIZES[size]
        )}
      >
        {src && (
          <AvatarPrimitive.Image
            src={src}
            alt={label}
            className="size-full object-cover"
          />
        )}
        <AvatarPrimitive.Fallback className="size-full flex items-center justify-center">
          {getInitials(label) || "—"}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
      {status && (
        <span
          aria-hidden
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-2 ring-[var(--bg-surface)]",
            size === "xs" || size === "sm" ? "size-1.5" : "size-2",
            status === "online" && "bg-success-500",
            status === "away" && "bg-warning-500",
            status === "busy" && "bg-error-500",
            status === "offline" && "bg-gray-400"
          )}
        />
      )}
    </div>
  );
}

export function AvatarGroup({ children, max = 4, size = "md", className }) {
  const arr = Array.isArray(children) ? children : [children];
  const shown = arr.slice(0, max);
  const extra = arr.length - shown.length;
  const ringPx =
    size === "xs" ? "ring-2" : size === "sm" ? "ring-2" : "ring-2";

  return (
    <div className={cn("flex -space-x-2", className)}>
      {shown.map((c, i) => (
        <div key={i} className={cn(ringPx, "ring-[var(--bg-surface)] rounded-full")}>
          {c}
        </div>
      ))}
      {extra > 0 && (
        <div
          className={cn(
            "rounded-full bg-[var(--bg-muted)] text-[var(--text-secondary)] font-semibold inline-flex items-center justify-center",
            SIZES[size],
            ringPx,
            "ring-[var(--bg-surface)]"
          )}
        >
          +{extra}
        </div>
      )}
    </div>
  );
}

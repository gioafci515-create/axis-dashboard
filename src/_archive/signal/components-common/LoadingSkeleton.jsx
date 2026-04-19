import { cn } from "@/utils/format";

export function Skeleton({ className, style }) {
  return <div className={cn("skeleton", className)} style={style} />;
}

export function TableSkeleton({ rows = 8, columns = 5 }) {
  return (
    <div className="space-y-0">
      {/* Header */}
      <div className="flex gap-4 px-3 py-3 border-b" style={{ borderColor: "var(--border-subtle)" }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-3" style={{ width: `${60 + Math.random() * 60}px` }} />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 px-3 py-3 border-b" style={{ borderColor: "var(--border-subtle)" }}>
          {Array.from({ length: columns }).map((_, c) => (
            <Skeleton key={c} className="h-4" style={{ width: `${40 + Math.random() * 80}px` }} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton({ height = 320 }) {
  return <Skeleton className="w-full rounded-lg" style={{ height }} />;
}

export function KPISkeleton({ count = 4 }) {
  return (
    <div className="flex border rounded-lg" style={{ borderColor: "var(--border-subtle)" }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={cn("flex-1 px-5 py-4", i > 0 && "border-l")} style={{ borderColor: "var(--border-subtle)" }}>
          <Skeleton className="h-3 w-16 mb-2" />
          <Skeleton className="h-7 w-24 mb-2" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  );
}

import { cn } from "@/utils/format";

const statusStyles = {
  active: { color: "var(--success)", bg: "var(--success-muted)", label: "Active" },
  churned: { color: "var(--danger)", bg: "var(--danger-muted)", label: "Churned" },
  trial: { color: "var(--info)", bg: "var(--info-muted)", label: "Trial" },
  paused: { color: "var(--warning)", bg: "var(--warning-muted)", label: "Paused" },
  invited: { color: "var(--text-tertiary)", bg: "var(--bg-overlay)", label: "Invited" },
  connected: { color: "var(--success)", bg: "var(--success-muted)", label: "Connected" },
  disconnected: { color: "var(--text-tertiary)", bg: "var(--bg-overlay)", label: "Disconnected" },
  revoked: { color: "var(--danger)", bg: "var(--danger-muted)", label: "Revoked" },
  success: { color: "var(--success)", bg: "var(--success-muted)", label: "Success" },
  error: { color: "var(--danger)", bg: "var(--danger-muted)", label: "Error" },
  warning: { color: "var(--warning)", bg: "var(--warning-muted)", label: "Warning" },
};

export default function StatusBadge({ status, label }) {
  const style = statusStyles[status] || statusStyles.active;
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[12px] font-medium px-2 py-0.5 rounded"
      style={{ color: style.color, backgroundColor: style.bg }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: style.color }}
      />
      {label || style.label}
    </span>
  );
}

export function formatCurrency(value, compact = false) {
  if (compact && Math.abs(value) >= 1000000) {
    return "$" + (value / 1000000).toFixed(1) + "M";
  }
  if (compact && Math.abs(value) >= 1000) {
    return "$" + (value / 1000).toFixed(1) + "k";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value, compact = false) {
  if (compact && Math.abs(value) >= 1000000) {
    return (value / 1000000).toFixed(1) + "M";
  }
  if (compact && Math.abs(value) >= 1000) {
    return (value / 1000).toFixed(1) + "k";
  }
  return new Intl.NumberFormat("en-US").format(Math.round(value));
}

export function formatPercent(value) {
  return value.toFixed(1) + "%";
}

export function formatDelta(value) {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

export function formatCompactNumber(value) {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

export function formatRelativeTime(dateStr) {
  const date = new Date(dateStr);
  const now = new Date(2026, 3, 17, 14, 30, 0);
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatDate(dateStr, style = "short") {
  const date = new Date(dateStr);
  if (style === "short") {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }
  if (style === "time") {
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  }
  if (style === "full") {
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }
  return date.toLocaleDateString("en-US");
}

export function formatMetricValue(value, format) {
  switch (format) {
    case "currency": return formatCurrency(value, true);
    case "percent": return formatPercent(value);
    case "number": return formatNumber(value, true);
    default: return String(value);
  }
}

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

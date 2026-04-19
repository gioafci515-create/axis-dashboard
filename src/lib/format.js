import { format, formatDistanceToNowStrict, parseISO } from "date-fns";

const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const USD_CENTS = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const COMPACT = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const NUM = new Intl.NumberFormat("en-US");

const PCT = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
});

export function currency(n, { cents = false } = {}) {
  if (n == null || Number.isNaN(n)) return "—";
  return cents ? USD_CENTS.format(n) : USD.format(n);
}

export function compactNumber(n) {
  if (n == null || Number.isNaN(n)) return "—";
  return COMPACT.format(n);
}

export function number(n) {
  if (n == null || Number.isNaN(n)) return "—";
  return NUM.format(n);
}

export function percent(n, { fromRatio = true } = {}) {
  if (n == null || Number.isNaN(n)) return "—";
  return PCT.format(fromRatio ? n : n / 100);
}

export function delta(n) {
  if (n == null || Number.isNaN(n)) return "—";
  const sign = n > 0 ? "+" : n < 0 ? "" : "";
  return `${sign}${PCT.format(n)}`;
}

export function date(d, pattern = "MMM d, yyyy") {
  if (!d) return "—";
  const dt = typeof d === "string" ? parseISO(d) : d;
  return format(dt, pattern);
}

export function dateTime(d) {
  return date(d, "MMM d, yyyy · h:mm a");
}

export function relativeTime(d) {
  if (!d) return "—";
  const dt = typeof d === "string" ? parseISO(d) : d;
  return formatDistanceToNowStrict(dt, { addSuffix: true });
}

export function initials(name = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

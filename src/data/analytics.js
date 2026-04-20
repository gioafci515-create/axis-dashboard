function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(91);

export const ANALYTICS_KPIS = [
  {
    id: "visitors",
    label: "Unique visitors",
    value: 68420,
    delta: 8.42,
    tone: "brand",
    spark: Array.from({ length: 14 }, (_, i) => 60000 + i * 400 + Math.round(rand() * 3000)),
    formatter: (v) => `${(v / 1000).toFixed(1)}k`,
  },
  {
    id: "pageviews",
    label: "Page views",
    value: 184209,
    delta: 12.1,
    tone: "info",
    spark: Array.from({ length: 14 }, (_, i) => 160000 + i * 1200 + Math.round(rand() * 6000)),
    formatter: (v) => `${(v / 1000).toFixed(1)}k`,
  },
  {
    id: "bounce",
    label: "Bounce rate",
    value: 38.4,
    delta: -2.2,
    tone: "success",
    spark: Array.from({ length: 14 }, (_, i) => 42 - i * 0.2 + rand() * 2),
    formatter: (v) => `${v.toFixed(1)}%`,
  },
  {
    id: "avgDuration",
    label: "Avg. session",
    value: 3.42,
    delta: 5.8,
    tone: "warning",
    spark: Array.from({ length: 14 }, (_, i) => 3 + Math.sin(i / 3) * 0.4 + rand() * 0.3),
    formatter: (v) => `${v.toFixed(2)}m`,
  },
];

const HOURS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

export const HOURLY_TRAFFIC = HOURS.map((h, i) => ({
  label: h,
  visitors: Math.round(400 + Math.sin((i - 8) / 3) * 420 + rand() * 100 + (i >= 9 && i <= 20 ? 300 : 0)),
  sessions: Math.round(280 + Math.sin((i - 8) / 3) * 300 + rand() * 80 + (i >= 9 && i <= 20 ? 200 : 0)),
}));

export const TRAFFIC_SOURCES = [
  { name: "Organic Search", value: 34280, color: "var(--chart-1)" },
  { name: "Direct", value: 18920, color: "var(--chart-4)" },
  { name: "Paid Social", value: 14680, color: "var(--chart-2)" },
  { name: "Referral", value: 9120, color: "var(--chart-3)" },
  { name: "Email", value: 6200, color: "var(--chart-6)" },
  { name: "Other", value: 3580, color: "var(--chart-7)" },
];

export const DEVICE_MIX = [
  { name: "Desktop", value: 58.4, color: "var(--chart-1)" },
  { name: "Mobile", value: 34.2, color: "var(--chart-4)" },
  { name: "Tablet", value: 7.4, color: "var(--chart-3)" },
];

export const TOP_PAGES = [
  { path: "/", views: 42840, change: 12.4, avgTime: "2:48" },
  { path: "/pricing", views: 18410, change: 8.1, avgTime: "3:24" },
  { path: "/blog", views: 14280, change: -3.2, avgTime: "4:11" },
  { path: "/docs", views: 12940, change: 22.8, avgTime: "6:02" },
  { path: "/signup", views: 9820, change: 18.4, avgTime: "1:42" },
  { path: "/features", views: 7120, change: 4.2, avgTime: "2:18" },
  { path: "/about", views: 4280, change: -1.2, avgTime: "1:34" },
];

const DAYS = Array.from({ length: 30 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (29 - i));
  return d.toISOString().slice(5, 10);
});

export const CONVERSIONS = DAYS.map((d, i) => ({
  label: d,
  rate: 2.1 + Math.sin(i / 5) * 0.5 + rand() * 0.3,
  signups: Math.round(80 + Math.sin(i / 4) * 30 + rand() * 20),
}));

export const FUNNEL = [
  { step: "Visit", count: 68420, pct: 100 },
  { step: "Signup", count: 18240, pct: 26.7 },
  { step: "Activation", count: 9820, pct: 14.4 },
  { step: "Purchase", count: 4190, pct: 6.1 },
  { step: "Retention", count: 2980, pct: 4.4 },
];

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

const rand = mulberry32(19);

export const KPIS = [
  {
    id: "customers",
    label: "Customers",
    value: 3782,
    delta: 11.01,
    icon: "users",
    tone: "brand",
    spark: Array.from({ length: 14 }, (_, i) => 3400 + Math.round(rand() * 500) + i * 20),
    formatter: (v) => Math.round(v).toLocaleString(),
  },
  {
    id: "orders",
    label: "Orders",
    value: 5359,
    delta: -9.05,
    icon: "shoppingBag",
    tone: "warning",
    spark: Array.from({ length: 14 }, (_, i) => 5700 - i * 15 + Math.round(rand() * 200)),
    formatter: (v) => Math.round(v).toLocaleString(),
  },
  {
    id: "sessions",
    label: "Sessions",
    value: 128420,
    delta: 3.74,
    icon: "activity",
    tone: "info",
    spark: Array.from({ length: 14 }, (_, i) => 118000 + i * 400 + Math.round(rand() * 4000)),
    formatter: (v) =>
      v >= 1000 ? `${(v / 1000).toFixed(1)}k` : Math.round(v).toLocaleString(),
  },
  {
    id: "revenue",
    label: "Revenue",
    value: 284950,
    delta: 14.82,
    icon: "dollarSign",
    tone: "success",
    spark: Array.from({ length: 14 }, (_, i) => 250000 + i * 1800 + Math.round(rand() * 10000)),
    formatter: (v) => `$${Math.round(v / 1000)}k`,
  },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const MONTHLY_SALES = MONTHS.map((m, i) => ({
  label: m,
  revenue: 18000 + Math.round(rand() * 8000) + (i < 6 ? i * 800 : (11 - i) * 600),
  orders: 240 + Math.round(rand() * 120) + (i < 6 ? i * 10 : (11 - i) * 8),
}));

export const TARGET = {
  value: 72.4,
  max: 100,
  deltaPct: 10,
  today: 3287,
  revenue: 20000,
  target: 25000,
};

const DAYS = Array.from({ length: 30 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (29 - i));
  return d.toISOString().slice(5, 10);
});

export const STATISTICS = {
  revenue: DAYS.map((d, i) => ({
    label: d,
    current: 8000 + Math.round(rand() * 3000) + i * 120,
    previous: 7200 + Math.round(rand() * 2600) + i * 90,
  })),
  sales: DAYS.map((d, i) => ({
    label: d,
    current: 110 + Math.round(rand() * 50) + Math.round(Math.sin(i / 4) * 18),
    previous: 95 + Math.round(rand() * 40) + Math.round(Math.sin(i / 5) * 12),
  })),
};

export const DEMOGRAPHICS = [
  { country: "United States", flag: "US", users: 24802, pct: 36.8 },
  { country: "United Kingdom", flag: "GB", users: 13410, pct: 19.9 },
  { country: "Germany", flag: "DE", users: 9220, pct: 13.7 },
  { country: "India", flag: "IN", users: 7680, pct: 11.4 },
  { country: "Australia", flag: "AU", users: 4510, pct: 6.7 },
  { country: "Brazil", flag: "BR", users: 3890, pct: 5.8 },
  { country: "Japan", flag: "JP", users: 2680, pct: 4.0 },
];

export const RECENT_ORDERS = [
  { id: "#A-8421", product: "Apple Watch Ultra", category: "Wearables", price: 799, status: "delivered", customer: "Julia Rhodes" },
  { id: "#A-8420", product: "iPhone 15 Pro Max", category: "Phones", price: 1299, status: "shipped", customer: "Marcus Klein" },
  { id: "#A-8419", product: "MacBook Air M3", category: "Laptops", price: 1499, status: "processing", customer: "Sana Patel" },
  { id: "#A-8418", product: "AirPods Pro 2", category: "Audio", price: 249, status: "delivered", customer: "Oliver Finch" },
  { id: "#A-8417", product: "iPad Air 13\"", category: "Tablets", price: 799, status: "cancelled", customer: "Amelia Yates" },
  { id: "#A-8416", product: "Mac Studio", category: "Desktops", price: 2499, status: "shipped", customer: "Daniel Cross" },
  { id: "#A-8415", product: "Studio Display", category: "Monitors", price: 1599, status: "delivered", customer: "Priya Shah" },
];

export const TOP_PRODUCTS = [
  { name: "iPhone 15 Pro Max", revenue: 128400, pct: 100, sku: "IP15-PM-256" },
  { name: "MacBook Air M3", revenue: 94800, pct: 74, sku: "MBA-M3-13" },
  { name: "Apple Watch Ultra", revenue: 61200, pct: 48, sku: "AW-ULTRA-2" },
  { name: "iPad Air 13\"", revenue: 42800, pct: 33, sku: "IPA-13-256" },
  { name: "AirPods Pro 2", revenue: 31500, pct: 25, sku: "APP-2-USB" },
];

export const CHANNEL_MIX = [
  { name: "Organic", value: 42.8, color: "var(--chart-1)" },
  { name: "Paid Social", value: 24.1, color: "var(--chart-4)" },
  { name: "Email", value: 14.7, color: "var(--chart-2)" },
  { name: "Referral", value: 10.3, color: "var(--chart-3)" },
  { name: "Direct", value: 8.1, color: "var(--chart-6)" },
];

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

const rand = mulberry32(47);

export const ECOM_KPIS = [
  { id: "revenue", label: "Gross revenue", value: 482910, delta: 18.2, tone: "success", formatter: (v) => `$${(v/1000).toFixed(1)}k` },
  { id: "orders", label: "Orders", value: 1284, delta: 9.4, tone: "brand", formatter: (v) => Math.round(v).toLocaleString() },
  { id: "aov", label: "Avg. order value", value: 376.04, delta: 4.1, tone: "info", formatter: (v) => `$${v.toFixed(2)}` },
  { id: "refund", label: "Refund rate", value: 1.82, delta: -0.4, tone: "warning", formatter: (v) => `${v.toFixed(2)}%` },
];

const DAYS = Array.from({ length: 30 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (29 - i));
  return d.toISOString().slice(5, 10);
});

export const REVENUE_TREND = DAYS.map((d, i) => ({
  label: d,
  revenue: Math.round(12000 + Math.sin(i / 4) * 3000 + i * 120 + rand() * 1800),
  orders: Math.round(38 + Math.sin(i / 5) * 10 + rand() * 8),
}));

export const CATEGORY_BREAKDOWN = [
  { name: "Electronics", value: 184200, color: "var(--chart-1)" },
  { name: "Apparel", value: 112400, color: "var(--chart-2)" },
  { name: "Home", value: 82800, color: "var(--chart-3)" },
  { name: "Beauty", value: 54200, color: "var(--chart-4)" },
  { name: "Sports", value: 31200, color: "var(--chart-6)" },
  { name: "Other", value: 18110, color: "var(--chart-7)" },
];

export const COUNTRY_SALES = [
  { country: "United States", flag: "US", revenue: 184200, orders: 428 },
  { country: "Germany", flag: "DE", revenue: 72400, orders: 192 },
  { country: "United Kingdom", flag: "GB", revenue: 61800, orders: 164 },
  { country: "Japan", flag: "JP", revenue: 42900, orders: 118 },
  { country: "Canada", flag: "CA", revenue: 38200, orders: 102 },
  { country: "Australia", flag: "AU", revenue: 29400, orders: 76 },
  { country: "France", flag: "FR", revenue: 26200, orders: 68 },
  { country: "Brazil", flag: "BR", revenue: 14800, orders: 42 },
];

export const PRODUCTS = [
  { sku: "PM-IP15-256", name: "iPhone 15 Pro Max 256GB", category: "Electronics", price: 1199, stock: 142, sold: 284, rating: 4.8 },
  { sku: "MB-AIR-M3",   name: "MacBook Air M3 13\"",      category: "Electronics", price: 1299, stock: 68,  sold: 194, rating: 4.9 },
  { sku: "AW-ULTRA-2",  name: "Apple Watch Ultra 2",       category: "Electronics", price: 799,  stock: 212, sold: 168, rating: 4.7 },
  { sku: "IPA-13-256",  name: "iPad Air 13\" 256GB",       category: "Electronics", price: 799,  stock: 94,  sold: 142, rating: 4.6 },
  { sku: "APP-2-USBC",  name: "AirPods Pro 2 USB-C",       category: "Electronics", price: 249,  stock: 0,   sold: 820, rating: 4.8 },
  { sku: "HDS-XM5",     name: "Sony WH-1000XM5",           category: "Electronics", price: 399,  stock: 38,  sold: 112, rating: 4.7 },
  { sku: "KBR-MX3",     name: "Logi MX Keys Mini",         category: "Electronics", price: 129,  stock: 86,  sold: 98,  rating: 4.5 },
  { sku: "CHR-H3",      name: "Herman Miller Aeron",       category: "Home",        price: 1499, stock: 12,  sold: 24,  rating: 4.9 },
  { sku: "LMP-TW22",    name: "Wall Sconce Twin",          category: "Home",        price: 189,  stock: 54,  sold: 72,  rating: 4.4 },
  { sku: "SHOE-RUN",    name: "Running Shoe X",            category: "Apparel",     price: 149,  stock: 218, sold: 284, rating: 4.3 },
  { sku: "JKT-BMB",     name: "Bomber Jacket",             category: "Apparel",     price: 219,  stock: 62,  sold: 114, rating: 4.5 },
  { sku: "SK-LOT",      name: "Serum + Moisturizer",       category: "Beauty",      price: 89,   stock: 128, sold: 208, rating: 4.6 },
];

export const ORDERS = Array.from({ length: 48 }, (_, i) => {
  const statuses = ["delivered", "shipped", "processing", "cancelled"];
  const status = statuses[Math.floor(rand() * 4)];
  const items = 1 + Math.floor(rand() * 4);
  const total = Math.round((120 + rand() * 1600) * 100) / 100;
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(rand() * 30));
  const customers = ["Julia Rhodes", "Marcus Klein", "Sana Patel", "Oliver Finch", "Amelia Yates", "Daniel Cross", "Priya Shah", "Noah Park", "Maya Ellis", "Kenji Ito"];
  return {
    id: `#A-${8500 - i}`,
    customer: customers[Math.floor(rand() * customers.length)],
    email: `cust${9000 + i}@example.com`,
    date: d.toISOString(),
    items,
    total,
    status,
    channel: ["Web", "Mobile", "POS"][Math.floor(rand() * 3)],
  };
});

import { rand, randInt } from "./seed";

// Generate 14 months of daily data points
function generateTimeSeries(startValue, volatility = 0.03, trend = 0.002, days = 420) {
  const data = [];
  let value = startValue;
  const startDate = new Date(2025, 1, 1); // Feb 2025

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dayOfWeek = date.getDay();
    const weekendDip = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.85 : 1;
    const noise = (rand() - 0.5) * 2 * volatility;
    value = value * (1 + trend + noise) * weekendDip;
    if (weekendDip < 1) value = value / weekendDip * (1 + trend); // recover base

    data.push({
      date: date.toISOString().split("T")[0],
      value: Math.round(value * 100) / 100,
    });
  }
  return data;
}

function aggregateToWeekly(daily) {
  const weeks = [];
  for (let i = 0; i < daily.length; i += 7) {
    const chunk = daily.slice(i, i + 7);
    const avg = chunk.reduce((s, d) => s + d.value, 0) / chunk.length;
    weeks.push({ date: chunk[0].date, value: Math.round(avg * 100) / 100 });
  }
  return weeks;
}

function aggregateToMonthly(daily) {
  const months = {};
  daily.forEach((d) => {
    const key = d.date.slice(0, 7);
    if (!months[key]) months[key] = { sum: 0, count: 0 };
    months[key].sum += d.value;
    months[key].count++;
  });
  return Object.entries(months).map(([date, { sum, count }]) => ({
    date,
    value: Math.round((sum / count) * 100) / 100,
  }));
}

// KPI data
export const mrrDaily = generateTimeSeries(284000, 0.008, 0.0015);
export const arrDaily = mrrDaily.map((d) => ({ ...d, value: d.value * 12 }));
export const activeUsersDaily = generateTimeSeries(12400, 0.04, 0.003);
export const newSignupsDaily = generateTimeSeries(87, 0.08, 0.004);
export const churnRateDaily = generateTimeSeries(2.4, 0.06, -0.001);
export const nrrDaily = generateTimeSeries(112, 0.02, 0.001);
export const avgRevenuePerUser = generateTimeSeries(67, 0.03, 0.002);
export const trialConversionDaily = generateTimeSeries(24.5, 0.05, 0.002);

// Multi-series revenue data for main chart
export const revenueByPlan = {
  enterprise: generateTimeSeries(98000, 0.01, 0.003),
  business: generateTimeSeries(72000, 0.015, 0.002),
  pro: generateTimeSeries(84000, 0.02, 0.0025),
  starter: generateTimeSeries(24000, 0.03, 0.001),
  free: generateTimeSeries(0, 0, 0).map((d) => ({ ...d, value: 0 })),
};

// Combine into chart-ready format
export function getRevenueChartData(granularity = "day") {
  const plans = Object.keys(revenueByPlan);
  const base = revenueByPlan[plans[0]];
  const aggregate = granularity === "week" ? aggregateToWeekly :
                    granularity === "month" ? aggregateToMonthly : (d) => d;

  const aggregated = {};
  plans.forEach((plan) => {
    aggregated[plan] = aggregate(revenueByPlan[plan]);
  });

  const len = aggregated[plans[0]].length;
  const result = [];
  for (let i = 0; i < len; i++) {
    const point = { date: aggregated[plans[0]][i].date };
    plans.forEach((plan) => {
      point[plan] = aggregated[plan][i]?.value || 0;
    });
    result.push(point);
  }
  return result;
}

// Top movers data
export const topMovers = [
  { rank: 1, name: "Stripe", metric: 48200, delta: 23.4 },
  { rank: 2, name: "Vercel", metric: 36800, delta: 18.7 },
  { rank: 3, name: "Linear", metric: 29400, delta: 15.2 },
  { rank: 4, name: "Notion", metric: 24100, delta: -8.3 },
  { rank: 5, name: "Figma", metric: 21700, delta: 12.1 },
  { rank: 6, name: "Retool", metric: 18900, delta: -14.6 },
  { rank: 7, name: "Supabase", metric: 16200, delta: 31.8 },
  { rank: 8, name: "PlanetScale", metric: 14800, delta: 9.4 },
];

// Funnel data
export const funnelData = [
  { stage: "Website Visitors", count: 48720, rate: 100 },
  { stage: "Signup Started", count: 12180, rate: 25.0 },
  { stage: "Onboarding Complete", count: 7308, rate: 60.0 },
  { stage: "First Value Moment", count: 4384, rate: 60.0 },
  { stage: "Converted to Paid", count: 2192, rate: 50.0 },
];

// Geographic data
export const geoData = [
  { country: "US", name: "United States", value: 892, pct: 31.3 },
  { country: "GB", name: "United Kingdom", value: 284, pct: 10.0 },
  { country: "DE", name: "Germany", value: 241, pct: 8.5 },
  { country: "FR", name: "France", value: 198, pct: 7.0 },
  { country: "CA", name: "Canada", value: 172, pct: 6.0 },
  { country: "AU", name: "Australia", value: 156, pct: 5.5 },
  { country: "JP", name: "Japan", value: 128, pct: 4.5 },
  { country: "NL", name: "Netherlands", value: 114, pct: 4.0 },
  { country: "SE", name: "Sweden", value: 99, pct: 3.5 },
  { country: "BR", name: "Brazil", value: 85, pct: 3.0 },
  { country: "IN", name: "India", value: 78, pct: 2.7 },
  { country: "SG", name: "Singapore", value: 71, pct: 2.5 },
  { country: "KR", name: "South Korea", value: 64, pct: 2.2 },
  { country: "ES", name: "Spain", value: 57, pct: 2.0 },
  { country: "IT", name: "Italy", value: 42, pct: 1.5 },
];

// Cohort retention data (12 months)
export const cohortData = (() => {
  const months = [
    "Mar 25", "Apr 25", "May 25", "Jun 25", "Jul 25", "Aug 25",
    "Sep 25", "Oct 25", "Nov 25", "Dec 25", "Jan 26", "Feb 26",
  ];
  const rows = [];
  months.forEach((month, i) => {
    const retention = [100];
    let prev = 100;
    for (let j = 1; j <= 12 - i; j++) {
      const drop = j === 1 ? randInt(15, 30) : randInt(3, 10);
      prev = Math.max(5, prev - drop);
      retention.push(Math.round(prev * 10) / 10);
    }
    rows.push({ cohort: month, users: randInt(180, 420), retention });
  });
  return rows;
})();

// KPI summary for the strip
export function getKPISummary() {
  const latest = (series) => series[series.length - 1].value;
  const prev7 = (series) => series[series.length - 8]?.value || series[0].value;
  const delta = (series) => {
    const cur = latest(series);
    const old = prev7(series);
    return old === 0 ? 0 : Math.round(((cur - old) / old) * 1000) / 10;
  };
  const sparkline = (series) => series.slice(-30).map((d) => d.value);

  return [
    { id: "mrr", label: "MRR", value: latest(mrrDaily), format: "currency", delta: delta(mrrDaily), sparkline: sparkline(mrrDaily) },
    { id: "arr", label: "ARR", value: latest(mrrDaily) * 12, format: "currency", delta: delta(mrrDaily), sparkline: sparkline(mrrDaily).map((v) => v * 12) },
    { id: "active_users", label: "Active Users", value: Math.round(latest(activeUsersDaily)), format: "number", delta: delta(activeUsersDaily), sparkline: sparkline(activeUsersDaily) },
    { id: "new_signups", label: "New Signups", value: Math.round(latest(newSignupsDaily)), format: "number", delta: delta(newSignupsDaily), sparkline: sparkline(newSignupsDaily) },
    { id: "churn", label: "Churn Rate", value: latest(churnRateDaily), format: "percent", delta: -delta(churnRateDaily), sparkline: sparkline(churnRateDaily), invertDelta: true },
    { id: "nrr", label: "Net Revenue Retention", value: latest(nrrDaily), format: "percent", delta: delta(nrrDaily), sparkline: sparkline(nrrDaily) },
  ];
}

// Plan distribution for donut chart
export const planDistribution = [
  { name: "Enterprise", value: 199, mrr: 98200, color: "var(--chart-1)" },
  { name: "Business", value: 513, mrr: 72300, color: "var(--chart-2)" },
  { name: "Pro", value: 997, mrr: 84400, color: "var(--chart-3)" },
  { name: "Starter", value: 712, mrr: 24100, color: "var(--chart-4)" },
  { name: "Free", value: 426, mrr: 0, color: "var(--chart-5)" },
];

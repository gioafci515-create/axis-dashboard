import { rand, randInt, pick, weightedPick } from "./seed";
import { customers } from "./customers";

const EVENT_TYPES = [
  "user.signed_up", "user.logged_in", "user.invited_member", "user.updated_profile",
  "subscription.created", "subscription.upgraded", "subscription.downgraded", "subscription.cancelled",
  "invoice.paid", "invoice.failed", "invoice.refunded",
  "feature.activated", "feature.limit_reached",
  "api.key_created", "api.key_revoked", "api.rate_limited",
  "export.started", "export.completed", "export.failed",
  "integration.connected", "integration.disconnected",
  "alert.triggered", "alert.resolved",
];

const EVENT_WEIGHTS = [
  8, 20, 3, 4, 5, 3, 2, 1, 10, 2, 1, 8, 3, 2, 1, 4, 3, 3, 1, 2, 1, 3, 2,
];

const SOURCES = ["web", "api", "mobile", "webhook", "cli"];
const SOURCE_WEIGHTS = [40, 30, 15, 10, 5];

export function generateEvents(count = 500) {
  const events = [];
  const now = new Date(2026, 3, 17, 14, 30, 0);

  for (let i = 0; i < count; i++) {
    const customer = pick(customers.slice(0, 200));
    const type = weightedPick(EVENT_TYPES, EVENT_WEIGHTS);
    const source = weightedPick(SOURCES, SOURCE_WEIGHTS);
    const timestamp = new Date(now.getTime() - i * randInt(2000, 180000));

    events.push({
      id: `evt_${String(i + 1).padStart(6, "0")}`,
      type,
      source,
      customerId: customer.id,
      customerName: customer.name,
      company: customer.company,
      timestamp: timestamp.toISOString(),
      metadata: generateMetadata(type),
      status: type.includes("failed") ? "error" : type.includes("limit") || type.includes("alert.triggered") ? "warning" : "success",
    });
  }

  return events;
}

function generateMetadata(type) {
  if (type.includes("subscription")) {
    return { plan: pick(["Starter", "Pro", "Business", "Enterprise"]), amount: randInt(29, 499) };
  }
  if (type.includes("invoice")) {
    return { amount: randInt(29, 4990), currency: "USD" };
  }
  if (type.includes("api")) {
    return { endpoint: pick(["/v1/events", "/v1/users", "/v1/metrics", "/v1/funnels"]), method: pick(["GET", "POST", "PUT"]) };
  }
  if (type.includes("export")) {
    return { format: pick(["csv", "json", "parquet"]), rows: randInt(100, 50000) };
  }
  return {};
}

export const events = generateEvents();

// Members data for Settings
export const teamMembers = [
  { id: "mem_001", name: "Alex Chen", email: "alex@signal.dev", role: "Owner", status: "active", lastActive: "2026-04-17T14:20:00Z", avatar: null },
  { id: "mem_002", name: "Sarah Kim", email: "sarah@signal.dev", role: "Admin", status: "active", lastActive: "2026-04-17T13:45:00Z", avatar: null },
  { id: "mem_003", name: "Marcus Johnson", email: "marcus@signal.dev", role: "Member", status: "active", lastActive: "2026-04-17T09:12:00Z", avatar: null },
  { id: "mem_004", name: "Priya Patel", email: "priya@signal.dev", role: "Member", status: "active", lastActive: "2026-04-16T18:30:00Z", avatar: null },
  { id: "mem_005", name: "Erik Lindqvist", email: "erik@signal.dev", role: "Member", status: "active", lastActive: "2026-04-16T11:20:00Z", avatar: null },
  { id: "mem_006", name: "Yuki Tanaka", email: "yuki@signal.dev", role: "Viewer", status: "active", lastActive: "2026-04-15T16:00:00Z", avatar: null },
  { id: "mem_007", name: "Jordan Rivera", email: "jordan@signal.dev", role: "Member", status: "invited", lastActive: null, avatar: null },
  { id: "mem_008", name: "Fatima Al-Rashid", email: "fatima@signal.dev", role: "Member", status: "invited", lastActive: null, avatar: null },
];

// API keys for Settings
export const apiKeys = [
  { id: "key_001", name: "Production", prefix: "sig_live_", key: "sig_live_7Kx9mP2nQ4wR", created: "2025-11-02T10:00:00Z", lastUsed: "2026-04-17T14:28:00Z", status: "active" },
  { id: "key_002", name: "Staging", prefix: "sig_test_", key: "sig_test_3Hn5jL8vB2cF", created: "2026-01-15T09:30:00Z", lastUsed: "2026-04-17T12:15:00Z", status: "active" },
  { id: "key_003", name: "Development", prefix: "sig_test_", key: "sig_test_9Yt4kM6xD1aE", created: "2026-03-20T14:00:00Z", lastUsed: "2026-04-16T18:42:00Z", status: "active" },
  { id: "key_004", name: "Legacy v1", prefix: "sig_live_", key: "sig_live_2Pw8rN5sG7hJ", created: "2025-06-10T08:00:00Z", lastUsed: "2025-12-01T09:00:00Z", status: "revoked" },
];

// Integrations for Settings
export const integrations = [
  { id: "int_001", name: "Slack", description: "Send alerts and reports to Slack channels", status: "connected", icon: "slack" },
  { id: "int_002", name: "Stripe", description: "Sync revenue and subscription data", status: "connected", icon: "credit-card" },
  { id: "int_003", name: "Segment", description: "Import user events and traits", status: "connected", icon: "git-branch" },
  { id: "int_004", name: "Salesforce", description: "Sync customer data bi-directionally", status: "disconnected", icon: "cloud" },
  { id: "int_005", name: "HubSpot", description: "Push enriched profiles to HubSpot", status: "disconnected", icon: "users" },
  { id: "int_006", name: "Webhooks", description: "Send real-time events to your endpoints", status: "connected", icon: "webhook" },
  { id: "int_007", name: "BigQuery", description: "Export raw data to BigQuery", status: "disconnected", icon: "database" },
  { id: "int_008", name: "Snowflake", description: "Warehouse sync for analytics", status: "disconnected", icon: "snowflake" },
];

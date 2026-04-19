import {
  LayoutDashboard, TrendingUp, Users, Activity, Filter,
  Settings, Bell, Search, HelpCircle, BookOpen,
} from "lucide-react";

export const primaryNav = [
  { label: "Overview", path: "/", icon: LayoutDashboard, shortcut: "G then O" },
  { label: "Revenue", path: "/revenue", icon: TrendingUp, shortcut: "G then R" },
  { label: "Customers", path: "/customers", icon: Users, shortcut: "G then C" },
  { label: "Events", path: "/events", icon: Activity, shortcut: "G then E" },
  { label: "Funnels", path: "/funnels", icon: Filter, shortcut: "G then F" },
];

export const secondaryNav = [
  { group: "Resources", items: [
    { label: "Documentation", path: "/docs", icon: BookOpen, external: true },
    { label: "Changelog", path: "/changelog", icon: Bell },
    { label: "Help & Support", path: "/help", icon: HelpCircle },
  ]},
];

export const commandPaletteItems = [
  // Pages
  { id: "nav-overview", label: "Go to Overview", section: "Navigation", shortcut: "G O", action: "/" },
  { id: "nav-revenue", label: "Go to Revenue", section: "Navigation", shortcut: "G R", action: "/revenue" },
  { id: "nav-customers", label: "Go to Customers", section: "Navigation", shortcut: "G C", action: "/customers" },
  { id: "nav-events", label: "Go to Events", section: "Navigation", shortcut: "G E", action: "/events" },
  { id: "nav-funnels", label: "Go to Funnels", section: "Navigation", shortcut: "G F", action: "/funnels" },
  { id: "nav-settings", label: "Go to Settings", section: "Navigation", shortcut: "G S", action: "/settings" },
  // Actions
  { id: "act-export", label: "Export current view as CSV", section: "Actions", action: "export-csv" },
  { id: "act-invite", label: "Invite teammate", section: "Actions", action: "invite" },
  { id: "act-theme", label: "Toggle dark/light mode", section: "Actions", shortcut: "T", action: "toggle-theme" },
  { id: "act-shortcuts", label: "View keyboard shortcuts", section: "Actions", shortcut: "?", action: "shortcuts" },
  // Metrics
  { id: "met-mrr", label: "MRR — Monthly Recurring Revenue", section: "Metrics", action: "/revenue" },
  { id: "met-arr", label: "ARR — Annual Recurring Revenue", section: "Metrics", action: "/revenue" },
  { id: "met-churn", label: "Churn Rate", section: "Metrics", action: "/revenue" },
  { id: "met-nrr", label: "Net Revenue Retention", section: "Metrics", action: "/revenue" },
];

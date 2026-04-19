import {
  LayoutDashboard,
  BarChart3,
  ShoppingBag,
  Calendar,
  User,
  Table2,
  FileText,
  LogIn,
  UserPlus,
} from "lucide-react";

export const NAV_SECTIONS = [
  {
    label: "Dashboards",
    items: [
      { to: "/", label: "Marketing", icon: LayoutDashboard, end: true },
      { to: "/analytics", label: "Analytics", icon: BarChart3 },
      { to: "/ecommerce", label: "eCommerce", icon: ShoppingBag },
    ],
  },
  {
    label: "Workspace",
    items: [
      { to: "/calendar", label: "Calendar", icon: Calendar },
      { to: "/profile", label: "Profile", icon: User },
      { to: "/tables", label: "Tables", icon: Table2 },
      { to: "/forms", label: "Forms", icon: FileText },
    ],
  },
  {
    label: "Auth",
    items: [
      { to: "/signin", label: "Sign in", icon: LogIn },
      { to: "/signup", label: "Sign up", icon: UserPlus },
    ],
  },
];

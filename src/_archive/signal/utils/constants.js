// App Constants

// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";
export const API_TIMEOUT = 10000;

// App Configuration
export const APP_NAME = "LUXE Admin";
export const APP_VERSION = "1.0.0";

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: "luxe_token",
  REFRESH_TOKEN: "luxe_refresh_token",
  USER: "luxe_user",
  THEME: "luxe_theme",
  SIDEBAR_COLLAPSED: "luxe_sidebar_collapsed",
};

// Order Status
export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: "Pending",
  [ORDER_STATUS.PROCESSING]: "Processing",
  [ORDER_STATUS.SHIPPED]: "Shipped",
  [ORDER_STATUS.DELIVERED]: "Delivered",
  [ORDER_STATUS.COMPLETED]: "Completed",
  [ORDER_STATUS.CANCELLED]: "Cancelled",
  [ORDER_STATUS.REFUNDED]: "Refunded",
};

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: "warning",
  [ORDER_STATUS.PROCESSING]: "info",
  [ORDER_STATUS.SHIPPED]: "primary",
  [ORDER_STATUS.DELIVERED]: "success",
  [ORDER_STATUS.COMPLETED]: "success",
  [ORDER_STATUS.CANCELLED]: "error",
  [ORDER_STATUS.REFUNDED]: "default",
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  REFUNDED: "refunded",
};

// Product Status
export const PRODUCT_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  OUT_OF_STOCK: "out_of_stock",
  DRAFT: "draft",
};

// Customer Segments
export const CUSTOMER_SEGMENT = {
  VIP: "vip",
  REGULAR: "regular",
  NEW: "new",
  INACTIVE: "inactive",
};

// User Roles
export const USER_ROLES = {
  ADMIN: "admin",
  STAFF: "staff",
};

// Role Permissions
export const PERMISSIONS = {
  [USER_ROLES.ADMIN]: {
    canCreate: true,
    canEdit: true,
    canDelete: true,
    canAccessSettings: true,
    canManageUsers: true,
  },
  [USER_ROLES.STAFF]: {
    canCreate: true,
    canEdit: true,
    canDelete: false,
    canAccessSettings: false,
    canManageUsers: false,
  },
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: "MMM dd, yyyy",
  DISPLAY_WITH_TIME: "MMM dd, yyyy HH:mm",
  ISO: "yyyy-MM-dd",
  ISO_WITH_TIME: "yyyy-MM-dd HH:mm:ss",
};

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// Currency
export const CURRENCY = {
  CODE: "USD",
  SYMBOL: "$",
  LOCALE: "en-US",
};

// Navigation Items
export const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: "LayoutDashboard",
    roles: ["admin", "staff"],
  },
  {
    id: "orders",
    label: "Orders",
    path: "/orders",
    icon: "ShoppingCart",
    roles: ["admin", "staff"],
  },
  {
    id: "products",
    label: "Products",
    path: "/products",
    icon: "Package",
    roles: ["admin", "staff"],
  },
  {
    id: "customers",
    label: "Customers",
    path: "/customers",
    icon: "Users",
    roles: ["admin", "staff"],
  },
  {
    id: "analytics",
    label: "Analytics",
    path: "/analytics",
    icon: "BarChart3",
    roles: ["admin", "staff"],
  },
  {
    id: "settings",
    label: "Settings",
    path: "/settings",
    icon: "Settings",
    roles: ["admin"],
  },
];

// Chart Colors
export const CHART_COLORS = {
  primary: "#D4AF37",
  secondary: "#1A1A1A",
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
  purple: "#8B5CF6",
  pink: "#EC4899",
  teal: "#14B8A6",
  orange: "#F97316",
};

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Toast Messages
export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: "Welcome back!",
  LOGIN_ERROR: "Invalid email or password",
  LOGOUT_SUCCESS: "Logged out successfully",
  SAVE_SUCCESS: "Changes saved successfully",
  SAVE_ERROR: "Failed to save changes",
  DELETE_SUCCESS: "Item deleted successfully",
  DELETE_ERROR: "Failed to delete item",
  CREATE_SUCCESS: "Item created successfully",
  CREATE_ERROR: "Failed to create item",
  UPDATE_SUCCESS: "Item updated successfully",
  UPDATE_ERROR: "Failed to update item",
  NETWORK_ERROR: "Network error. Please try again.",
  GENERIC_ERROR: "Something went wrong. Please try again.",
};

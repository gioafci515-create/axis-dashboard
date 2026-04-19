// Standardized chart configuration for consistent styling across all pages

export const CHART_COLORS = {
  primary: "#D4AF37",
  secondary: "#1A1A1A",
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
};

export const CHART_CONFIG = {
  // Standard tooltip configuration
  tooltip: {
    contentStyle: {
      backgroundColor: "#1A1A1A",
      border: "none",
      borderRadius: 8,
      color: "#fff",
      padding: "12px 16px",
      boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
    },
    labelStyle: {
      color: "#D4AF37",
      fontWeight: 600,
      marginBottom: 4,
    },
    itemStyle: {
      color: "#fff",
    },
  },

  // Standard cartesian grid
  cartesianGrid: {
    stroke: "#E5E7EB",
    strokeDasharray: "3 3",
    vertical: false,
  },

  // Standard axis styling
  axisLabel: {
    fill: "#6B7280",
    fontSize: 12,
  },

  // Standard pie chart colors
  pieColors: ["#D4AF37", "#3B82F6", "#22C55E", "#F59E0B", "#EC4899", "#8B5CF6"],
};

// Reusable tooltip formatter functions
export const formatCurrencyTooltip = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const formatNumberTooltip = (value) => {
  return new Intl.NumberFormat("en-US").format(value);
};

export const formatPercentageTooltip = (value) => {
  return `${value.toFixed(1)}%`;
};

// Standard chart margins
export const CHART_MARGINS = {
  top: 20,
  right: 30,
  bottom: 20,
  left: 60,
};

// Compact chart margins for smaller charts
export const COMPACT_CHART_MARGINS = {
  top: 10,
  right: 20,
  bottom: 10,
  left: 40,
};

import { createTheme } from "@mui/material/styles";

// LuxeAdmin Brand Colors - Luxury Gold Theme
const colors = {
  primary: {
    main: "#D4AF37", // Gold
    light: "#F4D03F", // Light Gold
    dark: "#B8860B", // Dark Gold
    contrastText: "#000000", // Black text on gold
  },
  secondary: {
    main: "#1A1A1A", // Rich Black
    light: "#2D2D2D", // Charcoal
    dark: "#0D0D0D", // Near Black
    contrastText: "#FFFFFF", // White text on dark
  },
  success: {
    main: "#22C55E",
    light: "#86EFAC",
    dark: "#16A34A",
  },
  warning: {
    main: "#F59E0B",
    light: "#FCD34D",
    dark: "#D97706",
  },
  error: {
    main: "#EF4444",
    light: "#FCA5A5",
    dark: "#DC2626",
  },
  info: {
    main: "#3B82F6",
    light: "#93C5FD",
    dark: "#2563EB",
  },
};

// Light mode colors
const lightColors = {
  background: {
    default: "#F5F5F5",
    paper: "#FFFFFF",
  },
  text: {
    primary: "#1A1A1A",
    secondary: "#6B7280",
    disabled: "#9CA3AF",
  },
};

// Dark mode colors
const darkColors = {
  background: {
    default: "#0D0D0D",
    paper: "#1A1A1A",
  },
  text: {
    primary: "#F5F5F5",
    secondary: "#9CA3AF",
    disabled: "#6B7280",
  },
};

// Create MUI Theme base configuration
const createThemeConfig = (mode) => {
  const isDark = mode === "dark";
  const bgColors = isDark ? darkColors : lightColors;
  const textColors = bgColors.text;

  return {
    palette: {
      mode: mode,
      primary: colors.primary,
      secondary: colors.secondary,
      background: bgColors.background,
      success: colors.success,
      warning: colors.warning,
      error: colors.error,
      info: colors.info,
      text: textColors,
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontFamily: '"Playfair Display", serif',
        fontSize: "2.5rem",
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontFamily: '"Playfair Display", serif',
        fontSize: "2rem",
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h3: {
        fontFamily: '"Playfair Display", serif',
        fontSize: "1.5rem",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontFamily: '"Playfair Display", serif',
        fontSize: "1.25rem",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: "1.125rem",
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 600,
        lineHeight: 1.5,
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.6,
      },
      body2: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.6,
      },
      button: {
        fontSize: "0.875rem",
        fontWeight: 600,
        textTransform: "none",
        letterSpacing: "0.025em",
      },
      caption: {
        fontSize: "0.75rem",
        fontWeight: 400,
        lineHeight: 1.5,
      },
    },
    shape: {
      borderRadius: 12,
    },
    spacing: 8,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: "10px 24px",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(212, 175, 55, 0.25)",
            },
          },
          containedPrimary: {
            backgroundColor: colors.primary.main,
            color: colors.primary.contrastText,
            "&:hover": {
              backgroundColor: colors.primary.dark,
            },
          },
          outlinedPrimary: {
            borderColor: colors.primary.main,
            color: colors.primary.main,
            "&:hover": {
              backgroundColor: "rgba(212, 175, 55, 0.08)",
              borderColor: colors.primary.dark,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: isDark
              ? "0 2px 8px rgba(0, 0, 0, 0.4)"
              : "0 2px 8px rgba(0, 0, 0, 0.08)",
            transition:
              "box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out",
            "&:hover": {
              boxShadow: isDark
                ? "0 8px 24px rgba(0, 0, 0, 0.5)"
                : "0 8px 24px rgba(0, 0, 0, 0.12)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundImage: "none",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
              "& fieldset": {
                borderColor: isDark ? "#374151" : "#E5E7EB",
              },
              "&:hover fieldset": {
                borderColor: colors.primary.main,
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.primary.main,
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontWeight: 500,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: isDark
              ? "0 1px 3px rgba(0, 0, 0, 0.5)"
              : "0 1px 3px rgba(0, 0, 0, 0.08)",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            boxShadow: isDark
              ? "4px 0 20px rgba(0, 0, 0, 0.5)"
              : "4px 0 20px rgba(0, 0, 0, 0.08)",
            borderRight: isDark ? "1px solid #374151" : "1px solid #E5E7EB",
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            margin: "2px 8px",
            "&.Mui-selected": {
              backgroundColor: "rgba(212, 175, 55, 0.12)",
            },
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: "none",
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },
          },
          columnHeader: {
            backgroundColor: isDark ? "#1A1A1A" : "#F9FAFB",
            fontWeight: 600,
            color: textColors.secondary,
          },
          row: {
            "&:hover": {
              backgroundColor: isDark ? "#2D2D2D" : "#F9FAFB",
            },
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            fontWeight: 600,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "rgba(212, 175, 55, 0.08)",
            },
          },
        },
      },
    },
  };
};

// Export theme creator function
export const getTheme = (mode = "light") => {
  return createTheme(createThemeConfig(mode));
};

// Export default theme for backward compatibility
export const theme = getTheme("light");

export default theme;

import { createSlice } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../utils/constants";

const getInitialState = () => {
  const sidebarCollapsed = localStorage.getItem(STORAGE_KEYS.SIDEBAR_COLLAPSED);
  const theme = localStorage.getItem(STORAGE_KEYS.THEME);

  // Initial notifications for demo purposes
  const initialNotifications = [
    {
      id: 1,
      title: "New Order Received",
      message: "Order #ORD-2345 has been placed",
      type: "order",
      read: false,
      timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
    },
    {
      id: 2,
      title: "Customer Registered",
      message: "John Smith has created an account",
      type: "customer",
      read: false,
      timestamp: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
    },
    {
      id: 3,
      title: "Order Shipped",
      message: "Order #ORD-2342 has been shipped",
      type: "success",
      read: true,
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    },
    {
      id: 4,
      title: "Low Stock Alert",
      message: "Luxury Leather Sofa is running low on stock",
      type: "warning",
      read: false,
      timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    },
  ];

  return {
    sidebarOpen: sidebarCollapsed ? !JSON.parse(sidebarCollapsed) : true,
    theme: theme || "dark", // Set initial theme to dark
    isLoading: false,
    notifications: initialNotifications,
    unreadNotificationsCount: initialNotifications.filter((n) => !n.read)
      .length,
  };
};

const uiSlice = createSlice({
  name: "ui",
  initialState: getInitialState(),
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
      localStorage.setItem(
        STORAGE_KEYS.SIDEBAR_COLLAPSED,
        JSON.stringify(!state.sidebarOpen),
      );
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
      localStorage.setItem(
        STORAGE_KEYS.SIDEBAR_COLLAPSED,
        JSON.stringify(!action.payload),
      );
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      state.theme = newTheme;
      localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem(STORAGE_KEYS.THEME, action.payload);
    },
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: Date.now(),
        ...action.payload,
        read: false,
        timestamp: new Date().toISOString(),
      });
      state.unreadNotificationsCount += 1;
    },
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload,
      );
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadNotificationsCount = Math.max(
          0,
          state.unreadNotificationsCount - 1,
        );
      }
    },
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach((n) => {
        n.read = true;
      });
      state.unreadNotificationsCount = 0;
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadNotificationsCount = 0;
    },
    removeNotification: (state, action) => {
      const index = state.notifications.findIndex(
        (n) => n.id === action.payload,
      );
      if (index !== -1) {
        if (!state.notifications[index].read) {
          state.unreadNotificationsCount = Math.max(
            0,
            state.unreadNotificationsCount - 1,
          );
        }
        state.notifications.splice(index, 1);
      }
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleTheme,
  setTheme,
  setLoading,
  addNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  clearNotifications,
  removeNotification,
} = uiSlice.actions;

export default uiSlice.reducer;

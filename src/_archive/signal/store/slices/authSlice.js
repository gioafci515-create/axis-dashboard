import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../utils/constants";

// Async thunks
export const login = createAsyncThunk("auth/login", async (credentials) => {
  // Demo mode: simulate login without API call
  // In production, uncomment the API call below
  /*
    try {
      const response = await authService.login(credentials);
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
    */

  // Demo login - two roles: admin and staff
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!credentials.email || !credentials.password) {
        reject(new Error("Email and password are required"));
        return;
      }

      const demoUsers = {
        "admin@luxe.com": { id: 1, name: "Admin User", role: "admin", avatar: null },
        "staff@luxe.com": { id: 2, name: "Staff User", role: "staff", avatar: null },
      };

      const match = demoUsers[credentials.email.toLowerCase()];
      if (match && credentials.password.length >= 6) {
        const user = { ...match, email: credentials.email.toLowerCase() };
        const token = "demo_token_" + Date.now();
        localStorage.setItem(STORAGE_KEYS.TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
        resolve({ user, token });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 500);
  });
});

export const logout = createAsyncThunk("auth/logout", async () => {
  // Demo mode: just clear local storage
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
  return null;
});

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async () => {
    // Demo mode: return stored user
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  },
);

// Get initial state from localStorage
const getInitialState = () => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  const user = localStorage.getItem(STORAGE_KEYS.USER);

  return {
    user: user ? JSON.parse(user) : null,
    token: token || null,
    isAuthenticated: !!token,
    isLoading: false,
    error: null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setCredentials } = authSlice.actions;
export default authSlice.reducer;

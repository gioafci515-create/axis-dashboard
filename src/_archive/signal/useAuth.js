import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { login, logout, clearError } from "../store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, isLoading, error } = useSelector(
    (state) => state.auth,
  );

  const handleLogin = useCallback(
    async (credentials) => {
      try {
        await dispatch(login(credentials)).unwrap();
        return { success: true };
      } catch (err) {
        return { success: false, error: err };
      }
    },
    [dispatch],
  );

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logout()).unwrap();
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }, [dispatch]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
    clearError: handleClearError,
  };
};

export default useAuth;

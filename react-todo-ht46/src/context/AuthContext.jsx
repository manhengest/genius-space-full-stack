import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchAuthStatus, login as apiLogin, logout as apiLogout } from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const loadAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      setAuthError(null);
      const status = await fetchAuthStatus();
      setIsAuthenticated(status);
    } catch (err) {
      setAuthError(err);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAuth();
  }, [loadAuth]);

  const login = useCallback(async () => {
    try {
      setAuthError(null);
      const ok = await apiLogin();
      setIsAuthenticated(ok);
      return true;
    } catch (err) {
      setAuthError(err);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setAuthError(null);
      await apiLogout();
      setIsAuthenticated(false);
    } catch (err) {
      setAuthError(err);
    }
  }, []);

  const value = {
    isAuthenticated: !!isAuthenticated,
    isLoading,
    authError,
    login,
    logout,
    refreshAuth: loadAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

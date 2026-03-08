import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  fetchAuthStatus,
  login as apiLogin,
  logout as apiLogout,
} from "../api/authApi";

const AuthContext = createContext(null);

const authReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_LOAD_START":
      return { ...state, isLoading: true, authError: null };
    case "AUTH_LOAD_SUCCESS":
      return {
        ...state,
        isAuthenticated: !!action.payload,
        isLoading: false,
        authError: null,
      };
    case "AUTH_LOAD_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        authError: action.payload,
      };
    case "AUTH_LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true, authError: null };
    case "AUTH_LOGIN_FAILURE":
      return { ...state, authError: action.payload };
    case "AUTH_LOGOUT_SUCCESS":
      return { ...state, isAuthenticated: false, authError: null };
    case "AUTH_LOGOUT_FAILURE":
      return { ...state, authError: action.payload };
    case "AUTH_CLEAR_ERROR":
      return { ...state, authError: null };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  authError: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const loadAuth = useCallback(async () => {
    dispatch({ type: "AUTH_LOAD_START" });
    try {
      const status = await fetchAuthStatus();
      dispatch({ type: "AUTH_LOAD_SUCCESS", payload: status });
    } catch (err) {
      dispatch({ type: "AUTH_LOAD_FAILURE", payload: err });
    }
  }, []);

  useEffect(() => {
    loadAuth();
  }, [loadAuth]);

  const login = useCallback(async () => {
    try {
      dispatch({ type: "AUTH_CLEAR_ERROR" });
      const ok = await apiLogin();
      dispatch({ type: "AUTH_LOGIN_SUCCESS" });
      return ok;
    } catch (err) {
      dispatch({ type: "AUTH_LOGIN_FAILURE", payload: err });
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      dispatch({ type: "AUTH_CLEAR_ERROR" });
      await apiLogout();
      dispatch({ type: "AUTH_LOGOUT_SUCCESS" });
    } catch (err) {
      dispatch({ type: "AUTH_LOGOUT_FAILURE", payload: err });
    }
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: "AUTH_CLEAR_ERROR" });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
      refreshAuth: loadAuth,
      clearError,
    }),
    [state, login, logout, loadAuth, clearError]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

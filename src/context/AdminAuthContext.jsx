import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api.js';

const STORAGE_KEY = 'eventora_admin_auth';

const AdminAuthContext = createContext({
  isAuthenticated: false,
  adminUser: null,
  token: null,
  loading: true,
  login: async () => ({ success: false }),
  logout: () => {},
  quickDemoLogin: () => {}
});

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed?.token || null;
      }
    } catch (err) {
      console.warn('Could not read admin token:', err);
    }
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Validate stored token on mount with the backend
  useEffect(() => {
    let isMounted = true;

    async function initializeAuth() {
      const stored = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
      if (!stored) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const parsed = JSON.parse(stored);
        if (parsed?.token) {
          // Verify JWT with backend /api/auth/me
          const response = await api.verifyAdminToken(parsed.token);
          if (isMounted) {
            if (response?.success && response?.user) {
              setToken(parsed.token);
              setAdminUser(response.user);
              setIsAuthenticated(true);
            } else {
              // Token expired or invalid
              localStorage.removeItem(STORAGE_KEY);
              sessionStorage.removeItem(STORAGE_KEY);
              setToken(null);
              setAdminUser(null);
              setIsAuthenticated(false);
            }
          }
        }
      } catch (err) {
        console.warn('Auth verification check failed:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  // Sync auth state across multiple browser tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY) {
        if (e.newValue) {
          try {
            const parsed = JSON.parse(e.newValue);
            setToken(parsed?.token || null);
            setAdminUser(parsed?.user || null);
            setIsAuthenticated(!!parsed?.token);
          } catch {
            setToken(null);
            setAdminUser(null);
            setIsAuthenticated(false);
          }
        } else {
          setToken(null);
          setAdminUser(null);
          setIsAuthenticated(false);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Real Backend Authentication Login
  const login = useCallback(async (username, password, rememberMe = true) => {
    try {
      // Call backend /api/auth/login
      const result = await api.loginAdmin(username, password);

      if (result?.success && result?.token) {
        const authData = {
          token: result.token,
          user: result.user,
          rememberMe
        };

        if (rememberMe) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
          sessionStorage.removeItem(STORAGE_KEY);
        } else {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
          localStorage.removeItem(STORAGE_KEY);
        }

        setToken(result.token);
        setAdminUser(result.user);
        setIsAuthenticated(true);

        return { success: true, user: result.user, token: result.token };
      }

      return {
        success: false,
        error: result?.message || 'Authentication failed. Please check your credentials.'
      };
    } catch (err) {
      console.error('Login error:', err);
      return {
        success: false,
        error: err.message || 'Cannot connect to authentication service on backend.'
      };
    }
  }, []);

  // 1-Click Demo Login using default credentials against backend
  const quickDemoLogin = useCallback(async () => {
    return login('admin', 'admin123', true);
  }, [login]);

  // Logout function
  const logout = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.warn('Error clearing admin auth data:', err);
    }
    setToken(null);
    setIsAuthenticated(false);
    setAdminUser(null);
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        adminUser,
        token,
        loading,
        login,
        logout,
        quickDemoLogin
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}

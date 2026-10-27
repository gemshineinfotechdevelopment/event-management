import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'eventora_admin_auth';

// Default dummy administrator profile
const DEMO_ADMIN_USER = {
  username: 'admin',
  email: 'admin@eventora.com',
  name: 'Atelier Director',
  role: 'Super Administrator',
  avatar: 'AD'
};

const AdminAuthContext = createContext({
  isAuthenticated: false,
  adminUser: null,
  login: async () => ({ success: false }),
  logout: () => {},
  quickDemoLogin: () => {}
});

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return !!parsed?.token;
      }
    } catch (err) {
      console.warn('Could not read admin auth state:', err);
    }
    return false;
  });

  const [adminUser, setAdminUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed?.user || DEMO_ADMIN_USER;
      }
    } catch {
      return null;
    }
    return null;
  });

  // Verify and sync storage across tabs or window events
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY) {
        if (e.newValue) {
          try {
            const parsed = JSON.parse(e.newValue);
            setIsAuthenticated(!!parsed?.token);
            setAdminUser(parsed?.user || DEMO_ADMIN_USER);
          } catch {
            setIsAuthenticated(false);
            setAdminUser(null);
          }
        } else {
          setIsAuthenticated(false);
          setAdminUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Dummy login function
  const login = useCallback(async (username, password, rememberMe = true) => {
    // Artificial slight delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 350));

    const cleanUsername = String(username || '').trim().toLowerCase();
    const cleanPassword = String(password || '').trim();

    // Accepted dummy credentials
    const validUsernames = ['admin', 'admin@eventora.com', 'director', 'demo', 'manager'];
    const validPasswords = ['admin123', 'admin', 'eventora', 'eventora2025', 'director123'];

    const isValidUser = validUsernames.includes(cleanUsername);
    const isValidPass = validPasswords.includes(cleanPassword);

    if (isValidUser && isValidPass) {
      const userPayload = {
        ...DEMO_ADMIN_USER,
        username: cleanUsername.includes('@') ? cleanUsername.split('@')[0] : cleanUsername,
        email: cleanUsername.includes('@') ? cleanUsername : 'admin@eventora.com',
        loggedInAt: new Date().toISOString()
      };

      const authData = {
        token: `demo_token_${Date.now()}_${Math.random().toString(36).substring(2)}`,
        user: userPayload,
        rememberMe
      };

      try {
        if (rememberMe) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
          sessionStorage.removeItem(STORAGE_KEY);
        } else {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (err) {
        console.warn('Could not store auth data:', err);
      }

      setIsAuthenticated(true);
      setAdminUser(userPayload);
      return { success: true, user: userPayload };
    }

    return { 
      success: false, 
      error: 'Invalid atelier credentials. Use demo credentials: admin / admin123' 
    };
  }, []);

  // Quick 1-click Demo Login
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
    setIsAuthenticated(false);
    setAdminUser(null);
  }, []);

  return (
    <AdminAuthContext.Provider value={{
      isAuthenticated,
      adminUser,
      login,
      logout,
      quickDemoLogin
    }}>
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

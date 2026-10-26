import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const DEFAULT_SETTINGS = {
  phone: '+91 98765 43210',
  rawPhone: '919876543210',
  email: 'hello@eventora.com',
  address: 'The Royal Pavilion Atelier, Boat Club Road, R.A. Puram, Chennai, Tamil Nadu 600028',
  businessHours: 'Mon – Sat: 9:30 AM to 8:00 PM',
  companyName: 'Eventora - Events & Beyond',
  city: 'Chennai'
};

const SettingsContext = createContext({
  settings: DEFAULT_SETTINGS,
  updateSettings: async () => {},
  refreshSettings: async () => {},
  loading: false
});

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('eventora_settings');
        if (cached) {
          return { ...DEFAULT_SETTINGS, ...JSON.parse(cached) };
        }
      } catch (err) {
        console.warn('Could not read cached settings:', err);
      }
    }
    return DEFAULT_SETTINGS;
  });

  const [loading, setLoading] = useState(false);

  const refreshSettings = useCallback(async () => {
    try {
      const serverSettings = await api.getSettings();
      if (serverSettings) {
        const merged = { ...DEFAULT_SETTINGS, ...serverSettings };
        setSettings(merged);
        if (typeof window !== 'undefined') {
          localStorage.setItem('eventora_settings', JSON.stringify(merged));
        }
      }
    } catch (err) {
      console.warn('Settings sync error:', err.message);
    }
  }, []);

  useEffect(() => {
    refreshSettings();

    // Listen to local storage changes from other tabs
    const handleStorageChange = (e) => {
      if (e.key === 'eventora_settings' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setSettings(prev => ({ ...prev, ...parsed }));
        } catch {}
      }
    };

    // Listen to custom intra-window event
    const handleCustomEvent = (e) => {
      if (e.detail) {
        setSettings(prev => ({ ...prev, ...e.detail }));
      } else {
        refreshSettings();
      }
    };

    // Refetch whenever user returns/focuses back on the tab
    const handleFocus = () => {
      refreshSettings();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('eventora_settings_updated', handleCustomEvent);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('eventora_settings_updated', handleCustomEvent);
      window.removeEventListener('focus', handleFocus);
    };
  }, [refreshSettings]);

  const updateSettings = async (newValues) => {
    setLoading(true);
    try {
      const cleanRawPhone = newValues.phone 
        ? String(newValues.phone).replace(/[^0-9]/g, '') 
        : settings.rawPhone;

      const merged = {
        ...settings,
        ...newValues,
        rawPhone: cleanRawPhone,
        updatedAt: new Date().toISOString()
      };

      // Optimistic update
      setSettings(merged);
      if (typeof window !== 'undefined') {
        localStorage.setItem('eventora_settings', JSON.stringify(merged));
        window.dispatchEvent(new CustomEvent('eventora_settings_updated', { detail: merged }));
      }

      await api.updateSettings(merged);
      return { success: true };
    } catch (err) {
      console.error('Failed to save settings:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, refreshSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    return {
      settings: DEFAULT_SETTINGS,
      updateSettings: async () => {},
      refreshSettings: async () => {},
      loading: false
    };
  }
  return context;
}

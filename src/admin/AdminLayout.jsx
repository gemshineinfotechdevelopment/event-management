import React, { useState, useEffect, useCallback } from 'react';
import { 
  LayoutDashboard, 
  Inbox, 
  Settings, 
  Calendar,
  ArrowLeft, 
  Sparkles, 
  Bell, 
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  LogOut,
  Phone,
  Mail,
  Menu,
  X,
  ChevronRight,
  Dot
} from 'lucide-react';
import { EventoraLogo } from '../components/common/Icons';
import { api } from '../services/api';
import { useSettings } from '../context/SettingsContext';
import AdminDashboard from './AdminDashboard';
import AdminEnquiries from './AdminEnquiries';
import AdminEvents from './AdminEvents';
import AdminSettings from './AdminSettings';

export default function AdminLayout({ onExitAdmin, initialTab = 'dashboard' }) {
  const { settings, updateSettings } = useSettings();

  const getTabFromPath = useCallback(() => {
    if (typeof window === 'undefined') return initialTab;
    const pathname = window.location.pathname.toLowerCase();
    if (pathname.includes('/enquiries') || pathname.includes('/enquiry')) return 'enquiries';
    if (pathname.includes('/events') || pathname.includes('/event')) return 'events';
    if (pathname.includes('/settings') || pathname.includes('/setting')) return 'settings';
    if (pathname.includes('/dashboard')) return 'dashboard';
    return initialTab || 'dashboard';
  }, [initialTab]);

  // Tab state: 'dashboard' | 'enquiries' | 'events' | 'settings'
  const [activeTab, setActiveTab] = useState(getTabFromPath);

  // Sync tab with browser popstate
  useEffect(() => {
    const handlePopState = () => {
      setActiveTab(getTabFromPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [getTabFromPath]);

  // Sync when initialTab prop changes
  useEffect(() => {
    setActiveTab(getTabFromPath());
  }, [initialTab, getTabFromPath]);

  // Mobile drawer toggle
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Fetch enquiries
  const loadEnquiries = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const data = await api.getEnquiries();
      setEnquiries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn('Could not load enquiries:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadEnquiries();
  }, [loadEnquiries]);

  // Handle Tab Switch & Path sync (Clean URLs without #)
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
    if (typeof window !== 'undefined') {
      const targetPath = tab === 'dashboard' 
        ? '/admin-dashboard-panel' 
        : `/admin-dashboard-panel/${tab}`;
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show luxury toast
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Update enquiry status
  const handleUpdateStatus = async (id, status) => {
    try {
      await api.updateEnquiryStatus(id, { status });
      setEnquiries(prev => prev.map(item => {
        if (item.id === id || item._id === id || item.refCode === id) {
          return { ...item, status };
        }
        return item;
      }));
      showToast(`Enquiry status changed to "${status}".`);
    } catch (err) {
      console.error('Update status failed:', err);
      showToast('Error updating status.');
    }
  };

  // Delete enquiry
  const handleDeleteEnquiry = async (id) => {
    try {
      await api.deleteEnquiry(id);
      setEnquiries(prev => prev.filter(item => item.id !== id && item._id !== id && item.refCode !== id));
      showToast('Enquiry deleted successfully.');
    } catch (err) {
      console.error('Delete failed:', err);
      showToast('Error deleting enquiry.');
    }
  };

  // Save settings
  const handleSaveSettings = async (formData) => {
    setSavingSettings(true);
    try {
      await updateSettings(formData);
      showToast('Phone number and email settings updated successfully.');
    } finally {
      setSavingSettings(false);
    }
  };

  // Unread / new enquiries count for badge
  const newCount = enquiries.filter(e => (e.status || 'new') === 'new').length;

  // Track events count for sidebar badge
  const [eventsCount, setEventsCount] = useState(7);

  const fetchEventsCount = useCallback(async () => {
    try {
      const res = await api.getEvents();
      const list = res?.data || (Array.isArray(res) ? res : []);
      if (Array.isArray(list) && list.length > 0) {
        setEventsCount(list.length);
      }
    } catch {}
  }, []);

  useEffect(() => {
    fetchEventsCount();
    window.addEventListener('eventora_events_changed', fetchEventsCount);
    window.addEventListener('storage', fetchEventsCount);
    return () => {
      window.removeEventListener('eventora_events_changed', fetchEventsCount);
      window.removeEventListener('storage', fetchEventsCount);
    };
  }, [fetchEventsCount]);

  // 4 Sidebar Navigation Sections
  const navSections = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
      desc: 'Overview & Insights'
    },
    {
      id: 'enquiries',
      label: 'Submitted Enquiries',
      icon: Inbox,
      badge: newCount > 0 ? `${newCount} New` : null,
      badgeColor: 'bg-blue-500 text-white',
      desc: 'Client Leads & Dossiers'
    },
    {
      id: 'events',
      label: 'Events & Celebrations',
      icon: Calendar,
      badge: `${eventsCount}`,
      badgeColor: 'bg-[#DFC07B]/20 text-[#DFC07B] border border-[#DFC07B]/40',
      desc: 'Showcase & Portfolio'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      badge: null,
      desc: 'Phone, Email & Contact Info'
    }
  ];

  const currentSection = navSections.find(s => s.id === activeTab) || navSections[0];

  return (
    <div className="min-h-screen bg-[#070C18] text-[#EFEAE2] flex flex-col lg:flex-row font-sans selection:bg-[#DFC07B] selection:text-[#0A0E1A]">
      
      {/* 1. Backdrop Overlay for Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* 2. Sleek Luxury Left Sidebar */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 bottom-0 z-50 w-72 max-w-[85vw] h-screen bg-[#0A0E1A] border-r border-[#DFC07B]/20 flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-2xl ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top: Brand & Title */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div 
            onClick={() => handleTabChange('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative p-1.5 rounded-full bg-gradient-to-b from-[#2A2318]/90 to-[#14120F]/90 border border-[#DFC07B]/80 shadow-md group-hover:scale-105 transition-transform">
              <EventoraLogo className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif-luxury text-lg sm:text-xl font-bold tracking-wide text-white leading-none">
                  Eventora
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#DFC07B]/20 text-[#ECCB7F] text-[9px] font-bold uppercase tracking-wider border border-[#DFC07B]/40">
                  Admin
                </span>
              </div>
              <span className="text-[9px] font-bold tracking-[0.22em] text-[#A0988A] uppercase mt-1">
                ATELIER PORTAL
              </span>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 transition-colors"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center: Sidebar Nav Links (The 4 Sections) */}
        <div className="flex-1 py-4 sm:py-6 px-3 sm:px-3.5 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold tracking-[0.22em] text-[#8C7E6C] uppercase">
            Management Sections
          </div>

          {navSections.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full text-left px-3.5 py-3 rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-between group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-[#DFC07B]/20 via-[#DFC07B]/10 to-transparent border border-[#DFC07B]/50 shadow-md text-white'
                    : 'text-[#C9BFB5] hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive 
                      ? 'bg-gradient-to-br from-[#ECCB7F] to-[#C5A059] text-[#0A0E1A] shadow-md' 
                      : 'bg-white/5 text-[#DFC07B] group-hover:bg-[#DFC07B]/15'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className={`text-xs font-semibold tracking-wide truncate ${isActive ? 'text-white' : 'text-[#EFEAE2]'}`}>
                      {item.label}
                    </span>
                    <span className="text-[10px] sm:text-[10.5px] text-[#8C7E6C] truncate mt-0.5">
                      {item.desc}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-[#DFC07B] text-[#0A0E1A]'}`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-[#DFC07B]" />
                  )}
                </div>

                {/* Left Active Glow Pill */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#DFC07B]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Drawer Action: Exit to Live Website */}
        <div className="p-3.5 sm:p-4 border-t border-white/10 space-y-2">
          <button
            onClick={() => {
              setSidebarOpen(false);
              onExitAdmin();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-[#DFC07B] border border-[#DFC07B]/30 text-xs font-semibold transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Return to Live Website</span>
          </button>
        </div>

      </aside>

      {/* 3. Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar Header */}
        <header className="sticky top-0 z-30 bg-[#0A0E1A]/95 backdrop-blur-md border-b border-[#DFC07B]/20 shadow-md px-3 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between gap-3">
          
          {/* Mobile Hamburger Button + Current Section Title */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#DFC07B] border border-white/10 cursor-pointer shrink-0"
              aria-label="Toggle Sidebar Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#8C7E6C] truncate">
                <span>Admin</span>
                <span>/</span>
                <span className="text-[#DFC07B] font-semibold truncate">{currentSection.label}</span>
              </div>
              <h1 className="font-serif-luxury text-base sm:text-xl font-bold text-white tracking-wide truncate max-w-[170px] sm:max-w-none">
                {currentSection.label}
              </h1>
            </div>
          </div>

          {/* Quick Actions on Top Header */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => loadEnquiries(true)}
              disabled={refreshing}
              className="p-2 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#DFC07B] border border-white/10 transition-colors cursor-pointer disabled:opacity-50"
              title="Refresh Atelier Data"
              aria-label="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={onExitAdmin}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/15 transition-all cursor-pointer"
              title="View Live Website"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#DFC07B]" />
              <span className="hidden xs:inline">Live Site</span>
            </button>
          </div>

        </header>

        {/* Toast Notification Bar */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
            <div className="px-5 py-3 rounded-2xl bg-[#0D1527] border border-[#DFC07B] text-white text-xs font-semibold shadow-2xl flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#DFC07B]" />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        {/* Dynamic Section View */}
        <main className="flex-1 p-3 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto">
          {loading ? (
            <div className="py-28 text-center text-[#A0988A] flex flex-col items-center justify-center">
              <RefreshCw className="w-8 h-8 animate-spin text-[#DFC07B] mb-3" />
              <p className="text-sm font-medium text-white">Loading Workspace...</p>
              <p className="text-xs text-[#8C7E6C] mt-1">Connecting to atelier database</p>
            </div>
          ) : activeTab === 'dashboard' ? (
            <AdminDashboard 
              enquiries={enquiries}
              settings={settings}
              onNavigateTab={handleTabChange}
              onViewEnquiry={(item) => {
                handleTabChange('enquiries');
              }}
              onRefresh={() => loadEnquiries(true)}
              refreshing={refreshing}
            />
          ) : activeTab === 'enquiries' ? (
            <AdminEnquiries 
              enquiries={enquiries}
              onUpdateStatus={handleUpdateStatus}
              onDeleteEnquiry={handleDeleteEnquiry}
              onRefresh={() => loadEnquiries(true)}
              refreshing={refreshing}
            />
          ) : activeTab === 'events' ? (
            <AdminEvents />
          ) : (
            <AdminSettings 
              settings={settings}
              onSaveSettings={handleSaveSettings}
              saving={savingSettings}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 py-4 px-4 sm:px-6 lg:px-8 text-xs text-[#70685A] text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Eventora Atelier &bull; Management Portal</span>
          <span className="text-[11px] text-[#A0988A]">
            Current Phone: <strong className="text-white">{settings.phone}</strong> &bull; Email: <strong className="text-white">{settings.email}</strong>
          </span>
        </footer>

      </div>

    </div>
  );
}

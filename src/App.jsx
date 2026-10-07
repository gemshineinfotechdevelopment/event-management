import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatsBanner from './components/StatsBanner';
import EventCard from './components/EventCard';
import CreateEventModal from './components/CreateEventModal';
import { api } from './services/api';
import { Search, Sparkles, AlertCircle, RefreshCw, CalendarX, CheckCircle, AlertTriangle } from 'lucide-react';

const CATEGORIES = ['All', 'Technology', 'Music & Arts', 'Design', 'Sustainability', 'Business', 'Health & Fitness'];

export default function App() {
  const [events, setEvents] = useState([]);
  const [serverStatus, setServerStatus] = useState('offline');
  const [loading, setLoading] = useState(true);
  const [registeringId, setRegisteringId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Check health and fetch events
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const health = await api.checkHealth();
      if (health && health.status === 'online') {
        setServerStatus('online');
      } else {
        setServerStatus('offline');
      }

      const res = await api.getEvents({ search: searchQuery, category: selectedCategory });
      if (res && res.success) {
        setEvents(res.data);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      setServerStatus('offline');
      showToast('Could not reach Node.js server. Please ensure backend is running.', 'error');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    loadData();
    const interval = setInterval(async () => {
      const health = await api.checkHealth();
      setServerStatus(health?.status === 'online' ? 'online' : 'offline');
    }, 10000);
    return () => clearInterval(interval);
  }, [loadData]);

  const handleRegister = async (eventId) => {
    try {
      setRegisteringId(eventId);
      const res = await api.registerEvent(eventId);
      if (res.success) {
        setEvents(prev => prev.map(evt => evt.id === eventId ? res.data : evt));
        showToast('🎉 Successfully registered for event!');
      }
    } catch (err) {
      showToast(err.message || 'Failed to register', 'error');
    } finally {
      setRegisteringId(null);
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      const res = await api.deleteEvent(eventId);
      if (res.success) {
        setEvents(prev => prev.filter(evt => evt.id !== eventId));
        showToast('Event removed successfully');
      }
    } catch (err) {
      showToast(err.message || 'Failed to delete event', 'error');
    }
  };

  const handleCreateEvent = async (formData) => {
    const res = await api.createEvent(formData);
    if (res.success) {
      setEvents(prev => [res.data, ...prev]);
      showToast('✨ Event published live!');
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-indigo-500/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[400px] right-0 w-[450px] h-[300px] bg-cyan-500/5 blur-3xl pointer-events-none -z-10" />

      {/* Navbar */}
      <Navbar 
        serverStatus={serverStatus} 
        onOpenCreateModal={() => setIsModalOpen(true)} 
      />

      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-5 shadow-sm">
            <Sparkles size={14} className="text-indigo-400" />
            <span>React 19 + Node.js Full-Stack Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-['Outfit',sans-serif] tracking-tight leading-tight mb-5">
            Discover, Host & Manage <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              World-Class Gatherings
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            Seamlessly powered by an Express REST API backend and a Vite React frontend built entirely with Tailwind CSS styling.
          </p>
        </section>

        {/* Stats Metrics */}
        <StatsBanner events={events} />

        {/* Controls: Search, Category Filters, Refresh */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 bg-slate-900/40 p-3.5 rounded-2xl border border-slate-800/80 backdrop-blur-sm">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search by event title, location..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Refresh Button */}
          <button
            onClick={loadData}
            title="Refresh events from server"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-700/50 active:scale-95 transition-all cursor-pointer"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Offline Warning Alert */}
        {serverStatus === 'offline' && (
          <div className="flex items-start sm:items-center gap-3 p-4 mb-8 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs sm:text-sm">
            <AlertCircle size={20} className="text-rose-400 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <span className="font-semibold">Backend server is offline:</span> Cannot reach API at <code className="px-1.5 py-0.5 rounded bg-rose-950/60 font-mono text-[11px] text-rose-200">{import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}</code>. Run <code className="px-1.5 py-0.5 rounded bg-slate-900 font-mono text-[11px] text-slate-200">npm run dev</code> or <code className="px-1.5 py-0.5 rounded bg-slate-900 font-mono text-[11px] text-slate-200">npm run dev:server</code> to connect the Node.js backend.
            </div>
          </div>
        )}

        {/* Events Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <RefreshCw size={36} className="animate-spin text-indigo-400 mb-3" />
            <p className="text-sm font-medium">Fetching events from server...</p>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={handleRegister}
                onDelete={handleDelete}
                isRegistering={registeringId === event.id}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 px-4 rounded-3xl border border-dashed border-slate-800 bg-slate-900/20">
            <div className="p-4 rounded-2xl bg-slate-800/50 text-slate-400 mb-4">
              <CalendarX size={38} />
            </div>
            <h3 className="text-lg font-bold font-['Outfit',sans-serif] text-white mb-1">
              No events found
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mb-6">
              No events matched your current search query or category filter.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer"
            >
              Create First Event
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950/60 py-6 text-center text-xs text-slate-500 mt-auto">
        <p>EventPulse Full-Stack Event Management • React (Vite) + Tailwind CSS + Node.js (Express)</p>
      </footer>

      {/* Modal */}
      <CreateEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateEvent}
      />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl border text-xs font-semibold backdrop-blur-md ${
              toast.type === 'error'
                ? 'bg-rose-950/90 text-rose-200 border-rose-800/60'
                : 'bg-emerald-950/90 text-emerald-200 border-emerald-800/60'
            }`}
          >
            {toast.type === 'error' ? <AlertTriangle size={16} /> : <CheckCircle size={16} />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

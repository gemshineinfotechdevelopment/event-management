import React from 'react';
import { Calendar, Plus, Server } from 'lucide-react';

export default function Navbar({ serverStatus, onOpenCreateModal }) {
  const appName = import.meta.env.VITE_APP_NAME || 'EventPulse';
  const isOnline = serverStatus === 'online';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/75 backdrop-blur-md transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25">
            <Calendar size={20} className="stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold font-['Outfit',sans-serif] tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
              {appName}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Server Badge */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              isOnline
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isOnline ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-rose-400'
              }`}
            />
            <Server size={13} />
            <span className="hidden sm:inline">
              Backend: {isOnline ? 'Connected' : 'Connecting...'}
            </span>
          </div>

          {/* Create Event Button */}
          <button
            onClick={onOpenCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-md shadow-indigo-500/20 active:scale-95 transition-all duration-150 cursor-pointer"
          >
            <Plus size={16} className="stroke-[2.5]" />
            <span>Create Event</span>
          </button>
        </div>
      </div>
    </header>
  );
}

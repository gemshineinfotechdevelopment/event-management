import React from 'react';
import { Calendar, Clock, MapPin, Trash2, CheckCircle, UserCheck } from 'lucide-react';

export default function EventCard({ event, onRegister, onDelete, isRegistering }) {
  const isFull = (event.registeredCount || 0) >= (event.capacity || 1);
  const fillPercentage = Math.min(100, Math.round(((event.registeredCount || 0) / (event.capacity || 1)) * 100));

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <article className="group flex flex-col rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5">
      {/* Image Wrap */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-800">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />

        {/* Category Pill */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/70 text-indigo-300 backdrop-blur-md border border-slate-700/50 shadow-sm">
          {event.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-white tracking-tight leading-snug mb-2 line-clamp-1 group-hover:text-indigo-300 transition-colors">
          {event.title}
        </h3>

        <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-col gap-2 mb-4 text-xs text-slate-300/90 font-medium">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-indigo-400 shrink-0" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-indigo-400 shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-indigo-400 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Capacity Progress */}
        <div className="mt-auto pt-2 mb-5">
          <div className="flex justify-between items-center text-[11px] font-medium text-slate-400 mb-1.5">
            <span>Capacity</span>
            <span className="text-slate-300">{event.registeredCount || 0} / {event.capacity} ({fillPercentage}%)</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                fillPercentage >= 90
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                  : 'bg-gradient-to-r from-indigo-500 to-violet-500'
              }`}
              style={{ width: `${fillPercentage}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onRegister(event.id)}
            disabled={isFull || isRegistering}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
              isFull
                ? 'bg-slate-800/80 text-slate-500 cursor-not-allowed border border-slate-700/50'
                : 'bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white shadow-md shadow-indigo-600/20'
            }`}
          >
            {isFull ? (
              <>
                <UserCheck size={14} />
                <span>Sold Out</span>
              </>
            ) : (
              <>
                <CheckCircle size={14} />
                <span>{isRegistering ? 'Registering...' : 'RSVP / Attend'}</span>
              </>
            )}
          </button>

          <button
            onClick={() => onDelete(event.id)}
            title="Delete event"
            className="inline-flex items-center justify-center p-2.5 rounded-xl text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 active:scale-95 transition-all duration-150 cursor-pointer"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

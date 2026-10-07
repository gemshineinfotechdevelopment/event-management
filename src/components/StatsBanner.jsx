import React from 'react';
import { CalendarDays, Users, Tag, TrendingUp } from 'lucide-react';

export default function StatsBanner({ events = [] }) {
  const totalEvents = events.length;
  const totalAttendees = events.reduce((acc, curr) => acc + (curr.registeredCount || 0), 0);
  const categoriesCount = new Set(events.map(e => e.category)).size;
  const avgAttendance = totalEvents > 0 
    ? Math.round(events.reduce((acc, curr) => acc + ((curr.registeredCount || 0) / (curr.capacity || 1)), 0) / totalEvents * 100) 
    : 0;

  const stats = [
    {
      label: 'Total Active Events',
      value: totalEvents,
      icon: CalendarDays,
      iconColor: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20'
    },
    {
      label: 'Total Registrations',
      value: totalAttendees.toLocaleString(),
      icon: Users,
      iconColor: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20'
    },
    {
      label: 'Diverse Categories',
      value: categoriesCount,
      icon: Tag,
      iconColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      label: 'Avg Capacity Filled',
      value: `${avgAttendance}%`,
      icon: TrendingUp,
      iconColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm hover:border-slate-700/80 hover:bg-slate-900/80 transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
          >
            <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${stat.bgColor} ${stat.iconColor} border ${stat.borderColor} shrink-0`}>
              <Icon size={22} />
            </div>
            <div className="min-w-0">
              <div className="text-2xl font-bold font-['Outfit',sans-serif] text-white tracking-tight leading-tight">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-slate-400 truncate mt-0.5">
                {stat.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

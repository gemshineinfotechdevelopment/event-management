import React from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  Archive, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  TrendingUp,
  FileSpreadsheet,
  Settings,
  Eye,
  RefreshCw
} from 'lucide-react';
import AdminAnalyticsChart from './AdminAnalyticsChart';

export default function AdminDashboard({ 
  enquiries = [], 
  settings = {}, 
  onNavigateTab, 
  onViewEnquiry, 
  onRefresh, 
  refreshing = false 
}) {
  // Compute analytics from live enquiries
  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter(e => (e.status || 'new') === 'new').length;
  const contactedEnquiries = enquiries.filter(e => e.status === 'contacted').length;
  const confirmedEnquiries = enquiries.filter(e => e.status === 'confirmed').length;

  // Recent 5 enquiries
  const recentEnquiries = enquiries.slice(0, 5);

  // Category breakdown
  const categoryCounts = enquiries.reduce((acc, curr) => {
    const cat = curr.category || curr.eventType || 'Other';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  // Status badge styling helper
  const getStatusBadge = (status = 'new') => {
    switch (status) {
      case 'new':
        return {
          bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
          label: 'New Lead',
          dot: 'bg-blue-400 animate-pulse'
        };
      case 'contacted':
        return {
          bg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
          label: 'Contacted',
          dot: 'bg-amber-400'
        };
      case 'confirmed':
        return {
          bg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
          label: 'Confirmed',
          dot: 'bg-emerald-400'
        };
      case 'archived':
        return {
          bg: 'bg-stone-500/10 text-stone-400 border-stone-500/30',
          label: 'Archived',
          dot: 'bg-stone-400'
        };
      default:
        return {
          bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
          label: 'New',
          dot: 'bg-blue-400'
        };
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0D1527] via-[#121B32] to-[#0A0E1A] border border-[#DFC07B]/30 shadow-2xl p-4 sm:p-8">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DFC07B]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFC07B]/15 border border-[#DFC07B]/40 text-[#ECCB7F] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#DFC07B]" />
              <span>Eventora Atelier &bull; Management Portal</span>
            </div>
            <h1 className="font-serif-luxury text-xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide">
              Celebration Enquiries Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-[#C9BFB5] max-w-2xl leading-relaxed">
              Manage incoming event requests directly inside the portal. Track client statuses, view celebration requirements, and update live contact details for the atelier.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto pt-1 md:pt-0">
            <button
              onClick={onRefresh}
              disabled={refreshing}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#E5DAC6] hover:text-white border border-white/15 text-xs font-medium transition-all cursor-pointer disabled:opacity-50 flex-1 sm:flex-initial"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-[#DFC07B]' : ''}`} />
              <span>{refreshing ? 'Syncing...' : 'Refresh'}</span>
            </button>

            <button
              onClick={() => onNavigateTab('events')}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-[#DFC07B]/40 text-xs font-semibold tracking-wide transition-all cursor-pointer flex-1 sm:flex-initial"
            >
              <Calendar className="w-3.5 h-3.5 text-[#DFC07B]" />
              <span>Portfolio</span>
            </button>

            <button
              onClick={() => onNavigateTab('enquiries')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:scale-102 cursor-pointer"
            >
              <span>View All Enquiries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Enquiries */}
        <div 
          onClick={() => onNavigateTab('enquiries')}
          className="p-5 rounded-2xl bg-[#0F172A]/80 border border-[#DFC07B]/20 shadow-lg hover:border-[#DFC07B]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#A0988A]">Total Enquiries</span>
            <div className="w-9 h-9 rounded-xl bg-[#DFC07B]/10 flex items-center justify-center text-[#DFC07B] group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-serif-luxury text-white">{totalEnquiries}</span>
            <span className="text-xs text-[#8C7E6C]">All Time</span>
          </div>
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#C9BFB5]">
            <span>Stored in Admin side</span>
            <span className="text-[#DFC07B] group-hover:translate-x-1 transition-transform">Browse &rarr;</span>
          </div>
        </div>

        {/* New Leads */}
        <div 
          onClick={() => onNavigateTab('enquiries')}
          className="p-5 rounded-2xl bg-[#0F172A]/80 border border-blue-500/30 shadow-lg hover:border-blue-400 transition-all cursor-pointer group relative overflow-hidden"
        >
          {newEnquiries > 0 && (
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-full pointer-events-none" />
          )}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-blue-300">New / Pending</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-serif-luxury text-blue-400">{newEnquiries}</span>
            <span className="text-xs text-blue-300/80">Require Action</span>
          </div>
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-blue-200">
            <span>Needs customer call</span>
            <span className="text-blue-400 group-hover:translate-x-1 transition-transform">View &rarr;</span>
          </div>
        </div>

        {/* Contacted */}
        <div 
          onClick={() => onNavigateTab('enquiries')}
          className="p-5 rounded-2xl bg-[#0F172A]/80 border border-amber-500/30 shadow-lg hover:border-amber-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-300">In Discussion</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-serif-luxury text-amber-300">{contactedEnquiries}</span>
            <span className="text-xs text-amber-200/80">Follow-up active</span>
          </div>
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-amber-200">
            <span>Proposal shared</span>
            <span className="text-amber-300 group-hover:translate-x-1 transition-transform">View &rarr;</span>
          </div>
        </div>

        {/* Confirmed Bookings */}
        <div 
          onClick={() => onNavigateTab('enquiries')}
          className="p-5 rounded-2xl bg-[#0F172A]/80 border border-emerald-500/30 shadow-lg hover:border-emerald-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-300">Confirmed Events</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-serif-luxury text-emerald-400">{confirmedEnquiries}</span>
            <span className="text-xs text-emerald-200/80">Ready to execute</span>
          </div>
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-emerald-200">
            <span>Locked dates</span>
            <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">View &rarr;</span>
          </div>
        </div>

      </div>

      {/* 3. Analysis & Trends Graph Section */}
      <AdminAnalyticsChart enquiries={enquiries} />

      {/* 4. Recent Enquiries (Left) & Atelier Live Settings Info (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Recent Enquiries Table (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-[#0F172A]/90 rounded-3xl border border-[#DFC07B]/20 shadow-xl overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#DFC07B] uppercase block">
                INCOMING LEADS
              </span>
              <h2 className="font-serif-luxury text-xl font-bold text-white mt-0.5">
                Recent Submitted Enquiries
              </h2>
            </div>

            <button
              onClick={() => onNavigateTab('enquiries')}
              className="text-xs text-[#DFC07B] hover:text-[#ECCB7F] font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <span>Manage All ({totalEnquiries})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentEnquiries.length === 0 ? (
            <div className="py-16 text-center text-[#A0988A] px-4">
              <Users className="w-12 h-12 mx-auto text-white/20 mb-3" />
              <p className="text-sm font-medium text-white">No enquiries received yet</p>
              <p className="text-xs text-[#8C7E6C] mt-1 max-w-sm mx-auto">
                Customer enquiries submitted through the website consultation modal and contact form will appear here.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop & Tablet Table (md and up) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/30 text-[#A0988A] uppercase tracking-wider text-[10px] border-b border-white/5">
                    <tr>
                      <th className="py-3.5 px-4 sm:px-6 font-semibold">Client</th>
                      <th className="py-3.5 px-4 font-semibold">Category</th>
                      <th className="py-3.5 px-4 font-semibold">Date & Guests</th>
                      <th className="py-3.5 px-4 font-semibold">Status</th>
                      <th className="py-3.5 px-4 sm:px-6 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#EFEAE2]">
                    {recentEnquiries.map((enq) => {
                      const badge = getStatusBadge(enq.status);
                      return (
                        <tr 
                          key={enq.id || enq._id || enq.refCode} 
                          className="hover:bg-white/5 transition-colors cursor-pointer"
                          onClick={() => onViewEnquiry(enq)}
                        >
                          <td className="py-4 px-4 sm:px-6">
                            <div className="flex flex-col">
                              <span className="font-semibold text-white text-sm">{enq.name || 'Unnamed Client'}</span>
                              <span className="text-[11px] text-[#DFC07B] font-mono mt-0.5">{enq.refCode}</span>
                              <span className="text-[11px] text-[#8C7E6C]">{enq.phone}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white font-medium inline-block text-[11px]">
                              {enq.category || enq.eventType || 'Celebration'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-[#C9BFB5]">
                            <div>
                              <span className="block text-white font-medium">{enq.date || enq.eventDate || 'Date open'}</span>
                              <span className="text-[11px] text-[#8C7E6C]">{enq.guests || enq.guestCount || 'Guests TBD'}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${badge.bg}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                              <span>{badge.label}</span>
                            </span>
                          </td>
                          <td className="py-4 px-4 sm:px-6 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onViewEnquiry(enq);
                              }}
                              className="p-2 rounded-xl bg-white/5 hover:bg-[#DFC07B] hover:text-[#0D1527] text-[#DFC07B] transition-all cursor-pointer inline-flex items-center justify-center"
                              title="View Full Details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Dedicated Enquiry Cards (below md) */}
              <div className="md:hidden divide-y divide-white/5">
                {recentEnquiries.map((enq) => {
                  const badge = getStatusBadge(enq.status);
                  return (
                    <div 
                      key={enq.id || enq._id || enq.refCode}
                      onClick={() => onViewEnquiry(enq)}
                      className="p-4 hover:bg-white/5 transition-colors cursor-pointer space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <span className="font-semibold text-white text-sm block truncate">
                            {enq.name || 'Unnamed Client'}
                          </span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-[#DFC07B] font-mono">{enq.refCode || 'EVT-LEAD'}</span>
                            <span className="text-[10px] text-[#8C7E6C]">&bull;</span>
                            <span className="text-[11px] text-[#A0988A] truncate">{enq.phone}</span>
                          </div>
                        </div>

                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium border shrink-0 ${badge.bg}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                          <span>{badge.label}</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-[#8C7E6C] pt-1 border-t border-white/5">
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#ECCB7F] text-[10px] font-medium truncate max-w-[140px]">
                          {enq.category || enq.eventType || 'Celebration'}
                        </span>
                        <div className="flex items-center gap-1.5 text-[11px] text-[#C9BFB5] shrink-0">
                          <span>📅 {enq.date || enq.eventDate || 'Date open'}</span>
                          <span>&bull;</span>
                          <span>👥 {enq.guests || enq.guestCount || 'TBD'}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <div className="p-4 bg-black/25 border-t border-white/5 flex items-center justify-between text-xs text-[#8C7E6C]">
            <span>Showing top {recentEnquiries.length} recent enquiries</span>
            <button
              onClick={() => onNavigateTab('enquiries')}
              className="text-[#DFC07B] hover:underline font-semibold cursor-pointer"
            >
              Open Enquiries Manager &rarr;
            </button>
          </div>
        </div>

        {/* Right Column: Active Live Contact Settings & Category Distribution (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Active Contact Information Card */}
          <div className="bg-[#0F172A]/90 rounded-3xl border border-[#DFC07B]/30 shadow-xl p-5 sm:p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#DFC07B] uppercase block">
                  LIVE WEBSITE DETAILS
                </span>
                <h3 className="font-serif-luxury text-lg font-bold text-white">
                  Active Contact Info
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('settings')}
                className="p-2 rounded-xl bg-[#DFC07B]/15 hover:bg-[#DFC07B] text-[#DFC07B] hover:text-[#0D1527] transition-all cursor-pointer"
                title="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#A0988A] leading-relaxed mb-5">
              These details are currently published across the public Header, Footer, and Contact page.
            </p>

            <div className="space-y-3.5">
              
              {/* Phone */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#DFC07B]/15 text-[#DFC07B] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] uppercase tracking-wider text-[#8C7E6C] font-semibold block">Phone Number</span>
                  <span className="text-xs font-bold text-white truncate block mt-0.5">{settings.phone || '+91 98765 43210'}</span>
                </div>
              </div>

              {/* Email */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#DFC07B]/15 text-[#DFC07B] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] uppercase tracking-wider text-[#8C7E6C] font-semibold block">Concierge Email</span>
                  <span className="text-xs font-bold text-white truncate block mt-0.5">{settings.email || 'hello@eventora.com'}</span>
                </div>
              </div>

              {/* Atelier Address */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#DFC07B]/15 text-[#DFC07B] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] uppercase tracking-wider text-[#8C7E6C] font-semibold block">Atelier Location</span>
                  <span className="text-xs text-[#C9BFB5] line-clamp-2 mt-0.5 leading-snug">
                    {settings.address || 'Boat Club Road, R.A. Puram, Chennai'}
                  </span>
                </div>
              </div>

            </div>

            <button
              onClick={() => onNavigateTab('settings')}
              className="w-full mt-5 py-3 rounded-xl bg-white/5 hover:bg-[#DFC07B]/20 text-[#DFC07B] text-xs font-semibold tracking-wide border border-[#DFC07B]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Change Phone or Email</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Popular Categories Card */}
          <div className="bg-[#0F172A]/90 rounded-3xl border border-[#DFC07B]/20 shadow-xl p-5 sm:p-6">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#DFC07B] uppercase block mb-1">
              DEMAND BREAKDOWN
            </span>
            <h3 className="font-serif-luxury text-lg font-bold text-white mb-4">
              Top Event Categories
            </h3>

            {categories.length === 0 ? (
              <p className="text-xs text-[#8C7E6C]">No event category data available yet.</p>
            ) : (
              <div className="space-y-3">
                {categories.map(([cat, count]) => {
                  const percent = totalEnquiries > 0 ? Math.round((count / totalEnquiries) * 100) : 0;
                  return (
                    <div key={cat} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#EFEAE2] font-medium">{cat}</span>
                        <span className="text-[#DFC07B] font-semibold">{count} ({percent}%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#DFC07B] to-[#ECCB7F] rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

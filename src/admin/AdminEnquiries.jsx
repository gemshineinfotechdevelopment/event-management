import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Search, 
  Filter, 
  Trash2, 
  Eye, 
  Phone, 
  Mail, 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Archive, 
  Copy, 
  Check, 
  Download, 
  X, 
  RefreshCw,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

export default function AdminEnquiries({ 
  enquiries = [], 
  onUpdateStatus, 
  onDeleteEnquiry, 
  onRefresh, 
  refreshing = false 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Selected enquiry for details modal
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  
  // Delete confirmation modal state
  const [enquiryToDelete, setEnquiryToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Status updating indicator
  const [updatingId, setUpdatingId] = useState(null);
  const [copied, setCopied] = useState(false);

  // Extract unique categories for filter dropdown
  const availableCategories = useMemo(() => {
    const set = new Set();
    enquiries.forEach(e => {
      const cat = e.category || e.eventType;
      if (cat) set.add(cat);
    });
    return Array.from(set);
  }, [enquiries]);

  // Counts for tabs
  const counts = useMemo(() => {
    return {
      all: enquiries.length,
      new: enquiries.filter(e => (e.status || 'new') === 'new').length,
      contacted: enquiries.filter(e => e.status === 'contacted').length,
      confirmed: enquiries.filter(e => e.status === 'confirmed').length,
      archived: enquiries.filter(e => e.status === 'archived').length,
    };
  }, [enquiries]);

  // Filtered & searched enquiries
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter(item => {
      // Status filter
      if (statusFilter !== 'all') {
        const itemStatus = item.status || 'new';
        if (itemStatus !== statusFilter) return false;
      }

      // Category filter
      if (categoryFilter !== 'all') {
        const cat = item.category || item.eventType;
        if (cat !== categoryFilter) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const name = (item.name || '').toLowerCase();
        const phone = (item.phone || '').toLowerCase();
        const email = (item.email || '').toLowerCase();
        const ref = (item.refCode || '').toLowerCase();
        const notes = (item.notes || item.message || '').toLowerCase();
        return name.includes(q) || phone.includes(q) || email.includes(q) || ref.includes(q) || notes.includes(q);
      }

      return true;
    });
  }, [enquiries, statusFilter, categoryFilter, searchQuery]);

  // Status badge helper
  const getStatusInfo = (status = 'new') => {
    switch (status) {
      case 'new':
        return {
          bg: 'bg-blue-500/15 text-blue-300 border-blue-500/40',
          label: 'New Lead',
          dot: 'bg-blue-400 animate-pulse'
        };
      case 'contacted':
        return {
          bg: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
          label: 'Contacted',
          dot: 'bg-amber-400'
        };
      case 'confirmed':
        return {
          bg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
          label: 'Confirmed',
          dot: 'bg-emerald-400'
        };
      case 'archived':
        return {
          bg: 'bg-stone-500/15 text-stone-300 border-stone-500/40',
          label: 'Archived',
          dot: 'bg-stone-400'
        };
      default:
        return {
          bg: 'bg-blue-500/15 text-blue-300 border-blue-500/40',
          label: 'New Lead',
          dot: 'bg-blue-400'
        };
    }
  };

  // Change status handler
  const handleStatusChange = async (enquiry, newStatus) => {
    const id = enquiry.id || enquiry._id || enquiry.refCode;
    setUpdatingId(id);
    try {
      await onUpdateStatus(id, newStatus);
      if (selectedEnquiry && (selectedEnquiry.id === id || selectedEnquiry._id === id || selectedEnquiry.refCode === id)) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
      }
    } finally {
      setUpdatingId(null);
    }
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!enquiryToDelete) return;
    setDeleting(true);
    const id = enquiryToDelete.id || enquiryToDelete._id || enquiryToDelete.refCode;
    try {
      await onDeleteEnquiry(id);
      if (selectedEnquiry && (selectedEnquiry.id === id || selectedEnquiry._id === id || selectedEnquiry.refCode === id)) {
        setSelectedEnquiry(null);
      }
      setEnquiryToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  // Copy full lead details to clipboard
  const handleCopyDetails = (item) => {
    const text = [
      `EVENTORA CELEBRATION LEAD - ${item.refCode || 'N/A'}`,
      `Client: ${item.name || 'N/A'}`,
      `Phone: ${item.phone || 'N/A'}`,
      `Email: ${item.email || 'N/A'}`,
      `Event: ${item.category || item.eventType || 'N/A'}`,
      `Date: ${item.date || item.eventDate || 'N/A'}`,
      `Guests: ${item.guests || item.guestCount || 'N/A'}`,
      `City: ${item.city || 'N/A'}`,
      `Status: ${item.status || 'new'}`,
      `Vision / Notes: ${item.notes || item.message || 'None'}`
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Export Enquiries as CSV file
  const handleExportCSV = () => {
    if (filteredEnquiries.length === 0) return;

    const headers = ['Ref Code', 'Client Name', 'Phone', 'Email', 'Event Category', 'Date', 'Guests', 'City', 'Status', 'Vision Notes', 'Created At'];
    const rows = filteredEnquiries.map(item => [
      `"${item.refCode || ''}"`,
      `"${(item.name || '').replace(/"/g, '""')}"`,
      `"${item.phone || ''}"`,
      `"${item.email || ''}"`,
      `"${item.category || item.eventType || ''}"`,
      `"${item.date || item.eventDate || ''}"`,
      `"${item.guests || item.guestCount || ''}"`,
      `"${(item.city || '').replace(/"/g, '""')}"`,
      `"${item.status || 'new'}"`,
      `"${(item.notes || item.message || '').replace(/"/g, '""')}"`,
      `"${item.createdAt || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Eventora_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Lock body scroll and handle Escape key when modals are open
  useEffect(() => {
    if (selectedEnquiry || enquiryToDelete) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          if (selectedEnquiry) setSelectedEnquiry(null);
          if (enquiryToDelete) setEnquiryToDelete(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedEnquiry, enquiryToDelete]);

  return (
    <div className="space-y-6">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 p-4 sm:p-6 rounded-3xl border border-[#DFC07B]/30 shadow-xl">
        <div>
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#DFC07B] uppercase block">
            ADMINISTRATIVE INBOX
          </span>
          <h1 className="font-serif-luxury text-xl sm:text-3xl font-bold text-white mt-0.5">
            Submitted Enquiries
          </h1>
          <p className="text-xs text-[#A0988A] mt-1">
            All customer requests submitted from the web portal are preserved here for your team.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#DFC07B] border border-white/10 transition-colors cursor-pointer disabled:opacity-50"
            title="Refresh Enquiries List"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* 2. Filter Tabs & Controls */}
      <div className="bg-[#0F172A]/90 p-3.5 sm:p-5 rounded-3xl border border-white/10 shadow-lg space-y-4">
        
        {/* Status Filter Tabs (Horizontally scrollable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 border-b border-white/10 -mx-1 px-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Enquiries', count: counts.all },
            { id: 'new', label: 'New Leads', count: counts.new, color: 'text-blue-400' },
            { id: 'contacted', label: 'In Contact', count: counts.contacted, color: 'text-amber-400' },
            { id: 'confirmed', label: 'Confirmed', count: counts.confirmed, color: 'text-emerald-400' },
            { id: 'archived', label: 'Archived', count: counts.archived, color: 'text-stone-400' },
          ].map(tab => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`shrink-0 whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#DFC07B] text-[#0A0E1A] shadow-md scale-102'
                    : 'bg-white/5 hover:bg-white/10 text-[#C9BFB5] hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                  isActive ? 'bg-[#0A0E1A]/20 text-[#0A0E1A]' : 'bg-black/30 text-[#DFC07B]'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Category Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search Box */}
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-[#8C7E6C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by client name, phone, email, ref code or special requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-[#786C5E] text-xs focus:outline-none focus:border-[#DFC07B]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-4 flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#DFC07B] shrink-0" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-[#DFC07B]"
            >
              <option value="all">All Event Categories</option>
              {availableCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* 3. Enquiries Table / Card View */}
      <div className="bg-[#0F172A]/90 rounded-3xl border border-[#DFC07B]/20 shadow-xl overflow-hidden">
        
        {filteredEnquiries.length === 0 ? (
          <div className="py-20 px-4 text-center text-[#A0988A]">
            <Users className="w-12 h-12 mx-auto text-white/20 mb-3" />
            <h3 className="font-serif-luxury text-lg text-white font-bold mb-1">
              No matching enquiries found
            </h3>
            <p className="text-xs text-[#8C7E6C] max-w-sm mx-auto">
              {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'Try clearing your search filters to view other submitted enquiries.'
                : 'No enquiries have been submitted yet. When clients submit an inquiry on the website, it will be stored here.'}
            </p>
            {(searchQuery || statusFilter !== 'all' || categoryFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setCategoryFilter('all');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#DFC07B] text-xs font-semibold border border-white/10 cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop & Tablet Table (md and up) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-black/40 text-[#A0988A] uppercase tracking-wider text-[10px] border-b border-white/10">
                  <tr>
                    <th className="py-4 px-4 sm:px-6 font-semibold">Ref Code & Date</th>
                    <th className="py-4 px-4 font-semibold">Client Name</th>
                    <th className="py-4 px-4 font-semibold">Contact Info</th>
                    <th className="py-4 px-4 font-semibold">Event Details</th>
                    <th className="py-4 px-4 font-semibold">Status</th>
                    <th className="py-4 px-4 sm:px-6 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-[#EFEAE2]">
                  {filteredEnquiries.map((enq) => {
                    const id = enq.id || enq._id || enq.refCode;
                    const isUpdating = updatingId === id;
                    const statusInfo = getStatusInfo(enq.status);

                    return (
                      <tr 
                        key={id}
                        className="hover:bg-white/5 transition-colors group"
                      >
                        {/* Ref Code & Submission Time */}
                        <td className="py-4 px-4 sm:px-6 align-top">
                          <div className="flex flex-col">
                            <span className="font-mono text-xs font-bold text-[#DFC07B]">
                              {enq.refCode || 'EVT-LEAD'}
                            </span>
                            <span className="text-[10px] text-[#8C7E6C] mt-1 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(enq.createdAt || Date.now()).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </td>

                        {/* Client Name */}
                        <td className="py-4 px-4 align-top">
                          <div className="font-semibold text-white text-sm">
                            {enq.name || 'Anonymous Client'}
                          </div>
                          {enq.city && (
                            <div className="text-[11px] text-[#8C7E6C] flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-[#DFC07B]" />
                              <span>{enq.city}</span>
                            </div>
                          )}
                        </td>

                        {/* Contact Info (Clickable Phone & Email) */}
                        <td className="py-4 px-4 align-top">
                          <div className="flex flex-col gap-1">
                            <a 
                              href={`tel:${enq.phone}`} 
                              className="inline-flex items-center gap-1.5 text-xs text-white hover:text-[#DFC07B] font-medium transition-colors"
                              title="Call Client"
                            >
                              <Phone className="w-3 h-3 text-[#DFC07B]" />
                              <span>{enq.phone || 'No phone'}</span>
                            </a>
                            {enq.email ? (
                              <a 
                                href={`mailto:${enq.email}`} 
                                className="inline-flex items-center gap-1.5 text-[11px] text-[#A0988A] hover:text-white transition-colors"
                                title="Email Client"
                              >
                                <Mail className="w-3 h-3 text-[#8C7E6C]" />
                                <span className="truncate max-w-[150px]">{enq.email}</span>
                              </a>
                            ) : (
                              <span className="text-[11px] text-[#6E6052]">No email provided</span>
                            )}
                          </div>
                        </td>

                        {/* Event Details */}
                        <td className="py-4 px-4 align-top">
                          <div className="space-y-1">
                            <span className="px-2 py-0.5 rounded-md bg-[#DFC07B]/10 border border-[#DFC07B]/30 text-[#ECCB7F] font-semibold text-[11px] inline-block">
                              {enq.category || enq.eventType || 'Celebration'}
                            </span>
                            <div className="text-[11px] text-[#C9BFB5] flex items-center gap-2">
                              <span>📅 {enq.date || enq.eventDate || 'Date open'}</span>
                              <span>&bull;</span>
                              <span>👥 {enq.guests || enq.guestCount || 'Guests TBD'}</span>
                            </div>
                            {enq.notes && (
                              <p className="text-[11px] text-[#8C7E6C] line-clamp-1 italic max-w-xs mt-0.5">
                                "{enq.notes}"
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Status Selector Dropdown */}
                        <td className="py-4 px-4 align-top">
                          <div className="relative inline-block">
                            <select
                              disabled={isUpdating}
                              value={enq.status || 'new'}
                              onChange={(e) => handleStatusChange(enq, e.target.value)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border focus:outline-none cursor-pointer transition-all ${statusInfo.bg} ${
                                isUpdating ? 'opacity-50 cursor-wait' : ''
                              }`}
                            >
                              <option value="new" className="bg-[#0F172A] text-blue-300">New Lead</option>
                              <option value="contacted" className="bg-[#0F172A] text-amber-300">Contacted</option>
                              <option value="confirmed" className="bg-[#0F172A] text-emerald-300">Confirmed</option>
                              <option value="archived" className="bg-[#0F172A] text-stone-300">Archived</option>
                            </select>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 sm:px-6 align-top text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedEnquiry(enq)}
                              className="p-2 rounded-xl bg-white/5 hover:bg-[#DFC07B] hover:text-[#0D1527] text-[#DFC07B] transition-all cursor-pointer"
                              title="View Full Inquiry Dossier"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleCopyDetails(enq)}
                              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer"
                              title="Copy Lead Summary"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => setEnquiryToDelete(enq)}
                              className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-[#8C7E6C] hover:text-red-400 transition-all cursor-pointer"
                              title="Delete Enquiry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Dedicated Enquiry Cards (below md) */}
            <div className="md:hidden divide-y divide-white/10">
              {filteredEnquiries.map((enq) => {
                const id = enq.id || enq._id || enq.refCode;
                const isUpdating = updatingId === id;
                const statusInfo = getStatusInfo(enq.status);

                return (
                  <div key={id} className="p-4 space-y-3 hover:bg-white/[0.02] transition-colors">
                    {/* Header: Client & Status Selector */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white text-sm truncate">
                            {enq.name || 'Anonymous Client'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-[#8C7E6C] mt-0.5">
                          <span className="font-mono text-[#DFC07B] font-bold">{enq.refCode || 'EVT-LEAD'}</span>
                          <span>&bull;</span>
                          <span>
                            {new Date(enq.createdAt || Date.now()).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short'
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Status Dropdown */}
                      <select
                        disabled={isUpdating}
                        value={enq.status || 'new'}
                        onChange={(e) => handleStatusChange(enq, e.target.value)}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold border focus:outline-none cursor-pointer shrink-0 ${statusInfo.bg}`}
                      >
                        <option value="new" className="bg-[#0F172A] text-blue-300">New</option>
                        <option value="contacted" className="bg-[#0F172A] text-amber-300">Contacted</option>
                        <option value="confirmed" className="bg-[#0F172A] text-emerald-300">Confirmed</option>
                        <option value="archived" className="bg-[#0F172A] text-stone-300">Archived</option>
                      </select>
                    </div>

                    {/* Direct Contact Links Bar */}
                    <div className="grid grid-cols-2 gap-2 pt-0.5">
                      <a
                        href={`tel:${enq.phone}`}
                        className="py-1.5 px-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium flex items-center gap-1.5 border border-white/10 truncate"
                      >
                        <Phone className="w-3 h-3 text-[#DFC07B] shrink-0" />
                        <span className="truncate">{enq.phone || 'No phone'}</span>
                      </a>

                      {enq.email ? (
                        <a
                          href={`mailto:${enq.email}`}
                          className="py-1.5 px-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium flex items-center gap-1.5 border border-white/10 truncate"
                        >
                          <Mail className="w-3 h-3 text-[#DFC07B] shrink-0" />
                          <span className="truncate">{enq.email}</span>
                        </a>
                      ) : (
                        <div className="py-1.5 px-2.5 rounded-lg bg-white/5 text-[#6E6052] text-[11px] flex items-center justify-center">
                          <span>No Email</span>
                        </div>
                      )}
                    </div>

                    {/* Event Info Bar */}
                    <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#ECCB7F] font-semibold text-[11px]">
                          {enq.category || enq.eventType || 'Celebration'}
                        </span>
                        {enq.city && (
                          <span className="text-[11px] text-[#A0988A] flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#DFC07B]" />
                            {enq.city}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[#C9BFB5]">
                        <span>📅 {enq.date || enq.eventDate || 'Date open'}</span>
                        <span>&bull;</span>
                        <span>👥 {enq.guests || enq.guestCount || 'Guests TBD'}</span>
                      </div>
                      {enq.notes && (
                        <p className="text-[11px] text-[#8C7E6C] line-clamp-2 italic pt-0.5">
                          "{enq.notes}"
                        </p>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => setSelectedEnquiry(enq)}
                        className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] text-xs font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Dossier</span>
                      </button>

                      <button
                        onClick={() => handleCopyDetails(enq)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10"
                        title="Copy Summary"
                      >
                        <Copy className="w-3.5 h-3.5 text-[#DFC07B]" />
                      </button>

                      <button
                        onClick={() => setEnquiryToDelete(enq)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-[#8C7E6C] hover:text-red-400 border border-white/10"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Footer Summary */}
        <div className="p-4 bg-black/40 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#8C7E6C]">
          <span>
            Displaying <strong className="text-white">{filteredEnquiries.length}</strong> of <strong className="text-white">{enquiries.length}</strong> enquiries
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#DFC07B]">All enquiries are kept safely in your administration database</span>
          </div>
        </div>

      </div>

      {/* 4. Full Enquiry Dossier Details Modal */}
      {selectedEnquiry && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={() => setSelectedEnquiry(null)}
        >
          <div 
            className="relative w-full max-w-2xl my-auto rounded-3xl bg-[#0D1527] border border-[#DFC07B]/40 shadow-2xl p-4 sm:p-8 text-white max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#DFC07B] cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start justify-between pr-8 mb-5 sm:mb-6 pb-4 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFC07B]/15 text-[#DFC07B] text-xs font-mono font-bold mb-2">
                  <span>{selectedEnquiry.refCode || 'EVT-ENQUIRY'}</span>
                </div>
                <h2 className="font-serif-luxury text-xl sm:text-3xl font-bold text-white">
                  {selectedEnquiry.name || 'Anonymous Client'}
                </h2>
                <p className="text-xs text-[#A0988A] mt-1 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#DFC07B]" />
                  <span>Received {new Date(selectedEnquiry.createdAt || Date.now()).toLocaleString('en-IN')}</span>
                </p>
              </div>
            </div>

            {/* Quick Action Contact Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-5 sm:mb-6">
              <a
                href={`tel:${selectedEnquiry.phone}`}
                className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:scale-102 transition-transform"
              >
                <Phone className="w-4 h-4" />
                <span>Call: {selectedEnquiry.phone}</span>
              </a>

              {selectedEnquiry.email ? (
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  className="p-3 sm:p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold tracking-wide border border-white/20 flex items-center justify-center gap-2 transition-all"
                >
                  <Mail className="w-4 h-4 text-[#DFC07B]" />
                  <span>Send Email</span>
                </a>
              ) : (
                <div className="p-3 sm:p-3.5 rounded-2xl bg-white/5 text-[#8C7E6C] text-xs flex items-center justify-center">
                  <span>No Email Provided</span>
                </div>
              )}
            </div>

            {/* Dossier Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
              
              <div className="p-3.5 sm:p-4 rounded-2xl bg-black/30 border border-white/5 space-y-1">
                <span className="text-[10px] uppercase font-semibold text-[#8C7E6C] block">Celebration Category</span>
                <span className="text-sm font-bold text-[#DFC07B]">
                  {selectedEnquiry.category || selectedEnquiry.eventType || 'General Celebration'}
                </span>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-black/30 border border-white/5 space-y-1">
                <span className="text-[10px] uppercase font-semibold text-[#8C7E6C] block">Tentative Date</span>
                <span className="text-sm font-bold text-white">
                  {selectedEnquiry.date || selectedEnquiry.eventDate || 'Date Flexible / Open'}
                </span>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-black/30 border border-white/5 space-y-1">
                <span className="text-[10px] uppercase font-semibold text-[#8C7E6C] block">Guest Count</span>
                <span className="text-sm font-bold text-white">
                  {selectedEnquiry.guests || selectedEnquiry.guestCount || 'Under 100'}
                </span>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-black/30 border border-white/5 space-y-1">
                <span className="text-[10px] uppercase font-semibold text-[#8C7E6C] block">Preferred City / Destination</span>
                <span className="text-sm font-bold text-white">
                  {selectedEnquiry.city || 'Chennai'}
                </span>
              </div>

            </div>

            {/* Client Vision / Notes */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-white/10 mb-5 sm:mb-6 space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#DFC07B] block">
                Client's Vision & Special Requests
              </span>
              <p className="text-xs sm:text-sm text-[#EFEAE2] leading-relaxed whitespace-pre-line">
                {selectedEnquiry.notes || selectedEnquiry.message || 'No specific requests provided by client.'}
              </p>
            </div>

            {/* Status Changer & Copy Controls */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <span className="text-xs text-[#A0988A] font-medium shrink-0">Status:</span>
                <select
                  value={selectedEnquiry.status || 'new'}
                  onChange={(e) => handleStatusChange(selectedEnquiry, e.target.value)}
                  className="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-black/50 border border-[#DFC07B]/40 text-white text-xs font-semibold focus:outline-none"
                >
                  <option value="new">New Lead</option>
                  <option value="contacted">Contacted</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleCopyDetails(selectedEnquiry)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#DFC07B]" />
                      <span>Copy Dossier</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setEnquiryToDelete(selectedEnquiry);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* 5. Delete Confirmation Modal */}
      {enquiryToDelete && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setEnquiryToDelete(null)}
        >
          <div 
            className="w-full max-w-md rounded-3xl bg-[#0D1527] border border-red-500/40 shadow-2xl p-5 sm:p-6 text-white text-center my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-red-500/15 border border-red-500/40 flex items-center justify-center text-red-400 mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-white mb-2">
              Delete This Enquiry?
            </h3>
            <p className="text-xs text-[#A0988A] leading-relaxed mb-6">
              Are you sure you want to delete enquiry <strong className="text-white">{enquiryToDelete.refCode}</strong> for client <strong className="text-white">{enquiryToDelete.name}</strong>? This action cannot be undone.
            </p>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3">
              <button
                disabled={deleting}
                onClick={() => setEnquiryToDelete(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={deleting}
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-semibold shadow-lg cursor-pointer disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Yes, Delete Enquiry'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}

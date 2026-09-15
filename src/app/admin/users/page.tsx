'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Search, 
  Filter, 
  ExternalLink, 
  Eye, 
  ShieldCheck, 
  Download, 
  Plus, 
  CheckCircle2, 
  MoreVertical,
  Mail,
  Smartphone,
  CreditCard,
  Building,
  LogIn,
  Edit2,
  Trash2,
  Check,
  X,
  AlertTriangle,
  Ban,
  Sparkles,
  Lock
} from 'lucide-react';
import { SEED_ADMIN_USERS, AdminUserRecord } from '@/lib/admin-store';
import { exportAdminMembersPDF } from '@/lib/pdf-export';

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<AdminUserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [editingUser, setEditingUser] = useState<AdminUserRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [exportingPdf, setExportingPdf] = useState(false);

  React.useEffect(() => {
    async function loadLiveUsers() {
      try {
        const res = await fetch('/api/admin/users', {
          cache: 'no-store',
          headers: { 'x-admin-key': 'oneclickbiz_admin_2026' }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.users) {
            setUsers(data.users);
          }
        }
      } catch (err) {
        console.error('Failed to load admin users:', err);
      } finally {
        setLoading(false);
      }
    }
    loadLiveUsers();
  }, []);

  const effectiveUsers = users.length > 0 ? users : (loading ? [] : SEED_ADMIN_USERS);

  const filtered = effectiveUsers.filter((u) => {
    const matchesSearch = 
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.businessName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.slug.toLowerCase().includes(search.toLowerCase());

    const matchesTier = tierFilter === 'ALL' || u.planTier.toUpperCase() === tierFilter;
    const matchesStatus = statusFilter === 'ALL' || u.subscriptionStatus === statusFilter;

    return matchesSearch && matchesTier && matchesStatus;
  });

  const [purging, setPurging] = useState(false);

  const handlePurgeUnpaid = async () => {
    if (!window.confirm('Are you sure you want to permanently delete all accounts who have NOT paid via Cashfree? Verified paid subscribers will be kept.')) {
      return;
    }
    setPurging(true);
    try {
      const res = await fetch('/api/admin/cleanup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': 'oneclickbiz_admin_2026'
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setToastMessage(data.message);
        // Refresh users
        const uRes = await fetch('/api/admin/users', {
          cache: 'no-store',
          headers: { 'x-admin-key': 'oneclickbiz_admin_2026' }
        });
        if (uRes.ok) {
          const uData = await uRes.json();
          if (uData.users) setUsers(uData.users);
        }
      } else {
        setToastMessage(data.error || 'Failed to purge unpaid accounts.');
      }
    } catch (e) {
      console.error(e);
      setToastMessage('Error connecting to cleanup API.');
    } finally {
      setPurging(false);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const handleExportPDF = () => {
    setExportingPdf(true);
    try {
      const filterLabel = tierFilter !== 'ALL' || statusFilter !== 'ALL' || search 
        ? `Filtered (${tierFilter} Tier / ${statusFilter} Status)` 
        : 'All Active Platform Members';
      exportAdminMembersPDF(filtered, filterLabel);
      setToastMessage(`Exported ${filtered.length} member records to PDF!`);
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        setExportingPdf(false);
        setToastMessage(null);
      }, 2000);
    }
  };

  const handleExportSingleMemberPDF = (user: AdminUserRecord) => {
    try {
      exportAdminMembersPDF([user], `Member Record: ${user.name} (${user.businessName})`);
      setToastMessage(`Exported member dossier for ${user.name}!`);
      setTimeout(() => setToastMessage(null), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const exportCSV = () => {
    const headers = ['ID,Name,Email,Business,Slug,Plan,Cost,Status,Joined,Taps,Scans,Orders,Bookings'];
    const rows = filtered.map(u => 
      `${u.id},"${u.name}",${u.email},"${u.businessName}",${u.slug},${u.planTier},${u.planCost},${u.subscriptionStatus},${u.joinedDate},${u.totalTaps},${u.totalScans},${u.totalOrders},${u.totalBookings}`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `oneclickbiz-members-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Super Admin Impersonation: Log in directly as member
  const handleImpersonateUser = (user: AdminUserRecord) => {
    if (typeof window !== 'undefined') {
      const sessionData = {
        name: user.name,
        email: user.email,
        companyName: user.businessName,
        slug: user.slug,
        planTier: user.planTier,
        isLoggedIn: true,
        impersonatedByAdmin: true
      };
      localStorage.setItem('oneclickbiz_user_session', JSON.stringify(sessionData));
    }
    router.push('/dashboard');
  };

  const handleSaveUserChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': 'oneclickbiz_admin_2026'
        },
        body: JSON.stringify({
          userId: editingUser.id,
          businessName: editingUser.businessName,
          status: editingUser.subscriptionStatus === 'CANCELLED' ? 'CANCELLED' : (editingUser.hasPaidInvoice ? 'ACTIVE' : 'UNBLOCK')
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const finalStatus = data.status || editingUser.subscriptionStatus;
        setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...editingUser, subscriptionStatus: finalStatus } : u));
        setToastMessage(`Member ${editingUser.name} updated successfully!`);
        setEditingUser(null);
      } else {
        setToastMessage(data.error || 'Strict Policy: Failed to update user.');
      }
    } catch (err) {
      console.error(err);
      setToastMessage('Network error updating member.');
    } finally {
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  const handleToggleSuspend = async (user: AdminUserRecord) => {
    const isCurrentlyBlocked = user.subscriptionStatus === 'CANCELLED';
    const targetAction = isCurrentlyBlocked ? 'UNBLOCK' : 'CANCELLED';
    
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': 'oneclickbiz_admin_2026'
        },
        body: JSON.stringify({
          userId: user.id,
          status: targetAction
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const resolvedStatus = data.status || (isCurrentlyBlocked ? (user.hasPaidInvoice ? 'ACTIVE' : 'EXPIRED') : 'CANCELLED');
        setUsers(prev => prev.map(u => u.id === user.id ? { ...u, subscriptionStatus: resolvedStatus } : u));
        setToastMessage(data.message || (targetAction === 'CANCELLED' ? `Account ${user.name} has been suspended/blocked.` : `Account ${user.name} unblocked.`));
      } else {
        setToastMessage(data.error || 'Cannot activate account without verified online payment.');
      }
    } catch (err) {
      console.error(err);
      setToastMessage('Failed to update account status.');
    } finally {
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-2xl backdrop-blur-xl">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 text-[11px] font-bold uppercase tracking-wider mb-2 shadow-sm">
            <Users className="w-3.5 h-3.5" /> Member Registry
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Members &amp; Smart Profile Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Manage all registered business identities, inspect public URLs, log in as member (impersonate), and oversee user subscription plans.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handlePurgeUnpaid}
            disabled={purging}
            className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold shadow-sm flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            title="Permanently remove test accounts who have not paid online"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-600" />
            <span>{purging ? 'Purging Unpaid...' : 'Purge Unpaid Accounts'}</span>
          </button>

          <button
            onClick={handleExportPDF}
            disabled={exportingPdf}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-rose-600/20 flex items-center gap-2 transition-all active:scale-95"
            title="Download Members Ledger PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{exportingPdf ? 'Generating PDF...' : 'Extract Members PDF'}</span>
          </button>

          <button
            onClick={exportCSV}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-indigo-600" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Directory Table Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-slate-200/80 shadow-md space-y-6 backdrop-blur-xl">
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, business name, or unique slug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Plan filter */}
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-indigo-500 focus:bg-white"
            >
              <option value="ALL">All Plans</option>
              <option value="BASIC">Basic Plan (₹999 - 1 Card)</option>
              <option value="PRO">Pro Plan (₹1,599 - 3 Cards)</option>
              <option value="ADVANCED">Advanced Plan (₹2,199 - 5 Cards)</option>
            </select>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-indigo-500 focus:bg-white"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="TRIAL">Trial</option>
              <option value="EXPIRED">Expired</option>
              <option value="CANCELLED">Suspended / Cancelled</option>
            </select>
          </div>
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">Member Info</th>
                <th className="py-3.5 px-4">Business Identity &amp; Slug</th>
                <th className="py-3.5 px-4">Plan &amp; Cards</th>
                <th className="py-3.5 px-4">Annual Cost</th>
                <th className="py-3.5 px-4">Traffic &amp; Scans</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 px-4 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Users className="w-8 h-8 text-slate-400 mb-1" />
                      <span className="font-bold text-slate-700">No Member Accounts Registered Yet</span>
                      <span className="text-xs text-slate-500">
                        When users register their business or create digital business cards, they will appear in this directory.
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Member Info */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 flex-shrink-0"
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-sm">{user.name}</span>
                        <span className="text-[11px] text-slate-600 flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400" />
                          {user.email}
                        </span>
                        <span className="text-[10px] text-slate-400">Joined: {user.joinedDate}</span>
                      </div>
                    </div>
                  </td>

                  {/* Business & Slug */}
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="font-semibold text-slate-800">{user.businessName}</div>
                      <Link
                        href={`/v/${user.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200"
                      >
                        <span>/v/{user.slug}</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </td>

                  {/* Plan Tier */}
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                        user.planTier === 'Advanced'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : user.planTier === 'Pro'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      }`}>
                        {user.planTier}
                      </span>
                      <p className="text-[10px] text-slate-500">
                        {user.planTier === 'Advanced' ? 'Up to 5 Cards' : user.planTier === 'Pro' ? 'Up to 3 Cards' : '1 Card'}
                      </p>
                    </div>
                  </td>

                  {/* Plan Cost */}
                  <td className="py-4 px-4">
                    <div className="font-extrabold text-slate-900 text-sm">
                      <span className="text-emerald-700">₹{user.planCost.toLocaleString()}<span className="text-[10px] text-slate-500 font-normal">/yr</span></span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Cycle: {user.billingCycle}
                    </div>
                  </td>

                  {/* Activity */}
                  <td className="py-4 px-4">
                    <div className="space-y-0.5">
                      <div className="font-semibold text-slate-900">
                        {(user.totalTaps + user.totalScans).toLocaleString()} taps &amp; scans
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {user.totalOrders} store orders • {user.totalBookings} bookings
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                      user.subscriptionStatus === 'ACTIVE'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : user.subscriptionStatus === 'CANCELLED'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {user.subscriptionStatus === 'ACTIVE' ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : user.subscriptionStatus === 'CANCELLED' ? (
                        <Ban className="w-3 h-3" />
                      ) : (
                        <AlertTriangle className="w-3 h-3" />
                      )}
                      {user.subscriptionStatus === 'EXPIRED' ? 'UNPAID' : user.subscriptionStatus}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 flex-wrap">
                      
                      {/* Impersonate */}
                      <button
                        onClick={() => handleImpersonateUser(user)}
                        title="Log in directly as this member"
                        className="px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 shadow-sm"
                      >
                        <LogIn className="w-3 h-3" />
                        <span>Login as User</span>
                      </button>

                      {/* Edit Tier */}
                      <button
                        onClick={() => setEditingUser({ ...user })}
                        title="Edit Plan Tier / Subscription"
                        className="p-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 transition shadow-sm"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-amber-600" />
                      </button>

                      {/* Export Single User PDF */}
                      <button
                        onClick={() => handleExportSingleMemberPDF(user)}
                        title="Extract Individual Member Dossier PDF"
                        className="p-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-indigo-700 border border-slate-200 transition shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5 text-indigo-600" />
                      </button>

                      {/* Suspend / Unblock */}
                      <button
                        onClick={() => handleToggleSuspend(user)}
                        title={user.subscriptionStatus === 'CANCELLED' ? 'Unblock Account' : 'Suspend / Block Account'}
                        className={`p-1.5 rounded-xl border transition shadow-sm ${
                          user.subscriptionStatus === 'CANCELLED'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100'
                        }`}
                      >
                        <Ban className="w-3.5 h-3.5" />
                      </button>

                    </div>
                  </td>

                </tr>
              )))}
            </tbody>
          </table>
        </div>

      </div>

      {/* EDIT MEMBER MODAL */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={editingUser.avatarUrl}
                  alt={editingUser.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900">Edit Subscription &amp; Tier</h3>
                  <p className="text-xs text-slate-500">{editingUser.name} • {editingUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUserChanges} className="space-y-4">
              
              {/* Strict Policy Banner */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Strict Online Payment Policy</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  All 1-year annual plan renewals must be processed through this automated online website portal. Direct and offline payments are strictly prohibited.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Plan Tier (Payment Verified)</label>
                <div className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-mono flex items-center justify-between">
                  <span>{editingUser.planTier} Plan</span>
                  <span className="text-emerald-700 font-bold">₹{editingUser.planCost} / yr</span>
                </div>
                <p className="text-[10px] text-slate-400">Plan tiers are tied directly to verified Cashfree gateway invoices.</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Subscription Status (Payment-Locked)</label>
                <div className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      editingUser.subscriptionStatus === 'ACTIVE'
                        ? 'bg-emerald-500'
                        : editingUser.subscriptionStatus === 'CANCELLED'
                        ? 'bg-rose-500'
                        : 'bg-amber-500'
                    }`} />
                    <span className="font-bold text-slate-900">
                      {editingUser.subscriptionStatus === 'ACTIVE'
                        ? 'ACTIVE (Verified via Cashfree PG)'
                        : editingUser.subscriptionStatus === 'CANCELLED'
                        ? 'CANCELLED (Admin Suspended)'
                        : 'UNPAID / EXPIRED (No Gateway Payment)'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <Lock className="w-3 h-3 text-amber-600" /> Strict Policy
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">Status cannot be changed to Active manually. Strict online checkout required.</p>
              </div>

              {/* Moderation Block/Unblock Action */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Account Moderation</span>
                  <span className="text-[11px] text-slate-500">Suspend or block account for policy violations.</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newStatus = editingUser.subscriptionStatus === 'CANCELLED'
                      ? (editingUser.hasPaidInvoice ? 'ACTIVE' : 'EXPIRED')
                      : 'CANCELLED';
                    setEditingUser({ ...editingUser, subscriptionStatus: newStatus });
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    editingUser.subscriptionStatus === 'CANCELLED'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                      : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                  }`}
                >
                  {editingUser.subscriptionStatus === 'CANCELLED' ? 'Unblock Account' : 'Suspend / Block'}
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Business Name</label>
                <input
                  type="text"
                  value={editingUser.businessName}
                  onChange={(e) => setEditingUser({ ...editingUser, businessName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs font-bold transition shadow-lg shadow-rose-600/20"
                >
                  Save Changes
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}


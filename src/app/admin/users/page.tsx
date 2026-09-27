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
  Lock,
  Gift,
  Key,
  UserPlus
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
  const [paymentFilter, setPaymentFilter] = useState('ALL');
  const [editingUser, setEditingUser] = useState<AdminUserRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [exportingPdf, setExportingPdf] = useState(false);

  // New Free Promo / Member Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    businessName: '',
    slug: '',
    planTier: 'Pro' as 'Basic' | 'Pro' | 'Advanced',
    isFreePromo: true,
    promoReason: 'Influencer & VIP Promotional Grant'
  });

  const loadLiveUsers = async () => {
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
  };

  React.useEffect(() => {
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
    const matchesPayment = paymentFilter === 'ALL' || 
      (paymentFilter === 'PAID' && u.paymentType === 'PAID_GATEWAY') ||
      (paymentFilter === 'COMPLIMENTARY' && u.paymentType === 'ADMIN_COMPLIMENTARY') ||
      (paymentFilter === 'UNPAID' && u.paymentType === 'UNPAID');

    return matchesSearch && matchesTier && matchesStatus && matchesPayment;
  });

  const [purging, setPurging] = useState(false);

  const handlePurgeUnpaid = async () => {
    if (!window.confirm('Are you sure you want to permanently delete all accounts who are UNPAID? (Verified Cashfree paid subscribers and Admin Free Promo accounts will be kept).')) {
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
        loadLiveUsers();
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

  const handleCreateNewUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingUser(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': 'oneclickbiz_admin_2026'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setToastMessage(`Created ${formData.name} successfully! (Complimentary VIP Free Access Granted)`);
        setShowAddModal(false);
        setFormData({
          name: '',
          email: '',
          password: '',
          businessName: '',
          slug: '',
          planTier: 'Pro',
          isFreePromo: true,
          promoReason: 'Influencer & VIP Promotional Grant'
        });
        loadLiveUsers();
      } else {
        setToastMessage(data.error || 'Failed to create user account.');
      }
    } catch (err) {
      console.error(err);
      setToastMessage('Network error creating account.');
    } finally {
      setCreatingUser(false);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const handleGrantExistingUserPromo = async (user: AdminUserRecord, promoReason: string) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': 'oneclickbiz_admin_2026'
        },
        body: JSON.stringify({
          userId: user.id,
          grantFreePromo: true,
          planTier: user.planTier || 'Pro',
          promoReason
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setToastMessage(data.message);
        setEditingUser(null);
        loadLiveUsers();
      } else {
        setToastMessage(data.error || 'Failed to grant free promo.');
      }
    } catch (err) {
      console.error(err);
      setToastMessage('Error granting promotional account.');
    } finally {
      setTimeout(() => setToastMessage(null), 3500);
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
    const headers = ['ID,Name,Email,Business,Slug,Plan,PaymentType,Cost,Status,Joined,Taps,Scans,Orders,Bookings'];
    const rows = filtered.map(u => 
      `${u.id},"${u.name}",${u.email},"${u.businessName}",${u.slug},${u.planTier},${u.paymentType || 'UNPAID'},${u.planCost},${u.subscriptionStatus},${u.joinedDate},${u.totalTaps},${u.totalScans},${u.totalOrders},${u.totalBookings}`
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

  // Count stats
  const paidCount = effectiveUsers.filter(u => u.paymentType === 'PAID_GATEWAY').length;
  const promoCount = effectiveUsers.filter(u => u.paymentType === 'ADMIN_COMPLIMENTARY').length;
  const unpaidCount = effectiveUsers.filter(u => u.paymentType === 'UNPAID').length;

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
            <Users className="w-3.5 h-3.5" /> Member Registry &amp; VIP Grants
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Members &amp; Smart Profile Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Manage all registered business identities, grant free promotional VIP access, and track paid vs complimentary subscribers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          
          {/* Add Free Member / Grant VIP Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 flex items-center gap-2 transition-all active:scale-95"
            title="Create a free promotional account for clients, influencers, or VIPs"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Grant Free VIP Account</span>
          </button>

          <button
            onClick={handlePurgeUnpaid}
            disabled={purging}
            className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold shadow-sm flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            title="Permanently remove test accounts who have not paid online"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-600" />
            <span>{purging ? 'Purging Unpaid...' : 'Purge Unpaid'}</span>
          </button>

          <button
            onClick={handleExportPDF}
            disabled={exportingPdf}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-rose-600/20 flex items-center gap-2 transition-all active:scale-95"
            title="Download Members Ledger PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{exportingPdf ? 'Generating PDF...' : 'Extract PDF'}</span>
          </button>

          <button
            onClick={exportCSV}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-indigo-600" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* Revenue & Member Audit Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">Paid Gateway Subscribers</span>
            <span className="text-xl font-extrabold text-emerald-950">{paidCount} Accounts</span>
            <p className="text-[10px] text-emerald-700 mt-0.5">30% Revenue Share Active (Cashfree)</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-black">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wider block">Admin Complimentary / VIP Promo</span>
            <span className="text-xl font-extrabold text-purple-950">{promoCount} Accounts</span>
            <p className="text-[10px] text-purple-700 mt-0.5">₹0 Invoiced (0% Dev Fee Charged)</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 font-black">
            <Gift className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">Unpaid / Expired Users</span>
            <span className="text-xl font-extrabold text-slate-800">{unpaidCount} Accounts</span>
            <p className="text-[10px] text-slate-500 mt-0.5">Awaiting Checkout or Promo Grant</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-600 font-black">
            <AlertTriangle className="w-5 h-5" />
          </div>
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
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            
            {/* Payment Category filter */}
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-semibold focus:outline-none focus:border-indigo-500 focus:bg-white"
            >
              <option value="ALL">All Payment Types</option>
              <option value="PAID">🟢 Paid (Cashfree PG)</option>
              <option value="COMPLIMENTARY">🟣 Complimentary (Admin Free)</option>
              <option value="UNPAID">🔴 Unpaid / Expired</option>
            </select>

            {/* Plan filter */}
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-indigo-500 focus:bg-white"
            >
              <option value="ALL">All Plans</option>
              <option value="BASIC">Basic Plan (1 Card)</option>
              <option value="PRO">Pro Plan (3 Cards)</option>
              <option value="ADVANCED">Advanced Plan (5 Cards)</option>
            </select>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-indigo-500 focus:bg-white"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="EXPIRED">Unpaid / Expired</option>
              <option value="CANCELLED">Suspended / Blocked</option>
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
                <th className="py-3.5 px-4">Plan Tier</th>
                <th className="py-3.5 px-4">Payment &amp; Revenue Class</th>
                <th className="py-3.5 px-4">Activity</th>
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
                      <span className="font-bold text-slate-700">No Member Accounts Found</span>
                      <span className="text-xs text-slate-500">
                        Click "Grant Free VIP Account" to create a complimentary member or clear your filters.
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

                  {/* Payment & Revenue Class */}
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      {user.paymentType === 'PAID_GATEWAY' ? (
                        <div>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-[10px]">
                            <CreditCard className="w-3 h-3 text-emerald-600" />
                            Paid (Cashfree PG)
                          </span>
                          <div className="text-[11px] font-extrabold text-emerald-700 mt-0.5">
                            ₹{user.planCost.toLocaleString()} <span className="text-[9px] text-slate-500 font-normal">invoiced</span>
                          </div>
                          <div className="text-[9px] text-slate-500 font-mono">
                            Split: ₹{Math.round(user.planCost * 0.7)} (70%) / ₹{Math.round(user.planCost * 0.3)} (30%)
                          </div>
                        </div>
                      ) : user.paymentType === 'ADMIN_COMPLIMENTARY' ? (
                        <div>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-50 border border-purple-200 text-purple-800 font-bold text-[10px]" title={user.promoReason || 'Admin Promotional Access'}>
                            <Gift className="w-3 h-3 text-purple-600" />
                            Complimentary (₹0 Promo)
                          </span>
                          <div className="text-[10px] text-purple-700 font-medium mt-0.5">
                            {user.promoReason || 'Promotional VIP Grant'}
                          </div>
                          <div className="text-[9px] text-slate-400 font-mono">
                            0% Revenue Fee (Free)
                          </div>
                        </div>
                      ) : (
                        <div>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-50 border border-rose-200 text-rose-700 font-bold text-[10px]">
                            <AlertTriangle className="w-3 h-3 text-rose-500" />
                            Unpaid Account
                          </span>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            Awaiting Payment
                          </div>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Activity */}
                  <td className="py-4 px-4">
                    <div className="space-y-0.5">
                      <div className="font-semibold text-slate-900">
                        {(user.totalTaps + user.totalScans).toLocaleString()} views
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {user.totalOrders} orders • {user.totalBookings} bookings
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
                        <span>Login</span>
                      </button>

                      {/* Edit / Grant Promo */}
                      <button
                        onClick={() => setEditingUser({ ...user })}
                        title="Manage Subscription / Grant VIP Promo"
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

      {/* MODAL: CREATE NEW MEMBER / GRANT FREE VIP PROMO */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Grant Free VIP Account / Add Member</h3>
                  <p className="text-xs text-slate-500">Create instant active account without online gateway payment</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewUser} className="space-y-4">
              
              {/* Audit Notice */}
              <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
                  <Gift className="w-3.5 h-3.5 text-purple-600" />
                  <span>Complimentary Promo Audit Trail (₹0 Invoiced)</span>
                </div>
                <p className="text-[11px] text-purple-700 leading-relaxed">
                  This user will receive full 1-year ACTIVE access with ₹0 recorded in financial ledger. No 30% developer revenue share is charged.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="ramesh@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Business / Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Events &amp; Decors"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Profile URL Slug (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. ramesh-events"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-mono focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Initial Password *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white pr-20"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, password: `Pass@${Math.floor(1000 + Math.random() * 9000)}` })}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2 py-1 rounded"
                    >
                      Generate
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Plan Tier</label>
                  <select
                    value={formData.planTier}
                    onChange={(e) => setFormData({ ...formData, planTier: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-semibold focus:outline-none focus:border-indigo-500 focus:bg-white"
                  >
                    <option value="Basic">Basic Plan (1 Card)</option>
                    <option value="Pro">Pro Plan (3 Cards - Recommended)</option>
                    <option value="Advanced">Advanced Plan (5 Cards)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Promo / Grant Reason (Audit Record)</label>
                <input
                  type="text"
                  placeholder="e.g. Influencer Collaboration, Client VIP Demo, Beta Partner"
                  value={formData.promoReason}
                  onChange={(e) => setFormData({ ...formData, promoReason: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingUser}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition shadow-lg shadow-indigo-600/20 disabled:opacity-50 flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{creatingUser ? 'Creating Account...' : 'Grant Free VIP Account'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* EDIT MEMBER & GRANT PROMO MODAL */}
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
                  <h3 className="text-base font-bold text-slate-900">Manage Account &amp; Access</h3>
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
              
              {/* Payment Type Status Card */}
              <div className={`p-4 rounded-2xl border space-y-1 ${
                editingUser.paymentType === 'PAID_GATEWAY'
                  ? 'bg-emerald-50 border-emerald-200'
                  : editingUser.paymentType === 'ADMIN_COMPLIMENTARY'
                  ? 'bg-purple-50 border-purple-200'
                  : 'bg-amber-50 border-amber-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Payment Classification
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    editingUser.paymentType === 'PAID_GATEWAY'
                      ? 'bg-emerald-200 text-emerald-900'
                      : editingUser.paymentType === 'ADMIN_COMPLIMENTARY'
                      ? 'bg-purple-200 text-purple-900'
                      : 'bg-amber-200 text-amber-900'
                  }`}>
                    {editingUser.paymentType === 'PAID_GATEWAY' ? '🟢 Verified Cashfree PG' : editingUser.paymentType === 'ADMIN_COMPLIMENTARY' ? '🟣 Admin Free VIP Grant' : '🔴 Unpaid'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  {editingUser.paymentType === 'PAID_GATEWAY'
                    ? `User paid ₹${editingUser.planCost} via online gateway. 30% developer revenue share is accounted for.`
                    : editingUser.paymentType === 'ADMIN_COMPLIMENTARY'
                    ? `Complimentary promotional access (₹0). Exempt from 30% revenue share.`
                    : 'Account has not paid online yet. You can grant Free VIP Promo below.'}
                </p>
              </div>

              {/* If user is unpaid, show Quick Grant Free Promo Button */}
              {editingUser.paymentType === 'UNPAID' && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-purple-950 block">Grant Free VIP Promotional Access</span>
                    <span className="text-[10px] text-purple-700">Activate account for 1 year with ₹0 audit record.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleGrantExistingUserPromo(editingUser, 'Converted to Free Promo by Admin')}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 flex items-center gap-1.5 transition"
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>Grant Free</span>
                  </button>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Business Name</label>
                <input
                  type="text"
                  value={editingUser.businessName}
                  onChange={(e) => setEditingUser({ ...editingUser, businessName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                  required
                />
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

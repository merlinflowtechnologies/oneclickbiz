'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Mail, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  Filter, 
  Download, 
  Trash2, 
  FileText,
  Lock,
  Crown,
  X
} from 'lucide-react';
import { INITIAL_LEADS } from '@/lib/data-store';
import { LeadItem } from '@/lib/types';
import { exportLeadsPDF } from '@/lib/pdf-export';
import { getCurrentUserPlan, PlanTierType } from '@/lib/plan-guards';

export default function LeadsCrmPage() {
  const [leads, setLeads] = useState<LeadItem[]>(INITIAL_LEADS);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [userPlanTier, setUserPlanTier] = useState<PlanTierType>('PRO');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    setUserPlanTier(getCurrentUserPlan());
  }, []);

  const updateLeadStatus = (id: string, newStatus: LeadItem['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const filteredLeads = filterStatus === 'ALL' 
    ? leads 
    : leads.filter(l => l.status === filterStatus);

  const handleExport = () => {
    if (userPlanTier === 'BASIC') {
      setShowUpgradeModal(true);
      return;
    }
    exportLeadsPDF(filteredLeads);
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-2xl relative">
            <button 
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white mx-auto shadow-lg">
              <Crown className="w-7 h-7 text-amber-300" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">Lead Data Export is a Pro Feature</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Exporting captured client inquiries, phone numbers, and consultation messages to CSV and PDF reports is available on the <strong>Pro Plan (₹1,599/yr)</strong> and <strong>Advanced Plan (₹2,199/yr)</strong>.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <Link
                href="/dashboard/settings?plan=PRO&checkout=true"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <Crown className="w-4 h-4 text-amber-300" />
                <span>Upgrade to Pro Plan (₹1,599/yr)</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-semibold text-slate-400"
              >
                Keep Viewing In-App Leads
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-pink-950/50 via-slate-900 to-slate-900 border border-pink-500/20 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-400 text-[11px] font-semibold mb-1">
            <Users className="w-3 h-3" /> Inquiries & Lead Pipeline
          </div>
          <h1 className="text-2xl font-bold text-white">Captured Leads & Inquiries</h1>
          <p className="text-xs text-slate-400">Direct inquiries submitted by visitors viewing your digital vCard.</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Status Filter Tabs */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 gap-1">
            {['ALL', 'NEW', 'QUALIFIED', 'CONTACTED', 'CONVERTED'].map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filterStatus === st 
                    ? 'bg-pink-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Export PDF */}
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95 shrink-0"
          >
            {userPlanTier === 'BASIC' ? <Lock className="w-3.5 h-3.5 text-amber-300" /> : <Download className="w-4 h-4" />}
            <span>Export PDF {userPlanTier === 'BASIC' && '(PRO)'}</span>
          </button>
        </div>
      </div>

      {/* Leads Grid */}
      {filteredLeads.length === 0 ? (
        <div className="p-12 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-pink-500/10 text-pink-400 mx-auto flex items-center justify-center">
            <Users className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">No Inquiries Captured Yet</h3>
            <p className="text-xs text-slate-400">
              When prospects view your digital card or scan your QR code and submit an inquiry, their contact details will appear here instantly.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLeads.map(lead => (
          <div key={lead.id} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center font-bold text-white text-xs">
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{lead.name}</h3>
                    <p className="text-[10px] text-slate-500 font-mono">{new Date(lead.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Status Dropdown */}
                <select
                  value={lead.status}
                  onChange={e => updateLeadStatus(lead.id, e.target.value as any)}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-[11px] font-semibold text-indigo-400 focus:outline-none"
                >
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="QUALIFIED">QUALIFIED</option>
                  <option value="CONVERTED">CONVERTED</option>
                  <option value="LOST">LOST</option>
                </select>
              </div>

              {/* Message Content */}
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  &ldquo;{lead.message}&rdquo;
                </p>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 pt-1">
                <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 hover:text-indigo-400 truncate">
                  <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate">{lead.email}</span>
                </a>
                {lead.phone && (
                  <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 hover:text-emerald-400">
                    <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{lead.phone}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Quick Action Bar */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <a 
                href={`mailto:${lead.email}?subject=Regarding%20your%20inquiry%20on%20OneClickBiz`}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow"
              >
                <Mail className="w-3.5 h-3.5" /> Reply by Email
              </a>
              {lead.phone && (
                <a 
                  href={`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(lead.name)},%20thank%20you%20for%20reaching%20out%20via%20my%20digital%20card!`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Chat
                </a>
              )}
            </div>

          </div>
        ))}
      </div>
      )}

    </div>
  );
}

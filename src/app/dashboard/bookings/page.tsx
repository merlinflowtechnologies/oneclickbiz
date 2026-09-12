'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Check, 
  X, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  AlertCircle,
  Download,
  FileSpreadsheet
} from 'lucide-react';
import { INITIAL_BOOKINGS } from '@/lib/data-store';
import { BookingSlot } from '@/lib/types';
import { exportBookingsPDF } from '@/lib/pdf-export';
import { getCurrentUserPlan, PlanTierType } from '@/lib/plan-guards';
import PlanLockGate from '@/components/common/PlanLockGate';

export default function BookingsManagerPage() {
  const [bookings, setBookings] = useState<BookingSlot[]>(INITIAL_BOOKINGS);
  const [userPlanTier, setUserPlanTier] = useState<PlanTierType>('PRO');

  useEffect(() => {
    try {
      const detectedPlan = getCurrentUserPlan();
      setUserPlanTier(detectedPlan);

      const stored = localStorage.getItem('oneclickbiz_user_bookings');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setBookings(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load bookings from localStorage:', e);
    }
  }, []);

  // Strict Plan Gating: Basic Plan cannot access Bookings Engine
  if (userPlanTier === 'BASIC') {
    return (
      <PlanLockGate
        requiredPlan="PRO"
        currentPlan={userPlanTier}
        featureTitle="Real-Time Appointment & Slot Booking Engine"
        featureDescription="The Slot Booking Engine allows your prospective clients, patients, and partners to choose available consultation time slots directly from your digital vCard."
        benefits={[
          'Automated real-time appointment calendar & time slots',
          'Instant client booking confirmation & SMS/WhatsApp alerts',
          'Export consultation records and schedules to PDF report',
          '1 White-label custom domain CNAME support included',
          'Unlimited WhatsApp Store product catalog included'
        ]}
      />
    );
  }

  const updateStatus = (id: string, newStatus: 'CONFIRMED' | 'CANCELLED') => {
    setBookings(prev => {
      const updated = prev.map(b => b.id === id ? { ...b, status: newStatus } : b);
      try {
        const stored = localStorage.getItem('oneclickbiz_user_bookings');
        if (stored) {
          const parsed = JSON.parse(stored);
          const updatedLocal = parsed.map((b: BookingSlot) => b.id === id ? { ...b, status: newStatus } : b);
          localStorage.setItem('oneclickbiz_user_bookings', JSON.stringify(updatedLocal));
        }
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/20 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-[11px] font-semibold mb-1">
            <CalendarIcon className="w-3 h-3" /> Real-time Slot Booking Engine
          </div>
          <h1 className="text-2xl font-bold text-white">Bookings & Appointments</h1>
          <p className="text-xs text-slate-400">Manage client consultation appointments booked directly from your digital vCard.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportBookingsPDF(bookings)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF Report</span>
          </button>
        </div>
      </div>

      {/* Bookings List Table */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <CalendarIcon className="w-8 h-8 text-slate-600 mb-1" />
                      <span className="font-bold text-slate-300">No Consultation Bookings Yet</span>
                      <span className="text-xs text-slate-500">
                        When clients book appointment slots through your vCard or booking links, they will appear here.
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                bookings.map(bk => (
                <tr key={bk.id} className="hover:bg-slate-800/40 transition-all">
                  <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                      {bk.customerName.charAt(0)}
                    </div>
                    <span>{bk.customerName}</span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-200">{bk.serviceTitle}</td>
                  <td className="px-6 py-4 text-slate-300 font-mono">
                    <span className="block font-bold">{bk.date}</span>
                    <span className="text-[11px] text-slate-400">{bk.time}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    <span className="block">{bk.customerEmail}</span>
                    <span className="text-[11px] text-slate-500">{bk.customerPhone}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      bk.status === 'CONFIRMED' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : bk.status === 'PENDING'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {bk.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {bk.status === 'PENDING' && (
                      <>
                        <button 
                          onClick={() => updateStatus(bk.id, 'CONFIRMED')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[10px] transition-all"
                        >
                          Confirm
                        </button>
                        <button 
                          onClick={() => updateStatus(bk.id, 'CANCELLED')}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white font-semibold text-[10px] transition-all"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

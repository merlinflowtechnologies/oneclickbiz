'use client';

import React, { useState } from 'react';
import { 
  Stethoscope, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Plus, 
  Trash2, 
  Activity,
  Award,
  Building2,
  Phone,
  Check, 
  HeartPulse,
  Heart
} from 'lucide-react';
import { DigitalProfile, HealthcareTrustConfig } from '@/lib/types';

interface HealthcareProfileStudioProps {
  profile: DigitalProfile;
  setProfile: React.Dispatch<React.SetStateAction<DigitalProfile>>;
}

export default function HealthcareProfileStudio({ profile, setProfile }: HealthcareProfileStudioProps) {
  const [activeSubTab, setActiveSubTab] = useState<'credentials' | 'timings' | 'treatments'>('credentials');

  const healthcareConfig: HealthcareTrustConfig = profile.sectionData?.healthcare || {};

  const updateHealthcareConfig = (patch: Partial<HealthcareTrustConfig>) => {
    setProfile(prev => ({
      ...prev,
      sectionData: {
        ...prev.sectionData,
        healthcare: {
          ...(prev.sectionData?.healthcare || {}),
          ...patch
        }
      }
    }));
  };

  const customTreatments = (healthcareConfig as any).treatments || [];

  const [newTreatment, setNewTreatment] = useState({
    title: '',
    category: 'General Medicine',
    desc: '',
    duration: '30 mins',
    recovery: 'Immediate'
  });
  const [showAddTreatment, setShowAddTreatment] = useState(false);

  const handleAddTreatment = () => {
    if (!newTreatment.title) return;
    const item = {
      id: `treat_${Date.now()}`,
      ...newTreatment
    };
    updateHealthcareConfig({
      treatments: [...customTreatments, item]
    } as any);
    setNewTreatment({
      title: '',
      category: 'General Medicine',
      desc: '',
      duration: '30 mins',
      recovery: 'Immediate'
    });
    setShowAddTreatment(false);
  };

  const handleDeleteTreatment = (id: string) => {
    updateHealthcareConfig({
      treatments: customTreatments.filter((t: any) => t.id !== id)
    } as any);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Studio Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-950/60 via-slate-900 to-cyan-950/40 border border-teal-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-teal-500/20 shrink-0">
            <Stethoscope className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white">
                Doctor Clinic &amp; Healthcare Studio
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
                MCI / NMC Verified
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Configure your medical licenses, hospital affiliations, OPD consulting hours, and treatments.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] text-teal-200/80 bg-black/40 px-3 py-1.5 rounded-xl border border-teal-500/30 font-semibold">
            {customTreatments.length} Care Plans Active
          </span>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveSubTab('credentials')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeSubTab === 'credentials'
              ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20 font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Medical Registration &amp; Degrees</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('timings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeSubTab === 'timings'
              ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20 font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>OPD Hours, Fees &amp; Emergency</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('treatments')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeSubTab === 'treatments'
              ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20 font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Specialized Treatments ({customTreatments.length})</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* SUB-TAB 1: CREDENTIALS & DEGREES                               */}
      {/* ============================================================== */}
      {activeSubTab === 'credentials' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>NMC / Medical Council Registration &amp; Qualifications</span>
              </h3>
              <span className="text-[10px] font-bold text-teal-400 bg-teal-950/60 border border-teal-800 px-2.5 py-0.5 rounded-full">
                Live Verification
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300">
                  Medical Council Reg. ID / License Number
                </label>
                <input
                  type="text"
                  value={healthcareConfig.regNumber ?? 'TSMC/DOC/2018/8892'}
                  placeholder="e.g. TSMC/DOC/2018/8892"
                  onChange={e => updateHealthcareConfig({ regNumber: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-teal-300 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Degrees &amp; Fellowships
                </label>
                <input
                  type="text"
                  value={healthcareConfig.degrees ?? 'MBBS, MD, FACC (USA)'}
                  placeholder="e.g. MBBS, MD, DNB (Internal Medicine)"
                  onChange={e => updateHealthcareConfig({ degrees: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div>
                <label className="text-xs font-bold text-slate-300">
                  Clinical Specialization
                </label>
                <input
                  type="text"
                  value={healthcareConfig.specialization ?? 'Senior Interventional Cardiologist'}
                  placeholder="e.g. Senior Consultant Physician"
                  onChange={e => updateHealthcareConfig({ specialization: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Hospital / Clinic Affiliation
                </label>
                <input
                  type="text"
                  value={healthcareConfig.hospitalAffiliation ?? (healthcareConfig as any).hospitalName ?? 'Care Clinic & Superspeciality Hospital'}
                  placeholder="e.g. Apollo Hospitals & Care Clinic"
                  onChange={e => {
                    updateHealthcareConfig({
                      hospitalAffiliation: e.target.value,
                      hospitalName: e.target.value
                    } as any);
                  }}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Years of Practice
                </label>
                <input
                  type="text"
                  value={(healthcareConfig as any).experienceYears ?? '16+ Years'}
                  placeholder="e.g. 16+ Years"
                  onChange={e => updateHealthcareConfig({ experienceYears: e.target.value } as any)}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUB-TAB 2: OPD HOURS, FEES & EMERGENCY                        */}
      {/* ============================================================== */}
      {activeSubTab === 'timings' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400" />
                <span>Consultation Timings, Fee Schedule &amp; Emergency Hotline</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300">
                  OPD Timings
                </label>
                <input
                  type="text"
                  value={healthcareConfig.opdTimings ?? 'Mon - Sat: 10:00 AM - 01:30 PM & 05:00 PM - 08:30 PM'}
                  placeholder="e.g. Mon - Sat: 10 AM - 1 PM"
                  onChange={e => updateHealthcareConfig({ opdTimings: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Consultation Fee
                </label>
                <input
                  type="text"
                  value={healthcareConfig.consultationFee ?? (healthcareConfig as any).fee ?? '₹600'}
                  placeholder="e.g. ₹600"
                  onChange={e => {
                    updateHealthcareConfig({
                      consultationFee: e.target.value,
                      fee: e.target.value
                    } as any);
                  }}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-emerald-400 font-bold focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  24/7 Emergency Hotline
                </label>
                <input
                  type="text"
                  value={healthcareConfig.emergencyPhone ?? profile.phone ?? '+91 98765 43210'}
                  placeholder="e.g. +91 98765 43210"
                  onChange={e => updateHealthcareConfig({ emergencyPhone: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-rose-400 font-mono focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUB-TAB 3: SPECIALIZED TREATMENTS                             */}
      {/* ============================================================== */}
      {activeSubTab === 'treatments' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-teal-400" />
                <span>Specialized Medical Procedures &amp; Care Plans</span>
              </h3>
              <p className="text-xs text-slate-400">
                Displayed in the treatment catalog of your clinic mini-website.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddTreatment(!showAddTreatment)}
              className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-teal-600/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddTreatment ? 'Cancel' : 'Add Treatment'}</span>
            </button>
          </div>

          {showAddTreatment && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-teal-500/40 space-y-3">
              <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wider">New Treatment Procedure</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Procedure Title</label>
                  <input
                    type="text"
                    value={newTreatment.title}
                    onChange={e => setNewTreatment(t => ({ ...t, title: e.target.value }))}
                    placeholder="e.g. 2D Echo & Cardiac Doppler"
                    className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Category</label>
                  <input
                    type="text"
                    value={newTreatment.category}
                    onChange={e => setNewTreatment(t => ({ ...t, category: e.target.value }))}
                    placeholder="e.g. Cardiac Diagnostics"
                    className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300">Description</label>
                <textarea
                  rows={2}
                  value={newTreatment.desc}
                  onChange={e => setNewTreatment(t => ({ ...t, desc: e.target.value }))}
                  placeholder="Describe the procedure, preparation, or diagnostic protocol..."
                  className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Duration</label>
                  <input
                    type="text"
                    value={newTreatment.duration}
                    onChange={e => setNewTreatment(t => ({ ...t, duration: e.target.value }))}
                    placeholder="e.g. 30 mins"
                    className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Recovery / Protocol</label>
                  <input
                    type="text"
                    value={newTreatment.recovery}
                    onChange={e => setNewTreatment(t => ({ ...t, recovery: e.target.value }))}
                    placeholder="e.g. Immediate / Same-Day"
                    className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={handleAddTreatment}
                  disabled={!newTreatment.title}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Treatment Plan</span>
                </button>
              </div>
            </div>
          )}

          {/* List of custom treatments */}
          <div className="space-y-3">
            {customTreatments.map((t: any) => (
              <div
                key={t.id}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{t.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30">
                      {t.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{t.desc}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-300 mt-2">
                    <span className="text-teal-400 font-medium">Duration: {t.duration}</span>
                    <span className="text-slate-400">• Recovery: {t.recovery}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteTreatment(t.id)}
                  className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition cursor-pointer"
                  title="Delete treatment"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {customTreatments.length === 0 && (
              <div className="p-8 text-center rounded-2xl bg-slate-900/50 border border-dashed border-slate-800">
                <Activity className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-xs text-slate-400">
                  Default clinic treatments are currently active. Click &quot;Add Treatment&quot; to customize your own specialty medical procedures.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

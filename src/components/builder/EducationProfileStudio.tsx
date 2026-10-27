'use client';

import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  Clock, 
  Phone, 
  Users, 
  Building2, 
  BookOpen, 
  Check, 
  Plus, 
  Trash2, 
  Sparkles,
  School,
  Calendar
} from 'lucide-react';
import { DigitalProfile, EducationTrustConfig } from '@/lib/types';

interface EducationProfileStudioProps {
  profile: DigitalProfile;
  setProfile: React.Dispatch<React.SetStateAction<DigitalProfile>>;
}

export default function EducationProfileStudio({ profile, setProfile }: EducationProfileStudioProps) {
  const [activeSubTab, setActiveSubTab] = useState<'accreditation' | 'counseling' | 'programs'>('accreditation');

  const educationConfig: EducationTrustConfig = profile.sectionData?.education || {};

  const updateEducationConfig = (patch: Partial<EducationTrustConfig>) => {
    setProfile(prev => ({
      ...prev,
      sectionData: {
        ...prev.sectionData,
        education: {
          ...(prev.sectionData?.education || {}),
          ...patch
        }
      }
    }));
  };

  const programsList = (educationConfig as any).programs || [];

  const [newProgram, setNewProgram] = useState({
    title: '',
    gradeLevel: 'Grade 6 - 12',
    curriculum: 'CBSE / Integrated',
    highlights: 'Olympiad Training, STEM Lab'
  });
  const [showAddProgram, setShowAddProgram] = useState(false);

  const handleAddProgram = () => {
    if (!newProgram.title) return;
    const item = {
      id: `prog_${Date.now()}`,
      ...newProgram
    };
    updateEducationConfig({
      programs: [...programsList, item]
    } as any);
    setNewProgram({
      title: '',
      gradeLevel: 'Grade 6 - 12',
      curriculum: 'CBSE / Integrated',
      highlights: 'Olympiad Training, STEM Lab'
    });
    setShowAddProgram(false);
  };

  const handleDeleteProgram = (id: string) => {
    updateEducationConfig({
      programs: programsList.filter((p: any) => p.id !== id)
    } as any);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-5 rounded-2xl text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-300/30 flex items-center justify-center text-amber-300">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  Education & Academy Studio
                </span>
                <span className="text-xs text-blue-200">Live Real-Time Sync</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">
                {profile.name || profile.company || 'Educational Institute'} Credentials
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Tab Navigation */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('accreditation')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeSubTab === 'accreditation'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          Affiliations & Track Record
        </button>

        <button
          onClick={() => setActiveSubTab('counseling')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeSubTab === 'counseling'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          Admissions & Counseling
        </button>

        <button
          onClick={() => setActiveSubTab('programs')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeSubTab === 'programs'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Special Programs ({programsList.length})
        </button>
      </div>

      {/* Tab 1: Affiliations & Track Record */}
      {activeSubTab === 'accreditation' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Board Affiliation / Curriculum
              </label>
              <input
                type="text"
                placeholder="e.g. CBSE &amp; ICSE Integrated • IIT &amp; NEET Foundation"
                value={educationConfig.boardAffiliation || ''}
                onChange={(e) => updateEducationConfig({ boardAffiliation: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Shown prominently in the top credibility ribbon and header tagline.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Accreditation &amp; Certifications
              </label>
              <input
                type="text"
                placeholder="e.g. ISO 9001:2015 Certified • NAAC A++ Rated"
                value={educationConfig.accreditation || ''}
                onChange={(e) => updateEducationConfig({ accreditation: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Established Year
              </label>
              <input
                type="text"
                placeholder="e.g. 1998 (27+ Years of Legacy)"
                value={educationConfig.establishedYear || ''}
                onChange={(e) => updateEducationConfig({ establishedYear: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Total Students / Alumni Enrolled
              </label>
              <input
                type="text"
                placeholder="e.g. 15,000+ Alumni"
                value={educationConfig.totalStudentsTrained || ''}
                onChange={(e) => updateEducationConfig({ totalStudentsTrained: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Selection / Distinction Pass Rate
              </label>
              <input
                type="text"
                placeholder="e.g. 99.4% Board Distinction Rate • 450+ IIT/NEET Selections in 2025"
                value={educationConfig.placementRate || ''}
                onChange={(e) => updateEducationConfig({ placementRate: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Admissions & Counseling */}
      {activeSubTab === 'counseling' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Admissions Desk Timings
              </label>
              <input
                type="text"
                placeholder="e.g. Mon - Sat: 9:00 AM - 5:00 PM"
                value={educationConfig.demoTimings || ''}
                onChange={(e) => updateEducationConfig({ demoTimings: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Admissions Inquiry Hotline (Phone/WhatsApp)
              </label>
              <input
                type="text"
                placeholder="e.g. +91 98765 43210"
                value={(educationConfig as any).admissionsHotline || ''}
                onChange={(e) => updateEducationConfig({ admissionsHotline: e.target.value } as any)}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Campus Location / Landmark Address
              </label>
              <input
                type="text"
                placeholder="e.g. Central Knowledge Enclave, Education Hub, Telangana 506001"
                value={(educationConfig as any).campusAddress || ''}
                onChange={(e) => updateEducationConfig({ campusAddress: e.target.value } as any)}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Special Programs & Features */}
      {activeSubTab === 'programs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-800">
              Specialized Programs &amp; Academics
            </h4>
            <button
              onClick={() => setShowAddProgram(!showAddProgram)}
              className="px-3 py-1.5 bg-blue-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-blue-800 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Program
            </button>
          </div>

          {showAddProgram && (
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
              <h5 className="text-xs font-bold text-slate-800">Add New Academic Program</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Program Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. IIT-JEE &amp; NEET Integrated Foundation"
                    value={newProgram.title}
                    onChange={(e) => setNewProgram(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full text-xs px-3 py-2 border rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Grade / Level</label>
                  <input
                    type="text"
                    placeholder="e.g. Classes 8th to 12th"
                    value={newProgram.gradeLevel}
                    onChange={(e) => setNewProgram(prev => ({ ...prev, gradeLevel: e.target.value }))}
                    className="w-full text-xs px-3 py-2 border rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Curriculum / Board</label>
                  <input
                    type="text"
                    placeholder="e.g. CBSE + National Science Olympiad"
                    value={newProgram.curriculum}
                    onChange={(e) => setNewProgram(prev => ({ ...prev, curriculum: e.target.value }))}
                    className="w-full text-xs px-3 py-2 border rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Key Features</label>
                  <input
                    type="text"
                    placeholder="e.g. Daily Practice Sheets, AI Mock Tests"
                    value={newProgram.highlights}
                    onChange={(e) => setNewProgram(prev => ({ ...prev, highlights: e.target.value }))}
                    className="w-full text-xs px-3 py-2 border rounded-lg bg-white"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowAddProgram(false)}
                  className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProgram}
                  className="px-4 py-1.5 text-xs font-bold bg-blue-900 text-white rounded-lg hover:bg-blue-800"
                >
                  Save Program
                </button>
              </div>
            </div>
          )}

          {programsList.length === 0 ? (
            <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-500 text-xs">
              No custom programs added yet. Click &quot;Add Program&quot; to configure specialized courses.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {programsList.map((prog: any) => (
                <div
                  key={prog.id}
                  className="p-3 bg-white border border-slate-200 rounded-xl flex items-start justify-between shadow-xs"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                      {prog.gradeLevel}
                    </span>
                    <h5 className="text-xs font-bold text-slate-800">{prog.title}</h5>
                    <p className="text-[11px] text-slate-500">{prog.curriculum}</p>
                    {prog.highlights && (
                      <p className="text-[11px] text-emerald-600 font-medium">✨ {prog.highlights}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteProgram(prog.id)}
                    className="p-1 text-slate-400 hover:text-red-500 transition"
                    title="Delete Program"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

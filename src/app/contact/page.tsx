'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { MessageCircle, Mail, Phone, MapPin, Send, CheckCircle2, ArrowLeft, Clock, Sparkles } from 'lucide-react';

export default function ContactSupportPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Support');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFD] text-[#10183F] font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#174BFF] hover:text-[#174BFF] mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="space-y-3 mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#059669] text-xs font-bold uppercase tracking-wider">
            <MessageCircle className="w-3.5 h-3.5" /> 24/7 Dedicated Support Desk
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#10183F] tracking-tight">
            How Can We Help You?
          </h1>
          <p className="text-sm text-[#64718F]">
            Have questions about your business smart card, billing, or need help setting up custom domains? Our dedicated team is here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Contact Info Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Primary Contact Person & WhatsApp */}
            <a 
              href="https://wa.me/918374372733?text=Hi%20Adduri%20Sai%20Kishore%2C%20I%20need%20assistance%20with%20OneClickBiz%20smart%20business%20cards."
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-3xl bg-white shadow-md border border-[#E2E9FA] hover:border-emerald-500/50 transition-all flex items-start gap-4 group shadow-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#059669] border border-emerald-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Primary Contact Person</span>
                <h3 className="text-base font-bold text-[#10183F]">Adduri Sai Kishore</h3>
                <p className="text-xs text-[#475569] font-mono font-semibold">+91 8374372733</p>
                <p className="text-[11px] text-emerald-300 font-semibold pt-1">Direct WhatsApp & Mobile Support →</p>
              </div>
            </a>

            {/* Email Desk */}
            <div className="p-6 rounded-3xl bg-white shadow-md border border-[#E2E9FA] hover:border-indigo-500/50 transition-all flex items-start gap-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-[#174BFF] flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1.5 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#174BFF]">Email Inquiries</span>
                <h3 className="text-base font-bold text-[#10183F]">Official Help Desk</h3>
                <div className="space-y-1 text-xs">
                  <div>
                    <a href="mailto:info@oneclickbiz.in" className="text-[#475569] hover:text-[#174BFF] font-medium transition flex items-center gap-1.5">
                      <span className="text-[#174BFF] font-semibold">Support:</span> info@oneclickbiz.in
                    </a>
                  </div>
                  <div>
                    <a href="mailto:contact@oneclickbiz.in" className="text-[#475569] hover:text-[#174BFF] font-medium transition flex items-center gap-1.5">
                      <span className="text-[#174BFF] font-semibold">Contact:</span> contact@oneclickbiz.in
                    </a>
                  </div>
                </div>
                <p className="text-[11px] text-[#174BFF] font-semibold pt-1">Reply within 2 hours →</p>
              </div>
            </div>

            {/* Registered Address */}
            <div className="p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA] flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Office Location</span>
                <h3 className="text-base font-bold text-[#10183F]">OneClickBiz Headquarters</h3>
                <p className="text-xs text-[#475569] leading-relaxed font-medium">
                  Nagole, Hyderabad, Telangana, India.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white shadow-md border border-[#E2E9FA] rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
              
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#10183F]">Send Us a Direct Message</h3>
                <p className="text-xs text-[#64718F]">
                  Fill in your details below and our customer success team will reach out to you directly.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#10183F]">Message Received!</h4>
                  <p className="text-xs text-[#475569]">
                    Thank you for reaching out. A specialist from our team has been assigned and will contact you via WhatsApp or Email shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-white shadow-xs hover:bg-slate-800 text-xs font-semibold text-[#10183F] border border-[#E2E9FA] transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#475569]">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFD] border border-[#E2E9FA] text-xs text-[#10183F] placeholder-[#94A3B8] focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#475569]">Work Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="rahul@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFD] border border-[#E2E9FA] text-xs text-[#10183F] placeholder-[#94A3B8] focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#475569]">Phone / WhatsApp Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+91 8374372733"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFD] border border-[#E2E9FA] text-xs text-[#10183F] placeholder-[#94A3B8] focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#475569]">Inquiry Topic</label>
                      <select
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFD] border border-[#E2E9FA] text-xs text-[#10183F] focus:outline-none focus:border-indigo-500"
                      >
                        <option value="General Support">General Support & Question</option>
                        <option value="Billing & Plans">Billing & Subscription Upgrade</option>
                        <option value="Custom Domain Setup">Custom Domain & SSL Setup</option>
                        <option value="Enterprise Solution">Enterprise & Multi-Profile Onboarding</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#475569]">Your Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Please describe how our team can help you..."
                      className="w-full p-3.5 rounded-xl bg-[#F8FAFD] border border-[#E2E9FA] text-xs text-[#10183F] placeholder-[#94A3B8] focus:outline-none focus:border-indigo-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-[#174BFF] hover:bg-[#103ED8] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Support</span>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

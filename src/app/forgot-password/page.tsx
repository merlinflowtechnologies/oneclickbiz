'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  Lock, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  KeyRound,
  ShieldCheck,
  RotateCcw,
  ArrowLeft,
  Phone,
  Shield
} from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();

  // Multi-step states: 'request' | 'verify_and_reset' | 'success'
  const [step, setStep] = useState<'request' | 'verify_and_reset' | 'success'>('request');
  
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Handle Step 1: Request OTP
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      const cleanEmail = email.toLowerCase().trim();
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send reset code. Please check your email.');
      }

      if (data.debugOtp) {
        setOtp(data.debugOtp);
        setSuccessMsg(data.message || `Verification code: ${data.debugOtp}`);
      } else {
        setSuccessMsg(`A 6-digit verification code has been sent to ${cleanEmail}. Please check your inbox and spam folder.`);
      }
      setStep('verify_and_reset');
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Step 2: Verify OTP & Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please ensure both passwords are identical.');
      return;
    }

    if (!otp || otp.trim().length !== 6) {
      setError('Please enter the 6-digit verification code sent to your email.');
      return;
    }

    setIsLoading(true);

    try {
      const cleanEmail = email.toLowerCase().trim();
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          otp: otp.trim(),
          newPassword
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to reset password. Please check the verification code.');
      }

      setStep('success');
      setSuccessMsg('Your password has been changed successfully!');
      
      // Auto-redirect to login after 3.5 seconds
      setTimeout(() => {
        router.push('/login?reset=success');
      }, 3500);

    } catch (err: any) {
      setError(err.message || 'Failed to update password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend code handler
  const handleResendCode = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase().trim() })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to resend code');
      if (data.debugOtp) {
        setOtp(data.debugOtp);
        setSuccessMsg(data.message || `New verification code: ${data.debugOtp}`);
      } else {
        setSuccessMsg('A new verification code has been dispatched to your email.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-600/10 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[250px] bg-emerald-500/10 blur-[120px] pointer-events-none -z-10" />

      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link href="/" className="inline-block group mb-2">
          <img 
            src="/logo.png" 
            alt="OneClickBiz - Business Made Simpler" 
            className="h-12 sm:h-14 w-auto max-w-[220px] sm:max-w-[260px] mx-auto object-contain mix-blend-screen transition-transform group-hover:scale-105 duration-200"
          />
        </Link>
        
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {step === 'success' ? 'Password Reset Complete' : 'Reset Your Password'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          {step === 'request' && 'Enter your registered email address and we will send you a verification code.'}
          {step === 'verify_and_reset' && `Enter the 6-digit code sent to ${email} and choose your new password.`}
          {step === 'success' && 'Your account security has been updated with your new password.'}
        </p>
      </div>

      {/* Main Card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 py-8 px-6 sm:px-8 shadow-2xl rounded-3xl relative">
          
          {/* Error Alert */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          {/* Success Banner */}
          {successMsg && step !== 'success' && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-start gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{successMsg}</span>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 1: REQUEST OTP                                      */}
          {/* ======================================================== */}
          {step === 'request' && (
            <form onSubmit={handleRequestCode} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Registered Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="founder@business.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Generating Code...</span>
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* ======================================================== */}
          {/* STEP 2: VERIFY OTP & ENTER NEW PASSWORD                   */}
          {/* ======================================================== */}
          {step === 'verify_and_reset' && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              
              {/* OTP Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-300">
                    6-Digit Verification Code
                  </label>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isLoading}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Resend Code</span>
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* New Password Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  New Password (min 6 characters)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Reset Button */}
              <button
                type="submit"
                disabled={isLoading || !otp || !newPassword || !confirmPassword}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Updating Password...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Confirm &amp; Reset Password</span>
                  </>
                )}
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setStep('request');
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className="text-xs text-slate-400 hover:text-slate-200 inline-flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Change Email Address</span>
                </button>
              </div>

            </form>
          )}

          {/* ======================================================== */}
          {/* STEP 3: SUCCESS STATE                                    */}
          {/* ======================================================== */}
          {step === 'success' && (
            <div className="text-center py-4 space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white">Password Updated!</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Your new password has been saved. You can now use it to access your business smart cards, dashboard, and lead CRM.
                </p>
              </div>

              <div className="pt-3">
                <Link
                  href="/login"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs inline-flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
                >
                  <span>Sign In Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-[11px] text-slate-500 mt-2">
                  Auto-redirecting to login in a few seconds...
                </p>
              </div>
            </div>
          )}

          {/* Back to Login Footer */}
          {step !== 'success' && (
            <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
              <p>
                Remember your password?{' '}
                <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                  Sign in
                </Link>
              </p>
              <a 
                href="https://wa.me/916304989071?text=Hi%20OneClickBiz%20Support%2C%20I%20need%20help%20resetting%20my%20password." 
                target="_blank" 
                rel="noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1 transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span>Support Desk</span>
              </a>
            </div>
          )}

          {/* Trust Row */}
          <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-3 text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>256-Bit SSL Encrypted</span>
            </span>
            <span className="text-slate-700">•</span>
            <span className="flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>Encrypted OTP Protection</span>
            </span>
            <span className="text-slate-700">•</span>
            <span>🇮🇳 Made in India</span>
          </div>

        </div>

        {/* Outer Legal & Company Footer */}
        <div className="mt-6 text-center space-y-3 pb-6">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">← Main Website</Link>
            <span className="text-slate-700">•</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span className="text-slate-700">•</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-slate-700">•</span>
            <Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
            <span className="text-slate-700">•</span>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link>
          </div>

          <div className="text-[11px] text-slate-500 space-y-0.5">
            <p>© 2026 OneClickBiz. All rights reserved.</p>
            <p>Developed & Maintained by <span className="text-slate-400 font-medium">Merlinflow Technologies Pvt Ltd</span> • Hyderabad, India</p>
          </div>
        </div>
      </div>

    </div>
  );
}

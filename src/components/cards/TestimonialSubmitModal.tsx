'use client';

import React, { useState } from 'react';
import { Star, X, CheckCircle2, Sparkles, Send, User } from 'lucide-react';
import { TestimonialItem } from '@/lib/types';

interface TestimonialSubmitModalProps {
  profileSlug: string;
  onClose: () => void;
  onTestimonialAdded: (testimonial: TestimonialItem) => void;
}

export default function TestimonialSubmitModal({
  profileSlug,
  onClose,
  onTestimonialAdded
}: TestimonialSubmitModalProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !feedback.trim()) return;

    const newTestimonial: TestimonialItem = {
      id: `review_${Date.now()}`,
      clientName: name.trim(),
      clientRole: company.trim() || 'Verified Client',
      clientAvatar: avatarUrl.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      rating,
      content: feedback.trim()
    };

    // Save to localStorage
    if (typeof window !== 'undefined') {
      try {
        const customKey = `oneclickbiz_custom_profile_${profileSlug}`;
        const raw = localStorage.getItem(customKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          parsed.testimonials = [newTestimonial, ...(parsed.testimonials || [])];
          localStorage.setItem(customKey, JSON.stringify(parsed));
        }
      } catch (err) {
        console.error('Failed to save testimonial:', err);
      }
    }

    onTestimonialAdded(newTestimonial);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl space-y-4 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Thank You for Your Review!</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Your 5-star feedback has been recorded and added to this business website.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" /> Leave Feedback
              </div>
              <h3 className="text-lg font-bold text-white">Write a Client Review</h3>
              <p className="text-xs text-slate-400">Share your experience with this professional or business.</p>
            </div>

            {/* Interactive 5-Star Selector */}
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-1.5">
              <span className="text-[11px] font-medium text-slate-400">Your Rating</span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-amber-400 hover:scale-125 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        (hoverRating || rating) >= star
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-amber-400 font-bold">
                {rating === 5 ? '⭐⭐⭐⭐⭐ Exceptional!' : rating >= 4 ? '⭐⭐⭐⭐ Great Experience' : '⭐⭐⭐ Good'}
              </span>
            </div>

            {/* Inputs */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Your Role & Company</label>
                <input
                  type="text"
                  placeholder="e.g. VP of Marketing, TechCorp"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Your Review & Comments *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Write a brief review about your collaboration..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-1.5 transition active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Review</span>
            </button>

          </form>
        )}

      </div>
    </div>
  );
}

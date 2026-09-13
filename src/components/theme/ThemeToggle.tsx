'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`relative inline-flex items-center justify-center p-2 rounded-xl transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-slate-900/90 text-amber-400 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 shadow-sm'
          : 'bg-slate-100 text-indigo-600 hover:bg-slate-200 border border-slate-200 hover:border-indigo-400/50 shadow-sm'
      } ${className}`}
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 transition-transform duration-300 -rotate-12 hover:rotate-0" />
        )}
      </div>
    </button>
  );
}

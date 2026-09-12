'use client';

import React from 'react';
import { Globe, ExternalLink, Mail, Phone, MessageCircle } from 'lucide-react';

interface SocialIconProps {
  platform?: string;
  url?: string;
  className?: string;
  size?: number;
  colored?: boolean;
}

export function detectSocialPlatform(platform?: string, url?: string): string {
  const p = (platform || '').toLowerCase().trim();
  const u = (url || '').toLowerCase().trim();

  if (p.includes('whatsapp') || u.includes('wa.me') || u.includes('whatsapp.com')) return 'whatsapp';
  if (p.includes('linkedin') || u.includes('linkedin.com')) return 'linkedin';
  if (p.includes('instagram') || u.includes('instagram.com') || u.includes('instagr.am')) return 'instagram';
  if (p.includes('twitter') || p.includes('x (twitter)') || p === 'x' || u.includes('twitter.com') || u.includes('x.com')) return 'twitter';
  if (p.includes('github') || u.includes('github.com')) return 'github';
  if (p.includes('youtube') || u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube';
  if (p.includes('facebook') || u.includes('facebook.com') || u.includes('fb.me')) return 'facebook';
  if (p.includes('telegram') || u.includes('t.me') || u.includes('telegram.me')) return 'telegram';
  if (p.includes('discord') || u.includes('discord.gg') || u.includes('discord.com')) return 'discord';
  if (p.includes('tiktok') || u.includes('tiktok.com')) return 'tiktok';
  if (p.includes('dribbble') || u.includes('dribbble.com')) return 'dribbble';
  if (p.includes('behance') || u.includes('behance.net')) return 'behance';
  if (p.includes('threads') || u.includes('threads.net')) return 'threads';
  if (p.includes('spotify') || u.includes('spotify.com')) return 'spotify';
  if (p.includes('medium') || u.includes('medium.com')) return 'medium';
  if (p.includes('mail') || p.includes('email') || u.startsWith('mailto:')) return 'mail';
  if (p.includes('phone') || p.includes('call') || u.startsWith('tel:')) return 'phone';
  if (p.includes('web') || p.includes('site') || p.includes('portfolio') || p.includes('globe')) return 'website';

  return 'generic';
}

export default function SocialIcon({
  platform,
  url,
  className = 'w-4 h-4',
  size = 18,
  colored = true
}: SocialIconProps) {
  const type = detectSocialPlatform(platform, url);

  switch (type) {
    case 'whatsapp':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} ${colored ? 'text-[#25D366]' : 'text-current'} shrink-0`}
        >
          <path 
            fill="currentColor" 
            d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.57 14.37C16.32 14.24 15.1 13.64 14.87 13.56C14.64 13.48 14.48 13.44 14.31 13.69C14.15 13.94 13.68 14.49 13.54 14.65C13.4 14.81 13.26 14.83 13.01 14.71C12.76 14.59 11.96 14.33 11.01 13.48C10.27 12.82 9.77 12 9.63 11.75C9.49 11.5 9.62 11.37 9.74 11.25C9.85 11.14 9.99 10.96 10.11 10.82C10.23 10.68 10.27 10.58 10.35 10.42C10.43 10.26 10.39 10.12 10.33 10C10.27 9.88 9.77 8.66 9.57 8.16C9.37 7.68 9.17 7.74 9.02 7.73C8.88 7.72 8.71 7.72 8.55 7.72C8.38 7.72 8.12 7.78 7.89 8.03C7.66 8.28 7.02 8.88 7.02 10.1C7.02 11.32 7.91 12.5 8.03 12.66C8.15 12.82 9.78 15.33 12.28 16.41C12.87 16.67 13.33 16.82 13.69 16.94C14.29 17.13 14.83 17.1 15.26 17.04C15.74 16.97 16.74 16.44 16.95 15.85C17.16 15.26 17.16 14.76 17.09 14.65C17.03 14.54 16.82 14.49 16.57 14.37Z"
          />
        </svg>
      );

    case 'linkedin':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} ${colored ? 'text-[#0A66C2]' : 'text-current'} shrink-0`}
        >
          <path 
            fill="currentColor" 
            d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"
          />
        </svg>
      );

    case 'instagram':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} ${colored ? 'text-[#E1306C]' : 'text-current'} shrink-0`}
        >
          <path 
            fill="currentColor" 
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
          />
        </svg>
      );

    case 'twitter':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} ${colored ? 'text-white' : 'text-current'} shrink-0`}
        >
          <path 
            fill="currentColor" 
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
          />
        </svg>
      );

    case 'github':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} ${colored ? 'text-slate-200' : 'text-current'} shrink-0`}
        >
          <path 
            fill="currentColor" 
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      );

    case 'youtube':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} ${colored ? 'text-[#FF0000]' : 'text-current'} shrink-0`}
        >
          <path 
            fill="currentColor" 
            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
          />
        </svg>
      );

    case 'facebook':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} ${colored ? 'text-[#1877F2]' : 'text-current'} shrink-0`}
        >
          <path 
            fill="currentColor" 
            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          />
        </svg>
      );

    case 'telegram':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} ${colored ? 'text-[#229ED9]' : 'text-current'} shrink-0`}
        >
          <path 
            fill="currentColor" 
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"
          />
        </svg>
      );

    case 'discord':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} ${colored ? 'text-[#5865F2]' : 'text-current'} shrink-0`}
        >
          <path 
            fill="currentColor" 
            d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
          />
        </svg>
      );

    case 'tiktok':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} ${colored ? 'text-[#00F2FE]' : 'text-current'} shrink-0`}
        >
          <path 
            fill="currentColor" 
            d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.895 2.895 0 0 1 2.312-4.634c.313 0 .615.05.898.143V9.42a6.34 6.34 0 0 0-.898-.064 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 8.805 5.836 6.34 6.34 0 0 0 3.878-5.836V8.125a8.197 8.197 0 0 0 4.761 1.517V6.197a4.832 4.832 0 0 1-.996-.511h.001z"
          />
        </svg>
      );

    case 'dribbble':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} ${colored ? 'text-[#EA4C89]' : 'text-current'} shrink-0`}
        >
          <path 
            fill="currentColor" 
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm7.65 6.04c-.33-.03-2.61-.17-5.18.91-.4-.82-.84-1.66-1.32-2.48 3.19-.07 5.75 1.09 6.5 1.57zm-8.32-3.48c.47.81.9 1.63 1.28 2.43-3.69 1.27-7.23 1.24-7.61 1.24.97-1.74 2.5-3.07 4.33-3.67h2zm-7.3 5.4c.34 0 3.4.03 7.02-1.22.25.52.48 1.04.7 1.57-4.22 1.33-8.23 4.22-8.42 4.36-.45-1.42-.69-2.94-.69-4.51 0-.07.01-.13.01-.2h1.38zm2.46 7.37c.34-.23 3.65-2.58 7.64-3.79 1.06 2.76 1.53 5.37 1.64 6.04-2.83 1.07-5.99.69-8.49-1.35-.3-.29-.57-.59-.79-.9zm10.74.83c-.15-.75-.62-3.13-1.63-5.74 2.37-.41 4.54.2 4.96.34-.51 2.39-1.84 4.43-3.68 5.68-.02.01-.04.01-.06.02-.27.18-.55.33-.84.47-.39-.12-.76-.28-1.12-.47.16-.1.32-.2.47-.3zm1.18-7.31c-.49-.16-2.45-.72-4.72-.34-.25-.56-.51-1.12-.79-1.66 2.45-1.07 4.67-.93 5.03-.9.41.87.66 1.83.69 2.85-.07.02-.14.03-.21.05z"
          />
        </svg>
      );

    case 'behance':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} ${colored ? 'text-[#0057FF]' : 'text-current'} shrink-0`}
        >
          <path 
            fill="currentColor" 
            d="M22 7h-7v2h7V7zm1.726 10c-.442 1.297-2.029 3-4.981 3-3.662 0-5.745-2.525-5.745-6 0-3.322 2.056-6 5.645-6 3.682 0 5.332 2.652 5.056 6.002h-8.225c.092 1.954 1.341 3.528 3.398 3.528 1.488 0 2.484-.662 2.92-1.53l1.932 1zm-4.981-6.5c-1.558 0-2.397.945-2.593 2.193h5.055c-.078-1.282-.879-2.193-2.462-2.193zM8.384 10.923c.895-.494 1.472-1.321 1.472-2.399 0-2.464-1.89-3.524-4.577-3.524H0v14h5.663c2.793 0 4.962-1.297 4.962-4.088 0-1.828-1.053-3.376-2.241-3.989zm-5.384-3.923h2.384c1.171 0 2.046.471 2.046 1.636 0 1.077-.875 1.637-2.046 1.637H3V7zm2.591 10H3v-4.5h2.591c1.372 0 2.409.613 2.409 2.25s-1.037 2.25-2.409 2.25z"
          />
        </svg>
      );

    case 'threads':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} ${colored ? 'text-white' : 'text-current'} shrink-0`}
        >
          <path 
            fill="currentColor" 
            d="M12.186 24h-.007c-3.581-.026-6.334-1.215-8.184-3.535C2.274 18.253 1.5 15.352 1.5 11.875 1.5 8.441 2.302 5.56 3.886 3.303 5.767.625 8.549 0 12.158 0c3.559 0 6.368.646 8.35 1.92 1.942 1.248 3.197 3.09 3.73 5.474a.88.88 0 0 1-.676 1.05.88.88 0 0 1-1.05-.675c-.443-1.98-1.467-3.493-3.045-4.506C17.765 2.18 15.32 1.76 12.158 1.76c-3.15 0-5.54.515-7.106 2.752C3.65 6.476 3.02 9.006 3.02 11.875c0 3.125.64 5.629 1.902 7.442 1.488 2.137 3.81 3.13 6.902 3.153 2.825 0 4.965-.794 6.362-2.36 1.34-1.503 1.838-3.55 1.48-6.082-.44-3.109-2.316-5.12-5.424-5.816-1.564-.35-3.176-.23-4.664.348-.82.318-1.52.793-2.022 1.373-.55.635-.85 1.428-.85 2.238 0 1.57 1.074 2.822 2.673 3.118 1.15.213 2.333-.038 3.246-.689.473-.337.842-.782 1.066-1.288.163-.367.49-.607.886-.607.135 0 .272.03.4.088.487.214.717.784.503 1.271-.34.77-.9 1.446-1.621 1.96-1.343.957-3.056 1.31-4.707 1.006-2.336-.432-3.92-2.315-3.92-4.685 0-1.226.467-2.42 1.315-3.364.776-.864 1.802-1.536 2.969-1.942 1.986-.69 4.148-.77 6.25-.23 4.02.9 6.46 3.568 7.054 7.712.44 3.078-.188 5.62-1.867 7.558-1.78 2.055-4.47 3.08-7.99 3.08z"
          />
        </svg>
      );

    case 'spotify':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} ${colored ? 'text-[#1ED760]' : 'text-current'} shrink-0`}
        >
          <path 
            fill="currentColor" 
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.627.627 0 0 1-.861.208c-2.357-1.44-5.323-1.766-8.818-.968a.627.627 0 1 1-.28-1.223c3.824-.874 7.104-.502 9.751 1.122a.627.627 0 0 1 .208.861zm1.225-2.724a.784.784 0 0 1-1.08.258c-2.697-1.658-6.809-2.137-9.998-1.169a.784.784 0 0 1-.462-1.498c3.642-1.106 8.188-.574 11.282 1.329a.784.784 0 0 1 .258 1.08zm.105-2.835C14.692 8.95 8.082 8.73 4.707 9.756a.94.94 0 1 1-.546-1.799c3.935-1.195 11.242-.937 15.074 1.338a.94.94 0 0 1-.319 1.77z"
          />
        </svg>
      );

    case 'mail':
      return <Mail className={`${className} ${colored ? 'text-rose-400' : 'text-current'} shrink-0`} size={size} />;

    case 'phone':
      return <Phone className={`${className} ${colored ? 'text-sky-400' : 'text-current'} shrink-0`} size={size} />;

    case 'website':
      return <Globe className={`${className} ${colored ? 'text-emerald-400' : 'text-current'} shrink-0`} size={size} />;

    default:
      return <ExternalLink className={`${className} ${colored ? 'text-indigo-400' : 'text-current'} shrink-0`} size={size} />;
  }
}

export function getSocialBrandColor(platform?: string, url?: string): { bg: string; border: string; text: string; glow: string } {
  const type = detectSocialPlatform(platform, url);

  switch (type) {
    case 'whatsapp':
      return {
        bg: 'bg-[#25D366]/10 hover:bg-[#25D366]/20',
        border: 'border-[#25D366]/30 hover:border-[#25D366]/60',
        text: 'text-[#25D366]',
        glow: 'hover:shadow-[#25D366]/20'
      };
    case 'linkedin':
      return {
        bg: 'bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20',
        border: 'border-[#0A66C2]/30 hover:border-[#0A66C2]/60',
        text: 'text-[#0A66C2]',
        glow: 'hover:shadow-[#0A66C2]/20'
      };
    case 'instagram':
      return {
        bg: 'bg-[#E1306C]/10 hover:bg-[#E1306C]/20',
        border: 'border-[#E1306C]/30 hover:border-[#E1306C]/60',
        text: 'text-[#E1306C]',
        glow: 'hover:shadow-[#E1306C]/20'
      };
    case 'twitter':
      return {
        bg: 'bg-white/10 hover:bg-white/20',
        border: 'border-white/20 hover:border-white/40',
        text: 'text-white',
        glow: 'hover:shadow-white/10'
      };
    case 'github':
      return {
        bg: 'bg-slate-700/30 hover:bg-slate-700/50',
        border: 'border-slate-600/40 hover:border-slate-500',
        text: 'text-slate-200',
        glow: 'hover:shadow-slate-500/20'
      };
    case 'youtube':
      return {
        bg: 'bg-[#FF0000]/10 hover:bg-[#FF0000]/20',
        border: 'border-[#FF0000]/30 hover:border-[#FF0000]/60',
        text: 'text-[#FF0000]',
        glow: 'hover:shadow-[#FF0000]/20'
      };
    case 'facebook':
      return {
        bg: 'bg-[#1877F2]/10 hover:bg-[#1877F2]/20',
        border: 'border-[#1877F2]/30 hover:border-[#1877F2]/60',
        text: 'text-[#1877F2]',
        glow: 'hover:shadow-[#1877F2]/20'
      };
    case 'telegram':
      return {
        bg: 'bg-[#229ED9]/10 hover:bg-[#229ED9]/20',
        border: 'border-[#229ED9]/30 hover:border-[#229ED9]/60',
        text: 'text-[#229ED9]',
        glow: 'hover:shadow-[#229ED9]/20'
      };
    case 'discord':
      return {
        bg: 'bg-[#5865F2]/10 hover:bg-[#5865F2]/20',
        border: 'border-[#5865F2]/30 hover:border-[#5865F2]/60',
        text: 'text-[#5865F2]',
        glow: 'hover:shadow-[#5865F2]/20'
      };
    case 'tiktok':
      return {
        bg: 'bg-[#00F2FE]/10 hover:bg-[#00F2FE]/20',
        border: 'border-[#00F2FE]/30 hover:border-[#00F2FE]/60',
        text: 'text-[#00F2FE]',
        glow: 'hover:shadow-[#00F2FE]/20'
      };
    case 'dribbble':
      return {
        bg: 'bg-[#EA4C89]/10 hover:bg-[#EA4C89]/20',
        border: 'border-[#EA4C89]/30 hover:border-[#EA4C89]/60',
        text: 'text-[#EA4C89]',
        glow: 'hover:shadow-[#EA4C89]/20'
      };
    case 'behance':
      return {
        bg: 'bg-[#0057FF]/10 hover:bg-[#0057FF]/20',
        border: 'border-[#0057FF]/30 hover:border-[#0057FF]/60',
        text: 'text-[#0057FF]',
        glow: 'hover:shadow-[#0057FF]/20'
      };
    case 'spotify':
      return {
        bg: 'bg-[#1ED760]/10 hover:bg-[#1ED760]/20',
        border: 'border-[#1ED760]/30 hover:border-[#1ED760]/60',
        text: 'text-[#1ED760]',
        glow: 'hover:shadow-[#1ED760]/20'
      };
    default:
      return {
        bg: 'bg-indigo-600/10 hover:bg-indigo-600/20',
        border: 'border-indigo-500/30 hover:border-indigo-500/60',
        text: 'text-indigo-300',
        glow: 'hover:shadow-indigo-500/20'
      };
  }
}

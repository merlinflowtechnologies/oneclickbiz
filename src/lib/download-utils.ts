'use client';

/**
 * Download Utilities for OneClickBiz
 * 
 * Provides robust, cross-browser file downloads that prevent:
 * 1. Popup-blocker suppression (caused by async window.open or target='_blank')
 * 2. Silent download failures on HTTPS
 * 3. Browser data URL length limit issues (>2MB) by converting to binary Blob
 * 4. Early URL revocation bugs where the download stream is cut off before completion
 */

/**
 * Triggers an instant, reliable browser download of a Blob.
 * - Appends a hidden <a> tag
 * - Sets download attribute and object URL
 * - Uses native link.click() which triggers the browser's download manager
 * - Retains blob URL for 60 seconds so browser download manager has ample time to stream
 */
export function downloadBlob(blob: Blob, filename: string): string {
  if (typeof window === 'undefined') return '';

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.rel = 'noopener';
  link.style.position = 'fixed';
  link.style.left = '-9999px';
  link.style.top = '-9999px';
  link.style.opacity = '0';
  document.body.appendChild(link);

  // Directly call .click() on the DOM element — this is what triggers native download in Blink, WebKit, and Gecko
  link.click();

  // Defer removal of link from DOM
  setTimeout(() => {
    if (document.body.contains(link)) {
      document.body.removeChild(link);
    }
  }, 1000);

  // Keep the blob URL alive for 60 seconds to ensure the browser download stream finishes
  setTimeout(() => {
    try {
      URL.revokeObjectURL(url);
    } catch {}
  }, 60000);

  return url;
}

/**
 * Downloads a direct URL (e.g. an existing blob URL or data URL) by appending an <a> tag
 * and invoking native .click() directly.
 */
export function downloadUrl(url: string, filename: string): void {
  if (typeof window === 'undefined') return;

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.setAttribute('download', filename);
  link.rel = 'noopener';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    if (document.body.contains(link)) document.body.removeChild(link);
  }, 1000);
}

/**
 * Downloads a data URL (e.g. from canvas or html-to-image) reliably by
 * converting it to a binary Blob in memory first. This avoids URL-length restrictions
 * that cause large image downloads (>2MB) to silently fail in Chromium/Safari.
 */
export function downloadDataUrl(dataUrl: string, filename: string): string {
  if (typeof window === 'undefined') return '';

  try {
    const parts = dataUrl.split(',');
    const mime = parts[0].match(/:(.*?);/)?.[1] || 'image/png';
    const binary = atob(parts[1]);
    const len = binary.length;
    const buffer = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      buffer[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([buffer], { type: mime });
    return downloadBlob(blob, filename);
  } catch (err) {
    console.error('Error converting dataUrl to blob, using fallback link:', err);
    downloadUrl(dataUrl, filename);
    return dataUrl;
  }
}

// Ensure window.saveAs uses our direct link.click() mechanism if called by jsPDF
if (typeof window !== 'undefined') {
  (window as any).saveAs = (blob: Blob, name: string) => {
    downloadBlob(blob, name);
  };
}

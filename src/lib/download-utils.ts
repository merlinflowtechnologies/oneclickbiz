'use client';

/**
 * Download Utilities for OneClickBiz
 * 
 * Provides 100% reliable, cross-browser, client-side file downloads:
 * 1. Converts payloads to binary Blobs with 'application/octet-stream' MIME type.
 *    This prevents Chromium (Chrome, Edge, Brave, Opera) from intercepting PDFs
 *    in its built-in tab viewer and forces direct saving to ~/Downloads.
 * 2. Employs a hidden, isolated <a> tag with explicit `download` attribute and
 *    NO `rel="noopener"` or `target="_blank"` that could trigger new tabs or popup blocks.
 * 3. Operates entirely in memory without server network roundtrips (immune to Nginx
 *    request-body limits, Cloudflare WAF blocks, or server 404s).
 * 4. Preserves Object URLs for 2 minutes to ensure the browser download stream completes.
 */

/**
 * Triggers an instant, reliable browser download of a Blob.
 * Wraps in application/octet-stream to guarantee direct OS saving.
 */
export function downloadBlob(blob: Blob, filename: string): string {
  if (typeof window === 'undefined') return '';

  try {
    const isSafari = typeof navigator !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // In Safari, keep the native MIME type (application/pdf or image/png)
    // In Chromium, use application/octet-stream to prevent tab interception
    let streamBlob = blob;
    if (isSafari) {
      const safariMime = filename.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'image/png';
      if (blob.type !== safariMime) {
        streamBlob = new Blob([blob], { type: safariMime });
      }
    } else if (blob.type !== 'application/octet-stream') {
      streamBlob = new Blob([blob], { type: 'application/octet-stream' });
    }

    const url = URL.createObjectURL(streamBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.setAttribute('download', filename);
    link.style.display = 'none';
    document.body.appendChild(link);

    // Direct native click for standard browser action
    try {
      link.click();
    } catch {
      const evt = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
      link.dispatchEvent(evt);
    }

    // Clean up anchor element after 1.5 seconds
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 1500);

    // Keep Object URL alive for 2 minutes to allow browser download stream to complete
    setTimeout(() => {
      try {
        URL.revokeObjectURL(url);
      } catch {}
    }, 120000);

    return url;
  } catch (err) {
    console.error('downloadBlob error:', err);
    return '';
  }
}

/**
 * Downloads a data URL (e.g. from canvas or html-to-image) reliably by
 * converting it to a binary Blob in memory first. This completely avoids URL-length
 * restrictions (>2MB) that cause image downloads to silently fail in Chromium/Safari.
 */
export function downloadDataUrl(dataUrl: string, filename: string): string {
  if (typeof window === 'undefined') return '';

  try {
    const parts = dataUrl.split(',');
    const base64 = parts[1];
    const binary = atob(base64);
    const len = binary.length;
    const buffer = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      buffer[i] = binary.charCodeAt(i);
    }
    const isSafari = typeof navigator !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const mime = isSafari
      ? (filename.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'image/png')
      : 'application/octet-stream';
    const blob = new Blob([buffer], { type: mime });
    return downloadBlob(blob, filename);
  } catch (err) {
    console.error('Error converting dataUrl to blob, using fallback link:', err);
    return downloadUrl(dataUrl, filename);
  }
}

/**
 * Downloads a direct URL (e.g. an existing blob URL or data URL) by appending an <a> tag
 * and invoking native .click() directly.
 */
export function downloadUrl(url: string, filename: string): string {
  if (typeof window === 'undefined') return '';

  try {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.setAttribute('download', filename);
    link.style.position = 'fixed';
    link.style.left = '-9999px';
    link.style.top = '-9999px';
    link.style.opacity = '0';
    link.style.pointerEvents = 'none';
    document.body.appendChild(link);

    link.click();

    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 1000);
  } catch (err) {
    console.error('downloadUrl error:', err);
  }

  return url;
}

/**
 * Backward compatibility stub for serverDownload.
 * Now routes directly to client download to prevent destructive page navigations.
 */
export function serverDownload(base64Data: string, filename: string, contentType: string = 'application/pdf'): void {
  if (typeof window === 'undefined') return;
  // If base64Data is a data URL or raw base64, route through client downloadDataUrl
  if (base64Data.startsWith('data:')) {
    downloadDataUrl(base64Data, filename);
  } else {
    downloadDataUrl(`data:${contentType};base64,${base64Data}`, filename);
  }
}

// Ensure window.saveAs uses our direct octet-stream downloadBlob mechanism if called by jsPDF
if (typeof window !== 'undefined') {
  (window as any).saveAs = (blob: Blob, name: string) => {
    downloadBlob(blob, name);
  };
}


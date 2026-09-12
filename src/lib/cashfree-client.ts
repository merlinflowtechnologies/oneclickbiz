/**
 * Cashfree JS SDK Loader & Checkout Helper
 */

declare global {
  interface Window {
    Cashfree?: any;
  }
}

export async function loadCashfreeScript(): Promise<any> {
  if (typeof window === 'undefined') return null;

  if (window.Cashfree) {
    return window.Cashfree;
  }

  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById('cashfree-sdk') as HTMLScriptElement | null;
    if (existingScript) {
      if (window.Cashfree) {
        resolve(window.Cashfree);
      } else {
        existingScript.addEventListener('load', () => resolve(window.Cashfree));
      }
      return;
    }

    const script = document.createElement('script');
    script.id = 'cashfree-sdk';
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    script.onload = () => {
      resolve(window.Cashfree);
    };
    script.onerror = (err) => {
      console.error('Failed to load Cashfree SDK script:', err);
      reject(err);
    };
    document.body.appendChild(script);
  });
}

export async function initiateCashfreePayment({
  paymentSessionId,
  mode = (process.env.NEXT_PUBLIC_CASHFREE_ENV as any) || 'production',
  onSuccess,
  onFailure,
  onClose
}: {
  paymentSessionId: string;
  mode?: 'sandbox' | 'production';
  onSuccess?: (data: any) => void;
  onFailure?: (data: any) => void;
  onClose?: () => void;
}) {
  try {
    const CashfreeSDK = await loadCashfreeScript();
    if (!CashfreeSDK) {
      throw new Error('Cashfree SDK could not be loaded');
    }

    const cashfree = CashfreeSDK({ mode });

    const checkoutOptions = {
      paymentSessionId,
      redirectTarget: '_modal'
    };

    const result = await cashfree.checkout(checkoutOptions);

    if (result?.error) {
      console.warn('Cashfree payment modal closed or error:', result.error);
      if (onFailure) onFailure(result.error);
      return result;
    }

    if (result?.paymentDetails || result?.redirect) {
      if (onSuccess) onSuccess(result);
      return result;
    }

    // Modal closed
    if (onClose) onClose();
    return result;
  } catch (error) {
    console.error('Error launching Cashfree Checkout:', error);
    if (onFailure) onFailure(error);
  }
}

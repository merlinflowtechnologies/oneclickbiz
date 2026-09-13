interface ResetEntry {
  code: string;
  expiresAt: number;
  attempts: number;
}

// Global in-memory cache preserved across hot reloads in development
declare global {
  var __oneclickbiz_reset_tokens: Map<string, ResetEntry> | undefined;
}

const resetTokenStore = global.__oneclickbiz_reset_tokens || new Map<string, ResetEntry>();
if (process.env.NODE_ENV !== 'production') {
  global.__oneclickbiz_reset_tokens = resetTokenStore;
}

/**
 * Generates a 6-digit OTP code for password reset with a 15-minute expiration
 */
export function generateResetOtp(email: string): string {
  const cleanEmail = email.toLowerCase().trim();
  // 6-digit numeric OTP
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

  resetTokenStore.set(cleanEmail, {
    code,
    expiresAt,
    attempts: 0
  });

  return code;
}

/**
 * Validates the reset OTP for a given email
 */
export function verifyResetOtp(email: string, code: string): { valid: boolean; error?: string } {
  const cleanEmail = email.toLowerCase().trim();
  const entry = resetTokenStore.get(cleanEmail);

  if (!entry) {
    return { valid: false, error: 'No password reset request found for this email. Please request a new code.' };
  }

  if (Date.now() > entry.expiresAt) {
    resetTokenStore.delete(cleanEmail);
    return { valid: false, error: 'Reset code has expired. Please request a new code.' };
  }

  if (entry.attempts >= 5) {
    resetTokenStore.delete(cleanEmail);
    return { valid: false, error: 'Too many incorrect attempts. Please request a new code.' };
  }

  if (entry.code !== code.trim()) {
    entry.attempts += 1;
    return { valid: false, error: `Invalid verification code. ${5 - entry.attempts} attempts remaining.` };
  }

  return { valid: true };
}

/**
 * Removes the used reset token
 */
export function clearResetOtp(email: string): void {
  const cleanEmail = email.toLowerCase().trim();
  resetTokenStore.delete(cleanEmail);
}

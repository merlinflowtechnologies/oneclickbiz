import prisma from '@/lib/prisma';

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
 * Stores in PostgreSQL (via systemSetting) to be safe across PM2 cluster instances
 */
export async function generateResetOtp(email: string): Promise<string> {
  const cleanEmail = email.toLowerCase().trim();
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

  // 1. In-memory cache
  resetTokenStore.set(cleanEmail, {
    code,
    expiresAt,
    attempts: 0
  });

  // 2. Database persistence (cross-worker cluster safe)
  try {
    await prisma.systemSetting.upsert({
      where: { key: `otp_reset_${cleanEmail}` },
      update: {
        value: { code, expiresAt, attempts: 0 }
      },
      create: {
        key: `otp_reset_${cleanEmail}`,
        value: { code, expiresAt, attempts: 0 }
      }
    });
  } catch (err) {
    console.warn('[OTP_STORE] DB persistence warning, relying on in-memory store:', err);
  }

  return code;
}

/**
 * Validates the reset OTP for a given email
 */
export async function verifyResetOtp(email: string, code: string): Promise<{ valid: boolean; error?: string }> {
  const cleanEmail = email.toLowerCase().trim();
  let entry = resetTokenStore.get(cleanEmail);

  // Check database first if available
  try {
    const dbRecord = await prisma.systemSetting.findUnique({
      where: { key: `otp_reset_${cleanEmail}` }
    });
    if (dbRecord && dbRecord.value) {
      entry = dbRecord.value as unknown as ResetEntry;
    }
  } catch (err) {
    console.warn('[OTP_STORE] DB lookup warning, checking memory store:', err);
  }

  if (!entry) {
    return { valid: false, error: 'No password reset request found for this email. Please request a new code.' };
  }

  if (Date.now() > entry.expiresAt) {
    await clearResetOtp(cleanEmail);
    return { valid: false, error: 'Reset code has expired. Please request a new code.' };
  }

  if (entry.attempts >= 5) {
    await clearResetOtp(cleanEmail);
    return { valid: false, error: 'Too many incorrect attempts. Please request a new code.' };
  }

  if (entry.code !== code.trim()) {
    const nextAttempts = (entry.attempts || 0) + 1;
    resetTokenStore.set(cleanEmail, { ...entry, attempts: nextAttempts });
    try {
      await prisma.systemSetting.update({
        where: { key: `otp_reset_${cleanEmail}` },
        data: { value: { ...entry, attempts: nextAttempts } as any }
      });
    } catch {}
    return { valid: false, error: `Invalid verification code. ${5 - nextAttempts} attempts remaining.` };
  }

  return { valid: true };
}

/**
 * Removes the used reset token
 */
export async function clearResetOtp(email: string): Promise<void> {
  const cleanEmail = email.toLowerCase().trim();
  resetTokenStore.delete(cleanEmail);
  try {
    await prisma.systemSetting.delete({
      where: { key: `otp_reset_${cleanEmail}` }
    });
  } catch {}
}


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
  const key = `otp_reset_${cleanEmail}`;
  const recordId = `otp_${cleanEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;

  // 1. In-memory cache
  resetTokenStore.set(cleanEmail, {
    code,
    expiresAt,
    attempts: 0
  });

  // 2. Database persistence (cross-worker cluster safe)
  try {
    await prisma.systemSetting.upsert({
      where: { key },
      update: {
        value: { code, expiresAt, attempts: 0 }
      },
      create: {
        id: recordId,
        key,
        value: { code, expiresAt, attempts: 0 }
      }
    });
    console.log(`[OTP_STORE] Successfully saved OTP to DB for ${cleanEmail}`);
  } catch (err) {
    console.error('[OTP_STORE] DB persistence error:', err);
  }

  return code;
}

/**
 * Validates the reset OTP for a given email
 */
export async function verifyResetOtp(email: string, code: string): Promise<{ valid: boolean; error?: string }> {
  const cleanEmail = email.toLowerCase().trim();
  const key = `otp_reset_${cleanEmail}`;
  let entry = resetTokenStore.get(cleanEmail);

  // Check database first if available
  try {
    const dbRecord = await prisma.systemSetting.findUnique({
      where: { key }
    });
    if (dbRecord && dbRecord.value) {
      const val = typeof dbRecord.value === 'string' ? JSON.parse(dbRecord.value) : dbRecord.value;
      entry = val as ResetEntry;
    }
  } catch (err) {
    console.error('[OTP_STORE] DB lookup error:', err);
  }

  if (!entry || !entry.code) {
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
        where: { key },
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
  const key = `otp_reset_${cleanEmail}`;
  resetTokenStore.delete(cleanEmail);
  try {
    await prisma.systemSetting.delete({
      where: { key }
    });
  } catch {}
}


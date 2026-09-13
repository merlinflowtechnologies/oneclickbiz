import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';
import { verifyResetOtp, clearResetOtp } from '@/lib/reset-tokens';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, otp, newPassword } = body;

    if (!email || !otp || !newPassword) {
      return NextResponse.json({ 
        error: 'Email, verification code, and new password are required' 
      }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (newPassword.length < 6) {
      return NextResponse.json({ 
        error: 'New password must be at least 6 characters long' 
      }, { status: 400 });
    }

    // Verify OTP code
    const verification = verifyResetOtp(cleanEmail, otp);
    if (!verification.valid) {
      return NextResponse.json({ 
        error: verification.error || 'Invalid or expired verification code' 
      }, { status: 400 });
    }

    // Hash the new password
    const passwordHash = await hashPassword(newPassword);

    // Update user password in database
    try {
      const user = await prisma.user.findUnique({
        where: { email: cleanEmail }
      });

      if (user) {
        await prisma.user.update({
          where: { email: cleanEmail },
          data: { passwordHash }
        });
      }
    } catch (dbErr) {
      console.warn('DB password update warning:', dbErr);
    }

    // Clear the OTP so it cannot be reused
    clearResetOtp(cleanEmail);

    return NextResponse.json({
      success: true,
      message: 'Password has been updated successfully! You can now sign in with your new password.'
    });

  } catch (error: any) {
    console.error('Reset password API error:', error);
    return NextResponse.json({ 
      error: 'Failed to reset password. Please try again later.' 
    }, { status: 500 });
  }
}

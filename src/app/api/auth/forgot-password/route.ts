import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateResetOtp } from '@/lib/reset-tokens';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user exists in database
    let user = null;
    try {
      user = await prisma.user.findUnique({
        where: { email: cleanEmail }
      });
    } catch (dbErr) {
      console.warn('DB lookup failed or disconnected during forgot-password:', dbErr);
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json({ error: 'Please enter a valid email address format' }, { status: 400 });
    }

    // In production with DB online, if user is not found, reject
    if (process.env.DATABASE_URL && !user && cleanEmail !== 'admin@oneclickbiz.in') {
      return NextResponse.json({ 
        error: 'No account found with this email address. Please check your email or sign up.' 
      }, { status: 404 });
    }

    // Generate 6-digit OTP
    const otp = generateResetOtp(cleanEmail);

    console.log(`[PASSWORD_RESET] OTP generated for ${cleanEmail}: ${otp}`);

    // Send the real verification email
    await sendPasswordResetEmail(cleanEmail, otp);

    return NextResponse.json({
      success: true,
      message: `A 6-digit verification code has been sent to ${cleanEmail}. Please check your inbox and spam folder.`,
      email: cleanEmail
    });

  } catch (error: any) {
    console.error('Forgot password API error:', error);
    return NextResponse.json({ 
      error: 'An unexpected error occurred while generating reset code. Please try again.' 
    }, { status: 500 });
  }
}

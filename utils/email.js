import { Resend } from 'resend';

const resend = new Resend('re_jjrwy2fP_88nvQJzS89jnu7AbwnZMh2BR');

export async function sendVerificationEmail(email, token, username) {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  await resend.emails.send({
    from: 'DevForge <noreply@devforge.tech>',
    to: email,
    subject: 'Verify your DevForge account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #bf4bf6;">Welcome to DevForge, ${username}!</h1>
        <p>Please verify your email address by clicking the button below:</p>
        <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #bf4bf6, #ff6b6b); color: white; text-decoration: none; border-radius: 8px; margin: 20px 0;">Verify Email</a>
        <p>Or copy and paste this link into your browser:</p>
        <p><code>${verificationUrl}</code></p>
        <p>This link expires in 24 hours.</p>
        <p>If you didn't create an account, you can ignore this email.</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email, token, username) {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  await resend.emails.send({
    from: 'DevForge <noreply@devforge.tech>',
    to: email,
    subject: 'Reset your DevForge password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #bf4bf6;">Password Reset Request</h1>
        <p>Hi ${username},</p>
        <p>We received a request to reset your password. Click the button below to set a new password:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #bf4bf6; color: white; text-decoration: none; border-radius: 8px; margin: 20px 0;">Reset Password</a>
        <p>Or copy this link: <code>${resetUrl}</code></p>
        <p>This link expires in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
  });
}
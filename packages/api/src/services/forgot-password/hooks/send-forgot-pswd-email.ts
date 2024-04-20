import { Hook, HookContext } from '@feathersjs/feathers'
import { Application } from '../../../declarations'
import { ForgotPasswordService } from '../forgot-password.class'
const sgMail = require('@sendgrid/mail')
import crypto from 'crypto'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const generateVerificationToken = () => {
  return crypto.randomBytes(16).toString('hex')
}

const sendForgotPswdEmail: Hook<Application, ForgotPasswordService> = async (
  context: HookContext<Application, ForgotPasswordService>
): Promise<HookContext<Application, ForgotPasswordService>> => {
  const { email, token } = context.result

  if (email && token) {
    const resetLink = `https://www.homeknown.app/reset-password?token=${token}`

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; color: #444; }
        .container { background-color: #fff; border: 1px solid #ddd; padding: 20px; max-width: 600px; margin: 20px auto; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1 { color: #333; }
        p { line-height: 1.6; }
        .button { display: inline-block; padding: 10px 20px; margin: 10px 2px; border-radius: 5px; color: #FFFFFF; background-color: #01697c; text-decoration: none; }
        .button:hover { background-color: #0056b3; }
        .footer { text-align: center; margin-top: 20px; font-size: 0.9em; color: #555; }
      </style>
    </head>
    <body>
    <div class="container">
      <h1>Password Reset Request</h1>
      <p>You're receiving this email because we received a password reset request for your account.</p>
      <p>Please click the button below to reset your password:</p>
      <a href="${resetLink}" class="button">Reset Password</a>
      <p>This password reset link will expire in 60 minutes. If you did not request a password reset, no further action is required.</p>
      <p>If you have any questions or need assistance, please contact our support team:</p>
      <a href="mailto:support@homeknown.app" class="button">Contact Support</a>
      <div class="footer">
        <p>This is an automated message; please do not reply directly to this email.</p>
      </div>
    </div>
    </body>
    </html>    
    `
    const msg = {
      to: email,
      from: { email: 'support@homeknown.app', name: 'HomeKnown' },
      subject: 'Reset Your Password',
      text: `Please use the following link to reset your password: ${resetLink}`,
      html: htmlContent
    }

    try {
      const response = await sgMail.send(msg)
    } catch (error) {
      console.error('Failed to send welcome email', error)
    }
  }

  return context
}

export default sendForgotPswdEmail

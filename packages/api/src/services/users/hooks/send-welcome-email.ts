import { Hook, HookContext } from '@feathersjs/feathers'
import { Application } from '../../../declarations'
import { UserService } from '../users.class'
const sgMail = require('@sendgrid/mail')
import crypto from 'crypto'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const generateVerificationToken = () => {
  return crypto.randomBytes(16).toString('hex')
}

const welcomeEmail: Hook<Application, UserService> = async (
  context: HookContext<Application, UserService>
): Promise<HookContext<Application, UserService>> => {
  const user = context.result

  if (user) {
    const token = generateVerificationToken()
    await context.app.service('users').patch(user.user_id, {
      verificationToken: token
    })

    const verificationLink = `https://www.homeknown.app/verify-email?token=${token}`

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to HomeKnown</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; color: #444; }
        .container { background-color: #fff; border: 1px solid #ddd; padding: 20px; max-width: 600px; margin: 20px auto; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1 { color: #333; }
        p { line-height: 1.6; }
        .button { display: inline-block; padding: 10px 20px; margin: 10px 2px; border-radius: 5px; color: #FFFFFF; background-color: #01697c; text-decoration: none; }
        .button:hover { background-color: #FFFFFF; color: #01697c !important; border: 1px solid #01697c;}
        .footer { text-align: center; margin-top: 20px; font-size: 0.9em; color: #555; }
      </style>
      </head>
      <body>
      <div class="container">
        <h1>Welcome to HomeKnown, ${user.first_name || user.username}!</h1>
        <p>Thank you for registering at HomeKnown. We're excited to have you on board and can't wait to help you discover your perfect place to live.</p>
        <p>Please click the button below to verify your email address and get started:</p>
        <a href="https://www.homeknown.app/verify-email" style="display: inline-block; padding: 10px 20px; margin: 10px 2px; border-radius: 5px; color: #FFFFFF !important; background-color: #01697c; text-decoration: none;">Verify Email</a>
        <p>If you have any questions or need assistance, feel free to reach out to us:</p>
        <a href="https://www.homeknown.app/support" class="button">Contact Support</a>
      </div>
      </body>
      </html>
    `
    const msg = {
      to: user.primary_email,
      from: { email: 'michael@homeknown.app', name: 'HomeKnown' },
      subject: 'Welcome to HomeKnown!',
      text: `Welcome, ${user.first_name || user.username}! Thank you for registering at HomeKnown.`,
      html: htmlContent.replace('https://www.homeknown.app/verify-email', verificationLink)
    }

    try {
      const response = await sgMail.send(msg)
    } catch (error) {
      console.error('Failed to send welcome email', error)
    }
  }

  return context
}

export default welcomeEmail

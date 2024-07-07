'use server'

import { Resend } from 'resend'

const RESEND_API_TOKEN = process.env.NEXT_RESEND_API_TOKEN

type Email = {
  from: string
  to: string
  subject: string
  html: string
}

const resend = new Resend(RESEND_API_TOKEN)

export async function sendEmail(email: Email) {
  return await resend.emails.send(email)
}

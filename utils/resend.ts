"use server"

import { Resend } from "resend"

const RESEND_API_TOKEN = process.env.NEXT_RESEND_API_TOKEN

type Email {
  from: string
  to: string
  subject: string
  html: string
}

export function send(email: Email) {
  const resend = new Resend(RESEND_API_TOKEN)
  return resend.emails.send(email)
}

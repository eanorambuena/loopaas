import { Resend } from "resend"

const RESEND_API_TOKEN = process.env.NEXT_RESEND_API_TOKEN

export const resend = new Resend(RESEND_API_TOKEN)

import { sendEmail as se  } from '@/utils/resendConfig'

type Email = {
  from: string
  to: string
  subject: string
  html: string
}

export async function sendEmail(email: Email) {
  //return await se(email)
}

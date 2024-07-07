import jwt from 'jsonwebtoken'

const secret = process.env.NEXT_JWT_SECRET as jwt.Secret

export interface Payload {
  sub?: string
  ucUsername: string
  iat?: number
}

export const sign = (payload: Payload) => {
  payload.iat = Math.floor(Date.now() / 1000)
  payload.sub = payload.ucUsername
  return jwt.sign(payload, secret, { expiresIn: '1h' })
}

export const verify = (token: string) => {
  try{
    return jwt.verify(token, secret) as Payload
  } catch (error) {
    return null
  }
}

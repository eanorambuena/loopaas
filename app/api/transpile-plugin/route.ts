import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({
    message: 'Plugin transpilation is disabled on this deployment',
    code: null
  })
}

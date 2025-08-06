import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { UserInfoSchema } from '@/utils/schema'

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient()
    
    const body = await req.json()
    const { userId, email, firstName, lastName } = body

    if (!userId || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verificar si ya existe un userInfo para este usuario
    const { data: existingUserInfo } = await supabase
      .from('user_info')
      .select('*')
      .eq('userId', userId)
      .single()

    if (existingUserInfo) {
      return NextResponse.json({ userInfo: existingUserInfo })
    }

    // Crear nuevo userInfo
    const userInfo: Omit<UserInfoSchema, 'id'> = {
      userId,
      firstName: firstName || '',
      lastName: lastName || '',
      email,
    }

    const { data, error } = await supabase
      .from('user_info')
      .insert([userInfo])
      .select()
      .single()

    if (error) {
      console.error('Error creating user info:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ userInfo: data })
  } catch (error) {
    console.error('Error in create-user-info API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

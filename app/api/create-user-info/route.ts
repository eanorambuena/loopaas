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
    const { data: existingUserInfo, error: fetchError } = await supabase
      .from('userInfo')
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

    const { data: newUserInfo, error: insertError } = await supabase
      .from('userInfo')
      .insert([userInfo])
      .select()
      .single()

    if (insertError) {
      console.error('Error creating user info:', insertError)
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    return NextResponse.json({ userInfo: newUserInfo })
  } catch (error) {
    console.error('Error in create-user-info API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

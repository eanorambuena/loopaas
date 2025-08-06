import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient()
    
    // Obtener el usuario actual
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'No authenticated user' }, { status: 401 })
    }

    // Verificar si ya existe un userInfo para este usuario
    const { data: existingUserInfo, error: fetchError } = await supabase
      .from('user_info')
      .select('*')
      .eq('userId', user.id)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching user info:', fetchError)
      return NextResponse.json({ error: fetchError.message }, { status: 500 })
    }

    if (existingUserInfo) {
      return NextResponse.json({ userInfo: existingUserInfo, created: false })
    }

    // Crear nuevo userInfo usando los metadatos del usuario
    const firstName = user.user_metadata?.first_name || ''
    const lastName = user.user_metadata?.last_name || ''
    
    const userInfo = {
      userId: user.id,
      firstName,
      lastName,
      email: user.email || '',
    }

    const { data, error: insertError } = await supabase
      .from('user_info')
      .insert([userInfo])
      .select()
      .single()

    if (insertError) {
      console.error('Error creating user info:', insertError)
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    return NextResponse.json({ userInfo: data, created: true })
  } catch (error) {
    console.error('Error in sync-user-info API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

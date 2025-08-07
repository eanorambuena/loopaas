import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  try {
    const supabase = createClient()
    
    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    // Obtener información del usuario
    const { data: userInfo, error: userInfoError } = await supabase
      .from('userInfo')
      .select('id')
      .eq('userId', user.id)
      .single()
    
    if (userInfoError || !userInfo) {
      return NextResponse.json({ error: 'Información de usuario no encontrada' }, { status: 404 })
    }

    // Obtener las organizaciones del usuario
    const { data: organizations, error: orgsError } = await supabase
      .from('organizations')
      .select('id, name, plan')
      .eq('ownerId', userInfo.id)
      .order('name', { ascending: true })

    if (orgsError) {
      console.error('Error fetching organizations:', orgsError)
      return NextResponse.json({ error: 'Error al obtener organizaciones' }, { status: 500 })
    }

    return NextResponse.json({ organizations: organizations || [] })
  } catch (error) {
    console.error('Error in organizations API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

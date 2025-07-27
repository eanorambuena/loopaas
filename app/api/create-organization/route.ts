import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 [API] Starting create-organization...')
    const supabase = createClient()
    
    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    console.log('🔍 [API] User check:', { user: user?.id, authError })
    
    if (authError || !user) {
      console.log('❌ [API] Authentication failed')
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const { name, plan } = await request.json()
    console.log('🔍 [API] Request data:', { name, plan })
    
    if (!name || !plan) {
      console.log('❌ [API] Missing required fields')
      return NextResponse.json({ error: 'Nombre y plan requeridos' }, { status: 400 })
    }

    // Obtener información del usuario
    console.log('🔍 [API] Fetching userInfo for userId:', user.id)
    const { data: userInfo, error: userInfoError } = await supabase
      .from('userInfo')
      .select('*')
      .eq('userId', user.id)
      .single()
    
    console.log('🔍 [API] UserInfo result:', { userInfo: userInfo?.id, userInfoError })
    
    if (userInfoError || !userInfo) {
      console.log('❌ [API] UserInfo not found', userInfoError)
      return NextResponse.json({ error: 'Información de usuario no encontrada' }, { status: 404 })
    }

    // Crear la organización
    console.log('🔍 [API] Creating organization...')
    const orgData = {
      name: name.trim(),
      plan: plan,
      ownerId: userInfo.id
    }
    console.log('🔍 [API] Organization data:', orgData)

    const { data: organization, error: orgError } = await supabase
      .from('organizations')
      .insert(orgData)
      .select()
      .single()

    console.log('🔍 [API] Organization creation result:', { organization: organization?.id, orgError })

    if (orgError) {
      console.error('❌ [API] Error creating organization:', orgError)
      return NextResponse.json({ 
        error: 'Error al crear organización', 
        details: orgError.message,
        code: orgError.code 
      }, { status: 500 })
    }

    console.log('✅ [API] Organization created successfully:', organization.id)
    return NextResponse.json({ 
      success: true, 
      organization 
    })

  } catch (error: any) {
    console.error('❌ [API] Unexpected error:', error)
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      details: error.message 
    }, { status: 500 })
  }
}

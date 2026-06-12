import { auth } from '@/lib/auth'
import { db } from '@/drizzle/db'
import { organizations, userInfo } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 [API] Starting create-organization...')
    const session = await auth()
    console.log('🔍 [API] User check:', { user: session?.user?.id })
    
    if (!session?.user?.id) {
      console.log('❌ [API] Authentication failed')
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const { name, plan } = await request.json()
    console.log('🔍 [API] Request data:', { name, plan })
    
    if (!name || !plan) {
      console.log('❌ [API] Missing required fields')
      return NextResponse.json({ error: 'Nombre y plan requeridos' }, { status: 400 })
    }

    console.log('🔍 [API] Fetching userInfo for userId:', session.user.id)
    const ui = await db.query.userInfo.findFirst({
      where: eq(userInfo.userId, session.user.id),
    })
    
    console.log('🔍 [API] UserInfo result:', { userInfo: ui?.id })
    
    if (!ui) {
      console.log('❌ [API] UserInfo not found')
      return NextResponse.json({ error: 'Información de usuario no encontrada' }, { status: 404 })
    }

    console.log('🔍 [API] Creating organization...')
    const orgData = {
      name: name.trim(),
    }
    console.log('🔍 [API] Organization data:', orgData)

    const [organization] = await db.insert(organizations).values(orgData).returning()

    console.log('🔍 [API] Organization creation result:', { organization: organization?.id })

    if (!organization) {
      console.error('❌ [API] Error creating organization')
      return NextResponse.json({ 
        error: 'Error al crear organización', 
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

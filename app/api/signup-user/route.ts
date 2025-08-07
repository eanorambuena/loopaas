import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email y contraseña son requeridos' },
        { status: 400 }
      )
    }

    // Validar que sea correo UC
    if (!email.endsWith('uc.cl')) {
      return NextResponse.json(
        { message: 'Solo se permiten correos UC (@uc.cl)' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Crear usuario autoconfirmado usando admin
    const { data: { user }, error: signUpError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
      }
    })

    if (signUpError) {
      console.error('Error creating user:', signUpError)
      return NextResponse.json(
        { message: signUpError.message || 'Error al crear usuario' },
        { status: 400 }
      )
    }

    if (!user) {
      return NextResponse.json(
        { message: 'No se pudo crear el usuario' },
        { status: 400 }
      )
    }

    // Crear userInfo
    const { error: userInfoError } = await supabase
      .from('userInfo')
      .insert({
        userId: user.id,
        email,
        firstName: firstName || '',
        lastName: lastName || ''
      })

    if (userInfoError) {
      console.error('Error creating userInfo:', userInfoError)
      // No fallar completamente si userInfo falla, se puede crear después
    }

    return NextResponse.json({
      user,
      message: 'Usuario creado exitosamente'
    })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
